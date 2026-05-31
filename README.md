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
| `npm run build`        | Build static site to `./dist/` (staging)  |
| `npm run build:staging`| Staging build (GitHub Pages, noindex)     |
| `npm run build:prod`   | Production build for `growkidsfuture.ro`  |
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

| Secret     | Value                                                          |
| ---------- | ------------------------------------------------------------- |
| `FTP_HOST` | FTP hostname (e.g. `growkidsfuture.ro` or the host's server)  |
| `FTP_USER` | cPanel / FTP-account username                                 |
| `FTP_PASS` | that account's password                                       |

Notes:

- The main cPanel account lands in the home dir, so the workflow uploads to `./public_html/`. If you instead create an FTP account scoped to `public_html`, change `server-dir` to `./` in the workflow.
- `public/.htaccess` ships inside `dist/` and handles HTTPS + canonical-host redirects on the cPanel/Apache side.
- After the first deploy, point DNS at the host and run **cPanel → SSL/TLS Status → AutoSSL**.

### Manual / local fallbacks

- **cPanel File Manager:** `npm run build:prod`, then upload the **contents** of `dist/` into `public_html/` (zip + extract).
- **lftp one-liner** (FTPS mirror): `npm run build:prod && lftp -c "set ftp:ssl-force true; open -u $FTP_USER,$FTP_PASS $FTP_HOST; mirror -R --delete dist/ public_html/"`
- **Self-host:** `npm run build:prod` then `rsync -avz --delete dist/ user@your-server:/var/www/growkidsfuture/` — no Node runtime is needed at serve time.

See [`CLAUDE.md`](./CLAUDE.md) for more context.
