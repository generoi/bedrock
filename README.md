# gdsbedrock

Genero's WordPress starter template: [Bedrock](https://roots.io/bedrock/) with a
Sage/Acorn block theme (`gds`), Polylang Pro (Finnish and Swedish), WooCommerce
and Gravity Forms, hosted on Kinsta. The demo runs at
[gdsbedrock.kinsta.cloud](https://gdsbedrock.kinsta.cloud).

`gdsbedrock` is the placeholder a new project replaces with its own machine name
(see [Create a new project](#create-a-new-project)).

## Setup

Needs [DDEV](https://ddev.com), SSH access to the Kinsta site, and the
FontAwesome Pro npm token in `~/.npmrc` (in the password manager; `.npmrc`
points `@fortawesome` at its registry). PHP, Composer and Node versions:
`composer.json` `config.platform.php` (8.5) and `.nvmrc`. If the host PHP is
older, run Composer inside DDEV (`ddev composer …`).

```sh
# Clone into a directory named gdsbedrock: the DDEV project and hostname follow it
git clone --recursive git@github.com:generoi/bedrock.git gdsbedrock
cd gdsbedrock

# Composer packages, pnpm install + production build, git hooks, agent setup
composer install:development

ddev start
./vendor/bin/robo db:pull @production

# Magic login link
ddev wp login create <user>
```

Uploads missing locally are redirected to production by DDEV's nginx, so
`./vendor/bin/robo files:pull @production` is only needed for a full copy.

### Previewing a worktree

`.ddev/config.yaml` has no `name:`, so each `git worktree` is its own DDEV
project. [hostshift][] maps the worktree's hostnames to the ones in the
database; nothing is rewritten. Steps: the `worktree-preview` skill, or
[hostshift's README][hostshift].

[hostshift]: https://github.com/generoi/hostshift

## Development

```sh
# Build all workspaces, or one (faster); watch mode with `start`
pnpm run build
pnpm --filter gds run build
pnpm --filter gds run start

# Lint, and fix
composer lint          # Pint + JS/SCSS/Prettier
composer lint:fix
```

The pre-commit hook lints staged files, fixes what it can and blocks the commit
for you to re-stage.

The root `package.json` runs each script in every workspace (`gds`,
`genero-woocommerce`). Use `--filter <package name>` to target one. Not npm's
`-w`: pnpm reads it as "the workspace root", so `pnpm run build -w gds` fails.

```sh
pnpm --filter gds add clsx
```

Other tasks: `./vendor/bin/robo` (database and file sync, search-replace),
`./vendor/bin/dep` (deploy, caches, SSH, rollback). Remote aliases
(`@production`, `@staging`) are in [`wp-cli.yml`](wp-cli.yml).

DDEV services: `ddev mailpit` (outgoing email), `ddev phpmyadmin`,
`ddev xhgui` (PHP profiler). `ddev describe` lists the URLs.

### Caching

[sage-cachetags](https://github.com/generoi/sage-cachetags) tags every page and
REST response with what it shows, and purges exactly that when content changes:
Kinsta on staging and production, and Fastly or Cloudflare as soon as their API
credentials are in `.env` (see `.env.example` and
`web/app/themes/gds/config/cachetags.php`). Each deploy resets OPcache and
flushes every cache layer (`deploy.php` `cache:clear`).

### Email

[Postmark](https://postmarkapp.com) delivers email in production only. Everywhere
else `web/app/mu-plugins/disable-postmarkapp.php` turns it off, so staging and
DDEV (which run copies of the production database) never email real customers;
DDEV catches mail in Mailpit.

### AI tools

Content editors can manage pages, translations, forms and SEO from Claude or any
MCP client through [gds-mcp](https://github.com/generoi/gds-mcp); its README
covers connecting. Agent instructions for this repo are in [AGENTS.md](AGENTS.md).
`/llms.txt` and markdown versions of every page come from
[gds-llms](https://github.com/generoi/gds-llms). On Kinsta, exclude `txt` from
the CDN as its README says.

## Deploying

```sh
./vendor/bin/robo deploy:production
./vendor/bin/robo deploy:staging --branch=<branch>
```

Both trigger the GitHub Actions workflows
([deploy_production.yml](https://github.com/generoi/gdsbedrock/actions/workflows/deploy_production.yml),
[deploy_staging.yml](https://github.com/generoi/gdsbedrock/actions/workflows/deploy_staging.yml)),
which run the E2E suite against the deployed site afterwards. `./vendor/bin/dep`
deploys from your machine; see
[deployer-genero](https://github.com/generoi/deployer-genero).

## Testing

```sh
# PHPUnit (needs a database: run in DDEV)
ddev composer phpunit

# Playwright E2E, against $URL (default https://gdsbedrock.ddev.site)
pnpm run e2e:install
URL=https://gdsbedrock.ddev.site pnpm run e2e:test
URL=https://gdsbedrock.ddev.site pnpm run e2e:editor   # local only: uses ddev wp

# Visual regression
pnpm run e2e:visual:update    # baseline
pnpm run e2e:visual           # compare
```

## Create a new project

Name the project after the site's domain (`www.my-site.fi` → `my-site`); the
environments, repository and DDEV hostname all follow it.

```sh
composer create-project generoi/bedrock my-site dev-master \
  --repository='{"type":"vcs","url":"git@github.com:generoi/bedrock.git"}'
```

The `post-create-project-cmd` runs `robo setup`, which replaces the placeholder
across the repo with the machine name. When it asks for the placeholder, enter
`gdsbedrock` (its default, `<example-project>`, matches nothing here). A Composer install carries no
git submodules, so add the agent setup with `/setup-project` (ai-agency) or
`git submodule add git@github.com:generoi/ai-agency.git .claude/agency` and
`composer claude:install`.

Then:

1. `ddev start`
2. Fill in `robo.yml` and `wp-cli.yml` (SSH hosts, ports and paths from
   MyKinsta), the hostnames in `config/application.php`'s `$trustedHosts`, and
   staging's `WP_HOME` in `config/environments/staging.php`.
3. Prepare the remote and push the first copy:

   ```sh
   ./vendor/bin/dep setup staging
   ./vendor/bin/robo db:push @staging
   ./vendor/bin/robo files:push @staging
   ./vendor/bin/dep deploy staging
   ```

4. Add the repository secrets the workflows use (`KINSTA_DEPLOY_PRIVATE_KEY`,
   `NPM_FONTAWESOME_AUTH_TOKEN`, `COMPOSER_BOT_PRIVATE_KEY`).
