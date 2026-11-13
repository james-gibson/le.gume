---
title: Agent-ready, checked
description: The site built against AgentReady's find/read/act essentials — what is implemented, what is declined, and which guard check proves each one.
order: 13
updated: 2026-11-13
tags: agents, standards, verification
seeds: agent-operations
---

# Agent-ready, checked

[AgentReady](https://www.agentready.org/) is an open standard for what a site should implement to be
usable by an agent: find it, read it, and — only if there is a task to complete — act through it.
This page maps the site onto that standard, with the check that keeps each claim honest.

## Find

| Practice | Here |
| --- | --- |
| **AR-FIND-01** · MUST · allow agents | `robots.txt` is one wildcard rule, `Allow: /`, with no allowlist of named crawlers and no bot manager in front |
| **AR-FIND-02** · SHOULD · first-party docs | the whole site is first-party docs; there is no other surface |
| **AR-FIND-03** · SHOULD · sitemap | `sitemap.xml`, 68 URLs, generated from the content tree |
| **AR-FIND-04** · MAY · AI catalog | `/.well-known/ai-catalog.json`, linked from the head with `rel="ai-catalog"` |

## Read

| Practice | Here |
| --- | --- |
| **AR-READ-01** · MUST · answer in the initial HTML | every route is prerendered; the shell carries the page markup, and the application replaces it on load |
| **AR-READ-02** · MUST · real status codes | unknown paths get `404.html` with a 404 status; no path returns 200 with a "not found" body |
| **AR-READ-03** · SHOULD · homepage in raw HTML | prerendered, with real links to docs, seeds, factors and the pitch |
| **AR-READ-04** · SHOULD · docs pages that answer | 56 pages, all prerendered, all linked from `llms.txt` |
| **AR-READ-05** · SHOULD · fenced, language-tagged code | every block is fenced and tagged |
| **AR-READ-06** · SHOULD · `.well-known/` | the AI catalog is the only machine file the site needs |
| **AR-READ-07** · SHOULD · `llms.txt` | generated from the content tree, and linked from every page's footer |
| **AR-READ-08** · SHOULD · JSON-LD | one `WebSite` block in the head; its facts are repeated as visible text, because a fact that exists only in a script tag goes unseen |
| **AR-READ-11** · SHOULD · pricing on a first-party page | [/pitch/free](/pitch/free) and [/pitch/cost-centres](/pitch/cost-centres), as text rather than a calculator |

## Act — declined, on the record

**AR-ACT-10** is a MUST only when agents are expected to complete a task. This site has nothing to
transact: no account, no API, no checkout, no action beyond reading. Shipping an MCP server or a CLI
to tick the box would be the empty surface the standard explicitly warns against.

The same applies to WebMCP (no UI to operate) and to payments (nothing to charge for). If the site
ever gains a task, the entry point is the same one agents already use: the repository.

## What the guard checks

The claim on this page is worth what the build enforces. Four checks run on every build:

- `robots.txt` has the wildcard rule and points at the sitemap;
- `sitemap.xml` lists every route, plus the two no-JavaScript artifacts and the deck;
- `/.well-known/ai-catalog.json` parses and lists `llms.txt`;
- every HTML shell carries an `<h1>` in the initial markup — the test that the answer is not
  JavaScript-only.

The last one is the important one. It is the check that would have failed before this page existed.

## What it costs

- **About 1.6 MB of duplicated HTML.** Each of the 64 shells carries its page, so the build is
  roughly 2.9 MB instead of 1.3 MB. That is the price of AR-READ-01, and it is why
  [the deck](/pitch/offline) still matters: one 6.5 KB file with no application behind it.
- **A second rendering path.** `scripts/prerender.tsx` renders every route at build time. It can
  break in ways the client bundle cannot, which is why it fails the build rather than warning.
- **Static markup replaced on load.** The application boots over the prerendered HTML. The content
  is the same; the flash is the cost of not hydrating, and hydrating would cost more than it is
  worth here.

## What is not done

- No MCP server, CLI, WebMCP or NLWeb endpoint — see *act*, above.
- No `429` or `Retry-After` control: GitHub Pages decides throttling, and the site cannot send
  either header. Availability is the host's edge, not a knob here.
- JSON-LD is one `WebSite` block, not per-page structured data. Adding per-page facts would mean
  generating them at build time from frontmatter; it is a `SHOULD` the site does not yet meet.

## The test

The claim is checkable without a browser:

```bash
curl -s https://james-gibson.github.io/le.gume/docs/quickstart/ | grep -c Quickstart
```

A non-zero count means the answer is in the initial HTML. Before the prerender step, it was zero.

The agent contract is [For agents](/docs/for-agents); the machine entry is
[`/llms.txt`](/llms.txt).
