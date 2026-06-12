import { describe, expect, it } from "vitest";
import { toUiAmount, trim } from "./utils";

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

describe("toUiAmount", () => {
  it("returns 0 for falsy input", () => {
    expect(toUiAmount(0)).toBe(0);
  });

  it("formats billions", () => {
    expect(toUiAmount(1_500_000_000)).toBe("1.5B");
  });

  it("formats millions", () => {
    expect(toUiAmount(2_500_000)).toBe("2.5M");
  });

  it("formats thousands", () => {
    expect(toUiAmount(3_500)).toBe("3.5K");
  });

  it("formats exact millions without decimal", () => {
    expect(toUiAmount(2_000_000)).toBe("2M");
  });

  it("formats exact thousands without decimal", () => {
    expect(toUiAmount(1_000)).toBe("1K");
  });

  it("returns number as string for values under 1000", () => {
    expect(toUiAmount(999)).toBe("999");
    expect(toUiAmount(500)).toBe("500");
  });

  it("handles zero", () => {
    expect(toUiAmount(0)).toBe(0);
  });
});
