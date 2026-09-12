# Skill: add-board-member

# Adding a board member

Add a board member content file for a locale.

## Steps

1. Pick the locale folder: `src/content/board/{de,no,fr}/` (one entry per file).
2. Name the file after the person, lowercase with hyphens (e.g. `anna-muster.md`).
3. Frontmatter keys (schema in `src/content.config.ts`): `lang`, `name`, `role`, optional `order` / `image` / `email`.
4. Body = biography; the **first sentence** appears on the board overview card, the rest on the member's detail page (see `src/components/BoardMemberCardBody.astro` and `src/utils/board.ts`).
5. Image path: `~/assets/images/board/<file>.jpg`. Image and email are optional — omit the `image` line entirely if there is no photo; drop the photo in `src/assets/images/board/` only if one exists.
6. Detail pages come from `getDetailPaths("board", …)` in `src/utils/locale.ts` — no route edits needed.

## After writing

- Commit on a branch and open a PR (use the `pull-request` skill). Never commit directly to `main`.
- Verify with `mise run verify` before pushing.

Same pattern as adding an event or page (those files live in `src/content/events/` and `src/content/pages/`).