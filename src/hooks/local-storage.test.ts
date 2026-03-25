import { cleanup } from '@testing-library/preact'
import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_STORE } from '../exercises/dimensions'
import { getUserData, importUserData } from './local-storage'

function utcAddDays(date: string, days: number): string {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

beforeEach(() => {
  localStorage.clear()
})
afterEach(() => {
  cleanup()
  localStorage.clear()
})

describe('getUserData', () => {
  test('returns INITIAL_DIMENSION_STORE.profile when no dimensions stored', () => {
    const data = getUserData()
    expect(data.dimensions.profile).toEqual(INITIAL_DIMENSION_STORE.profile)
  })

  test('returns stored dimension profile', () => {
    const profile = { ...INITIAL_DIMENSION_STORE.profile, tenses: 2 as const, pronouns: 2 as const }
    localStorage.setItem('conjugator:dimensions', JSON.stringify({ profile, windows: INITIAL_DIMENSION_STORE.windows }))
    const data = getUserData()
    expect(data.dimensions.profile.tenses).toBe(2)
  })

  test('rolls back dimension levels that violate prerequisites', () => {
    const profile = {
      ...INITIAL_DIMENSION_STORE.profile,
      diacritics: 2 as const,
      tenses: 4 as const,
      pronouns: 3 as const,
      forms: 3 as const,
      rootTypes: 3 as const,
      nominals: 1 as const,
    }
    localStorage.setItem('conjugator:dimensions', JSON.stringify({ profile, windows: INITIAL_DIMENSION_STORE.windows }))
    const data = getUserData()
    expect(data.dimensions.profile.diacritics).toBe(1)
  })

  test('does not include exerciseDifficulty in export', () => {
    const data = getUserData() as Record<string, unknown>
    expect((data.settings as Record<string, unknown>).exerciseDifficulty).toBeUndefined()
  })

  test('sanitizes persisted SRS entries above one-year cap', () => {
    localStorage.setItem(
      'conjugator:srs',
      JSON.stringify({
        'conjugation:sound:1:active-past:3ms': {
          interval: 145313,
          ef: 2.5,
          repetitions: 13,
          dueDate: '2424-01-30',
        },
      }),
    )

    const data = getUserData()
    const expectedDueDate = utcAddDays(new Date().toISOString().slice(0, 10), 365)
    expect(data.srs['conjugation:sound:1:active-past:3ms'].interval).toBe(365)
    expect(data.srs['conjugation:sound:1:active-past:3ms'].dueDate).toBe(expectedDueDate)
  })
})

describe('importUserData', () => {
  test('imports valid dimension profile', () => {
    const profile = { ...INITIAL_DIMENSION_STORE.profile, forms: 1 as const }
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile },
    })
    expect(importUserData(payload)).toBe(true)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile.forms).toBe(1)
  })

  test('resets windows to empty on import', () => {
    const profile = INITIAL_DIMENSION_STORE.profile
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

  test('falls back to INITIAL_DIMENSION_STORE for invalid profile', () => {
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      dimensions: { profile: { tenses: 99 } },
    })
    importUserData(payload)
    const stored = JSON.parse(localStorage.getItem('conjugator:dimensions')!)
    expect(stored.profile).toEqual(INITIAL_DIMENSION_STORE.profile)
  })

  test('accepts payload without dimensions field without error', () => {
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all', exerciseDifficulty: 'hard' },
    })
    expect(importUserData(payload)).toBe(true)
  })

  test('sanitizes imported SRS entries above one-year cap', () => {
    const payload = JSON.stringify({
      settings: { language: 'en', diacriticsPreference: 'all' },
      srs: {
        'conjugation:sound:1:active-past:3ms': {
          interval: 145313,
          ef: 2.5,
          repetitions: 13,
          dueDate: '2424-01-30',
        },
      },
    })

    expect(importUserData(payload)).toBe(true)
    const stored = JSON.parse(localStorage.getItem('conjugator:srs')!)
    const expectedDueDate = utcAddDays(new Date().toISOString().slice(0, 10), 365)
    expect(stored['conjugation:sound:1:active-past:3ms'].interval).toBe(365)
    expect(stored['conjugation:sound:1:active-past:3ms'].dueDate).toBe(expectedDueDate)
  })
})
