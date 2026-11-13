#!/usr/bin/env node
/**
 * Doom renderability, build-time pass.
 *
 * One 320x200 frame, eight bits per pixel, 256 colours, 32 light levels, no
 * alpha compositing, no anti-aliasing. An element either survives that paint or
 * it does not — so this script fails the build on survivability findings rather
 * than warning about them.
 *
 * It is deliberately the static pass: the site ships no browser in CI and adding
 * one to measure contrast would cost more than the rule is worth here. What it
 * cannot measure is listed at the end of every run rather than guessed at.
 *
 *   node scripts/doomlint.mjs dist --fail-on high
 *   node scripts/doomlint.mjs dist --verbose
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join } from 'node:path'

const RULES = {
  'DOOM-001': ['critical', 10, 30, 'cross-origin content is not painted'],
  'DOOM-003': ['high', 5, 20, 'live pixel source cannot be palette-mapped'],
  'DOOM-004': ['medium', 2.5, 10, 'filter / backdrop-filter has no renderer analogue'],
  'DOOM-005': ['medium', 2.5, 10, 'blend mode requires alpha compositing'],
  'DOOM-006': ['medium', 2.5, 10, 'fixed / sticky positioning has no flat-plane analogue'],
  'DOOM-011': ['medium', 2.5, 10, 'gradient posterises to 256 entries'],
  'DOOM-013': ['medium', 2.5, 10, 'alpha transparency is colour-key only'],
  'DOOM-020': ['low', 1, 5, 'border-radius stair-steps'],
  'DOOM-023': ['low', 1, 5, 'transform has no analogue'],
  'DOOM-025': ['medium', 2.5, 10, 'font below the glyph grid'],
  'DOOM-030': ['critical', 10, 30, 'content does not survive without JavaScript'],
  'DOOM-032': ['high', 5, 20, 'image carries no alt text'],
  'DOOM-040': ['low', 1, 5, 'more than two font families'],
  'DOOM-002': ['low', 1, 5, 'rendering depends on the viewer environment'],
  // Not listed on the page, and only evaluated when DOOM_MUSIC is set. A frame
  // has no sound, so a page that needs audio to be understood has a requirement
  // it cannot meet for a renderer, a muted reader, or a transcript.
  'DOOM-666': ['critical', 10, 30, 'the page needs sound the frame does not have'],
}

const ORDER = { critical: 0, high: 1, medium: 2, low: 3 }

const args = process.argv.slice(2)
const root = args.find((a) => !a.startsWith('--')) ?? 'dist'
const verbose = args.includes('--verbose')
// Hidden by an environment variable, not by obfuscation: run with DOOM_MUSIC=1
// and the rule is visible, its findings included.
const music = Boolean(process.env.DOOM_MUSIC)
const failOnIndex = args.indexOf('--fail-on')
const failOn = failOnIndex > -1 ? args[failOnIndex + 1] : null

if (!existsSync(root)) {
  console.error(`doomlint: ${root} does not exist — build first`)
  process.exit(2)
}

// --- waivers ---------------------------------------------------------------
// A waiver is a decision with a reason attached. It zeroes the score for that
// rule and is always reported, because a silent waiver is a lie.
const waivers = new Map()
if (existsSync('.doomignore')) {
  for (const line of readFileSync('.doomignore', 'utf8').split('\n')) {
    const body = line.trim()
    if (!body || body.startsWith('#')) continue
    const [rule, , ...rest] = body.split(/\s+/)
    if (!RULES[rule]) {
      console.error(`doomlint: .doomignore names unknown rule ${rule}`)
      process.exit(2)
    }
    waivers.set(rule, rest.join(' ').replace(/^#\s*/, ''))
  }
}

// --- walk ------------------------------------------------------------------
const files = []
;(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (['.html', '.htm', '.css'].includes(extname(full))) files.push(full)
  }
})(root)

const findings = []
const hit = (rule, file, detail) => findings.push({ rule, file, detail })

const textOf = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const fonts = new Set()

for (const file of files) {
  const source = readFileSync(file, 'utf8')
  const isHtml = file.endsWith('.html') || file.endsWith('.htm')

  if (isHtml) {
    // DOOM-030: a renderer that cannot run the JavaScript paints what is in the
    // file. Every shell is prerendered, so this is a real regression test.
    if (!/<h1[\s>]/i.test(source)) hit('DOOM-030', file, 'no <h1> in the initial HTML')
    const text = textOf(source)
    if (text.length < 120) hit('DOOM-030', file, `${text.length} characters of text without JS`)

    if (/<img\b(?![^>]*\balt=)[^>]*>/i.test(source)) hit('DOOM-032', file, '<img> without alt')
    if (/<(canvas|video|object|embed)[\s>]/i.test(source))
      hit('DOOM-003', file, 'live pixel source in flow')

    for (const match of source.matchAll(/\bsrc\s*=\s*["']https?:\/\//gi))
      hit('DOOM-001', file, `cross-origin src: ${match[0].slice(0, 48)}`)
    for (const match of source.matchAll(/url\(\s*["']?https?:\/\//gi))
      hit('DOOM-001', file, 'cross-origin url() in markup')
    if (music && /<(audio|video)[\s>]|<[^>]+\bautoplay\b/i.test(source))
      hit('DOOM-666', file, 'sound is required to understand the page')
  } else {
    if (/url\(\s*["']?https?:\/\//i.test(source)) hit('DOOM-001', file, 'cross-origin url() in CSS')
    if (/(?:^|[;{])\s*filter\s*:\s*(?!none)/i.test(source)) hit('DOOM-004', file, 'filter')
    if (/backdrop-filter\s*:/i.test(source)) hit('DOOM-004', file, 'backdrop-filter')
    if (/mix-blend-mode\s*:\s*(?!normal)/i.test(source)) hit('DOOM-005', file, 'blend mode')
    if (/position\s*:\s*(fixed|sticky)/i.test(source)) hit('DOOM-006', file, 'fixed/sticky')
    if (/(linear|radial|conic)-gradient/i.test(source)) hit('DOOM-011', file, 'gradient')
    if (/rgba?\([^)]*[,/]\s*0?\.\d+\s*\)/i.test(source)) hit('DOOM-013', file, 'alpha < 1')
    if (/border-radius\s*:\s*(?!0)/i.test(source)) hit('DOOM-020', file, 'border-radius')
    if (/transform\s*:\s*(?!none)/i.test(source)) hit('DOOM-023', file, 'transform')
    if (/font-size\s*:\s*[0-9](px|\.\d+px)/i.test(source)) hit('DOOM-025', file, 'font-size < 10px')
    for (const match of source.matchAll(/font-family\s*:\s*([^;}]+)/gi)) {
      const first = match[1].split(',')[0].trim().replace(/["']/g, '')
      if (first) fonts.add(first)
    }
  }
}

if (fonts.size > 2) hit('DOOM-040', 'document', `${fonts.size} families: ${[...fonts].join(', ')}`)

// DOOM-002 is measured by the dynamic pass; the static pass can only note that
// the stylesheet carries a dark scheme at all.
const darkScheme = files.some(
  (f) => !f.endsWith('.html') && /prefers-color-scheme\s*:\s*dark/i.test(readFileSync(f, 'utf8')),
)
if (darkScheme) hit('DOOM-002', 'document', 'stylesheet answers prefers-color-scheme: dark')

// --- score -----------------------------------------------------------------
const counts = {}
for (const finding of findings) counts[finding.rule] = (counts[finding.rule] ?? 0) + 1

let penalty = 0
for (const [rule, count] of Object.entries(counts)) {
  if (waivers.has(rule)) continue
  const [, weight, cap] = RULES[rule]
  penalty += Math.min(count * weight, cap)
}
const score = Math.round(Math.min(100, Math.max(0, 100 - penalty)))
const badge =
  score >= 95 ? 'RUNS IN DOOM' : score >= 80 ? 'RUNS IN DOOM (hurt)' : score >= 60 ? 'NUKAGE' : 'DOES NOT RUN'

const gating = findings.filter((f) => !waivers.has(f.rule) && ORDER[RULES[f.rule][0]] <= 1)
const advisory = findings.filter((f) => !waivers.has(f.rule) && ORDER[RULES[f.rule][0]] > 1)
const waived = findings.filter((f) => waivers.has(f.rule))

// --- report ----------------------------------------------------------------
if (music) console.log('doom: DOOM-MUSIC engaged — one hidden rule is active')

console.log(
  `doom: ${badge} · ${score}/100 · ${gating.length} gating, ${advisory.length} advisory, ` +
    `${waived.length} waived`,
)

if (verbose) {
  const rows = [...Object.entries(counts)].sort(
    (a, b) => ORDER[RULES[a[0]][0]] - ORDER[RULES[b[0]][0]],
  )
  for (const [rule, count] of rows) {
    const [severity, , , why] = RULES[rule]
    const mark = waivers.has(rule) ? 'waived' : severity
    console.log(`  ${rule}  ${mark.padEnd(8)} ${String(count).padStart(3)}  ${why}`)
    if (!waivers.has(rule) && severity === 'critical') {
      for (const finding of findings.filter((f) => f.rule === rule).slice(0, 3))
        console.log(`      ${finding.file}  ${finding.detail}`)
    }
  }
  for (const [rule, reason] of waivers) console.log(`  waived ${rule}: ${reason}`)
}

console.log(
  'unverifiable without a browser: contrast after palette snapping, 320px overflow, ' +
    'pseudo-element content, reading order.',
)

if (failOn) {
  const limit = ORDER[failOn] ?? 99
  const blocked = gating.filter((f) => ORDER[RULES[f.rule][0]] <= limit)
  if (blocked.length) {
    console.error(`\ndoomlint: ${blocked.length} finding(s) at or above "${failOn}"`)
    for (const finding of blocked.slice(0, 10))
      console.error(`  ${finding.rule}  ${finding.file}  ${finding.detail}`)
    process.exit(1)
  }
}
