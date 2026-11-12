---
title: Adding a page
description: Four minutes, one file, no navigation edit.
order: 2
updated: 2026-11-11
tags: workflow
---

# Adding a page

The short version: create a Markdown file in a section folder. The navigation, the section
index, the table of contents, the previous/next rail and the counts all follow.

## Step 1 — pick the section

```text
src/content/docs/       documentation
src/content/guides/     task-shaped walkthroughs
src/content/pitch/      the commercial case
src/content/writing/    longer pieces
```

A new section is a new folder plus an entry in `SECTIONS` (`src/lib/content.ts`).

## Step 2 — write the file

```markdown
---
title: Rate limits
description: What the API does when you exceed a quota, and how to back off.
order: 4
updated: 2026-11-12
tags: api, limits
---

# Rate limits

The extension point is a sliding window, not a fixed bucket...
```

Two rules that are worth internalising:

- `order` decides position inside the section. Ties fall back to title order, so duplicates are
  visible rather than random.
- `##` and `###` become the table of contents. `#` does not — the page title already owns that
  level.

## Step 3 — look at it

```bash
npm run dev
```

Open `/<section>/<slug>`. Check three things:

1. It appears in the section index, in the right position.
2. Its headings appear in the right rail (desktop widths).
3. Previous/next make sense.

## Step 4 — verify before you commit

```bash
npm run build
```

The build runs the type-check, the bundle, the post-steps and the publish guard. If the guard
fails it prints the file and the check by name — it is written to be readable, not to be a
mystery.

## What not to do

- **Do not add the page to a nav array.** There is none. If you find yourself editing two files
  to add one page, the page is in the wrong place.
- **Do not use MDX for a first draft.** If a page needs a live widget, it is a page component,
  not a document — see the [design route](/design) for the pattern.
- **Do not hardcode the site origin.** Use `import.meta.env.BASE_URL` for anything that must
  resolve under the Pages mount.
