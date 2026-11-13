---
title: Recaptured from accessibility
description: The build knows what went in. The test ignores that, reads the built HTML the way assistive technology would, and fails when the two disagree.
order: 17
updated: 2026-11-13
tags: accessibility, testing, build
seeds: agent-operations
---

# Recaptured from accessibility

The build knows what it wrote: every page has a title in frontmatter, a heading order, an alt for
each image that has one. So the test throws that knowledge away. It reads the built HTML the way a
screen reader would — the document title, the landmarks, the heading outline, the accessible name of
every link and button — then compares the recapture with the source.

A mismatch means the page is not saying what it was written to say, and that is a build failure, not
a review note.

## The rules

| Rule | Severity | What it recaptures |
| --- | --- | --- |
| `A11Y-001` | critical | `<html lang>` exists |
| `A11Y-002` | critical | the `<title>` names the page, and matches the frontmatter title |
| `A11Y-003` | critical | a `<main>` landmark exists |
| `A11Y-004` | critical | exactly one `<h1>` |
| `A11Y-005` | high | the heading outline does not skip a level |
| `A11Y-006` | high | every `<img>` has `alt` |
| `A11Y-007` | high | every link has an accessible name |
| `A11Y-008` | high | every button has an accessible name |
| `A11Y-009` | medium | no `id` is used twice |
| `A11Y-010` | medium | no focusable element is `aria-hidden` |

`A11Y-002` is the recapture proper. The test does not check that a title exists; it checks that the
title in the built file contains the title the build read from frontmatter. A page whose document
title is the site name — which is what an effect that runs after paint produces — fails, because the
accessible name of the page is wrong even though the page looks right.

## What it found on the first run

**120 findings**, all of them real:

- **Every page shipped the same `<title>`.** `usePageMeta` set `document.title` in an effect, which
  runs after paint and not at all in a prerender. So the initial HTML said "le.gume — the hard parts,
  already handled" on all sixty-odd routes.
- **Every content page had two `<h1>`s.** The article header renders the title, and the Markdown body
  opens with `# Title`, which the renderer turned into a second one. Two `h1`s is an outline that
  starts twice.
- **Three files had no `<main>`**: the two no-JavaScript artifacts and the deck. They are hand-built
  or generated outside React, which is exactly why they were the ones nobody checked.

## The fixes

- `postbuild` writes each shell's `<title>` from the same frontmatter it already reads for
  `llms.txt`. One source, two consumers.
- `DocPage` strips the body's leading `# Title` before rendering, because the header already said it.
- `public/nojs/`, `public/bare/` and the generated deck wrap their content in `<main>`.

The run is now **READABLE · 100/100**, and the check is part of `npm run build`.

## What it cannot see

Static analysis reads files, not a person. Four things need a browser and are printed as
unverifiable on every run:

- **Contrast.** The doom pass measures it after palette snapping; this one does not measure it at all.
- **Focus order and keyboard traps.** The DOM order is checkable; what the browser does with it is not.
- **Screen-reader pronunciation.** An accessible name can be present and still be read badly.
- **Whether the alt text describes the image**, only that one exists.

## What it costs

- **A second consumer of frontmatter.** Titles now come from `postbuild` as well as React, so a title
  changed in one place must reach both. It does, because both read the same file.
- **A rule for every convention.** Each new pattern — an icon-only button, a decorative image — needs
  the accessible name or the empty `alt` that keeps the run green.
- **A score that can flatter.** 100/100 means ten structural rules pass. It does not mean the site is
  accessible; it means the recapture matches the source.

## Run it

```bash
npm run a11y                          # the gate, as the build runs it
node scripts/a11y.mjs dist --verbose  # every rule and its count
```

The renderability gate next to it is [Runs in Doom](/docs/doom-renderable); the agent-facing reading
of the same build is [Agent-ready, checked](/docs/agent-ready).
