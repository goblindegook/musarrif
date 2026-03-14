import { useCallback, useMemo } from 'preact/hooks'
import { buildVerbFromId, type DisplayVerb } from '../paradigms/verbs'
import { useLocalStorage } from './local-storage'

export function useFavourites() {
  const [verbIds, setVerbIds] = useLocalStorage<readonly string[]>('favouriteVerbs', [])

  const isFavourite = useCallback((id: string) => verbIds.includes(id), [verbIds])

  const toggleFavourite = useCallback(
    (toggledId: string) =>
      setVerbIds((current) =>
        current.includes(toggledId) ? current.filter((id) => id !== toggledId) : [...current, toggledId],
      ),
    [],
  )

  const favourites = useMemo(
    () =>
      verbIds
        .map((id) => buildVerbFromId(id))
        .filter((verb): verb is DisplayVerb => verb != null)
        .sort((a, b) => a.label.localeCompare(b.label, 'ar')),
    [verbIds],
  )

  return { favourites, toggleFavourite, isFavourite }
}
