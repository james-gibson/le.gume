---
title: A read-only surface behind an alarm
description: How the skill store answers a process without becoming an unguarded endpoint — loopback, token admission, a signed border and four checks.
order: 22
updated: 2026-11-21
tags: skills, mcp, ingress, alarms
seeds: skillz
---

# A read-only surface behind an alarm

The store is useful as a folder. The service face exists for the case where another process — an
agent, a dashboard, an alarm — needs to ask what is in it without being given a shell. That is a
read problem, and the design keeps it one.

## The boundary

| Layer | Binds | Authenticates | Can write? |
| --- | --- | --- | --- |
| MCP server | loopback (8090) | loopback only | no |
| smoke-alarm | loopback (18098) | none; it probes | no |
| adhd | loopback (9091) | none; it reads the alarm | no |
| wan-ingress | loopback (8443) | bearer token, then a signed border | no |

All four are loopback in the checkout. The ingress is the only process intended to face a WAN, and
only after its `addr` is deliberately widened; the token and the signed border are still in front of
the MCP server. The server itself refuses a non-loopback bind unless `--allow-non-loopback` is
passed explicitly, so a mistake has to be made twice.

## The signed border

The ingress does not forward an arbitrary destination. It resolves an agreed name (`skillz`) to a
border address, then signs one request:

| Signed field | Why it is there |
| --- | --- |
| HTTP method | the border does not accept a different verb |
| escaped path | the namespace and name are inside the signature |
| namespace | an agreement cannot be used outside its namespace |
| SHA-256 of the body | the body cannot be swapped after signing |
| Unix timestamp | a captured request expires after five minutes |

The border compares the signature in constant time and refuses a missing key with
`503 border_unconfigured` rather than opening. The body is still a JSON-RPC read; the signature
proves the request came through the agreed front, not that the caller is trusted with a write.

## What the alarm can and cannot claim

A probe is evidence, not a proof. The alarm can say:

- the MCP server answered `initialize` and `skills/status`;
- the ingress answered and advertised `ingress/forward`;
- the process was reachable at the moment of the check.

It cannot say that the border accepted a skill read. That is why the `doctor` check does three
different things: it signs a border request directly, it refuses an unsigned one, and it sends a
real forward through the ingress and reads the upstream status. A capability advertisement is not a
substitute for a request that crossed.

## The four checks

```sh
cd ~/skillz
bin/skillz verify
bin/skillz probe
bin/skillz ingress-probe --key-file state/ops/border.key
ops/install.sh doctor
```

`verify` checks the canon. `probe` checks the MCP handshake. `ingress-probe` checks that a signed
request is accepted and an unsigned one is refused. `doctor` runs all three, exercises a real
ingress forward, and then reads the alarm's target states. If `doctor` passes, the folder, the
wire, the border and the light agree.

## What it costs

- **Two secrets.** The ingress bearer token and the border key are generated into `state/ops/` with
  mode `600`. They are not in the repository. Rotate them by deleting `state/ops/secrets.env` and
  restarting the surface; the server and the ingress are rendered from the same values.
- **A second process, and a third.** The alarm and the dashboard are not the store. They are how a
  human sees whether the store is answering. If they are down, the store is still readable; the
  light is stale.
- **A read-only limit.** A caller cannot adopt, seal, archive or delete over the wire. That is a
  feature with a cost: every mutation needs a shell and a review.
- **A probe budget.** Every target is polled on an interval. The numbers are small because the
  surface is small; a larger store should measure before adding more.

## When not to use it

A single user on one machine does not need an ingress, an alarm or a dashboard. A folder of private
skills should not be exposed because the machinery exists. And a surface that needs per-caller
permissions needs an identity system, not a loopback bind and a shared token.

The model is [One owner for every skill](/docs/skillz); the task is
[Adopt a skill collection](/guides/skillz-adoption).
