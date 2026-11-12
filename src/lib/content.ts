/**
 * The content model.
 *
 * Every page is a Markdown file under src/content/<section>/<slug>.md.
 * Frontmatter is a deliberately small subset of YAML — `key: value` lines —
 * so the site needs no parser dependency and the contract stays readable.
 *
 * The nav is derived from the files, not maintained beside them: adding a
 * file is the whole act of adding a page.
 */

export const SECTIONS = [
  {
    id: 'docs',
    label: 'Docs',
    blurb: 'How the site is put together, and why each part is the size it is.',
  },
  {
    id: 'seeds',
    label: 'Seeds',
    blurb: 'Bodies of knowledge with a stated audience, a stated assumption and an entrance.',
  },
  {
    id: 'factors',
    label: 'Factors',
    blurb: 'Twelve rules of thumb, taught one at a time — with the price tag and the exit.',
  },
  {
    id: 'isotopes',
    label: 'Isotopes',
    blurb: 'Minimal viable systems you can lift whole: one page per working exemplar.',
  },
  {
    id: 'guides',
    label: 'Guides',
    blurb: 'Task-shaped walkthroughs: seed a project, add a page, ship it.',
  },
  {
    id: 'pitch',
    label: 'Pitch',
    blurb: 'The commercial case, stated plainly enough to argue with.',
  },
  {
    id: 'writing',
    label: 'Writing',
    blurb: 'Longer pieces on the trade — and on the parts that are hard.',
  },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export type Heading = { depth: 2 | 3; text: string; id: string }

export type Page = {
  /** file path relative to src/content, without the extension */
  path: string
  section: SectionId
  slug: string
  title: string
  description: string
  order: number
  updated: string
  tags: string[]
  /** seed ids this page belongs to; a page can be shared by several seeds */
  seeds: string[]
  body: string
  headings: Heading[]
}

const rawFiles = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseFrontmatter(source: string): { data: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source)
  if (!match) return { data: {}, body: source }

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const at = line.indexOf(':')
    if (at <= 0) continue
    const key = line.slice(0, at).trim()
    let value = line.slice(at + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body: source.slice(match[0].length) }
}

function extractHeadings(body: string): Heading[] {
  const out: Heading[] = []
  let inFence = false
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) inFence = !inFence
    if (inFence) continue
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line)
    if (!m) continue
    const text = m[2].replace(/\s+#+$/, '')
    out.push({ depth: m[1].length === 2 ? 2 : 3, text, id: slugify(text) })
  }
  return out
}

function toPage(path: string, source: string): Page | null {
  // '../content/docs/quickstart.md' -> 'docs/quickstart'
  const rel = path.replace(/^.*\/content\//, '').replace(/\.md$/, '')
  const [section, ...rest] = rel.split('/')
  const slug = rest.join('/')
  if (!slug || !SECTIONS.some((s) => s.id === section)) return null

  const { data, body } = parseFrontmatter(source)
  return {
    path: rel,
    section: section as SectionId,
    slug,
    title: data.title || slug,
    description: data.description || '',
    order: Number(data.order ?? 999),
    updated: data.updated || '',
    tags: (data.tags || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    seeds: (data.seeds || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    body,
    headings: extractHeadings(body),
  }
}

export const PAGES: Page[] = Object.entries(rawFiles)
  .map(([path, source]) => toPage(path, source))
  .filter((p): p is Page => p !== null)
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))

export function pagesIn(section: SectionId): Page[] {
  return PAGES.filter((p) => p.section === section)
}

export function getPage(section: string, slug: string): Page | undefined {
  return PAGES.find((p) => p.section === section && p.slug === slug)
}

export function sectionMeta(id: SectionId) {
  return SECTIONS.find((s) => s.id === id)!
}

export function href(page: Page): string {
  return `/${page.section}/${page.slug}`
}

/** Prev/next within a section, for the footer rail on every page. */
export function neighbours(page: Page): { prev?: Page; next?: Page } {
  const list = pagesIn(page.section)
  const i = list.findIndex((p) => p.path === page.path)
  return { prev: list[i - 1], next: list[i + 1] }
}
