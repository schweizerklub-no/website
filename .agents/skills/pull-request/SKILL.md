---
name: pull-request
description: "PR creation and updates — semantic title, short description, issue linking, test status, risk, checklist, and reviewer context. Used via /pull-request for new or updated PRs."
---

# Pull request

Create consistent, well-structured PRs linked to issues.

## Pre-flight

Before creating, inspect the working tree:

```bash
git status && git diff && git log --oneline -10
```

If the commits alone don't tell the full story, ask the user what the PR is about.

Stage only intended files — never commit secrets. Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and fix any failure first.

## PR title

Use semantic commit format: `type(scope): description`.

- **Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`
- **Scope:** module or domain being changed

## PR body

Briefly summarize:

- what was changed
- issue linking
- verification (build/typecheck/test/lint all green)
- risk: none / low / medium / high

## Issue linking

| Situation | In PR body |
|-----------|------------|
| Issue fully resolved | `Closes #123` |
| Partial work, issue still open | `Relates to #123` |
| No issue | Write motivation directly in the description |

## Creation

```bash
gh pr create \
  --repo schweizerklub-no/website \
  --title "type(scope): description" \
  --body "BODY"
```

## Updating an existing PR

Push new commits to the same branch — the PR updates automatically. Re-run the mandatory gates first.