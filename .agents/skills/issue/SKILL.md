---
name: issue
description: "Issue creation and updates — semantic title, description, labels, and project linking. Used when creating or updating a GitHub issue."
---

# Issue

Create and update well-structured GitHub issues for bugs, features, and tasks.

Infer the title and labels from context. Ask the user for the description / body and whether a plan should be made first.

## Title

Use semantic format: `type: description`.

- **Types:** `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`

## Body

Briefly describe:

- what the issue is about (motivation / bug description)
- expected behaviour
- any relevant context or references

## Labels

Use existing labels: `bug`, `enhancement`, `documentation`, `good first issue`, `help wanted`, `question`, `wontfix`.

## Creation

```bash
gh issue create \
  --repo schweizerklub-no/website \
  --title "type: description" \
  --body "BODY" \
  --label "LABEL"
```

## Updating an existing issue

Edit title, body, or labels with `gh issue edit`:

```bash
gh issue edit <number> \
  --repo schweizerklub-no/website \
  --title "type: description" \
  --body "BODY" \
  --add-label "LABEL" \
  --remove-label "LABEL"
```
