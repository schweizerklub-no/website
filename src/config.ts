export interface SiteConfig {
  name: string;
  site?: string;
  base?: string;
  trailingSlash?: boolean;
}

export const Locale = {
  De: "de",
  No: "no",
} as const;

export type Locale = (typeof Locale)[keyof typeof Locale];

export const LOCALE_VALUES = Object.values(Locale);

export interface I18NConfig {
  defaultLocale: Locale;
  locales: Locale[];
  textDirection: string;
}

export interface MetaDataConfig {
  title?: { default: string; template: string };
  description?: string;
  robots?: { index: boolean; follow: boolean };
  openGraph?: {
    site_name?: string;
    images?: Array<{ url: string; width: number; height: number }>;
    type?: string;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
  };
}

export interface UIConfig {
  theme: string;
}

export const SITE: SiteConfig = {
  name: "Schweizer Klub Norwegen Oslo",
  site: "https://www.schweizerklub.no",
  base: "/",
  trailingSlash: true,
};

export const I18N: I18NConfig = {
  defaultLocale: Locale.De,
  locales: [Locale.De, Locale.No],
  textDirection: "ltr",
};

export const METADATA: MetaDataConfig = {
  title: {
    default: "Schweizer Klub Norwegen Oslo",
    template: "%s — Schweizer Klub Norwegen Oslo",
  },
  description:
    "Der Schweizer Klub Norwegen Oslo verbindet in Norwegen lebende SchweizerInnen und Personen mit einer speziellen Verbindung zur Schweiz.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    site_name: "Schweizer Klub Norwegen Oslo",
    images: [
      {
        url: "/images/default.png",
        width: 1200,
        height: 628,
      },
    ],
    type: "website",
  },
  twitter: {
    handle: "@schweizerklub",
    site: "@schweizerklub",
    cardType: "summary_large_image",
  },
};

export const UI: UIConfig = {
  theme: "system",
};
