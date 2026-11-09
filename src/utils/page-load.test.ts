import { afterEach, describe, expect, it, vi } from "vitest";

import { once, onPageLoad } from "~/utils/page-load";

type Listener = () => void;

const createFakeDocument = () => {
  const listeners = new Map<string, Listener[]>();
  const dataset: Record<string, string> = {};

  return {
    documentElement: { dataset },
    addEventListener: (type: string, listener: Listener) => {
      listeners.set(type, [...(listeners.get(type) ?? []), listener]);
    },
    dispatch: (type: string) => {
      for (const listener of listeners.get(type) ?? []) listener();
    },
  };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("once", () => {
  it("runs the callback only once per key", () => {
    vi.stubGlobal("document", createFakeDocument());
    const init = vi.fn();

    once("testInit", init);
    once("testInit", init);

    expect(init).toHaveBeenCalledTimes(1);
  });

  it("runs the callback for each distinct key", () => {
    vi.stubGlobal("document", createFakeDocument());
    const init = vi.fn();

    once("firstInit", init);
    once("secondInit", init);

    expect(init).toHaveBeenCalledTimes(2);
  });
});

describe("onPageLoad", () => {
  it("runs the callback on every astro:page-load event", () => {
    const fakeDocument = createFakeDocument();
    vi.stubGlobal("document", fakeDocument);
    const init = vi.fn();

    onPageLoad(init);
    expect(init).not.toHaveBeenCalled();

    fakeDocument.dispatch("astro:page-load");
    fakeDocument.dispatch("astro:page-load");

    expect(init).toHaveBeenCalledTimes(2);
  });
});
