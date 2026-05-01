import { useCallback, useState } from 'preact/hooks'
import type { DimensionStore } from '../exercises/dimensions'
import { enforcePrerequisites, sanitizeDimensionProfile } from '../exercises/dimensions'
import { type SrsStore, sanitizeRawSrsStore, sanitizeSrsStore } from '../exercises/srs'
import type { DiacriticsPreference } from '../paradigms/letters'
import { INITIAL_DIMENSION_STORE } from './useDimensionStore'
import type { Language } from './useI18n'

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
  const themePreference = parse<string>(storage.getItem('conjugator:theme')) ?? 'system'
  const favouriteVerbs = parse<string[]>(storage.getItem('conjugator:favouriteVerbs')) ?? []
  const trackedExercises = parse<ExerciseResult[]>(storage.getItem('conjugator:exercise:daily')) ?? []
  const srs = sanitizeSrsStore(parse<SrsStore>(storage.getItem('conjugator:srs')) ?? {})
  const parsedDimensions = parse<unknown>(storage.getItem('conjugator:dimensions'))
  const rawDimensions = parsedDimensions != null && typeof parsedDimensions === 'object' ? parsedDimensions : {}
  const baseDimensions = { ...INITIAL_DIMENSION_STORE, ...rawDimensions } as DimensionStore

  return {
    version: 1,
    settings: { language, diacriticsPreference, themePreference },
    favouriteVerbs,
    trackedExercises,
    srs,
    dimensions: {
      ...baseDimensions,
      profile: enforcePrerequisites(sanitizeDimensionProfile(baseDimensions.profile, INITIAL_DIMENSION_STORE.profile)),
    },
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
  const themePreference = ['light', 'dark', 'system'].includes(settings.themePreference as string)
    ? settings.themePreference
    : 'system'

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

  const srs = sanitizeRawSrsStore(payload.srs)

  // Clamp stale imported levels to current maxima; always reset windows on import.
  const payloadDimensions =
    payload.dimensions != null && typeof payload.dimensions === 'object' ? payload.dimensions : undefined
  const rawImportedProfile =
    payloadDimensions != null && 'profile' in payloadDimensions ? payloadDimensions.profile : undefined
  const dimensionsProfile = enforcePrerequisites(
    sanitizeDimensionProfile(rawImportedProfile, INITIAL_DIMENSION_STORE.profile),
  )

  const storage = window.localStorage
  storage.setItem('conjugator:language', JSON.stringify(language))
  storage.setItem('conjugator:diacriticsPreference', JSON.stringify(diacriticsPreference))
  storage.setItem('conjugator:theme', JSON.stringify(themePreference))
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
