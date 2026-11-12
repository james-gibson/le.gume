---
title: 7. Port binding
description: The program opens a port and serves itself — a rule about servers, and one that a static site should decline.
order: 8
updated: 2026-11-12
tags: factor, hosting
seeds: twelve-factors
---

# 7. Port binding

> The program listens for traffic on a numbered door, and the platform forwards visitors to it.

## The idea

A server has numbered "ports"; port 443 is the conventional door for encrypted web traffic. This
factor says the program should open its own door and speak the protocol itself, rather than being
injected into a separate web server (the old "copy files into Apache's folder" model).

The point was portability: if the program serves itself, any host that can forward a port can run
it, and there is one less piece of software to configure.

## A picture

```text
old model:     visitor → web server (Apache) → program dropped inside it
this factor:   visitor → router → program on :443 (TLS handled by the platform)
```

## What it buys

- Portability across hosts and clouds.
- Fewer moving parts: no separate web server config to learn per environment.
- The same program can run locally on a laptop port and in production on 443.

## What it costs

- **TLS and certs** become your problem or your platform's, depending where the line is drawn.
- **One more surface to secure** — an open door is an attack surface, with its own timeouts, limits
  and patches.
- **Proxy configuration.** In practice a load balancer or CDN still sits in front, so you maintain
  both ends of the connection.

## Skip it when

The platform owns the socket. That is true of static hosting, serverless functions, desktop
applications, mobile apps and anything behind a managed CDN. In those cases there is no port for
you to bind and the factor is **out of scope**, not poorly implemented.

## Where this site stands

**Declined, on the record.** GitHub Pages owns the socket, the certificate and the DNS. This
repository exports no port and contains no server. Following factor 7 here would mean renting a
machine to serve files that a CDN already serves for free — the clearest example on this site of a
rule that costs money when applied without context.

## Exercise

Look at a project of yours and ask: *who terminates the connection?* If the answer is a platform —
Vercel, Pages, Netlify, Cloudflare — you are already past factor 7, and the honest note in your
documentation is "not applicable", not "TODO".

Next: [8. Concurrency](/factors/concurrency)
