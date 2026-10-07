import * as SQLite from 'expo-sqlite'
import { SqliteUserDataRepository } from './SqliteUserDataRepository'
import type { SqliteAsyncDatabase } from './schema'

let repositoryPromise: Promise<SqliteUserDataRepository> | undefined

/** Opens the local store once and shares it between the app and the sync coordinator. */
export function getMobileUserDataRepository(): Promise<SqliteUserDataRepository> {
  repositoryPromise ??= SQLite.openDatabaseAsync('musarrif.db')
    .then((database) => new SqliteUserDataRepository(database as unknown as SqliteAsyncDatabase))
    .catch((error: unknown) => {
      repositoryPromise = undefined
      throw error
    })
  return repositoryPromise
}
