import { useLayoutEffect } from 'preact/hooks'

export function useDocumentTitle(title: string): void {
  useLayoutEffect(() => {
    window.document.title = title
  }, [title])
}
