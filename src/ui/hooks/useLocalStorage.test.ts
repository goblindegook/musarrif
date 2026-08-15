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
