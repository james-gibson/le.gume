import { Link } from 'react-router-dom'
import { AgentCta } from './AgentCta'
import { HiddenNote } from './HiddenNote'
import { PAGES, SECTIONS } from '../lib/content'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line/80 bg-surface/40">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-sm font-semibold text-cream">
            le<span className="text-pulse">.</span>gume
          </p>
          <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
            A documentation site that documents itself. Nothing here is hidden behind a
            build system you have to learn first.
          </p>
          <p className="mt-4 font-mono text-xs text-muted/70">{PAGES.length} pages · {SECTIONS.length} sections · 1 build</p>
        </div>

        {SECTIONS.slice(0, 3).map((section) => (
          <div key={section.id}>
            <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{section.label}</p>
            <ul className="mt-3 space-y-2">
              {PAGES.filter((p) => p.section === section.id)
                .slice(0, 4)
                .map((page) => (
                  <li key={page.path}>
                    <Link
                      to={`/${page.section}/${page.slug}`}
                      className="text-sm text-muted transition-colors hover:text-cream"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <HiddenNote title="this system is incorrect for taking notes on criminal enterprises">
          <p>
            There is no access control, no encryption at rest, no audit log that survives a clone, and
            no way to revoke a copy. A public repository is the opposite of a wiretap: everyone can
            read it, including the people you were writing about.
          </p>
          <p>
            If you are running a wire, use a system with a door. <em>The Wire</em> is a television
            programme; this is a static site.
          </p>
        </HiddenNote>
      </div>

      <AgentCta />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-line-soft px-5 py-5 text-xs text-muted/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          Built with React, Vite and Tailwind. Motion by{' '}
          <a
            href="https://fancy-ui.rama.app"
            target="_blank"
            rel="noreferrer noopener"
            className="text-muted underline decoration-line underline-offset-4 hover:text-cream"
          >
            fancy-ui
          </a>
          .
        </p>
        <p className="font-mono">
          <a
            href="https://github.com/james-gibson/le.gume"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-cream"
          >
            james-gibson/le.gume
          </a>{' '}
          · AGPL-3.0 ·{' '}
          <Link to="/design#handoff" className="hover:text-cream">
            take it with you
          </Link>
        </p>
      </div>
    </footer>
  )
}
