import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { getMobileUserDataRepository } from './mobile-repository'
import {
  isSyncedUserDataKey,
  type UserDataKey,
  type UserDataRepository,
  type UserDataValue,
  type ValidatedUserDataSnapshot,
} from './schema'
import { UserDataStore, type UserDataValues } from './UserDataStore'

interface UserDataContextValue {
  readonly ready: boolean
  readonly error?: Error
  readonly store: UserDataStore
  readonly put: (key: UserDataKey, value: UserDataValue) => Promise<void>
  readonly remove: (key: UserDataKey) => Promise<void>
  readonly refresh: () => Promise<void>
  readonly replaceExportedData: (snapshot: ValidatedUserDataSnapshot) => Promise<void>
}

const UserDataContext = createContext<UserDataContextValue | null>(null)

export function UserDataProvider({
  children,
  repositoryFactory = getMobileUserDataRepository,
}: {
  children: ReactNode
  repositoryFactory?: () => Promise<UserDataRepository>
}) {
  const [store] = useState(() => new UserDataStore())
  const [repository, setRepository] = useState<UserDataRepository>()
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<Error>()
  const writeQueue = useRef<Promise<void>>(Promise.resolve())

  useEffect(() => {
    let active = true
    void repositoryFactory()
      .then(async (opened) => {
        const snapshot = await opened.hydrate()
        if (!active) return
        store.update(() => snapshot.values)
        setRepository(opened)
        setReady(true)
      })
      .catch((cause: unknown) => {
        if (!active) return
        setError(cause instanceof Error ? cause : new Error(String(cause)))
      })
    return () => {
      active = false
    }
  }, [repositoryFactory, store])

  const enqueue = useCallback(
    <T,>(task: (repository: UserDataRepository) => Promise<T>): Promise<T> => {
      if (!repository) return Promise.reject(new Error('Local user data is not ready.'))
      const result = writeQueue.current.then(() => task(repository))
      writeQueue.current = result.then(
        () => undefined,
        () => undefined,
      )
      return result
    },
    [repository],
  )

  // Writes land in the store immediately, so the next read already sees them; a failed write rolls back.
  const writeThrough = useCallback(
    async (
      key: UserDataKey,
      next: UserDataValue | undefined,
      persist: (repository: UserDataRepository) => Promise<void>,
    ) => {
      const previous = store.getValues()[key]
      const apply = (value: UserDataValue | undefined) =>
        store.update((current) => {
          const values = { ...current }
          if (value === undefined) delete values[key]
          else values[key] = value
          return values
        })
      apply(next)
      try {
        await enqueue(persist)
      } catch (cause) {
        apply(previous)
        throw cause
      }
    },
    [enqueue, store],
  )

  const put = useCallback(
    (key: UserDataKey, value: UserDataValue) => writeThrough(key, value, (current) => current.put(key, value)),
    [writeThrough],
  )

  const remove = useCallback(
    (key: UserDataKey) => writeThrough(key, undefined, (current) => current.remove(key)),
    [writeThrough],
  )

  const replaceExportedData = useCallback(
    async (snapshot: ValidatedUserDataSnapshot) => {
      await enqueue((current) => current.replaceExportedData(snapshot))
      store.update((current) => {
        const next = { ...current }
        for (const rawKey of Object.keys(next) as UserDataKey[]) {
          if (isSyncedUserDataKey(rawKey)) delete next[rawKey]
        }
        return { ...next, ...snapshot.values }
      })
    },
    [enqueue, store],
  )

  // Remote sync writes to the repository behind the provider's back.
  const refresh = useCallback(async () => {
    const snapshot = await enqueue((current) => current.hydrate())
    store.update(() => snapshot.values)
  }, [enqueue, store])

  const value = useMemo(
    () => ({ ready, error, store, put, remove, refresh, replaceExportedData }),
    [error, put, ready, refresh, remove, replaceExportedData, store],
  )
  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

export function useUserData(): UserDataContextValue {
  const value = useContext(UserDataContext)
  if (!value) throw new Error('useUserData must be used inside UserDataProvider.')
  return value
}

export function useUserDataSelector<T>(
  select: (values: UserDataValues) => T,
  isEqual: (previous: T, next: T) => boolean = Object.is,
): T {
  const { store } = useUserData()
  const cache = useRef<{ values: UserDataValues; select: typeof select; selected: T }>(undefined)
  const getSnapshot = () => {
    const values = store.getValues()
    const cached = cache.current
    if (cached?.values === values && cached.select === select) return cached.selected
    const next = select(values)
    const selected = cached && isEqual(cached.selected, next) ? cached.selected : next
    cache.current = { values, select, selected }
    return selected
  }
  return useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot)
}

export function useUserDataValue(key: UserDataKey): UserDataValue | undefined {
  return useUserDataSelector((values) => values[key])
}
