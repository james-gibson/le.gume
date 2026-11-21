---
title: There is no pro tier
description: The open-source version is the professional version. A pro tier would sell a compliance checklist, hold basic internet specs hostage and turn a working site into a false choice — not peace.
order: 10
updated: 2026-11-21
tags: pitch, licence, trust, sales, compliance
seeds: pitch
---

# There is no pro tier

Most open-source projects with a business model end up shipping two things: the version you can
have, and the version that works. This project ships one. The repository is the product, the
published site is the same code, and the guard that checks it runs in the same build everyone can
read.

That is not generosity. A second edition costs a second build, a feature-flag layer, a licence
check, and a support conversation about which side of the wall a bug is on. For a site this size,
the wall would cost more than the features behind it.

## What a paid tier usually sells

| Capability | The usual upsell | Here |
| --- | --- | --- |
| Single sign-on, accounts | enterprise | absent, because there are no accounts |
| Role-based access | enterprise | absent — git permissions are the roles |
| Audit history | enterprise | the public commit log, for everyone |
| Advanced search | pro | absent at this size ([and priced](/pitch/missing-isotopes)) |
| A hosted version | cloud | your own free static host |
| Priority support | pro | issues, best effort, no rota |
| An SLA | enterprise | none published ([and none implied](/factors/sla-variables)) |

Read the third column carefully: none of those are withheld. Several are **declined**, which is a
different thing. The absence is the same absence for every user, including the person who wrote it.

## What a pro tier would actually sell

The table above is generous to the idea. Most "pro" tiers do not sell a capability the free
version lacks; they sell a document that says the buyer is allowed to stop worrying.

- **A compliance checklist.** Single sign-on, audit retention, a data-processing agreement, a
  subprocessor list, a security questionnaire with the right boxes ticked. The artifact is real.
  The safety is often the artifact.
- **Basic internet specs as hostages.** TLS, HTTP, accessible HTML, deep links, security headers,
  a working 404, logs that name the observed peer. None of these is advanced. A tier that withholds
  them to make the paid edition look complete is not selling an upgrade; it is creating the
  deficiency it then charges to remove.
- **Increased liabilities.** An SLA, a support rota, an uptime number, a promise to patch by
  Friday. Every one is a liability the lab would have to carry and the buyer would have to
  enforce. A pro tier looks like certainty; the invoice is a promise someone else must keep.

## What the buyer wants is peace

Not a dashboard. Not a badge. Peace is the absence of traps: no surprise invoice, no lock-in, no
security regression between editions, no renewal negotiation, no audit finding caused by the
version you were allowed to have. A pro tier usually sells the opposite — another relationship to
manage, another contract to renew, another place where the free edition was made worse so the paid
one could be better.

That is why there is no pro tier here. The free edition is the professional edition because the
thing a pro buyer wants would be peace, and peace is not a feature flag.

## A pro tier is a false choice

It asks the buyer to choose before the work is known: pay now for the cheaper edition, or pay
later when the free edition runs out. Will the documentation be complete enough? Will the first
mistake be recoverable? Is the pro price a discount for trust, or a penalty for needing help? None
of those is a product question. They are pricing questions, answered by the person with the least
information at the worst possible time.

What a user wants is simpler: a working site, and an update six months later that does not cost an
arm and a child. A pro tier is often a bet that the later update will be expensive enough to make
the earlier upgrade look rational. That is not a choice between editions; it is a choice between
being helped now and being held up later.

## What we give

A working system, free, with enough examples that a child could update the basic site case without
extra assistance. The examples are not a teaser for a paid edition; they are the edition. Start
with the [quickstart](/docs/quickstart), copy [the starter
seed](/seeds/starter), and follow [adding a page](/guides/adding-a-page). If the basic case needs a
support contract to change, the documentation has failed, and no pricing page fixes that.

## Common peace, not sales

lab-safety is making the case for common peace, not sales. Safety is a commons: the baseline that
protects one reader protects the next, and a baseline withheld from some users is not a safety
property — it is a market segment. This site can argue for the commons because it is not trying to
convert the argument into a checkout.

If a sale is introduced, it should be for **new work**: a migration, an integration, a fork that
stays maintained, a review of your own version, a new site or universe. Not for a better edition of
what already exists. The rule is simple: nothing that is already true is held back; only work that
does not exist yet can be sold.

## What "testable in production" means

A claim you cannot check is marketing. Every capability this site claims is one of three things:

- a link you can follow on the published site;
- a command you can run from the repository;
- a guard check that fails the build when the claim stops being true.

Concretely, at the URL you are reading:

- **Deep links return 200.** Every route has its own shell, so a reload is not a 404.
- **The deck opens with no script.** One file, no JavaScript, no network —
  [check it](/pitch/offline).
- **The site works without JavaScript.** Rungs −3 and −2 are [static files](/nojs), and the
  no-stylesheet version is [/bare](/bare).
- **An agent can take it without crawling.** `llms.txt` lists every page, and
  [the contract](/docs/for-agents) says what "done" means.
- **No third-party requests.** The network panel shows the host and nothing else.
- **The guard is runnable.** `npm run guard` fails on a broken link, a missing route shell, a leaked
  home path or a stale `llms.txt`. You can break a link and watch it refuse.

That list is the promise. If a sentence on this site says "it does X" and none of those three
checks covers X, the sentence is wrong — and the fix is to delete the sentence, not to soften the
claim.

## What you cannot buy

- **A different licence.** AGPL-3.0-only for everyone, with prior terms where they exist
  ([who owns what](/docs/licensing)).
- **An SLA.** No number is published because none could be kept
  ([the arithmetic](/factors/sla-variables)).
- **A private edition.** There is no branch with more truth in it.
- **The name.** Trademarks are not part of the licence.

## What you can buy

Someone's time. The code is the same; a person attached to it is the only honest thing to sell
around a project like this — a migration, a fork that stays maintained, a review of your own
version. This site does not sell that; it demonstrates what the thing would be if you did.

The rest of the bill is ordinary: a domain, hosting past the free tier, and the attention to keep
the pages true — [the cost centre](/pitch/cost-centres), with its expiry.

## What this is not

- **Not a claim that the site is finished.** The systems it lacks are listed and priced.
- **Not a warranty.** No SLA, no support contract, no promise of a fix by Friday.
- **Not a promise that everything works forever.** It is a promise that what is claimed today is
  checkable today, by anyone, at the URL — and that when it stops being true, the build says so
  before a reader does.

## The test, in one line

Every sentence that says "this site does X" should be followed by a way to check X on the live site
or in the repository. If it is not, the sentence goes.
