# Skill: release

# Releasing a new version

Versions are driven by commit messages via semantic-release on `main`. Full picture: [`docs/development/deployment.md`](../../docs/development/deployment.md) and AGENTS.md "Deployment & Versioning".

## Rules

| Commit prefix (squash-merged PR title) | Version bump |
|----------------------------------------|--------------|
| `fix:` / `fix(scope):` (also `perf:`)  | patch        |
| `feat:` / `feat(scope):`               | minor        |
| `BREAKING CHANGE` / `feat!:`           | major        |
| `docs:`, `chore:`, `refactor:`, `test:`| **none**     |

- The squash-merged PR title becomes the commit on `main`. Rename the PR title if the default doesn't carry the intended prefix — repository merges are **squash only**, so a `refactor:` content change ships to production but never bumps the version.
- Merging to `main` always deploys, but only the prefixes above create a version tag / `PUBLIC_APP_VERSION`.
- Dependabot uses `chore(deps:)` → no bump.

## Flow

1. Confirm the PR title/prefix matches the intended bump before merge.
2. After merge, GitHub Actions runs semantic-release → decides version → builds with `PUBLIC_APP_VERSION` → deploys to Cloudflare Pages (workflow: `.github/workflows/deploy.yml`).
3. Check the run and the generated tag on `main`. No local steps needed.