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

export const PAGE_ROUTES: Record<PageKey, PageRoute> = {
  anlasse: {
    segment: { de: "anlasse", no: "arrangementer" },
  },
  uberUns: {
    segment: { de: "uber-uns", no: "om-oss" },
    contentSlug: { de: "uber-uns", no: "om-oss" },
  },
  mitgliedschaft: {
    segment: { de: "mitgliedschaft", no: "medlemskap" },
    contentSlug: { de: "mitgliedschaft", no: "medlemskap" },
  },
  interessegruppen: {
    segment: { de: "interessegruppen", no: "interessegrupper" },
    contentSlug: { de: "interessegruppen", no: "interessegrupper" },
  },
  asrUndAso: {
    segment: { de: "asr-und-aso", no: "asr-og-aso" },
    contentSlug: { de: "asr-und-aso", no: "asr-og-aso" },
  },
  kontakt: {
    segment: { de: "kontakt", no: "kontakt" },
    contentSlug: { de: "kontakt", no: "kontakt" },
  },
  privacyPolicy: {
    segment: { de: "privacy-policy", no: "personvern" },
    contentSlug: { de: "privacy-policy", no: "personvern" },
  },
};

export function pageSegment(locale: Locale, key: PageKey): string {
  return PAGE_ROUTES[key].segment[locale];
}

export function pageSlug(locale: Locale, key: PageKey): string {
  const slug = PAGE_ROUTES[key].contentSlug?.[locale];
  if (!slug)
    throw new Error(
      `No content slug for page key "${key}" in locale "${locale}"`,
    );
  return slug;
}
