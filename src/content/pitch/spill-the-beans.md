---
title: Let me spill the beans
description: What this project does not do, what it will cost you later, and where it is the wrong answer.
order: 2
updated: 2026-11-11
tags: pricing, limits
seeds: pitch
---

# Let me spill the beans

A pitch that only lists strengths is a brochure. Here is the rest of it.

## What it does not do

- **No search.** At thirteen pages, search is theatre. At two hundred, it is a requirement — and
  you will need a real index, not a client-side `includes()`.
- **No versioning.** There is no `/v2/` tree. If your product ships breaking changes that must be
  documented side by side, this site is a starting point, not a solution.
- **No localisation.** One language, one set of slugs.
- **No CMS.** Writers need git access, or you need to accept that only engineers publish.
- **No MDX.** Live widgets are React routes. That is a deliberate ceiling: content stays
  content.

## What it will cost you

| Cost | Reality |
| --- | --- |
| Maintenance | A handful of files; upgrades are ordinary npm version bumps |
| Hosting | Free for a public repo; a build minute or two per push |
| Custom domain | Certificate and DNS, standard Pages setup |
| Your time | Roughly an afternoon to make it yours, then the writing |

The hidden cost is the same as any doc site: **writing**. No framework has ever shipped a
sentence.

## Where it is the wrong answer

- You need **versioned docs** for a plugin ecosystem.
- You need **multi-author publishing without git**.
- You need **localised** content in five languages.
- You need **thousands of pages** with search, cross-references and generated API surfaces.

In those cases, buy the mature thing. The sunk cost of writing it yourself is not the problem;
the maintenance is.

## What the guard does not protect you from

- Prose that is wrong but plausible.
- A page that describes a feature you removed last week.
- A link to a private document that is technically public but should not be.
- **Contrast after the page renders.** `DOOM-014` is the rule that would catch text which passes in
  RGB and fails once a renderer snaps it to a palette. It needs a browser to compute, so the build
  checks only the pairs somebody declared in `src/lib/palette.json`; a gradient, a hover state and a
  pair nobody listed stay unmeasured until an audit runs.
- **Focus order, keyboard traps and how a screen reader pronounces a name.** The accessibility pass
  reads the DOM; it cannot press Tab.
- **Whether an alt text describes the image**, only that one exists.

It checks the build, not the truth. The only control for truth is the `updated` field and the
person who edits it — and the three gates it does run are listed in
[Recaptured from accessibility](/docs/accessible-recapture), [Runs in Doom](/docs/doom-renderable)
and [Ivory, dimmed](/docs/palette), each with what it cannot see.

## The offer, plainly

Take the seed, keep the four files that matter, delete the rest. If in a year you have replaced
every component but kept the guard and the derived navigation, it did its job — and you owe
nothing, because you already own it.
