import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from 'fancy-ui-react'
import { SECTIONS, pagesIn, sectionMeta, type SectionId } from '../lib/content'
import { lateralSeeds, scale } from '../lib/seeds'
import { usePageMeta } from '../lib/usePageMeta'

export function SectionIndex({ section }: { section: SectionId }) {
  const meta = sectionMeta(section)
  const pages = pagesIn(section)
  usePageMeta(meta.label, meta.blurb)

  // Rung −3 ("No script") is hidden with JavaScript, on purpose. With scripts
  // off the row would be visible — and so would nothing else, because this page
  // is drawn by the script that removed the row. That is the joke, and it is
  // also the argument.
  const [hideNoScript, setHideNoScript] = useState(false)
  useEffect(() => setHideNoScript(true), [])

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <p className="text-xs tracking-[0.18em] text-pulse uppercase">{meta.label}</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
        {meta.blurb}
      </h1>

      {section === 'seeds' && (
        <div className="mt-10 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-surface-2 text-cream">
              <tr>
                <th className="border-b border-line px-4 py-3 font-semibold">Rung</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Readiness</th>
                <th className="border-b border-line px-4 py-3 font-semibold">Seed</th>
              </tr>
            </thead>
            <tbody>
              {scale()
                .filter((step) => !(hideNoScript && step.level === -3))
                .map((step) => (
                  <tr key={step.level}>
                  <td className="border-b border-line-soft px-4 py-3 font-mono text-xs text-muted">
                    {step.level}
                  </td>
                  <td className="border-b border-line-soft px-4 py-3">
                    <span className="text-cream">{step.label}</span>
                    <span className="mt-0.5 block text-xs text-muted">{step.touches}</span>
                  </td>
                  <td className="border-b border-line-soft px-4 py-3">
                    {step.seeds.map((seed) => (
                      <Link
                        key={seed.id}
                        to={`/seeds/${seed.id}`}
                        className="text-pulse underline decoration-pulse/30 underline-offset-4 hover:decoration-pulse"
                      >
                        {seed.title}
                      </Link>
                    ))}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-muted">—</td>
                <td className="px-4 py-3">
                  <span className="text-cream">Register</span>
                  <span className="mt-0.5 block text-xs text-muted">
                    writes for any rung; the voice, not the ladder
                  </span>
                </td>
                <td className="px-4 py-3">
                  {lateralSeeds().map((seed) => (
                    <Link
                      key={seed.id}
                      to={`/seeds/${seed.id}`}
                      className="text-pulse underline decoration-pulse/30 underline-offset-4 hover:decoration-pulse"
                    >
                      {seed.title}
                    </Link>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          {hideNoScript && (
            <p className="border-t border-line-soft px-4 py-3 text-xs text-muted/70">
              Rung −3 is hidden by JavaScript. Turn scripts off if you want to see it — and the rest
              of this page will go with it, because the script that hid the rung is the script that
              drew the table. That is the entire joke, and it is also the argument.
            </p>
          )}
        </div>
      )}

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
