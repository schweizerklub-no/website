---
name: add-page
description: Use when adding a new page content file or page template to this website.
---

# Add a New Page

Checklist for adding a page (content file + optional template).

## Decide the type

- **Prose-only** — body is entirely Markdown; reuse the existing `ProsePage` template.
- **Mixed** — Markdown body plus structured sections (fee tables, address blocks); needs a custom template.

Both use the `pages` content collection.

## 1. Content files

Create `src/content/pages/{locale}/{slug}.md` for every locale; each locale uses its **own slug** from `PAGE_ROUTES` (e.g. `src/content/pages/no/om-oss.md`).

Add the page to `PAGE_ROUTES` in `src/utils/pages.ts` (`segment` + `contentSlug` per locale) so navigation, `contentHref`, and `translatePath` stay in sync.

## 2. UI strings

Add keys to the relevant section(s) in `src/i18n/{locale}.ts` for every locale. To show the page in the nav, extend `HEADER_PAGE_KEYS` in `src/navigation.ts` and the `nav` section of each i18n file.

## 3. Template (mixed pages only)

Create `src/components/pages/{YourPage}.astro`, modeled on existing mixed pages, wired to content via the page key:

```astro
---
const { locale } = Astro.locals;
const { entry, Content } = await getPage(locale, pageSlug(locale, "{pageKey}"));
const metadata = { title: entry.data.title };
---
<PageLayout {metadata}>
  <PageSection title={entry.data.title} prose><Content /></PageSection>
  {/* structured sections */}
</PageLayout>
```

Then a thin route wrapper per locale at `src/pages/{segment}/{locale}/index.astro` (segment from `PAGE_ROUTES`):

```astro
---
import YourPage from '~/components/pages/YourPage.astro';
---
<YourPage />
```

Prose-only pages skip the template: `src/pages/{segment}/index.astro` → `<ProsePage page="{pageKey}" />`.

## 4. Verify

Run the mandatory gates and confirm the page renders at the expected URL.