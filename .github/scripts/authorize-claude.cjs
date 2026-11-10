// This gate runs with only the read-only GITHUB_TOKEN, before any agent secrets
// are passed to the reusable workflow. Author association is not authorization:
// organization members and collaborators can have only read/triage access.
module.exports = async function authorize({github, context}) {
  const {payload, eventName, repo} = context;
  const mentionsClaude = (body) =>
    typeof body === 'string' && /@claude\b/i.test(body);

  async function canWrite(user) {
    if (user?.type !== 'User' || !user.login) return false;
    try {
      const {data} = await github.rest.repos.getCollaboratorPermissionLevel({
        ...repo,
        username: user.login,
      });
      // GitHub maps maintain/custom roles to their base permission here.
      return ['write', 'admin'].includes(data.permission);
    } catch (error) {
      if (error.status === 404) return false;
      throw error; // API failures must never release the privileged job.
    }
  }

  async function isLocalPullRequest(number, run) {
    if (!Number.isInteger(number)) return false;
    const {data: pr} = await github.rest.pulls.get({
      ...repo,
      pull_number: number,
    });
    return (
      pr.base?.repo?.id === payload.repository.id &&
      pr.head?.repo?.id === payload.repository.id &&
      (!run ||
        (pr.head.ref === run.head_branch && pr.head.sha === run.head_sha))
    );
  }

  if (eventName === 'workflow_run') {
    const run = payload.workflow_run;
    if (
      run?.conclusion !== 'failure' ||
      run.event !== 'pull_request' ||
      run.head_repository?.id !== payload.repository.id ||
      !/^claude\/issue-\d+$/.test(run.head_branch) ||
      !run.pull_requests?.length
    ) {
      return false;
    }
    if (!(await canWrite(run.actor)) || !(await canWrite(run.triggering_actor)))
      return false;
    for (const pr of run.pull_requests) {
      if (!(await isLocalPullRequest(pr.number, run))) return false;
    }
    return true;
  }

  if (!(await canWrite(payload.sender))) return false;

  if (eventName === 'issues') {
    return (
      ['opened', 'assigned'].includes(payload.action) &&
      mentionsClaude(payload.issue?.body) &&
      (await canWrite(payload.issue?.user))
    );
  }

  if (
    !['issue_comment', 'pull_request_review_comment'].includes(eventName) ||
    payload.action !== 'created' ||
    !mentionsClaude(payload.comment?.body) ||
    !(await canWrite(payload.comment?.user))
  ) {
    return false;
  }

  if (eventName === 'pull_request_review_comment') {
    return isLocalPullRequest(payload.pull_request?.number);
  }
  if (payload.issue?.pull_request) {
    return isLocalPullRequest(payload.issue.number);
  }
  return true;
};
