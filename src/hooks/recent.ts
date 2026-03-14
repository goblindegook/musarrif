import { useCallback, useMemo, useState } from 'preact/hooks'
import { type DisplayVerb, getVerbById } from '../paradigms/verbs'
import { useLocalStorage } from './local-storage'

export function useRecent() {
  const storage = useLocalStorage()

  const [recentIds, setRecentIds] = useState<readonly string[]>(() => {
    try {
      const parsed = JSON.parse(storage.getItem('recentVerbs') ?? '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const addRecent = useCallback((id: string) => {
    setRecentIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 11)
      storage.setItem('recentVerbs', JSON.stringify(nextIds))
      return nextIds
    })
  }, [])

  const recents = useMemo(
    () => recentIds.map((id) => getVerbById(id)).filter((verb): verb is DisplayVerb => verb != null),
    [recentIds],
  )

  return { recents, addRecent }
}
