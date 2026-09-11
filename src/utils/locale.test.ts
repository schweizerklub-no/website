import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { LOCALE_VALUES, Locale } from "~/config";
import {
  contentHref,
  dateLocale,
  detectLocale,
  localeUrlPrefix,
  pageHref,
  stripLocalePrefix,
} from "~/utils/locale";
import { PAGE_ROUTES, type PageKey } from "~/utils/pages";

const keys = Object.keys(PAGE_ROUTES) as PageKey[];

describe("localeUrlPrefix", () => {
  for (const locale of LOCALE_VALUES) {
    it(`maps ${locale} to a string with locales as keys`, () => {
      expect(typeof localeUrlPrefix[locale]).toBe("string");
    });
  }
});

describe("dateLocale", () => {
  for (const locale of LOCALE_VALUES) {
    it(`defines a date locale for ${locale}`, () => {
      expect(dateLocale[locale].length).toBeGreaterThan(0);
    });
  }
});

describe("stripLocalePrefix", () => {
  for (const locale of LOCALE_VALUES) {
    it(`strips the ${locale} prefix from its own entries`, () => {
      expect(stripLocalePrefix(`${locale}/bundesfeier`, locale)).toBe(
        "bundesfeier",
      );
    });
  }

  it("returns id unchanged when no prefix matches", () => {
    expect(stripLocalePrefix("bundesfeier", Locale.De)).toBe("bundesfeier");
  });

  it("handles nested slugs", () => {
    expect(stripLocalePrefix("de/2026-05-stammtisch", Locale.De)).toBe(
      "2026-05-stammtisch",
    );
  });
});

describe("detectLocale", () => {
  it("returns de for root path", () => {
    expect(detectLocale("/")).toBe(Locale.De);
  });

  it("returns the locale for its own page URLs", () => {
    for (const locale of LOCALE_VALUES) {
      for (const key of keys) {
        expect(detectLocale(pageHref(locale, key))).toBe(locale);
      }
    }
  });

  it("returns no for bare /no", () => {
    expect(detectLocale("/no")).toBe(Locale.No);
  });
});

describe("pageHref", () => {
  it("builds a URL from PAGE_ROUTES for every key and locale", () => {
    for (const key of keys) {
      for (const locale of LOCALE_VALUES) {
        const { segment } = PAGE_ROUTES[key];
        expect(pageHref(locale, key)).toBe(
          `${localeUrlPrefix[locale]}/${segment[locale]}/`,
        );
      }
    }
  });

  it("is locale-detectable for every generated URL", () => {
    for (const locale of LOCALE_VALUES) {
      for (const key of keys) {
        expect(detectLocale(pageHref(locale, key))).toBe(locale);
      }
    }
  });
});

describe("contentHref", () => {
  it("builds a content URL from the entry locale and page key", () => {
    for (const locale of LOCALE_VALUES) {
      for (const key of keys) {
        const entry = { id: `${locale}/jan-mueller`, data: { lang: locale } };
        const { segment } = PAGE_ROUTES[key];
        expect(contentHref(entry, key)).toBe(
          `${localeUrlPrefix[locale]}/${segment[locale]}/jan-mueller/`,
        );
      }
    }
  });

  it("is locale-detectable for every generated URL", () => {
    for (const locale of LOCALE_VALUES) {
      for (const key of keys) {
        const entry = { id: `${locale}/jan-mueller`, data: { lang: locale } };
        expect(detectLocale(contentHref(entry, key))).toBe(locale);
      }
    }
  });
});
