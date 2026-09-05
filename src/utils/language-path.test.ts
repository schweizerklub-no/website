import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { Locale } from "~/config";
import { pageKeyForSegment, translatePath } from "~/utils/language-path";

describe("translatePath", () => {
  it("translates German top-level page paths to Norwegian", () => {
    expect(translatePath("/anlasse/", Locale.De, Locale.No)).toBe(
      "/no/arrangementer/",
    );
    expect(translatePath("/uber-uns/", Locale.De, Locale.No)).toBe(
      "/no/om-oss/",
    );
    expect(translatePath("/mitgliedschaft/", Locale.De, Locale.No)).toBe(
      "/no/medlemskap/",
    );
    expect(translatePath("/interessegruppen/", Locale.De, Locale.No)).toBe(
      "/no/interessegrupper/",
    );
    expect(translatePath("/asr-und-aso/", Locale.De, Locale.No)).toBe(
      "/no/asr-og-aso/",
    );
    expect(translatePath("/kontakt/", Locale.De, Locale.No)).toBe(
      "/no/kontakt/",
    );
    expect(translatePath("/privacy-policy/", Locale.De, Locale.No)).toBe(
      "/no/personvern/",
    );
  });

  it("translates Norwegian top-level page paths to German", () => {
    expect(translatePath("/no/arrangementer/", Locale.No, Locale.De)).toBe(
      "/anlasse/",
    );
    expect(translatePath("/no/om-oss/", Locale.No, Locale.De)).toBe(
      "/uber-uns/",
    );
    expect(translatePath("/no/medlemskap/", Locale.No, Locale.De)).toBe(
      "/mitgliedschaft/",
    );
    expect(translatePath("/no/interessegrupper/", Locale.No, Locale.De)).toBe(
      "/interessegruppen/",
    );
    expect(translatePath("/no/asr-og-aso/", Locale.No, Locale.De)).toBe(
      "/asr-und-aso/",
    );
    expect(translatePath("/no/kontakt/", Locale.No, Locale.De)).toBe(
      "/kontakt/",
    );
    expect(translatePath("/no/personvern/", Locale.No, Locale.De)).toBe(
      "/privacy-policy/",
    );
  });

  it("preserves detail slugs while swapping the segment", () => {
    expect(translatePath("/no/om-oss/jan-mueller/", Locale.No, Locale.De)).toBe(
      "/uber-uns/jan-mueller/",
    );
    expect(translatePath("/uber-uns/jan-mueller/", Locale.De, Locale.No)).toBe(
      "/no/om-oss/jan-mueller/",
    );
    expect(
      translatePath("/anlasse/2026-08-bundesfeier/", Locale.De, Locale.No),
    ).toBe("/no/arrangementer/2026-08-bundesfeier/");
    expect(
      translatePath(
        "/no/arrangementer/2026-08-bundesfeier/",
        Locale.No,
        Locale.De,
      ),
    ).toBe("/anlasse/2026-08-bundesfeier/");
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
  it("resolves known segments to their page key", () => {
    expect(pageKeyForSegment("anlasse")).toBe("anlasse");
    expect(pageKeyForSegment("arrangementer")).toBe("anlasse");
    expect(pageKeyForSegment("uber-uns")).toBe("uberUns");
    expect(pageKeyForSegment("om-oss")).toBe("uberUns");
    expect(pageKeyForSegment("personvern")).toBe("privacyPolicy");
  });

  it("returns undefined for unknown segments", () => {
    expect(pageKeyForSegment("unbekannt")).toBeUndefined();
    expect(pageKeyForSegment(undefined)).toBeUndefined();
  });
});
