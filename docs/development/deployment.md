# Deployment & Versioning

## CI/CD Pipeline

The repo has these workflows:

| Workflow            | Triggers                            | What it does                                                             |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------ |
| `ci.yaml`           | pull requests, push to `main`       | Quality checks: `astro check`, `biome check`, `test`                     |
| `auto-merge.yml`    | `pull_request_target`               | Auto-merges Dependabot PRs (minor+patch only)                            |
| `deploy.yml`        | push to `main`, `workflow_dispatch` | Semantic-release → build → deploy to Cloudflare Pages                    |
| `daily-rebuild.yml` | `schedule` (00:00 UTC)              | Redeploys with current version, no new release                           |
| `codeql.yml`        | pull requests, push to `main`       | CodeQL security analysis (`javascript-typescript`, `actions`)            |
| `build-deploy.yml`  | `workflow_call` (reusable)          | Shared build + deploy steps used by `deploy.yml` and `daily-rebuild.yml` |

## Deploy workflow

On every push to `main` (or manual trigger via `workflow_dispatch`):

1. **semantic-release** analyzes commits since the last tag
2. **Version** is determined from conventional commits
3. **Build** runs via `build-deploy.yml` with `PUBLIC_APP_VERSION` set to the derived version
4. **Deploy** pushes the `dist/` directory to Cloudflare Pages (`schweizerklub-no` project)

The `build-deploy.yml` reusable workflow contains the shared build + deploy logic used by both `deploy.yml` and `daily-rebuild.yml`.

## Conventional commits

Version bumps are determined by commit message prefixes:

| Prefix                                  | Version bump          | Example                                  |
| --------------------------------------- | --------------------- | ---------------------------------------- |
| `fix:`                                  | patch (1.0.0 → 1.0.1) | `fix: correct date format on event card` |
| `feat:`                                 | minor (1.0.0 → 1.1.0) | `feat: add board member detail page`     |
| `BREAKING CHANGE` or `feat!:`           | major (1.0.0 → 2.0.0) | `feat!: redesign navigation`             |
| `chore:`, `docs:`, `refactor:`, `test:` | **no release**        | `chore(deps): bump astro to 6.4.0`       |

Dependency updates from Dependabot use `chore(deps):` — they deploy without creating a new version or GitHub Release.

## Dependabot auto-merge

Dependabot PRs are auto-approved and auto-merged (squash) when CI passes, but only for **minor and patch** updates. Major version bumps skip the auto-merge workflow and require manual review.

The workflow (`auto-merge.yml`) uses `pull_request_target` with a `dependabot/fetch-metadata` step to determine the update type.

## Version in the UI

The current version is displayed in the footer next to the GitHub icon. Examples:

| Context            | Shows               |
| ------------------ | ------------------- |
| Local development  | `0.0.0-dev`         |
| After `v1.0.0` tag | `v1.0.0`            |
| Between tags       | `v1.0.0-2-gabc1234` |

The version is set at build time via `PUBLIC_APP_VERSION` environment variable and read in `Footer.astro` as `import.meta.env.PUBLIC_APP_VERSION`.

## Manual deploy

Trigger a deploy without pushing code:

1. Go to GitHub → Actions → **Tag, Build & Deploy**
2. Click **Run workflow**
3. Select `main` branch

semantic-release will skip creating a new tag if no new commits exist, but the build and deploy still run.

## Daily rebuild

The `daily-rebuild.yml` workflow runs every night at 00:00 UTC (01:00–02:00 CET/CEST in Norway). It derives the current version from git tags and calls `build-deploy.yml` to rebuild and redeploy without running semantic-release.

This ensures event future/past categorization stays accurate — `new Date()` is re-evaluated each morning, so expired events move to "past" within ~12 hours of ending.
