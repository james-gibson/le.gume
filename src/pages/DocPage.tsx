import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { neighbours, sectionMeta, type Page } from '../lib/content'
import { markdownComponents } from '../lib/markdown'
import { FileView } from '../components/FileView'
import { useFileView } from '../lib/fileview'
import { SeedPanel } from '../components/SeedPanel'
import { usePageMeta } from '../lib/usePageMeta'
import { HouseLeader } from '../components/HouseLeader'

export function DocPage({ page }: { page: Page }) {
  const meta = sectionMeta(page.section)
  const { prev, next } = neighbours(page)
  usePageMeta(page.title, page.description)
  const { view } = useFileView()

  if (view === 'file') return <FileView page={page} />

  const editUrl = `https://github.com/james-gibson/le.gume/edit/main/src/content/${page.path}.md`

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,1fr)_220px]">
      <article className="min-w-0">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted">
          <Link to={`/${page.section}`} className="hover:text-cream">
            {meta.label}
          </Link>
          <span className="text-muted/40">/</span>
          <span className="text-cream/80">{page.title}</span>
        </nav>

        <header className="mt-5 border-b border-line-soft pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
            {page.title}
          </h1>
          {page.description && (
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted">{page.description}</p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted/70">
            {page.updated && <span className="font-mono">updated {page.updated}</span>}
            {page.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line px-2 py-0.5">
                {tag}
              </span>
            ))}
            <a
              href={editUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="ml-auto underline decoration-line underline-offset-4 hover:text-cream"
            >
              Edit this page
            </a>
          </div>
        </header>

        {page.section === 'seeds' && <SeedPanel seedId={page.slug} />}

        {page.path === 'factors/sla-variables' && <HouseLeader />}

        <div className="pb-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {/* The body opens with "# Title", which the header above already
                renders as the page's <h1>. Rendering both gives every page two
                h1s and an outline that starts twice. */}
            {page.body.replace(/^\s*#\s+[^\n]*\n/, '')}
          </ReactMarkdown>
        </div>

        <nav className="mt-12 grid gap-3 border-t border-line-soft pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/${prev.section}/${prev.slug}`}
              className="group rounded-xl border border-line p-4 transition-colors hover:border-pulse/40 hover:bg-surface"
            >
              <span className="text-xs text-muted">Previous</span>
              <span className="mt-1 block text-sm text-cream group-hover:text-pulse">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              to={`/${next.section}/${next.slug}`}
              className="group rounded-xl border border-line p-4 text-right transition-colors hover:border-pulse/40 hover:bg-surface"
            >
              <span className="text-xs text-muted">Next</span>
              <span className="mt-1 block text-sm text-cream group-hover:text-pulse">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      {page.headings.length > 0 && (
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">On this page</p>
            <ul className="mt-3 space-y-2 border-l border-line pl-4">
              {page.headings.map((heading) => (
                <li key={heading.id} className={heading.depth === 3 ? 'pl-3' : ''}>
                  <a
                    href={`#${heading.id}`}
                    className="text-sm text-muted transition-colors hover:text-cream"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </div>
  )
}
