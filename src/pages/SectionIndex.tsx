import { Link } from 'react-router-dom'
import { Reveal } from 'fancy-ui-react'
import { SECTIONS, pagesIn, sectionMeta, type SectionId } from '../lib/content'
import { usePageMeta } from '../lib/usePageMeta'

export function SectionIndex({ section }: { section: SectionId }) {
  const meta = sectionMeta(section)
  const pages = pagesIn(section)
  usePageMeta(meta.label, meta.blurb)

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs tracking-[0.18em] text-pulse uppercase">{meta.label}</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        {meta.blurb}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted">
        <span className="rounded-full border border-line px-2.5 py-1">{pages.length} pages</span>
        <span className="rounded-full border border-line px-2.5 py-1">Markdown in, site out</span>
        <span className="rounded-full border border-line px-2.5 py-1">Order set in frontmatter</span>
      </div>

      <ul className="mt-12 divide-y divide-line-soft border-y border-line-soft">
        {pages.map((page, i) => (
          <li key={page.path}>
            <Link
              to={`/${page.section}/${page.slug}`}
              className="group flex flex-col gap-2 py-6 transition-colors hover:bg-surface/40 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-xs text-muted/60 tabular-nums sm:w-8">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-medium text-cream group-hover:text-pulse">
                  {page.title}
                </span>
                <span className="mt-1 block text-sm text-muted">{page.description}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted/50">
                {page.updated || '—'}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Reveal preset="fade" className="mt-12">
        <p className="text-sm text-muted">
          Other sections:{' '}
          {SECTIONS.filter((s) => s.id !== section).map((s, i) => (
            <span key={s.id}>
              {i > 0 && ' · '}
              <Link to={`/${s.id}`} className="text-cream hover:text-pulse">
                {s.label}
              </Link>
            </span>
          ))}
        </p>
      </Reveal>
    </div>
  )
}
