---
title: 6. Processes
description: Run the program as something that can be restarted at any moment, with nothing precious in memory.
order: 7
updated: 2026-11-12
tags: factor, state
seeds: twelve-factors
---

# 6. Processes

> The running program keeps nothing important in its own memory. Anything remembered lives elsewhere.

## The idea

A "process" is one running copy of the program. A stateless process can be killed and started again
without losing anything, because whatever must persist — a cart, a session, an upload — is written
somewhere else: a database, a file store, a cookie in the visitor's browser.

The distinction is *where the memory lives*. A program that remembers in its own head is a program
that dies with its head.

## A picture

```text
stateless:   visitor → process → reads/writes the store → reply
             (kill the process; the store still has everything)

stateful:    visitor → process [remembers in memory] → reply
             (kill the process; the memory is gone)
```

## What it buys

- Restart, crash, redeploy: the visitor notices a slower request, not a lost order.
- Scale by starting more copies, each one identical.
- No "sticky" routing — any copy can serve any request.

## What it costs

- **A store to run and pay for.** The database is now load-bearing, with backups and latency.
- **Round trips.** Reading state from elsewhere is slower than reading it from memory.
- **Design discipline.** Caching in memory is a legitimate optimisation, but it becomes wrong the
  moment it is treated as the only copy.

## Skip it when

The program is for one person on one machine — a notes app, a local script, a game save. A static
site is trivially stateless (there is no process to hold anything), so the factor is satisfied by
architecture rather than effort.

## Where this site stands

**Applied by construction.** The output is files. Every visitor gets a file read from a CDN, and
there is no memory between requests because there is no process. This is the cheap end of the
market and it is worth noticing: not having state is cheaper than managing it well.

## Exercise

Name three things a shopping site must remember between two page loads. Then name where each one
lives. If any answer is "in the server's memory", that is the part that disappears when a deploy
restarts the server.

Next: [7. Port binding](/factors/port-binding)
