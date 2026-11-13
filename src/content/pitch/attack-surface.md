---
title: Small enough to count
description: No server, no database, no accounts, no cookies, no third-party scripts. The security claim fits on one page, which is the point.
order: 7
updated: 2026-11-13
tags: pitch, security, limits
seeds: pitch
---

# Small enough to count

A security claim is only useful if you can enumerate it. "Enterprise-grade" cannot be checked by
the person buying it; a list of things that are not there can be. This one fits on a page.

## The inventory

| Component | Here | What it would cost to secure |
| --- | --- | --- |
| Server process | none — static files on a CDN | a patching cadence, a runtime, an on-call rota |
| Database | none | access control, backups, a leak to disclose |
| Accounts, sessions, passwords | none | reset flows, MFA, lockout policy |
| Forms and upload endpoints | none | input validation, rate limits, spam |
| Cookies | none | consent, scope, expiry |
| Third-party runtime scripts | none | a vendor's breach becomes yours |
| Runtime network requests | none after load | an egress rule to monitor |
| Secrets in the bundle | none | rotation, and the day one leaks |
| Runtime dependencies | seven, compiled into the build | a lockfile, advisories, rebuilds |

The seven packages are React, the router, a Markdown renderer, a QR encoder, and the component
library. They are bundled at build time; the published artefact ships no `node_modules` and fetches
no package at run time. Three `localStorage` keys hold preferences — motion, era, file view — and
none of them is identity or is sent anywhere.

The shell's `<head>` carries one external URL — its own canonical link. The prose links to GitHub;
nothing else does, and the build loads nothing from either. That is checkable: `grep` the output.

## The surface that remains

Small is not zero. What is left is worth naming, because it is what you are actually buying.

**The deploy identity.** The crown jewel is the GitHub account and its token. Whoever holds it can
publish anything to that URL, and no amount of static hosting prevents it. The workflow runs with
the least it can: `contents: read`, `pages: write`, `id-token: write`, and nothing else. Protect
the account; the site is exactly as trustworthy as the person who can push to it.

**The supply chain at build time.** Seven runtime packages, seven development ones, and their
transitive tree. A compromised release ships to every reader, because there is no server to patch
afterwards — the fix is a rebuild and a deploy. The lockfile and `npm ci` are the control; reading
advisories is the habit.

**The content pipeline.** Markdown is rendered without raw HTML, so a page cannot inject script
through the content. It can still be wrong, which is a different problem and not a security one.

**The host and the domain.** Their availability, their certificate, their takedown process, their
terms.

**The reader's browser.** The application executes JavaScript in the reader's tab. A dependency
compromise runs there, and it is the one place this architecture cannot protect.

**No CSP header.** Pages serves static files and lets you set almost no response headers. A
`Content-Security-Policy` would be a genuine improvement; without a proxy or a different host, this
site cannot send one. That is a cost of the free tier, stated rather than implied.

## What it is not

- **Not zero.** Small is a count, not a boast. The remaining surface is above.
- **Not a security review.** No penetration test, no threat model beyond this page, no
  certification. The claim is about components, not about being audited.
- **Not confidentiality.** The repository is public and AGPL-3.0-only: every word, every commit,
  every deleted line in history. A secret committed once is public permanently, forks included.
  That is the same property that makes the licence work, and it cuts both ways.

## What it costs

- **Attention on one identity** instead of a fleet of components. That is a smaller job, not a
  free one.
- **No analytics**, so no incident detection from traffic patterns. You find out when someone
  tells you.
- **Rebuild to patch.** A dependency advisory is a commit, a build and a deploy — minutes, not a
  maintenance window.
- **A flood is availability, not data.** Nothing to exfiltrate under load, and nothing to scale
  either; the host's edge decides.

## When this stops being true

Each of these adds a surface that has to be secured, and each is a normal thing to want:

- **comments** — accounts, spam, moderation, storage;
- **search** — an index, a query endpoint, or a third-party script;
- **a contact form** — validation, rate limiting, a mail provider;
- **analytics** — a third-party script with access to every reader;
- **a CMS** — authentication, uploads, permissions.

The pitch is not that this stack stays small forever. It is that today's surface fits on one page
and one person can hold it — and that when a feature adds a surface, the cost is visible before
the invoice arrives.

## The claim, in one line

No server, no database, no accounts, no cookies, no third-party scripts, no runtime network
requests, and one deploy identity to protect. The rest is supply chain, which every stack has.

What "free" means here, including where the freedom stops, is [Free, twice](/pitch/free). What the
stack deliberately does not do is [Let me spill the beans](/pitch/spill-the-beans).
