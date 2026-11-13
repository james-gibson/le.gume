---
title: It fits on a stick
description: The pitch as one file — no script, no network, sized for a USB drive and a literal file box.
order: 4
updated: 2026-11-13
tags: pitch, offline, deck
seeds: pitch
---

# It fits on a stick

A pitch deck that is a file. One HTML document, no script, no network, no build step on the
reader's machine. Copy it to a USB stick, hand it over, and it opens by double-click.

The same page you are reading is the source of the deck. The build splits it on the rules below
into slides and writes `dist/deck.html`, so the file in the box and the page on the site cannot
disagree on purpose.

---

## The problem with a link

A pitch that needs the internet is a pitch that needs a room with Wi-Fi, a laptop that trusts the
network, a host that is still up, and a browser that will run someone else's JavaScript.

That is four dependencies for one argument. Any of them failing is a meeting where the slide deck
does not open and the meeting becomes about the slide deck.

---

## What the deck is

- One file. No JavaScript, no fonts to fetch, no images to resolve.
- Opens from `file://` by double-click, on a machine that has never seen this project.
- Prints to PDF without a plugin, one slide per page.
- Generated at build time, with the date and the commit printed in the footer.
- Licensed AGPL-3.0-only, because the file encodes an argument about ownership.

---

## What the whole site weighs

The built site is about 2.9 MB across 81 files at the time of writing, most of it the prerendered
HTML that puts each page's answer in its initial response. In the unit this site uses for sizes:
**two floppies**, and a sliver.

The deck itself is 7.7 KB — half a percent of a floppy, the size of an email attachment nobody has
to think about. A project that cannot fit on a stick has a dependency the stick just exposed.

---

## The floppy, as a unit

A 3.5-inch floppy held 1.44 MB, which is not much and was once everything. It is a useful reference
because it is physical: you have held one, you know how big it is, and you can tell whether a thing
fits without trusting a table of prefixes.

- the deck: 7.7 KB — 0.005 of a floppy
- a page of this site: about 25 KB — 0.02
- the whole site: 2.9 MB — 2.0

Read the count as satire or as a budget; the arithmetic does not care. Two floppies is a joke about
the web's current weight, and it is also a number you can hold up against a claim. The site went
from one floppy to two when it started shipping each page's answer in its HTML — the cost of being
readable without JavaScript, made visible because the count moved.

What the unit is not: a distribution medium. Nobody ships a site on floppies, and a USB stick is a
thousand of them. It is a reference, kept because "2.9 MB" is a number nobody has an intuition for
and "two floppies" is one everybody does.

---

## What you keep

- The argument, in one artefact, in the order it should be read.
- A dated commit: the file says when it was true.
- Print, search-in-page, and the browser's zoom, which is all a room needs.
- Nothing to install, and nothing to revoke.

---

## What you give up

- Updates. The file is frozen at a commit; a wrong slide stays wrong until someone rebuilds.
- Navigation beyond scrolling. Seven slides is the useful limit, and this deck is at it.
- Analytics. You will never know whether the file was opened, which is either liberating or a
  missing cost centre.
- Links that survive the print. On paper, a URL is a label, not a destination.

---

## Before you hand it over

- Run the build; the footer prints the date and the short commit. Check both.
- Read the byte count. If it grew past a stick's worth, the deck stopped being a file.
- Open it once from the stick, not from your laptop. The failure this prevents is the one where
  the file only works where it was written.
- Say which side of the argument is frozen. A deck is a claim with a timestamp, not a live system.

---

## What it costs

- A second rendering path to keep true. It is derived from this page, but it is still code that
  can break.
- A file that cannot answer a question asked after it was built. That is the trade: portable in
  space, fixed in time.
- No telemetry, so no idea whether the effort worked. The site has the same absence, for the same
  reason.

---

## Build it

```bash
npm run build          # writes dist/deck.html alongside the site
ls -la dist/deck.html  # the number to check before copying
cp dist/deck.html /Volumes/YOUR_STICK/
```

---

## What it is not

Not a replacement for the site. It is the argument in a form you can leave behind — in a drawer,
in a folder, in a box of files, in a room with no Wi-Fi and no reason to trust it.
