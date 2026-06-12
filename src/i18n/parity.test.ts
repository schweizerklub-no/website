import { describe, expect, it } from "vitest";
import { UI } from "~/i18n";

function keysDeep(obj: Record<string, unknown>, prefix = ""): string[] {
  const result: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object") {
      result.push(...keysDeep(value as Record<string, unknown>, path));
    } else {
      result.push(path);
    }
  }
  return result;
}

describe("i18n parity", () => {
  it("de and no have the same deep key structure", () => {
    const deKeys = keysDeep(UI.de as unknown as Record<string, unknown>).filter(
      (k) => k !== "lang",
    );
    const noKeys = keysDeep(UI.no as unknown as Record<string, unknown>).filter(
      (k) => k !== "lang",
    );

    expect(noKeys).toEqual(deKeys);
  });

  it("has expected top-level sections", () => {
    expect(Object.keys(UI.de)).toEqual([
      "lang",
      "label",
      "home",
      "nav",
      "footer",
      "pages",
      "misc",
    ]);
    expect(Object.keys(UI.no)).toEqual([
      "lang",
      "label",
      "home",
      "nav",
      "footer",
      "pages",
      "misc",
    ]);
  });
});
