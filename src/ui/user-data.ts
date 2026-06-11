import * as v from 'valibot'
import {
  DEFAULT_DIMENSION_PROFILE,
  DEFAULT_DIMENSION_WINDOWS,
  type DimensionStore,
  DimensionStore as DimensionStoreSchema,
  parseDimensionStore,
} from '../exercises/dimensions'
import { parseSrsStore, type SrsStore, SrsStore as SrsStoreSchema } from '../exercises/srs'
import type { DiacriticsPreference } from '../paradigms/tokens'
import type { Language } from './hooks/useI18n'
import { parseTrackedExercises, type SerializedDailyActivity, SerializedTrackedExercises } from './hooks/useStats'
import type { ThemePreference } from './hooks/useTheme'

export const USER_DATA_MIME_TYPE = 'application/vnd.musarrif+json'

export type LaunchConsumer = (params: { files: readonly FileSystemFileHandle[] }) => void | Promise<void>

export function registerFileDragDropHandler() {
  const controller = new AbortController()
  const { signal } = controller
  document.addEventListener('dragover', (e) => e.preventDefault(), { signal })
  document.addEventListener(
    'drop',
    async (e) => {
      e.preventDefault()
      for (const file of Array.from(e.dataTransfer?.files ?? [])) {
        if (file.name.endsWith('.musarrif') || file.type === USER_DATA_MIME_TYPE) {
          document.dispatchEvent(new CustomEvent('musarrif:pending-import', { detail: await file.text() }))
        }
      }
    },
    { signal },
  )
  return () => controller.abort()
}

export function registerTauriFileOpenHandler() {
  if (!('__TAURI_INTERNALS__' in window)) return
  let unlisten: (() => void) | undefined
  import('@tauri-apps/api/event')
    .then(({ listen }) =>
      listen<string>('import-user-data', (event) => {
        document.dispatchEvent(new CustomEvent('musarrif:pending-import', { detail: event.payload }))
      }),
    )
    .then((fn) => {
      unlisten = fn
    })
  return () => unlisten?.()
}

export function registerUserDataFileLaunchHandler() {
  const launchQueue = (window as Window & { launchQueue?: { setConsumer: (consumer: LaunchConsumer) => void } })
    .launchQueue
  if (launchQueue == null) return

  launchQueue.setConsumer(async ({ files }) => {
    for (const fileHandle of files) {
      const file = await fileHandle.getFile()
      if (file.name.endsWith('.musarrif') || file.type === USER_DATA_MIME_TYPE) {
        if (importUserData(await file.text())) window.location.reload()
      }
    }
  })
}

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
    trackedExercises: v.optional(SerializedTrackedExercises),
    srs: v.optional(SrsStoreSchema),
    dimensions: v.optional(DimensionStoreSchema),
  }),
  v.minEntries(1),
  v.transform((payload) => ({
    ...payload,
    settings: payload.settings ?? v.parse(Settings, {}),
    trackedExercises: payload.trackedExercises ?? v.parse(SerializedTrackedExercises, undefined),
    srs: payload.srs ?? v.parse(SrsStoreSchema, undefined),
    dimensions: payload.dimensions ?? v.parse(DimensionStoreSchema, undefined),
  })),
)

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
    dimensions: load<DimensionStore>(
      'conjugator:dimensions',
      { profile: DEFAULT_DIMENSION_PROFILE, windows: DEFAULT_DIMENSION_WINDOWS },
      parseDimensionStore,
    ),
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
