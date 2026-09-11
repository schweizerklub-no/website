import type { RehypePlugin } from "@astrojs/markdown-remark";

export const responsiveTablesRehypePlugin: RehypePlugin = () => {
  return (tree) => {
    if (!tree.children) return;

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (child.type === "element" && child.tagName === "table") {
        tree.children[i] = {
          type: "element",
          tagName: "div",
          properties: {
            style: "overflow:auto",
          },
          children: [child],
        };

        i++;
      }
    }
  };
};
