import { useCallback, useRef, useState } from 'preact/hooks'

type Updater<T> = T | ((current: T) => T)
type Validate<T> = (raw: unknown, fallback: T) => T

function parse<T>(raw: string | null, defaultValue: T): T {
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

    const parsed = parse<unknown>(raw, raw)
    if (validate == null) return (parsed ?? fallback) as T

    const validated = validate(parsed, fallback)

    if (JSON.stringify(validated) !== JSON.stringify(parsed))
      window?.localStorage?.setItem?.(`conjugator:${key}`, JSON.stringify(validated))

    return validated
  }, [validate, fallback, key])

  const [value, setValue] = useState<T>(() => read())
  const valueRef = useRef<T>(value)
  valueRef.current = value

  const update = useCallback(
    (updater: Updater<T>) => {
      const next = typeof updater === 'function' ? (updater as (current: T) => T)(valueRef.current) : updater
      window?.localStorage?.setItem?.(`conjugator:${key}`, JSON.stringify(next))
      setValue(next)
    },
    [key],
  )

  const refetch = useCallback(() => {
    const next = read()
    setValue(next)
    return next
  }, [read])

  return [value, update, refetch]
}
