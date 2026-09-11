import { defineHastPlugin } from "satteri";

export const responsiveTablesHastPlugin = defineHastPlugin({
  name: "responsive-tables",
  element: {
    filter: ["table"],
    visit(node, ctx) {
      ctx.wrapNode(node, { raw: '<div style="overflow:auto"></div>' });
    },
  },
});
