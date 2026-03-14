import { useCallback, useMemo } from 'preact/hooks'
import { type DisplayVerb, getVerbById } from '../paradigms/verbs'
import { useLocalStorage } from './local-storage'

export function useRecent() {
  const [verbIds, setVerbIds] = useLocalStorage<readonly string[]>('recentVerbs', [])

  const addRecent = useCallback((id: string) => {
    setVerbIds((currentIds) => [id, ...currentIds.filter((currentId) => currentId !== id)].slice(0, 11))
  }, [])

  const recents = useMemo(
    () => verbIds.map((id) => getVerbById(id)).filter((verb): verb is DisplayVerb => verb != null),
    [verbIds],
  )

  return { recents, addRecent }
}
