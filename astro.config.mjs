// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Custom domain rauzr.ai is served at the site root. `base` is the Vite base
// path — keep it `/` (not `/rauzr-website/`). Directory output so GitHub Pages
// resolves `/product/` from `product/index.html`.
const base = process.env.SITE_BASE || '/';

export default defineConfig({
  site: 'https://rauzr.ai',
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    base,
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
