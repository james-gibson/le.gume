import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/**
 * Era: 2026, or 1996.
 *
 * The "it's just a website" rung is not a mood, it is a rendering mode. Turning
 * it on applies a reset in the opposite direction — strip the modern layer, let
 * the browser's own stylesheet show through — and the page has to survive that.
 * If it does not, it was not documentation.
 *
 * It is a stored toggle rather than a route, because the rung that used to
 * demonstrate it now renders as a file instead — see lib/fileview.tsx.
 */
export type Era = 'modern' | 'retro'

const STORAGE_KEY = 'legume.era'

type EraState = {
  era: Era
  setEra: (era: Era) => void
  /** true when this page decided on its own */
  automatic: boolean
}

const EraContext = createContext<EraState | null>(null)

export function EraProvider({ children }: { children: ReactNode }) {
  const [explicit, setExplicit] = useState<Era | null>(() => {
    if (typeof window === 'undefined') return null
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'retro' || stored === 'modern' ? stored : null
  })

  const automatic = false
  const era: Era = explicit ?? 'modern'

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
