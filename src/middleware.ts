import type { MiddlewareHandler } from "astro";
import { UI } from "~/i18n";
import { detectLocale } from "~/utils/locale";

export const onRequest: MiddlewareHandler = (context, next) => {
  const locale = detectLocale(context.url.pathname);
  context.locals.locale = locale;
  context.locals.t = UI[locale];
  return next();
};
