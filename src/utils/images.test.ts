import { describe, expect, it, vi } from "vitest";

vi.mock("astro:assets", () => ({
  getImage: vi.fn(),
}));

import { findImage } from "./images";

describe("findImage", () => {
  it("returns null as-is", async () => {
    await expect(findImage(null)).resolves.toBeNull();
  });

  it("returns undefined as-is", async () => {
    await expect(findImage(undefined)).resolves.toBeUndefined();
  });

  it("returns remote HTTPS URLs as-is", async () => {
    await expect(findImage("https://example.com/image.jpg")).resolves.toBe(
      "https://example.com/image.jpg",
    );
  });

  it("returns remote HTTP URLs as-is", async () => {
    await expect(findImage("http://example.com/image.jpg")).resolves.toBe(
      "http://example.com/image.jpg",
    );
  });

  it("returns absolute /public paths as-is", async () => {
    await expect(findImage("/images/hero.jpg")).resolves.toBe(
      "/images/hero.jpg",
    );
  });

  it("returns relative paths that are not ~/assets/images as-is", async () => {
    await expect(findImage("./some/path.jpg")).resolves.toBe("./some/path.jpg");
  });
});
