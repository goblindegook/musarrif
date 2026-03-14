import { useCallback, useMemo, useState } from 'preact/hooks'
import { type DisplayVerb, getVerbById } from '../paradigms/verbs'
import { useLocalStorage } from './local-storage'

const STORAGE_KEY = `conjugator:recentVerbs`

export function useRecent() {
  const storage = useLocalStorage()

  const [recentIds, setRecentIds] = useState<readonly string[]>(() => {
    try {
      const parsed = JSON.parse(storage.getItem(STORAGE_KEY) ?? '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const addRecent = useCallback((id: string) => {
    setRecentIds((currentIds) => {
      const nextIds = [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 11)
      storage.setItem(STORAGE_KEY, JSON.stringify(nextIds))
      return nextIds
    })
  }, [])

  const recents = useMemo(
    () => recentIds.map((id) => getVerbById(id)).filter((verb): verb is DisplayVerb => verb != null),
    [recentIds],
  )

  return { recents, addRecent }
}
