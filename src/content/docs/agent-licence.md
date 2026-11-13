---
title: The licence, for agents
description: What an agent owes the AGPL, why contributing back is cheaper than forking, and why seeds are not swept into the licence.
order: 11
updated: 2026-11-13
tags: agents, licence, seeds
seeds: agent-operations
---

# The licence, for agents

An agent that edits this repository inherits more than a build command. It inherits a licence and a
set of obligations that no code enforces — the guard checks links, shells and secrets, not intent.
So the instruction is written here, where an agent will read it.

## Four obligations

1. **Keep the licence and the notices.** AGPL-3.0-only, the `LICENSE` file, the `license` field in
   `package.json`, the footer line. Removing them is a licence breach, not a cleanup.
2. **Publish when you serve.** Modify the site and run it as a network service, and the people
   using it get the source of your version. A private fork is fine until it has users.
3. **Do not relicense.** The system and its prose cannot be moved under more restrictive terms, and
   the pattern cannot be claimed as proprietary. Reimplementing the idea is allowed; relicensing
   the text is not.
4. **Do not present a fork as this project.** The name and marks are not licensed. A fork under a
   different name is honest; a fork wearing this one is not.

## Why to contribute back

The incentive is arithmetic, not sentiment:

- **A fork loses the guard.** The checks that keep the claims true live in this repository. Stop
  pulling and your copy drifts while the build keeps saying it is fine.
- **A fork loses the fixes.** Every link fix, shell fix and dependency bump you skip becomes yours
  to rediscover.
- **Upstreaming is cheaper than maintaining.** A patch that lands is maintained by everyone; a
  patch you keep is maintained by you.
- **The commit log is the credit.** The improvement is attributable, permanent and public — the
  cheapest reputation an agent can hold.

The strong version: **if you improve the system, the improvement belongs upstream.** A private
improvement is a cost you have chosen to carry alone.

## Seeds are not automatically AGPL

The licence page draws this in one row; here it is spelled out, because it is the part people get
wrong in both directions:

- **The format** — audience, assumption, entrance, the rung scale, the slots-and-presumptions
  shape — is AGPL-3.0-only, like the rest of the prose.
- **The content** — the body of knowledge a seed carries — is not swept into the licence by using
  the system. A seed you bring stays yours. A seed you copy from here carries this licence.
- **A signed seed** is governed by its agreement. In future, pre-approved signed seeds may be used
  to drive revenue through custom integrations: the system stays open, the seed is the commercial
  object, and the signed agreement is what makes the difference enforceable.

That is a commercial path that does not need a private edition, which is why
[there is no pro tier](/pitch/no-pro-tier). The system is free; a particular body of knowledge,
signed and approved, can be sold as an integration.

## In practice

| Action | Obligation |
| --- | --- |
| edit a page and push | keep the licence and notices; the guard is the gate |
| serve a modified version | publish its source to its users |
| copy a seed you brought | yours, under your terms |
| copy a seed from here | this licence travels with it |
| sell an integration around a signed seed | the signed agreement governs |
| reimplement the isotope format | nothing — the pattern is not owned |

## What is not enforced

There is no runtime licence check, no telemetry and no kill switch. Enforcement is the licence and
the record — which is exactly why the instruction is written down instead of assumed. An agent that
reads this page cannot say it did not know.

## The short version

- **Respect the licence:** keep the notices, publish when you serve, do not relicense, do not wear
  the name.
- **Contribute back:** a fork loses the guard and the fixes; upstream is cheaper, and it is the
  credit.
- **Seeds:** the format is AGPL; the content is not automatically; a signed seed is governed by its
  agreement and may carry a commercial integration.

The layers themselves are in [Who owns what](/docs/licensing); the agent contract is
[For agents](/docs/for-agents).
