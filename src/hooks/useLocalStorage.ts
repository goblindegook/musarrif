import { useCallback, useState } from 'preact/hooks'
import type { DimensionStore } from '../exercises/dimensions'
import { enforcePrerequisites, sanitizeDimensionProfile } from '../exercises/dimensions'
import { type SrsStore, sanitizeRawSrsStore } from '../exercises/srs'
import { type ExerciseResult, sanitizeTrackedExercises } from '../exercises/stats'
import type { DiacriticsPreference } from '../paradigms/letters'
import { INITIAL_DIMENSION_STORE } from './useDimensionStore'
import type { Language } from './useI18n'

type Updater<T> = T | ((current: T) => T)

export function getUserData() {
  const dimensionStore = {
    ...INITIAL_DIMENSION_STORE,
    ...load<DimensionStore>('conjugator:dimensions', INITIAL_DIMENSION_STORE),
  } as DimensionStore

  return {
    version: 1,
    settings: {
      language: load<Language>('conjugator:language', 'en'),
      diacriticsPreference: load<DiacriticsPreference>('conjugator:diacriticsPreference', 'some'),
      themePreference: load<string>('conjugator:theme', 'system'),
    },
    favouriteVerbs: load<string[]>('conjugator:favouriteVerbs', []),
    trackedExercises: load<ExerciseResult[]>('conjugator:exercise:daily', []),
    srs: load<SrsStore>('conjugator:srs', {}),
    dimensions: {
      ...dimensionStore,
      profile: enforcePrerequisites(sanitizeDimensionProfile(dimensionStore.profile, INITIAL_DIMENSION_STORE.profile)),
    },
  } as const
}

export function importUserData(raw: string): boolean {
  const payload = parse<Record<string, unknown>>(raw, {})
  if (Object.keys.length === 0) return false

  const settings =
    payload.settings != null && typeof payload.settings === 'object'
      ? (payload.settings as Record<string, unknown>)
      : payload

  const language = filterAllowed(settings.language, ['en', 'it', 'pt', 'ar'], 'en')
  const diacriticsPreference = filterAllowed(settings.diacriticsPreference, ['all', 'some', 'none'], 'some')
  const themePreference = filterAllowed(settings.themePreference, ['light', 'dark', 'system'], 'system')

  const favouriteVerbs = Array.isArray(payload.favouriteVerbs)
    ? payload.favouriteVerbs.filter((entry) => typeof entry === 'string')
    : []

  save('conjugator:language', language)
  save('conjugator:diacriticsPreference', diacriticsPreference)
  save('conjugator:theme', themePreference)
  save('conjugator:favouriteVerbs', favouriteVerbs)
  save('conjugator:exercise:daily', sanitizeTrackedExercises(payload.trackedExercises))
  save('conjugator:srs', sanitizeRawSrsStore(payload.srs))
  save('conjugator:dimensions', {
    profile: enforcePrerequisites(
      sanitizeDimensionProfile(
        payload.dimensions != null && typeof payload.dimensions === 'object' && 'profile' in payload.dimensions
          ? payload.dimensions.profile
          : undefined,
        INITIAL_DIMENSION_STORE.profile,
      ),
    ),
    windows: INITIAL_DIMENSION_STORE.windows,
  })

  return true
}

function parse<T>(raw: string | null, defaultValue: T): T {
  try {
    return JSON.parse(raw ?? '')
  } catch {
    return defaultValue
  }
}

function load<T>(key: string, defaultValue: T): T {
  return parse<T>(window.localStorage.getItem(key), defaultValue)
}

function save<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

function filterAllowed<T>(value: T, allowed: readonly T[], defaultValue: T): T {
  return allowed.includes(value) ? value : defaultValue
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
