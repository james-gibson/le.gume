---
title: 9. Disposability
description: Any copy can be killed at any moment, and starting one should be quick.
order: 10
updated: 2026-11-12
tags: factor, reliability
---

# 9. Disposability

> Copies start fast and stop without damage. Being killed is normal, not an emergency.

## The idea

In a system that runs many copies (factor 8), copies come and go constantly: a deploy replaces
them, a machine fails, traffic moves. Disposability means designing for that — a copy should be
ready in seconds, and it should finish or abandon its current work cleanly when asked to stop.

"Gracefully" in practice means: stop accepting new work, finish what is in flight within a time
limit, then exit. The failure this prevents is a deploy that drops a payment midway because the
process was killed without a warning.

## A picture

```text
start:  ready in ~1s, not ~60s       (fast builds, no giant warm-up)
stop:   signal → drain in-flight → exit
        not: signal → killed → half-written record
```

## What it buys

- Deploys without downtime: old copies drain while new ones take traffic.
- Crashes are survivable, which makes them less frightening and more frequent-but-cheap.
- You can move work between machines without a maintenance window.

## What it costs

- **Shutdown code**, which is unglamorous and usually untested until it matters.
- **Idempotency.** If a job can be retried after an abrupt stop, the retry must not double-charge.
- **A time budget.** Draining too long blocks a deploy; too short drops work.

## Skip it when

Losing the work is cheap. A nightly report that can be rerun, a preview build, a personal script —
these can be killed at will with no ceremony. The honest version of skipping is writing "rerun if
it dies" in the runbook, not pretending the risk does not exist.

## Where this site stands

**Applied.** The build takes well under a second, the output is disposable files, and a deploy
replaces them atomically. There is no in-flight work to lose: a visitor either gets the old file or
the new one, never half of each.

## Exercise

Kill a process you own while it is working. Note what survives, what is half-written, and what a
retry would do. That note is the entire factor 9 backlog.

Next: [10. Dev/prod parity](/factors/dev-prod-parity)
