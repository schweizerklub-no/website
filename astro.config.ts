import path from "node:path";
import { fileURLToPath } from "node:url";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import icon from "astro-icon";
import { LOCALE_VALUES, Locale } from "./src/config";
import {
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
} from "./src/utils/frontmatter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: "static",
  site: "https://www.schweizerklub.no",
  base: "/",
  trailingSlash: "always",

  i18n: {
    defaultLocale: Locale.De,
    locales: LOCALE_VALUES,
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        tabler: ["*"],
      },
    }),

    compress({
      CSS: true,
      HTML: {
        "html-minifier-terser": {
          removeAttributeQuotes: false,
        },
      },
      Image: true,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
  ],

  image: {
    // Astro's default Sharp service handles local images.
    // `domains` allows remote images to be processed by Sharp.
    domains: ["cdn.pixabay.com"],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [readingTimeRemarkPlugin],
      rehypePlugins: [responsiveTablesRehypePlugin],
    }),
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
      },
    },
  },
});
