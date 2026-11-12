---
title: Content model
description: The frontmatter contract, how ordering works, and how headings become anchors.
order: 3
updated: 2026-11-11
tags: markdown, frontmatter
---

# Content model

A page is a Markdown file at `src/content/<section>/<slug>.md`. The path determines both the
section it belongs to and its URL; the frontmatter determines everything else.

## Frontmatter

```yaml
---
title: Content model
description: One line, shown in the nav and under the page title.
order: 3
updated: 2026-11-11
tags: markdown, frontmatter
---
```

| Field | Required | Meaning |
| --- | --- | --- |
| `title` | yes | Page title and nav label |
| `description` | yes | Subtitle in the section index and the page header |
| `order` | no | Sort position inside the section (default `999`) |
| `updated` | no | Shown as-is; a date string, not a parsed date |
| `tags` | no | Comma-separated; rendered as pills |

The parser is intentionally tiny — `key: value` lines, with optional surrounding quotes. There
are no nested objects and no arrays beyond the comma-separated `tags`. That is a feature: the
contract is readable by anyone who has never used a Markdown toolchain.

## URL shape

```text
src/content/guides/adding-a-page.md  ->  /guides/adding-a-page
src/content/docs/quickstart.md       ->  /docs/quickstart
```

The section must be one of those declared in `src/lib/content.ts`. A file in an unknown
folder is ignored rather than guessed at — a typo in a folder name shows up as a missing page
instead of a route nobody asked for.

## Headings and anchors

`##` and `###` headings become:

- the table of contents in the right rail;
- stable anchors (`## Content model` becomes `#content-model`), with `scroll-mt` so a deep link
  does not land under the sticky header.

Headings inside fenced code blocks are ignored, which matters when a page documents Markdown
itself.

## Markdown in use

The site styles a deliberately small subset:

- paragraphs, lists, emphasis, links (external links open in a new tab with `rel` set);
- fenced code blocks and inline code;
- tables via GFM;
- blockquotes as callouts;
- horizontal rules and images.

Anything beyond that — MDX, JSX in content, interactive widgets — belongs in a page component
under `src/pages/`, not in a Markdown file. Which is why the design system is a route, not a
document.

## Portability — the starter part

Content here is deliberately boring: CommonMark plus a flat frontmatter map. No MDX, no
imported components, no build-time data in a page. That is what makes this repository a starter
for an *open knowledge* project rather than a site for one product: a tree of Markdown notes can
be copied in, given the four fields, and published.

Moving notes from a knowledge vault (an OpenKnowledge project, for instance) is a copy, not an
integration:

1. Copy `notes/<topic>/<slug>.md` into `src/content/<section>/<slug>.md`.
2. Add `title`, `description`, `order` and `updated`; keep the body as it is.
3. Rename or drop internal links, or leave them — they are rewritten against the Pages mount at
   render time, and the guard fails the build if a root-absolute link points at no route.

Nothing here reads the vault at build time, and the vault does not read this repository. The
coupling is a copy of files and a shared opinion about what a document is: a heading, a line of
prose, and a date that tells you whether to trust it.

## Adding a section

Add an entry to `SECTIONS` in `src/lib/content.ts`, create the folder, add one file. The header,
footer, section indexes and the 404 page pick it up automatically.

> A section with no pages is fine while you are drafting: it renders an empty index rather than
> a broken link.
