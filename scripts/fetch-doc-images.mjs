#!/usr/bin/env node
/**
 * One-time migration helper: pull the screenshots out of the GitBook space and
 * into `public/docs-images/`, under the filenames the chapters in
 * `src/data/docs/` already reference.
 *
 * GitBook serves images through a signed proxy, so the URLs cannot be
 * hard-coded. Instead this scrapes each published page, takes the content
 * images in document order, and maps them onto the expected filenames.
 *
 *   node scripts/fetch-doc-images.mjs
 *   node scripts/fetch-doc-images.mjs --force   # re-download existing files
 *
 * Once the images are committed, this script and the GitBook space can both go
 * away. It is not part of the build.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'docs-images');
const BASE = 'https://floating-gates.gitbook.io/gates-docs';

/**
 * GitBook page path -> the image basenames used by src/data/docs/*.js, in the
 * order they appear on the page. Keep this in sync if you re-order figures.
 */
const PAGES = {
  'what-is-gates': ['what-is-gates-1'],
  'customer-factory-communication.': [
    'customer-factory-communication-1',
    'customer-factory-communication-2',
    'customer-factory-communication-3',
    'customer-factory-communication-4',
    'customer-factory-communication-5',
    'customer-factory-communication-6',
    'customer-factory-communication-7',
  ],
  'quick-start': ['quick-start-1', 'quick-start-2', 'quick-start-3'],
  'quick-start/set-the-factory': [
    'set-the-factory-1',
    'set-the-factory-2',
    'set-the-factory-3',
  ],
  'quick-start/create-your-first-project': [
    'create-your-first-project-1',
    'create-your-first-project-2',
    'create-your-first-project-3',
    'create-your-first-project-4',
    'create-your-first-project-5',
  ],
  'quick-start/interact-with-your-first-order': [
    'interact-with-your-first-order-1',
    // The GitBook page has a small inline icon in a heading that we dropped,
    // so this page is remapped explicitly below.
    'interact-with-your-first-order-2',
    'interact-with-your-first-order-3',
    'interact-with-your-first-order-4',
    'interact-with-your-first-order-5',
    'interact-with-your-first-order-6',
  ],
  'publish-your-cad-on-line': [
    'publish-your-cad-online-1',
    'publish-your-cad-online-2',
    'publish-your-cad-online-3',
    'publish-your-cad-online-4',
  ],
  'prepare-your-factory': [
    'prepare-your-factory-1',
    'prepare-your-factory-2',
    'prepare-your-factory-3',
    'prepare-your-factory-4',
  ],
  'prepare-your-factory/production-machines': [
    'production-machines-1',
    'production-machines-2',
    'production-machines-3',
  ],
  'prepare-your-factory/available-materials': [
    'available-materials-1',
    'available-materials-2',
    'available-materials-3',
  ],
  'prepare-your-factory/branding': ['branding-1', 'branding-2', 'branding-3'],
  'manage-what-your-cad-can-do': ['manage-what-your-cad-can-do-1'],
  'manage-what-your-cad-can-do/automatic-quotations': [
    'automatic-quotations-1',
    'automatic-quotations-2',
    'automatic-quotations-3',
    'automatic-quotations-4',
  ],
  'manage-what-your-cad-can-do/parametric-design': [
    'parametric-design-1',
    'parametric-design-2',
  ],
  'manage-what-your-cad-can-do/parametric-design/model': ['model-1'],
  'suspend-the-subscription': ['suspend-the-subscription-1'],
  feedback: ['feedback-1'],
};

const EXT_BY_TYPE = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'image/avif': '.avif',
};

const force = process.argv.includes('--force');

/** Pull the <main> block, so we skip the site logo and nav thumbnails. */
function mainSection(html) {
  const start = html.indexOf('<main');
  if (start === -1) return html;
  const end = html.lastIndexOf('</main>');
  return end === -1 ? html.slice(start) : html.slice(start, end);
}

/** Content image URLs, in document order, de-duplicated. */
function imageUrls(html) {
  const found = [];
  const seen = new Set();
  const pattern = /<img[^>]+src="([^"]+)"/g;
  let match = pattern.exec(html);

  while (match) {
    const src = match[1].replace(/&amp;/g, '&');
    if (/~gitbook\/image/.test(src)) {
      const absolute = new URL(src, BASE).href;
      if (!seen.has(absolute)) {
        seen.add(absolute);
        found.push(absolute);
      }
    }
    match = pattern.exec(html);
  }

  return found;
}

async function download(url, basename) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const type = (response.headers.get('content-type') || '').split(';')[0].trim();
  const ext = EXT_BY_TYPE[type] || '.png';
  const target = path.join(OUT_DIR, basename + ext);

  if (!force) {
    const exists = await fs.stat(target).then(() => true, () => false);
    if (exists) return { target, skipped: true, ext };
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(target, buffer);
  return { target, skipped: false, ext };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  let downloaded = 0;
  let skipped = 0;
  const problems = [];

  for (const [page, names] of Object.entries(PAGES)) {
    const pageUrl = `${BASE}/${page}`;
    process.stdout.write(`${page}\n`);

    let urls;
    try {
      const response = await fetch(pageUrl, { headers: { accept: 'text/html' } });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      urls = imageUrls(mainSection(await response.text()));
    } catch (error) {
      problems.push(`${page}: could not load page (${error.message})`);
      continue;
    }

    if (urls.length !== names.length) {
      problems.push(
        `${page}: found ${urls.length} images but expected ${names.length}. ` +
          `Check the order in PAGES before trusting the output.`,
      );
    }

    for (const [index, name] of names.entries()) {
      const url = urls[index];
      if (!url) {
        problems.push(`${page}: no image for ${name}`);
        continue;
      }
      try {
        const result = await download(url, name);
        if (result.skipped) {
          skipped += 1;
        } else {
          downloaded += 1;
          if (result.ext !== '.png') {
            problems.push(
              `${name}: saved as ${result.ext}. Update the reference in docs/ to match.`,
            );
          }
        }
        process.stdout.write(`  ${result.skipped ? 'skip' : 'save'}  ${name}${result.ext}\n`);
      } catch (error) {
        problems.push(`${name}: ${error.message}`);
      }
    }
  }

  process.stdout.write(`\ndownloaded ${downloaded}, skipped ${skipped}\n`);

  if (problems.length) {
    process.stdout.write(`\n${problems.length} thing(s) to check:\n`);
    for (const problem of problems) process.stdout.write(`  - ${problem}\n`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
