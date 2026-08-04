import { docsContents } from "../data/docs/index.js";

/**
 * Renders the documentation blocks declared in `src/data/docs/*.js`.
 *
 * Chapter content is structured data, not prose strings: each block names its
 * own type, so the data files stay readable and the markup stays consistent.
 * Only the *inline* level of a text block is Markdown-flavoured, covering the
 * formatting that actually shows up mid-sentence.
 *
 * Block types:
 *   { type: 'heading',  level: 2|3|4, text }
 *   { type: 'text',     text }
 *   { type: 'list',     ordered?, items: [ string | { text, items, ordered? } ] }
 *   { type: 'code',     code, language? }
 *   { type: 'figure',   img, caption? }
 *   { type: 'quote',    text }
 *   { type: 'table',    headers: [], rows: [[]], align?: [] }
 *   { type: 'divider' }
 *
 * Inline formatting inside `text`, list items, quotes, captions and table
 * cells: **bold**, *italic*, `code`, [links](url), ![images](src), ~~strike~~.
 *
 * Everything is HTML-escaped and `javascript:` URLs are dropped, so the output
 * is safe to hand to `v-html`.
 */

function escapeHtml(value) {
    return String(value)
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

/**
 * Build a URL resolver. `assets` maps bundler paths to final URLs, e.g. the
 * result of `import.meta.glob('../data/images/*', { query: '?url', ... })`, so
 * a chapter can reference `add_lib.png` and still get a hashed, cache-busted
 * URL in the production build. Absolute paths are passed through untouched.
 */
function makeResolver(assets) {
  const entries = Object.entries(assets || {});
  return (url) => {
    const raw = String(url).trim();
    if (/^javascript:/i.test(raw)) return '#';
    if (/^(https?:|mailto:|tel:|data:image\/|\/|#)/i.test(raw)) return raw;

    const key = raw.replace(/^\.?\//, '');
    for (const [path, resolved] of entries) {
      if (path === key || path.endsWith(`/${key}`)) return resolved;
    }
    return raw;
  };
}

/** Render the Markdown-flavoured formatting allowed inside a single line. */
export function renderInline(text, resolveUrl = makeResolver()) {
  const codeSpans = [];

  // Stash inline code so its contents are not treated as markup.
  let out = text.replace(/`([^`\n]+)`/g, (_, code) => {
    codeSpans.push(code);
    return ` CODE${codeSpans.length - 1} `;
  });

  out = out.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, alt, src) => `<img src="${resolveUrl(src)}" alt="${alt}" loading="lazy" />`,
  );

  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const url = resolveUrl(href);
    const external = /^https?:/i.test(url);
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${url}"${attrs}>${label}</a>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^\w_])_([^_\n]+)_(?![\w_])/g, '$1<em>$2</em>');
  out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  out = out.replace(/ CODE(\d+) /g, (_, index) => `<code>${codeSpans[index]}</code>`);
  return out;
}

function renderList(block, resolveUrl) {
  const tag = block.ordered ? 'ol' : 'ul';
  const items = (block.items || []).map((item) => {
    // A plain string is a leaf; an object may carry a nested list.
    if (typeof item === 'string') return `<li>${renderInline(item, resolveUrl)}</li>`;
    const nested = item.items?.length
      ? renderList({ ordered: item.ordered, items: item.items }, resolveUrl)
      : '';
    return `<li>${renderInline(item.text, resolveUrl)}${nested}</li>`;
  });
  return `<${tag}>${items.join('')}</${tag}>`;
}

function renderTable(block, resolveUrl) {
  const align = block.align || [];
  const styleFor = (index) => (align[index] ? ` style="text-align:${align[index]}"` : '');

  const head = (block.headers || [])
    .map((cell, index) => `<th${styleFor(index)}>${renderInline(cell, resolveUrl)}</th>`)
    .join('');

  const body = (block.rows || [])
    .map(
      (row) =>
        `<tr>${row
          .map((cell, index) => `<td${styleFor(index)}>${renderInline(cell, resolveUrl)}</td>`)
          .join('')}</tr>`,
    )
    .join('');

  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderBlock(block, resolveUrl) {
  switch (block?.type) {
    case 'heading': {
      const level = Math.min(Math.max(Number(block.level) || 2, 2), 6);
      const text = String(block.text ?? '');
      return `<h${level} id="${slugify(text)}">${renderInline(text, resolveUrl)}</h${level}>`;
    }

    case 'text':
      return `<p>${renderInline(block.text, resolveUrl)}</p>`;

    case 'list':
      return renderList(block, resolveUrl);

    case 'code': {
      const language = block.language ? ` class="language-${block.language}"` : '';
      return `<pre><code${language}>${escapeHtml(block.code ?? '')}</code></pre>`;
    }

    case 'figure': {
      const img = `<img src="${resolveUrl(block.img)}" alt="${escapeHtml(block.caption ?? '')}" loading="lazy" />`;
      const caption = block.caption
        ? `<figcaption>${renderInline(block.caption, resolveUrl)}</figcaption>`
        : '';
      return `<figure>${img}${caption}</figure>`;
    }

    case 'quote':
      return `<blockquote><p>${renderInline(block.text, resolveUrl)}</p></blockquote>`;

    case 'table':
      return renderTable(block, resolveUrl);

    case 'divider':
      return '<hr />';

    default:
      return '';
  }
}

/**
 * Render a chapter's blocks to an HTML string.
 *
 * @param {Array} blocks
 * @param {{ assets?: Record<string, string> }} [options]
 */
export function renderBlocks(blocks, options = {}) {
  const resolveUrl = makeResolver(options.assets);
  return (blocks || [])
    .map((block) => renderBlock(block, resolveUrl))
    .filter(Boolean)
    .join('\n');
}

/**
 * Pull the h2/h3 headings out of rendered HTML for the "On this page" rail.
 * Reading them back off the HTML keeps one source of truth for the ids.
 */
export function extractHeadings(html) {
  const headings = [];
  const pattern = /<h([23]) id="([^"]*)">([\s\S]*?)<\/h\1>/g;
  let match = pattern.exec(html);
  while (match) {
    headings.push({
      level: Number(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, '').trim(),
    });
    match = pattern.exec(html);
  }
  return headings;
}

/**
 * Walk the table of contents from `src/data/docs/index.js` and produce:
 *   - `chapters`: flat, in reading order, so previous/next comes for free
 *   - `tree`:     nested, for the sidebar
 *
 * Slugs are composed from each chapter's `id` and its position in the tree,
 * e.g. `quick-start/set-the-factory`, so a chapter never has to repeat where
 * it sits in the hierarchy.
 */
function buildDocs(contents, options = {}) {
  const chapters = [];

  const visit = (entries, parentSlug) =>
    (entries || []).map((entry) => {
      const slug = parentSlug ? `${parentSlug}/${entry.id}` : entry.id;
      const html = renderBlocks(entry.blocks, options);

      const chapter = {
        id: entry.id,
        slug,
        title: entry.title || entry.id.replace(/-/g, ' '),
        description: entry.description || '',
        updated: entry.updated || '',
        depth: slug.split('/').length - 1,
        html,
        headings: extractHeadings(html),
      };

      chapters.push(chapter);
      // Children are visited after the parent, so the flat list stays in
      // reading order rather than breadth-first.
      return { ...chapter, children: visit(entry.children, slug) };
    });

  const tree = visit(contents, '');
  return { chapters, tree };
}


// Images referenced by bare filename resolve against src/data/images, so Vite
// fingerprints them. Absolute paths like /docs-images/... are passed through.
const assets = import.meta.glob('../data/images/*', {
  query: '?url',
  import: 'default',
  eager: true,
});

// Chapter content and ordering live in src/data/docs. `chapters` is the flat
// reading order (used for previous/next), `tree` is the nested sidebar.
export const { chapters, tree } = buildDocs(docsContents, { assets });
