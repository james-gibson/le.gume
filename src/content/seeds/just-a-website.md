---
title: It's just a website
description: Rung −1. No framework, no build, no decisions — a page is a document, and this one is rendered as HTML 2.0 to prove it.
order: 4
updated: 2026-11-12
tags: seed, satire, html
---

# It's just a website

You are reading this page in HTML 2.0. Nothing below the header did that to you on purpose: this
seed is the only page on the site that renders itself with the modern layer removed, and you walked
into it.

Here is the implementation, in full:

```css
/* unset everything, then let the browser's own stylesheet show through */
html[data-era='1996'] * {
  all: unset;
  display: revert;
  font-family: "Times New Roman", serif;
  background: transparent;
  border: 0;
}
```

That is the whole trick, and it is a reset in the opposite direction. Every layout decision this
site makes — the grid, the radii, the beam of light, the marquee, the counting numbers — is one
stylesheet rule away from not existing. The content is not.

## What this rung claims

**Audience:** someone who wants a web page, not a system.
**Assumes:** nothing. Including an interest in this page.
**Entrance:** this page, which is the entire seed.

It sits at rung −1 because the scale measures readiness, and the least ready reader is the one who
never asked for a rung. They asked for a website. This is one. It weighs a document, it loads in one
request, and it will render in a browser that has not been updated since the first web boom.

## What it teaches, despite itself

- **Every layer above this is optional.** The proof is above your cursor: the same pages, the same
  links, the same words, no framework. If the site needed the framework to be *legible*, the
  framework was doing the writing.
- **The browser has been doing this since 1993.** Headings, paragraphs, lists, links, preformatted
  text, tables. A document that uses them is already accessible, already searchable by whatever
  crawls it, already printable.
- **A page that survives a reset was documentation all along.** A page that does not was a demo
  wearing a layout.

## What it costs

- Everything you were about to argue for: search, dark mode, motion, the design system, the QR
  handoff, the seed scale itself. None of them are here, and none of them are load-bearing for the
  sentence you just read.
- Nothing, in money. This mode is a stylesheet rule and a stored preference, not a second site.
- Your patience, if you are the rung-4 reader who came here to feel superior. The toggle in the
  header says `2026` — the modern layer is one click away, which is also part of the joke.

## Why it exists

Because the rest of this shelf is an argument that structure is worth its cost, and an argument
nobody tests is a belief. The cheapest test of "is this documentation?" is to take the structure
away and see whether anything readable remains.

If it does not survive, the dehydration was the work.

## Where you are

You are on rung −1 of [the seed scale](/seeds/what-is-a-seed), rendered in 1996, on a site whose
header offers to take you back to 2026. The site is not embarrassed; it is checking.
