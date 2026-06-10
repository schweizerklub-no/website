# Plan Website — Schweizer Klub Norwegen Oslo

## Goal

Replace the current Webflow site with a fast, maintainable static site built with **Astro** + **Tailwind CSS**, deployed to Cloudflare Pages via GitHub Actions. Content is version-controlled Markdown, no CMS, no Google Analytics.

## Template

**[AstroWind](https://github.com/arthelokyo/astrowind)** — free, MIT-licensed, Astro v6 + Tailwind CSS v4. Ships with dark mode, blog, SEO, image optimization, and responsive layout components.

## Phases

### Phase 0 — Reset & scaffold

- Remove VitePress boilerplate (`.vitepress/`, `docs/`, VitePress deps from `package.json`)
- Scaffold AstroWind: `pnpm create astro@latest . --template arthelokyo/astrowind --install`
- Remove npm-specific files (`package-lock.json`, `.npmrc`, `eslint.config.js`, `.prettierrc.mjs`, `.prettierignore`)
- Update `mise.toml` tasks for pnpm (`pnpm run dev`, `pnpm run build`)
- Update `package.json` scripts to match AstroWind
- Adapt `biome.json` and `tsconfig.json` to new structure

### Phase 1 — Content Collections

Define typed schemas in `src/content.config.ts`:

- **events** — `title`, `date`, `visibilityEnd`, `image`, `description`
- **board** — `name`, `role`, `image`, `bio`
- **pages** — standard markdown pages per locale (no schema needed beyond frontmatter)

### Phase 2 — Pages & navigation

- **Nav items**: Home, Anlässe, Beitritt, Über uns, Interessegruppen, ASR und ASO, Kontakt
- **Pages**: Migrate content from current Webflow site into Markdown files
- **Home page**: Hero section + events preview + board member grid
- **Anlässe page**: Event list filtered by `visibilityEnd` (past events hidden)
- **Language switcher**: German / Norwegian flags in header, French added later

### Phase 3 — Components (Astro + Tailwind)

All components use Tailwind `dark:` variants for dark mode support.

- `Header.astro` — responsive navigation, language switcher, theme toggle
- `ThemeToggle.astro` — sun/moon icon button, persists choice in `localStorage`, respects `prefers-color-scheme`
- `Footer.astro` — link list, social icons, contact email
- `EventCard.astro` — event image, date, title; auto-hides after `visibilityEnd`
- `BoardMemberCard.astro` — photo, name, role
- `PricingTable.astro` — Einzelmitglied (200 NOK) / Paar-Familienmitglied (400 NOK)

### Phase 4 — i18n

- Astro's built-in `astro:i18n` routing (`/de/anlasse`, `/no/arrangementer`)
- Start with German and Norwegian; add French later
- Shared translated strings via a simple JSON dictionary in `src/i18n/`

### Phase 5 — Deployment

- Install `@astrojs/cloudflare` adapter with `output: 'static'`
- All GitHub Actions steps use **SHA-pinned versions** (never semver tags like `@v4`) for supply-chain security
- GitHub Actions workflow (SHAs resolved at implementation time):
  ```yaml
  name: Deploy to Cloudflare Pages
  on:
    push:
      branches: [main]
  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@<SHA>         # pinned, not @v4
        - uses: pnpm/action-setup@<SHA>        # pinned, not @v6
        - uses: actions/setup-node@<SHA>       # pinned, not @v6
          with:
            node-version: 24
            cache: 'pnpm'
        - run: pnpm install --frozen-lockfile
        - run: pnpm build
        - uses: cloudflare/wrangler-action@<SHA> # pinned, not @v3
          with:
            apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
            accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
  ```
- Configure **Renovate** (or Dependabot) with `pinDigests: true` to automatically receive PRs updating SHAs
- Point `schweizerklub.no` DNS to Cloudflare

### Phase 6 — Polish

- SEO: per-page meta tags, OG images, sitemap, `robots.txt`
- No analytics or tracking
- Dark mode: `ui.theme: 'system'` in `config.yaml` (defaults to OS preference, togglable)

## Tools

- **pnpm** 11.x (package manager)
- **Biome** (linting + formatting — already configured)
- **mise** (task runner — already configured)
