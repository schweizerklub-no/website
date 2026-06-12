import type { Locale } from "~/i18n";
import { UI } from "~/i18n";
import { getPermalink } from "./utils/permalinks";

export function headerData(locale: Locale = "de") {
  const nav = UI[locale].nav;
  const prefix = locale === "de" ? "" : "/no";
  return {
    links: [
      { text: nav.anlasse, href: getPermalink(`${prefix}/anlasse`) },
      { text: nav.beitritt, href: getPermalink(`${prefix}/beitritt`) },
      { text: nav.uberUns, href: getPermalink(`${prefix}/uber-uns`) },
      {
        text: nav.interessegruppen,
        href: getPermalink(`${prefix}/interessegruppen`),
      },
      { text: nav.asrUndAso, href: getPermalink(`${prefix}/asr-und-aso`) },
      { text: nav.kontakt, href: getPermalink(`${prefix}/kontakt`) },
    ],
    actions: [],
  };
}

export function footerData(locale: Locale = "de") {
  const t = UI[locale].footer;
  const prefix = locale === "de" ? "" : "/no";
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
            text: "Wahlen & Abstimmungen",
            href: "https://www.bk.admin.ch/aktuell/abstimmung/index.html?lang=de",
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
      { text: t.privacy, href: getPermalink(`${prefix}/privacy-policy`) },
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
