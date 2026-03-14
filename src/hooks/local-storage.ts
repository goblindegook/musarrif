import { useMemo } from 'preact/hooks'

export function useLocalStorage() {
  return useMemo(
    () => ({
      getItem: (key: string): string | null => window?.localStorage?.getItem?.(`conjugator:${key}`) ?? null,
      setItem: (key: string, value: string): void => window?.localStorage?.setItem?.(`conjugator:${key}`, value),
    }),
    [],
  )
}
