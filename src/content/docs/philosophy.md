---
title: What the web is for
description: The choices this site made, the web capabilities they keep, and the garden that trades those capabilities for retention.
order: 9
updated: 2026-11-13
tags: design, philosophy, values
seeds: starter
---

# What the web is for

The modern web is very good at delivering a page and very bad at letting you keep it. An address,
a file, view-source, print, the back button, copy-paste — the capabilities the web was designed
around are now things a site can quietly remove in exchange for retention. That trade is the
garden, and most of the value the web offers is spent paying for it.

This site is a set of choices against that trade. Not because the garden is evil — it is
measurably better at holding attention — but because a documentation site's job is to be read,
cited and kept, and the garden is bad at all three.

## The garden, precisely

It is not one decision. It is a stack of them, each individually defensible:

- text that only exists after an application boots;
- an account required to read a public page;
- infinite scroll with no stable URL for the paragraph you wanted;
- a canvas where selectable text used to be;
- fonts, scripts and analytics loaded from other origins;
- a cookie wall before the first sentence;
- an interstitial offering an app for the thing you are already reading.

Each one removes a capability and adds a measurement. The reader loses the link, the search, the
print, the copy and the offline copy. The owner loses the ability to move the content anywhere
else. Nobody gets promoted for a page that loads in 200 milliseconds and can be printed, which is
the whole explanation.

## What the web offers, and what this site keeps

| Capability | What it means | Where it is kept here |
| --- | --- | --- |
| An address | every page returns itself on reload, not just on the first click | route shells, one per page |
| The source | view-source works, and the repository is public | AGPL-3.0-only, no build needed to read |
| A file | save it, print it, hand it over | the offline deck, file mode |
| Text | selectable, searchable, translatable | Markdown, never MDX |
| Offline | works with the network off | the deck needs it never; the site needs it once |
| No account | nothing to sign up for | no authentication anywhere |
| No third parties | nothing loads from another origin | no fonts, scripts, images or analytics |
| A way out | take the whole thing and leave | clone, `npm ci`, `npm run dev` |

The last row is the one that matters most. A site you can clone is a site that cannot hold you
hostage, and that is a design decision before it is a licence.

## The choices, and what each costs

A value without a price is decoration. These are the choices, each with the bill:

1. **Content is Markdown.** Buys portability, diffs and a readable source. Costs the rich-text
   editor, and the author who will not use git — [the writing is not the differentiator](/pitch/the-writing-cost).
2. **Navigation is derived.** Buys a nav that cannot drift from the pages. Costs a wrong folder
   being a missing page, discovered at build time.
3. **The guard is a build step.** Buys claims that are checked rather than promised. Costs the
   illusion of speed: a broken link stops a deploy — and it still cannot check whether the prose is
   true.
4. **No runtime services.** Buys the shortest request path there is. Costs search, comments and
   anything that needs a server — [small enough to count](/pitch/attack-surface).
5. **Motion is budgeted by rung.** Buys a page that does not move at a reader who did not ask.
   Costs delight for the readers who would have enjoyed it.
6. **One door for agents.** Buys one stable entry point at every model's skill level. Costs a
   strip on every page — [one door for agents](/docs/agent-cta).
7. **Three factors declined.** Buys a smaller bill. Costs the server-side option — [every factor
   moves the number](/factors/sla-variables).
8. **A demonstration, not a product.** Buys proof instead of claims. Costs you the maintenance,
   because nobody is on call.

## Prior art

Two documents from the early 2000s made the same bet before the garden closed.

[**CSS Zen Garden**](https://csszengarden.com/) (Dave Shea, 2003) was one HTML file and a public
competition: designers restyled the same markup without touching it. It proved that content and
presentation are separable in practice, not just in principle, and that a page can be re-skinned
without a migration. This site makes the same bet one layer down — the Markdown is the file, and the
rendering is a decision. The era toggle, file mode and the deck are three skins over one source.
What it cost: the markup had to be semantic enough to restyle, a discipline most of the web
declined, and a garden of skins is still one document — the content never changed because it was
never the thing being designed.

[**why's (poignant) Guide to Ruby**](https://poignant.guide/book/), by why the lucky stiff (2005), was
a programming book with a voice: cartoons, asides, a plot. It proved that a technical document can
be authored rather than assembled, and that a reader will follow a strange voice further than a
neutral one. It also
demonstrated the failure mode: a voice is a person, the person left in 2009, and the guide survives
because people kept copies. That is the same argument as the file and the licence — the copy
outlives the author, the domain and the maintainer.

What both share with this site: the document is the artefact, and presentation is a separate
decision you can revisit without asking permission. What neither has: a guard. A garden of skins can
be beautiful and wrong; a beloved guide can be charming and out of date. The guard is the part this
site adds, because a document that cannot be checked is a document that will drift — and drift is
the one failure a good voice cannot talk its way out of.

## The tests

Four questions decide whether a change belongs here. They are cheap to run and hard to argue with:

- **Can a stranger take it and run it without asking us?** `git clone`, `npm ci`, `npm run dev`.
- **Does it work with the network off?** The deck and file mode do. The site needs the network once,
  and says so rather than pretending otherwise.
- **Is every claim checkable in the repository?** The guard names each failure it prevents; a claim
  with no check is a slogan.
- **Would the reader notice if it disappeared?** If the copy still works, the site did its job.

## Where this is wrong

- **A feed is a file, not a garden.** An RSS feed is generated at build time from the same content
  tree; this site publishes one at [/feed.xml](/feed.xml) and it lists every page. "The audience
  wants a feed" is a `feed.xml` and a `<link rel="alternate">`, not a reason to leave.
  Personalisation, a login and app-like interaction are still the garden's axes, and still a real
  product decision rather than a moral one.
- **Private content is not a private repository.** The repository can stay public while the artefact
  carrying the private data does not: a release asset, an encrypted bundle, a build that is never
  published. The repo is the method; the artefact is what you hand over. This site does not ship
  one, but the pattern does not require a public copy of the data.
- **"Authors will not use git" has more than one answer.** Buy the CMS, hire writers who will use
  git, or keep the source of truth in a spreadsheet and generate the Markdown at build time. A mail
  merge from a sheet, or Access 2010 against a SQLite export, is not elegant — and it is cheaper
  than a platform. The failure is not "not git"; it is two sources of truth that disagree.

The philosophy is a preference with costs, held because the audience here is readers and agents who
need to cite, copy and keep things. It is not a law about how anyone else should build.

## The value, in one line

The web's value is that a page is a file with an address, and anyone can keep it. Every choice on
this page is in service of that sentence; every garden is a choice against it.

The design system itself, rendered live, is [/design](/design).
