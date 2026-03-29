export function mapRecord<K extends string, V, R>(record: Record<K, V>, mapper: (value: V, key: K) => R): Record<K, R> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, mapper(value as V, key as K)]),
  ) as Record<K, R>
}

export function pick<T extends object, K extends keyof T>(value: T, keys: readonly K[]): Pick<T, K> {
  return Object.fromEntries(keys.map((key) => [key, value[key]])) as Pick<T, K>
}
