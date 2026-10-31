import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Add an article by creating src/content/insights/<slug>/index.md.
// The folder name is the URL: /insights/<slug>/.
const insights = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/insights' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      author: z.string(),
      cover: image(),
      coverAlt: z.string(),
    }),
});

export const collections = { insights };
