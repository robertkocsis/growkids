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

| Command                 | What it does                              |
| ----------------------- | ----------------------------------------- |
| `npm install`           | Install dependencies                      |
| `npm run dev`           | Start dev server on `localhost:4321`      |
| `npm run build`         | Build static site to `./dist/` (staging)  |
| `npm run build:staging` | Staging build (GitHub Pages, noindex)     |
| `npm run build:prod`    | Production build for `growkidsfuture.ro`  |
| `npm run preview`       | Preview the production build locally      |
| `npm run check`         | Type-check `.astro` files (no build)      |
| `npm run format`        | Format the repo with Prettier             |
| `npm run format:check`  | Verify formatting without writing changes |

## Project structure

```
src/
  layouts/Layout.astro              # shared header (logo + nav) and footer
  components/
    SectionTitle.astro              # section heading + leaf separator
    Contacts.astro                  # shared contact-cards section
    GalleryLightbox.astro           # shared full-screen image lightbox (used by lectures, camp + book-club)
  pages/                            # file-based routing (lowercase English slugs)
    index.astro                     # /                  — Kezdőlap
    about.astro                     # /about             — Rólunk
    programs.astro                  # /programs          — redirect → /programs/lectures
    programs/
      lectures.astro                # /programs/lectures — Előadások (per-event photo galleries)
      camp.astro                    # /programs/camp     — Kreatív Nyári Tábor 2026 (group photo + per-day photo galleries)
      book-club.astro               # /programs/book-club — GrowKids Future Könyvklub (IDEA Könyvtér)
    ivf-program.astro               # /ivf-program       — redirect → /ivf-program/supporting-beginnings
    ivf-program/
      supporting-beginnings.astro   # /ivf-program/supporting-beginnings — Kezdeteket Támogatjuk Lombikprogram
      national-program.astro        # /ivf-program/national-program      — 2026-os Országos Lombikprogram (FIV)
      national-program-print.astro  # noindex print source → public/docs/*.pdf
    support.astro                   # /support           — Támogatás
    contact.astro                   # /contact           — Kapcsolat
    robots.txt.ts                   # /robots.txt        — endpoint: noindex on staging, allow + sitemap on prod
  styles/global.css                 # Tailwind + design tokens
  data/
    ivf-national-program.ts         # Országos Lombikprogram copy (shared by the page + the PDF print route)
  assets/
    logo.png                        # logo (imported via astro:assets)
    camp/                           # closing group photo + days/<id>/ per-day photo galleries
    book-club/                      # Könyvklub promo graphics (poster + könyvajánló) + events/<id>/ photo galleries
    lectures/<event-id>/            # per-event lecture photos (auto-collected via import.meta.glob)
    supporters/                     # processed partner logos (transparent PNGs)
  utils/url.ts                      # url() helper that prefixes internal links with import.meta.env.BASE_URL
public/                             # static files copied as-is (favicons, .htaccess)
  docs/                             # downloadable PDFs (Országos Lombikprogram steps)
references/                         # design sources (NOT served / not part of the build)
  logo-original.png                 # high-res logo master
  rollup/                           # standalone roll-up banner (self-contained HTML/CSS) — export to PDF for print
    rollup.html                     #   editable banner (brand tokens, Newsreader/Manrope, Phosphor icons)
    rollup.pdf                      #   exported print artifact (banner only, no stand mockup)
    assets/                         #   logo.png, photo.jpg, qr.svg (vector QR → https://www.growkidsfuture.ro)
.github/workflows/
  deploy.yml                        # GitHub Pages CI (staging — auto on push to main)
  deploy-prod.yml                   # cPanel CI (prod — manual via Actions tab, FTPS upload)
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

## Országos Lombikprogram — downloadable PDF

The 9-step application guide on `/ivf-program/national-program` is also offered as a download at `public/docs/orszagos-lombikprogram-2026-lepesek.pdf`. Both come from the same source, `src/data/ivf-national-program.ts`, so the page and the PDF can never drift apart:

- `src/pages/ivf-program/national-program.astro` — the public page (step cards).
- `src/pages/ivf-program/national-program-print.astro` — an A4 print rendering of the same data. `noindex`, not linked from the nav, and excluded from the sitemap (see `noindexRoutes` in `astro.config.mjs`).

**To change the text:** edit `src/data/ivf-national-program.ts`, then regenerate the PDF — otherwise the download keeps the old wording.

**Regenerate** (build, serve locally, print with headless Chrome):

```bash
npm run build:prod
(cd dist && python3 -m http.server 8799 &)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 \
  --print-to-pdf="public/docs/orszagos-lombikprogram-2026-lepesek.pdf" \
  http://localhost:8799/ivf-program/national-program-print/
npm run build:prod   # re-run so dist/ picks up the new PDF
```

A local server is needed because the built page references assets by absolute path (`/_astro/…`), which `file://` can't resolve. `--virtual-time-budget` gives the Google Fonts request time to land. Manual alternative: open the print route in a browser and **⌘P → Save as PDF** with "Background graphics" enabled.

## Roll-up banner (print)

`references/rollup/` holds a **print design source**, not a web page — it's intentionally outside `src/`/`public/` so it's never built or deployed. It recreates the GrowKids roll-up banner in plain HTML/CSS using the same brand system (surface/primary tokens, Newsreader + Manrope, the leaf divider, and inline Phosphor service icons). Everything is editable: text inline, colors via the `:root` variables, images in `rollup/assets/`.

- **Edit / preview:** open `references/rollup/rollup.html` directly in a browser.
- **Export to PDF:** a `@media print` block hides the on-screen stand mockup and an `@page` rule sizes the output to a single banner page. Just **⌘P → Save as PDF** (enable "Background graphics", margins → None). The committed `rollup.pdf` is the pre-exported result.
- **Regenerate headless** (optional — needs Playwright, `npm i -D playwright && npx playwright install chromium`): load the file, emulate print media, read the `.banner` box, and `page.pdf({ width, height, printBackground:true, margin:0 })` so the page is sized exactly to the banner.

The QR in the footer is an inline **vector SVG** (source also at `assets/qr.svg`) pointing at `https://www.growkidsfuture.ro` — decode-verified and resolution-independent, so it stays razor-sharp at any print size. For large-format print, scale the PDF to the stand's printable area in the print software — keep the aspect ratio (~1 : 2.55).

## Deployment

The deploy target is chosen at **build time** via the `DEPLOY_TARGET` env var — one branch, no per-target file edits. `astro.config.mjs` reads it and re-exposes `PUBLIC_IS_PROD` so templates and the `robots.txt` endpoint can branch on it.

| Target    | Command                 | Site                               | robots                           | sitemap |
| --------- | ----------------------- | ---------------------------------- | -------------------------------- | ------- |
| `staging` | `npm run build:staging` | `robertkocsis.github.io/growkids/` | `Disallow: /` + `<meta noindex>` | —       |
| `prod`    | `npm run build:prod`    | `growkidsfuture.ro`                | `Allow: /` + sitemap reference   | ✓       |

### Staging — GitHub Pages (automatic)

`.github/workflows/deploy.yml` builds with `DEPLOY_TARGET=staging` and publishes on every push to `main`. Live at `https://robertkocsis.github.io/growkids/`, hidden from search engines. One-time repo setup: **Settings → Pages → Source → "GitHub Actions"**.

### Prod — cPanel over FTPS (manual)

`.github/workflows/deploy-prod.yml` builds with `DEPLOY_TARGET=prod` and uploads `dist/` to `public_html/` over FTPS. It's **manual**: trigger it from the repo's **Actions tab → "Deploy to cPanel (prod)" → "Run workflow"**.

One-time setup — add these repo secrets under **Settings → Secrets and variables → Actions**:

| Secret     | Value                                                        |
| ---------- | ------------------------------------------------------------ |
| `FTP_HOST` | FTP hostname (e.g. `growkidsfuture.ro` or the host's server) |
| `FTP_USER` | cPanel / FTP-account username                                |
| `FTP_PASS` | that account's password                                      |

Notes:

- The main cPanel account lands in the home dir, so the workflow uploads to `./public_html/`. If you instead create an FTP account scoped to `public_html`, change `server-dir` to `./` in the workflow.
- `public/.htaccess` ships inside `dist/` and handles HTTPS + canonical-host redirects on the cPanel/Apache side.
- After the first deploy, point DNS at the host and run **cPanel → SSL/TLS Status → AutoSSL**.

### Manual / local fallbacks

- **cPanel File Manager:** `npm run build:prod`, then upload the **contents** of `dist/` into `public_html/` (zip + extract).
- **lftp one-liner** (FTPS mirror): `npm run build:prod && lftp -c "set ftp:ssl-force true; open -u $FTP_USER,$FTP_PASS $FTP_HOST; mirror -R --delete dist/ public_html/"`
- **Self-host:** `npm run build:prod` then `rsync -avz --delete dist/ user@your-server:/var/www/growkidsfuture/` — no Node runtime is needed at serve time.

See [`CLAUDE.md`](./CLAUDE.md) for more context.
