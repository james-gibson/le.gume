import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { EraProvider } from '../lib/era'
import { MotionProvider } from '../lib/motion'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return (
    <EraProvider>
      <MotionProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      </MotionProvider>
    </EraProvider>
  )
}
