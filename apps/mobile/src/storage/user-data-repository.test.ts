import { SqliteUserDataRepository } from './SqliteUserDataRepository'
import { createSqliteTestFile, RealSqliteTestDatabase } from './sqlite-test-database.ts'

describe('SqliteUserDataRepository', () => {
  test('routes SRS cards, exercise dates, adaptive dimensions, and local state to durable schema tables', async () => {
    const database = new RealSqliteTestDatabase()
    const repository = new SqliteUserDataRepository(database)
    await repository.put('srs:card-1', { dueAt: '2026-10-01' })
    await repository.put('exercise:daily:2026-09-30', { correct: 3, total: 4 })
    await repository.put('dimension:verbs', { level: 2, window: 8 })
    await repository.put('local:tour-completed', true)

    await expect(repository.hydrate()).resolves.toEqual({
      values: {
        'srs:card-1': { dueAt: '2026-10-01' },
        'exercise:daily:2026-09-30': { correct: 3, total: 4 },
        'dimension:verbs': { level: 2, window: 8 },
        'local:tour-completed': true,
      },
    })

    await database.closeAsync()
  })

  test('persists values across repository reopen', async () => {
    const file = createSqliteTestFile()
    try {
      const first = new RealSqliteTestDatabase(file.filename)
      const repository = new SqliteUserDataRepository(first)
      await repository.put('setting:theme', 'light')
      await first.closeAsync()

      const second = new RealSqliteTestDatabase(file.filename)
      await expect(new SqliteUserDataRepository(second).hydrate()).resolves.toEqual({
        values: { 'setting:theme': 'light' },
      })
      await second.closeAsync()
    } finally {
      file.cleanup()
    }
  })

  test('lists the entries that still need uploading with their modification time, including deletions, and leaves out device-local state', async () => {
    const database = new RealSqliteTestDatabase()
    let now = 1000
    const repository = new SqliteUserDataRepository(database, { now: () => now })
    await repository.put('favorite:ktb-1', true)
    now = 2000
    await repository.put('setting:theme', 'dark')
    await repository.put('favorite:kwn-1', true)
    now = 3000
    await repository.remove('favorite:kwn-1')
    await repository.put('local:tour-completed', true)

    await expect(repository.dirtyEntries()).resolves.toEqual(
      expect.arrayContaining([
        { key: 'favorite:ktb-1', value: true, modifiedAtMillis: 1000, deleted: false },
        { key: 'setting:theme', value: 'dark', modifiedAtMillis: 2000, deleted: false },
        { key: 'favorite:kwn-1', modifiedAtMillis: 3000, deleted: true },
      ]),
    )
    await expect(repository.dirtyEntries()).resolves.toHaveLength(3)

    await database.closeAsync()
  })

  test('stops listing an entry once its upload is confirmed, unless it changed again in the meantime', async () => {
    const database = new RealSqliteTestDatabase()
    let now = 1000
    const repository = new SqliteUserDataRepository(database, { now: () => now })
    await repository.put('setting:theme', 'light')
    now = 2000
    await repository.put('setting:theme', 'dark')

    await repository.markSynced([{ key: 'setting:theme', modifiedAtMillis: 1000 }])
    await expect(repository.dirtyEntries()).resolves.toEqual([
      { key: 'setting:theme', value: 'dark', modifiedAtMillis: 2000, deleted: false },
    ])

    await repository.markSynced([{ key: 'setting:theme', modifiedAtMillis: 2000 }])
    await expect(repository.dirtyEntries()).resolves.toEqual([])

    await database.closeAsync()
  })

  test('applies a newer remote entry and reports its key', async () => {
    const database = new RealSqliteTestDatabase()
    const repository = new SqliteUserDataRepository(database, { now: () => 1000 })
    await repository.put('setting:theme', 'light')

    await expect(
      repository.applyRemoteEntries([{ key: 'setting:theme', value: 'dark', modifiedAtMillis: 2000, deleted: false }]),
    ).resolves.toEqual(['setting:theme'])
    await expect(repository.hydrate()).resolves.toEqual({ values: { 'setting:theme': 'dark' } })
    await expect(repository.dirtyEntries()).resolves.toEqual([])

    await database.closeAsync()
  })

  test('keeps a local entry that is newer than the remote one', async () => {
    const database = new RealSqliteTestDatabase()
    const repository = new SqliteUserDataRepository(database, { now: () => 3000 })
    await repository.put('setting:theme', 'light')

    await expect(
      repository.applyRemoteEntries([{ key: 'setting:theme', value: 'dark', modifiedAtMillis: 2000, deleted: false }]),
    ).resolves.toEqual([])
    await expect(repository.hydrate()).resolves.toEqual({ values: { 'setting:theme': 'light' } })
    await expect(repository.dirtyEntries()).resolves.toEqual([
      { key: 'setting:theme', value: 'light', modifiedAtMillis: 3000, deleted: false },
    ])

    await database.closeAsync()
  })

  test('ignores a remote entry with the same modification time as the local one', async () => {
    const database = new RealSqliteTestDatabase()
    const repository = new SqliteUserDataRepository(database, { now: () => 2000 })
    await repository.put('setting:theme', 'light')

    await expect(
      repository.applyRemoteEntries([{ key: 'setting:theme', value: 'dark', modifiedAtMillis: 2000, deleted: false }]),
    ).resolves.toEqual([])

    await database.closeAsync()
  })

  test('applies a newer remote deletion', async () => {
    const database = new RealSqliteTestDatabase()
    const repository = new SqliteUserDataRepository(database, { now: () => 1000 })
    await repository.put('favorite:ktb-1', true)

    await repository.applyRemoteEntries([{ key: 'favorite:ktb-1', modifiedAtMillis: 2000, deleted: true }])

    await expect(repository.hydrate()).resolves.toEqual({ values: {} })

    await database.closeAsync()
  })

  test('takes a remote entry for a key the device has never seen, whatever its age', async () => {
    const database = new RealSqliteTestDatabase()
    const repository = new SqliteUserDataRepository(database)

    await repository.applyRemoteEntries([{ key: 'favorite:ktb-1', value: true, modifiedAtMillis: 0, deleted: false }])

    await expect(repository.hydrate()).resolves.toEqual({ values: { 'favorite:ktb-1': true } })

    await database.closeAsync()
  })

  test('replaces exported fields while preserving local-only state, and dates the change so it wins on other devices', async () => {
    const database = new RealSqliteTestDatabase()
    let now = 1000
    const repository = new SqliteUserDataRepository(database, { now: () => now })
    await repository.put('setting:theme', 'light')
    await repository.put('favorite:verb-1', true)
    await repository.put('local:tour-completed', true)
    now = 5000

    await repository.replaceExportedData({ values: { 'setting:theme': 'dark', 'favorite:verb-2': true } })

    await expect(repository.hydrate()).resolves.toEqual({
      values: { 'setting:theme': 'dark', 'local:tour-completed': true, 'favorite:verb-2': true },
    })
    await expect(repository.dirtyEntries()).resolves.toEqual(
      expect.arrayContaining([
        { key: 'setting:theme', value: 'dark', modifiedAtMillis: 5000, deleted: false },
        { key: 'favorite:verb-1', modifiedAtMillis: 5000, deleted: true },
      ]),
    )

    await database.closeAsync()
  })
})
