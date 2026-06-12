import { UI } from "~/i18n";

export function onRequest(context, next) {
  const pathname = context.url.pathname;
  const locale = pathname.startsWith("/no/") ? "no" : "de";
  context.locals.locale = locale;
  context.locals.t = UI[locale];
  return next();
}
