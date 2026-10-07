/** Keys that travel with a backup and sync through iCloud; device-local state stays out. */
export function isSyncedUserDataKey(key: UserDataKey): boolean {
  return (
    key.startsWith('favorite:') ||
    key.startsWith('srs:') ||
    key.startsWith('exercise:') ||
    key.startsWith('dimension:') ||
    key.startsWith('setting:')
  )
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** A real calendar date in `YYYY-MM-DD` form, never converted through a timezone. */
export function isDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export type UserDataKey =
  | `setting:${string}`
  | `favorite:${string}`
  | `srs:${string}`
  | `exercise:${string}`
  | `dimension:${string}`
  | `local:${string}`

export type UserDataValue =
  | null
  | boolean
  | number
  | string
  | readonly UserDataValue[]
  | { readonly [key: string]: UserDataValue }

export interface UserDataSnapshot {
  readonly values: Readonly<Partial<Record<UserDataKey, UserDataValue>>>
}

/** A complete, already-validated snapshot. Import decoders must validate before calling replace methods. */
export type ValidatedUserDataSnapshot = UserDataSnapshot

/** One synced key with the time it last changed on any device; deletions are kept as entries without a value. */
export interface SyncEntry {
  readonly key: UserDataKey
  readonly value?: UserDataValue
  readonly modifiedAtMillis: number
  readonly deleted: boolean
}

export interface UserDataRepository {
  hydrate(): Promise<UserDataSnapshot>
  put(key: UserDataKey, value: UserDataValue): Promise<void>
  remove(key: UserDataKey): Promise<void>
  /** Replaces the backup fields with the imported ones and keeps device-local state. */
  replaceExportedData(snapshot: ValidatedUserDataSnapshot): Promise<void>
  /** The entries iCloud has not confirmed yet, with their modification time; deletions included. */
  dirtyEntries(): Promise<readonly SyncEntry[]>
  /** Confirms uploads; an entry that changed again since stays pending. */
  markSynced(entries: readonly Pick<SyncEntry, 'key' | 'modifiedAtMillis'>[]): Promise<void>
  /** Takes the remote entries that are newer than the local ones; resolves with the keys that changed. */
  applyRemoteEntries(entries: readonly SyncEntry[]): Promise<readonly UserDataKey[]>
}

export interface SqliteAsyncDatabase {
  execAsync(source: string): Promise<void>
  runAsync(source: string, ...params: (string | number | null | Uint8Array)[]): Promise<unknown>
  getFirstAsync<T>(source: string, ...params: (string | number | null | Uint8Array)[]): Promise<T | null>
  getAllAsync<T>(source: string, ...params: (string | number | null | Uint8Array)[]): Promise<T[]>
  withExclusiveTransactionAsync(task: (transaction: SqliteAsyncDatabase) => Promise<void>): Promise<void>
}
