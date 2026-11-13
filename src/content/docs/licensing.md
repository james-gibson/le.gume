---
title: Who owns what
description: The system is AGPL-3.0-only; the prose that ships with it — factors, guides, gherkin isotopes, seed design — is under the same licence; content you publish with it stays yours.
order: 10
updated: 2026-11-13
tags: licence, agpl, reference
seeds: starter
---

# Who owns what

There are two layers here and they have different answers. Confusing them is the usual mistake:
people assume a licence on the software reaches the words, or that a licence on the words reaches
the software.

| Layer | Licence | What it means |
| --- | --- | --- |
| The application: `src/`, `scripts/`, the workflows, the build | **AGPL-3.0-only** | run it, modify it, redistribute it; publish your source if you serve a modified version |
| The prose that ships with it: factors, guides, gherkin isotopes, seed design, docs, pitch | **AGPL-3.0-only** | quote it, adapt it, republish it — under the same licence |
| The isotope format: slots, presumptions, pickle names, shortcut URLs | **AGPL-3.0-only** as text | reimplement the pattern freely; the words are licensed, the idea is not owned |
| Content **you** publish with the system | **yours**, per author | the system claims nothing over your words |
| Third-party material quoted in a page | **the original terms** | prior terms win for that material |

## The system is AGPL v3

The repository's `LICENSE` is the GNU Affero General Public License, version 3, and
`package.json` declares `AGPL-3.0-only`. The practical terms:

- **Run it** for anything, including commercially, at no charge.
- **Modify it** and keep the changes to yourself — until you serve it to other people over a
  network. Then the source of your version goes to those users. That network clause is the whole
  difference between AGPL and GPL, and it exists because a documentation site is exactly the thing
  someone would host as a service and quietly stop sharing.

## The prose is under the same licence

The pages are part of the distribution, so they carry the same terms. That includes:

- the **factors** copy — the twelve lessons and the hub;
- the **guides** — seeding a project, adding a page, shipping it;
- the **gherkin isotopes** — cornichon, silverskin and the rest, including their slots and
  presumptions;
- the **seed design** — audience, assumption, entrance, and the rung scale they sit on.

You may quote a page, adapt it, translate it, or lift the whole section into your own site. Keep
the licence and the source available, and it is yours to use.

The distinction that matters: the **text** is licensed, the **pattern** is not owned. Reimplementing
a slots-and-presumptions format from scratch is not a licence question at all.

## Content you publish with it stays yours

If you clone the system and publish your own notes, your words are yours. A text editor's licence
does not reach the novel written in it, and this is the same separation: the AGPL covers the
software and the pages that ship with it, not the content you put in afterwards.

Licensing your content the same way is allowed, encouraged if you want the same guarantees, and
never required. Your site, your call, your byline.

## Unless prior terms apply

Where material arrives with its own licence, those terms govern it:

- a document you quote from a vendor or a standard;
- a company's prior agreement with its authors;
- an earlier licence on a text you are copying in;
- anything with a copyright line that is not this project's.

The AGPL is the **default for what this repository authors**, not a claim over what it quotes. When
the two meet, the prior terms win for that material, and the page should say so.

Trademarks are separate again. The licence grants no rights to the name or the marks, in either
direction.

## In practice

| You want to | What you need |
| --- | --- |
| read, cite or link a page | nothing |
| copy the system for your own site | keep the licence and the source available |
| serve a modified version | publish the source of your version to its users |
| publish your own content with it | your licence, your choice |
| reimplement the isotope format | nothing — the pattern is not owned |
| use the project's name or marks | ask; the licence does not grant them |

## What this page is

It is the repository's reading of its own `LICENSE`, written down so the answer is one page instead
of an email. It is not legal advice, and a lawyer's version would be longer and cost more.

The cost of leaving it unsaid is the same as any unclear licence: someone assumes the wrong layer,
and the correction arrives as a letter.

## The short version

- **System:** AGPL-3.0-only. Use it, change it; share the source if you serve it.
- **Prose:** the factors, guides, gherkin isotopes and seed design are under the same licence.
- **Your content:** yours, per author. The system does not claim it.
- **Prior terms:** they win where they exist. The AGPL covers what this repository wrote.

What "free" means here, including where it stops, is [Free, twice](/pitch/free). What the licence
buys you in practice is a copy you cannot lose — [What the web is for](/docs/philosophy).
