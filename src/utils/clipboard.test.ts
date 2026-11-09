import { describe, expect, it } from "vitest";

import { copyText } from "~/utils/clipboard";

describe("copyText", () => {
  it("writes the text and returns true on success", async () => {
    const written: string[] = [];
    const clipboard = {
      writeText: async (text: string) => {
        written.push(text);
      },
    };

    await expect(copyText("0530.28.57050", clipboard)).resolves.toBe(true);
    expect(written).toEqual(["0530.28.57050"]);
  });

  it("returns false when the clipboard rejects", async () => {
    const clipboard = {
      writeText: async () => {
        throw new Error("denied");
      },
    };

    await expect(copyText("0530.28.57050", clipboard)).resolves.toBe(false);
  });

  it("returns false when no clipboard is available", async () => {
    await expect(copyText("0530.28.57050", undefined)).resolves.toBe(false);
  });
});
