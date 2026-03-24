import { describe, expect, test } from 'vitest'
import {
  type DimensionStore,
  exerciseDiacritics,
  INITIAL_DIMENSION_STORE,
  promoteDimensions,
  rawPronounPool,
  recordDimensionAnswer,
} from './dimensions'

describe('rawPronounPool', () => {
  test('level 0 contains only 3ms', () => {
    expect(rawPronounPool(0)).toEqual(['3ms'])
  })

  test('level 1 adds singular forms', () => {
    const pool = rawPronounPool(1)
    expect(pool).toContain('1s')
    expect(pool).toContain('2ms')
    expect(pool).toContain('2fs')
    expect(pool).toContain('3fs')
    expect(pool).not.toContain('1p')
    expect(pool).not.toContain('2d')
  })

  test('level 2 adds plurals but not duals', () => {
    const pool = rawPronounPool(2)
    expect(pool).toContain('1p')
    expect(pool).toContain('2mp')
    expect(pool).not.toContain('2d')
  })

  test('level 3 includes all 13 pronouns', () => {
    const pool = rawPronounPool(3)
    expect(pool).toHaveLength(13)
    expect(pool).toContain('2d')
    expect(pool).toContain('3md')
    expect(pool).toContain('3fd')
  })
})

describe('diacriticsDifficulty', () => {
  const word = 'كَتَبَ'
  const wordWithSukoon = 'يَكْتُبُ'

  test('level 0 returns all diacritics', () => {
    expect(exerciseDiacritics(word, 0)).toBe(word)
  })

  test('level 1 returns partial diacritics', () => {
    const result = exerciseDiacritics(wordWithSukoon, 1)
    expect(result).not.toBe(wordWithSukoon)
    expect(result).not.toBe('يكتب')
  })

  test('level 2 strips diacritics', () => {
    expect(exerciseDiacritics(word, 2)).toBe('كتب')
  })
})

describe('recordDimensionAnswer', () => {
  test('appends correct to all touched dimensions', () => {
    const next = recordDimensionAnswer(INITIAL_DIMENSION_STORE, 'conjugation', true)
    expect(next.windows.tenses).toEqual([true])
    expect(next.windows.pronouns).toEqual([true])
    expect(next.windows.forms).toEqual([true])
    expect(next.windows.rootTypes).toEqual([true])
    expect(next.windows.diacritics).toEqual([true])
    expect(next.windows.nominals).toEqual([])
  })

  test('trims window to 20 entries', () => {
    const fullStore: DimensionStore = {
      profile: INITIAL_DIMENSION_STORE.profile,
      windows: {
        ...INITIAL_DIMENSION_STORE.windows,
        forms: Array(20).fill(true),
        rootTypes: Array(20).fill(true),
        diacritics: Array(20).fill(true),
      },
    }
    const next = recordDimensionAnswer(fullStore, 'verbRoot', true)
    expect(next.windows.forms).toHaveLength(20)
  })

  test('pass answers count as false', () => {
    const next = recordDimensionAnswer(INITIAL_DIMENSION_STORE, 'verbRoot', false)
    expect(next.windows.forms[0]).toBe(false)
  })
})

describe('promoteDimensions', () => {
  function filledWindow(correct: number, total = 20): boolean[] {
    return Array.from({ length: total }, (_, i) => i < correct)
  }

  test('does not promote with fewer than 20 answers', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile },
      windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(20, 19) },
    }
    expect(promoteDimensions(store).profile.forms).toBe(0)
  })

  test('does not promote below 80% accuracy', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile },
      windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(15) },
    }
    expect(promoteDimensions(store).profile.forms).toBe(0)
  })

  test('promotes at exactly 80% accuracy', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile },
      windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(16) },
    }
    expect(promoteDimensions(store).profile.forms).toBe(1)
  })

  test('clears window after promotion', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile },
      windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(20) },
    }
    expect(promoteDimensions(store).windows.forms).toEqual([])
  })

  test('does not promote beyond max level', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 4 },
      windows: { ...INITIAL_DIMENSION_STORE.windows, tenses: filledWindow(20) },
    }
    expect(promoteDimensions(store).profile.tenses).toBe(4)
  })

  test('nominals blocked at level 0 until tenses >= 2', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 1 },
      windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
    }
    expect(promoteDimensions(store).profile.nominals).toBe(0)
  })

  test('nominals promotes to level 1 when tenses >= 2', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 2 },
      windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
    }
    expect(promoteDimensions(store).profile.nominals).toBe(1)
  })

  test('nominals blocked at level 1 until forms >= 1', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 2, nominals: 1, forms: 0 },
      windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
    }
    expect(promoteDimensions(store).profile.nominals).toBe(1)
  })

  test('nominals promotes to level 2 when forms >= 1', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 2, nominals: 1, forms: 1 },
      windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
    }
    expect(promoteDimensions(store).profile.nominals).toBe(2)
  })

  test('each dimension advances independently', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile },
      windows: {
        ...INITIAL_DIMENSION_STORE.windows,
        forms: filledWindow(20),
        tenses: filledWindow(15),
      },
    }
    const next = promoteDimensions(store)
    expect(next.profile.forms).toBe(1)
    expect(next.profile.tenses).toBe(0)
  })

  test('is single-pass: promoting tenses does not cascade to nominals in same call', () => {
    const store: DimensionStore = {
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 1 },
      windows: {
        ...INITIAL_DIMENSION_STORE.windows,
        tenses: filledWindow(20),
        nominals: filledWindow(20),
      },
    }
    const next = promoteDimensions(store)
    expect(next.profile.tenses).toBe(2)
    expect(next.profile.nominals).toBe(0)
  })
})
