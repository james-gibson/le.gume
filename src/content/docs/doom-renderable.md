---
title: Runs in Doom
description: A build-time conformance test against a 320×200, 256-colour renderer — what must survive the paint, what is waived on the record, and what the pass cannot see.
order: 15
updated: 2026-11-13
tags: portability, testing, build
seeds: agent-operations
---

# Runs in Doom

The lowest renderer this site can plausibly be asked to run on is one 320×200 frame, eight bits per
pixel, 256 colours, 32 light levels, no alpha compositing and no anti-aliasing. That is not a
nostalgia gimmick: it is the shape of a reader-mode scrape, a print stylesheet, a link unfurl, a
screenshot in a ticket, an e-ink device, and a text-mode browser.

`scripts/doomlint.mjs` tests the built output against that frame and **fails the build** on
survivability findings. It is not a warnings-only lint: an element either survives the paint or it
does not.

## What gates the build

| Rule | Severity | What it measures here |
| --- | --- | --- |
| `DOOM-030` | critical | every HTML shell carries an `<h1>` and at least 120 characters of text with no JavaScript |
| `DOOM-001` | critical | no cross-origin `src` or `url()` in markup or CSS — the tainted-canvas model omits it, silently |
| `DOOM-003` | high | no `<canvas>`, `<video>`, `<object>` or `<embed>` in flow |
| `DOOM-032` | high | every `<img>` has an `alt` attribute |

`DOOM-030` is the one that earns the test its keep. It is a regression check on
[the prerender](/docs/agent-ready): if a route ever ships its content only through the bundle again,
the build stops here rather than in a reader-mode scrape.

## What is waived, on the record

The design system is the site, and it loses these in a palettised frame on purpose. A waiver is a
decision with a reason, kept in `.doomignore` and reported on every run:

| Rule | Why it is accepted |
| --- | --- |
| `DOOM-002` | dark mode is the design, not an accident |
| `DOOM-004` | backdrop blur on the sticky header |
| `DOOM-005` | blend modes in the motion effects |
| `DOOM-006` | sticky header and fixed overlays |
| `DOOM-011` | gradients in the hero and section rules |
| `DOOM-013` | alpha colours are how the palette works |
| `DOOM-020` | border-radius on every surface |
| `DOOM-023` | motion is transform-based, budgeted by rung |
| `DOOM-040` | two families: sans and mono |

Without the waivers the site scores **NUKAGE** — most of the frame is decoration a 256-colour
renderer cannot draw. With them the score is the part that can be defended, and the waived list is
what stops "we passed" from meaning "we hid the evidence".

One advisory finding is deliberately left unwaived: `DOOM-025`, a font size below the 10px glyph
grid. It is cosmetic and it does not gate, but it is real, and waiving it would make the run look
cleaner than the page is.

## The score

```text
penalty(rule) = min(count(rule) × weight, cap)
score         = clamp(100 − Σ penalty, 0, 100)
```

Weights: critical 10 (cap 30), high 5 (20), medium 2.5 (10), low 1 (5). Badges: 95+ **RUNS IN
DOOM**, 80–94 **RUNS IN DOOM (hurt)**, 60–79 **NUKAGE**, below 60 **DOES NOT RUN**.

At the time of writing the run is **98/100 — RUNS IN DOOM**, with one advisory and sixteen waived
findings.

## What it cannot see

The static pass reads files; it does not paint a frame. Four things need a browser and are printed
as unverifiable on every run rather than guessed at:

- **Contrast after palette snapping** (`DOOM-014`). This is the rule that would make the test
  authoritative: two colours far apart in RGB can land on neighbouring palette entries and lose
  most of their ratio. It needs computed styles and a real palette.
- **320px overflow** (`DOOM-024`) — the width of an element after layout.
- **Pseudo-element content** (`DOOM-031`) — whether `::before` is carrying words that exist nowhere
  else.
- **Reading order** in a complex grid.

A dynamic pass would need Playwright and a Chromium in CI. That is a real dependency, and this site
declines dependencies it cannot justify; the static pass is the gate, and the gap is named.

## What it costs

- **A second linter to keep true.** `.doomignore` can hide rot: a waiver added for a good reason
  stays after the reason is gone. Each one is written with its reason, and the run always lists
  them.
- **A badge that can flatter.** 98/100 is a statement about four rules, not about the site. The
  number is only worth the list under it.
- **A judgement call per finding.** "Would not paint" and "would look crunchy" are different, and
  the severity split is the only thing keeping them apart.

## Run it

```bash
npm run doom                        # the gate, as the build runs it
node scripts/doomlint.mjs dist --verbose   # every rule, every waiver
```

`--fail-on high` is what the build uses. Raising it to `critical` would let a broken image or a live
canvas through; lowering it to `medium` would fail on the design system's own gradients.

What the standard underneath is, and why the site is readable without JavaScript, is
[Agent-ready, checked](/docs/agent-ready).
