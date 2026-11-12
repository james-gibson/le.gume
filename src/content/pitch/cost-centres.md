---
title: A cost centre, until a threshold
description: Neither option is wrong. Each buys a different thing with different money — and the choice holds only while its conditions do.
order: 3
updated: 2026-11-12
tags: pitch, cost, decisions
seeds: pitch
---

# A cost centre, until a threshold

Neither answer is wrong.

A managed documentation platform and a hand-owned static site are both correct engineering. They
buy different things with different money: one buys a support contract and a monthly invoice, the
other buys a small amount of code and a standing attention cost. Choosing between them is not a
question of competence — it is a question of which cost centre you are willing to hold, and which
profit function you are buying with it.

This project holds a **cost centre**: a free static deploy, a small build, and a promise to review
it before it stops being true.

## The conditions behind "free"

"Free" is a rate, not a fact. A static site on Pages costs nothing *while* four conditions hold:

| Condition | What it actually asks of you | What happens at the threshold |
| --- | --- | --- |
| Certificates, DNS, platform updates | Someone applies them on a cadence you set | An expired certificate is an outage, not an invoice |
| Library drift | Occasional upgrades, security advisories, the odd breaking API | The upgrade stops being an afternoon and becomes a project |
| Traffic | Nothing, under the host's published guidance | A different host is a different cost centre, with different terms |
| Content scale | A tree of Markdown, derived navigation | Past a few hundred pages, search is a service you now operate |

Every one of those is a standing obligation that the invoice does not show. That is the honest
comparison between the two options: the managed platform charges you for them in money and the
static site charges you in attention. Neither is cheaper in every dimension.

## Isotopes are how the two connect

An isotope carries both numbers. Its **cost centre** is the "what it costs" section — the standing
obligation to keep it alive. Its **profit function** is the system itself: the documentation that
stays true, the repeating job that stops being re-explained, the page that answers a question
without a person.

Naming the pair is the whole point. A cost with no function is an expense; a function with no cost
is a fantasy; and a decision that records neither cannot be revisited, only re-argued.

## Stable until a threshold

The chosen cost centre is stable until one of its conditions is crossed. When that happens the
decision is not broken — it is due for **recertification**:

1. Re-derive the numbers for the thing as it stands now.
2. Price the alternative as it stands now, not as it stood when you chose.
3. Decide again, and write the date you decided.

Triggers worth writing down rather than remembering:

- an annual date, so silence is not mistaken for agreement;
- a dependency advisory you cannot clear in an afternoon;
- traffic past the host's guidance, or a page count past what a static tree carries;
- the person who maintains it leaving, or becoming the only one who can;
- a new requirement — versioned docs, localisation, authoring by people without git.

## What this page is not

It is not a plan to fix those conditions, and it does not argue that this stack survives them. It
exists so that the cost centre is stated once, with its expiry, instead of being discovered by the
first person who finds the limit.

That is the whole discipline: **a decision that names its threshold can be recertified cheaply; a
decision that does not, gets re-litigated in a meeting with no numbers.**

## Where this sits in the shelf

This is the business case for a reader who will not open a terminal — rung 0 on the
[seed scale](/seeds/what-is-a-seed). The engineering version of the same trade is
[The operations case](/docs/operations-case); the list of things this stack deliberately does not do
is [Let me spill the beans](/pitch/spill-the-beans).
