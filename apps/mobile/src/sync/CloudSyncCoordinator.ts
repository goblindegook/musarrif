import type { UserDataRepository } from '../storage/schema'
import {
  type CloudSyncEvent,
  cloudSyncModule,
  isAccountSwitchError,
  type NativeCloudSyncModule,
  type NativeSyncSubscription,
} from './native-cloud-sync'

export type CloudSyncStatus = 'local' | 'syncing' | 'synced' | 'needsAttention'

/** Uploading can surface conflicts that the next fetch resolves; a couple of passes settle them. */
const MAX_PASSES = 3

interface CloudSyncCoordinatorOptions {
  /** Called once per sync that changed local data, so in-memory views can reload. */
  readonly onRemoteDataApplied?: () => void
}

/**
 * The newest edit to each entry wins, so there is no merge state to keep beyond each entry's own clock.
 */
export class CloudSyncCoordinator {
  status: CloudSyncStatus = 'local'
  private readonly statusListeners = new Set<(status: CloudSyncStatus) => void>()
  private subscription?: NativeSyncSubscription
  private inFlight?: Promise<CloudSyncStatus>
  private active = false
  private syncAgain = false
  private accountIdentifier?: string
  private accountSwitchPending = false

  constructor(
    private readonly repository: UserDataRepository,
    private readonly native: () => NativeCloudSyncModule = cloudSyncModule,
    private readonly options: CloudSyncCoordinatorOptions = {},
  ) {}

  addStatusListener(listener: (status: CloudSyncStatus) => void): NativeSyncSubscription {
    this.statusListeners.add(listener)
    listener(this.status)
    return { remove: () => this.statusListeners.delete(listener) }
  }

  start(): Promise<CloudSyncStatus> {
    this.active = true
    this.subscription ??= this.native().addListener('onSyncEvent', (event) => this.handleEvent(event))
    return this.syncNow()
  }

  /** Stops listening for account changes; local writes stay pending for the next start. */
  stop(): void {
    this.active = false
    this.subscription?.remove()
    this.subscription = undefined
  }

  /** Safe to call on launch, foreground or an account change; concurrent calls coalesce. */
  syncNow(): Promise<CloudSyncStatus> {
    if (this.inFlight) {
      this.syncAgain = true
      return this.inFlight
    }
    const operation = (async () => {
      let status: CloudSyncStatus
      do {
        this.syncAgain = false
        status = await this.sync()
      } while (this.syncAgain)
      return status
    })()
    this.inFlight = operation.finally(() => {
      this.inFlight = undefined
    })
    return this.inFlight
  }

  async confirmAccountSwitch(): Promise<CloudSyncStatus> {
    if (!this.accountSwitchPending || !this.accountIdentifier) return this.status
    try {
      await this.native().confirmAccountSwitch(this.accountIdentifier)
    } catch {
      return this.setStatus('needsAttention')
    }
    this.accountSwitchPending = false
    return this.syncNow()
  }

  private async sync(): Promise<CloudSyncStatus> {
    if (this.accountSwitchPending) return this.setStatus('needsAttention')
    let remoteDataApplied = false
    try {
      if ((await this.native().accountStatus()) !== 'available') return this.setStatus('local')
      this.accountIdentifier = (await this.native().accountIdentity()) ?? undefined
      if (!this.accountIdentifier) return this.setStatus('local')

      this.setStatus('syncing')
      let incoming = await this.native().fetchChanges()
      for (let pass = 0; pass < MAX_PASSES; pass++) {
        const applied = await this.repository.applyRemoteEntries(incoming)
        if (applied.length > 0) remoteDataApplied = true
        // Only what is still newer here than in iCloud is left to upload.
        const dirty = await this.repository.dirtyEntries()
        if (dirty.length === 0) break
        const result = await this.native().sendChanges(dirty)
        await this.repository.markSynced(result.acknowledged)
        incoming = result.conflicts
        if (incoming.length === 0) break
      }
      return this.setStatus('synced')
    } catch (error) {
      if (!isAccountSwitchError(error)) return this.setStatus('local')
      this.accountSwitchPending = true
      return this.setStatus('needsAttention')
    } finally {
      if (remoteDataApplied) this.options.onRemoteDataApplied?.()
    }
  }

  private handleEvent(event: CloudSyncEvent): void {
    if (event.accountIdentifier) this.accountIdentifier = event.accountIdentifier
    if (event.requiresConfirmation) this.accountSwitchPending = true
    if (this.accountSwitchPending) this.setStatus('needsAttention')
    else if (event.accountStatus === 'available' && this.active) void this.syncNow()
    else this.setStatus('local')
  }

  private setStatus(status: CloudSyncStatus): CloudSyncStatus {
    if (this.status === status) return status
    this.status = status
    for (const listener of this.statusListeners) {
      try {
        listener(status)
      } catch {
        // A status observer cannot interrupt syncing.
      }
    }
    return status
  }
}
