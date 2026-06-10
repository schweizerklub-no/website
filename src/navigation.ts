import { getPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    { text: "Home", href: "/" },
    { text: "Anlässe", href: getPermalink("/anlasse") },
    { text: "Beitritt", href: getPermalink("/beitritt") },
    { text: "Über uns", href: getPermalink("/uber-uns") },
    { text: "Interessegruppen", href: getPermalink("/interessegruppen") },
    { text: "ASR und ASO", href: getPermalink("/asr-und-aso") },
    { text: "Kontakt", href: getPermalink("/kontakt") },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: "Links",
      links: [
        {
          text: "Schweizer Ambassade Oslo",
          href: "https://www.eda.admin.ch/oslo",
        },
        { text: "Swiss Community", href: "https://www.swisscommunity.org/de/" },
        {
          text: "Wahlen & Abstimmungen",
          href: "https://www.bk.admin.ch/aktuell/abstimmung/index.html?lang=de",
        },
        { text: "swissinfo.ch", href: "https://www.swissinfo.ch/ger" },
      ],
    },
    {
      title: "Kontakt",
      links: [
        {
          text: "vorstand@schweizerklub.no",
          href: "mailto:vorstand@schweizerklub.no",
        },
      ],
    },
  ],
  secondaryLinks: [{ text: "Privacy", href: getPermalink("/privacy-policy") }],
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
  footNote: `
    © All rights reserved — Schweizer Klub Norwegen Oslo
  `,
};
