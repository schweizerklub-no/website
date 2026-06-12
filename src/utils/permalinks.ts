import slugify from "limax";
import { SITE } from "~/config";

import { trim } from "~/utils/utils";

export const trimSlash = (s: string) => trim(trim(s, "/"));
const createPath = (...params: string[]) => {
  const paths = params
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");
  return `/${paths}${SITE.trailingSlash && paths ? "/" : ""}`;
};

const BASE_PATHNAME = SITE.base || "/";

export const cleanSlug = (text = "") =>
  trimSlash(text)
    .split("/")
    .map((slug) => slugify(slug))
    .join("/");

export const BLOG_BASE = "blog";
export const CATEGORY_BASE = "category";
export const TAG_BASE = "tag";

export const POST_PERMALINK_PATTERN = trimSlash("blog/%slug%");

/** */
export const getCanonical = (path = ""): string | URL => {
  const url = String(new URL(path, SITE.site));
  if (SITE.trailingSlash === false && path && url.endsWith("/")) {
    return url.slice(0, -1);
  } else if (SITE.trailingSlash === true && path && !url.endsWith("/")) {
    return `${url}/`;
  }
  return url;
};

/** */
export const getPermalink = (slug = "", type = "page"): string => {
  let permalink: string;

  if (
    slug.startsWith("https://") ||
    slug.startsWith("http://") ||
    slug.startsWith("://") ||
    slug.startsWith("#") ||
    slug.startsWith("javascript:")
  ) {
    return slug;
  }

  switch (type) {
    case "home":
      permalink = getHomePermalink();
      break;

    case "blog":
      permalink = getBlogPermalink();
      break;

    case "asset":
      permalink = getAsset(slug);
      break;

    case "category":
      permalink = createPath(CATEGORY_BASE, trimSlash(slug));
      break;

    case "tag":
      permalink = createPath(TAG_BASE, trimSlash(slug));
      break;

    case "post":
      permalink = createPath(trimSlash(slug));
      break;
    default:
      permalink = createPath(slug);
      break;
  }

  return definitivePermalink(permalink);
};

/** */
export const getHomePermalink = (): string => getPermalink("/");

/** */
export const getBlogPermalink = (): string => getPermalink(BLOG_BASE);

/** */
export const getAsset = (path: string): string =>
  "/" +
  [BASE_PATHNAME, path]
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join("/");

/** */
const definitivePermalink = (permalink: string): string =>
  createPath(BASE_PATHNAME, permalink);

/** */
type MenuHref = { type?: string; url?: string };

/** */
export const applyGetPermalinks = (menu: unknown = {}): unknown => {
  if (Array.isArray(menu)) {
    return menu.map((item) => applyGetPermalinks(item));
  } else if (typeof menu === "object" && menu !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(menu)) {
      if (key === "href") {
        if (typeof value === "string") {
          result[key] = getPermalink(value);
        } else if (typeof value === "object" && value !== null) {
          const href = value as MenuHref;
          if (href.type === "home") {
            result[key] = getHomePermalink();
          } else if (href.type === "blog") {
            result[key] = getBlogPermalink();
          } else if (href.type === "asset") {
            result[key] = getAsset(href.url ?? "");
          } else if (href.url) {
            result[key] = getPermalink(href.url, href.type);
          }
        }
      } else {
        result[key] = applyGetPermalinks(value);
      }
    }
    return result;
  }
  return menu;
};
