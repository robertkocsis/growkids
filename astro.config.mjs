// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// Current deploy: GitHub Pages staging at https://robertkocsis.github.io/growkids/
// Staging is intentionally hidden from search engines (Disallow: / in robots.txt
// + <meta name="robots" content="noindex,nofollow"> in Layout.astro).
//
// When promoting to the production domain growkidsfuture.ro:
//   - set site to "https://growkidsfuture.ro" and remove the `base` line
//   - add a `public/CNAME` file containing `growkidsfuture.ro`
//   - add `@astrojs/sitemap` back to integrations
//   - replace public/robots.txt with one that allows crawling + points at sitemap
//   - remove the noindex meta tag from Layout.astro
//   - point DNS at GitHub Pages
export default defineConfig({
  site: "https://robertkocsis.github.io",
  base: "/growkids",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
