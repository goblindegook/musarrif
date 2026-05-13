import * as v from 'valibot'
import {
  DEFAULT_DIMENSION_PROFILE,
  DEFAULT_DIMENSION_WINDOWS,
  type DimensionStore,
  DimensionStore as DimensionStoreSchema,
  parseDimensionStore,
} from '../exercises/dimensions'
import { parseSrsStore, type SrsStore, SrsStore as SrsStoreSchema } from '../exercises/srs'
import {
  parseTrackedExercises,
  type SerializedDailyActivity,
  TrackedExercises as TrackedExercisesSchema,
} from '../exercises/stats'
import type { DiacriticsPreference } from '../paradigms/letters'
import type { Language } from './hooks/useI18n'
import type { ThemePreference } from './hooks/useTheme'

type Deserialize<T> = (raw: unknown, fallback: Readonly<T>) => Readonly<T>

const Settings = v.object({
  language: v.optional(v.fallback(v.picklist(['en', 'it', 'pt', 'ar']), 'en'), 'en'),
  diacriticsPreference: v.optional(v.fallback(v.picklist(['all', 'some', 'none']), 'some'), 'some'),
  themePreference: v.optional(v.fallback(v.picklist(['light', 'dark', 'system']), 'system'), 'system'),
})

const ImportUserData = v.pipe(
  v.object({
    version: v.optional(v.number()),
    settings: v.optional(Settings),
    favouriteVerbs: v.optional(v.fallback(v.array(v.string()), [])),
    trackedExercises: v.optional(TrackedExercisesSchema),
    srs: v.optional(SrsStoreSchema),
    dimensions: v.optional(DimensionStoreSchema),
  }),
  v.minEntries(1),
  v.transform((payload) => ({
    ...payload,
    settings: payload.settings ?? v.parse(Settings, {}),
    trackedExercises: payload.trackedExercises ?? v.parse(TrackedExercisesSchema, undefined),
    srs: payload.srs ?? v.parse(SrsStoreSchema, undefined),
    dimensions: payload.dimensions ?? v.parse(DimensionStoreSchema, undefined),
  })),
)

const DEFAULT_DIMENSION_STORE = {
  profile: DEFAULT_DIMENSION_PROFILE,
  windows: DEFAULT_DIMENSION_WINDOWS,
}

export function getUserData() {
  return {
    version: 1,
    settings: {
      language: load<Language>('conjugator:language', 'en'),
      diacriticsPreference: load<DiacriticsPreference>('conjugator:diacriticsPreference', 'some'),
      themePreference: load<ThemePreference>('conjugator:theme', 'system'),
    },
    favouriteVerbs: load<string[]>('conjugator:favouriteVerbs', []),
    trackedExercises: load<SerializedDailyActivity[]>('conjugator:exercise:daily', [], parseTrackedExercises),
    srs: load<SrsStore>('conjugator:srs', {}, parseSrsStore),
    dimensions: load<DimensionStore>('conjugator:dimensions', DEFAULT_DIMENSION_STORE, parseDimensionStore),
  }
}

export function importUserData(raw: string): boolean {
  const payload = v.safeParse(ImportUserData, parse(raw, null))
  if (!payload.success) return false

  save('conjugator:language', payload.output.settings.language)
  save('conjugator:diacriticsPreference', payload.output.settings.diacriticsPreference)
  save('conjugator:theme', payload.output.settings.themePreference)
  save('conjugator:favouriteVerbs', payload.output.favouriteVerbs ?? [])
  save('conjugator:exercise:daily', payload.output.trackedExercises)
  save('conjugator:srs', payload.output.srs)
  save('conjugator:dimensions', payload.output.dimensions)

  return true
}

function parse<T>(raw: string | null, defaultValue: T): T {
  try {
    return JSON.parse(raw ?? '')
  } catch {
    return defaultValue
  }
}

function load<T>(key: string, defaultValue: T, deserialize?: Deserialize<T>): T {
  const parsed = parse<unknown>(window.localStorage.getItem(key), defaultValue)
  return deserialize == null ? (parsed as T) : deserialize(parsed, defaultValue)
}

function save<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
