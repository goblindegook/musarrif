const STORAGE_PREFIX = 'conjugator:'

export const LANGUAGE_STORAGE_KEY = `${STORAGE_PREFIX}language`
export const DIACRITICS_STORAGE_KEY = `${STORAGE_PREFIX}diacriticsPreference`

export function readPreference(key: string): string | null {
  return window?.localStorage?.getItem?.(key) ?? null
}

export function writePreference(key: string, value: string): void {
  window?.localStorage?.setItem?.(key, value)
}
