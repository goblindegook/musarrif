import { useCallback, useState } from 'preact/hooks'
import type { Difficulty } from '../exercises/difficulty'
import type { DiacriticsPreference } from '../paradigms/letters'
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
  const exerciseDifficulty = parse<Difficulty>(storage.getItem('conjugator:exerciseDifficulty')) ?? 'easy'
  const favouriteVerbs = parse<string[]>(storage.getItem('conjugator:favouriteVerbs')) ?? []
  const trackedExercises = parse<ExerciseResult[]>(storage.getItem('conjugator:exercise:daily')) ?? []

  return {
    version: 1,
    settings: { language, diacriticsPreference, exerciseDifficulty },
    favouriteVerbs,
    trackedExercises,
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

  const exerciseDifficulty = ['easy', 'medium', 'hard'].includes(settings.exerciseDifficulty as string)
    ? settings.exerciseDifficulty
    : 'easy'

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

  const storage = window.localStorage

  storage.setItem('conjugator:language', JSON.stringify(language))
  storage.setItem('conjugator:diacriticsPreference', JSON.stringify(diacriticsPreference))
  storage.setItem('conjugator:exerciseDifficulty', JSON.stringify(exerciseDifficulty))
  storage.setItem('conjugator:favouriteVerbs', JSON.stringify(favouriteVerbs))
  storage.setItem('conjugator:exercise:daily', JSON.stringify(trackedExercises))

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
