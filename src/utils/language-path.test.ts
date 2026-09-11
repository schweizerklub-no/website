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

function forEachKeyPair(
  callback: (key: PageKey, from: Locale, to: Locale) => void,
) {
  for (const key of keys) {
    for (const from of LOCALE_VALUES) {
      for (const to of LOCALE_VALUES) {
        if (from === to) continue;
        callback(key, from, to);
      }
    }
  }
}

describe("translatePath", () => {
  it("swaps each page segment between locales", () => {
    forEachKeyPair((key, from, to) => {
      expect(translatePath(pageHref(from, key), from, to)).toBe(
        pageHref(to, key),
      );
    });
  });

  it("round-trips between locales", () => {
    forEachKeyPair((key, from, to) => {
      const original = pageHref(from, key);
      expect(translatePath(translatePath(original, from, to), to, from)).toBe(
        original,
      );
    });
  });

  it("preserves detail slugs while swapping the segment", () => {
    forEachKeyPair((key, from, to) => {
      expect(
        translatePath(`${pageHref(from, key)}jan-mueller/`, from, to),
      ).toBe(`${pageHref(to, key)}jan-mueller/`);
    });
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
