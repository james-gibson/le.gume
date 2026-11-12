import { useEffect } from 'react'

const SITE = 'le.gume'

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = !title ? SITE : `${title} · ${SITE}`
    if (description) {
      const tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])
}
