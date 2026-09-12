---
name: pull-request
description: "PR creation and updates — semantic title, short description, issue linking, test status, risk, checklist, and reviewer context. Used via /pull-request for new or updated PRs."
---

# Pull request

Create consistent, well-structured PRs linked to issues.

## Pre-flight

Inspect `git status && git diff && git log --oneline -10`. Stage only intended files, never secrets. Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and fix failures first; ask the user what the PR is about if the commits alone don't tell the story.

## Title

`type(scope): description` — types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`.

## Body

Summarize: what changed, issue linking, verification (all gates green), risk: none/low/medium/high.

## Issue linking

| Situation | In body |
|---|---|
| Fully resolved | `Closes #123` |
| Partial, still open | `Relates to #123` |
| No issue | Write motivation directly |

## Commands

```bash
gh pr create --title "type(scope): description" --body "BODY"
```

Push new commits to the same branch to update the PR — re-run the mandatory gates first.