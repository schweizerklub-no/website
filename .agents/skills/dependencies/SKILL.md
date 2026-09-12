# Skill: dependencies

# Dependency and CI-action updates

## Rules

- **pnpm only**, Node version pinned in `.nvmrc` / `mise.toml` (never npm/yarn).
- GitHub Actions `uses:` lines **must** be SHA-pinned with the release comment, e.g. `actions/setup-node@8207627… # v7.0.0`. No bare tags (`@v7`) in workflows.
- Biome only — never add ESLint, Prettier, Stylelint, or a custom tailwind config.

## Updating a dependency

1. `pnpm update <pkg>` (or bump the range in `package.json` first).
2. Run `mise run verify`; fix failures. If Biome flags formatting, `mise run fix`.
3. Commit as `chore(deps): bump <pkg> to <version>` — no version release (but deploy still runs).
4. Open a PR (see `pull-request` skill).

## Updating a GitHub Action

1. Bump the SHA in the workflow + update the `# vX.Y.Z` comment to the target release.
2. Verify the SHA matches the release tag (e.g. `gh api repos/{owner}/{repo}/git/ref/tags/vX.Y.Z` → `object.sha`).
3. Keep `step-security/harden-runner` in workflows; run `mise run verify` and commit.

Dependabot runs automatically and auto-merges (`chore(deps:)`); supply manual updates via the steps above when Dependabot can't (e.g. action SHAs).