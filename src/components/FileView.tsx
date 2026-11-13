import { sectionMeta, type Page } from '../lib/content'
import { Link } from 'react-router-dom'
import { NON_HOSTED_FILES } from '../lib/files'
import { useFileView } from '../lib/fileview'

/**
 * The page as a file. No panel, no table of contents, no previous/next — those
 * are renderings, and this view exists to show the thing they are renderings of.
 */
export function FileView({ page }: { page: Page }) {
  const { setView } = useFileView()
  const isRungMinusOne = page.section === 'seeds' && page.slug === 'just-a-file'

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <h1 className="sr-only">
        {page.title} — source file
      </h1>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          src/content/{page.path}.md · {page.raw.length} bytes
        </p>
        <button
          type="button"
          onClick={() => setView('page')}
          className="rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-pulse/50 hover:text-cream"
        >
          render it
        </button>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-line bg-[#0c0a0c] p-4 font-mono text-[12px] leading-6 whitespace-pre-wrap text-cream/85">
        {page.raw}
      </pre>

      {isRungMinusOne && (
        <section className="mt-12">
          <h2 className="text-sm font-semibold tracking-[0.14em] text-muted uppercase">
            Files that were never hosted
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Imported as raw text at build time, not fetched. These have no route and never did —
            they are the repository's own documents, inlined because the rung is about files
            rather than pages.
          </p>

          <div className="mt-4 space-y-3">
            {NON_HOSTED_FILES.map((file) => (
              <details key={file.path} className="rounded-xl border border-line bg-surface/60">
                <summary className="cursor-pointer px-4 py-2.5 font-mono text-xs text-cream/80">
                  {file.path} · {file.text.length} bytes
                </summary>
                <pre className="max-h-[26rem] overflow-auto border-t border-line-soft p-4 font-mono text-[12px] leading-6 text-wrap text-cream/80">
                  {file.text}
                </pre>
              </details>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted">
            Back to{' '}
            <Link to={`/${page.section}/${page.slug}`} className="text-pulse underline decoration-pulse/30 underline-offset-4">
              the rendered version
            </Link>{' '}
            or{' '}
            <Link to="/seeds" className="text-pulse underline decoration-pulse/30 underline-offset-4">
              the seed scale
            </Link>
            . Section: {sectionMeta(page.section).label}.
          </p>
        </section>
      )}
    </div>
  )
}
