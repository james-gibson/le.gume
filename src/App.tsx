import { Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Layout } from './components/Layout'
import { SECTIONS, getPage, type SectionId } from './lib/content'
import { Colour } from './pages/Colour'
import { Design } from './pages/Design'
import { DocPage } from './pages/DocPage'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { SectionIndex } from './pages/SectionIndex'

function isSection(value: string | undefined): value is SectionId {
  return !!value && SECTIONS.some((s) => s.id === value)
}

function SectionRoute() {
  const { section } = useParams()
  if (!isSection(section)) return <NotFound />
  return <SectionIndex section={section} />
}

function PageRoute() {
  const { section, slug } = useParams()
  const page = isSection(section) && slug ? getPage(section, slug) : undefined
  if (!page) return <NotFound />
  return <DocPage page={page} />
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="design" element={<Design />} />
        <Route path="palette" element={<Colour />} />
        <Route path="docs/index" element={<Navigate to="/docs" replace />} />
        <Route path=":section" element={<SectionRoute />} />
        <Route path=":section/:slug" element={<PageRoute />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
