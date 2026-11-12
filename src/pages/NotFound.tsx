import { Link } from 'react-router-dom'
import { SECTIONS } from '../lib/content'
import { usePageMeta } from '../lib/usePageMeta'

export function NotFound() {
  usePageMeta('Not found', 'That page is not here.')

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8">
      <p className="font-mono text-xs tracking-[0.18em] text-pulse uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
        That one is not in the plot.
      </h1>
      <p className="mt-4 text-muted">
        The link is either old or slightly wrong. Nothing is lost — the navigation is built from
        the content tree, so if a page exists, it is reachable from a section below.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <li key={section.id}>
            <Link
              to={`/${section.id}`}
              className="block rounded-xl border border-line p-4 transition-colors hover:border-pulse/40 hover:bg-surface"
            >
              <span className="text-sm font-medium text-cream">{section.label}</span>
              <span className="mt-1 block text-xs text-muted">{section.blurb}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm">
        <Link to="/" className="text-pulse underline decoration-pulse/30 underline-offset-4">
          Back to the start
        </Link>
      </p>
    </div>
  )
}
