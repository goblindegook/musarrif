import { useCallback, useState } from 'preact/hooks'
import type { DimensionProfile, DimensionStore } from '../exercises/dimensions'
import { enforcePrerequisites } from '../exercises/dimensions'
import { type CardState, type SrsStore, sanitizeSrsStore } from '../exercises/srs'
import type { DiacriticsPreference } from '../paradigms/letters'
import { INITIAL_DIMENSION_STORE } from './dimension-store'
import type { Language } from './i18n'

type Updater<T> = T | ((current: T) => T)

interface ExerciseResult {
  date: string
  correct: number
  incorrect: number
}

function parse<T>(raw: string | null): T | null {
  try {
    return JSON.parse(raw ?? '')
  } catch {
    return null
  }
}

export function getUserData() {
  const storage = window.localStorage
  const language = parse<Language>(storage.getItem('conjugator:language')) ?? 'en'
  const diacriticsPreference = parse<DiacriticsPreference>(storage.getItem('conjugator:diacriticsPreference')) ?? 'some'
  const favouriteVerbs = parse<string[]>(storage.getItem('conjugator:favouriteVerbs')) ?? []
  const trackedExercises = parse<ExerciseResult[]>(storage.getItem('conjugator:exercise:daily')) ?? []
  const srs = sanitizeSrsStore(parse<SrsStore>(storage.getItem('conjugator:srs')) ?? {})
  const rawDim = parse<DimensionStore>(storage.getItem('conjugator:dimensions')) ?? INITIAL_DIMENSION_STORE
  const dimensions: DimensionStore = { ...rawDim, profile: enforcePrerequisites(rawDim.profile) }

  return {
    version: 1,
    settings: { language, diacriticsPreference },
    favouriteVerbs,
    trackedExercises,
    srs,
    dimensions,
  } as const
}

export function importUserData(raw: string): boolean {
  const payload = parse<Record<string, unknown>>(raw)
  if (payload == null || typeof payload !== 'object') return false

  const settings =
    payload.settings != null && typeof payload.settings === 'object'
      ? (payload.settings as Record<string, unknown>)
      : payload

  const language = ['en', 'it', 'pt', 'ar'].includes(settings.language as string) ? settings.language : 'en'
  const diacriticsPreference = ['all', 'some', 'none'].includes(settings.diacriticsPreference as string)
    ? settings.diacriticsPreference
    : 'some'

  const favouriteVerbs = Array.isArray(payload.favouriteVerbs)
    ? payload.favouriteVerbs.filter((entry) => typeof entry === 'string')
    : []

  const trackedExercises = Array.isArray(payload.trackedExercises)
    ? payload.trackedExercises.filter(
        (entry): entry is ExerciseResult =>
          entry != null &&
          typeof entry === 'object' &&
          typeof entry.date === 'string' &&
          Number.isFinite(entry.correct) &&
          Number.isFinite(entry.incorrect),
      )
    : []

  const rawSrs = payload.srs != null && typeof payload.srs === 'object' ? payload.srs : {}
  const unboundedSrs: SrsStore = {}
  for (const [key, rawVal] of Object.entries(rawSrs)) {
    const val = rawVal as CardState | null
    if (
      typeof key === 'string' &&
      key.length &&
      val &&
      Number.isFinite(val.interval) &&
      val.interval > 0 &&
      Number.isFinite(val.ef) &&
      val.ef >= 1.3 &&
      Number.isInteger(val.repetitions) &&
      val.repetitions >= 0 &&
      /^\d{4}-\d{2}-\d{2}$/.test(String(val.dueDate))
    ) {
      unboundedSrs[key] = val
    }
  }
  const srs = sanitizeSrsStore(unboundedSrs)

  // Validate dimensions profile; always reset windows on import
  const rawDimensions = payload.dimensions
  let dimensionsProfile = INITIAL_DIMENSION_STORE.profile
  if (
    rawDimensions != null &&
    typeof rawDimensions === 'object' &&
    'profile' in rawDimensions &&
    rawDimensions.profile != null &&
    typeof rawDimensions.profile === 'object'
  ) {
    const p = rawDimensions.profile as Record<string, unknown>
    if (
      [0, 1, 2, 3, 4].includes(p.tenses as number) &&
      [0, 1, 2, 3].includes(p.pronouns as number) &&
      [0, 1, 2].includes(p.diacritics as number) &&
      [0, 1, 2, 3].includes(p.forms as number) &&
      [0, 1, 2, 3].includes(p.rootTypes as number) &&
      [0, 1, 2].includes(p.nominals as number)
    ) {
      dimensionsProfile = p as DimensionProfile
    }
  }

  const storage = window.localStorage
  storage.setItem('conjugator:language', JSON.stringify(language))
  storage.setItem('conjugator:diacriticsPreference', JSON.stringify(diacriticsPreference))
  storage.setItem('conjugator:favouriteVerbs', JSON.stringify(favouriteVerbs))
  storage.setItem('conjugator:exercise:daily', JSON.stringify(trackedExercises))
  storage.setItem('conjugator:srs', JSON.stringify(srs))
  storage.setItem(
    'conjugator:dimensions',
    JSON.stringify({
      profile: dimensionsProfile,
      windows: INITIAL_DIMENSION_STORE.windows,
    }),
  )

  return true
}

export function useLocalStorage<T>(key: string, fallback: T): [T, (updater: Updater<T>) => void, () => T] {
  const read = useCallback((): T => {
    const raw = window?.localStorage?.getItem?.(`conjugator:${key}`) ?? null
    if (raw == null) return fallback
    try {
      return JSON.parse(raw) ?? fallback
    } catch {
      return raw as unknown as T
    }
  }, [fallback, key])

  const [value, setValue] = useState<T>(() => read())

  const update = useCallback(
    (updater: Updater<T>) => {
      setValue((current) => {
        const next = typeof updater === 'function' ? (updater as (current: T) => T)(current) : updater
        window?.localStorage?.setItem?.(`conjugator:${key}`, JSON.stringify(next))
        return next
      })
    },
    [key],
  )

  const refetch = useCallback(() => {
    const next = read()
    setValue(next)
    return next
  }, [read])

  return [value, update, refetch]
}
