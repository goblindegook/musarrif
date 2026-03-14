import { useCallback, useMemo, useState } from 'preact/hooks'
import { buildVerbFromId, type DisplayVerb } from '../paradigms/verbs'
import { useLocalStorage } from './local-storage'

export function useFavourites() {
  const storage = useLocalStorage()

  const [favouriteIds, setFavouriteIds] = useState<readonly string[]>(() => {
    try {
      const parsed = JSON.parse(storage.getItem(`favouriteVerbs`) ?? '[]')
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })

  const isFavourite = useCallback((id: string) => favouriteIds.includes(id), [favouriteIds])

  const toggleFavourite = useCallback((id: string) => {
    setFavouriteIds((currentIds) => {
      const nextIds = currentIds.includes(id) ? currentIds.filter((currentId) => currentId !== id) : [...currentIds, id]
      storage.setItem(`favouriteVerbs`, JSON.stringify(nextIds))
      return nextIds
    })
  }, [])

  const favourites = useMemo(
    () =>
      favouriteIds
        .map((id) => buildVerbFromId(id))
        .filter((verb): verb is DisplayVerb => verb != null)
        .sort((a, b) => a.label.localeCompare(b.label, 'ar')),
    [favouriteIds],
  )

  return { favourites, isFavourite, toggleFavourite }
}
