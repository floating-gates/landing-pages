import { describe, it, expect } from 'vitest';
import {
  renderInline,
  renderBlocks,
  extractHeadings,
  buildDocs,
  slugify,
} from './docs.js';
import { docsContents } from '../data/docs/index.js';

describe('renderInline', () => {
  it('renders emphasis and inline code', () => {
    expect(renderInline('**bold** and *italic* and `code`')).toBe(
      '<strong>bold</strong> and <em>italic</em> and <code>code</code>',
    );
  });

  it('marks external links as noopener and leaves internal ones alone', () => {
    expect(renderInline('[site](https://floating-gates.com)')).toBe(
      '<a href="https://floating-gates.com" target="_blank" rel="noopener noreferrer">site</a>',
    );
    expect(renderInline('[pricing](/pricing)')).toBe('<a href="/pricing">pricing</a>');
  });

  it('escapes raw HTML', () => {
    expect(renderInline('<script>alert(1)</script>')).toBe(
      '&lt;script&gt;alert(1)&lt;/script&gt;',
    );
  });

  it('does not treat markup inside inline code as markup', () => {
    expect(renderInline('use `**not bold**` here')).toBe(
      'use <code>**not bold**</code> here',
    );
  });
});

describe('renderBlocks', () => {
  it('renders headings with slug ids', () => {
    expect(renderBlocks([{ type: 'heading', level: 2, text: 'How it works' }])).toBe(
      '<h2 id="how-it-works">How it works</h2>',
    );
  });

  it('clamps heading levels to h2 and below, since h1 is the page title', () => {
    expect(renderBlocks([{ type: 'heading', level: 1, text: 'Top' }])).toContain('<h2');
    expect(renderBlocks([{ type: 'heading', level: 9, text: 'Deep' }])).toContain('<h6');
  });

  it('renders text as a paragraph', () => {
    expect(renderBlocks([{ type: 'text', text: 'Hello.' }])).toBe('<p>Hello.</p>');
  });

  it('renders bullet and numbered lists', () => {
    expect(renderBlocks([{ type: 'list', items: ['one', 'two'] }])).toBe(
      '<ul><li>one</li><li>two</li></ul>',
    );
    expect(renderBlocks([{ type: 'list', ordered: true, items: ['first'] }])).toBe(
      '<ol><li>first</li></ol>',
    );
  });

  it('renders a nested list inside its parent item', () => {
    expect(
      renderBlocks([
        { type: 'list', items: [{ text: 'one', items: ['nested'] }, 'two'] },
      ]),
    ).toBe('<ul><li>one<ul><li>nested</li></ul></li><li>two</li></ul>');
  });

  it('renders code without interpreting markup', () => {
    expect(
      renderBlocks([{ type: 'code', language: 'sh', code: 'npm run build  # **not bold**' }]),
    ).toBe('<pre><code class="language-sh">npm run build  # **not bold**</code></pre>');
  });

  it('renders a figure with its caption', () => {
    expect(renderBlocks([{ type: 'figure', img: '/a.png', caption: 'Dashboard' }])).toBe(
      '<figure><img src="/a.png" alt="Dashboard" loading="lazy" />' +
        '<figcaption>Dashboard</figcaption></figure>',
    );
  });

  it('omits the caption when there is none', () => {
    expect(renderBlocks([{ type: 'figure', img: '/a.png' }])).toBe(
      '<figure><img src="/a.png" alt="" loading="lazy" /></figure>',
    );
  });

  it('renders tables with optional alignment', () => {
    expect(
      renderBlocks([
        { type: 'table', headers: ['A', 'B'], rows: [['1', '2']], align: ['', 'right'] },
      ]),
    ).toBe(
      '<table><thead><tr><th>A</th><th style="text-align:right">B</th></tr></thead>' +
        '<tbody><tr><td>1</td><td style="text-align:right">2</td></tr></tbody></table>',
    );
  });

  it('renders quotes and dividers', () => {
    expect(renderBlocks([{ type: 'quote', text: 'note' }, { type: 'divider' }])).toBe(
      '<blockquote><p>note</p></blockquote>\n<hr />',
    );
  });

  it('ignores unknown block types instead of throwing', () => {
    expect(renderBlocks([{ type: 'mystery' }, { type: 'text', text: 'ok' }])).toBe('<p>ok</p>');
  });

  it('drops javascript: urls', () => {
    expect(renderBlocks([{ type: 'text', text: '[x](javascript:alert(1))' }])).toContain(
      'href="#"',
    );
  });

  it('resolves bare image filenames against the asset map', () => {
    const assets = { '../data/images/add_lib.png': '/assets/add_lib.abc123.png' };
    expect(renderBlocks([{ type: 'figure', img: 'add_lib.png' }], { assets })).toContain(
      'src="/assets/add_lib.abc123.png"',
    );
  });

  it('passes absolute image paths through', () => {
    expect(renderBlocks([{ type: 'figure', img: '/docs-images/a.png' }])).toContain(
      'src="/docs-images/a.png"',
    );
  });
});

describe('extractHeadings', () => {
  it('collects h2 and h3 headings in document order', () => {
    const html = renderBlocks([
      { type: 'heading', level: 2, text: 'One' },
      { type: 'heading', level: 3, text: 'One A' },
      { type: 'heading', level: 4, text: 'Too deep' },
      { type: 'heading', level: 2, text: 'Two' },
    ]);
    expect(extractHeadings(html)).toEqual([
      { level: 2, id: 'one', text: 'One' },
      { level: 3, id: 'one-a', text: 'One A' },
      { level: 2, id: 'two', text: 'Two' },
    ]);
  });
});

describe('buildDocs', () => {
  const contents = [
    { id: 'intro', title: 'Intro', blocks: [{ type: 'text', text: 'Hi' }] },
    {
      id: 'quick-start',
      title: 'Quick Start',
      description: 'Get going',
      blocks: [{ type: 'heading', level: 2, text: 'Step one' }],
      children: [
        {
          id: 'set-the-factory',
          title: 'Set the Factory',
          blocks: [],
          children: [{ id: 'deeper', title: 'Deeper', blocks: [] }],
        },
      ],
    },
  ];

  it('composes slugs from the position in the tree', () => {
    const { chapters } = buildDocs(contents);
    expect(chapters.map((chapter) => chapter.slug)).toEqual([
      'intro',
      'quick-start',
      'quick-start/set-the-factory',
      'quick-start/set-the-factory/deeper',
    ]);
  });

  it('keeps the flat list in reading order so previous/next works', () => {
    const { chapters } = buildDocs(contents);
    expect(chapters.map((chapter) => chapter.title)).toEqual([
      'Intro',
      'Quick Start',
      'Set the Factory',
      'Deeper',
    ]);
  });

  it('nests the tree for the sidebar', () => {
    const { tree } = buildDocs(contents);
    expect(tree.map((node) => node.slug)).toEqual(['intro', 'quick-start']);
    expect(tree[1].children[0].children[0].slug).toBe('quick-start/set-the-factory/deeper');
  });

  it('records depth, description and page headings', () => {
    const { chapters } = buildDocs(contents);
    const quickStart = chapters[1];
    expect(quickStart.depth).toBe(0);
    expect(quickStart.description).toBe('Get going');
    expect(quickStart.headings).toEqual([{ level: 2, id: 'step-one', text: 'Step one' }]);
    expect(chapters[3].depth).toBe(2);
  });
});

describe('the real table of contents', () => {
  const { chapters, tree } = buildDocs(docsContents);

  it('has every chapter from the GitBook space', () => {
    expect(chapters).toHaveLength(19);
  });

  it('gives every chapter a unique slug', () => {
    const slugs = chapters.map((chapter) => chapter.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('renders content for every chapter', () => {
    const empty = chapters.filter((chapter) => !chapter.html.trim());
    expect(empty.map((chapter) => chapter.slug)).toEqual([]);
  });

  it('keeps every screenshot under /docs-images/', () => {
    const stray = [];
    for (const chapter of chapters) {
      for (const match of chapter.html.matchAll(/<img src="([^"]+)"/g)) {
        if (!match[1].startsWith('/docs-images/')) stray.push(`${chapter.slug}: ${match[1]}`);
      }
    }
    expect(stray).toEqual([]);
  });

  it('has no broken internal chapter links', () => {
    const slugs = new Set(chapters.map((chapter) => chapter.slug));
    const broken = [];
    for (const chapter of chapters) {
      for (const match of chapter.html.matchAll(/<a href="#([^"]+)"/g)) {
        if (!slugs.has(match[1])) broken.push(`${chapter.slug} -> #${match[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('nests Parametric Design three levels deep, as GitBook does', () => {
    const manage = tree.find((node) => node.slug === 'manage-what-your-cad-can-do');
    const parametric = manage.children.find(
      (node) => node.slug === 'manage-what-your-cad-can-do/parametric-design',
    );
    expect(parametric.children.map((node) => node.title)).toEqual([
      'Model',
      'Variables',
      'How it should look',
    ]);
  });
});

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Read the Feasibility Output!')).toBe('read-the-feasibility-output');
  });
});
