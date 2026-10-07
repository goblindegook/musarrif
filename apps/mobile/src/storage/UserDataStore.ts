import type { UserDataKey, UserDataSnapshot, UserDataValue } from './schema'

export type UserDataValues = UserDataSnapshot['values']

/** In-memory mirror of the repository. Readers subscribe through selectors, so a write re-renders only who it affects. */
export class UserDataStore {
  private current: UserDataValues = {}
  private readonly listeners = new Set<() => void>()

  getValues = (): UserDataValues => this.current

  subscribe = (listener: () => void): (() => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  update(change: (current: UserDataValues) => UserDataValues): void {
    this.current = change(this.current)
    for (const listener of this.listeners) listener()
  }
}

/** Selectors return fresh objects, so each one says when two results mean the same thing. */
export function shallowEqualRecords(left: Readonly<Record<string, unknown>>, right: Readonly<Record<string, unknown>>) {
  const leftKeys = Object.keys(left)
  return leftKeys.length === Object.keys(right).length && leftKeys.every((key) => Object.is(left[key], right[key]))
}

export function recordsWithPrefix(values: UserDataValues, prefix: string): UserDataValues {
  const matches: Partial<Record<UserDataKey, UserDataValue>> = {}
  for (const [key, value] of Object.entries(values) as [UserDataKey, UserDataValue | undefined][]) {
    if (key.startsWith(prefix) && value != null) matches[key] = value
  }
  return matches
}
