import { act, cleanup, renderHook, waitFor } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { useDimensionStore } from './useDimensionStore'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

const INITIAL_DIMENSION_WINDOWS = {
  tenses: [],
  pronouns: [],
  diacritics: [],
  forms: [],
  rootTypes: [],
  nominals: [],
}

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('useDimensionStore', () => {
  test('clamps stored profile levels above current maximums and persists the sanitized profile', async () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: {
          ...INITIAL_DIMENSION_PROFILE,
          tenses: 5,
          pronouns: 3,
          forms: 9,
          rootTypes: 5,
          diacritics: 2,
          nominals: 2,
        },
        windows: INITIAL_DIMENSION_WINDOWS,
      }),
    )

    const { result } = renderHook(() => useDimensionStore())

    expect(result.current[0].tenses).toBe(4)
    expect(result.current[0].nominals).toBe(2)

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:dimensions') ?? '{}')
      expect(stored.profile.tenses).toBe(4)
      expect(stored.profile.nominals).toBe(2)
    })
  })

  test('enforces prerequisites on stored profile and persists the enforced profile', async () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: {
          ...INITIAL_DIMENSION_PROFILE,
          tenses: 1,
          nominals: 1,
        },
        windows: INITIAL_DIMENSION_WINDOWS,
      }),
    )

    const { result } = renderHook(() => useDimensionStore())

    expect(result.current[0].tenses).toBe(1)
    expect(result.current[0].nominals).toBe(0)

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:dimensions') ?? '{}')
      expect(stored.profile.tenses).toBe(1)
      expect(stored.profile.nominals).toBe(0)
    })
  })

  test('records correct answers, promotes dimensions, and exposes unlocks', async () => {
    localStorage.setItem(
      'conjugator:dimensions',
      JSON.stringify({
        profile: {
          ...INITIAL_DIMENSION_PROFILE,
          pronouns: 1,
          forms: 0,
        },
        windows: {
          ...INITIAL_DIMENSION_WINDOWS,
          forms: Array(19).fill(true),
        },
      }),
    )

    const { result } = renderHook(() => useDimensionStore())

    act(() => {
      result.current[2](['forms', 'rootTypes', 'diacritics'], true)
    })

    await waitFor(() => {
      expect(result.current[0].forms).toBe(1)
      expect(result.current[1].some((unlock) => unlock.items.includes('exercise.unlock.form.2'))).toBe(true)
    })
  })

  test('records incorrect answers without unlocks and keeps profile unchanged', async () => {
    const { result } = renderHook(() => useDimensionStore())

    act(() => {
      result.current[2](['forms'], false)
    })

    await waitFor(() => {
      const stored = JSON.parse(localStorage.getItem('conjugator:dimensions') ?? '{}')
      expect(stored.profile.forms).toBe(0)
      expect(stored.windows.forms).toEqual([false])
      expect(result.current[0].forms).toBe(0)
      expect(result.current[1]).toHaveLength(0)
    })
  })
})
