import { getCollection, getEntry, render } from "astro:content";
import type { CollectionEntry } from "astro:content";
import { Locale } from "~/config";

export async function getDetailPaths<C extends "events" | "board">(
  collectionName: C,
  locale: Locale,
): Promise<
  {
    params: { slug: string };
    props: { entry: CollectionEntry<C> };
  }[]
> {
  const items = await getCollection(
    collectionName,
    ({ data }) => data.lang === locale,
  );
  return items
    .filter((e) => e.body?.trim())
    .map((entry) => ({
      params: { slug: stripLocalePrefix(entry.id, entry.data.lang) },
      props: { entry: entry as CollectionEntry<C> },
    }));
}

export async function getPage(locale: Locale, slug: string) {
  const entry = await getEntry("pages", `${locale}/${slug}`);
  if (!entry) throw new Error(`Page content not found: ${locale}/${slug}`);
  const { Content } = await render(entry);
  return { entry, Content };
}

export const dateLocale: Record<Locale, string> = {
  de: "de-DE",
  no: "nb-NO",
};

export const localeUrlPrefix: Record<Locale, string> = {
  de: "",
  no: "/no",
};

export function contentHref(
  entry: { id: string; data: { lang: Locale } },
  urlSegment: string,
): string {
  const slug = stripLocalePrefix(entry.id, entry.data.lang);
  return `${localeUrlPrefix[entry.data.lang]}/${urlSegment}/${slug}/`;
}

export function stripLocalePrefix(id: string, locale: Locale): string {
  const prefix = `${locale}/`;
  return id.startsWith(prefix) ? id.slice(prefix.length) : id;
}

export function detectLocale(pathname: string): Locale {
  for (const [locale, prefix] of Object.entries(localeUrlPrefix) as [
    Locale,
    string,
  ][]) {
    if (!prefix) continue;
    if (
      pathname.startsWith(`${prefix}/`) ||
      pathname === prefix ||
      pathname === `${prefix}/`
    ) {
      return locale;
    }
  }
  return Locale.De;
}
