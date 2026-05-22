// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// Deploy target is selected at build time via the DEPLOY_TARGET env var
// (see package.json scripts `build:staging` and `build:prod`).
//
//   staging → https://robertkocsis.github.io/growkids/  — GitHub Pages, noindex
//   prod    → https://growkidsfuture.ro                  — public site, sitemap + CNAME
//
// The src/pages/robots.txt.ts and src/pages/CNAME.ts endpoints read the same
// flag (exposed to templates as PUBLIC_IS_PROD) so robots, sitemap, CNAME, and
// the <meta robots> tag all flip together. No file edits needed to promote.
const isProd = process.env.DEPLOY_TARGET === "prod";
process.env.PUBLIC_IS_PROD = isProd ? "true" : "";

export default defineConfig({
  site: isProd ? "https://growkidsfuture.ro" : "https://robertkocsis.github.io",
  base: isProd ? undefined : "/growkids",
  integrations: isProd ? [icon(), sitemap()] : [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
