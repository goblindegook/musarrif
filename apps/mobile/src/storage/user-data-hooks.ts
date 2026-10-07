import { useMemo } from 'react'
import type { DiacriticsPreference } from '../../../../src/paradigms/tokens'
import { readDailyActivity, readDimensionStore, readSrsStore } from './exercise-data'
import { useUserDataSelector, useUserDataValue } from './UserDataProvider'
import { recordsWithPrefix, shallowEqualRecords } from './UserDataStore'

export function useDiacriticsPreference(): DiacriticsPreference {
  const saved = useUserDataValue('setting:diacriticsPreference')
  return saved === 'all' || saved === 'none' ? saved : 'some'
}

export function useSpeechVoice(): string | undefined {
  const saved = useUserDataValue('local:arabicTtsVoice')
  return typeof saved === 'string' ? saved : undefined
}

export function useFavouriteVerbIDs(): ReadonlySet<string> {
  const favourites = useUserDataSelector((values) => recordsWithPrefix(values, 'favorite:'), shallowEqualRecords)
  return useMemo(
    () =>
      new Set(
        Object.entries(favourites).flatMap(([key, value]) => (value === true ? [key.slice('favorite:'.length)] : [])),
      ),
    [favourites],
  )
}

export function useSrsStore() {
  const cards = useUserDataSelector((values) => recordsWithPrefix(values, 'srs:'), shallowEqualRecords)
  return useMemo(() => readSrsStore(cards), [cards])
}

export function useDailyActivity() {
  const days = useUserDataSelector((values) => recordsWithPrefix(values, 'exercise:daily:'), shallowEqualRecords)
  return useMemo(() => readDailyActivity(days), [days])
}

export function useDimensionStore() {
  const stored = useUserDataValue('dimension:store')
  return useMemo(() => readDimensionStore({ 'dimension:store': stored }), [stored])
}
