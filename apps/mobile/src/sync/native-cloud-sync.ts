import { requireNativeModule } from 'expo-modules-core'
import type { SyncEntry } from '../storage/schema'

type CloudAccountStatus = 'available' | 'noAccount' | 'restricted' | 'temporarilyUnavailable' | 'couldNotDetermine'

interface CloudSendResult {
  readonly acknowledged: readonly Pick<SyncEntry, 'key' | 'modifiedAtMillis'>[]
  /** The server's version of every entry whose upload CloudKit rejected as stale. */
  readonly conflicts: readonly SyncEntry[]
}

export interface CloudSyncEvent {
  readonly type: 'accountChange'
  readonly accountStatus?: CloudAccountStatus
  readonly accountIdentifier?: string
  readonly requiresConfirmation?: boolean
}

const CLOUD_ACCOUNT_CHANGED_ERROR_CODE = 'ERR_CLOUD_ACCOUNT_CHANGED' as const

export function isAccountSwitchError(error: unknown): boolean {
  return (
    typeof error === 'object' && error !== null && 'code' in error && error.code === CLOUD_ACCOUNT_CHANGED_ERROR_CODE
  )
}

export interface NativeSyncSubscription {
  remove(): void
}

export interface NativeCloudSyncModule {
  accountStatus(): Promise<CloudAccountStatus>
  accountIdentity(): Promise<string | null>
  /** Everything other devices changed since the last fetch; the engine keeps its own position. */
  fetchChanges(): Promise<readonly SyncEntry[]>
  sendChanges(records: readonly SyncEntry[]): Promise<CloudSendResult>
  confirmAccountSwitch(accountIdentifier: string): Promise<void>
  addListener(eventName: 'onSyncEvent', listener: (event: CloudSyncEvent) => void): NativeSyncSubscription
}

export function cloudSyncModule(): NativeCloudSyncModule {
  return requireNativeModule<NativeCloudSyncModule>('MusarrifAppleServices')
}
