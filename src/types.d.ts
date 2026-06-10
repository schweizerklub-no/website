import type { HTMLAttributes } from "astro/types";

export interface MetaData {
  title?: string;
  ignoreTitleTemplate?: boolean;

  canonical?: string;

  robots?: MetaDataRobots;

  description?: string;

  openGraph?: MetaDataOpenGraph;
  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MetaDataOpenGraph {
  url?: string;
  siteName?: string;
  images?: Array<MetaDataImage>;
  locale?: string;
  type?: string;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}

export interface CallToAction extends Omit<HTMLAttributes<"a">, "slot"> {
  variant?: "primary" | "secondary" | "tertiary" | "link";
  text?: string;
  icon?: string;
  classes?: Record<string, string>;
  type?: "button" | "submit" | "reset";
}
