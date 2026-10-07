import { migrate } from './migrations'
import {
  isSyncedUserDataKey,
  type SqliteAsyncDatabase,
  type SyncEntry,
  type UserDataKey,
  type UserDataRepository,
  type UserDataSnapshot,
  type UserDataValue,
  type ValidatedUserDataSnapshot,
} from './schema'

const TABLES = ['settings', 'favorites', 'srs_cards', 'exercise_dates', 'adaptive_dimensions', 'local_state'] as const
type DataTable = (typeof TABLES)[number]

interface RepositoryOptions {
  readonly now?: () => number
}

interface DataRow {
  key: string
  value_json: string
}

interface ClockRow {
  key: string
  modified_at: number
  deleted: number
}

export class SqliteUserDataRepository implements UserDataRepository {
  private readonly now: () => number
  private migration?: Promise<void>

  constructor(
    private readonly database: SqliteAsyncDatabase,
    options: RepositoryOptions = {},
  ) {
    this.now = options.now ?? Date.now
  }

  async hydrate(): Promise<UserDataSnapshot> {
    await this.ensureMigrated()
    return { values: await this.readAll(this.database) }
  }

  async put(key: UserDataKey, value: UserDataValue): Promise<void> {
    await this.ensureMigrated()
    await this.database.withExclusiveTransactionAsync(async (transaction) => {
      await this.writeValue(transaction, key, value, this.now())
    })
  }

  async remove(key: UserDataKey): Promise<void> {
    await this.ensureMigrated()
    await this.database.withExclusiveTransactionAsync(async (transaction) => {
      await this.deleteValue(transaction, key, this.now())
    })
  }

  async replaceExportedData(snapshot: ValidatedUserDataSnapshot): Promise<void> {
    await this.ensureMigrated()
    await this.database.withExclusiveTransactionAsync(async (transaction) => {
      const now = this.now()
      const current = await this.readAll(transaction)
      for (const key of Object.keys(current) as UserDataKey[]) {
        if (isSyncedUserDataKey(key) && snapshot.values[key] === undefined)
          await this.deleteValue(transaction, key, now)
      }
      for (const [rawKey, value] of Object.entries(snapshot.values)) {
        const key = rawKey as UserDataKey
        if (value === undefined || !isSyncedUserDataKey(key)) continue
        if (JSON.stringify(current[key]) !== JSON.stringify(value)) await this.writeValue(transaction, key, value, now)
      }
    })
  }

  async dirtyEntries(): Promise<readonly SyncEntry[]> {
    await this.ensureMigrated()
    const clocks = await this.database.getAllAsync<ClockRow>(
      'SELECT key, modified_at, deleted FROM entry_clock WHERE dirty = 1',
    )
    const values = await this.readAll(this.database)
    return clocks.map(({ key, modified_at, deleted }) => {
      const entry = { key: key as UserDataKey, modifiedAtMillis: modified_at }
      const value = values[entry.key]
      return deleted === 1 || value === undefined ? { ...entry, deleted: true } : { ...entry, value, deleted: false }
    })
  }

  async markSynced(entries: readonly Pick<SyncEntry, 'key' | 'modifiedAtMillis'>[]): Promise<void> {
    await this.ensureMigrated()
    await this.database.withExclusiveTransactionAsync(async (transaction) => {
      for (const { key, modifiedAtMillis } of entries) {
        await transaction.runAsync(
          'UPDATE entry_clock SET dirty = 0 WHERE key = ? AND modified_at = ?',
          key,
          modifiedAtMillis,
        )
      }
    })
  }

  async applyRemoteEntries(entries: readonly SyncEntry[]): Promise<readonly UserDataKey[]> {
    await this.ensureMigrated()
    const applied: UserDataKey[] = []
    await this.database.withExclusiveTransactionAsync(async (transaction) => {
      for (const entry of entries) {
        if (!isSyncedUserDataKey(entry.key)) continue
        const local = await transaction.getFirstAsync<ClockRow>(
          'SELECT key, modified_at, deleted FROM entry_clock WHERE key = ?',
          entry.key,
        )
        if (local && local.modified_at >= entry.modifiedAtMillis) continue
        if (entry.deleted || entry.value === undefined) {
          await this.deleteValue(transaction, entry.key, entry.modifiedAtMillis, false)
        } else {
          await this.writeValue(transaction, entry.key, entry.value, entry.modifiedAtMillis, false)
        }
        applied.push(entry.key)
      }
    })
    return applied
  }

  private async ensureMigrated(): Promise<void> {
    if (!this.migration) this.migration = migrate(this.database)
    try {
      await this.migration
    } catch (error) {
      this.migration = undefined
      throw error
    }
  }

  private async writeValue(
    database: SqliteAsyncDatabase,
    key: UserDataKey,
    value: UserDataValue,
    modifiedAt: number,
    dirty = true,
  ): Promise<void> {
    await database.runAsync(
      `INSERT INTO ${tableForKey(key)} (key, value_json) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value_json = excluded.value_json`,
      key,
      JSON.stringify(value),
    )
    await this.stamp(database, key, modifiedAt, false, dirty)
  }

  private async deleteValue(
    database: SqliteAsyncDatabase,
    key: UserDataKey,
    modifiedAt: number,
    dirty = true,
  ): Promise<void> {
    await database.runAsync(`DELETE FROM ${tableForKey(key)} WHERE key = ?`, key)
    await this.stamp(database, key, modifiedAt, true, dirty)
  }

  private async stamp(
    database: SqliteAsyncDatabase,
    key: UserDataKey,
    modifiedAt: number,
    deleted: boolean,
    dirty: boolean,
  ) {
    if (!isSyncedUserDataKey(key)) return
    await database.runAsync(
      'INSERT INTO entry_clock (key, modified_at, deleted, dirty) VALUES (?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET modified_at = excluded.modified_at, deleted = excluded.deleted, dirty = excluded.dirty',
      key,
      modifiedAt,
      deleted ? 1 : 0,
      dirty ? 1 : 0,
    )
  }

  private async readAll(database: SqliteAsyncDatabase): Promise<Partial<Record<UserDataKey, UserDataValue>>> {
    const values: Partial<Record<UserDataKey, UserDataValue>> = {}
    for (const table of TABLES) {
      const rows = await database.getAllAsync<DataRow>(`SELECT key, value_json FROM ${table}`)
      for (const row of rows) values[row.key as UserDataKey] = JSON.parse(row.value_json) as UserDataValue
    }
    return values
  }
}

function tableForKey(key: UserDataKey): DataTable {
  const prefix = key.split(':', 1)[0]
  switch (prefix) {
    case 'setting':
      return 'settings'
    case 'favorite':
      return 'favorites'
    case 'srs':
      return 'srs_cards'
    case 'exercise':
      return 'exercise_dates'
    case 'dimension':
      return 'adaptive_dimensions'
    case 'local':
      return 'local_state'
    default:
      throw new Error(`Unsupported user data key: ${key}`)
  }
}
