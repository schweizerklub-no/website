import { describe, expect, it } from "vitest";
import { trim } from "./utils";

describe("trim", () => {
  it("trims matching characters from both ends", () => {
    expect(trim("__hello__", "_")).toBe("hello");
  });

  it("returns empty string for empty input", () => {
    expect(trim("", "_")).toBe("");
  });

  it("returns string unchanged if no character matches", () => {
    expect(trim("hello", "_")).toBe("hello");
  });

  it("trims only outermost characters", () => {
    expect(trim("__a_b__", "_")).toBe("a_b");
  });

  it("handles string with only matching characters", () => {
    expect(trim("___", "_")).toBe("");
  });

  it("returns string unchanged when no character argument given", () => {
    expect(trim("  hello  ")).toBe("  hello  ");
  });

  it("trims from both ends equally", () => {
    expect(trim("xxhelloxx", "x")).toBe("hello");
  });
});
