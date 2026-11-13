#!/usr/bin/env node
/**
 * The offline deck.
 *
 * One HTML file, no `<script>`, no network, no build step on the reader's
 * machine. The source is the pitch page itself — split on `---` into slides — so
 * the deck cannot drift from the argument it presents.
 *
 * It has to open from `file://` on a USB stick in a room with no Wi-Fi, which
 * rules out fonts to fetch, images to resolve, and anything that needs an
 * application to boot.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'

const SOURCE = 'src/content/pitch/offline.md'
const OUT = 'dist/deck.html'

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const inline = (text) =>
  escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

function renderBlocks(lines) {
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '') {
      i += 1
      continue
    }

    if (line.startsWith('```')) {
      const code = []
      i += 1
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(lines[i])
        i += 1
      }
      i += 1
      out.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`)
      continue
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line)
    if (heading) {
      const level = heading[1].length
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`)
      i += 1
      continue
    }

    if (/^-\s+/.test(line)) {
      const items = []
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^-\s+/, ''))}</li>`)
        i += 1
      }
      out.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    if (/^>\s?/.test(line)) {
      out.push(`<blockquote>${inline(line.replace(/^>\s?/, ''))}</blockquote>`)
      i += 1
      continue
    }

    const paragraph = []
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,3}\s|-\s|>\s?|```)/.test(lines[i])) {
      paragraph.push(lines[i])
      i += 1
    }
    out.push(`<p>${inline(paragraph.join(' '))}</p>`)
  }

  return out.join('\n')
}

const raw = await readFile(SOURCE, 'utf8')
const body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
const title = /^title:\s*(.+)$/m.exec(raw)?.[1]?.replace(/^["']|["']$/g, '') ?? 'le.gume'

const slides = body
  .split(/\r?\n---\r?\n/)
  .map((slide) => slide.trim())
  .filter(Boolean)

let commit = 'unknown'
try {
  commit = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim()
} catch {
  // Building from a tarball: the footer says so rather than guessing.
}

const built = new Date().toISOString().slice(0, 10)

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="An offline pitch deck: one file, no script, no network.">
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background: #f4f1e8;
    color: #14150f;
    font: 17px/1.55 ui-serif, Georgia, "Times New Roman", serif;
  }
  .slide {
    max-width: 44rem;
    margin: 0 auto;
    padding: 3.5rem 1.5rem 3rem;
    border-bottom: 1px solid #d8d3c4;
    min-height: 60vh;
  }
  .slide:last-of-type { border-bottom: 0; }
  .slide h1 { font-size: 2.6rem; line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 1rem; }
  .slide h2 { font-size: 1.35rem; margin: 0 0 0.8rem; letter-spacing: -0.01em; }
  .slide h3 { font-size: 1rem; text-transform: uppercase; letter-spacing: 0.12em; color: #6b6a5e; }
  p { margin: 0 0 0.9rem; }
  ul { margin: 0 0 0.9rem; padding-left: 1.1rem; }
  li { margin: 0.25rem 0; }
  code { font: 0.9em ui-monospace, "SF Mono", Menlo, monospace; background: #e9e4d6; padding: 0.1em 0.3em; }
  pre { overflow-x: auto; background: #1a1c15; color: #f2efe4; padding: 0.9rem 1rem; }
  pre code { background: none; color: inherit; padding: 0; }
  blockquote { margin: 0 0 1rem; padding-left: 0.9rem; border-left: 3px solid #b6f24a; color: #3d3d33; }
  a { color: #3b5b0e; }
  .num { font: 0.75rem ui-monospace, monospace; letter-spacing: 0.2em; color: #8a887a; margin-bottom: 1.4rem; }
  footer {
    max-width: 44rem; margin: 0 auto; padding: 1.2rem 1.5rem 3rem;
    font: 0.8rem ui-monospace, monospace; color: #6b6a5e;
  }
  @media print {
    body { background: #fff; }
    .slide { border: 0; min-height: 0; page-break-after: always; padding: 0.5in; }
    .slide:last-of-type { page-break-after: auto; }
    footer { padding: 0.5in; border-top: 1px solid #ccc; }
  }
</style>
</head>
<body>
<main>
${slides
  .map(
    (slide, index) =>
      `<section class="slide">\n<div class="num">${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}</div>\n${renderBlocks(slide.split(/\r?\n/))}\n</section>`,
  )
  .join('\n')}
<footer>
  ${escapeHtml(title)} · built ${built} from ${escapeHtml(commit)} · AGPL-3.0-only · no script, no network.<br>
  Generated from ${SOURCE} — the same file the site publishes, so the two cannot disagree on purpose.
</footer>
</main>
</body>
</html>
`

await mkdir('dist', { recursive: true })
await writeFile(OUT, html, 'utf8')
console.log(`deck: wrote ${OUT} (${slides.length} slides, ${(html.length / 1024).toFixed(1)}KB)`)
