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
npm run build        # build to ./dist (static files)
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
  pages/                   # file-based routing
    index.astro            # /         — Kezdőlap (home)
    about.astro            # /about        — Rólunk
    programs.astro         # /programs     — Programok
    ivf-program.astro      # /ivf-program  — "Kezdeteket Támogatjuk Lombikprogram" (Embryos clinic partner)
    support.astro          # /support      — Támogatás
    contact.astro          # /contact      — Kapcsolat
  styles/
    global.css             # Tailwind import + @theme tokens + @utility typography classes
  assets/
    logo.png               # logo (optimized PNG, ~41KB), imported via astro:assets
    supporters/            # processed partner logos (transparent PNGs)
      embryos.png          # Embryos — fertility & gynecology clinic
      idea.png             # IDEA Könyvtár
      olecom.png           # OLECOM — construction
      tronterem.png        # Mobila Király — armchair + crown circular mark (filename kept; brand is Mobila Király, mobilakiraly.ro)
  utils/
    url.ts                 # `url(path)` helper that prefixes internal links with `import.meta.env.BASE_URL` so they survive the base-path switch
public/                    # static files copied as-is (favicons, robots.txt)
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
- **Active nav state:** Each page passes `active="..."` to `<Layout>`. Keys: `home | about | programs | ivf | support | contact`.
- **Images:** Use Astro's `<Image>` component from `astro:assets` for anything in `src/assets/` (gets optimized to WebP automatically). Use `<img>` only for files in `public/`.
- **External links:** Always add `rel="noopener noreferrer"` and `target="_blank"`.
- **Forms:** No backend yet. Contact form falls back to `mailto:` action. Replace before relying on it.
- **No hardcoded hex values** in component files — components should consume design tokens (Tailwind utilities backed by `--color-*`).
- **Keep docs in sync:** Whenever you change anything that the Markdown files describe — adding/removing/renaming a page, changing a design token, changing a convention, changing the stack or build commands — update the relevant `.md` file in the same change. The files to keep current: `CLAUDE.md` (project layout + conventions) and `DESIGN.md` only when the user explicitly asks. Stale docs are worse than no docs.

## Deployment

Current target: **GitHub Pages staging** at `https://robertkocsis.github.io/growkids/`. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main` (`withastro/action@v3` + `actions/deploy-pages@v4`). One-time enable in the repo: Settings → Pages → Source → "GitHub Actions".

This deploy is **intentionally hidden from search engines** — it's a test environment, not the public site. The plumbing for that:

- `public/robots.txt` → `User-agent: * / Disallow: /`
- `<meta name="robots" content="noindex,nofollow">` in `Layout.astro` (covers crawlers that ignore robots.txt)
- No sitemap integration installed

Future target: **custom domain `growkidsfuture.ro`** (the real public site). Promoting requires editing four files plus DNS:

**1. `astro.config.mjs`** — change `site`, drop `base`, re-enable sitemap:

```js
// after `npm i -D @astrojs/sitemap`
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://growkidsfuture.ro",
  integrations: [icon(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

**2. `public/robots.txt`** — allow crawling + advertise the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://growkidsfuture.ro/sitemap-index.xml
```

**3. `src/layouts/Layout.astro`** — remove the staging `<meta>` tag:

```astro
<!-- Delete this line: -->
<meta name="robots" content="noindex,nofollow" />
```

**4. `public/CNAME`** — new file containing exactly:

```
growkidsfuture.ro
```

**DNS** — at the registrar, set apex A records to the four GitHub Pages IPs (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153). Or an ALIAS/ANAME if the registrar supports it.

Because all internal links go through `src/utils/url.ts` and `<Image>` handles `base` automatically, no template edits beyond the four files above are needed.

Self-host alternative (not currently used): `npm run build` produces `dist/`; rsync it to any static host.

## What to leave alone

- `references/` — the user's source mockup + logo. Do not move or delete; they're authoritative design references.
- `DESIGN.md` — owned by the user; don't edit without explicit instruction. If you need to change tokens, update `global.css` and explain the mismatch.
- `astro.config.mjs` — minimal; only touch when adding integrations.
