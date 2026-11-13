---
title: Free, twice
description: Free to read and free to take are two different claims. Here is what each one costs, and where the freedom stops.
order: 5
updated: 2026-11-13
tags: pitch, licence, limits
seeds: pitch
---

# Free, twice

"Free" is two claims wearing one word, and they are not the same claim.

**Free as in beer** is a price: nothing to pay, no meter running, no invoice at the end of the
month. **Free as in speech** is a permission: you may read it, run it, change it and hand it on.
This project is both, with conditions — and the conditions are cheaper to read here than to
discover in a takedown notice.

## Free as in beer

There is no account, no cookie wall, no newsletter, no analytics script, and nothing to bill,
because nothing is metered. The site is a folder of files on a CDN.

The hosting is free at this size for the same reason: a public repository on the host's free tier,
a build measured in seconds, a site measured in megabytes. The host publishes soft limits — about
1 GB of site and 100 GB a month of bandwidth — and a static site this size does not approach
either.

That "free" is a rate, not a fact. It holds while four conditions do, and
[A cost centre, until a threshold](/pitch/cost-centres) lists them with their expiry. The short
version: certificates get applied, dependencies get bumped, traffic stays inside the guidance, and
the tree stays a tree. Cross one and the price changes — not because the software got worse, but
because the conditions did.

## Free as in speech

The repository is **AGPL-3.0-only**. That grants the four freedoms in the ordinary sense: read it,
run it, modify it, redistribute it — including selling support or a hosted version.

It asks one thing in return. If you run a modified version as a network service, the people using
that service get the source of your version. That clause is the whole price of the word "free"
here, and it is the reason the licence is AGPL rather than MIT: a documentation site is exactly
the kind of thing someone would host as a service and quietly stop sharing.

What that buys you is the thing a subscription cannot: **no vendor can take the copy you already
have.** The repository is the artefact. If this project stops being maintained, your clone still
builds.

Which layer is licensed and which is yours is written down in [Who owns what](/docs/licensing).

What it does not buy:

- the name, the domain, or the deployment at this URL;
- other people's content that you copy into your own vault — that arrives with its own terms;
- a claim on anyone's attention. A licence grants rights, not a maintainer.

## Free to use, for most any topic

There is no editorial gate here. No account, no submission queue, no acceptable-use policy of our
own. Copy the folder, write the Markdown, publish what you like. A recipe collection and a
compliance manual use the same machinery, and neither has to ask.

Where that stops is not a site policy, it is the world:

- **Other people's rights.** Copyright, trademarks, personal data, confidentiality. The licence
  covers this repository; it cannot cover what you put in yours.
- **The host's terms.** Publishing on someone's platform means their rules apply to your files,
  and they enforce them before you get a hearing.
- **The law where you are.** Free to publish is not free of consequence. A licence grants
  permissions; it does not grant immunity.

Most topics are free. The exceptions are not ours to waive.

## The external limits

Two arrive often enough to name.

**A takedown notice.** The site is hosted by someone else, so a complaint goes to the host, not to
the repository. A valid notice can remove the deployed URL while your clone keeps working
perfectly — which is the difference between speech and a URL. The answer is a counter-notice and a
statutory wait measured in business days, and it costs more attention than the site cost to build.
The copy you already have is unaffected, and that is not a loophole; it is the point of free as in
speech.

**A flood.** A surge of traffic is not a surprise and not a breach. Static files on a CDN absorb
most of it, the host may rate-limit or return 503s at the edge, and the bill stays at zero because
there is no per-request meter to run up. The failure mode is availability, not cost — which is a
good reason to keep a site static, and a bad reason to promise it will always be up.

Neither limit is hidden, and neither is a reason not to publish. They are the terms of using
someone else's pipes to distribute something you own.

## What "free" still costs

- **Attention.** Nobody is on call. Issues get read when they get read, and there is no SLA.
- **Updates.** No security advisories beyond the repository and the dependency bots.
- **The word itself.** "Free" invites the assumption that nothing is owed, and then someone asks
  for a feature on a Tuesday. The honest phrasing is *free to take, expensive to run badly.*

## What is not free

| Thing | What it costs |
| --- | --- |
| A custom domain | About the price of a coffee a year, plus DNS and a certificate |
| Traffic past the host's guidance | A different host, with different terms |
| Your time | An afternoon to make it yours, then the writing |
| The writing | No framework has ever shipped a sentence |
| Legal advice after a notice | More than the site cost to build |

## The short version

- **Beer:** zero to read, zero to host at this size, no meter, no account.
- **Speech:** AGPL-3.0-only. Take it, keep it, change it; publish your changes if you serve them.
- **Topics:** most any. Other people's rights and the law are the exceptions, and they are not ours
  to waive.
- **Limits:** a takedown can remove a URL, a flood can make one slow. Neither sends a bill.

The list of things this project deliberately does not do is
[Let me spill the beans](/pitch/spill-the-beans). This page is the other half: what it does do,
and what that costs when the word "free" is read precisely.
