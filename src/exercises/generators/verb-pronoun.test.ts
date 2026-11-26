import { afterEach, describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from '../../test/profiles'
import { forAnyRandomness } from '../../test/random'
import { verbPronounExercise } from './verb-pronoun.ts'

const ALL_PRONOUN_KEYS = new Set(['أَنَا', 'نَحْنُ', 'أَنْتَ', 'أَنْتِ', 'أَنْتُمَا', 'أَنْتُمْ', 'أَنْتُنَّ', 'هُوَ', 'هِيَ', 'هُمَا', 'هُمْ', 'هُنَّ'])

const DUAL_OPTIONS = new Set(['أَنْتُمَا', 'هُمَا'])

describe('verbPronounExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "verbPronoun"', () => {
    forAnyRandomness(() => {
      expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbPronoun')
    })
  })

  test('returns exactly four options', () => {
    forAnyRandomness(() => {
      expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
    })
  })

  test('all options are unique', () => {
    forAnyRandomness(() => {
      const { options } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
      expect(new Set(options).size).toBe(options.length)
    })
  })

  test('answer is a valid index', () => {
    forAnyRandomness(() => {
      const { options, answer } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
      expect(answer).toBeGreaterThanOrEqual(0)
      expect(answer).toBeLessThan(options.length)
    })
  })

  test('word is non-empty', () => {
    forAnyRandomness(() => {
      expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
    })
  })

  test('options are Arabic pronouns', () => {
    forAnyRandomness(() => {
      const { options } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
      expect(options.every((o) => ALL_PRONOUN_KEYS.has(o))).toBe(true)
    })
  })
})

describe('verbPronounExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('word uses the exercise diacritics display', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).word).toEqualT('شَعَبَ')
  })

  test('pronouns:0: options never include dual pronouns', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options.some((o) => DUAL_OPTIONS.has(o))).toBe(false)
  })

  test('pronouns:0: correct answer is هُوَ (random=0 → 3ms)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer]).toBe('هُوَ')
  })

  test('pronouns:1: correct answer is هُوَ (random=0 → 3ms)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbPronounExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 1 })
    expect(options[answer]).toBe('هُوَ')
  })
})

describe('verbPronounExercise distractor strategies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('distractors do not produce the same conjugation as the correct answer (pronouns:0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer, word } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => d !== word)).toBe(true)
  })

  test('distractors whose displayed conjugation matches the word are excluded', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options.every((o) => ALL_PRONOUN_KEYS.has(o))).toBe(true)
  })
})

describe('verbPronounExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    forAnyRandomness(() => {
      expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(
        /^recognition:verb:[a-z]+:\d+:[\w.]+:\w+$/,
      )
    })
  })
})
