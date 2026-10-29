import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// Match each deployment's entry page to the CSS and JavaScript it was built with.
const dist = new URL('../dist/', import.meta.url);
const index = new URL('index.html', dist);
let html = await readFile(index, 'utf8');
for (const asset of ['style.css', 'dusty.css', 'practical.css', 'brand-mowing.css', 'app.js', 'brand-mowing.js']) {
  const hash = createHash('sha256').update(await readFile(new URL(asset, dist))).digest('hex').slice(0, 12);
  const escaped = asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(href|src)="${escaped}(?:\\?[^\"]*)?"`, 'g');
  if (!pattern.test(html)) throw new Error(`Missing entry asset: ${asset}`);
  html = html.replace(pattern, `$1="${asset}?v=${hash}"`);
}
await writeFile(index, html);
console.log('Versioned CSS and JavaScript references.');
