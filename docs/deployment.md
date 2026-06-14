# Deployment & Versioning

## CI/CD Pipeline

The repo has two workflows:

| Workflow     | Triggers                            | What it does                                          |
| ------------ | ----------------------------------- | ----------------------------------------------------- |
| `ci.yaml`    | pull requests, push to `main`       | Quality checks: `astro check`, `biome check`, `test`  |
| `deploy.yml` | push to `main`, `workflow_dispatch` | Semantic-release → build → deploy to Cloudflare Pages |

## Deploy workflow

On every push to `main` (or manual trigger via `workflow_dispatch`):

1. **semantic-release** analyzes commits since the last tag
2. **Version** is determined from conventional commits
3. **Build** runs with `PUBLIC_APP_VERSION` set to the derived version
4. **Deploy** pushes the `dist/` directory to Cloudflare Pages (`schweizerklub-no` project)

## Conventional commits

Version bumps are determined by commit message prefixes:

| Prefix                                  | Version bump          | Example                                  |
| --------------------------------------- | --------------------- | ---------------------------------------- |
| `fix:`                                  | patch (1.0.0 → 1.0.1) | `fix: correct date format on event card` |
| `feat:`                                 | minor (1.0.0 → 1.1.0) | `feat: add board member detail page`     |
| `BREAKING CHANGE` or `feat!:`           | major (1.0.0 → 2.0.0) | `feat!: redesign navigation`             |
| `chore:`, `docs:`, `refactor:`, `test:` | **no release**        | `chore(deps): bump astro to 6.4.0`       |

Dependency updates from Dependabot use `chore(deps):` — they deploy without creating a new version or GitHub Release.

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
