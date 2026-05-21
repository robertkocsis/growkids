// Prefixes an internal path with the configured `base` (e.g. "/growkids")
// so links work whether the site is deployed at a subpath or a custom domain.
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const url = (path: string) => `${base}${path.startsWith("/") ? path : `/${path}`}`;
