---
name: issue
description: "Issue creation and updates — semantic title, description, labels, and project linking. Used when creating or updating a GitHub issue."
---

# Issue

Create/update well-structured GitHub issues. Infer title and labels from context; ask the user for the description/body and whether a plan should be made first.

## Title

`type: description` — types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`.

## Body

Briefly describe: motivation/problem, expected behaviour, and any relevant context or references.

## Labels

Use existing labels: `bug`, `enhancement`, `documentation`, `good first issue`, `help wanted`, `question`, `wontfix`.

## Commands

```bash
# create
gh issue create --title "type: description" --body "BODY" --label "LABEL"
# update
gh issue edit <number> --title "type: description" --body "BODY" --add-label "LABEL" --remove-label "LABEL"
```