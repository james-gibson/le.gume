---
name: legume-content
description: "Use when adding, editing, restructuring or shipping content on the le.gume site (james-gibson/le.gume) — the self-documenting documentation project. Covers the one-file content model (src/content/<section>/<slug>.md), frontmatter fields, derived navigation and TOC, section rules, base-path-safe links, the publish guard's checks, the SSR route smoke test, GitHub Pages deploy, the house voice (dry, technical, legume idioms in copy without ever explaining the name), and the fancy-ui props rule (read the component page before writing props). Trigger on: le.gume, le-gume, add a page to the site, update the docs site, write a guide page, pitch page, writing page, content model, publish guard, site smoke test, deploy le.gume, restructure sections, self-documenting site."
---

# le.gume content

`le.gume` (GitHub: `james-gibson/le.gume`) is a self-documenting documentation site: React +
Vite + Tailwind v4, content as Markdown, navigation derived from the file tree, one publish
guard, GitHub Pages on push. The live site *is* the reference for its own design.

Repo: `~/projects/personal/le.gume`. Live: https://james-gibson.github.io/le.gume/

## Contract

**In:** a topic, a correction, or a request to restructure the site.

**Out:** a change where

1. Content lives in exactly one Markdown file per page — no second list to update.
2. Frontmatter carries `title` and `description`; `order`, `updated`, `tags` are optional.
3. Every new page renders, appears in its section index in the right position, and shows its
   headings in the right rail.
4. `npm run build` passes — including the guard — and `npm run smoke` renders every route.
5. Copy is dry, technical and specific; the legume idioms are used as if they were ordinary
   English and are never explained.

**Hard rules.**

- **Never maintain a navigation list.** `src/lib/content.ts` derives the nav, section indexes,
  footer columns, TOC and counts from `import.meta.glob('../content/**/*.md')`. If a page is
  missing from the nav, the file or its folder is wrong — not the nav.
- **Link with the mount in mind.** Anything written as a raw `href` string uses
  `import.meta.env.BASE_URL` (production build is `/le.gume/`). Router `<Link to>` values are
  basename-relative and must **not** include the base. Getting this wrong breaks only the
  deployed site, not `npm run dev`.
- **Content is Markdown, not MDX.** A live widget is a route (`src/pages/`), not a document. The
  design system is `/design` for exactly this reason.
- **Never explain the name.** The site uses "project seeds", "nuts and bolts", "peas in a pod",
  "spill the beans" as ordinary phrases. There is no page that connects them, no FAQ that
  winks, and no sentence that says what the name is made of. A reader who notices is meant to
  keep it to themselves.
- **Do not add infrastructure the site argues against.** No search index, no CMS, no analytics —
  `pitch/spill-the-beans.md` documents those absences as choices. Adding one makes the pitch a
  lie.
- **fancy-ui props are read, not remembered.** Before writing a component, fetch
  `https://fancy-ui.rama.app/docs/components/react/<slug>.md` and use that table. `className`
  only on components whose props list it; overlays need a `relative overflow-hidden` sized
  parent; page-wide cursors mount once.

## Add a page

```bash
cd ~/projects/personal/le.gume
# 1. write src/content/<section>/<slug>.md
# 2. frontmatter
```

```markdown
---
title: Rate limits
description: One line that also serves as the nav subtitle.
order: 4
updated: 2026-11-12
tags: api, limits
---

# Rate limits

Body. `##` and `###` become the table of contents; `#` does not.
```

```bash
npm run build   # tsc + vite + postbuild + guard
npm run smoke   # every route rendered server-side
```

Sections are `docs`, `factors`, `isotopes`, `guides`, `pitch`, `writing` (`SECTIONS` in
`src/lib/content.ts`). A new
section is an entry there plus a folder — the header, footer, index and 404 pick it up.

## Edit or restructure

- **Edit prose:** change the file, bump `updated` if the meaning changed. Do not touch routes.
- **Rename a slug:** the URL changes; grep the repo for the old path (`rg "old-slug"`) and check
  `src/content/**` cross-links, then rebuild.
- **Reorder:** `order` within the section. Ties fall back to title order.
- **Merge two pages:** keep the one whose URL is more likely to be linked; add a redirect only if
  the old URL was public long enough to matter (it is a static site — a `404.html` shim is the
  only mechanism, and it is not worth it for a young page).

## Voice

Dry, precise, unafraid of cost. State the trade, then the recommendation. Prefer a number to an
adjective, and a specific failure to a general warning.

- Good: "The guard fails when `dist/index.html` loads assets from outside the Pages mount."
- Bad: "Robust, enterprise-grade publishing you can trust."
- Good: "At thirteen pages, search is theatre. At two hundred, it is a requirement."
- Bad: "Powerful search out of the box."

Gaslighting, the house constraint: the legume idioms appear as titles and in prose
(*project seeds*, *nuts and bolts*, *peas in a pod*, *let me spill the beans*) with no
acknowledgement whatsoever. If a draft starts to explain the connection, cut that sentence.

## Files that matter

| Path | Role |
| --- | --- |
| `src/lib/content.ts` | Content model: glob, frontmatter, ordering, headings, neighbours, `SECTIONS` |
| `src/lib/markdown.tsx` | Article typography — the page voice, element by element |
| `src/App.tsx` | Five routes; `/design` and the 404 live here |
| `src/pages/Design.tsx` | Live design system; update it when you use a new component |
| `scripts/verify-publish.mjs` | The guard; read it before arguing with it |
| `scripts/smoke.tsx` | Renders every route (and the 404) to a string |
| `.github/workflows/deploy.yml` | `npm ci && npm run build` → Pages |

## Verification

1. `npm run build` — guard must print `guard: clean`.
2. `npm run smoke` — every route, including the intentional miss.
3. `rg "old-slug|/src/|localhost" src` before shipping a rename.
4. Load one deep link on the deployed site after the Actions run, not just the homepage.
