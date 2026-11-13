---
title: Start here
description: What the twelve factors are, why following them blindly wastes money, and how to read one lesson at a time.
order: 1
updated: 2026-11-12
tags: factors, teaching
seeds: twelve-factors
---

# Start here

If you have never deployed software, "the twelve-factor app" sounds like an exam. It is not. It is
twelve rules of thumb, written in 2011, about how to build a program that other people can run
without you. Each one is a trade, not a commandment.

Read these pages in any order. Every lesson is the same shape, so you can find the part you need:

> **The idea** · **A picture** · **What it buys** · **What it costs** · **Skip it when** ·
> **Where this site stands** · **A small exercise**

## The words you need

| Word | What it actually means |
| --- | --- |
| Repository (repo) | A folder with a diary. Every change is recorded, so you can go back. |
| Deploy | Copy the finished program somewhere other people can reach it. |
| Build | Turn the source files into the files that get copied. |
| Environment | One place the program runs: your laptop, a test server, the public one. |
| Service | Something the program talks to over the network: a database, an email sender, a payment API. |
| State | Anything the program must remember between one visitor and the next (an order, a session). |
| Static site | A program that is just files. Nothing runs per visitor. This site is one. |

## Why the list is a menu, not a checklist

The twelve factors were written for one kind of thing: a long-running web application, built by a
team, operated by someone who is not the author. Apply them outside that shape and you buy
infrastructure you do not need. That is where the money goes.

Three examples, all defensible:

- A **portfolio site** has no database, no sessions and no servers. Factors 4, 6, 7 and 8 describe
  things it does not have. Following them "properly" means renting a server to serve files a CDN
  gives away.
- An **internal tool for four people** gains little from factor 10's dev/prod parity: there is one
  environment, and it is the tool.
- A **data pipeline** that runs nightly cares about factor 9 (disposability) much less than about
  cost per row; a lost run is a rerun, not an incident.

The factors also differ by *who is affected*. A public site's mistakes are visible to strangers; an
internal tool's are visible to colleagues; a personal script's are visible to nobody. The tolerance
for each factor tracks that audience, not the rule.

## The question to ask of every factor

> "What breaks if I ignore this, and who notices?"

If the answer is *nothing, and nobody*, skip it — and write down that you skipped it, so the next
person does not mistake the omission for an oversight. That single habit is worth more than
compliance with all twelve.

## How each lesson ends

Every page finishes with **where this site stands**: applied, declined, or applied with a caveat.
This site declines three factors on the record — 4, 7 and 8 are declared out of scope — and the
lessons that apply say what the application cost. A rule you cannot afford is not a rule; it is a
bill. [Twelve is a bill](/pitch/twelve-is-a-bill) prices the full set and uses this site as the
receipt.

## The lessons

1. [Codebase](/factors/codebase) · 2. [Dependencies](/factors/dependencies) · 3. [Config](/factors/config) ·
4. [Backing services](/factors/backing-services) · 5. [Build, release, run](/factors/build-release-run) ·
6. [Processes](/factors/processes) · 7. [Port binding](/factors/port-binding) ·
8. [Concurrency](/factors/concurrency) · 9. [Disposability](/factors/disposability) ·
10. [Dev/prod parity](/factors/dev-prod-parity) · 11. [Logs](/factors/logs) ·
12. [Admin processes](/factors/admin-processes)
