---
title: What a seed is
description: An audience, an assumption and an entrance — the difference between a folder of pages and something you can hand to someone.
order: 1
updated: 2026-11-12
tags: seeds, format
---

# What a seed is

A seed is a body of knowledge with three things stated before the first paragraph: **who it is for**,
**what it assumes**, and **where it starts**. Everything else is a pile of pages; a seed is a pile
with a door.

The reason to bother is that this site has several audiences, and they do not share a vocabulary.
Someone learning what a deploy is, someone approving the invoice, and an agent executing a build
need different pages, different assumptions and different openings. One linear documentation tree
serves the first of those and wastes the time of the other two.

## The three fields

| Field | The question it answers | Why it is not optional |
| --- | --- | --- |
| Audience | Who is this written for? | A page for everyone is a page for no one |
| Assumes | What must they already know? | "Nothing" is a valid answer, and a useful one |
| Entrance | Where do they start? | A shelf without a door is a pile |

The page you are on is the index. Each seed below has its own page with the same three fields at the
top, rendered from `src/lib/seeds.ts`, so the claim and the content sit together.

## Shared and separate

Some seeds overlap. **Agent operations** and **The starter** both need the site's anatomy; the
factors seed is deliberately separate from the commercial case, because a decision-maker and a
beginner are not served by the same first paragraph.

That overlap is modelled, not described: every page declares the seeds it belongs to in frontmatter.

```yaml
seeds: starter, agent-operations
```

A page can declare several, and the seed pages list exactly the pages that declare them. Adding a
page to a seed is one line; removing it is one line; a seed cannot claim a page that does not claim
it back, and the guard checks that every declared seed exists.

## A seed is not a tag

Tags describe a page. A seed describes a **person**: who they are, what they know, and where they
walk in. If you cannot name the person, you have a folder, not a seed.

## A seed is not an isotope

An isotope is a system you lift — files that run. A seed is knowledge you hand over — pages that
teach. They compose: the isotopes seed contains two isotopes, and the starter seed contains the
pattern one of them is built from.

## Sharing a seed

Each seed page carries a QR code that opens **the entrance**, not the shelf. Whoever scans it lands
at the start of that audience's path, with the audience and the assumptions already in front of
them. That is the whole sharing mechanism: no account, no bundle, no email gate.

If you are lifting a seed into another site, copy its member pages and their `seeds:` lines, add the
registry entry, and let the build re-derive the list. The next two sections are about lifting and
teaching respectively; the rest of this page set is the shelf itself.
