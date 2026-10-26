import { useCallback, useEffect, useRef, useState } from 'preact/hooks'

type Updater<T> = T | ((current: T) => T)
type Validate<T> = (raw: unknown, fallback: T) => T

function deserialize<T>(raw: string | null, defaultValue: T): T {
  try {
    return JSON.parse(raw ?? '')
  } catch {
    return defaultValue
  }
}

export function useLocalStorage<T>(
  keyName: string,
  fallback: T,
  validate?: Validate<T>,
): [T, (updater: Updater<T>) => void, () => T] {
  const key = `conjugator:${keyName}`

  const read = useCallback((): T => {
    const raw = window?.localStorage?.getItem?.(key) ?? null
    if (raw == null) return fallback

    const deserialized = deserialize<unknown>(raw, raw)
    if (validate == null) return (deserialized ?? fallback) as T

    const parsed = validate(deserialized, fallback)

    if (JSON.stringify(parsed) !== JSON.stringify(deserialized))
      window?.localStorage?.setItem?.(key, JSON.stringify(parsed))

    return parsed
  }, [validate, fallback, key])

  const [value, setValue] = useState<T>(() => read())
  const valueRef = useRef<T>(value)
  valueRef.current = value

  const update = useCallback(
    (updater: Updater<T>) => {
      const next = typeof updater === 'function' ? (updater as (current: T) => T)(valueRef.current) : updater
      window?.localStorage?.setItem?.(key, JSON.stringify(next))
      setValue(next)
      window.dispatchEvent(new StorageEvent('storage', { key }))
    },
    [key],
  )

  const refetch = useCallback(() => {
    const next = read()
    setValue(next)
    return next
  }, [read])

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener(
      'storage',
      (event: StorageEvent) => {
        if (event.key === key || event.key === null) refetch()
      },
      { signal: controller.signal },
    )
    return () => controller.abort()
  }, [key, refetch])

  return [value, update, refetch]
}
