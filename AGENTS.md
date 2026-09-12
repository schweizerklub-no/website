# Standing Instructions for AI Agents

## Mandatory Gates

Every change MUST pass ALL of these before being considered done:

- `pnpm astro check` — 0 errors
- `pnpm biome check .` — no warnings or errors
- `pnpm test` — all tests pass
- `pnpm build` — succeeds

`mise run verify` runs all four at once. `mise run fix` auto-formats with Biome.

## Code Rules

- **No duplication** — extract shared logic into `src/utils/` helpers; factor out any pattern that appears more than once.
- **Tests required** — every utility function MUST have a co-located `*.test.ts` importing `describe`/`it`/`expect` from `vitest` (no globals).
- **Package manager** — use **pnpm** only, never npm/yarn. Node version from `.nvmrc`.
- **Linting/formatting** — Biome only (no ESLint, no Prettier); configured in `biome.json`.
- **TypeScript** — strict, checked via `astro check`. Use the `~/*` alias for `src/*` imports; `z` comes from `astro/zod`, NOT from `astro:content`.
- **GitHub Actions** — action versions must be SHA-pinned; prefer `step-security/harden-runner`. Workflows live in `.github/workflows/` (ci, codeql, auto-merge, deploy, daily-rebuild, build-deploy).

## Deployment & Versioning

See [`docs/development/deployment.md`](docs/development/deployment.md) for the full picture.

- Push to `main` triggers **Tag, Build & Deploy**: semantic-release → build (`PUBLIC_APP_VERSION`) → Cloudflare Pages
- Version bumps: `fix:` → patch, `feat:` → minor, `BREAKING` → major
- No version bump (deploy still runs): `chore:`, `docs:`, `refactor:`, `test:`, Dependabot `chore(deps:)`

## Project Conventions

### Framework & integrations

- **Astro** with static output (`output: "static"`); versions per `package.json`
- **Tailwind CSS v4** via `@tailwindcss/vite` (no PostCSS config, no tailwind.config, no `@layer`, no `@apply`); `prose` via `@tailwindcss/typography`
- **DM Sans** via `@fontsource-variable/dm-sans` (loaded in `Layout.astro`); **astro-icon** with Tabler icons (`tabler:*`)
- No JS framework — zero client interactivity unless truly required; incremental scripts only via `<script>` islands

### Astro best practices

- Small, focused components; extract repeated markup into shared components (e.g. `EventCardBody.astro`)
- Type every component's `Props`; use collection generics (`CollectionEntry<"events">`)
- Prefer data-driven loops (`LOCALE_VALUES`, `PAGE_ROUTES` keys) over hardcoded branches
- `astro:assets` `Image` with explicit `alt`, `widths`, `sizes`; never a bare `<img>`
- `getStaticPaths` via `getDetailPaths` from `src/utils/locale.ts`
- Logic in `src/utils/` (typed, unit-tested); `.astro` files stay declarative
- Reuse the helpers (`pageHref`, `contentHref`, `localeUrlPrefix`, `getPage`) — never hand-build URLs or locale maps

### i18n

- Default locale German (`de`), no URL prefix; other locales get a prefix (Norwegian `/no/`, French `/fr/`) and language-specific slugs (`src/utils/pages.ts`)
- UI strings in `src/i18n/{de,no,fr}.ts`, typed as `UIType` (from `UI.de`), exported as `UI` from `src/i18n/index.ts`; access via `Astro.locals.t` (set in `src/middleware.ts`)
- `Astro.locals.locale` is a `Locale` from `src/config.ts`; use `Locale.De`/`Locale.No`/`Locale.Fr` and `localeUrlPrefix[locale]`, never inline locale literals
- Content schema `lang` is derived from `LOCALE_VALUES` in `src/content.config.ts`
- Adding a locale: `.agents/skills/add-locale/SKILL.md`

### Content

Collections in `src/content/{events,board,pages}/{de,no,fr}/*.md`; schemas in `src/content.config.ts`. Helpers in `src/utils/locale.ts`: `getPage(locale, slug)`, `getDetailPaths(collectionName, locale)`, `contentHref(entry, collectionName)`.

### Components & Pages

- Reusable components in `src/components/` (inspect the folder for props): `PageLayout`, `PageSection`, `CardGrid`, `BackLink`, `Button`, `LanguageSwitcher`, plus the extracted card bodies
- Prose-only pages reuse the `pages` collection + existing route template; mixed pages add a custom template
- All pages read `Astro.locals.locale` and `Astro.locals.t`; detail pages (event / board member) use `getDetailPaths` in `getStaticPaths`

### Styling

- Brand red: `#d51f27` (light) / `#ef4444` (dark)
- Red-tinted `border-2`, clearly perceptible hovers, visible focus rings, cards with white bg, red-tinted border, rounded corners

### Tests

- **Locale-agnostic**: adding a language MUST NOT require editing any `*.test.ts`
- Never hardcode a locale — iterate `LOCALE_VALUES` and compare against `Locale.De` (see `src/i18n/parity.test.ts`)
- Shared `astro:content`/`astro:assets` mocks live once in `src/test/setup.ts` (Vitest `setupFiles`); override in-file only for fixtures (see `src/utils/events.test.ts`)