import { SqliteUserDataRepository } from '../storage/SqliteUserDataRepository'
import type { SyncEntry } from '../storage/schema'
import { RealSqliteTestDatabase } from '../storage/sqlite-test-database.ts'
import { CloudSyncCoordinator } from './CloudSyncCoordinator'
import type { CloudSyncEvent, NativeCloudSyncModule } from './native-cloud-sync'

type CloudAccountStatus = Awaited<ReturnType<NativeCloudSyncModule['accountStatus']>>
type CloudSendResult = Awaited<ReturnType<NativeCloudSyncModule['sendChanges']>>

class FakeCloud {
  private readonly log: { seq: number; origin: string; entry: SyncEntry }[] = []

  upload(origin: string, entries: readonly SyncEntry[]) {
    for (const entry of entries) this.log.push({ seq: this.log.length + 1, origin, entry })
  }

  changesFor(origin: string, after: number) {
    const fresh = this.log.filter((change) => change.seq > after && change.origin !== origin)
    return { entries: fresh.map((change) => change.entry), cursor: this.log.length }
  }
}

function fakeDevice(cloud: FakeCloud, name: string) {
  let cursor = 0
  let accountStatus: CloudAccountStatus = 'available'
  const listeners = new Set<(event: CloudSyncEvent) => void>()
  const native = {
    accountStatus: jest.fn(async () => accountStatus),
    accountIdentity: jest.fn(async () => `${name}-account`),
    confirmAccountSwitch: jest.fn(async () => undefined),
    fetchChanges: jest.fn(async (): Promise<readonly SyncEntry[]> => {
      const changes = cloud.changesFor(name, cursor)
      cursor = changes.cursor
      return changes.entries
    }),
    sendChanges: jest.fn(async (records: readonly SyncEntry[]): Promise<CloudSendResult> => {
      cloud.upload(name, records)
      return { acknowledged: records.map(({ key, modifiedAtMillis }) => ({ key, modifiedAtMillis })), conflicts: [] }
    }),
    addListener: jest.fn((_eventName: 'onSyncEvent', listener: (event: CloudSyncEvent) => void) => {
      listeners.add(listener)
      return { remove: () => listeners.delete(listener) }
    }),
  }
  return {
    native: native as unknown as jest.Mocked<NativeCloudSyncModule>,
    setAccountStatus: (status: CloudAccountStatus) => {
      accountStatus = status
    },
    emit: (event: CloudSyncEvent) => {
      for (const listener of listeners) listener(event)
    },
  }
}

async function device(cloud: FakeCloud, name: string, clock: { now: number }) {
  const database = new RealSqliteTestDatabase()
  const repository = new SqliteUserDataRepository(database, { now: () => clock.now })
  const fake = fakeDevice(cloud, name)
  const onRemoteDataApplied = jest.fn()
  const coordinator = new CloudSyncCoordinator(repository, () => fake.native, { onRemoteDataApplied })
  return { repository, coordinator, onRemoteDataApplied, database, ...fake }
}

describe('CloudSyncCoordinator', () => {
  test('uploads what changed locally and stops treating it as pending', async () => {
    const cloud = new FakeCloud()
    const first = await device(cloud, 'a', { now: 1000 })
    await first.repository.put('favorite:ktb-1', true)

    await expect(first.coordinator.syncNow()).resolves.toBe('synced')

    expect(first.native.sendChanges).toHaveBeenCalledWith([
      { key: 'favorite:ktb-1', value: true, modifiedAtMillis: 1000, deleted: false },
    ])
    await expect(first.repository.dirtyEntries()).resolves.toEqual([])
    await first.database.closeAsync()
  })

  test('takes what another device uploaded and reports that local data changed', async () => {
    const cloud = new FakeCloud()
    const clock = { now: 1000 }
    const first = await device(cloud, 'a', clock)
    const second = await device(cloud, 'b', clock)
    await first.repository.put('favorite:ktb-1', true)
    await first.coordinator.syncNow()

    await second.coordinator.syncNow()

    await expect(second.repository.hydrate()).resolves.toEqual({ values: { 'favorite:ktb-1': true } })
    expect(second.onRemoteDataApplied).toHaveBeenCalledTimes(1)
    await first.database.closeAsync()
    await second.database.closeAsync()
  })

  test('the latest edit to an entry wins on every device', async () => {
    const cloud = new FakeCloud()
    const clock = { now: 1000 }
    const first = await device(cloud, 'a', clock)
    const second = await device(cloud, 'b', clock)
    await first.repository.put('setting:diacriticsPreference', 'all')
    clock.now = 2000
    await second.repository.put('setting:diacriticsPreference', 'none')

    await first.coordinator.syncNow()
    await second.coordinator.syncNow()
    await first.coordinator.syncNow()

    const expected = { values: { 'setting:diacriticsPreference': 'none' } }
    await expect(first.repository.hydrate()).resolves.toEqual(expected)
    await expect(second.repository.hydrate()).resolves.toEqual(expected)
    await first.database.closeAsync()
    await second.database.closeAsync()
  })

  test('does not upload a local edit that another device has already superseded', async () => {
    const cloud = new FakeCloud()
    const clock = { now: 1000 }
    const first = await device(cloud, 'a', clock)
    const second = await device(cloud, 'b', clock)
    await first.repository.put('setting:diacriticsPreference', 'all')
    clock.now = 2000
    await second.repository.put('setting:diacriticsPreference', 'none')
    await second.coordinator.syncNow()

    await first.coordinator.syncNow()

    expect(first.native.sendChanges).toHaveBeenCalledTimes(0)
    await expect(first.repository.hydrate()).resolves.toEqual({ values: { 'setting:diacriticsPreference': 'none' } })
    await first.database.closeAsync()
    await second.database.closeAsync()
  })

  test('retries an upload CloudKit rejected as a conflict, after taking the server version into account', async () => {
    const cloud = new FakeCloud()
    const first = await device(cloud, 'a', { now: 3000 })
    await first.repository.put('setting:diacriticsPreference', 'all')
    first.native.sendChanges.mockResolvedValueOnce({
      acknowledged: [],
      conflicts: [{ key: 'setting:diacriticsPreference', value: 'none', modifiedAtMillis: 2000, deleted: false }],
    })

    await expect(first.coordinator.syncNow()).resolves.toBe('synced')

    expect(first.native.sendChanges).toHaveBeenCalledTimes(2)
    await expect(first.repository.dirtyEntries()).resolves.toEqual([])
    await expect(first.repository.hydrate()).resolves.toEqual({ values: { 'setting:diacriticsPreference': 'all' } })
    await first.database.closeAsync()
  })

  test('stays local and leaves the changes pending while there is no iCloud account', async () => {
    const cloud = new FakeCloud()
    const first = await device(cloud, 'a', { now: 1000 })
    first.setAccountStatus('noAccount')
    await first.repository.put('favorite:ktb-1', true)

    await expect(first.coordinator.syncNow()).resolves.toBe('local')

    expect(first.native.fetchChanges).toHaveBeenCalledTimes(0)
    await expect(first.repository.dirtyEntries()).resolves.toHaveLength(1)
    await first.database.closeAsync()
  })

  test('keeps the changes pending and stays local when the upload fails', async () => {
    const cloud = new FakeCloud()
    const first = await device(cloud, 'a', { now: 1000 })
    await first.repository.put('favorite:ktb-1', true)
    first.native.sendChanges.mockRejectedValueOnce(Object.assign(new Error('offline'), { code: 'networkUnavailable' }))

    await expect(first.coordinator.syncNow()).resolves.toBe('local')

    await expect(first.repository.dirtyEntries()).resolves.toHaveLength(1)
    await first.database.closeAsync()
  })

  test('waits for the user to confirm a changed iCloud account before syncing again', async () => {
    const cloud = new FakeCloud()
    const first = await device(cloud, 'a', { now: 1000 })
    await first.repository.put('favorite:ktb-1', true)
    first.native.fetchChanges.mockRejectedValueOnce(
      Object.assign(new Error('changed'), { code: 'ERR_CLOUD_ACCOUNT_CHANGED' }),
    )

    await expect(first.coordinator.syncNow()).resolves.toBe('needsAttention')
    await expect(first.coordinator.syncNow()).resolves.toBe('needsAttention')
    expect(first.native.fetchChanges).toHaveBeenCalledTimes(1)

    await expect(first.coordinator.confirmAccountSwitch()).resolves.toBe('synced')
    expect(first.native.confirmAccountSwitch).toHaveBeenCalledWith('a-account')
    await first.database.closeAsync()
  })

  test('asks for confirmation when iCloud announces an account change', async () => {
    const cloud = new FakeCloud()
    const first = await device(cloud, 'a', { now: 1000 })
    await first.coordinator.start()

    first.emit({ type: 'accountChange', accountStatus: 'available', requiresConfirmation: true })

    expect(first.coordinator.status).toBe('needsAttention')
    first.coordinator.stop()
    await first.database.closeAsync()
  })
})
