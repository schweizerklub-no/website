import { markdownToHtml } from "satteri";
import { describe, expect, it } from "vitest";
import { responsiveTablesHastPlugin } from "./frontmatter";

describe("responsiveTablesHastPlugin", () => {
  it("wraps table elements in overflow div", () => {
    const { html } = markdownToHtml("| a | b |\n|---|---|\n| 1 | 2 |", {
      hastPlugins: [responsiveTablesHastPlugin],
      features: { gfm: true },
    });
    expect(html).toContain('<div style="overflow:auto"><table');
  });

  it("leaves non-table content untouched", () => {
    const { html } = markdownToHtml("Just a paragraph.", {
      hastPlugins: [responsiveTablesHastPlugin],
    });
    expect(html).not.toContain("overflow");
  });
});
