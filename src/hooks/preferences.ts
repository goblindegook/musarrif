const STORAGE_PREFIX = 'conjugator:'

export const LANGUAGE_STORAGE_KEY = `${STORAGE_PREFIX}language`
export const DIACRITICS_STORAGE_KEY = `${STORAGE_PREFIX}diacriticsPreference`

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readPreference(key: string): string | null {
  const storage = getStorage()
  if (!storage) return null
  try {
    return storage.getItem(key)
  } catch {
    return null
  }
}

export function writePreference(key: string, value: string): void {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.setItem(key, value)
  } catch {
    // Ignore write failures (e.g., storage disabled)
  }
}
