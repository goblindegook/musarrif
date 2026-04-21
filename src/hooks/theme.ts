import { useCallback, useEffect, useRef } from 'preact/hooks'
import { useLocalStorage } from './local-storage'

export type ThemePreference = 'light' | 'dark' | 'system'

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#1c1a14' : '#f5f4ee')
}

function resolveTheme(pref: ThemePreference): 'light' | 'dark' {
  if (pref === 'dark') return 'dark'
  if (pref === 'light') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  const [themePreference, setStoredTheme] = useLocalStorage<ThemePreference>('theme', 'system')
  const cleanupRef = useRef<(() => void) | null>(null)

  const setThemePreference = useCallback(
    (next: ThemePreference) => {
      // Remove any existing OS listener
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = null
      }

      setStoredTheme(next)
      applyTheme(resolveTheme(next))

      if (next === 'system') {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
          applyTheme(mq.matches ? 'dark' : 'light')
        }
        mq.addEventListener('change', handler)
        cleanupRef.current = () => mq.removeEventListener('change', handler)
      }
    },
    [setStoredTheme],
  )

  // On mount: apply stored theme and register OS listener if system
  useEffect(() => {
    applyTheme(resolveTheme(themePreference))
    if (themePreference === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = () => {
        applyTheme(mq.matches ? 'dark' : 'light')
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

  return { themePreference, setThemePreference }
}
