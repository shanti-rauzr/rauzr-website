# Rauzr marketing site

Static Astro site for https://rauzr.ai. Keep the teal brand (`#0F766E`), IBM Plex Sans, and Dossiq messaging. Do not add customer logos, invented metrics, FDA-approval claims, or any statement that the product files with a regulatory agency. Contact is contact@rauzr.ai. This is the company site for all Rauzr products (audience: health and life sciences teams; do not list countries or regions): Rauzr is the company, Rauzr Helix is the product/platform for health and life sciences, Dossiq is the first Helix agent. Keep Dossiq minimal on the home page; Dossiq content lives at /products/helix/dossiq/ (/product/ redirects there). Roadmap items are labeled planned or coming soon, with no dates. No certification claims (SOC 2, ISO, Part 11 compliance). Third-party names (e.g. Veeva Vault, SharePoint) as text only, integrations marked planned; never name competitors as comparisons. The "~20 days vs a few hours" speed figure is phrased as what Dossiq is built to do, with its footnote. Visuals are generated from visuals-src/*.html (see visuals-src/render.mjs) into src/assets/visuals/ and public/og.png.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
