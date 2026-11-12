#!/usr/bin/env node
/**
 * The publish guard.
 *
 * A public documentation site is a small, permanent promise. This file is the
 * only thing standing between a careless build and that promise, so every check
 * below names the failure it prevents and fails with a message a human can act
 * on.
 *
 * Run after `vite build` (it is part of `npm run build`), or standalone with
 * `npm run guard` against an existing dist/.
 *
 * Exit 1 on the first class of failure that is not merely advisory.
 */
import { access, readFile, readdir, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'

const DIST = 'dist'
const failures = []
const notes = []

function fail(check, detail) {
  failures.push({ check, detail })
}

async function readText(path) {
  return readFile(path, 'utf8')
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

// --- 1. the output exists and is the shape Pages expects -------------------
let files
try {
  files = await walk(DIST)
} catch {
  console.error('guard: dist/ is missing — run `npm run build` first')
  process.exit(1)
}

const rel = files.map((f) => relative(DIST, f))
for (const required of ['index.html', '404.html', '.nojekyll', 'favicon.svg', 'robots.txt', 'llms.txt']) {
  if (!rel.includes(required)) {
    fail('required-file', `${required} is missing from dist/ (see scripts/postbuild.mjs)`)
  }
}

const indexHtml = await readText(join(DIST, 'index.html')).catch(() => '')
const notFoundHtml = await readText(join(DIST, '404.html')).catch(() => '')
if (indexHtml && notFoundHtml && indexHtml !== notFoundHtml) {
  fail(
    'spa-fallback',
    'dist/404.html differs from dist/index.html — deep links would boot a different shell',
  )
}

// --- 2. the base path agrees with the deployed location -------------------
// package.json `homepage` is the single declaration of where this site lives.
const pkg = JSON.parse(await readText('package.json'))
const expectedBase = pkg.homepage ? new URL(pkg.homepage).pathname : '/'
if (!indexHtml.includes(`${expectedBase}assets/`)) {
  fail(
    'base-path',
    `index.html does not load assets from ${expectedBase}assets/ — check vite.config.ts base ` +
      `against package.json homepage`,
  )
}

const rootRefs = [...indexHtml.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((m) => m[1])
for (const ref of rootRefs) {
  if (!ref.startsWith(expectedBase)) {
    fail('base-path', `index.html references ${ref}, which escapes the mount ${expectedBase}`)
  }
}

// --- 3. nothing shipped points back at source or at a map -----------------
for (const file of rel) {
  if (file.endsWith('.map')) fail('sourcemap', `${file} is a source map; set sourcemap: false`)
}
const scripts = files.filter((f) => f.endsWith('.js'))
const jsText = (await Promise.all(scripts.map((f) => readText(f)))).join('\n')

if (/\/src\/[A-Za-z0-9_-]+\.(?:tsx?|css)/.test(indexHtml) || /from\s*"\/src\//.test(jsText)) {
  fail('dev-paths', 'output refers to /src/ — a dev server URL leaked into the bundle')
}

// --- 4. placeholders in shipped markup ------------------------------------
// Scope: the HTML shells. Prose lives in the JS bundle, where these words can be
// legitimate documentation, so scanning it would flag this very file's subject.
const placeholder = /\b(?:TODO|FIXME|lorem ipsum)\b|example\.com/i
for (const [name, html] of [
  ['index.html', indexHtml],
  ['404.html', notFoundHtml],
]) {
  if (placeholder.test(html)) fail('placeholder', `${name} still contains a placeholder`)
}

// --- 5. nothing private or secret-looking anywhere ------------------------
const leakPatterns = [
  [/\/Users\/[A-Za-z0-9._-]+/, 'an absolute macOS home path'],
  [/\/home\/[A-Za-z0-9._-]+/, 'an absolute Linux home path'],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'a private key'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'an AWS access key id'],
  [/\bsk-(?:live|proj|ant)-[A-Za-z0-9_-]{16,}/, 'an API secret'],
  [/\b(?:password|passwd|secret|token)\s*[:=]\s*["'][^"']{8,}["']/i, 'a hardcoded credential'],
  [/127\.0\.0\.1:\d+/, 'a loopback URL'],
  [/localhost:\d+/, 'a localhost URL'],
]
for (const [pattern, what] of leakPatterns) {
  const hit = jsText.match(pattern) ?? indexHtml.match(pattern)
  if (hit) fail('leak', `output contains ${what}: ${hit[0].slice(0, 60)}`)
}

// --- 6. every real route has its own shell, and the content is in the bundle -
const contentFiles = (await walk('src/content')).filter((f) => f.endsWith('.md'))
if (contentFiles.length === 0) fail('content', 'src/content/**/*.md matched nothing')

const sections = [...new Set(contentFiles.map((f) => relative('src/content', f).split('/')[0]))]
const routes = [...sections, ...contentFiles.map((f) => relative('src/content', f).replace(/\.md$/, ''))]

for (const route of routes) {
  try {
    await access(join(DIST, route, 'index.html'))
  } catch (error) {
    // Only a missing file is the finding; anything else is this script being wrong.
    if (!error || error.code !== 'ENOENT') throw error
    fail(
      'route-shell',
      `dist/${route}/index.html is missing — GitHub Pages would answer 404 for /${route}`,
    )
  }
}

for (const file of contentFiles) {
  const route = relative('src/content', file).replace(/\.md$/, '')
  const source = await readText(file)
  const title = /^title:\s*(.+)$/m.exec(source)?.[1]?.trim().replace(/^["']|["']$/g, '')
  if (!title) {
    fail('content', `${file} has no title: in frontmatter`)
    continue
  }
  // A numbered isotope is a compound and must declare its slots, even if none.
  const slug = route.split('/')[1] ?? ''
  if (route.startsWith('isotopes/') && /^\d/.test(slug) && !/^slots:/m.test(source)) {
    fail(
      'isotope',
      `${file} is a numbered isotope but has no \`slots:\` frontmatter (use \`slots: none\`)`,
    )
  }
  // React escapes nothing in JS string literals, but the bundler may split
  // long strings; a title is short enough to appear whole.
  if (!jsText.includes(title)) {
    fail('content', `${file} ("${title}") is not present in the built bundle`)
  }
}

// --- 7. internal links point at routes that exist -------------------------
// Markdown authors write root-absolute links ("/docs/quickstart") because that
// is how the site reads in a browser. The mount prefix is applied at render
// time, so the check here is against routes, not against the built HTML.
const knownRoutes = new Set([
  '/',
  '/design',
  ...sections.map((s) => `/${s}`),
  ...contentFiles.map((f) => `/${relative('src/content', f).replace(/\.md$/, '')}`),
])
const knownFiles = new Set(['/llms.txt', '/robots.txt', '/favicon.svg'])
for (const file of contentFiles) {
  const source = await readText(file)
  for (const match of source.matchAll(/\]\((\/[^)\s]*)\)/g)) {
    const target = match[1].replace(/#.*$/, '').replace(/\/$/, '') || '/'
    if (knownRoutes.has(target) || knownFiles.has(target)) continue
    fail('link', `${file} links to ${match[1]}, which is not a route on this site`)
  }
}

// --- 8. the machine entry lists every page -------------------------------
// llms.txt is how an agent takes the site without crawling it. A page missing
// from it is a page the site does not admit to having.
const llms = rel.includes('llms.txt') ? await readText(join(DIST, 'llms.txt')) : ''
if (!llms) {
  fail('llms', 'dist/llms.txt is empty or missing (see scripts/postbuild.mjs)')
} else {
  for (const file of contentFiles) {
    const route = relative('src/content', file).replace(/\.md$/, '')
    if (!llms.includes(`/${route}/)`)) {
      fail('llms', `dist/llms.txt does not list /${route}`)
    }
  }
  for (const anchor of ['## For agents', '## Invariants', '## Build and verify', '## Isotope shortcuts']) {
    if (!llms.includes(anchor)) fail('llms', `dist/llms.txt is missing the "${anchor}" section`)
  }
}

// --- 7. size sanity -------------------------------------------------------
const total = (await Promise.all(files.map(async (f) => (await stat(f)).size))).reduce(
  (a, b) => a + b,
  0,
)
const budgetMb = 8
if (total > budgetMb * 1024 * 1024) {
  fail('size', `dist/ is ${(total / 1024 / 1024).toFixed(1)}MB, over the ${budgetMb}MB budget`)
}
notes.push(`${rel.length} files, ${(total / 1024).toFixed(0)}KB total`)

// --- report ---------------------------------------------------------------
if (failures.length) {
  console.error('guard: refused to publish\n')
  for (const { check, detail } of failures) console.error(`  [${check}] ${detail}`)
  console.error('\nNothing was published. Fix the checks above and rebuild.')
  process.exit(1)
}

console.log(`guard: clean — ${notes.join(', ')}`)
