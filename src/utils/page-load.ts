/**
 * Runs `init` only once for the lifetime of the document, even when Astro
 * re-executes the script during a view-transition navigation.
 */
export const once = (key: string, init: () => void): void => {
  if (document.documentElement.dataset[key]) return;
  document.documentElement.dataset[key] = "true";
  init();
};

/**
 * Runs `init` after every Astro page load, including view transitions.
 */
export const onPageLoad = (init: () => void): void => {
  document.addEventListener("astro:page-load", init);
};
