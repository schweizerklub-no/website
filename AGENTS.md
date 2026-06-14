# Standing Instructions for AI Agents

## Mandatory Gates

Every change MUST pass ALL of these before being considered done:

- `pnpm astro check` — 0 errors
- `pnpm biome check .` — no warnings or errors
- `pnpm test` — all tests pass
- `pnpm build` — succeeds

Use `mise run verify` to run all four at once. Use `mise run fix` to auto-format with Biome.

- `mise run dev` — start dev server
- `mise run build` — production build

## Code Rules

### No duplication

Extract shared logic into `src/utils/` helpers. Do not copy-paste. If the same pattern appears more than once, factor it out.

### Tests required

Every utility function MUST have a Vitest test file (`*.test.ts`) co-located in the same directory. Test files use `describe`/`it`/`expect` (Vitest globals are not enabled — import from `vitest`).

### Package manager

Use **pnpm** only. Never npm, never yarn.

pnpm version is auto-detected from the `packageManager` field in `package.json` — no need to specify it in CI. Node version is always read from `.nvmrc`.

### Linting and formatting

Use **Biome** (not ESLint, not Prettier). Biome is configured in `biome.json`.

### TypeScript

- TypeScript 6.0.3 with `strictNullChecks: true`
- Check with `astro check` (wraps `tsc` with Astro-aware settings)
- Use `~/*` path alias for `src/*` imports in `.ts` and `.astro` files
- `z` imports from `astro/zod`, NOT from `astro:content`

### GitHub Actions

All action steps MUST use SHA-pinned versions (no semver tags). Use `step-security/harden-runner` where possible.

### Deployment & Versioning

See [`docs/deployment.md`](docs/deployment.md) for the full picture.

- Push to `main` triggers the **Tag, Build & Deploy** workflow: semantic-release → build (`PUBLIC_APP_VERSION`) → deploy to Cloudflare Pages
- Version bumps follow conventional commits: `fix:` → patch, `feat:` → minor, `BREAKING` → major
- `chore:`, `docs:`, `refactor:`, `test:` — **no version bump** (no GitHub Release created, but deploy still runs)
- Dependabot auto-merges with `chore(deps:)` → deploys without a version bump
- The version appears in the footer as `import.meta.env.PUBLIC_APP_VERSION` (falls back to `0.0.0-dev` locally)
- Manual deploy: use `workflow_dispatch` on the **Tag, Build & Deploy** action

## Project Conventions

### Framework & integrations

- **Astro 6.x** with static output (`output: "static"`)
- **Tailwind CSS v4** via `@tailwindcss/vite` (no PostCSS config, no tailwind.config, no `@layer`, no `@apply`)
- **DM Sans** font via `@fontsource-variable/dm-sans` — loaded in `Layout.astro`
- **astro-icon** with Tabler icons (`tabler:*`)
- No JS framework (React, Vue, Svelte) — zero client interactivity
- **Tailwind `prose`** for Markdown-rendered content (require `@tailwindcss/typography`)

### i18n

- Default locale: German (`de`), no URL prefix
- Norwegian at `/no/` prefix
- Adding a locale: follow `.agents/skills/add-locale/SKILL.md`
- All UI text lives in `src/i18n/{de,no}.ts`, exported from `src/i18n/index.ts` as `UI`
- Type of all UI text is `UIType` (inferred from `UI.de`)
- Access via `Astro.locals.t` (set by middleware in `src/middleware.ts`)
- `Astro.locals.locale` is `"de" | "no"`
- Use `Locale.De` and `Locale.No` from `src/config.ts` (const object, inline string), never inline `"de"` or `"no"`
- Use `localeUrlPrefix[locale]` (from `src/utils/locale.ts`) instead of ternaries like `locale === Locale.De ? "" : "/no"`

### Content

Content lives in Astro Content Collections in `src/content/`:
- `events` — `src/content/events/{de,no}/*.md`
- `board` — `src/content/board/{de,no}/*.md`
- `pages` — `src/content/pages/{de,no}/*.md`

Collections are configured in `src/content.config.ts` with Zod schemas.

Helpers to use:
- `getPage(locale, slug)` from `src/utils/locale.ts` — returns `{ entry, Content }`
- `getDetailPaths(collectionName, locale)` — for `getStaticPaths` in detail pages
- `contentHref(entry, collectionName)` — builds locale-aware URL for a content entry

### Components

Shared components in `src/components/`:
- `PageLayout.astro` — standard page wrapper, reads `Astro.locals`
- `PageSection.astro` — section with optional prose styling
- `EventCard.astro` — event listing card (locale-aware link)
- `BoardMemberCard.astro` — board member card (locale-aware link)
- `CardGrid.astro` — responsive grid container
- `BackLink.astro` — back-navigation link
- `LanguageSwitcher.astro` — CSS dropdown, fully data-driven from `localeUrlPrefix`
- `LanguageLink.astro` — reusable locale-switch link
- `Button.astro` — styled link button
- `HeroText.astro` — homepage hero section
- `ToggleTheme.astro` — dark/light mode toggle
- `ToggleMenu.astro` — mobile nav toggle

### Pages

- Prose-only pages use the `pages` content collection + existing template at `src/pages/{slug}/index.astro`
- Mixed pages (structured + markdown) need a custom template
- All pages read `Astro.locals.locale` and `Astro.locals.t`
- Detail pages (event detail, board member detail) use `getDetailPaths` in `getStaticPaths`

### Styling

- Brand red: `#d51f27` (light) / `#ef4444` (dark)
- Borders use red-tinted colors for brand identity — use `border-2` for sufficient contrast (UU)
- Hover effects must be clearly perceptible
- All interactive elements need visible focus rings
- Cards have consistent design: white bg, red-tinted border, rounded corners
- LanguageSwitcher trigger: `py-3` matches nav item height, `text-sm`, `gap-2`

### Tests

Located in `src/**/*.test.ts`, parsed via `vitest.config.ts` (`include: ["src/**/*.test.ts"]`). Import from `vitest` (no globals).
