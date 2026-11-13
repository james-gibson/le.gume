---
title: The rainbow mutes
description: The motion budget follows a page's seeds, not its URL shape. The hero CTA ignored that rule, and the fix is one derivation and one word.
order: 16
updated: 2026-11-13
tags: design, motion, accessibility
seeds: starter
---

# The rainbow mutes

The motion budget is set by the rung: 0–1 **still**, 2–3 **calm**, 4 **full**, with reduced-motion
pinning everything to still and a stored override in the header. Every ambient component is supposed
to go through `useMotion()`. One did not, and the front door is where it showed.

## What went wrong

The budget was derived from the URL: a page counted only if it lived under `/seeds/<id>`. Every
other route — the home page, the pitch, the docs — fell through to `full`.

So `/`, which is the front door for every rung including 0, handed a rung-0 reader a rainbow button
that never stopped moving. The pitch pages did the same. The rule was written down and the
derivation quietly contradicted it, which is the failure mode a rule has when nothing tests it.

The label made it worse. "Read the quickstart" is a sentence where the destination is one word away
from the verb.

## The fix

- The budget now comes from the page's own `seeds:` frontmatter, taking the **lowest** rung when a
  page belongs to several — a shared page is safe for its most cautious audience.
- The home page, section indexes and the 404 have no seed, so they get `calm` rather than `full`:
  reveals and tickers, no ambient loops.
- `/design` stays `full`. The catalogue exists to show motion; a silent catalogue is a screenshot
  with extra steps.
- The rainbow and gradient buttons exist only in `full`. `calm` and `still` get plain buttons, which
  is what a reader who asked for less should have received all along.
- The CTA reads **Go**, with "read the quickstart" as screen-reader text. Short for the eye,
  unambiguous for assistive technology, and one less word in a hero that already says where it goes.

## What it costs

- **Frontmatter now has a second job.** A wrong `seeds:` line is a motion bug as well as a navigation
  bug: it puts a page on the wrong rung for both.
- **Two branches per ambient component.** Every effect needs a calm rendering, and the design
  catalogue has to show both — otherwise the still version is the one nobody looks at.
- **Nothing enforces it.** The guard reads the build, not React. There is no test that fails when a
  component animates outside its budget; the only controls are `/design` and a reader noticing.

## The check

Set the header to **Still** and load `/`. The hero must not animate, and the CTA must be a plain
button. Set it back to **Full** and the rainbow returns. If both states look the same, the page is
ignoring the budget again.

The ladder that sets the default is [What is a seed](/seeds/what-is-a-seed); the components and the
props they actually use are [/design](/design).
