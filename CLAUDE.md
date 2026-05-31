# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project

**GrowKids Future** — a static informational website for a small Romania-based, Hungarian-language organization that supports children and families. 6 pages, all in Hungarian.

The visual identity is anchored by [`DESIGN.md`](./DESIGN.md) — a Material-3-style "Nurturing Growth" design system. See `references/logo-original.png` for the high-res logo master.

## Stack

- [Astro 6](https://astro.build/) — static site generator, file-based routing
- [Tailwind CSS 4](https://tailwindcss.com/) via the `@tailwindcss/vite` plugin (not the older `@astrojs/tailwind` integration)
- TypeScript (strict)
- Static output (`output: "static"`) — produces plain HTML/CSS/JS in `dist/`
- Webfonts: **Newsreader** (display) + **Manrope** (body/UI) loaded from Google Fonts in `Layout.astro`
- Icons: [Phosphor Icons](https://phosphoricons.com/) via [`astro-icon`](https://www.astroicon.dev/) + `@iconify-json/ph` (inline SVGs, tree-shaken)
- Tooling: `@astrojs/check` for type diagnostics; Prettier with `prettier-plugin-astro` + `prettier-plugin-tailwindcss` for formatting

## Node version

**Requires Node 22+.** Astro 6 will refuse to run on Node 20.

This machine uses `nvm`. The system default is currently Node 20.19.0 (`lts/iron`). Before any `npm` / `npx` / `astro` command in this directory, switch to Node 22:

```bash
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh" && nvm use 22
```

The repo has an `.nvmrc` with `22`, so `nvm use` (with no argument) picks it up automatically.

## Commands

All from the project root, with Node 22 active:

```bash
npm install          # install deps
npm run dev          # dev server at http://localhost:4321
npm run build        # build to ./dist (default target — same as build:staging in CI)
npm run build:staging # explicit staging build (GitHub Pages, noindex, /growkids/ base)
npm run build:prod   # production build for growkidsfuture.ro (sitemap, allows crawl)
npm run preview      # preview the production build locally
npm run check        # TypeScript / Astro diagnostics (no build)
npm run format       # Prettier write — formats src + config files
npm run format:check # Prettier check (CI-style, no writes)
npx astro add <pkg>  # add an Astro integration
```

## Layout

```
src/
  layouts/
    Layout.astro          # shared header (logo + nav) and footer, loads webfonts
  components/
    SectionTitle.astro    # title + leaf-separator block
    Contacts.astro        # shared "Elérhetőségeink" section (e-mail / phone / FB / IG cards) — used on / and /ivf-program; accepts optional `id` for anchor links
    GalleryLightbox.astro # shared full-screen image lightbox (portal-to-body, delegated controls, thumbnails, keyboard nav); auto-hides nav chrome for single-image galleries. Used on /programs/lectures and /programs/camp — see usage contract below
  pages/                   # file-based routing
    index.astro            # /         — Kezdőlap (home)
    about.astro            # /about        — Rólunk
    programs.astro         # /programs     — redirect-only (meta refresh) → /programs/lectures
    programs/
      lectures.astro       # /programs/lectures — Előadások (lecture cards, newest-first; each event has an `id`; photos auto-loaded from src/assets/lectures/<id>/ via import.meta.glob; cards show 3 thumbs + "+N", open the shared GalleryLightbox)
      camp.astro           # /programs/camp     — Kreatív Nyári Tábor 2026 (poster + facts, themed-day cards, Mesevilág closing-day block, price/CTA); poster in src/assets/camp/
    ivf-program.astro      # /ivf-program  — "Kezdeteket Támogatjuk Lombikprogram" (Embryos clinic partner)
    support.astro          # /support      — Támogatás
    contact.astro          # /contact      — Kapcsolat
    robots.txt.ts          # static endpoint — emits noindex robots for staging, allow + sitemap for prod
  styles/
    global.css             # Tailwind import + @theme tokens + @utility typography classes
  assets/
    logo.png               # logo (optimized PNG, ~41KB), imported via astro:assets
    camp/                  # camp page imagery
      kreativ-nyari-tabor-2026.jpeg  # official poster, shown on /programs/camp
    lectures/              # per-event photo galleries — one folder per lecture `id`
      <event-id>/          # drop image files here (sorted by filename) — auto-collected on /programs/lectures
    supporters/            # processed partner logos (transparent PNGs)
      embryos.png          # Embryos — fertility & gynecology clinic
      idea.png             # IDEA Könyvtár
      olecom.png           # OLECOM — construction
      tronterem.png        # Mobila Király — armchair + crown circular mark (filename kept; brand is Mobila Király, mobilakiraly.ro)
      silvafun.png         # silvafun — sun-over-hills mark + wordmark
  utils/
    url.ts                 # `url(path)` helper that prefixes internal links with `import.meta.env.BASE_URL` so they survive the base-path switch
public/                    # static files copied as-is (favicons only)
references/                # logo master (NOT served; reference only)
.github/workflows/
  deploy.yml               # GitHub Pages CI: build + deploy on push to main
DESIGN.md                  # authoritative design system spec
dist/                      # build output — git-ignored
```

## Design system

`DESIGN.md` is the source of truth. `src/styles/global.css` translates it into Tailwind v4 `@theme` tokens and `@utility` typography classes. **Always consume tokens** — do not introduce raw hex values in components.

### Semantic color tokens

Tailwind utilities exposed via `--color-*`:

- **Surface family:** `surface`, `surface-dim`, `surface-bright`, `surface-container-lowest`, `surface-container-low`, `surface-container`, `surface-container-high`, `surface-container-highest`, `surface-variant`, `surface-tint`, `on-surface`, `on-surface-variant`, `inverse-surface`, `inverse-on-surface`, `background`, `on-background`
- **Outline:** `outline`, `outline-variant`
- **Primary (Sage Green):** `primary`, `on-primary`, `primary-container`, `on-primary-container`, `inverse-primary`, `primary-fixed`, `primary-fixed-dim`, `on-primary-fixed`, `on-primary-fixed-variant`
- **Secondary:** `secondary`, `on-secondary`, `secondary-container`, `on-secondary-container`, `secondary-fixed`, `secondary-fixed-dim`, `on-secondary-fixed`, `on-secondary-fixed-variant`
- **Tertiary (Muted Olive):** `tertiary`, `on-tertiary`, `tertiary-container`, `on-tertiary-container`, `tertiary-fixed`, `tertiary-fixed-dim`, `on-tertiary-fixed`, `on-tertiary-fixed-variant`
- **Error:** `error`, `on-error`, `error-container`, `on-error-container`

Usage rules:

- Primary buttons: `bg-primary text-on-primary`. Hover: `hover:bg-primary-container`.
- Outlined buttons: `border-primary text-primary`. Pill shape (`rounded-full`).
- Cards: `bg-surface-container-lowest` (white) on a `bg-surface` page background. Use `shadow-ambient` (the tinted low-opacity ambient shadow) — never `shadow-md`/`shadow-lg`.
- Section background variation: `bg-surface-container-low` for alternating bands.
- Body text: `text-on-surface` for emphasis, `text-on-surface-variant` for secondary copy.
- Borders / dividers: `border-outline-variant` at low intensity.

### Typography utility classes

Defined as `@utility` in `global.css`. Apply them like `class="headline-xl"`.

| Utility              | Family     | Size | Weight     | Line height | Use for                              |
| -------------------- | ---------- | ---- | ---------- | ----------- | ------------------------------------ |
| `headline-xl`        | Newsreader | 48px | 600        | 1.1         | Hero `<h1>` desktop                  |
| `headline-lg`        | Newsreader | 36px | 500        | 1.2         | Section `<h2>` desktop               |
| `headline-lg-mobile` | Newsreader | 28px | 500        | 1.2         | Hero/section heading on mobile       |
| `display-lg`         | Newsreader | 36px | 600        | 1.1         | Big numeric/display stats (desktop)  |
| `display-md`         | Newsreader | 30px | 600        | 1.1         | Big numeric/display stats (mobile)   |
| `title-lg`           | Newsreader | 24px | 500        | 1.3         | Sub-section / spotlight `<h2>`       |
| `title-md`           | Newsreader | 20px | 500        | 1.3         | Supporting heading text (stat block) |
| `title-sm`           | Newsreader | 18px | 600        | 1.3         | Card titles (`<h3>`)                 |
| `quote-xl`           | Newsreader | 30px | 400 italic | 1.4         | Pull quote (desktop)                 |
| `quote-lg`           | Newsreader | 24px | 400 italic | 1.4         | Pull quote (mobile)                  |
| `body-md`            | Manrope    | 16px | 400        | 1.6         | Body copy                            |
| `label-sm`           | Manrope    | 13px | 600        | 1.4         | Uppercase labels, button text        |
| `nav-link`           | Manrope    | 15px | 500        | 1.0         | Header navigation                    |

Common pattern for responsive headings: `class="headline-lg-mobile md:headline-xl"` (also `display-md md:display-lg`, `quote-lg md:quote-xl`).

Font-family aliases also exposed as Tailwind utilities: `font-newsreader`, `font-manrope` (and `font-display` / `font-sans` aliases preserved).

### Radius, spacing, shadows

- **Radius:** `rounded-sm` (4px), `rounded-DEFAULT` (8px) for cards/inputs, `rounded-md` (12px), `rounded-lg` (16px) for service cards, `rounded-xl` (24px) for hero CTA blocks, `rounded-full` (pill) for buttons + chips.
- **Spacing:** 8px base unit. Section vertical padding: `py-20` (80px) or `py-28` (~112px) for hero. Horizontal page padding: `px-5 md:px-10 lg:px-20`.
- **Container width:** Use inline `style="max-width: var(--container-max);"` (1200px) on the inner container of each section.
- **Shadows:** `shadow-ambient` and `shadow-ambient-md` only — these are the tinted low-opacity ambient shadows defined in DESIGN.md.
- **Helper utilities:** `no-scrollbar` — hides the scrollbar while keeping the element scrollable (used on the lightbox thumbnail strip in `programs/lectures.astro`).

### Icons

Use Phosphor via `astro-icon`. Browse the catalog at <https://phosphoricons.com/>.

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="ph:heart" class="text-primary size-6" />
<Icon name="ph:leaf-duotone" class="text-tertiary size-5" />
```

- Name prefix is `ph:` — append `-fill`, `-duotone`, `-bold`, `-light`, or `-thin` for weight variants (default = regular).
- Size with Tailwind (`size-4`, `size-5`, `size-6`) and color with `text-*` design tokens — SVGs inherit `currentColor`.
- Prefer `regular` weight for body/nav and `duotone` for decorative accents; both pair well with Newsreader.

## Conventions

- **Language:** All user-facing copy is Hungarian. Variable names, comments, and component names are English.
- **Routing:** Lowercase English slugs (`/about`, `/programs`, `/support`, `/contact`) so future localization is straightforward — the visible labels stay Hungarian, only the URL/file names are English. The nav in `Layout.astro` is the source of truth for the page list and active state.
- **Internal links:** Always go through the `url()` helper in `src/utils/url.ts` (e.g. `href={url("/about")}`), never raw `href="/about"`. The site is deployed under a `base` path on GitHub Pages (`/growkids/`); the helper prepends it. When we switch to the custom domain `growkidsfuture.ro`, removing `base` from `astro.config.mjs` is enough — no link edits required.
- **Active nav state:** Each page passes `active="..."` to `<Layout>`. Keys: `home | about | programs | ivf | support | contact`. **Programok** is a dropdown (desktop hover/focus + indented in the mobile `MENÜ`); its children pass `programsSub="lectures" | "camp"` to highlight the open sub-item. Both sub-pages use `active="programs"`. The `navItems` array in `Layout.astro` is the source of truth — add a dropdown child there.
- **Images:** Use Astro's `<Image>` component from `astro:assets` for anything in `src/assets/` (gets optimized to WebP automatically). Use `<img>` only for files in `public/`. For pre-rendering a specific size at build time (e.g. lightbox full-size), use `getImage()` from `astro:assets`.
- **Image lightbox:** use the shared `components/GalleryLightbox.astro` rather than rolling a new one. Contract: (1) emit a JSON data island `<script type="application/json" id="galleries-data" set:html={JSON.stringify(galleryData)} />` where `galleryData` is `Record<string, { src, thumb?, alt }[]>` keyed by gallery id — `src` is the full-size image (use `getImage()` at ~1600px) and the optional `thumb` is a small version (~200px) used by the thumbnail strip so opening a gallery doesn't download full-res images; (2) add `.gallery-trigger` buttons carrying `data-gallery="<id>"` + `data-index="<n>"`; (3) render `<GalleryLightbox />` once. It auto-hides arrows/counter/thumbnails for single-image galleries and handles focus trap + return-focus and keyboard nav (←/→/Esc).
- **Full-screen overlays (modals / lightboxes):** `Layout.astro` wraps page content in `<main class="relative z-10">`, which creates a stacking context that sits **below** the `z-30` header. A `position: fixed` overlay rendered inside a page therefore paints under the header and the header steals clicks near the top. Fix: portal the overlay element to `document.body` on load (`document.body.appendChild(el)`) so it escapes `main`'s stacking context — `GalleryLightbox.astro` already does this. Wire overlay controls with a single delegated click handler using `target.closest("#id")` so icon/SVG click targets still resolve to the button.
- **External links:** Always add `rel="noopener noreferrer"` and `target="_blank"`.
- **Forms:** No backend yet. Contact form falls back to `mailto:` action. Replace before relying on it.
- **No hardcoded hex values** in component files — components should consume design tokens (Tailwind utilities backed by `--color-*`).
- **Keep docs in sync:** Whenever you change anything the docs describe — adding/removing/renaming a page or component, changing a design token, changing a convention, changing the stack or build commands — update **both `CLAUDE.md` (project layout + conventions) and `README.md` (structure + commands + deployment)** in the same change. They overlap, so a structural change usually touches both — check each. `DESIGN.md` only when the user explicitly asks. Stale docs are worse than no docs.

## Deployment

Current target: **GitHub Pages staging** at `https://robertkocsis.github.io/growkids/`. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main` (`withastro/action@v3` + `actions/deploy-pages@v4`). One-time enable in the repo: Settings → Pages → Source → "GitHub Actions".

### Two targets, one branch

The deploy target is selected at **build time** via the `DEPLOY_TARGET` env var. No branch fork, no per-target file edits.

| Target    | Command                 | Site                               | robots                           | sitemap |
| --------- | ----------------------- | ---------------------------------- | -------------------------------- | ------- |
| `staging` | `npm run build:staging` | `robertkocsis.github.io/growkids/` | `Disallow: /` + `<meta noindex>` | —       |
| `prod`    | `npm run build:prod`    | `growkidsfuture.ro`                | `Allow: /` + sitemap reference   | ✓       |

`astro.config.mjs` reads `DEPLOY_TARGET` and re-exposes it as `PUBLIC_IS_PROD` so templates and endpoints can branch on it. The pieces:

- **`astro.config.mjs`** — picks `site` / `base` / sitemap integration based on `isProd`.
- **`src/pages/robots.txt.ts`** — endpoint that emits the staging or prod robots body.
- **`src/layouts/Layout.astro`** — `{!import.meta.env.PUBLIC_IS_PROD && <meta name="robots" content="noindex,nofollow" />}`.
- **`public/.htaccess`** — Apache rules for cPanel/shared hosting (force HTTPS, drop `www`, custom 404, caching, gzip). Ignored by GitHub Pages.

### Promoting to growkidsfuture.ro

No code edits required.

**cPanel / shared hosting (current plan):**

1. `npm run build:prod` locally.
2. Upload the **contents** of `dist/` into `public_html/` via cPanel File Manager (zip + extract) or FTP/SFTP. The bundled `public/.htaccess` ships with the build and handles HTTPS + canonical host.
3. DNS: point `growkidsfuture.ro` at the host's nameservers (or A records they list in the welcome email).
4. cPanel → SSL/TLS Status → Run AutoSSL.

**GitHub Pages alternative:** add a second workflow that exports `DEPLOY_TARGET=prod`, then set apex A records to GitHub's Pages IPs (185.199.108.153, .109.153, .110.153, .111.153). Note: in this case you'd also need to write a `CNAME` file into `dist/` (e.g. `echo growkidsfuture.ro > dist/CNAME` in the workflow) since it's no longer in `build:prod`.

## What to leave alone

- `references/` — the user's source mockup + logo. Do not move or delete; they're authoritative design references.
- `DESIGN.md` — owned by the user; don't edit without explicit instruction. If you need to change tokens, update `global.css` and explain the mismatch.
- `astro.config.mjs` — minimal; only touch when adding integrations.
