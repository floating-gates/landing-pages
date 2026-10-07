/**
 * Markdown helpers for /docs.
 *
 * Chapters are authored as .md files. This module turns that markdown into the
 * block objects the existing renderer already knows how to display.
 */

const IMAGE_RE =
  /^!\[([^\]]*)\]\(\s*<?([^>\s)]+)>?(?:\s+(?:"([^"]*)"|'([^']*)'))?\s*\)$/;

const LIST_RE = /^(\s*)([-*+]|\d+[.)])\s+(.*)$/;

const HEADING_RE = /^(#{1,6})\s+(.+?)\s*#*\s*$/;

const HR_RE = /^\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/;

const FENCE_RE = /^(`{3,}|~{3,})(.*)$/;

const QUOTE_RE = /^>\s?(.*)$/;

const TABLE_LINE_RE = /^\s*\|.*\|\s*$/;

const TABLE_SEP_CELL_RE = /^\s*:?-{3,}:?\s*$/;

function fileName(filePath) {
  return String(filePath).split('/').pop();
}

function yamlEscape(value) {
  const text = String(value);
  if (text === '' || /[:#\n"'\\]/.test(text) || text !== text.trim()) {
    return JSON.stringify(text);
  }
  return text;
}

export function resolveRelative(fromFile, rel) {
  const raw = String(rel ?? '').trim();
  if (!raw || /^(?:[a-z][a-z0-9+.-]*:|\/)/i.test(raw)) return raw;

  const parts = String(fromFile).split('/');
  parts.pop();
  for (const segment of raw.split('/')) {
    if (!segment || segment === '.') continue;
    if (segment === '..') parts.pop();
    else parts.push(segment);
  }
  return parts.join('/');
}

export function parseFrontmatter(text) {
  const source = String(text ?? '');
  const match = source.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n?/);
  if (!match) return { meta: {}, body: source };

  const meta = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      try {
        value = JSON.parse(value.startsWith("'") ? `"${value.slice(1, -1).replace(/"/g, '\\"')}"` : value);
      } catch {
        value = value.slice(1, -1);
      }
    }
    meta[kv[1]] = value;
  }

  return { meta, body: source.slice(match[0].length) };
}

export function parseSummary(text) {
  const root = [];
  const stack = [{ indent: -1, children: root }];

  for (const rawLine of String(text ?? '').split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue;
    const match = rawLine.match(/^(\s*)-\s+\[([^\]]+)\]\(([^)]+)\)\s*$/);
    if (!match) continue;

    const indent = match[1].replace(/\t/g, '  ').length;
    const node = { title: match[2], file: match[3].trim(), children: [] };

    while (stack.length && indent <= stack[stack.length - 1].indent) stack.pop();
    stack[stack.length - 1].children.push(node);
    stack.push({ indent, children: node.children });
  }

  return root;
}

function isTableSeparator(line) {
  if (!TABLE_LINE_RE.test(line) && !/^\s*[:\-|\s]+$/.test(line)) return false;
  const cells = splitTableRow(line);
  return cells.length > 0 && cells.every((cell) => TABLE_SEP_CELL_RE.test(cell));
}

function splitTableRow(line) {
  let source = line.trim();
  if (source.startsWith('|')) source = source.slice(1);
  if (source.endsWith('|')) source = source.slice(0, -1);
  return source.split('|').map((cell) => cell.trim());
}

function alignFromSeparator(cell) {
  const left = cell.startsWith(':');
  const right = cell.endsWith(':');
  if (left && right) return 'center';
  if (right) return 'right';
  if (left) return 'left';
  return '';
}

function matchList(line) {
  const match = line.match(LIST_RE);
  if (!match) return null;
  return {
    indent: match[1].replace(/\t/g, '  ').length,
    ordered: /^\d/.test(match[2]),
    text: match[3],
  };
}

function isBlank(line) {
  return !line || !line.trim();
}

function looksLikeBlockStart(line) {
  return Boolean(
    HEADING_RE.test(line) ||
      HR_RE.test(line) ||
      FENCE_RE.test(line) ||
      QUOTE_RE.test(line) ||
      matchList(line) ||
      TABLE_LINE_RE.test(line),
  );
}

function parseList(lines, start) {
  const first = matchList(lines[start]);
  const baseIndent = first.indent;
  const items = [];
  let index = start;

  const attachNested = (nested) => {
    const last = items.length - 1;
    const current = items[last];
    const next = {
      text: typeof current === 'string' ? current : current.text,
      ordered: nested.ordered,
      items: nested.items,
    };
    items[last] = next;
  };

  while (index < lines.length) {
    const line = lines[index];

    if (isBlank(line)) {
      const nextNonBlank = lines.slice(index + 1).find((candidate) => !isBlank(candidate));
      if (!nextNonBlank) break;
      const nextItem = matchList(nextNonBlank);
      if (nextItem && nextItem.indent >= baseIndent) {
        index += 1;
        continue;
      }
      break;
    }

    const item = matchList(line);
    if (item && item.indent > baseIndent) {
      const nested = parseList(lines, index);
      attachNested(nested.block);
      index = nested.next;
      continue;
    }

    if (!item || item.indent < baseIndent) break;

    items.push(item.text);
    index += 1;

    while (index < lines.length) {
      const cont = lines[index];
      if (isBlank(cont) || looksLikeBlockStart(cont) || matchList(cont)) break;
      if (cont.replace(/\t/g, '  ').length <= baseIndent) break;
      items[items.length - 1] = `${items[items.length - 1]} ${cont.trim()}`;
      index += 1;
    }
  }

  return {
    block: { type: 'list', ordered: first.ordered, items },
    next: index,
  };
}

function parseTable(lines, start) {
  const headers = splitTableRow(lines[start]);
  const separator = splitTableRow(lines[start + 1] || '');
  const align = separator.map(alignFromSeparator);
  const rows = [];
  let index = start + 2;

  while (index < lines.length && TABLE_LINE_RE.test(lines[index]) && !isTableSeparator(lines[index])) {
    rows.push(splitTableRow(lines[index]));
    index += 1;
  }

  return {
    block: { type: 'table', headers, rows, align },
    next: index,
  };
}

function parseFence(lines, start) {
  const open = lines[start].match(FENCE_RE);
  const fence = open[1][0];
  const fenceLen = open[1].length;
  const language = open[2].trim().split(/\s+/)[0] || '';
  const body = [];
  let index = start + 1;

  while (index < lines.length) {
    const close = lines[index].match(FENCE_RE);
    if (close && close[1][0] === fence && close[1].length >= fenceLen && !close[2].trim()) {
      index += 1;
      break;
    }
    body.push(lines[index]);
    index += 1;
  }

  return {
    block: { type: 'code', language, code: body.join('\n') },
    next: index,
  };
}

function parseQuote(lines, start) {
  const body = [];
  let index = start;

  while (index < lines.length) {
    const match = lines[index].match(QUOTE_RE);
    if (!match) break;
    body.push(match[1]);
    index += 1;
  }

  return {
    block: { type: 'quote', text: body.join(' ').trim() },
    next: index,
  };
}

function paragraphToBlock(text, options) {
  const trimmed = text.trim();
  const image = trimmed.match(IMAGE_RE);
  if (image) {
    const title = image[3] || image[4] || '';
    const src = options.resolveImage ? options.resolveImage(image[2]) : image[2];
    return {
      type: 'figure',
      img: src,
      caption: image[1],
      ...(title === 'full' ? { full: true } : {}),
    };
  }
  return { type: 'text', text: trimmed };
}

export function parseMarkdown(text, options = {}) {
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (isBlank(line)) {
      index += 1;
      continue;
    }

    const heading = line.match(HEADING_RE);
    if (heading) {
      blocks.push({ type: 'heading', level: heading[1].length, text: heading[2] });
      index += 1;
      continue;
    }

    if (HR_RE.test(line) && !matchList(line)) {
      blocks.push({ type: 'divider' });
      index += 1;
      continue;
    }

    if (FENCE_RE.test(line)) {
      const parsed = parseFence(lines, index);
      blocks.push(parsed.block);
      index = parsed.next;
      continue;
    }

    if (QUOTE_RE.test(line)) {
      const parsed = parseQuote(lines, index);
      blocks.push(parsed.block);
      index = parsed.next;
      continue;
    }

    if (
      TABLE_LINE_RE.test(line) &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      const parsed = parseTable(lines, index);
      blocks.push(parsed.block);
      index = parsed.next;
      continue;
    }

    if (matchList(line)) {
      const parsed = parseList(lines, index);
      blocks.push(parsed.block);
      index = parsed.next;
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index];
      if (isBlank(next) || looksLikeBlockStart(next) || IMAGE_RE.test(next.trim())) break;
      paragraph.push(next);
      index += 1;
    }

    blocks.push(paragraphToBlock(paragraph.join(' '), options));
  }

  return blocks;
}

function listToMarkdown(block, indent = 0) {
  const pad = ' '.repeat(indent);
  return (block.items || [])
    .map((item, index) => {
      const marker = block.ordered ? `${index + 1}.` : '-';
      if (typeof item === 'string') return `${pad}${marker} ${item}`;
      const nested = item.items?.length
        ? `\n${listToMarkdown({ ordered: item.ordered, items: item.items }, indent + 2)}`
        : '';
      return `${pad}${marker} ${item.text}${nested}`;
    })
    .join('\n');
}

function tableToMarkdown(block) {
  const align = block.align || [];
  const headers = block.headers || [];
  const separator = headers.map((_, index) => {
    if (align[index] === 'center') return ':---:';
    if (align[index] === 'right') return '---:';
    if (align[index] === 'left') return ':---';
    return '---';
  });
  const format = (row) => `| ${row.join(' | ')} |`;
  return [
    format(headers),
    format(separator),
    ...(block.rows || []).map((row) => format(row)),
  ].join('\n');
}

export function blocksToMarkdown(blocks) {
  return (blocks || [])
    .map((block) => {
      switch (block?.type) {
        case 'heading':
          return `${'#'.repeat(block.level || 2)} ${block.text ?? ''}`;
        case 'text':
          return String(block.text ?? '');
        case 'list':
          return listToMarkdown(block);
        case 'code': {
          const language = block.language || '';
          return `\`\`\`${language}\n${block.code ?? ''}\n\`\`\``;
        }
        case 'figure': {
          const title = block.full ? ' "full"' : '';
          return `![${block.caption ?? ''}](${block.img ?? ''}${title})`;
        }
        case 'quote':
          return `> ${block.text ?? ''}`;
        case 'table':
          return tableToMarkdown(block);
        case 'divider':
          return '---';
        default:
          return '';
      }
    })
    .filter((chunk) => chunk !== '')
    .join('\n\n');
}

export function chapterToMarkdown(chapter) {
  const meta = [];
  if (chapter.id) meta.push(`id: ${yamlEscape(chapter.id)}`);
  if (chapter.title) meta.push(`title: ${yamlEscape(chapter.title)}`);
  if (chapter.description) meta.push(`description: ${yamlEscape(chapter.description)}`);
  if (chapter.updated) meta.push(`updated: ${yamlEscape(chapter.updated)}`);
  const body = blocksToMarkdown(chapter.blocks);
  return `---\n${meta.join('\n')}\n---\n\n${body}\n`;
}

const SKIP_FILES = new Set(['README.md', 'SUMMARY.md']);

export function loadDocs(markdownFiles, options = {}) {
  const images = options.images || {};
  const entries = Object.entries(markdownFiles || {});
  const summaryEntry = entries.find(([filePath]) => fileName(filePath) === 'SUMMARY.md');
  if (!summaryEntry) throw new Error('Documentation is missing SUMMARY.md');

  const byName = {};
  for (const [filePath, content] of entries) {
    const name = fileName(filePath);
    if (SKIP_FILES.has(name)) continue;
    byName[name] = { path: filePath, content };
  }

  const hydrate = (node) => {
    const name = fileName(node.file);
    const file = byName[name];
    if (!file) throw new Error(`SUMMARY.md references missing file: ${node.file}`);

    const { meta, body } = parseFrontmatter(file.content);
    const resolveImage = (src) => {
      const resolved = resolveRelative(file.path, src);
      return Object.hasOwn(images, resolved) ? images[resolved] : src;
    };

    const blocks = parseMarkdown(body, { resolveImage });
    let title = meta.title || node.title;
    // The page already renders an h1 from `title`. A leading "# Title" is
    // treated as that heading, not as body content.
    if (blocks[0]?.type === 'heading' && blocks[0].level === 1) {
      if (!meta.title) title = blocks[0].text;
      blocks.shift();
    }

    return {
      id: meta.id || name.replace(/\.md$/i, ''),
      title,
      description: meta.description || '',
      updated: meta.updated || '',
      blocks,
      children: (node.children || []).map(hydrate),
    };
  };

  return parseSummary(summaryEntry[1]).map(hydrate);
}
