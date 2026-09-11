import type { Locale } from "~/config";

export type PageKey =
  | "anlasse"
  | "uberUns"
  | "mitgliedschaft"
  | "interessegruppen"
  | "asrUndAso"
  | "kontakt"
  | "privacyPolicy";

interface PageRoute {
  segment: Record<Locale, string>;
  contentSlug?: Record<Locale, string>;
}

export const PAGE_ROUTES = {
  anlasse: {
    segment: { de: "anlasse", no: "arrangementer", fr: "evenements" },
  },
  uberUns: {
    segment: { de: "uber-uns", no: "om-oss", fr: "a-propos" },
    contentSlug: { de: "uber-uns", no: "om-oss", fr: "a-propos" },
  },
  mitgliedschaft: {
    segment: { de: "mitgliedschaft", no: "medlemskap", fr: "adhesion" },
    contentSlug: { de: "mitgliedschaft", no: "medlemskap", fr: "adhesion" },
  },
  interessegruppen: {
    segment: {
      de: "interessegruppen",
      no: "interessegrupper",
      fr: "groupes-interet",
    },
    contentSlug: {
      de: "interessegruppen",
      no: "interessegrupper",
      fr: "groupes-interet",
    },
  },
  asrUndAso: {
    segment: { de: "asr-und-aso", no: "asr-og-aso", fr: "asr-et-aso" },
    contentSlug: { de: "asr-und-aso", no: "asr-og-aso", fr: "asr-et-aso" },
  },
  kontakt: {
    segment: { de: "kontakt", no: "kontakt", fr: "contact" },
    contentSlug: { de: "kontakt", no: "kontakt", fr: "contact" },
  },
  privacyPolicy: {
    segment: {
      de: "privacy-policy",
      no: "personvern",
      fr: "politique-confidentialite",
    },
    contentSlug: {
      de: "privacy-policy",
      no: "personvern",
      fr: "politique-confidentialite",
    },
  },
} as const satisfies Record<PageKey, PageRoute>;

export function pageSegment(locale: Locale, key: PageKey) {
  return PAGE_ROUTES[key].segment[locale];
}

export function pageSlug(locale: Locale, key: PageKey) {
  const route = PAGE_ROUTES[key];
  const slug = "contentSlug" in route ? route.contentSlug[locale] : undefined;
  if (!slug)
    throw new Error(
      `No content slug for page key "${key}" in locale "${locale}"`,
    );
  return slug;
}
