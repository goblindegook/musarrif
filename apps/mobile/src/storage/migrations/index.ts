import type { SqliteAsyncDatabase } from '../schema'
import { INITIAL_SCHEMA_STATEMENTS } from './001-initial'

const MIGRATIONS: readonly (readonly string[])[] = [INITIAL_SCHEMA_STATEMENTS]

async function currentVersion(database: SqliteAsyncDatabase): Promise<number> {
  const row = await database.getFirstAsync<{ user_version: number }>('PRAGMA user_version')
  return row?.user_version ?? 0
}

/** Applies each missing migration in its own transaction, so an interrupted run resumes where it stopped. */
export async function migrate(database: SqliteAsyncDatabase): Promise<void> {
  for (const [index, statements] of MIGRATIONS.entries()) {
    const version = index + 1
    if ((await currentVersion(database)) >= version) continue
    await database.withExclusiveTransactionAsync(async (transaction) => {
      if ((await currentVersion(transaction)) >= version) return
      for (const statement of statements) await transaction.execAsync(statement)
      await transaction.execAsync(`PRAGMA user_version = ${version}`)
    })
  }
}
