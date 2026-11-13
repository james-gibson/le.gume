---
title: Custody
description: For the archivist who takes the site into a collection and the maintainer who inherits it — how to direct an update, and how to put it in cold storage without losing the means to check it.
order: 20
updated: 2026-11-13
tags: archive, maintenance, handover
seeds: starter
---

# Custody

Two people will read this page and nobody else: an **archivist** deciding whether this is worth
keeping, and a **maintainer** who inherited it. Both need the same thing — the smallest set of
instructions that survives the author leaving — and both should get it in writing rather than in a
conversation that ends when the account does.

## Two modes, and they are different

**Direct an update.** You have the repository, a machine with Node, and the authority to publish.
Rebuild at a commit, run the guard, ship `dist/`. The gate is the same one CI runs; if it refuses,
nothing was published and the old copy is still the good one.

**Cold storage.** You are freezing an artefact, not running a service. You need the built output and
the means to check it later, not a build environment. A frozen site that needs `npm install` to be
readable is not frozen.

Most custodians need the second. Decide which one you are before you touch anything.

## What to freeze

In this order, because each one is useless without the one above it:

1. **The repository**, as a bundle: `git bundle create legume.bundle --all`. It carries the history,
   the content, the scripts and the licence in one file.
2. **The built site** — `dist/`, exactly as published. This is the artefact that opens from a disk
   without Node, and it is the thing an archivist is actually preserving.
3. **The deck** — `deck.html`, one file, no script, which prints and opens anywhere.
4. **The machine files** — `llms.txt`, `sitemap.xml`, `feed.xml`, `rules.md`. They are small, and
   they are what a future reader or agent uses to understand the site without crawling it.
5. **A checksum manifest** — `sha256sum` over the above, so a copy can be proven to be the copy.
6. **The version** — the commit the artefact was built from, which the deck footer and `rules.md`
   both print.

## How to check it later

- Open `deck.html` from the frozen folder. It must render with no network.
- Open any page with JavaScript disabled. The `<h1>` and the body text must be in the HTML.
- Compare the deck footer's date and commit with the manifest.
- If Node exists, `npm ci && npm run guard` against the built output; a clean guard means the
  artefact still satisfies the checks it shipped with.

If those four pass, the copy is readable and identifiable. Nothing else about it is promised.

## Directing an update

The smallest viable instruction, for a maintainer with the repository and the account:

```bash
git checkout <commit>
npm ci
npm run build        # the guard is the gate; it refuses rather than warns
# publish dist/ to the same host, or copy it to the collection
```

If the account is gone, the repository is still the method: fork it under a different name, publish
it wherever you control, and say that it is a fork of this seed. The licence requires the source to
stay available; it does not require the original URL to keep working.

If the change is a correction to a page, the smallest edit is one file in `src/content`. If the
change is a rule, it belongs in [the rules file](/rules.md) or in
[an upstream isotope](/docs/upstream-isotopes) — not in a private note that dies with the fork.

## What the system cannot do for you

- **Recall a copy.** A frozen site cannot be revoked. If a page is wrong in a way that matters
  legally or medically, cold storage is the wrong medium and a controlled system is the right one.
- **Expire.** There is no kill switch, no licence check, no phone-home. A copy that opens today
  opens in ten years, whether or not that is convenient.
- **Preserve the dependencies.** The build needs npm and a network. The artefact does not. Freeze
  the artefact; keep the lockfile for the rebuild.
- **Guarantee the host.** Pages, the domain and the certificate are somebody else's service. The
  artefact is yours; the URL is rented.

## The checklist

- [ ] Which mode am I in — update or storage?
- [ ] Bundle, `dist/`, deck, machine files, manifest, commit.
- [ ] Opened the deck offline; opened a page with JavaScript off.
- [ ] Checked the date and commit against the manifest.
- [ ] Written down who holds the account, or that nobody does.

The offline manual case — a technician, a machine, a stick — is the same discipline with a different
reader: [Manuals that ship on a stick](/pitch/offline-manuals). The licence that makes custody
possible at all is [Who owns what](/docs/licensing).
