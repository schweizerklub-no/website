---
name: astro-guidelines
description: Use when writing, refactoring, or reviewing Astro components, pages, layouts, or unit tests in this website.
---

# Astro Guidelines

The canonical, always-on conventions live in `AGENTS.md` — "Astro best practices", "Test conventions", and the "Mandatory Gates" sections are the source of truth. This skill is the working procedure: what to do and in what order, with concrete pointers. Do not restate the AGENTS.md rules here; reference them.

## Creating or changing components

1. Check which shared components already apply — `PageLayout`, `PageSection`, `CardGrid`, `BackLink`, `Button`, and the extracted card bodies (`EventCardBody.astro`, `BoardMemberCardBody.astro`).
2. Type the `Props` interface with the existing types (`CollectionEntry<"events" | "board">`, `Locale`, `PageKey`, `MetaData`) — never `any`.
3. Reuse the helpers (`pageHref`, `contentHref`, `localeUrlPrefix`, `getPage`) for every URL; images go through `astro:assets` `Image` or `findImage`.
4. If your markup begins to repeat existing markup, extract a shared component instead — never duplicate.
5. Keep logic out of `.astro` files: put it in `src/utils/` with a co-located `*.test.ts`.

## Writing tests

- Copy the locale-agnostic pattern from `src/i18n/parity.test.ts` (iterate `LOCALE_VALUES`, compare to `Locale.De`) — never write a hardcoded locale or URL into a test.
- The `astro:content` / `astro:assets` mocks already exist in `src/test/setup.ts` — do not re-declare them; override in-file only for fixtures (see `src/utils/events.test.ts`).
- Import `describe`/`it`/`expect` from `vitest` (globals are disabled).

## Before calling a task done

1. Re-read the changed files once as a reviewer: any duplicated markup/logic left behind? Any hand-rolled locale or URL where a helper exists?
2. Run the Mandatory Gates (`mise run verify`); auto-format first with `mise run fix`.