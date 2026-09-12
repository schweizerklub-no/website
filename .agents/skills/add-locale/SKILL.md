---
name: add-locale
description: Use when adding a new locale, language, or translation files to this website.
---

# Add a New Locale

Checklist for adding a language (currently `de`, `no`, `fr`). Each step names the file to extend — read it and mirror the existing locales rather than pasting full maps.

## 1. Register the locale

- `src/config.ts` — add the code to the `Locale` const. `LOCALE_VALUES = Object.values(Locale)` is the single source of truth.
- `src/content.config.ts` — no edit needed; the `lang` schema derives from `LOCALE_VALUES`.

## 2. URL prefix and date locale

In `src/utils/locale.ts`, add the new locale to `localeUrlPrefix` and `dateLocale`, mirroring existing entries.

## 3. Own slugs (REQUIRED)

In `src/utils/pages.ts`, add the locale to the `segment` and `contentSlug` maps for **every** `PAGE_ROUTES` key. Every locale gets language-specific slugs (German is the only exception, as default `de`). `contentHref`, `navigation.ts`, `pageSegment`, `pageSlug`, and `translatePath` all derive from this map.

## 4. UI strings

Create `src/i18n/{code}.ts` mirroring the full key structure of `src/i18n/de.ts` (translated values; `lang` must equal `{code}`). Register it in `src/i18n/index.ts`'s `UI`.

## 5. Content directories

Create `src/content/{events,board,pages}/{code}/` with at least one sample file using `lang: "{code}"`. **Page** files must use the language-specific names from step 3 (e.g. `a-propos.md`, not `uber-uns.md`).

## 6. Tests stay untouched (REQUIRED)

Do not modify any `*.test.ts`. Tests are locale-agnostic (iterate `LOCALE_VALUES`, compare to `Locale.De`); a failing test means a step above is incomplete — `src/utils/pages.test.ts` also verifies a route page and content file exist per locale.

## 7. Verify

Run the mandatory gates and confirm pages/events render at the new locale's URLs (e.g. `/fr/evenements/`).