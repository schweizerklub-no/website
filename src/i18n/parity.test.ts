import { describe, expect, it } from "vitest";
import { LOCALE_VALUES, Locale } from "~/config";
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

const defaultKeys = keysDeep(UI[Locale.De]).filter((key) => key !== "lang");

describe("i18n parity", () => {
  it("uses the default locale as the canonical structure", () => {
    expect(Object.keys(UI)).toEqual(LOCALE_VALUES);
  });

  it("declares its own locale code as lang", () => {
    for (const locale of LOCALE_VALUES) {
      expect(UI[locale].lang).toBe(locale);
    }
  });

  it("has the same deep key structure in every locale", () => {
    for (const locale of LOCALE_VALUES) {
      if (locale === Locale.De) continue;
      const localeKeys = keysDeep(UI[locale]).filter((key) => key !== "lang");
      expect(localeKeys).toEqual(defaultKeys);
    }
  });
});
