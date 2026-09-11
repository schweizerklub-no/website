import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { LOCALE_VALUES, Locale } from "~/config";
import { footerData, HEADER_PAGE_KEYS, headerData } from "~/navigation";
import { pageHref } from "~/utils/locale";

describe("headerData", () => {
  for (const locale of LOCALE_VALUES) {
    it(`returns ${locale} nav links matching PAGE_ROUTES`, () => {
      const data = headerData(locale);
      expect(data.links).toHaveLength(HEADER_PAGE_KEYS.length);
      const expected = HEADER_PAGE_KEYS.map((key) => pageHref(locale, key));
      expect(data.links.map((link) => link.href)).toEqual(expected);
      expect(data.actions).toEqual([]);
    });
  }

  it("defaults to German", () => {
    expect(headerData().links[0].href).toBe(
      headerData(Locale.De).links[0].href,
    );
  });
});

describe("footerData", () => {
  for (const locale of LOCALE_VALUES) {
    it(`links the privacy page for ${locale}`, () => {
      expect(footerData(locale).secondaryLinks[0].href).toBe(
        pageHref(locale, "privacyPolicy"),
      );
    });
  }

  it("defaults to German", () => {
    expect(footerData().secondaryLinks[0].href).toBe(
      footerData(Locale.De).secondaryLinks[0].href,
    );
  });

  it("includes social links", () => {
    const data = footerData("de");
    expect(data.socialLinks).toHaveLength(2);
    expect(data.socialLinks[0].ariaLabel).toBe("Facebook");
    expect(data.socialLinks[1].ariaLabel).toBe("Instagram");
  });
});
