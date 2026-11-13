#!/usr/bin/env node
/**
 * Accessibility, recaptured from the build.
 *
 * The build knows what went in: every page has a title in frontmatter, every
 * heading a level, every image an alt if it has one. This pass ignores that
 * knowledge and reads the built HTML the way an assistive technology would —
 * the document title, the landmarks, the heading outline, the accessible names —
 * then compares the recapture with the source. A mismatch means the page is not
 * saying what it was written to say.
 *
 * Zero dependencies, static, fails the build on critical and high.
 *
 *   node scripts/a11y.mjs dist --fail-on high
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

const RULES = {
  'A11Y-001': ['critical', 10, 30, 'no language declared on <html>'],
  'A11Y-002': ['critical', 10, 30, 'the page title does not name the page'],
  'A11Y-003': ['critical', 10, 30, 'no <main> landmark'],
  'A11Y-004': ['critical', 10, 30, 'the document has no single <h1>'],
  'A11Y-005': ['high', 5, 20, 'the heading outline skips a level'],
  'A11Y-006': ['high', 5, 20, 'an image has no alt text'],
  'A11Y-007': ['high', 5, 20, 'a link has no accessible name'],
  'A11Y-008': ['high', 5, 20, 'a button has no accessible name'],
  'A11Y-009': ['medium', 2.5, 10, 'an id is used more than once'],
  'A11Y-010': ['medium', 2.5, 10, 'a focusable element is aria-hidden'],
}

const ORDER = { critical: 0, high: 1, medium: 2, low: 3 }

const args = process.argv.slice(2)
const root = args.find((a) => !a.startsWith('--')) ?? 'dist'
const verbose = args.includes('--verbose')
const failOnIndex = args.indexOf('--fail-on')
const failOn = failOnIndex > -1 ? args[failOnIndex + 1] : null

if (!existsSync(root)) {
  console.error(`a11y: ${root} does not exist — build first`)
  process.exit(2)
}

// --- what the build put in -------------------------------------------------
const titles = new Map()
;(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (extname(full) === '.md') {
      const source = readFileSync(full, 'utf8')
      const title = /^title:\s*(.+)$/m.exec(source)?.[1]?.trim().replace(/^["']|["']$/g, '')
      if (title) titles.set(relative('src/content', full).replace(/\.md$/, ''), title)
    }
  }
})('src/content')

// --- what the accessibility tree would get ---------------------------------
const findings = []
const hit = (rule, file, detail) => findings.push({ rule, file, detail })

const text = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

const htmlFiles = []
;(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (full.endsWith('.html')) htmlFiles.push(full)
  }
})(root)

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8')
  const route = file
    .replace(`${root}/`, '')
    .replace(/\/index\.html$/, '')
    .replace(/^index\.html$/, '')
    .replace(/^404\.html$/, '404')

  if (!/<html[^>]*\slang="[a-z]{2,}"/i.test(html)) hit('A11Y-001', file, '<html> has no lang')

  const titleTag = /<title>([\s\S]*?)<\/title>/i.exec(html)
  const docTitle = titleTag ? text(titleTag[1]) : ''
  if (!docTitle) hit('A11Y-002', file, 'no <title>')

  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1]))
  if (h1s.length !== 1) hit('A11Y-004', file, `${h1s.length} <h1> elements`)

  // The recapture: the document title must name the page the build wrote.
  const sourceTitle = titles.get(route)
  if (sourceTitle && docTitle && !docTitle.includes(sourceTitle)) {
    hit('A11Y-002', file, `title "${docTitle}" does not contain "${sourceTitle}"`)
  }

  if (!/<main[\s>]/i.test(html)) hit('A11Y-003', file, 'no <main>')

  const levels = [...html.matchAll(/<h([1-6])[\s>]/gi)].map((m) => Number(m[1]))
  let previous = 0
  for (const level of levels) {
    if (previous && level > previous + 1) {
      hit('A11Y-005', file, `h${previous} → h${level}`)
      break
    }
    previous = level
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt\s*=/i.test(match[0])) hit('A11Y-006', file, match[0].slice(0, 60))
  }

  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = match[1]
    const label = text(match[2]) || /aria-label\s*=\s*"([^"]+)"/i.exec(attrs)?.[1] || ''
    if (!label) hit('A11Y-007', file, `<a ${attrs.trim().slice(0, 48)}>`)
  }

  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = match[1]
    const label = text(match[2]) || /aria-label\s*=\s*"([^"]+)"/i.exec(attrs)?.[1] || ''
    if (!label) hit('A11Y-008', file, `<button ${attrs.trim().slice(0, 48)}>`)
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])
  const seen = new Set()
  for (const id of ids) {
    if (seen.has(id)) {
      hit('A11Y-009', file, `id="${id}"`)
      break
    }
    seen.add(id)
  }

  for (const match of html.matchAll(/<(a|button|input|select|textarea)\b[^>]*aria-hidden="true"[^>]*>/gi)) {
    hit('A11Y-010', file, match[0].slice(0, 60))
  }
}

// --- score -----------------------------------------------------------------
const counts = {}
for (const finding of findings) counts[finding.rule] = (counts[finding.rule] ?? 0) + 1

let penalty = 0
for (const [rule, count] of Object.entries(counts)) {
  const [, weight, cap] = RULES[rule]
  penalty += Math.min(count * weight, cap)
}
const score = Math.round(Math.min(100, Math.max(0, 100 - penalty)))
const badge = score >= 95 ? 'READABLE' : score >= 80 ? 'READABLE (hurt)' : score >= 60 ? 'NOISY' : 'UNUSABLE'

const gating = findings.filter((f) => ORDER[RULES[f.rule][0]] <= 1)

console.log(
  `a11y: ${badge} · ${score}/100 · ${findings.length} finding(s), ${gating.length} gating`,
)

if (verbose) {
  for (const [rule, count] of Object.entries(counts).sort(
    (a, b) => ORDER[RULES[a[0]][0]] - ORDER[RULES[b[0]][0]],
  )) {
    const [severity, , , why] = RULES[rule]
    console.log(`  ${rule}  ${severity.padEnd(8)} ${String(count).padStart(3)}  ${why}`)
  }
}

console.log(
  'unverifiable statically: contrast, focus order, screen-reader pronunciation, ' +
    'keyboard traps.',
)

if (failOn) {
  const limit = ORDER[failOn] ?? 99
  const blocked = gating.filter((f) => ORDER[RULES[f.rule][0]] <= limit)
  if (blocked.length) {
    console.error(`\na11y: ${blocked.length} finding(s) at or above "${failOn}"`)
    for (const finding of blocked.slice(0, 10))
      console.error(`  ${finding.rule}  ${finding.file}  ${finding.detail}`)
    process.exit(1)
  }
}
