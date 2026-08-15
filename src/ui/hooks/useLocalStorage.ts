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
  key: string,
  fallback: T,
  validate?: Validate<T>,
): [T, (updater: Updater<T>) => void, () => T] {
  const read = useCallback((): T => {
    const raw = window?.localStorage?.getItem?.(`conjugator:${key}`) ?? null
    if (raw == null) return fallback

    const deserialized = deserialize<unknown>(raw, raw)
    if (validate == null) return (deserialized ?? fallback) as T

    const parsed = validate(deserialized, fallback)

    if (JSON.stringify(parsed) !== JSON.stringify(deserialized))
      window?.localStorage?.setItem?.(`conjugator:${key}`, JSON.stringify(parsed))

    return parsed
  }, [validate, fallback, key])

  const [value, setValue] = useState<T>(() => read())
  const valueRef = useRef<T>(value)
  valueRef.current = value

  const update = useCallback(
    (updater: Updater<T>) => {
      const next = typeof updater === 'function' ? (updater as (current: T) => T)(valueRef.current) : updater
      window?.localStorage?.setItem?.(`conjugator:${key}`, JSON.stringify(next))
      setValue(next)
      window.dispatchEvent(new Event(`musarrif:storagechange:${key}`))
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
    window.addEventListener(`musarrif:storagechange:${key}`, refetch, { signal: controller.signal })
    return () => controller.abort()
  }, [key, refetch])

  return [value, update, refetch]
}
