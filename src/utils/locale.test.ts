import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { Locale } from "~/config";
import {
  contentHref,
  dateLocale,
  detectLocale,
  localeUrlPrefix,
  stripLocalePrefix,
} from "~/utils/locale";

describe("localeUrlPrefix", () => {
  it("maps de to empty string", () => {
    expect(localeUrlPrefix.de).toBe("");
  });

  it("maps no to /no", () => {
    expect(localeUrlPrefix.no).toBe("/no");
  });
});

describe("dateLocale", () => {
  it("maps de to de-DE", () => {
    expect(dateLocale.de).toBe("de-DE");
  });

  it("maps no to nb-NO", () => {
    expect(dateLocale.no).toBe("nb-NO");
  });
});

describe("stripLocalePrefix", () => {
  it("strips de/ prefix from German entries", () => {
    expect(stripLocalePrefix("de/bundesfeier", Locale.De)).toBe("bundesfeier");
  });

  it("strips no/ prefix from Norwegian entries", () => {
    expect(stripLocalePrefix("no/bundesfeier", Locale.No)).toBe("bundesfeier");
  });

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

  it("returns de for German paths", () => {
    expect(detectLocale("/anlasse/")).toBe(Locale.De);
    expect(detectLocale("/uber-uns/jan-mueller/")).toBe(Locale.De);
  });

  it("returns no for /no prefix", () => {
    expect(detectLocale("/no/")).toBe(Locale.No);
    expect(detectLocale("/no/anlasse/")).toBe(Locale.No);
    expect(detectLocale("/no/uber-uns/jan-mueller/")).toBe(Locale.No);
  });

  it("returns no for bare /no", () => {
    expect(detectLocale("/no")).toBe(Locale.No);
  });
});

describe("contentHref", () => {
  it("generates German event URL", () => {
    const entry = { id: "de/bundesfeier", data: { lang: Locale.De } };
    expect(contentHref(entry, "anlasse")).toBe("/anlasse/bundesfeier/");
  });

  it("generates Norwegian event URL", () => {
    const entry = { id: "no/bundesfeier", data: { lang: Locale.No } };
    expect(contentHref(entry, "anlasse")).toBe("/no/anlasse/bundesfeier/");
  });

  it("generates German board member URL", () => {
    const entry = { id: "de/jan-mueller", data: { lang: Locale.De } };
    expect(contentHref(entry, "uber-uns")).toBe("/uber-uns/jan-mueller/");
  });

  it("generates Norwegian board member URL", () => {
    const entry = { id: "no/jan-mueller", data: { lang: Locale.No } };
    expect(contentHref(entry, "uber-uns")).toBe("/no/uber-uns/jan-mueller/");
  });
});
