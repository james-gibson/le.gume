---
title: Acting through a shortcut
description: An isotope quick copy is a URL with its parameters bound. It may be the act surface AR-ACT-10 asks for — or it may be a third shape the standard has not named.
order: 14
updated: 2026-11-13
tags: agents, isotopes, standards
seeds: agent-operations
---

# Acting through a shortcut

AgentReady's **AR-ACT-10** is a MUST: a product agents are expected to act on must expose at least
one interface an agent can act through — an MCP server or a CLI. This site declined it, because
there was nothing to transact.

Then the isotopes got quick copies, and the decline became a question worth answering in public.

## What a quick copy is

```text
/isotopes/cornichon/?every=weekly
```

That is the isotope page with one slot already decided. The QR code encodes the same URL; a person
scans it, an agent fetches it. Three properties follow from that:

- **the URL is the interface** — no install, no account, no session, no handshake;
- **the page is the expansion** — a procedure, with the parameters bound and the rest left as
  questions the agent has to ask before running anything;
- **the payload is public** — the shortcut resolves without a service, which is why it survives the
  site being offline.

## Does that satisfy AR-ACT-10?

Two answers, and the difference matters:

- **Literally, no.** The spec names two shapes — an MCP server or a CLI — and a URL is neither. On a
  strict reading the site still fails the MUST.
- **By the standard's own test — "can an agent finish the task?" — yes, for the tasks the isotopes
  describe.** The agent reads the shortcut, gets the steps, asks the unbound slots, and runs the
  procedure with its own tools. Nothing is left for the site to execute.

A shortcut is a **third shape**: a fetchable procedure. It is not in the spec's list because the
spec was written for products that do things on a server. This one does things by being read.

## What it does that an MCP server does not

- **Nothing to host.** The interface is a static file and a query string; there is no process to
  keep alive, patch or scale.
- **Nothing to authenticate.** The payload is public, so the first gate of acting — auth an agent
  can finish — is already open.
- **Nothing to version.** The URL is the version. A changed procedure is a changed page, and the
  old one still resolves if it was published.
- **One artefact, three readers.** A browser, a terminal and a chat client all use the same URL, and
  a person can scan it.

## What it does not do

- **No discovery.** An agent has to be handed the URL or find it in [`/llms.txt`](/llms.txt); there
  is no tool list to enumerate.
- **No typed results.** The output is prose and Markdown, not a JSON schema with operation IDs.
- **No execution.** The agent runs the steps. The site cannot act on its behalf, and cannot confirm
  that it did.
- **No session.** Anything that needs a login, a private resource or a payment is out of scope.

## Why not ship an MCP server anyway

Because it would be the empty surface the standard warns about, and it would import the costs this
site declines elsewhere:

- a host, a process and a socket — factors 4, 6 and 7, declined
  ([and priced](/pitch/twelve-is-a-bill));
- auth in front of a surface with nothing private behind it;
- a second contract to keep true, for a capability the shortcut already covers.

If the site ever needs a real tool surface, the honest build is one tool that expands a shortcut —
`isotope(name, slots)` — fetching the page and returning the steps. That is a small server, and it
should be built when there is a task it can finish that reading cannot.

## The classification, on the record

| Test | Result |
| --- | --- |
| AR-ACT-10 as written (MCP server or CLI) | **not met** |
| The standard's intent (an agent can complete the task) | **met for isotope procedures** |
| A capability the agent calls | **absent** — the shortcut is a procedure the agent runs |

That is a better answer than a tick: it says which part of the requirement is satisfied, which part
is not, and why the difference is a design choice rather than an omission.

## The test

```bash
curl -s 'https://james-gibson.github.io/le.gume/isotopes/cornichon/?every=weekly' | grep -c cornichon
```

The page comes back with the slot bound. That is the interface: a fetch, not a call.

What an isotope is, and what the slots mean, is [the format](/isotopes/what-is-an-isotope). The
standard mapping is [Agent-ready, checked](/docs/agent-ready).
