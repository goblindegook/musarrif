import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { useLocalStorage } from './useLocalStorage'

export type ThemePreference = 'light' | 'dark' | 'system'

function apply(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c1a14' : '#f5f4ee')
}

function resolve(pref: ThemePreference): 'light' | 'dark' {
  if (pref !== 'system') return pref
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [themePreference, setStoredTheme] = useLocalStorage<ThemePreference>('theme', 'system')
  const [theme, setTheme] = useState(resolve(themePreference))
  const cleanupRef = useRef<(() => void) | null>(null)

  const changeTheme = useCallback((pref: ThemePreference) => {
    setStoredTheme(pref)
    setTheme(resolve(pref))
    apply(resolve(pref))
  }, [])

  const setThemePreference = useCallback(
    (next: ThemePreference) => {
      // Remove any existing OS listener
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }

      changeTheme(next)

      if (next === 'system') {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => changeTheme(next)
        mq.addEventListener('change', handler)
        cleanupRef.current = () => mq.removeEventListener('change', handler)
      }
    },
    [setStoredTheme],
  )

  // On mount: apply stored theme and register OS listener if system
  useEffect(() => {
    changeTheme(themePreference)
    if (themePreference === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        changeTheme(themePreference)
      }
      mq.addEventListener('change', handler)
      cleanupRef.current = () => mq.removeEventListener('change', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Cleanup OS listener on unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }
    }
  }, [])

  return { theme, themePreference, setThemePreference }
}
