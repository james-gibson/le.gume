---
title: It's just a file
description: Rung −1. Not a website with the styling removed — the source file, frontmatter and all, rendered in place.
order: 4
updated: 2026-11-13
tags: seed, satire, files
---

# It's just a file

You are reading the file.

Not a rendering of it with the design removed — the file: the frontmatter, the heading markers, the
prose, in the order it was written. The header has a **file** switch; on this page it is already on.
Every page on this site is one Markdown file, and this rung is the one where you look at the file
instead of the page.

## What this rung claims

**Audience:** someone who wants the source of truth, not a presentation of it.
**Assumes:** nothing, but rewards knowing what a Markdown heading looks like.
**Entrance:** this page, which is a file.

Rung −1 sits below [just a website](/seeds) at rung 0. That ordering is the argument: a buyer wants a
website, and a maintainer wants a file. The website is a rendering choice; the file is the thing you
can diff, copy, grep, and keep when the renderer is gone.

## What "file" mode actually does

The site already loads every page as raw text to build its navigation. File mode stops there and
prints the string instead of parsing it into a document: no headings, no links, no table of contents,
no styles beyond a monospace block.

That is not a degraded page. It is the page with the hosting removed, which is the only honest way to
answer "what is this, really?" — **a text file, in a repository, with a build step that is optional.**

## The files that were never hosted

Below this article, in file mode, are the repository's own documents that never had a page: the
README, the agent hints, the licence, and one working example from an isotope. They are inlined from
the source at build time, not fetched, so what you read is the file that ships.

That is the whole rung: some files are pages, and some files are just files. The distinction is a
renderer, not a truth.

## What it costs

- **Reading.** Markdown is legible raw and tedious raw; frontmatter is not prose.
- **Navigation.** No TOC, no previous/next, no seed panel. You get the file and the browser's back
  button.
- **Presentation, permanently.** A file cannot be made to look like a website without becoming one,
  and this rung refuses the trade.
- **One more toggle.** Every mode that exists has to be switched off again, and the header is
  getting crowded. That is a real cost and it is on the page.

## Where you are

Rung −1 of [the seed scale](/seeds/what-is-a-seed). Above it, rung 0, is
[just a website](/pitch/why-legume) — the same artifact, sold rather than read.
