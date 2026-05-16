import { act, renderHook } from '@testing-library/preact'
import { beforeEach, expect, test } from 'vitest'
import { useStats } from './useStats'

beforeEach(() => {
  localStorage.clear()
})

test('syncs stats across multiple useStats instances in the same document', () => {
  const first = renderHook(() => useStats())
  const second = renderHook(() => useStats())

  act(() => {
    first.result.current.recordResult('correct')
  })

  expect(second.result.current.stats[0]?.correct ?? 0).toBe(1)
})
