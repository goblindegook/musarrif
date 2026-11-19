import { act, cleanup, renderHook, waitFor } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { useSrsStore } from './useSrsStore'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('useSRSStore', () => {
  test('reads cards stored by a v1 app under their v2 keys', () => {
    const state = { interval: 6, ef: 2.5, repetitions: 2, dueDate: '2026-03-27' }
    localStorage.setItem('conjugator:srs', JSON.stringify({ 'conjugation:sound:1:active.past:3ms': state }))

    const { result } = renderHook(() => useSrsStore())

    expect(result.current[0]).toEqual({ 'production:verb:sound:1:active.past:3ms': state })
  })

  test('keeps oversized persisted data untouched', async () => {
    const cardKey = 'production:verb:sound:1:active.past:3ms'
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({
        [cardKey]: {
          interval: 145313,
          ef: 2.5,
          repetitions: 13,
          dueDate: '2424-01-30',
        },
      }),
    )

    renderHook(() => useSrsStore())

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
      expect(stored[cardKey]).toMatchObject({
        interval: 145313,
        dueDate: '2424-01-30',
      })
    })
  })

  test('records answer updates through the hook API', async () => {
    const cardKey = 'production:verb:sound:1:active.past:3ms'

    const { result } = renderHook(() => useSrsStore())
    act(() => {
      const [, recordSrsAnswer] = result.current
      recordSrsAnswer(cardKey, 'correct')
    })

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:srs') ?? '{}')
      expect(stored[cardKey]).toMatchObject({
        interval: 1,
        repetitions: 1,
      })
      expect(stored[cardKey].ef).toBeCloseTo(2.5)
    })
  })
})
