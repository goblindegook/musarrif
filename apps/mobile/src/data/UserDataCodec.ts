import * as v from 'valibot'
import { DimensionStore as DimensionStoreSchema, parseDimensionStore } from '../../../../src/exercises/dimensions'
import { SrsStore as SrsStoreSchema } from '../../../../src/exercises/srs'
import { readSrsStore } from '../storage/exercise-data'
import {
  isRecord,
  type UserDataKey,
  type UserDataSnapshot,
  type UserDataValue,
  type ValidatedUserDataSnapshot,
} from '../storage/schema'

const NonNegativeInteger = v.fallback(v.pipe(v.number(), v.integer(), v.minValue(0)), 0)
const DailyActivity = v.object({
  date: v.pipe(v.string(), v.isoDate()),
  correct: NonNegativeInteger,
  incorrect: NonNegativeInteger,
  passed: NonNegativeInteger,
})
const TrackedExercises = v.pipe(
  v.fallback(v.array(v.fallback(v.union([DailyActivity, v.null()]), null)), []),
  v.transform((entries) => entries.filter((entry): entry is v.InferOutput<typeof DailyActivity> => entry != null)),
)

const Settings = v.object({
  language: v.optional(v.fallback(v.picklist(['en', 'it', 'pt', 'ar']), 'en'), 'en'),
  diacriticsPreference: v.optional(v.fallback(v.picklist(['all', 'some', 'none']), 'some'), 'some'),
  themePreference: v.optional(v.fallback(v.picklist(['light', 'dark', 'system']), 'system'), 'system'),
})

const ImportPayload = v.pipe(
  v.object({
    version: v.optional(v.number()),
    settings: v.optional(Settings),
    favouriteVerbs: v.optional(v.fallback(v.array(v.string()), [])),
    trackedExercises: v.optional(TrackedExercises),
    srs: v.optional(SrsStoreSchema),
    dimensions: v.optional(DimensionStoreSchema),
  }),
  v.minEntries(1),
  v.transform((payload) => ({
    settings: payload.settings ?? v.parse(Settings, {}),
    favouriteVerbs: payload.favouriteVerbs ?? [],
    trackedExercises: payload.trackedExercises ?? v.parse(TrackedExercises, undefined),
    srs: payload.srs ?? v.parse(SrsStoreSchema, undefined),
    dimensions: payload.dimensions ?? v.parse(DimensionStoreSchema, undefined),
  })),
)

export function decodeUserDataExport(raw: string): ValidatedUserDataSnapshot | undefined {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw) as unknown
  } catch {
    return undefined
  }

  const result = v.safeParse(ImportPayload, parsed)
  if (!result.success) return undefined

  const { settings, favouriteVerbs, trackedExercises, srs, dimensions } = result.output
  const values: Partial<Record<UserDataKey, UserDataValue>> = {
    'setting:language': settings.language,
    'setting:diacriticsPreference': settings.diacriticsPreference,
    'setting:theme': settings.themePreference,
    'dimension:store': dimensions,
  }

  for (const verbID of favouriteVerbs) values[`favorite:${verbID}`] = true
  for (const activity of trackedExercises) {
    values[`exercise:daily:${activity.date}`] = activity
  }
  for (const [cardKey, state] of Object.entries(srs)) values[`srs:${cardKey}`] = state

  return { values }
}

export function encodeUserDataExport(values: UserDataSnapshot['values']): string {
  const settings = v.parse(Settings, {
    language: values['setting:language'] ?? 'en',
    diacriticsPreference: values['setting:diacriticsPreference'] ?? 'some',
    themePreference: values['setting:theme'] ?? 'system',
  })
  const favouriteVerbs = Object.keys(values)
    .filter((key) => key.startsWith('favorite:') && values[key as UserDataKey] === true)
    .map((key) => key.slice('favorite:'.length))
    .sort()
  const trackedExercises = Object.entries(values)
    .flatMap(([key, value]) => {
      if (!key.startsWith('exercise:daily:') || !isRecord(value)) return []
      const date = key.slice('exercise:daily:'.length)
      const entry = v.safeParse(DailyActivity, { ...value, date })
      return entry.success ? [entry.output] : []
    })
    .sort((left, right) => left.date.localeCompare(right.date))

  const srs = readSrsStore(values)
  const dimensions = parseDimensionStore(values['dimension:store'])

  return JSON.stringify(
    {
      version: 1,
      settings,
      favouriteVerbs,
      trackedExercises,
      srs,
      dimensions,
    },
    null,
    2,
  )
}
