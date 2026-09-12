import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { LOCALE_VALUES, Locale, type Locale as LocaleType } from "~/config";

const langSchema = z
  .enum(LOCALE_VALUES as [LocaleType, ...LocaleType[]])
  .default(Locale.De);

const events = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/events" }),
  schema: z.object({
    lang: langSchema,
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
    lang: langSchema,
    title: z.string(),
    description: z.string().optional(),
  }),
});

const board = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "src/content/board" }),
  schema: z.object({
    lang: langSchema,
    name: z.string(),
    role: z.string(),
    order: z.number().optional(),
    image: z.string().optional(),
    email: z.string().optional(),
  }),
});

export const collections = { events, board, pages };
