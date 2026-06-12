import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/events" }),
  schema: z.object({
    lang: z.enum(["de", "no"]).default("de"),
    title: z.string(),
    date: z.date(),
    visibilityEnd: z.date().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    location: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/pages" }),
  schema: z.object({
    lang: z.enum(["de", "no"]).default("de"),
    title: z.string(),
    description: z.string().optional(),
  }),
});

const board = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/board" }),
  schema: z.object({
    lang: z.enum(["de", "no"]).default("de"),
    name: z.string(),
    role: z.string(),
    image: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const collections = { events, board, pages };
