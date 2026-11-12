import { NavLink } from 'react-router-dom'
import { SECTIONS } from '../lib/content'

const linkBase =
  'rounded-lg px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-cream'
const linkActive = 'bg-surface-2 text-cream'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <NavLink to="/" className="group flex items-center gap-2.5" aria-label="le.gume — home">
          <span className="relative grid h-7 w-7 place-items-center rounded-lg border border-line bg-surface">
            <span className="h-2 w-2 rounded-full bg-pulse" />
            <span className="absolute -right-0.5 -bottom-0.5 h-1.5 w-1.5 rounded-full bg-violet" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-cream">
            le<span className="text-pulse">.</span>gume
          </span>
        </NavLink>

        <nav aria-label="Sections" className="ml-2 flex flex-1 items-center gap-1 overflow-x-auto">
          {SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              to={`/${section.id}`}
              className={({ isActive }) => `${linkBase} shrink-0 ${isActive ? linkActive : ''}`}
            >
              {section.label}
            </NavLink>
          ))}
          <NavLink
            to="/design"
            className={({ isActive }) => `${linkBase} shrink-0 ${isActive ? linkActive : ''}`}
          >
            Design
          </NavLink>
        </nav>

        <a
          href="https://github.com/james-gibson/le.gume"
          target="_blank"
          rel="noreferrer noopener"
          className="hidden shrink-0 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-pulse/50 hover:text-cream sm:block"
        >
          Source
        </a>
      </div>
    </header>
  )
}
