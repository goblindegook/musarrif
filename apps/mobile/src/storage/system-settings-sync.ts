import { useEffect, useRef } from 'react'
import { Settings } from 'react-native'
import { useUserData } from './UserDataProvider'
import { useDiacriticsPreference } from './user-data-hooks'

/** Matches the key of the diacritics preference in the app's `Settings.bundle`. */
const SYSTEM_KEY = 'diacriticsPreference'

function isDiacriticsPreference(value: unknown): value is 'all' | 'some' | 'none' {
  return value === 'all' || value === 'some' || value === 'none'
}

export function useSystemSettingsSync() {
  const { ready, put } = useUserData()
  const preference = useDiacriticsPreference()
  const preferenceRef = useRef(preference)
  preferenceRef.current = preference

  useEffect(() => {
    if (!ready) return
    const adoptSystemValue = () => {
      const system = Settings.get(SYSTEM_KEY)
      if (isDiacriticsPreference(system) && system !== preferenceRef.current) {
        void put('setting:diacriticsPreference', system)
      }
    }
    adoptSystemValue()
    const watch = Settings.watchKeys(SYSTEM_KEY, adoptSystemValue)
    return () => Settings.clearWatch(watch)
  }, [ready, put])

  useEffect(() => {
    if (ready) Settings.set({ [SYSTEM_KEY]: preference })
  }, [ready, preference])
}
