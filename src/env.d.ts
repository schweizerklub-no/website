/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite/client" />

declare module "@fontsource-variable/*" {}
declare module "@fontsource/*" {}

type UIType = typeof import("~/i18n").UI[keyof typeof import("~/i18n").UI];

declare namespace App {
  interface Locals {
    locale: "de" | "no";
    t: UIType;
  }
}
