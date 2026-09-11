import { describe, expect, it } from "vitest";
import { getHomePermalink, trimSlash } from "~/utils/permalinks";

describe("trimSlash", () => {
  it("trims leading and trailing slashes", () => {
    expect(trimSlash("/foo/bar/")).toBe("foo/bar");
  });

  it("handles single slash", () => {
    expect(trimSlash("/")).toBe("");
  });

  it("handles empty string", () => {
    expect(trimSlash("")).toBe("");
  });

  it("returns string unchanged if no slashes", () => {
    expect(trimSlash("foo")).toBe("foo");
  });
});

describe("getHomePermalink", () => {
  it("returns /", () => {
    expect(getHomePermalink()).toBe("/");
  });
});
