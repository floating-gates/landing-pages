# Documentation content

Everything shown at `/docs` lives here. One file per chapter, plus
[`index.js`](./index.js), which declares the order and the nesting.

The content was migrated from <https://floating-gates.gitbook.io/gates-docs>,
and the chapter order mirrors it.

## Adding a chapter

Create the file:

```js
// src/data/docs/quoting.js
export const Quoting = {
  id: 'quoting',                      // becomes the URL: /docs#quoting
  title: 'Quoting',                   // sidebar label and page heading
  description: 'How pricing works',   // optional subtitle
  blocks: [
    { type: 'text', text: 'Quotes are produced from geometry and material.' },
    { type: 'heading', level: 2, text: 'Automatic quotes' },
    { type: 'figure', img: '/docs-images/quoting-1.png', caption: 'The quote panel' },
  ],
};
```

Then register it in `index.js`, in the position it should appear:

```js
import { Quoting } from './quoting.js';

export const docsContents = [
  // ...
  section(QuickStart, [SetTheFactory, Quoting]),
];
```

`section(parent, children)` is what creates sidebar nesting. A chapter with no
children is listed on its own. Slugs are composed from the tree, so `Quoting`
nested under `QuickStart` is served at `/docs#quick-start/quoting` without
having to write that path anywhere.

## Block types

| Type | Fields | Notes |
| --- | --- | --- |
| `heading` | `level` (2-6), `text` | Levels 2 and 3 appear in the "On this page" rail. The page title is the `h1`, so chapters start at level 2. |
| `text` | `text` | A paragraph. |
| `list` | `items`, `ordered` | Items are strings, or `{ text, items }` to nest a sub-list. |
| `code` | `code`, `language` | Rendered verbatim. Use a template literal for multi-line code. |
| `figure` | `img`, `caption` | Centred screenshot with the caption underneath. |
| `quote` | `text` | Callout / aside. |
| `table` | `headers`, `rows`, `align` | `align` is per column: `'left'`, `'center'`, `'right'`, or `''`. |
| `divider` | none | Horizontal rule. |

Inside `text`, list items, quotes, captions and table cells you can use
`**bold**`, `*italic*`, `` `code` ``, `[links](url)`, `![images](src)`, and
`~~strikethrough~~`. Everything is escaped, so raw HTML is shown as text rather
than injected.

## Page furniture

The left sidebar, the "On this page" rail, and the previous/next footer are all
generated from this data. The rail lists the level 2 and 3 headings of the
current chapter, and previous/next follows the same reading order as the
sidebar. Nothing to maintain by hand.

## Images

Screenshots live in `public/docs-images/` and are referenced by absolute path:

```js
{ type: 'figure', img: '/docs-images/set-the-factory-3.png', caption: 'Selecting materials' }
```

Product images already in `src/data/images/` can be referenced by bare filename
(`img: 'add_lib.png'`), which lets Vite fingerprint them for production.

The screenshots were not committed as part of the migration. Pull them from the
GitBook space once with:

```sh
npm run docs:images
```

The script warns about any page where the number of images it finds does not
match what the chapter expects, which is the signal that
[`scripts/fetch-doc-images.mjs`](../../../scripts/fetch-doc-images.mjs) needs
its `PAGES` map updated. Once the images are committed, both the script and the
GitBook space can be retired.

## Checking your work

```sh
npm test                # renderer and table-of-contents tests
npm run build-local     # fails loudly if a chapter breaks the build
```

The renderer is [`src/utils/docs.js`](../../utils/docs.js); the component that
lays the page out is [`src/components/Docs.vue`](../../components/Docs.vue).
