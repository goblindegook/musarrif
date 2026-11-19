import type { SrsStore } from '../../../src/exercises/srs'

interface VersionedUserData {
  version?: number
  srs: SrsStore
}

type Migration = <T extends VersionedUserData>(data: T) => T

// Frozen at v1: the per-exercise card kinds that v2 folds into production and recognition cards.
const V1_CARD_KINDS: Readonly<Record<string, string>> = {
  conjugation: 'production:verb',
  rootFormVerb: 'production:verb',
  verbMasdar: 'production:masdar',
  verbParticiple: 'production:participle',
  verbForm: 'recognition:verb',
  verbPronoun: 'recognition:verb',
  verbRoot: 'recognition:verb',
  verbTense: 'recognition:verb',
  masdarForm: 'recognition:masdar',
  masdarRoot: 'recognition:masdar',
  masdarVerb: 'recognition:masdar',
  participleForm: 'recognition:participle',
  participleRoot: 'recognition:participle',
  participleVerb: 'recognition:participle',
}

const migrateV1ToV2: Migration = (data) => {
  const srs: SrsStore = {}
  for (const [key, state] of Object.entries(data.srs)) {
    const [kind, ...cell] = key.split(':')
    const migratedKey = [V1_CARD_KINDS[kind] ?? kind, ...cell].join(':')
    // The earliest due date wins, so the shared card never claims more than its weakest exercise deserves.
    const current = srs[migratedKey]
    if (current == null || state.dueDate < current.dueDate) srs[migratedKey] = state
  }
  return { ...data, version: 2, srs }
}

// MIGRATIONS[n - 1] upgrades version n to n + 1.
const MIGRATIONS: readonly Migration[] = [migrateV1ToV2]

export const USER_DATA_VERSION = MIGRATIONS.length + 1

/** Data without a version predates versioning and is v1. */
export function migrateUserData<T extends VersionedUserData>(data: T): T {
  return MIGRATIONS.slice((data.version ?? 1) - 1).reduce<T>((migrated, migrate) => migrate(migrated), data)
}
