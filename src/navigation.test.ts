import { describe, expect, it, vi } from "vitest";

vi.mock("astro:content", () => ({
  getCollection: vi.fn(),
  getEntry: vi.fn(),
  render: vi.fn(),
}));

import { footerData, headerData } from "~/navigation";

describe("headerData", () => {
  it("returns German nav links with no prefix", () => {
    const data = headerData("de");
    expect(data.links).toHaveLength(6);
    expect(data.links[0].href).toBe("/anlasse/");
    expect(data.links[1].href).toBe("/beitritt/");
    expect(data.links[2].href).toBe("/uber-uns/");
    expect(data.links[3].href).toBe("/interessegruppen/");
    expect(data.links[4].href).toBe("/asr-und-aso/");
    expect(data.links[5].href).toBe("/kontakt/");
    expect(data.actions).toEqual([]);
  });

  it("returns Norwegian nav links with /no prefix", () => {
    const data = headerData("no");
    expect(data.links[0].href).toBe("/no/anlasse/");
    expect(data.links[1].href).toBe("/no/beitritt/");
    expect(data.links[2].href).toBe("/no/uber-uns/");
    expect(data.links[3].href).toBe("/no/interessegruppen/");
    expect(data.links[4].href).toBe("/no/asr-und-aso/");
    expect(data.links[5].href).toBe("/no/kontakt/");
  });

  it("defaults to German", () => {
    const data = headerData();
    expect(data.links[0].href).toBe("/anlasse/");
  });
});

describe("footerData", () => {
  it("returns German secondaryLinks with no prefix", () => {
    const data = footerData("de");
    expect(data.secondaryLinks[0].href).toBe("/privacy-policy/");
  });

  it("returns Norwegian secondaryLinks with /no prefix", () => {
    const data = footerData("no");
    expect(data.secondaryLinks[0].href).toBe("/no/privacy-policy/");
  });

  it("defaults to German", () => {
    const data = footerData();
    expect(data.secondaryLinks[0].href).toBe("/privacy-policy/");
  });

  it("includes social links", () => {
    const data = footerData("de");
    expect(data.socialLinks).toHaveLength(2);
    expect(data.socialLinks[0].ariaLabel).toBe("Facebook");
    expect(data.socialLinks[1].ariaLabel).toBe("Instagram");
  });
});
