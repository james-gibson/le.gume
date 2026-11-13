---
title: Manuals that ship on a stick
description: A service technician, a machine, and no Wi-Fi. le.gume is a static manual that fits on removable media — and a quarterly update walked in on a stick is a reasonable channel, not a joke.
order: 12
updated: 2026-11-13
tags: pitch, offline, manuals
seeds: pitch
---

# Manuals that ship on a stick

The floppy pages are a joke about dead media. This one is the serious version of the same idea:
**an offline product manual**, delivered as files, updated by hand.

The reader is a service technician standing at a machine with a manual, a laptop and no network. The
manual has to be complete, current enough to be safe, openable without an account, and copyable to
whatever the technician already carries.

## What le.gume already gives that audience

- **One folder of files.** No server, no login, no session, no CDN dependency at read time.
- **A dated artefact.** The build prints its date and short commit in the deck footer; the page
  carries an `updated` field. A manual that says when it was true is a manual you can trust on a
  site visit.
- **A guard before it ships.** The same build that publishes the site refuses placeholders, broken
  links, a leaked home path and a page that never reached the bundle. That check runs on the
  technician's machine too, offline, before the stick is written.
- **Small enough to copy.** About 3 MB for the whole site — two floppies by the unit this project
  uses, a rounding error on any stick, and small enough to email when the stick is lost.
- **Readable without JavaScript.** Every route is prerendered, so the manual opens in whatever
  browser the laptop has, including the one that has not been updated since the machine was
  installed.

## Why physical updates are reasonable

The instinct is that sneakernet is a legacy embarrassment. For manuals it is often the correct
channel:

- **The line is air-gapped.** A plant network, a ship, a mine, a hospital basement. The manual cannot
  be fetched because nothing is fetched.
- **The cadence is quarterly, not continuous.** A manual changes when the machine or the procedure
  changes. That is a scheduled walk, not a feed.
- **A stick is cheaper than a link.** One USB drive per site, per revision, is a line item a service
  manager can approve without a procurement cycle.
- **A file is auditable in a way a portal is not.** The revision is a commit, the date is printed,
  and the copy in the drawer is the copy that was handed over. A portal shows whatever is live.

The floppy is the unit, and for genuinely old equipment it is still the medium. The whole site does
not fit on one — it is two — but a single product manual, or the deck, does.

## The process

1. Build the manual from its own content tree; the guard is the gate.
2. Copy the built folder to the stick.
3. Open it **from the stick**, not from the machine that built it. The failure this catches is the
   one where the file only works where it was written.
4. Check the printed date and commit against the revision you meant to ship.
5. Hand it over. Write down who has which revision.

Steps 3 and 4 are the whole discipline. Everything else is `cp`.

## What it costs

- **No telemetry.** You will never know whether the manual was opened, which page was read, or
  whether the technician used the old copy in the van. That is the same absence the site has
  everywhere, and here it is a real operational gap.
- **Version skew is manual.** Two sticks, two revisions, one machine. The dated footer is the only
  defence, and it only works if someone reads it.
- **No revocation.** A copied manual cannot be recalled. For safety-critical documentation that is a
  liability, not a feature: a superseded warning stays in circulation because it is a file. If the
  content must be revocable, this is the wrong channel and the honest answer is a managed system.
- **One build per product.** The site is a starter, not a product-manual factory. Each manual is a
  copy with its own content, its own revision history and its own guard run.

## What it is not

- Not a CMS: writers use git, or they send you a document.
- Not a sync protocol: there is no "latest" to resolve, only copies with dates.
- Not an expiry mechanism: a manual that stops opening is worse than one that is out of date.
- Not a replacement for a controlled-document system where the regulation requires one.

## The clarification

The floppy teasing is not a claim that physical media is coming back. It is the unit that makes size
legible, and for offline manuals the same arithmetic is the point: if the manual is a few megabytes,
it can be carried, copied and checked by a person. If it needs a server, it cannot.

What "offline" means here, and what the browser's storage can and cannot hold, is
[the floppy is a joke, the storage is not](/pitch/local-storage). The artefact itself is
[the deck](/pitch/offline).
