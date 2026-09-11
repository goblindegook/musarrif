import { useCallback, useMemo } from 'preact/hooks'
import { type DisplayVerb, getVerbById } from '../../paradigms/verbs'
import { useLocalStorage } from './useLocalStorage'

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
        .map((id) => getVerbById(id))
        .filter((verb): verb is DisplayVerb => verb != null)
        .sort((a, b) => a.lemma.localeCompare(b.lemma, 'ar')),
    [verbIds],
  )

  return { favourites, toggleFavourite, isFavourite }
}
