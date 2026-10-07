import { SqliteUserDataRepository } from './SqliteUserDataRepository'
import { RealSqliteTestDatabase } from './sqlite-test-database.ts'

async function userVersion(database: RealSqliteTestDatabase) {
  return database.getFirstAsync<{ user_version: number }>('PRAGMA user_version')
}

describe('local storage migration', () => {
  test('first install starts empty at the baseline version', async () => {
    const database = new RealSqliteTestDatabase()

    await expect(new SqliteUserDataRepository(database).hydrate()).resolves.toEqual({ values: {} })
    await expect(userVersion(database)).resolves.toEqual({ user_version: 1 })

    await database.closeAsync()
  })

  test('rolls back an interrupted migration and safely completes it on retry', async () => {
    const database = new RealSqliteTestDatabase()
    database.failOnceWhenSqlContains('CREATE TABLE entry_clock')
    const repository = new SqliteUserDataRepository(database)

    await expect(repository.hydrate()).rejects.toThrow('Injected SQLite failure')
    await expect(userVersion(database)).resolves.toEqual({ user_version: 0 })
    await expect(
      database.getFirstAsync('SELECT name FROM sqlite_master WHERE name = ?', 'settings'),
    ).resolves.toBeNull()

    await expect(repository.hydrate()).resolves.toEqual({ values: {} })
    await expect(userVersion(database)).resolves.toEqual({ user_version: 1 })

    await database.closeAsync()
  })
})
