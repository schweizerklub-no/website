import { describe, expect, it } from "vitest";
import { defined } from "./defined";

describe("defined", () => {
  it("drops undefined values", () => {
    expect(defined({ a: "x", b: undefined })).toEqual({ a: "x" });
  });

  it("keeps falsy but defined values", () => {
    expect(defined({ a: 0, b: false, c: "", d: null })).toEqual({
      a: 0,
      b: false,
      c: "",
      d: null,
    });
  });

  it("keeps the full object when nothing is undefined", () => {
    expect(defined({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });
});
