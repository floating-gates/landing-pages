const ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ESCAPE_MAP[char]);
}

const UNESCAPE_MAP = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&amp;': '&',
};

// Reverses escapeHtml. Ampersand last so a real "&amp;" is not mis-decoded.
function unescapeHtml(value) {
  return String(value).replace(
    /&lt;|&gt;|&quot;|&#39;|&amp;/g,
    (entity) => UNESCAPE_MAP[entity],
  );
}

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function resolveUrl(url) {
  const raw = String(url ?? '').trim();
  return /^javascript:/i.test(raw) ? '#' : raw;
}

export function renderInline(text) {
  const codeSpans = [];
  let out = escapeHtml(text ?? '');

  out = out.replace(/`([^`\n]+)`/g, (_, code) => {
    codeSpans.push(code);
    return ` CODE${codeSpans.length - 1} `;
  });

  out = out.replace(
    /!\[([^\]]*)\]\(([^)\s]+)\)/g,
    (_, alt, src) => `<img src="${resolveUrl(src)}" alt="${alt}" loading="lazy" />`,
  );

  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const url = resolveUrl(href);
    const attrs = /^https?:/i.test(url) ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${url}"${attrs}>${label}</a>`;
  });

  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  out = out.replace(/(^|[^\w_])_([^_\n]+)_(?![\w_])/g, '$1<em>$2</em>');
  out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');

  return out.replace(/ CODE(\d+) /g, (_, index) => `<code>${codeSpans[index]}</code>`);
}

function renderList(block) {
  const tag = block.ordered ? 'ol' : 'ul';
  const items = (block.items || []).map((item) => {
    if (typeof item === 'string') return `<li>${renderInline(item)}</li>`;
    const nested = item.items?.length
      ? renderList({ ordered: item.ordered, items: item.items })
      : '';
    return `<li>${renderInline(item.text)}${nested}</li>`;
  });
  return `<${tag}>${items.join('')}</${tag}>`;
}

function renderTable(block) {
  const align = block.align || [];
  const styleFor = (index) => (align[index] ? ` style="text-align:${align[index]}"` : '');

  const head = (block.headers || [])
    .map((cell, index) => `<th${styleFor(index)}>${renderInline(cell)}</th>`)
    .join('');

  const body = (block.rows || [])
    .map(
      (row) =>
        `<tr>${row
          .map((cell, index) => `<td${styleFor(index)}>${renderInline(cell)}</td>`)
          .join('')}</tr>`,
    )
    .join('');

  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function renderBlock(block) {
  switch (block?.type) {
    case 'heading': {
      const level = Math.min(Math.max(Number(block.level) || 2, 2), 6);
      const text = String(block.text ?? '');
      return `<h${level} id="${slugify(text)}">${renderInline(text)}</h${level}>`;
    }

    case 'text':
      return `<p>${renderInline(block.text)}</p>`;

    case 'list':
      return renderList(block);

    case 'code': {
      const language = block.language ? ` class="language-${block.language}"` : '';
      return `<pre><code${language}>${escapeHtml(block.code ?? '')}</code></pre>`;
    }

    case 'figure': {
      const img = `<img src="${resolveUrl(block.img)}" alt="${escapeHtml(block.caption ?? '')}" loading="lazy" />`;
      const caption = block.caption
        ? `<figcaption>${renderInline(block.caption)}</figcaption>`
        : '';
      return `<figure>${img}${caption}</figure>`;
    }

    case 'quote':
      return `<blockquote><p>${renderInline(block.text)}</p></blockquote>`;

    case 'table':
      return renderTable(block);

    case 'divider':
      return '<hr />';

    default:
      return '';
  }
}

export function renderBlocks(blocks) {
  return (blocks || [])
    .map(renderBlock)
    .filter(Boolean)
    .join('\n');
}

export function extractHeadings(html) {
  const headings = [];
  const pattern = /<h([23]) id="([^"]*)">([\s\S]*?)<\/h\1>/g;
  let match = pattern.exec(html);

  while (match) {
    headings.push({
      level: Number(match[1]),
      id: match[2],
      // Strip inline markup, then decode the entities escapeHtml added, so the
      // TOC label is plain text Vue can render without showing raw "&#39;".
      text: unescapeHtml(match[3].replace(/<[^>]+>/g, '')).trim(),
    });
    match = pattern.exec(html);
  }

  return headings;
}

export function buildDocs(contents) {
  const chapters = [];

  const visit = (entries, parentSlug) =>
    (entries || []).map((entry) => {
      const slug = parentSlug ? `${parentSlug}/${entry.id}` : entry.id;
      const html = renderBlocks(entry.blocks);

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
      return { ...chapter, children: visit(entry.children, slug) };
    });

  const tree = visit(contents, '');
  return { chapters, tree };
}
