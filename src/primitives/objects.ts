export function mapRecord<K extends string, V, R>(record: Record<K, V>, mapper: (value: V, key: K) => R): Record<K, R> {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [key, mapper(value as V, key as K)]),
  ) as Record<K, R>
}
