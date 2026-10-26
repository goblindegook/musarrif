import * as v from 'valibot'
import { DimensionStore as DimensionStoreSchema, parseDimensionStore } from '../../../../src/exercises/dimensions'
import { mergeExerciseData } from '../../../../src/exercises/merge'
import { SrsStore as SrsStoreSchema } from '../../../../src/exercises/srs'
import { SerializedDailyActivity, SerializedTrackedExercises } from '../../../../src/exercises/stats'
import { readSrsStore } from '../storage/exercise-data'
import {
  isRecord,
  type UserDataKey,
  type UserDataSnapshot,
  type UserDataValue,
  type ValidatedUserDataSnapshot,
} from '../storage/schema'

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
    trackedExercises: v.optional(SerializedTrackedExercises),
    srs: v.optional(SrsStoreSchema),
    dimensions: v.optional(DimensionStoreSchema),
  }),
  v.minEntries(1),
  v.transform((payload) => ({
    settings: payload.settings ?? v.parse(Settings, {}),
    favouriteVerbs: payload.favouriteVerbs ?? [],
    trackedExercises: payload.trackedExercises ?? v.parse(SerializedTrackedExercises, undefined),
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
  return result.success ? toSnapshot(result.output) : undefined
}

/** Device-only values stay as they are, since a backup never carries them. */
export function mergeUserDataSnapshot(
  local: UserDataSnapshot['values'],
  incoming: ValidatedUserDataSnapshot,
): ValidatedUserDataSnapshot {
  const existing = v.parse(ImportPayload, JSON.parse(encodeUserDataExport(local)))
  const imported = v.parse(ImportPayload, JSON.parse(encodeUserDataExport(incoming.values)))
  const merged = toSnapshot({
    ...imported,
    ...mergeExerciseData(existing, imported),
    favouriteVerbs: [...new Set([...existing.favouriteVerbs, ...imported.favouriteVerbs])],
  })
  return { values: { ...local, ...merged.values } }
}

function toSnapshot({
  settings,
  favouriteVerbs,
  trackedExercises,
  srs,
  dimensions,
}: v.InferOutput<typeof ImportPayload>): ValidatedUserDataSnapshot {
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
      const entry = v.safeParse(SerializedDailyActivity, { ...value, date })
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
