import { describe, expect, it } from "vitest";
import { Locale } from "~/config";
import {
  PAGE_ROUTES,
  type PageKey,
  pageSegment,
  pageSlug,
} from "~/utils/pages";

const keys: PageKey[] = [
  "anlasse",
  "uberUns",
  "mitgliedschaft",
  "interessegruppen",
  "asrUndAso",
  "kontakt",
  "privacyPolicy",
];

describe("PAGE_ROUTES", () => {
  it("covers every page key for both locales", () => {
    for (const key of keys) {
      expect(PAGE_ROUTES[key].segment.de).toBeTruthy();
      expect(PAGE_ROUTES[key].segment.no).toBeTruthy();
    }
  });

  it("defines a de segment for every key", () => {
    const deSegments = keys.map((k) => PAGE_ROUTES[k].segment.de);
    expect(deSegments).toEqual([
      "anlasse",
      "uber-uns",
      "mitgliedschaft",
      "interessegruppen",
      "asr-und-aso",
      "kontakt",
      "privacy-policy",
    ]);
  });

  it("defines Norwegian segments per the expected mapping", () => {
    const noSegments = keys.map((k) => PAGE_ROUTES[k].segment.no);
    expect(noSegments).toEqual([
      "arrangementer",
      "om-oss",
      "medlemskap",
      "interessegrupper",
      "asr-og-aso",
      "kontakt",
      "personvern",
    ]);
  });
});

describe("pageSegment", () => {
  it("returns the generic German segment", () => {
    expect(pageSegment(Locale.De, "anlasse")).toBe("anlasse");
    expect(pageSegment(Locale.De, "privacyPolicy")).toBe("privacy-policy");
  });

  it("returns the Norwegian segment", () => {
    expect(pageSegment(Locale.No, "anlasse")).toBe("arrangementer");
    expect(pageSegment(Locale.No, "uberUns")).toBe("om-oss");
    expect(pageSegment(Locale.No, "privacyPolicy")).toBe("personvern");
  });
});

describe("pageSlug", () => {
  it("returns the German content slug", () => {
    expect(pageSlug(Locale.De, "uberUns")).toBe("uber-uns");
    expect(pageSlug(Locale.De, "kontakt")).toBe("kontakt");
  });

  it("returns the Norwegian content slug", () => {
    expect(pageSlug(Locale.No, "uberUns")).toBe("om-oss");
    expect(pageSlug(Locale.No, "mitgliedschaft")).toBe("medlemskap");
    expect(pageSlug(Locale.No, "privacyPolicy")).toBe("personvern");
  });

  it("throws for keys without a content slug", () => {
    expect(() => pageSlug(Locale.De, "anlasse")).toThrow();
  });
});
