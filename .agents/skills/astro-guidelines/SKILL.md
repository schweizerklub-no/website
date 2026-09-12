---
name: astro-guidelines
description: Use when writing, refactoring, or reviewing Astro components, pages, layouts, or unit tests in this website.
---

# Astro Guidelines

Canonical, always-on conventions live in `AGENTS.md` (Astro best practices, Tests, Mandatory Gates) — reference, don't restate.

## Components

1. Reuse shared pieces first: `PageLayout`, `PageSection`, `CardGrid`, `BackLink`, `Button`, and the extracted card bodies (`EventCardBody`, `BoardMemberCardBody`).
2. Type `Props` with existing types (`CollectionEntry<"events" | "board">`, `Locale`, `PageKey`, `MetaData`) — never `any`.
3. URLs via `pageHref`/`contentHref`/`localeUrlPrefix`; images via `Image` or `findImage`.
4. Extract markup the moment it repeats.

## Tests

- Follow the locale-agnostic pattern in `src/i18n/parity.test.ts` — never hardcode a locale or URL.
- Mocks live in `src/test/setup.ts`; override in-file only for fixtures (`src/utils/events.test.ts`).
- Import from `vitest`; every `src/utils/` function gets a co-located test.

## Done

Review the diff as a reviewer (leftover duplication? hand-rolled URLs?), then run `mise run fix` + `mise run verify`.