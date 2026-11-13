---
title: No script
description: Rung −3. The page is a file; the application never loads. It is the strongest claim this site can make about itself.
order: 2
updated: 2026-11-12
tags: seed, satire, no-js
---

# No script

The entrance is [`/nojs/`](/nojs/) — a single HTML file with inline CSS and no
`<script>` element anywhere in it.

Rung −3, because the scale measures how much of the machine a reader is willing to touch, and this
reader is willing to touch none of it: no bundle, no hydration, no client-side router. What arrives
is what was sent.

## What this rung claims

**Audience:** someone who wants the words, and has JavaScript off on purpose.
**Assumes:** a browser, and no patience for hydration.
**Entrance:** [`/nojs/`](/nojs/), which is the whole seed.

## What it demonstrates

- **The document was the program.** Every paragraph on the site is text; the application is how it
  gets arranged. Remove the arrangement and the text is still there, in reading order.
- **What an SPA looks like with the script removed.** The main site renders a title and an empty
  box; this page renders itself. Both are honest — one about its architecture, the other about its
  content.
- **"Works without JavaScript" is a property, not an aspiration.** You can check it with
  `curl`, with reader mode, with a text browser, or by turning JavaScript off for a minute.

## What it costs

- **Every link is a request.** No instant route changes, no preserved scroll position.
- **No state that survives navigation**, because there is no application to hold it.
- **Duplication.** This page is hand-written HTML, not a route in the content model, so it does not
  appear in the navigation it argues about.
- **The joke ages.** Every time the site gains an interaction, this page becomes a slightly
  stronger argument and a slightly worse neighbour.

## Why it exists

Because the site's claim is that documentation is a document, and a document should not require a
virtual machine to be read. The claim is cheap to make in a paragraph and impossible to fake in a
file: either the `<script>` tag is there or it is not.

## A note on the shelf

This rung is hidden from [the seed scale](/seeds) by a script. That is not a bug report; it is the
argument wearing its own costume. With JavaScript off, the row would be visible — and so would
nothing else, because the page listing the rungs is drawn by the script that removed the row.

## Where you are

Rung −3 of [the seed scale](/seeds/what-is-a-seed). Below this there is nothing but a text file,
which is presumably a rung too, and someone will ask for it.
