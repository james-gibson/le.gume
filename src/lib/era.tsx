import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Era: 2026, or 1996.
 *
 * The "it's just a website" rung is not a mood, it is a rendering mode. Turning
 * it on applies a reset in the opposite direction — strip the modern layer, let
 * the browser's own stylesheet show through — and the page has to survive that.
 * If it does not, it was not documentation.
 *
 * The mode is automatic on the rung −1 seed page, because a page about being
 * just a website should not be wearing a gradient while it says so. Elsewhere it
 * is a stored toggle, so the joke is available anywhere and does not follow you
 * home.
 */
export type Era = 'modern' | 'retro'

const STORAGE_KEY = 'legume.era'
const RETRO_ROUTE = '/seeds/just-a-website'

type EraState = {
  era: Era
  setEra: (era: Era) => void
  /** true when this page decided on its own */
  automatic: boolean
}

const EraContext = createContext<EraState | null>(null)

export function EraProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  const [explicit, setExplicit] = useState<Era | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'retro' || stored === 'modern' ? stored : null
  })

  const automatic = !explicit && pathname.replace(/\/$/, '') === RETRO_ROUTE
  const era: Era = explicit ?? (automatic ? 'retro' : 'modern')

  useEffect(() => {
    document.documentElement.dataset.era = era
    return () => {
      delete document.documentElement.dataset.era
    }
  }, [era])

  const setEra = useCallback((next: Era) => {
    setExplicit(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Storage disabled: the choice still applies to this session.
    }
  }, [])

  const value = useMemo(() => ({ era, setEra, automatic }), [era, setEra, automatic])
  return <EraContext.Provider value={value}>{children}</EraContext.Provider>
}

export function useEra(): EraState {
  const state = useContext(EraContext)
  if (!state) throw new Error('useEra must be used inside <EraProvider>')
  return state
}
