import { describe, expect, it } from "vitest";
import {
  cleanSlug,
  getHomePermalink,
  getPermalink,
  trimSlash,
} from "~/utils/permalinks";

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

describe("getPermalink", () => {
  it("passes through absolute URLs", () => {
    expect(getPermalink("https://example.com")).toBe("https://example.com");
    expect(getPermalink("http://example.com")).toBe("http://example.com");
  });

  it("passes through anchor links", () => {
    expect(getPermalink("#section")).toBe("#section");
  });

  it("creates permalink for a path", () => {
    expect(getPermalink("anlasse")).toBe("/anlasse/");
  });

  it("creates permalink for a path with leading slash", () => {
    expect(getPermalink("/anlasse")).toBe("/anlasse/");
  });

  it("creates permalink for a nested path", () => {
    expect(getPermalink("uber-uns/jan-mueller")).toBe("/uber-uns/jan-mueller/");
  });
});

describe("cleanSlug", () => {
  it("slugifies a simple string", () => {
    expect(cleanSlug("Hello World")).toBe("hello-world");
  });

  it("slugifies Norwegian characters", () => {
    expect(cleanSlug("Anlässe")).toBe("anlaesse");
  });

  it("handles path separators", () => {
    expect(cleanSlug("Über uns")).toBe("ueber-uns");
  });
});
