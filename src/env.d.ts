/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />

declare module "@fontsource-variable/*" {}
declare module "@fontsource/*" {}

// Astro exposes JSX types through the `astroHTML` namespace only. Editor tooling
// (VS Code TypeScript plugin, MDX types) still expects a global `JSX` namespace.
declare namespace JSX {
  type Element = astroHTML.JSX.Element;
  type IntrinsicElements = astroHTML.JSX.IntrinsicElements;
}

type UIType = typeof import("~/i18n").UI[keyof typeof import("~/i18n").UI];

declare namespace App {
  interface Locals {
    locale: import("~/config").Locale;
    t: UIType;
  }
}
