---
title: 4. Backing services
description: A database, a mail sender, a queue — treat each as a plug you can pull, not a part welded to the code.
order: 5
updated: 2026-11-12
tags: factor, services
seeds: twelve-factors
---

# 4. Backing services

> Anything the program talks to over the network is a service. Swap it by changing an address, not code.

## The idea

A database, a mail provider, an image store, a payment API: from the program's point of view these
are all the same shape — something reachable at an address that answers requests. "Treat them as
attached resources" means the program should not care whether the database is on your laptop or in
a data centre. It has an address; it connects; it works or it does not.

The practical test: could you point the same build at a different provider without editing a source
file? If not, the service is welded in.

## A picture

```text
app  ──address──▶  service (local)      dev
app  ──address──▶  service (managed)    production
```

Same app, different address. The address is configuration (factor 3), which is why these two
factors are usually taught together.

## What it buys

- Development against a cheap local service, production against a managed one.
- A provider can be replaced during an outage, or after a price rise, without a rewrite.
- Testing can point at a disposable copy instead of the real thing.

## What it costs

- **Abstraction layers.** Wrapping every service in "so we can swap it" code is itself work, and
  the swap rarely happens.
- **The bill.** Managed services cost money monthly, and "pluggable" tempts you to add more of
  them.
- **Latency and failure.** Every service is a new way for the program to be slow or broken.

## Skip it when

The program has no services — a static site, a command-line tool, a document. Then the factor is
not weakly satisfied; it is **out of scope**. Say that plainly instead of building an abstraction
over nothing. It is also reasonable to skip when a provider *is* the product; you will not be
swapping Stripe out on a Tuesday.

## Where this site stands

**Out of scope.** There is no database, no queue, no cache and no API at runtime. The search index
that covers this content is built offline by the vault that publishes it; the site never asks it
anything. If this site ever grows a comment form, this page will need a rewrite rather than a
footnote.

## Exercise

Take any app you use and ask: *what are its addresses?* Login, payments, images, email. Then ask
which of those you could repoint today, and which would require a developer. The second list is
your welding.

Next: [5. Build, release, run](/factors/build-release-run)
