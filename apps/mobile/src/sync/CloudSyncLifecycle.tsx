import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppState, type AppStateStatus } from 'react-native'
import { getMobileUserDataRepository } from '../storage/mobile-repository'
import { useUserData } from '../storage/UserDataProvider'
import { CloudSyncCoordinator, type CloudSyncStatus } from './CloudSyncCoordinator'
import { cloudSyncModule } from './native-cloud-sync'

interface CloudSyncLifecycleValue {
  readonly status: CloudSyncStatus
  readonly confirmAccountSwitch: () => Promise<CloudSyncStatus>
}

const CloudSyncLifecycleContext = createContext<CloudSyncLifecycleValue | null>(null)

export function CloudSyncLifecycleProvider({ children }: { children: ReactNode }) {
  const { ready, refresh } = useUserData()
  const coordinatorRef = useRef<CloudSyncCoordinator | undefined>(undefined)
  const [status, setStatus] = useState<CloudSyncStatus>('local')

  useEffect(() => {
    if (!ready) return
    let active = true
    let statusSubscription: { remove: () => void } | undefined
    let appStateSubscription: { remove: () => void } | undefined

    void getMobileUserDataRepository()
      .then((repository) => {
        if (!active) return
        const coordinator = new CloudSyncCoordinator(repository, cloudSyncModule, {
          onRemoteDataApplied: () => void refresh(),
        })
        coordinatorRef.current = coordinator
        statusSubscription = coordinator.addStatusListener((next) => {
          if (active) setStatus(next)
        })
        appStateSubscription = AppState.addEventListener('change', (state: AppStateStatus) => {
          if (state === 'active') void coordinator.syncNow()
        })
        void coordinator.start().then((next) => {
          if (active) setStatus(next)
        })
      })
      .catch(() => {
        if (active) setStatus('local')
      })

    return () => {
      active = false
      statusSubscription?.remove()
      appStateSubscription?.remove()
      coordinatorRef.current?.stop()
      coordinatorRef.current = undefined
    }
  }, [ready, refresh])

  const confirmAccountSwitch = useCallback(async () => {
    const coordinator = coordinatorRef.current
    if (!coordinator) return status
    const next = await coordinator.confirmAccountSwitch()
    setStatus(next)
    return next
  }, [status])

  const value = useMemo(() => ({ status, confirmAccountSwitch }), [confirmAccountSwitch, status])
  return <CloudSyncLifecycleContext.Provider value={value}>{children}</CloudSyncLifecycleContext.Provider>
}

export function useCloudSyncLifecycle(): CloudSyncLifecycleValue | null {
  return useContext(CloudSyncLifecycleContext)
}
