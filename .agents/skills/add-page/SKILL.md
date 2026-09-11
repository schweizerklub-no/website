---
name: add-page
description: Use when adding a new page content file or page template to this website.
---

# Add a New Page

Checklist for adding a new page to the website.

## Determine page type

- **Prose-only** — body text lives entirely in a Markdown content file. Use this for text-heavy pages (about, privacy policy, etc.).
- **Mixed** — body text in Markdown, but the template has structured sections (fee tables, address blocks, etc.). Use this for pages like Mitgliedschaft or Kontakt.

Both types use the `pages` content collection.

## 1. Create content file

Create `src/content/pages/{locale}/{slug}.md`:

```md
---
lang: "de"        # locale code, e.g. "no" for Norwegian
title: "Page Title"
description: "Optional description"
---

Markdown content here.
```

For each additional locale, create a parallel content file using that locale's folder and its own language-specific slug — e.g. `src/content/pages/no/om-oss.md` for Norwegian (see `src/utils/pages.ts` for the slug per locale).

Every locale has its own slugs. Add the page to `PAGE_ROUTES` in `src/utils/pages.ts` (segment + contentSlug per locale) so `navigation.ts`, `contentHref`, and `translatePath` stay in sync.

## 2. Update i18n

If the page title or nav link needs translation, add keys in `src/i18n/{locale}.ts` for every supported locale:

- `src/i18n/de.ts` — German text
- `src/i18n/no.ts` — Norwegian text
- (+ any future locale)

## 3. Add navigation link (optional)

If the page should appear in the nav, add it in `src/navigation.ts`:

```ts
// In headerData(), add to the links array:
{ text: nav.yourKey, href: getPermalink(`${prefix}/${pageSegment(locale, "yourKey")}`) },
```

Also add the `yourKey` to the `nav` sections in `src/i18n/{locale}.ts` for every supported locale and to the `PAGE_ROUTES` map in `src/utils/pages.ts`.

## 4. Create shared component (mixed pages only)

Create `src/components/pages/{YourPage}.astro`:

```astro
---
import PageLayout from '~/layouts/PageLayout.astro';
import PageSection from '~/components/PageSection.astro';
import { getPage } from '~/utils/locale';
import { pageSlug } from '~/utils/pages';

const { entry, Content } = await getPage(Astro.locals.locale, pageSlug(Astro.locals.locale, "{pageKey}"));
const metadata = { title: entry.data.title };
---

<PageLayout {metadata}>
  <PageSection title={entry.data.title} prose>
    <Content />
  </PageSection>
  {/* structured sections here */}
</PageLayout>
```

Then create a thin wrapper file per locale:

`src/pages/{slug}/index.astro`:
```astro
---
import YourPage from '~/components/pages/YourPage.astro';
---
<YourPage />
```

`src/pages/no/{slug}/index.astro` (use the locale-specific URL segment from `PAGE_ROUTES`, e.g. `src/pages/no/om-oss/`):
```astro
---
import YourPage from '~/components/pages/YourPage.astro';
---
<YourPage />
```

### Prose-only pages

If the page is pure Markdown (no structured sections), use the existing `ProsePage` component — no new template needed. Pass the **page key**, resolved against the locale internally:

`src/pages/{slug}/index.astro` → `<ProsePage page="{pageKey}" />`

## 5. Verify

Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and confirm the new page renders at the expected URL.
