import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { LOCALE_VALUES, type Locale } from "~/config";
import { localeUrlPrefix } from "~/utils/locale";
import {
  PAGE_ROUTES,
  type PageKey,
  pageSegment,
  pageSlug,
} from "~/utils/pages";

const keys = Object.keys(PAGE_ROUTES) as PageKey[];
const repoRoot = fileURLToPath(new URL("../..", import.meta.url));
const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("PAGE_ROUTES", () => {
  it("defines a non-empty segment for every key and locale", () => {
    for (const key of keys) {
      for (const locale of LOCALE_VALUES) {
        expect(pageSegment(locale, key).length).toBeGreaterThan(0);
      }
    }
  });

  it("uses kebab-case for all segments and content slugs", () => {
    for (const key of keys) {
      for (const locale of LOCALE_VALUES) {
        expect(pageSegment(locale, key)).toMatch(kebab);
        const route = PAGE_ROUTES[key];
        if ("contentSlug" in route) {
          expect(route.contentSlug[locale]).toMatch(kebab);
        }
      }
    }
  });

  it("maps each key to a unique segment per locale", () => {
    for (const locale of LOCALE_VALUES) {
      const segments = keys.map((key) => pageSegment(locale, key));
      expect(new Set(segments).size).toBe(segments.length);
    }
  });

  it("has a route page for every segment and locale", () => {
    for (const key of keys) {
      for (const locale of LOCALE_VALUES) {
        const segment = pageSegment(locale, key);
        const routeDir = pageRouteDirectory(locale, segment);
        expect(
          existsSync(routeDir),
          `missing route page for ${locale}/${segment}`,
        ).toBe(true);
      }
    }
  });

  it("matches each content slug to an existing file for the right locale", () => {
    for (const key of keys) {
      const route = PAGE_ROUTES[key];
      if (!("contentSlug" in route)) continue;
      for (const locale of LOCALE_VALUES) {
        const slug = route.contentSlug[locale];
        const file = `${repoRoot}src/content/pages/${locale}/${slug}.md`;
        expect(
          existsSync(file),
          `missing content file: ${locale}/${slug}`,
        ).toBe(true);
        expect(readFileSync(file, "utf8")).toMatch(`lang: ${locale}`);
      }
    }
  });
});

describe("pageSegment", () => {
  it("returns the segment stored in PAGE_ROUTES", () => {
    for (const key of keys) {
      for (const locale of LOCALE_VALUES) {
        expect(pageSegment(locale, key)).toBe(PAGE_ROUTES[key].segment[locale]);
      }
    }
  });
});

describe("pageSlug", () => {
  it("returns the content slug when defined", () => {
    for (const key of keys) {
      const route = PAGE_ROUTES[key];
      if (!("contentSlug" in route)) continue;
      for (const locale of LOCALE_VALUES) {
        expect(pageSlug(locale, key)).toBe(route.contentSlug[locale]);
      }
    }
  });

  it("throws for keys without a content slug", () => {
    for (const key of keys) {
      if ("contentSlug" in PAGE_ROUTES[key]) continue;
      for (const locale of LOCALE_VALUES) {
        expect(() => pageSlug(locale, key)).toThrow();
      }
    }
  });
});

function pageRouteDirectory(locale: Locale, segment: string): string {
  const prefix = localeUrlPrefix[locale].replace(/^\//, "");
  const dir = prefix
    ? `src/pages/${prefix}/${segment}`
    : `src/pages/${segment}`;
  return `${repoRoot}${dir}/index.astro`;
}
