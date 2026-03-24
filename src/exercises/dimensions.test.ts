import { describe, expect, test } from 'vitest'
import {
  type DimensionStore,
  enforcePrerequisites,
  exerciseDiacritics,
  INITIAL_DIMENSION_PROFILE,
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

describe('enforcePrerequisites', () => {
  test('no-ops a valid profile', () => {
    expect(enforcePrerequisites(INITIAL_DIMENSION_PROFILE)).toEqual(INITIAL_DIMENSION_PROFILE)
  })

  test('rolls back tenses from 2 to 1 when pronouns < 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 1 }).tenses).toBe(1)
  })

  test('keeps tenses at 2 when pronouns >= 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2 }).tenses).toBe(2)
  })

  test('rolls back nominals from 1 to 0 when tenses < 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, nominals: 1, tenses: 1 }).nominals).toBe(0)
  })

  test('rolls back nominals from 2 to 1 when forms < 1', () => {
    expect(
      enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, nominals: 2, tenses: 2, pronouns: 2, forms: 0 }).nominals,
    ).toBe(1)
  })

  test('rolls back diacritics from 2 to 1 when not all dimensions at max', () => {
    expect(
      enforcePrerequisites({
        ...INITIAL_DIMENSION_PROFILE,
        diacritics: 2,
        tenses: 4,
        pronouns: 3,
        forms: 3,
        rootTypes: 3,
        nominals: 1,
      }).diacritics,
    ).toBe(1)
  })

  test('keeps diacritics at 2 when all dimensions at max', () => {
    expect(
      enforcePrerequisites({
        ...INITIAL_DIMENSION_PROFILE,
        diacritics: 2,
        tenses: 4,
        pronouns: 3,
        forms: 3,
        rootTypes: 3,
        nominals: 2,
      }).diacritics,
    ).toBe(2)
  })

  test('cascades: tenses rollback also rolls back nominals', () => {
    const result = enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 1, nominals: 1 })
    expect(result.tenses).toBe(1)
    expect(result.nominals).toBe(0)
  })

  test('cascades: tenses rollback also rolls back diacritics', () => {
    const result = enforcePrerequisites({ tenses: 2, pronouns: 1, forms: 3, rootTypes: 3, nominals: 2, diacritics: 2 })
    expect(result.tenses).toBe(1)
    expect(result.diacritics).toBe(1)
  })
})

describe('promoteDimensions', () => {
  function filledWindow(correct: number, total = 20): boolean[] {
    return Array.from({ length: total }, (_, i) => i < correct)
  }

  test('does not promote with fewer than 20 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile },
        windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(20, 19) },
      }).profile.forms,
    ).toBe(0)
  })

  test('does not promote below 80% accuracy', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile },
        windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(15) },
      }).profile.forms,
    ).toBe(0)
  })

  test('promotes at exactly 80% accuracy', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile },
        windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(16) },
      }).profile.forms,
    ).toBe(1)
  })

  test('clears window after promotion', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile },
        windows: { ...INITIAL_DIMENSION_STORE.windows, forms: filledWindow(20) },
      }).windows.forms,
    ).toEqual([])
  })

  test('does not promote beyond max level', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 4, pronouns: 3 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, tenses: filledWindow(20) },
      }).profile.tenses,
    ).toBe(4)
  })

  test('nominals blocked at level 0 until tenses >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 1, pronouns: 2 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(0)
  })

  test('nominals promotes to level 1 when tenses >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 2, pronouns: 2 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(1)
  })

  test('nominals blocked at level 1 until forms >= 1', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 2, pronouns: 2, nominals: 1, forms: 0 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(1)
  })

  test('nominals promotes to level 2 when forms >= 1', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 2, pronouns: 2, nominals: 1, forms: 1 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(2)
  })

  test('each dimension advances independently', () => {
    const next = promoteDimensions({
      profile: { ...INITIAL_DIMENSION_STORE.profile },
      windows: {
        ...INITIAL_DIMENSION_STORE.windows,
        forms: filledWindow(20),
        tenses: filledWindow(15),
      },
    })
    expect(next.profile.forms).toBe(1)
    expect(next.profile.tenses).toBe(0)
  })

  test('promoting tenses allows nominals to cascade in same call', () => {
    const next = promoteDimensions({
      profile: { ...INITIAL_DIMENSION_STORE.profile, tenses: 1, pronouns: 2 },
      windows: {
        ...INITIAL_DIMENSION_STORE.windows,
        tenses: filledWindow(20),
        nominals: filledWindow(20),
      },
    })
    expect(next.profile.tenses).toBe(2)
    expect(next.profile.nominals).toBe(1)
  })

  test('corrects legacy diacritics: 2 even with no window activity', () => {
    expect(
      promoteDimensions({
        profile: {
          diacritics: 2,
          tenses: 4,
          pronouns: 3,
          forms: 3,
          rootTypes: 3,
          nominals: 1,
        },
        windows: INITIAL_DIMENSION_STORE.windows,
      }).profile.diacritics,
    ).toBe(1)
  })

  test('tenses blocked at level 1 until pronouns >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 1, pronouns: 1 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, tenses: filledWindow(20) },
      }).profile.tenses,
    ).toBe(1)
  })

  test('tenses promotes to level 2 when pronouns >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 1, pronouns: 2 },
        windows: { ...INITIAL_DIMENSION_STORE.windows, tenses: filledWindow(20) },
      }).profile.tenses,
    ).toBe(2)
  })

  test('diacritics blocked at level 1 until all other dimensions are at max', () => {
    expect(
      promoteDimensions({
        profile: {
          ...INITIAL_DIMENSION_PROFILE,
          diacritics: 1,
          tenses: 4,
          pronouns: 3,
          forms: 3,
          rootTypes: 3,
          nominals: 1,
        },
        windows: { ...INITIAL_DIMENSION_STORE.windows, diacritics: filledWindow(20) },
      }).profile.diacritics,
    ).toBe(1)
  })

  test('diacritics promotes to level 2 when all other dimensions are at max', () => {
    expect(
      promoteDimensions({
        profile: {
          ...INITIAL_DIMENSION_PROFILE,
          diacritics: 1,
          tenses: 4,
          pronouns: 3,
          forms: 3,
          rootTypes: 3,
          nominals: 2,
        },
        windows: { ...INITIAL_DIMENSION_STORE.windows, diacritics: filledWindow(20) },
      }).profile.diacritics,
    ).toBe(2)
  })
})
