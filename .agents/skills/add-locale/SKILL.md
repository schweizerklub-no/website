---
name: add-locale
description: Use when adding a new locale, language, or translation files to this website.
---

# Add a New Locale

Checklist for adding a new language to the project.

## 1. Define locale in config

In `src/config.ts`, add the locale to the `Locale` const:

```ts
export const Locale = {
  De: "de",
  No: "no",
  Fr: "fr",
} as const;
```

`LOCALE_VALUES` (`Object.values(Locale)`) is the single source of truth — every loop and every derived type follows from it.

## 2. Add URL prefix and date locale

In `src/utils/locale.ts`, add entries to:

```ts
export const localeUrlPrefix: Record<Locale, string> = {
  de: "",
  no: "/no",
  fr: "/fr",
};

export const dateLocale: Record<Locale, string> = {
  de: "de-DE",
  no: "nb-NO",
  fr: "fr-FR",
};
```

## 3. Give the new locale its own slugs (REQUIRED)

Every locale gets language-specific slugs (German slugs are only the exception for the default `de` locale).

In `src/utils/pages.ts`, add the new locale to the `segment` (URL) and `contentSlug` (content file) maps for **every** page key:

```ts
export const PAGE_ROUTES: Record<PageKey, PageRoute> = {
  anlasse: {
    segment: { de: "anlasse", no: "arrangementer", fr: "evenements" },
  },
  uberUns: {
    segment: { de: "uber-uns", no: "om-oss", fr: "a-propos" },
    contentSlug: { de: "uber-uns", no: "om-oss", fr: "a-propos" },
  },
  // ... mitgliedschaft, interessegruppen, asrUndAso, kontakt, privacyPolicy
};
```

`contentHref`, `navigation.ts`, `pageSegment`, `pageSlug`, and `translatePath` all read from this map — no other code needs locale-specific branches.

## 4. Create i18n file

Create `src/i18n/fr.ts` with **all keys** matching `src/i18n/de.ts`. Example structure:

```ts
export const fr = {
  lang: "fr",
  label: "Français",
  home: {
    metaTitle: "...",
    title: "...",
    // ... all home keys
  },
  nav: {
    anlasse: "...",
    // ... all nav keys
  },
  footer: {
    // ... all footer keys
  },
  pages: {
    // ... all pages keys
  },
  misc: {
    // ... all misc keys
  },
} as const;
```

## 5. Register in i18n index

In `src/i18n/index.ts`:

```ts
import { fr } from "./fr";
export const UI = { de, no, fr } as const;
```

## 6. Content schema needs NO edit

`src/content.config.ts` derives its `lang` enum from `LOCALE_VALUES` — do not hardcode the locale list there. The content files' `lang` field picks up the new locale automatically.

## 7. Create content directories

```
src/content/events/fr/
src/content/board/fr/
src/content/pages/fr/
```

Add at least one sample file per collection with `lang: "fr"` in frontmatter.

**Page content files** must use the language-specific file names defined in `PAGE_ROUTES` (step 3), e.g. `src/content/pages/fr/a-propos.md`, NOT the German names.

## 8. Tests stay untouched (REQUIRED)

Do **not** modify any `*.test.ts`. Unit tests are locale-agnostic: they iterate `LOCALE_VALUES` and compare every locale against the default (`Locale.De`), so a new language must pass without edits — including `src/i18n/parity.test.ts` and `src/utils/pages.test.ts` (which also asserts a route page and content file exist per locale). If a test fails, it is because a step above is incomplete, not because the test needs changing.

## 9. Verify

Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and confirm pages and events render at the new locale's URLs (e.g. `/fr/evenements/`).