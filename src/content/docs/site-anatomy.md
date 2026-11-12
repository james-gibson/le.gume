---
title: Site anatomy
description: The file map behind the page you are reading, annotated.
order: 4
updated: 2026-11-11
tags: reference, files
---

# Site anatomy

This page is the map. Every path below exists in the repository; the comment after each is what
it is for, not what it is called.

```text
index.html                  shell; %BASE_URL% keeps the favicon correct under /le.gume/
vite.config.ts              base path (dev: '/', build: '/le.gume/'), react + tailwind plugins
tsconfig.json               strict, bundler resolution, no emit
src/main.tsx                Router basename from import.meta.env.BASE_URL
src/App.tsx                 five routes: /, /design, /:section, /:section/:slug, *
src/index.css               tailwind import, fancy-ui stylesheet, palette tokens, two utilities
src/lib/content.ts          the content model: glob, frontmatter, ordering, headings
src/lib/markdown.tsx        element-by-element styling for rendered Markdown
src/lib/usePageMeta.ts      document title + description per route
src/components/Layout.tsx   header, outlet, footer, scroll reset
src/components/SiteHeader.tsx  sticky nav, built from SECTIONS
src/components/SiteFooter.tsx  counts, section columns, source link
src/pages/Home.tsx          hero, stats, bento grid, marquee, self-documenting cards
src/pages/SectionIndex.tsx  a section's pages, numbered and sorted
src/pages/DocPage.tsx       article, breadcrumb, TOC rail, prev/next, edit link
src/pages/Design.tsx        live design system (this is a route, not a document)
src/pages/NotFound.tsx      404 with the real section list
src/content/**/*.md         the pages you are reading
scripts/postbuild.mjs       per-route shells, 404.html, .nojekyll, robots.txt
scripts/verify-publish.mjs  the guard; fails the build on unsafe output
```

## Routes

| Route | Component | Why it exists |
| --- | --- | --- |
| `/` | `Home` | The argument, in one screen |
| `/design` | `Design` | The same components, live, with their real props |
| `/docs` etc. | `SectionIndex` | A numbered list of that section's pages |
| `/docs/quickstart` | `DocPage` | Markdown rendered into the site's own typography |
| anything else | `NotFound` | A useful dead end |

## Data flow, in one line

`import.meta.glob` → `PAGES` → nav, indexes, TOC, prev/next, counts. Nothing else reads the
filesystem, and nothing reads `PAGES` and then re-sorts it.

## The two things that are not in the tree

- **Search.** There is none. A four-section site with thirteen pages does not need a search
  index, and adding one would be the first piece of infrastructure a reader has to reason about.
- **A CMS.** Markdown in git is the CMS. The `Edit this page` link on every article goes straight
  to the file on GitHub, which is the shortest possible feedback loop.

## Where to look when something is wrong

| Symptom | First file |
| --- | --- |
| A page 404s | `src/content/<section>/<slug>.md` — is the folder a real section? |
| A page is missing from the nav | the same file — frontmatter `order` or folder |
| Links break only on the deployed site | `vite.config.ts` (`base`) and `src/main.tsx` (basename) |
| A deep link 404s on Pages | `scripts/postbuild.mjs` — `404.html` missing |
| Styling drifts from the frame | `src/lib/markdown.tsx` — it owns article typography |
