# rauzr.ai

Marketing site for [Rauzr Inc](https://rauzr.ai), the company behind **Dossiq** — decision support for generic pharmaceutical regulatory affairs.

Agents prepare the dossier. Humans file it. Dossiq checks CTD Module 3 consistency for US CBE-30 and EU Type IB variations. It does not submit to FDA, EMA, or any other agency.

## Stack

[Astro](https://astro.build) static site, Tailwind CSS, IBM Plex Sans (self-hosted). Product screenshots are optimized to WebP at build time. There is no server runtime. The contact form opens the visitor’s email client addressed to contact@rauzr.ai. Nothing is stored on the site.

## Develop

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4480

```sh
npm run build    # writes ./dist
npm run preview  # serves ./dist
```

`public/CNAME` contains `rauzr.ai` and is copied into `dist/` on build. Pages use directory URLs (`/product/index.html`) so GitHub Pages can serve clean paths.

## Publish on GitHub Pages

Public repository: [shanti-rauzr/rauzr-website](https://github.com/shanti-rauzr/rauzr-website). Custom domain: **rauzr.ai**.

The site lives at the repository root. Astro `base` and Vite `base` are both `/`, because the custom domain is the apex, not `https://shanti-rauzr.github.io/rauzr-website/`. `public/CNAME` contains `rauzr.ai` and is copied into `dist/` on build. `.github/workflows/pages.yml` runs `npm ci` and `npm run build`, then deploys `dist/` with GitHub Pages Actions.

1. Push `main` to `git@github.com:shanti-rauzr/rauzr-website.git`.
2. In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Confirm the **Deploy site to GitHub Pages** workflow succeeds.
4. **Settings → Pages → Custom domain:** `rauzr.ai`. Enable **Enforce HTTPS** after the certificate is issued.
5. DNS:

   Apex `rauzr.ai` — A records:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Apex `rauzr.ai` — AAAA records:

   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`

   `www.rauzr.ai` — CNAME to `shanti-rauzr.github.io`.

6. Canonical URLs use `https://rauzr.ai`. Set the Pages custom domain to the apex so `www` redirects to it.

## Publish on Vercel

1. Import the GitHub repository.
2. Framework preset: Astro. Build command: `npm run build`. Output directory: `dist`.
3. Add domains `rauzr.ai` and `www.rauzr.ai` and follow Vercel’s DNS instructions.
4. `vercel.json` adds a few security headers. GitHub Pages ignores that file.
5. Point the domain at only one host. Do not leave both GitHub Pages and Vercel answering `rauzr.ai`.

## Copy boundaries

Do not add customer logos, invented metrics, or claims that Dossiq files with an agency or is FDA-approved. Sample screenshots are labeled as sample data.

## Visuals

Brand illustrations (hero, how-it-works cards, Helix, OG image) are original HTML/CSS/SVG compositions in `visuals-src/`, rendered to PNG with Playwright:

```
PLAYWRIGHT_DIR=/path/with/node_modules/playwright node visuals-src/render.mjs [hero how-agents how-rules how-people helix og]
```

Output goes to `src/assets/visuals/` (optimized to WebP by Astro at build) and `public/og.png`.

## Site map

`/` · `/products/` · `/products/helix/` · `/products/helix/dossiq/` · `/approach/` (How it works) · `/company/`. `/product/` is a meta-refresh redirect to `/products/helix/dossiq/`.
