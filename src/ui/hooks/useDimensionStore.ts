import { useCallback, useMemo, useState } from 'preact/hooks'
import {
  DEFAULT_DIMENSION_PROFILE,
  DEFAULT_DIMENSION_WINDOWS,
  type DimensionChange,
  type DimensionKey,
  type DimensionProfile,
  type DimensionStore,
  getDimensionChanges,
  normalizeDimensionStore,
  parseDimensionStore,
  promoteDimensions,
  recordDimensionAnswer,
} from '../../exercises/dimensions'
import { useLocalStorage } from './useLocalStorage'

type RecordDimensionAnswer = (dimensions: readonly DimensionKey[], isCorrect: boolean) => DimensionProfile

export function useDimensionStore(): [DimensionProfile, readonly DimensionChange[], RecordDimensionAnswer, () => void] {
  const [rawStore, setRawStore] = useLocalStorage<DimensionStore>(
    'dimensions',
    {
      profile: DEFAULT_DIMENSION_PROFILE,
      windows: DEFAULT_DIMENSION_WINDOWS,
    },
    parseDimensionStore,
  )
  const [dimensionChanges, setDimensionChanges] = useState<readonly DimensionChange[]>([])
  const store = useMemo(() => normalizeDimensionStore(rawStore), [rawStore])

  const recordAnswer = useCallback<RecordDimensionAnswer>(
    (dimensions, isCorrect) => {
      const next = promoteDimensions(recordDimensionAnswer(store, dimensions, isCorrect), isCorrect)
      setDimensionChanges(getDimensionChanges(store.profile, next.profile))
      setRawStore(next)
      return next.profile
    },
    [setRawStore, store],
  )

  const clearChanges = useCallback(() => {
    setDimensionChanges([])
  }, [])

  return [store.profile, dimensionChanges, recordAnswer, clearChanges]
}
