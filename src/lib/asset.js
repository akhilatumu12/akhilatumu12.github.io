/**
 * Points a path in public/ at wherever the site is actually served from.
 *
 * Vite rewrites the asset URLs it can see — those in index.html and those
 * reached through an import — but a plain string like "/resume.pdf" is opaque
 * to it. On GitHub Pages the site lives under /<repo>/, so those strings have
 * to be prefixed by hand or they 404 against the domain root.
 *
 * BASE_URL always ends in a slash; paths passed here always start with one.
 */
export function asset(path) {
  return import.meta.env.BASE_URL.replace(/\/$/, "") + path;
}
