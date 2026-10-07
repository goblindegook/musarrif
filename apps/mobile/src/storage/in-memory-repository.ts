import type { UserDataKey, UserDataRepository, UserDataValue } from './schema'

export function createInMemoryRepository(
  values: Partial<Record<UserDataKey, UserDataValue>> = {},
  overrides: Partial<UserDataRepository> = {},
): UserDataRepository {
  return {
    hydrate: async () => ({ values: { ...values } }),
    put: async (key, value) => {
      values[key] = value
    },
    remove: async (key) => {
      delete values[key]
    },
    replaceExportedData: async () => undefined,
    dirtyEntries: async () => [],
    markSynced: async () => undefined,
    applyRemoteEntries: async () => [],
    ...overrides,
  }
}
