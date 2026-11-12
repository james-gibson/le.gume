---
title: What an isotope is
description: The smallest working system that demonstrates one pattern completely — and why "smallest" is the hard part.
order: 1
updated: 2026-11-12
tags: isotopes, format
seeds: isotopes
---

# What an isotope is

An **MVP isotope** is a minimal viable system built to prove one thing by running, not by arguing.
It is the smallest version that still does the whole job: it builds, it ships, and it can be lifted
into another project without a rewrite.

The name is deliberate. An isotope is a specific, identifiable form of something — the same element,
a particular configuration, a measurable signature. Two systems built to the same pattern should be
recognisably the same isotope, the way two samples of the same element are.

## The pickle spec

Isotopes are named after pickles — pickled onions and gherkins — and never numbered. A name is an
identity; a position is a coincidence.

| Name | The thing | What it suits |
| --- | --- | --- |
| `silverskin` | a whole small onion, pickled in one piece | self-contained systems you lift whole |
| `cornichon` | a small gherkin, picked often | small recurring checks |
| `pearl` | a round pickling onion | a single primitive, nested in others |
| `piccalilli` | mixed, chopped, brined | a composite of several parts |

Three rules keep the shelf usable:

1. **Never renumber.** The name is in URLs, in QR codes and in prompts. An ordinal breaks when
   something is inserted above it; a name does not.
2. **Pick the shape, not the flavour.** The pickle should describe the system: whole, small,
   nested, mixed. A name that misleads is worse than a dull one.
3. **A published name is permanent.** Retire an isotope by removing its page, never by reusing the
   name for something else — someone's QR code still points at it.

## Two numbers, not one

An isotope carries a **cost centre** and a **profit function**, and the page format exists to keep
them attached to each other.

- The cost centre is the "what it costs" section: the standing obligation — upgrades, certificates,
  a dictionary to prune, an owner — required to keep it alive.
- The profit function is the system itself: what it lets a person stop doing by hand.

A cost with no function is an expense; a function with no cost is a fantasy. Naming both is what
makes a system liftable, and what makes it re-decidable when the cost crosses a threshold
([the business version of that argument](/pitch/cost-centres)).

## Similar, self-standing, self-declaring

Three properties do the work, and none of them is about technology:

- **Similar.** Same page shape, same vocabulary — *proves, parts, costs, take, break*. Similarity is
  about form, so two isotopes can be laid side by side. It says nothing about the stack underneath.
- **Self-standing.** It runs on its own. No dependency on the rest of the collection, no shared
  runtime, no "install the others first". Lift it and it works.
- **Self-declaring.** It announces its presumptions: the runtime, the platform, the permissions, the
  era. This is the one people skip, and it is the one that makes the other two worth anything.

## The same service, twenty years apart

A web service is a stable shape across eras. What it *presumes* is not.

| Launch era | Usual stack | What the service presumes | What that changes |
| --- | --- | --- | --- |
| Late 1990s | CGI / Perl, a process per request | filesystem permissions, no framework, string-built HTML | request flooding is cheap; injection arrives through concatenation |
| Late 2000s | PHP / mod_php, shared interpreter | session files, includes, a plugin ecosystem | session fixation, include paths, a supply chain you did not write |
| Late 2010s | Node / JavaScript | an event loop, a package tree, JSON on the wire | prototype pollution, dependency drift, parser and regex denial of service |
| Mid 2020s | Rust / Go binaries | memory safety, no runtime, explicit dependencies | fewer memory classes, but TLS, certificates, config and registry supply chain remain |

Same user story in every row. Same request. A security assessment that does not know which row it is
looking at is not an assessment — it is a guess with a confident tone.

That is why an isotope declares its presumptions in frontmatter, next to its slots:

```yaml
slots: repo, dict, every
presumes: github-actions, node-22, cspell-8, issues-write
```

The line is not a security audit. It is what makes one possible: you cannot assess an attack against
a system whose era and assumptions you had to guess. Two isotopes are comparable when their
presumptions are written down; otherwise you are comparing vibes.

The build enforces the line on every isotope page, and `/llms.txt` repeats it next to the slots, so a
machine can compare two isotopes without opening either page.

## What makes something an isotope

Four tests, in order. Fail one and it is a demo, a snippet or a sketch — all useful, none liftable.

1. **It runs.** There is a live URL or a single command. Not a screenshot, not a branch.
2. **It ships.** The path from source to public is one command, and it is checked.
3. **It is minimal.** Every part earns its place; nothing is there because a tutorial included it.
4. **It is liftable.** The parts are separable, and the costs are written down, so you can take
   three of them or all of them.

## The page format

Every isotope page answers the same questions in the same order, so two of them can be compared:

> **What it proves** · **The parts** · **What it costs** · **Take this, not that** ·
> **What would break it**

The middle two are the ones that do the work. "What it costs" is where a demo becomes a decision;
"take this, not that" is where a pattern stops being a religion.

## Why minimum, and why viable

- **Minimum** because anything more is a product, and a product is not a lesson. A lesson you cannot
  finish reading is a lesson nobody learns.
- **Viable** because a fragment that cannot ship teaches a shape without its consequences. The
  consequences — the deploy, the guard, the empty state, the rollback — are the curriculum.

## Compounds — isotopes with slots

Some isotopes cannot be applied without decisions only you can make: which repository, which
dictionary, how often. Those pages declare **slots** instead of pretending there is one right
answer.

A slot is a question with a name. The page lists them, the agent asks them, and the shortcut below
carries the answers that are already known.

## Shortcuts — a QR that expands into the compound

An isotope page is long on purpose; a QR code is small on purpose. The bridge is a **shortcut**: the
isotope's address plus whatever slots are already bound.

```text
https://james-gibson.github.io/le.gume/isotopes/cornichon/?every=weekly
```

An empty value is a question still to ask. Given the line above, the agent should fetch the page,
read the *Agent prompt*, and ask about `repo` and `dict` — then write the job. No resolver service,
no database: the URL is the whole protocol, and the page is the expansion.

That is why the molar mass of the code matters: a compact address beats a paragraph of instructions,
and a paragraph of instructions beats a code nobody can scan. The shortcut is the compromise —
short enough to scan, complete after one fetch.

## What an isotope is not

- **Not a template.** A template is copied before you understand it. An isotope is read first.
- **Not a framework.** Frameworks make decisions for you; an isotope shows you the decisions.
- **Not a benchmark.** "Fast" without a budget is marketing. The cost line is the benchmark.

## The collection

Two so far. [Silverskin](/isotopes/silverskin) is the site you are reading: whole, self-contained,
the base of the plate. [Cornichon](/isotopes/cornichon) is the first compound — a small recurring
check with three slots.

Each new isotope is one page and one name from the shelf. Each page is derived from something that
actually runs — the same rule the rest of this site follows, applied to the catalogue itself.
