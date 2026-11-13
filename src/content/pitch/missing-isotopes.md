---
title: The isotopes we do not have
description: Every component this site omits is an invoice it never receives — a consent banner, analytics, comments, search, auth, a CMS, a database. The absences are decisions with prices.
order: 9
updated: 2026-11-13
tags: pitch, cost, omissions
seeds: pitch
---

# The isotopes we do not have

An isotope is a small system you can lift and run. This page is about the ones that are **not on
the shelf**, and why their absence is a line item rather than an oversight.

Each of these is a system a normal documentation site has. Each one would arrive with a bill, an
owner and a failure mode. Not buying them is the cheapest decision on the site, and it is the one
nobody writes down.

## The negative invoice

Priced at the smallest honest sizes, in 2026:

| Not here | What it would cost to have | What we do instead |
| --- | --- | --- |
| Cookie consent banner | a consent manager at $0–50/month, a legal review, and a modal before the first sentence | no cookies and no analytics, so nothing to consent to |
| Analytics | a third-party script, a processing agreement, a retention policy, a dashboard nobody reads | nothing — the absence is the report |
| Comments | moderation hours every week, spam filtering, storage, an abuse process | the repository is the feedback channel |
| Search | a service or a build-time index, plus the maintenance of both | `llms.txt` and the browser's find, at fifty pages |
| Authentication | password resets, MFA, sessions, a breach-notification duty | the site is public; there is nothing to log in to |
| A CMS | an admin UI, uploads, roles, backups, and the service to keep them running | Markdown and git |
| A database | $15–25/month floor, backups, migrations, a credential to rotate | files in a repository |
| A log pipeline | $10–30/month once retention matters, plus a rota to read it | CI output, kept by the host |
| A staging environment | a second deployment, kept in sync, drifting from production | one environment, checked by the guard before it ships |
| A newsletter | a provider, a list, a consent record, an unsubscribe flow, deliverability | the repository's watch button |

Add the floors and it is roughly **$60–200 a month**, plus a few hours a week of moderation,
patching and reading dashboards. The invoice is the small half.

## The costs that are not monthly

The line items above are the ones a finance team can see. The rest arrive as obligations:

- **Breach notification**, if the database or the account system leaks.
- **Subject access requests**, if analytics or a newsletter collects personal data.
- **Moderation**, if comments exist — including the week someone posts something you have to
  answer for.
- **Deliverability**, if email is part of the product: a newsletter is a reputation you maintain.
- **Upgrades**, for every one of these, forever, including the quarter one of them breaks.

None of these has a monthly price, which is exactly why they are easy to add and hard to remove.

## The one caveat

The site stores three preferences in `localStorage` — motion, era, file view. European rules treat
local storage like a cookie, and whether a preference needs a banner depends on the jurisdiction and
the regulator. The honest position is that there is nothing to track and no third party to share it
with; it is not a legal opinion, and this page is not legal advice.

## What the absence costs

A negative invoice is not free money. Each omission removes something a reader might have wanted:

- **No comments** means no on-site conversation. The repository is the conversation, and it is
  slower.
- **No analytics** means no idea which pages are read. The `updated` field and a person's memory
  are the substitute.
- **No search** means long pages and a good table of contents, until the page count makes search a
  requirement.
- **No CMS** means writers use git, which excludes most of them.
- **No auth** means nothing can be private.

Those are real costs, paid in capability rather than currency. The pitch is not that the site is
cheaper by magic; it is that the capability was not worth its invoice here.

## When to add one

Add any of these deliberately, and price it before you do:

1. Name the reader problem it solves, not the feature it provides.
2. Add its monthly floor, its owner and its failure mode to
   [A cost centre, until a threshold](/pitch/cost-centres).
3. Re-run the arithmetic: the number moves down with every service in the path
   ([every factor moves the number](/factors/sla-variables)), and the full set is
   [a bill](/pitch/twelve-is-a-bill).

The rule that keeps this page short: **a system you have not bought cannot page you at 2am.**

## The short version

- Ten systems a normal doc site carries, each with a monthly floor and an unlisted obligation.
- About **$60–200 a month** and a few hours a week, avoided.
- The avoidance costs capability, not nothing — and the trade is written down rather than assumed.

What the site does carry is enumerated in [Small enough to count](/pitch/attack-surface); this page
is the other column of the same ledger.
