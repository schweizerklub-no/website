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

## 3. Create i18n file

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

## 4. Register in i18n index

In `src/i18n/index.ts`:

```ts
import { fr } from "./fr";
export const UI = { de, no, fr } as const;
```

## 5. Create content directories

```
src/content/events/fr/
src/content/board/fr/
src/content/pages/fr/
```

Add at least one sample file per collection with `lang: "fr"` in frontmatter.

## 6. Verify

Run the [Mandatory Gates](/AGENTS.md#mandatory-gates) and update the i18n parity test if needed.
