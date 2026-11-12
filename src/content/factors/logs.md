---
title: 11. Logs
description: A log is a stream of events, not a file to rotate — write to the output and let the platform keep it.
order: 12
updated: 2026-11-12
tags: factor, logs
seeds: twelve-factors
---

# 11. Logs

> The program writes events out as they happen. It does not manage files, retention or rotation.

## The idea

A log answers "what happened at 14:03?". Traditional programs wrote that into files on the same
machine, which meant someone had to rotate, compress, delete and back them up — and if the machine
died, so did the evidence.

Treating logs as an **event stream** separates the two jobs: the program emits; the platform
collects. The program writes to standard output, the host ships it somewhere durable, and retention
becomes a policy rather than a cron job.

## A picture

```text
program  ──stdout──▶  collector  ──▶  searchable store (retention: 30 days)
                                     (survives the machine)
```

## What it buys

- Evidence survives a crash, because it left the machine before the crash.
- One place to search across copies and deploys.
- No rotation scripts, no full disks at 3am.

## What it costs

- **Storage bills.** Retention is a dial with a price; "keep everything forever" is a line item.
- **Structure.** Unstructured logs are cheap to write and expensive to read. Some discipline
  (consistent fields, one event per line) pays for itself the first time you search.
- **Privacy.** Logs leak. A token or an email address in a log is a leak with a retention period.

## Skip it when

The program is a local tool whose output a human reads on the spot — a build script, a converter.
It is also legitimate to write to a file when an audit demands an immutable local record; say so
explicitly rather than drifting into file management by accident.

## Where this site stands

**Applied in the only place it can be.** There is no long-running program to log from: the site is
files. The build and the publish guard emit one line per named check, and CI keeps the transcript.
Nothing writes a log file, and the guard refuses output containing a credential — which is the
retention problem solved by never collecting the secret in the first place.

## Exercise

Search your logs for a string you would not want public — an email, a token, a full request body.
Finding one is the cheapest security review you will do this week. If you cannot search your logs,
that is the finding.

Next: [12. Admin processes](/factors/admin-processes)
