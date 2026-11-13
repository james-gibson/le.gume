---
title: The floppy is a joke; the storage is not
description: The site teases dead media because the medium it actually plans to use is the browser's — localStorage today, IndexedDB and Cache Storage next, and none of it is a thing you can put in a box.
order: 11
updated: 2026-11-13
tags: pitch, storage, offline
seeds: pitch
---

# The floppy is a joke; the storage is not

[The deck page](/pitch/offline) counts the site in floppies, which is a joke about a medium nobody
uses. The medium that replaced it is not a box of anything. It is the browser's storage, it belongs
to a profile rather than a person, and this site already keeps things in it.

## What is stored today

Three keys in `localStorage`, all preferences:

- `legume.motion` — the Still / Calm / Full override;
- `legume.era` — the HTML 2.0 toggle;
- `legume.fileview` — whether the page renders as a file.

They are written on the reader's machine, never sent anywhere, and they exist because a preference
that resets on navigation is not a preference. Under European rules local storage is treated like a
cookie; the site has no banner because there is nothing to track and no third party to share it with
— [and that is a legal position, not a legal opinion](/pitch/missing-isotopes).

## What the plan is

The same APIs, used for content instead of settings:

| API | What it would hold | Why |
| --- | --- | --- |
| `localStorage` | preferences, small flags | synchronous, 5 MB per origin, good for strings |
| IndexedDB | the pages, the deck, the search index if one ever exists | asynchronous, quota measured in hundreds of MB, structured data |
| Cache Storage (service worker) | the built files, so a reload works offline | the only way to answer a navigation without the network |
| File System Access | export to a real folder | a save that outlives the browser, where the browser allows it |

The shape is: one visit fetches the site, the cache keeps it, and the next visit is local. The floppy
is the unit; the cache is the implementation.

## The arithmetic

- A floppy held **1.44 MB**. The built site is about **3 MB** — two floppies, as the deck says.
- `localStorage` holds about **5 MB** per origin, as strings, synchronously. It is not where 3 MB of
  HTML goes.
- IndexedDB quotas are a share of free disk, browser-dependent, and evictable. A few hundred MB is
  the honest planning number; a guarantee is not on offer.
- A USB stick is thousands of floppies and fits in a pocket. A browser profile is not portable at
  all: it is tied to one browser, one profile, one origin.

## What local storage is not

- **Durable.** The browser can evict it under storage pressure. "Persistent" is a request, not a
  promise, and it is granted per origin by policy.
- **Portable.** Clearing site data deletes it; a different browser is a different store; a different
  profile is a different store.
- **Yours.** It is the browser vendor's implementation on your disk, with their eviction rules and
  their quota.
- **Private.** It is not encrypted by the site, and it is readable by anything running on the origin.

## What it costs

- **A cache is a bug surface.** A stale service worker serves yesterday's page and the guard cannot
  see it: the build is green, the reader is wrong. Cache invalidation is the price of offline.
- **A second storage model to reason about.** Preferences are forgiving; content is not. A page
  cached at one commit and a page fetched at another is a site that disagrees with itself.
- **A claim with a failure mode.** "Works offline" is true until the quota, the eviction or the
  cache version says otherwise, and the reader discovers it at the worst moment.
- **No banner is a decision, not an accident.** Adding content storage keeps the same position only
  while the storage stays local and untracked; the day it syncs, the consent question arrives.

## The status, stated

This is a plan, not a shipped feature. Today the site stores preferences and nothing else; the deck
is still a file you copy to a stick yourself, and the site still needs the network once.

The order of work, if it happens: preferences (done), then the deck in IndexedDB behind an explicit
"keep a copy" action, then Cache Storage for offline reloads — each one a visible change with its
own failure mode, not a switch flipped in a service worker.

The unit stays the floppy because it is the only storage measurement a reader can hold. The medium
is the browser's, and the honest version of "local" is: local to this profile, on this machine,
until something clears it.
