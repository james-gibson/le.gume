---
title: No stylesheet
description: Rung −2. No CSS at all — not a reset, not a stripped theme — just the browser's defaults and the words.
order: 3
updated: 2026-11-12
tags: seed, satire, no-css
---

# No stylesheet

The entrance is [`/bare/`](/bare/) — one HTML file, no `<style>` element, no `<link>` to a
stylesheet, not a single `style` attribute.

Rung −2: one above [It's just a file](/seeds/just-a-file), which gives up the page as well. This one
keeps the document and gives up the design system.

## What this rung claims

**Audience:** someone who wants to read, and would rather the page did not have opinions.
**Assumes:** a browser with its default stylesheet still installed.
**Entrance:** [`/bare/`](/bare/), which is the whole seed.

## What it demonstrates

- **The user agent has been doing this since 1993.** Headings, paragraphs, lists, links, code,
  tables, and sensible margins around all of them. That is not nothing; it is most of typography.
- **A surprising amount of "design" is preference.** Serif or sans, 14px or 18px, a 46rem measure
  or a full window — the browser picks defaults that are legible, and the argument for replacing
  them starts to look like taste wearing the word "craft".
- **A page with no CSS is a page.** It is under 3 KB, it arrives in one request, and it will render
  in anything that has ever parsed HTML.

## What it costs

- **Contrast and hierarchy.** Colour, weight and spacing were doing real work; without them,
  structure comes from the markup alone. That is a test of the writing, not a free lunch.
- **No dark mode.** The page is whatever your browser thinks a document is.
- **No responsive measure.** Lines are as long as the window, which is the one default worth
  overriding and the thing this rung specifically refuses to.
- **Duplication, again.** Hand-written HTML outside the content model, so it is missing from the
  navigation, the search-free index, and `llms.txt`.

## Why it exists

Because the previous rung cheated. HTML 2.0 mode is a CSS reset — it uses the very layer it claims
to remove. This page does not; it simply never asks for the stylesheet. The difference between
"styled to look unstyled" and "unstyled" is the difference between a costume and a body.

## Where you are

Rung −2 of [the seed scale](/seeds/what-is-a-seed). One rung lower,
[No script](/seeds/no-script), removes the application instead of the design.
