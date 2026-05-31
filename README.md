# GrowKids Future

Static informational website for **GrowKids Future**, a small Romania-based, Hungarian-language organization that supports children and families.

Built with [Astro](https://astro.build/) 6 + [Tailwind CSS](https://tailwindcss.com/) 4. Outputs plain static HTML/CSS/JS — no Node runtime needed at serve time.

## Requirements

- **Node 22+** (Astro 6 will refuse to start on Node 20)
- npm 10+

If you use `nvm`:

```sh
nvm install 22
nvm use 22
```

## Quick start

```sh
npm install
npm run dev      # http://localhost:4321
```

## Commands

| Command                | What it does                              |
| ---------------------- | ----------------------------------------- |
| `npm install`          | Install dependencies                      |
| `npm run dev`          | Start dev server on `localhost:4321`      |
| `npm run build`        | Build static site to `./dist/`            |
| `npm run preview`      | Preview the production build locally      |
| `npm run check`        | Type-check `.astro` files (no build)      |
| `npm run format`       | Format the repo with Prettier             |
| `npm run format:check` | Verify formatting without writing changes |

## Project structure

```
src/
  layouts/Layout.astro              # shared header (logo + nav) and footer
  components/
    SectionTitle.astro              # section heading + leaf separator
    Contacts.astro                  # shared contact-cards section
    GalleryLightbox.astro           # shared full-screen image lightbox (used by lectures + camp)
  pages/                            # file-based routing (lowercase English slugs)
    index.astro                     # /                  — Kezdőlap
    about.astro                     # /about             — Rólunk
    programs.astro                  # /programs          — redirect → /programs/lectures
    programs/
      lectures.astro                # /programs/lectures — Előadások (per-event photo galleries)
      camp.astro                    # /programs/camp     — Kreatív Nyári Tábor 2026
    ivf-program.astro               # /ivf-program       — Kezdeteket Támogatjuk Lombikprogram
    support.astro                   # /support           — Támogatás
    contact.astro                   # /contact           — Kapcsolat
  styles/global.css                 # Tailwind + design tokens
  assets/
    logo.png                        # logo (imported via astro:assets)
    camp/                           # camp poster
    lectures/<event-id>/            # per-event lecture photos (auto-collected via import.meta.glob)
    supporters/                     # processed partner logos (transparent PNGs)
  utils/url.ts                      # url() helper that prefixes internal links with import.meta.env.BASE_URL
public/                             # static files (favicons, robots.txt)
references/                         # logo source (not served)
.github/workflows/deploy.yml        # GitHub Pages CI (build + deploy on push to main)
DESIGN.md                           # authoritative design system spec
CLAUDE.md                           # guidance for Claude Code sessions
```

## Design system

The visual identity is documented in [`DESIGN.md`](./DESIGN.md) — a Material-3-style "Nurturing Growth" system with semantic color roles (`primary`, `surface`, `on-surface-variant`, …), a typography ramp (`headline-xl`, `body-md`, `label-sm`, …), and an 8px spacing rhythm.

Tokens are translated into Tailwind v4 `@theme` and `@utility` declarations in `src/styles/global.css`. Components should consume those utilities rather than introducing raw hex values.

Shared layout patterns (section headings via `SectionTitle`, sub-page hero scale, feature-card structure, pull-quote band, icon sizing) are documented in [`CLAUDE.md`](./CLAUDE.md#shared-layout-patterns) — keep new pages consistent with them.

Fonts used (loaded from Google Fonts in `Layout.astro`):

- **Newsreader** — headlines
- **Manrope** — body and UI

## Deployment

**Staging on GitHub Pages.** The workflow in `.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`. The live URL is `https://robertkocsis.github.io/growkids/`.

This staging deploy is **hidden from search engines** (`Disallow: /` in `public/robots.txt` plus a `noindex,nofollow` meta tag in `Layout.astro`). It's for testing only.

One-time setup in the GitHub repo: **Settings → Pages → Source → "GitHub Actions"**.

Promoting to the public domain `growkidsfuture.ro` later — four file edits plus DNS:

**`astro.config.mjs`** — switch `site`, drop `base`, re-enable sitemap:

```js
// after `npm i -D @astrojs/sitemap`
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://growkidsfuture.ro",
  integrations: [icon(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

**`public/robots.txt`** — replace the `Disallow: /` staging version with:

```
User-agent: *
Allow: /

Sitemap: https://growkidsfuture.ro/sitemap-index.xml
```

**`src/layouts/Layout.astro`** — delete this line in the `<head>`:

```astro
<meta name="robots" content="noindex,nofollow" />
```

**`public/CNAME`** — new file containing exactly `growkidsfuture.ro`.

**DNS** at the registrar: apex A records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.

See [`CLAUDE.md`](./CLAUDE.md) for the same checklist with more context.

Self-host alternative: `npm run build` then `rsync -avz --delete dist/ user@your-server:/var/www/growkidsfuture/` — no Node runtime is required at serve time.
