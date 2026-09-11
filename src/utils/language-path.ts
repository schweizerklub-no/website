import type { Locale } from "~/config";
import { localeUrlPrefix } from "~/utils/locale";
import { PAGE_ROUTES, type PageKey } from "~/utils/pages";

const pageKeyBySegment = new Map<string, PageKey>(
  (Object.keys(PAGE_ROUTES) as PageKey[]).flatMap((key) =>
    Object.values(PAGE_ROUTES[key].segment).map(
      (segment) => [segment, key] as const,
    ),
  ),
);

export function pageKeyForSegment(
  segment: string | undefined,
): PageKey | undefined {
  return segment ? pageKeyBySegment.get(segment) : undefined;
}

export function translatePath(
  pathname: string,
  fromLocale: Locale,
  toLocale: Locale,
): string {
  const base = localeUrlPrefix[fromLocale];
  const toPrefix = localeUrlPrefix[toLocale];

  const path = base ? pathname.replace(base, "") || "/" : pathname;
  const segments = path.split("/").filter(Boolean);

  if (segments.length === 0) return pathWithSlash(toPrefix || "/");

  const [first, ...rest] = segments;
  const key = pageKeyForSegment(first);

  if (key) {
    const translatedSegment = PAGE_ROUTES[key].segment[toLocale];
    return pathWithSlash(
      [toPrefix, translatedSegment, ...rest].filter(Boolean).join("/"),
    );
  }

  return pathWithSlash([toPrefix, ...segments].join("/"));
}

function pathWithSlash(path: string): string {
  const normalized = `/${path}`.replace(/\/+/g, "/").replace(/\/?$/, "/");
  return normalized === "/" ? "/" : normalized;
}
