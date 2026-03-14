import { useMemo } from 'preact/hooks'

export function useLocalStorage() {
  return useMemo(
    () => ({
      getItem: (key: string): string | null => window?.localStorage?.getItem?.(key) ?? null,
      setItem: (key: string, value: string): void => window?.localStorage?.setItem?.(key, value),
    }),
    [],
  )
}
