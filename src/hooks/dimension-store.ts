import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import {
  type DimensionKey,
  type DimensionProfile,
  type DimensionStore,
  type DimensionUnlock,
  enforcePrerequisites,
  getDimensionUnlocks,
  promoteDimensions,
  recordDimensionAnswer,
} from '../exercises/dimensions'
import { useLocalStorage } from './local-storage'

type RecordDimensionAnswer = (dimensions: readonly DimensionKey[], isCorrect: boolean) => DimensionProfile

export const INITIAL_DIMENSION_PROFILE: DimensionProfile = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
}

export const INITIAL_DIMENSION_STORE: DimensionStore = {
  profile: INITIAL_DIMENSION_PROFILE,
  windows: { tenses: [], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
}

function isSameProfile(a: DimensionProfile, b: DimensionProfile): boolean {
  return (
    a.tenses === b.tenses &&
    a.pronouns === b.pronouns &&
    a.diacritics === b.diacritics &&
    a.forms === b.forms &&
    a.rootTypes === b.rootTypes &&
    a.nominals === b.nominals
  )
}

export function useDimensionStore(): [DimensionProfile, readonly DimensionUnlock[], RecordDimensionAnswer, () => void] {
  const [rawStore, setRawStore] = useLocalStorage<DimensionStore>('dimensions', INITIAL_DIMENSION_STORE)
  const [dimensionUnlocks, setDimensionUnlocks] = useState<readonly DimensionUnlock[]>([])
  const profile = useMemo(() => enforcePrerequisites(rawStore.profile), [rawStore.profile])
  const store = useMemo(
    () => (isSameProfile(rawStore.profile, profile) ? rawStore : { ...rawStore, profile }),
    [rawStore, profile],
  )

  useEffect(() => {
    if (isSameProfile(rawStore.profile, profile)) return
    setRawStore({ ...rawStore, profile })
  }, [rawStore, profile, setRawStore])

  const recordAnswer = useCallback<RecordDimensionAnswer>(
    (dimensions, isCorrect) => {
      const next = promoteDimensions(recordDimensionAnswer(store, dimensions, isCorrect), isCorrect)
      setDimensionUnlocks(getDimensionUnlocks(store.profile, next.profile))
      setRawStore(next)
      return next.profile
    },
    [setRawStore, store],
  )

  const clearUnlocks = useCallback(() => {
    setDimensionUnlocks([])
  }, [])

  return [store.profile, dimensionUnlocks, recordAnswer, clearUnlocks]
}
