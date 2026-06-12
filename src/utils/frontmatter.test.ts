import { describe, expect, it } from "vitest";
import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
} from "./frontmatter";

// biome-ignore lint/suspicious/noExplicitAny: plugin types are complex; test focuses on runtime behavior
const callReadingTime = readingTimeRemarkPlugin as any;
// biome-ignore lint/suspicious/noExplicitAny: plugin types are complex; test focuses on runtime behavior
const callResponsiveTables = responsiveTablesRehypePlugin as any;

describe("readingTimeRemarkPlugin", () => {
  it("adds readingTime to frontmatter", () => {
    // biome-ignore lint/suspicious/noExplicitAny: MDAST test tree
    const tree: any = {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", value: "Hello world" }],
        },
      ],
    };
    // biome-ignore lint/suspicious/noExplicitAny: VFile mock
    const file: any = { data: { astro: { frontmatter: {} } } };

    callReadingTime()(tree, file);

    expect(file.data.astro.frontmatter.readingTime).toBe(1);
  });

  it("handles empty content gracefully", () => {
    // biome-ignore lint/suspicious/noExplicitAny: MDAST test tree
    const tree: any = { type: "root", children: [] };
    // biome-ignore lint/suspicious/noExplicitAny: VFile mock
    const file: any = { data: { astro: { frontmatter: {} } } };

    callReadingTime()(tree, file);

    expect(file.data.astro.frontmatter.readingTime).toBe(0);
  });

  it("does not throw when frontmatter is undefined", () => {
    // biome-ignore lint/suspicious/noExplicitAny: MDAST test tree
    const tree: any = { type: "root", children: [] };
    const file = { data: { astro: {} } };

    expect(() => callReadingTime()(tree, file)).not.toThrow();
  });
});

describe("responsiveTablesRehypePlugin", () => {
  it("wraps table elements in overflow div", () => {
    // biome-ignore lint/suspicious/noExplicitAny: HAST test tree
    const tree: any = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "table",
          properties: { class: "my-table" },
          children: [{ type: "text", value: "content" }],
        },
      ],
    };

    callResponsiveTables()(tree);

    expect(tree.children[0].type).toBe("element");
    expect(tree.children[0].tagName).toBe("div");
    expect(tree.children[0].properties.style).toBe("overflow:auto");
    expect(tree.children[0].children[0].tagName).toBe("table");
    expect(tree.children[0].children[0].properties.class).toBe("my-table");
  });

  it("leaves non-table elements untouched", () => {
    // biome-ignore lint/suspicious/noExplicitAny: HAST test tree
    const tree: any = {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "p",
          properties: {},
          children: [{ type: "text", value: "paragraph" }],
        },
      ],
    };

    callResponsiveTables()(tree);

    expect(tree.children[0].tagName).toBe("p");
    expect(tree.children.length).toBe(1);
  });

  it("handles empty children gracefully", () => {
    // biome-ignore lint/suspicious/noExplicitAny: HAST test tree
    const tree: any = { type: "root" };

    expect(() => callResponsiveTables()(tree)).not.toThrow();
  });
});
