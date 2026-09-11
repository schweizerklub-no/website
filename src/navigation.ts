import { Locale } from "~/config";
import { UI } from "~/i18n";
import { pageHref } from "~/utils/locale";
import type { PageKey } from "~/utils/pages";

export const HEADER_PAGE_KEYS = [
  "anlasse",
  "mitgliedschaft",
  "uberUns",
  "interessegruppen",
  "asrUndAso",
  "kontakt",
] as const satisfies readonly PageKey[];

export function headerData(locale: Locale = Locale.De) {
  const nav = UI[locale].nav;
  return {
    links: HEADER_PAGE_KEYS.map((key) => ({
      text: nav[key],
      href: pageHref(locale, key),
    })),
    actions: [],
  };
}

export function footerData(locale: Locale = Locale.De) {
  const t = UI[locale].footer;
  return {
    links: [
      {
        title: t.links,
        links: [
          {
            text: "Schweizer Ambassade Oslo",
            href: "https://www.eda.admin.ch/oslo",
          },
          {
            text: "Swiss Community",
            href: "https://www.swisscommunity.org/de/",
          },
          {
            text: "Abstimmungen & Wahlen",
            href: "https://www.ch.ch/de/abstimmungen-und-wahlen/abstimmungen/abstimmungs-und-wahlkalender/",
          },
          { text: "swissinfo.ch", href: "https://www.swissinfo.ch/ger" },
        ],
      },
      {
        title: t.kontakt,
        links: [
          {
            text: "vorstand@schweizerklub.no",
            href: "mailto:vorstand@schweizerklub.no",
          },
        ],
      },
    ],
    secondaryLinks: [
      {
        text: t.privacy,
        href: pageHref(locale, "privacyPolicy"),
      },
    ],
    socialLinks: [
      {
        ariaLabel: "Facebook",
        icon: "tabler:brand-facebook",
        href: "https://www.facebook.com/schweizerklubnorwegen/",
      },
      {
        ariaLabel: "Instagram",
        icon: "tabler:brand-instagram",
        href: "https://www.instagram.com/schweizerklub/",
      },
    ],
    footNote: t.copyright,
  };
}
