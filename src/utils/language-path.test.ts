import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { LOCALE_VALUES, Locale } from "~/config";
import { pageKeyForSegment, translatePath } from "~/utils/language-path";
import { pageHref } from "~/utils/locale";
import { PAGE_ROUTES, type PageKey, pageSegment } from "~/utils/pages";

const keys = Object.keys(PAGE_ROUTES) as PageKey[];

describe("translatePath", () => {
  it("swaps each page segment between locales", () => {
    for (const key of keys) {
      expect(
        translatePath(pageHref(Locale.De, key), Locale.De, Locale.No),
      ).toBe(pageHref(Locale.No, key));
      expect(
        translatePath(pageHref(Locale.No, key), Locale.No, Locale.De),
      ).toBe(pageHref(Locale.De, key));
    }
  });

  it("round-trips between locales", () => {
    for (const key of keys) {
      const de = pageHref(Locale.De, key);
      const no = translatePath(de, Locale.De, Locale.No);
      expect(translatePath(no, Locale.No, Locale.De)).toBe(de);
    }
  });

  it("preserves detail slugs while swapping the segment", () => {
    for (const key of keys) {
      expect(
        translatePath(
          `${pageHref(Locale.De, key)}jan-mueller/`,
          Locale.De,
          Locale.No,
        ),
      ).toBe(`${pageHref(Locale.No, key)}jan-mueller/`);
      expect(
        translatePath(
          `${pageHref(Locale.No, key)}jan-mueller/`,
          Locale.No,
          Locale.De,
        ),
      ).toBe(`${pageHref(Locale.De, key)}jan-mueller/`);
    }
  });

  it("translates the home path", () => {
    expect(translatePath("/", Locale.De, Locale.No)).toBe("/no/");
    expect(translatePath("/no/", Locale.No, Locale.De)).toBe("/");
  });

  it("handles paths without trailing slash", () => {
    expect(translatePath("/uber-uns", Locale.De, Locale.No)).toBe(
      "/no/om-oss/",
    );
  });
});

describe("pageKeyForSegment", () => {
  it("resolves every segment to its page key", () => {
    for (const key of keys) {
      for (const locale of LOCALE_VALUES) {
        expect(pageKeyForSegment(pageSegment(locale, key))).toBe(key);
      }
    }
  });

  it("returns undefined for unknown segments", () => {
    expect(pageKeyForSegment("unbekannt")).toBeUndefined();
    expect(pageKeyForSegment(undefined)).toBeUndefined();
  });
});
