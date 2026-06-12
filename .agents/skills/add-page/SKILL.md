---
name: add-page
description: Use when adding a new page content file or page template to this website.
---

# Add a New Page

Checklist for adding a new page to the website.

## Determine page type

- **Prose-only** — body text lives entirely in a Markdown content file. Use this for text-heavy pages (about, privacy policy, etc.).
- **Mixed** — body text in Markdown, but the template has structured sections (fee tables, address blocks, etc.). Use this for pages like Beitritt or Kontakt.

Both types use the `pages` content collection.

## 1. Create content file

Create `src/content/pages/{locale}/{slug}.md`:

```md
---
lang: "de"        # or "no"
title: "Page Title"
description: "Optional description"
---

Markdown content here.
```

For Norwegian, create `src/content/pages/no/{slug}.md` with matching structure.

## 2. Update i18n

If the page title or nav link needs translation, add keys in:

- `src/i18n/de.ts` — German text
- `src/i18n/no.ts` — Norwegian text

## 3. Add navigation link (optional)

If the page should appear in the nav, add it in `src/navigation.ts`:

```ts
// In headerData(), add to the links array:
{ text: nav.yourKey, href: getPermalink(`${prefix}/your-slug`) },
```

Also add the `yourKey` to both `nav` sections in `src/i18n/{de,no}.ts`.

## 4. Create shared component (mixed pages only)

Create `src/components/pages/{YourPage}.astro`:

```astro
---
import PageLayout from '~/layouts/PageLayout.astro';
import PageSection from '~/components/PageSection.astro';
import { getPage } from '~/utils/locale';

const { entry, Content } = await getPage(Astro.locals.locale, "{slug}");
const metadata = { title: entry.data.title };
---

<PageLayout {metadata}>
  <PageSection title={entry.data.title} prose>
    <Content />
  </PageSection>
  {/* structured sections here */}
</PageLayout>
```

Then create two thin wrapper files:

`src/pages/{slug}/index.astro`:
```astro
---
import YourPage from '~/components/pages/YourPage.astro';
---
<YourPage />
```

`src/pages/no/{slug}/index.astro`:
```astro
---
import YourPage from '~/components/pages/YourPage.astro';
---
<YourPage />
```

### Prose-only pages

If the page is pure Markdown (no structured sections), use the existing `ProsePage` component — no new template needed:

`src/pages/{slug}/index.astro` → `<ProsePage slug="{slug}" />`
`src/pages/no/{slug}/index.astro` → `<ProsePage slug="{slug}" />`

## 5. Verify

Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and confirm the new page renders at the expected URL.
