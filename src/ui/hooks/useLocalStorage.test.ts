import { cleanup } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { getUserData, importUserData } from './useLocalStorage'

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

describe('getUserData', () => {
  test('returns INITIAL_DIMENSION_PROFILE when no dimensions stored', () => {
    const data = getUserData()
    expect(data.dimensions.profile).toEqual(INITIAL_DIMENSION_PROFILE)
  })

  test('returns stored dimension profile', () => {
    const profile = { ...INITIAL_DIMENSION_PROFILE, tenses: 2 as const, pronouns: 2 as const }
    localStorage.setItem('conjugator:dimensions', JSON.stringify({ profile, windows: INITIAL_DIMENSION_WINDOWS }))
    const data = getUserData()
    expect(data.dimensions.profile.tenses).toBe(2)
  })

  test('rolls back dimension levels that violate prerequisites', () => {
    const profile = {
      ...INITIAL_DIMENSION_PROFILE,
      diacritics: 2 as const,
      tenses: 4 as const,
      pronouns: 3 as const,
      forms: 3 as const,
      rootTypes: 3 as const,
      nominals: 1 as const,
    }
    localStorage.setItem('conjugator:dimensions', JSON.stringify({ profile, windows: INITIAL_DIMENSION_WINDOWS }))
    const data = getUserData()
    expect(data.dimensions.profile.diacritics).toBe(1)
  })

  test('clamps stored dimension profile levels above current maximums', () => {
    const profile = {
      ...INITIAL_DIMENSION_PROFILE,
      tenses: 5,
      pronouns: 3,
      diacritics: 2,
      forms: 9,
      rootTypes: 5,
      nominals: 2,
    }
    localStorage.setItem('conjugator:dimensions', JSON.stringify({ profile, windows: INITIAL_DIMENSION_WINDOWS }))
    const data = getUserData()
    expect(data.dimensions.profile.tenses).toBe(4)
    expect(data.dimensions.profile.nominals).toBe(2)
  })

  test('does not include exerciseDifficulty in export', () => {
    const data = getUserData() as Record<string, unknown>
    expect((data.settings as Record<string, unknown>).exerciseDifficulty).toBeUndefined()
  })
})

describe('importUserData', () => {
  test('imports valid dimension profile', () => {
    const profile = { ...INITIAL_DIMENSION_PROFILE, forms: 1 as const }
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile },
    })
    expect(importUserData(payload)).toBe(true)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile.forms).toBe(1)
  })

  test('imports dimension profile with max tenses level (4)', () => {
    const profile = { ...INITIAL_DIMENSION_PROFILE, tenses: 5, pronouns: 3, forms: 9, rootTypes: 5 }
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile },
    })
    importUserData(payload)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile.tenses).toBe(4)
  })

  test('imports dimension profile with high forms level (9)', () => {
    const profile = { ...INITIAL_DIMENSION_PROFILE, forms: 9 }
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile },
    })
    importUserData(payload)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile.forms).toBe(9)
  })

  test('imports dimension profile with max rootTypes level (5)', () => {
    const profile = { ...INITIAL_DIMENSION_PROFILE, rootTypes: 5, pronouns: 1 }
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile },
    })
    importUserData(payload)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile.rootTypes).toBe(5)
  })

  test('resets windows to empty on import', () => {
    const profile = INITIAL_DIMENSION_PROFILE
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: {
        profile,
        windows: { tenses: [true, false], pronouns: [], diacritics: [], forms: [], rootTypes: [], nominals: [] },
      },
    })
    importUserData(payload)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.windows.tenses).toEqual([])
  })

  test('clamps oversized imported dimensions while defaulting missing fields', () => {
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile: { tenses: 99 } },
    })
    importUserData(payload)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile).toEqual({ ...INITIAL_DIMENSION_PROFILE, tenses: 4 })
  })

  test('accepts payload without dimensions field without error', () => {
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all', exerciseDifficulty: 'hard' },
    })
    expect(importUserData(payload)).toBe(true)
  })

  test('keeps oversized imported SRS entries untouched', () => {
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      srs: {
        'conjugation:sound:1:active.past:3ms': {
          interval: 145313,
          ef: 2.5,
          repetitions: 13,
          dueDate: '2424-01-30',
        },
      },
    })

    expect(importUserData(payload)).toBe(true)
    const stored = JSON.parse(localStorage.getItem('conjugator:srs')!)
    expect(stored['conjugation:sound:1:active.past:3ms'].interval).toBe(145313)
    expect(stored['conjugation:sound:1:active.past:3ms'].dueDate).toBe('2424-01-30')
  })
})
