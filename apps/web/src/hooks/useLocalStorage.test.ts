import { act, renderHook } from '@testing-library/preact'
import { beforeEach, expect, test } from 'vitest'
import { useLocalStorage } from './useLocalStorage'

beforeEach(() => {
  localStorage.clear()
})

test('syncs value across multiple instances sharing the same key', () => {
  const firstHook = renderHook(() => useLocalStorage('shared', 0))
  const secondHook = renderHook(() => useLocalStorage('shared', 0))

  act(() => {
    const [, setFirst] = firstHook.result.current
    setFirst(42)
  })

  const [second] = secondHook.result.current
  expect(second).toBe(42)
})

test('emits same-tab updates as storage events', () => {
  const storageEvents: StorageEvent[] = []
  const recordStorageEvent = (event: Event) => storageEvents.push(event as StorageEvent)
  const hook = renderHook(() => useLocalStorage('shared', 0))
  window.addEventListener('storage', recordStorageEvent)

  act(() => {
    const [, setValue] = hook.result.current
    setValue(42)
  })

  expect(storageEvents).toHaveLength(1)
  expect(storageEvents[0].key).toBe('conjugator:shared')
  window.removeEventListener('storage', recordStorageEvent)
})

test('does not sync across different keys', () => {
  const aHook = renderHook(() => useLocalStorage('a', 0))
  const bHook = renderHook(() => useLocalStorage('b', 0))

  act(() => {
    const [, setA] = aHook.result.current
    setA(42)
  })

  const [b] = bHook.result.current
  expect(b).toBe(0)
})

test('syncs an external storage update for its key', () => {
  const hook = renderHook(() => useLocalStorage('shared', 0))

  act(() => {
    localStorage.setItem('conjugator:shared', JSON.stringify(42))
    window.dispatchEvent(new StorageEvent('storage', { key: 'conjugator:shared' }))
  })

  const [value] = hook.result.current
  expect(value).toBe(42)
})

test('resets after storage is cleared in another tab', () => {
  localStorage.setItem('conjugator:shared', JSON.stringify(42))
  const hook = renderHook(() => useLocalStorage('shared', 0))

  act(() => {
    localStorage.clear()
    window.dispatchEvent(new StorageEvent('storage', { key: null }))
  })

  const [value] = hook.result.current
  expect(value).toBe(0)
})
