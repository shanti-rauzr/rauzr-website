// Renders the HTML visual sources in this folder to PNG in src/assets/visuals/ (and public/og.png).
// Usage: PLAYWRIGHT_DIR=<folder containing node_modules/playwright> node visuals-src/render.mjs [name...]
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const require = createRequire(path.join(process.env.PLAYWRIGHT_DIR || process.cwd(), 'x.js'));
const { chromium } = require('playwright');
const here = path.dirname(fileURLToPath(import.meta.url));
const jobs = {
  hero: [1440, 820, 'src/assets/visuals/hero.png'],
  'how-agents': [640, 440, 'src/assets/visuals/how-agents.png'],
  'how-rules': [640, 440, 'src/assets/visuals/how-rules.png'],
  'how-people': [640, 440, 'src/assets/visuals/how-people.png'],
  helix: [1200, 800, 'src/assets/visuals/helix.png'],
  og: [1200, 630, 'public/og.png'],
};
const only = process.argv.slice(2);
const b = await chromium.launch();
for (const [name, [w, h, out]] of Object.entries(jobs)) {
  if (only.length && !only.includes(name)) continue;
  const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: name === 'og' ? 1 : 2 });
  await p.goto('file://' + path.join(here, name + '.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: path.join(here, '..', out) });
  console.log('rendered', out);
  await p.close();
}
await b.close();
