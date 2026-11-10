# Project: Genero Bedrock

Genero's WordPress starter template. Bedrock + Sage (Acorn) on Kinsta, Finnish
and Swedish (Polylang Pro), WooCommerce. One theme (`gds`, `App\` →
`web/app/themes/gds/app/`) and one plugin (`genero-woocommerce`), both built with
`@wordpress/scripts`. A new site is created from this repo with `composer
create-project` and `robo setup`, which replaces the `gdsbedrock` placeholder with
the project's machine name, so keep that placeholder in hostnames and paths.

## Local
- Site: `https://gdsbedrock.ddev.site` (a worktree: `https://<branch>--gdsbedrock.ddev.site`, see README). Production `https://gdsbedrock.kinsta.cloud`, staging `https://stg-gdsbedrock-staging.kinsta.cloud`
- Clone into a directory named `gdsbedrock`: `.ddev/config.yaml` has no `name:`, so the DDEV project and hostname follow the directory
- Pull the database: `./vendor/bin/robo db:pull @production`. Remote aliases: `wp-cli.yml`
- PHP 8.5 (DDEV); run Composer scripts in DDEV (`ddev composer …`) when the host PHP is older

## Build, lint, test
- pnpm workspaces: `gds`, `genero-woocommerce`. Build one with `pnpm --filter gds run build` (watch: `run start`), all with `pnpm run build`. Not `-w`: in pnpm that means the workspace root
- The Claude Code Stop hook rebuilds stale assets at session end
- Lint `composer lint` (Pint + pnpm lint), fix `composer lint:fix`. The pre-commit hook lints staged files, fixes what it can and blocks the commit for you to re-stage
- Unit tests: `ddev composer phpunit`
- E2E: `URL=<site> pnpm run e2e:test`; `e2e:editor` (local only); visual `pnpm run e2e:visual:update` then `e2e:visual`. Notes: README "Testing"

## Caching
`sage-cachetags` tags every page and purges what changed: Kinsta on staging and production, and Fastly or Cloudflare once their credentials are in `.env` (`web/app/themes/gds/config/cachetags.php`). Cache and purge a new endpoint with `/add-cachetags`.

## Deploy
`./vendor/bin/robo deploy:production` / `deploy:staging --branch=<branch>` trigger the Actions workflows; both run E2E against the deployed site afterwards.

## Rules and skills
Shared: `.claude/rules/shared/` (agency submodule), starting with `standards.md`.
Claude Code loads these automatically; Codex should read them before working.
Workflows (`/go`, `/deploy`, `/testit`, `/new-block` and the rest): `.claude/skills/*/SKILL.md`.
