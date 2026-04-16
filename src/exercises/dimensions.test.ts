import { describe, expect, test } from 'vitest'
import {
  type DimensionStore,
  enforcePrerequisites,
  exerciseDiacritics,
  getDimensionUnlocks,
  promoteDimensions,
  pronounPool,
  recordDimensionAnswer,
} from './dimensions'

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

describe('rawPronounPool', () => {
  test('level 0 contains only 3ms', () => {
    expect(pronounPool(0)).toEqual(['3ms'])
  })

  test('level 1 adds singular forms', () => {
    const pool = pronounPool(1)
    expect(pool).toContain('1s')
    expect(pool).toContain('2ms')
    expect(pool).toContain('2fs')
    expect(pool).toContain('3fs')
    expect(pool).not.toContain('1p')
    expect(pool).not.toContain('2d')
  })

  test('level 2 adds plurals but not duals', () => {
    const pool = pronounPool(2)
    expect(pool).toContain('1p')
    expect(pool).toContain('2mp')
    expect(pool).not.toContain('2d')
  })

  test('level 3 includes all 13 pronouns', () => {
    const pool = pronounPool(3)
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
    const next = recordDimensionAnswer(
      { profile: INITIAL_DIMENSION_PROFILE, windows: INITIAL_DIMENSION_WINDOWS },
      ['tenses', 'pronouns', 'forms', 'rootTypes', 'diacritics'],
      true,
    )
    expect(next.windows).toEqual({
      diacritics: [true],
      forms: [true],
      nominals: [],
      pronouns: [true],
      rootTypes: [true],
      tenses: [true],
    })
  })

  test('trims window to 20 entries', () => {
    const fullStore: DimensionStore = {
      profile: INITIAL_DIMENSION_PROFILE,
      windows: {
        ...INITIAL_DIMENSION_WINDOWS,
        forms: Array(20).fill(true),
        rootTypes: Array(20).fill(true),
        diacritics: Array(20).fill(true),
      },
    }
    const next = recordDimensionAnswer(fullStore, ['forms', 'rootTypes', 'diacritics'], true)
    expect(next.windows.forms).toHaveLength(20)
  })

  test('pass answers count as false', () => {
    const next = recordDimensionAnswer(
      { profile: INITIAL_DIMENSION_PROFILE, windows: INITIAL_DIMENSION_WINDOWS },
      ['forms', 'rootTypes', 'diacritics'],
      false,
    )
    expect(next.windows.forms[0]).toBe(false)
  })
})

describe('enforcePrerequisites', () => {
  test('no-ops a valid profile', () => {
    expect(enforcePrerequisites(INITIAL_DIMENSION_PROFILE)).toEqual(INITIAL_DIMENSION_PROFILE)
  })

  test('does not roll back unlocked tenses when pronouns < 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 1 }).tenses).toBe(2)
  })

  test('keeps tenses at 2 when pronouns >= 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2 }).tenses).toBe(2)
  })

  test('rolls back nominals from 1 to 0 when tenses < 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, nominals: 1, tenses: 1, pronouns: 2 }).nominals).toBe(0)
  })

  test('rolls back nominals from 1 to 0 when pronouns < 2', () => {
    expect(enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, nominals: 1, tenses: 2, pronouns: 1 }).nominals).toBe(0)
  })

  test('rolls back nominals from 2 to 1 when forms < 3', () => {
    expect(
      enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, nominals: 2, tenses: 2, pronouns: 2, forms: 2 }).nominals,
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
        tenses: 5,
        pronouns: 3,
        forms: 3,
        rootTypes: 5,
        nominals: 2,
      }).diacritics,
    ).toBe(2)
  })

  test('rolls back nominals to 0 when pronouns drop below plural level, even when tenses stay unlocked', () => {
    const result = enforcePrerequisites({ ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 1, nominals: 1 })
    expect(result.tenses).toBe(2)
    expect(result.nominals).toBe(0)
  })

  test('keeps unlocked tenses while still rolling back diacritics when prerequisites are unmet', () => {
    const result = enforcePrerequisites({ tenses: 2, pronouns: 1, forms: 3, rootTypes: 3, nominals: 2, diacritics: 2 })
    expect(result.tenses).toBe(2)
    expect(result.diacritics).toBe(1)
  })
})

describe('promoteDimensions', () => {
  function filledWindow(correct: number, total = 20): boolean[] {
    return Array.from({ length: total }, (_, i) => i < correct)
  }

  test('diacritics does not promote with only 20 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, diacritics: filledWindow(20) },
      }).profile.diacritics,
    ).toBe(0)
  })

  test('diacritics does not demote with only 20 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, diacritics: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, diacritics: filledWindow(0) },
      }).profile.diacritics,
    ).toBe(1)
  })

  test('diacritics promotes at 80% over 50 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, diacritics: filledWindow(40, 50) },
      }).profile.diacritics,
    ).toBe(1)
  })

  test('diacritics demotes at 40% over 50 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, diacritics: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, diacritics: filledWindow(20, 50) },
      }).profile.diacritics,
    ).toBe(0)
  })

  test('does not demote with fewer than 20 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, forms: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(0, 19) },
      }).profile.forms,
    ).toBe(1)
  })

  test('does not demote above 40% accuracy', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, forms: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(9) },
      }).profile.forms,
    ).toBe(1)
  })

  test('demotes at exactly 40% accuracy', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, forms: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(8) },
      }).profile.forms,
    ).toBe(0)
  })

  test('does not demote below level 0', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, forms: 0 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(0) },
      }).profile.forms,
    ).toBe(0)
  })

  test('clears window after demotion', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, forms: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(8) },
      }).windows.forms,
    ).toEqual([])
  })

  test('demotion cascades via enforcePrerequisites', () => {
    const next = promoteDimensions({
      profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2, nominals: 1 },
      windows: { ...INITIAL_DIMENSION_WINDOWS, tenses: filledWindow(8, 40) },
    })
    expect(next.profile.tenses).toBe(1)
    expect(next.profile.nominals).toBe(0)
  })

  test('does not promote with fewer than 20 answers', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(20, 19) },
      }).profile.forms,
    ).toBe(0)
  })

  test('does not promote below 80% accuracy', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(15) },
      }).profile.forms,
    ).toBe(0)
  })

  test('forms does not promote at exactly 80% accuracy while pronouns are locked', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(16) },
      }).profile.forms,
    ).toBe(0)
  })

  test('forms promotes at exactly 80% accuracy when singular pronouns are unlocked', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(16) },
      }).profile.forms,
    ).toBe(1)
  })

  test('does not promote when allowPromotion is false even above threshold', () => {
    expect(
      promoteDimensions(
        {
          profile: { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
          windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(20) },
        },
        false,
      ).profile.forms,
    ).toBe(0)
  })

  test('clears window after promotion', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, forms: filledWindow(20) },
      }).windows.forms,
    ).toEqual([])
  })

  test('does not promote beyond max level', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 5, pronouns: 3 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, tenses: filledWindow(40, 40) },
      }).profile.tenses,
    ).toBe(5)
  })

  test('nominals blocked at level 0 until tenses >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 1, pronouns: 2 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(0)
  })

  test('nominals blocked at level 0 until pronouns >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(0)
  })

  test('nominals promotes to level 1 when tenses >= 2', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(1)
  })

  test('nominals blocked at level 1 until forms >= 3', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2, nominals: 1, forms: 2 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(1)
  })

  test('nominals promotes to level 2 when forms >= 3', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2, nominals: 1, forms: 3 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, nominals: filledWindow(20) },
      }).profile.nominals,
    ).toBe(2)
  })

  test('each dimension advances independently', () => {
    const next = promoteDimensions({
      profile: { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 },
      windows: {
        ...INITIAL_DIMENSION_WINDOWS,
        forms: filledWindow(20),
        tenses: filledWindow(15),
      },
    })
    expect(next.profile.forms).toBe(1)
    expect(next.profile.tenses).toBe(0)
  })

  test('tenses does not promote while pronouns are locked', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, tenses: filledWindow(20) },
      }).profile.tenses,
    ).toBe(0)
  })

  test('rootTypes does not promote while pronouns are locked', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE },
        windows: { ...INITIAL_DIMENSION_WINDOWS, rootTypes: filledWindow(20) },
      }).profile.rootTypes,
    ).toBe(0)
  })

  test('promoting tenses allows nominals to cascade in same call', () => {
    const next = promoteDimensions({
      profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 1, pronouns: 2 },
      windows: {
        ...INITIAL_DIMENSION_WINDOWS,
        tenses: filledWindow(40, 40),
        nominals: filledWindow(20),
      },
    })
    expect(next.profile.tenses).toBe(2)
    expect(next.profile.nominals).toBe(1)
  })

  test('corrects legacy diacritics: 2 even with no window activity', () => {
    expect(
      promoteDimensions({
        windows: INITIAL_DIMENSION_WINDOWS,
        profile: {
          diacritics: 2,
          tenses: 4,
          pronouns: 3,
          forms: 3,
          rootTypes: 3,
          nominals: 1,
        },
      }).profile.diacritics,
    ).toBe(1)
  })

  test('tenses blocked at level 0 while pronouns are locked', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 0, pronouns: 0 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, tenses: filledWindow(40, 40) },
      }).profile.tenses,
    ).toBe(0)
  })

  test('tenses promotes to level 2 when singular pronouns are unlocked', () => {
    expect(
      promoteDimensions({
        profile: { ...INITIAL_DIMENSION_PROFILE, tenses: 1, pronouns: 1 },
        windows: { ...INITIAL_DIMENSION_WINDOWS, tenses: filledWindow(40, 40) },
      }).profile.tenses,
    ).toBe(2)
  })

  test('pronoun demotion does not re-lock unlocked tenses, forms, or root types', () => {
    const next = promoteDimensions({
      profile: { ...INITIAL_DIMENSION_PROFILE, pronouns: 1, tenses: 2, forms: 1, rootTypes: 1 },
      windows: { ...INITIAL_DIMENSION_WINDOWS, pronouns: filledWindow(8) },
    })
    expect(next.profile).toEqual({ diacritics: 0, forms: 1, nominals: 0, pronouns: 0, rootTypes: 1, tenses: 2 })
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
        windows: { ...INITIAL_DIMENSION_WINDOWS, diacritics: filledWindow(20) },
      }).profile.diacritics,
    ).toBe(1)
  })

  test('diacritics promotes to level 2 when all other dimensions are at max', () => {
    expect(
      promoteDimensions({
        profile: {
          ...INITIAL_DIMENSION_PROFILE,
          diacritics: 1,
          tenses: 5,
          pronouns: 3,
          forms: 3,
          rootTypes: 5,
          nominals: 2,
        },
        windows: { ...INITIAL_DIMENSION_WINDOWS, diacritics: filledWindow(40, 50) },
      }).profile.diacritics,
    ).toBe(2)
  })
})

describe('getDimensionUnlocks', () => {
  test('returns one grouped pronoun unlock item for each pronoun level', () => {
    expect(
      getDimensionUnlocks({ ...INITIAL_DIMENSION_PROFILE, pronouns: 0 }, { ...INITIAL_DIMENSION_PROFILE, pronouns: 1 }),
    ).toEqual([{ dimension: 'pronouns', items: ['exercise.unlock.pronounGroup.singular'] }])
  })

  test('returns unlocked forms when forms level increases from 0 to 1', () => {
    expect(
      getDimensionUnlocks({ ...INITIAL_DIMENSION_PROFILE, forms: 0 }, { ...INITIAL_DIMENSION_PROFILE, forms: 1 }),
    ).toEqual([{ dimension: 'forms', items: ['exercise.unlock.form.2', 'exercise.unlock.form.3'] }])
  })

  test('returns split tense unlock items across a multi-level jump', () => {
    expect(
      getDimensionUnlocks({ ...INITIAL_DIMENSION_PROFILE, tenses: 0 }, { ...INITIAL_DIMENSION_PROFILE, tenses: 2 }),
    ).toEqual([
      {
        dimension: 'tenses',
        items: ['exercise.unlock.tenseGroup.presentIndicative', 'exercise.unlock.tenseGroup.future'],
      },
    ])
  })

  test('returns only future when advancing one level from present to future', () => {
    expect(
      getDimensionUnlocks({ ...INITIAL_DIMENSION_PROFILE, tenses: 1 }, { ...INITIAL_DIMENSION_PROFILE, tenses: 2 }),
    ).toEqual([{ dimension: 'tenses', items: ['exercise.unlock.tenseGroup.future'] }])
  })

  test('returns passive unlock when advancing to highest tense level', () => {
    expect(
      getDimensionUnlocks({ ...INITIAL_DIMENSION_PROFILE, tenses: 4 }, { ...INITIAL_DIMENSION_PROFILE, tenses: 5 }),
    ).toEqual([{ dimension: 'tenses', items: ['exercise.unlock.tenseGroup.passive'] }])
  })

  test('ignores unchanged and demoted dimensions', () => {
    expect(
      getDimensionUnlocks(
        { ...INITIAL_DIMENSION_PROFILE, forms: 1, rootTypes: 2 },
        { ...INITIAL_DIMENSION_PROFILE, forms: 2, rootTypes: 1 },
      ),
    ).toEqual([
      { dimension: 'forms', items: ['exercise.unlock.form.4', 'exercise.unlock.form.5', 'exercise.unlock.form.6'] },
    ])
  })
})
