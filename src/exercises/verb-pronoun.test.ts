import { afterEach, describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { verbPronounExercise } from './verb-pronoun'

const ALL_PRONOUN_KEYS = new Set(['أَنَا', 'نَحْنُ', 'أَنْتَ', 'أَنْتِ', 'أَنْتُمَا', 'أَنْتُمْ', 'أَنْتُنَّ', 'هُوَ', 'هِيَ', 'هُمَا', 'هُمْ', 'هُنَّ'])

const DUAL_OPTIONS = new Set(['أَنْتُمَا', 'هُمَا'])

describe('verbPronounExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "verbPronoun"', () => {
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbPronoun')
  })

  test('returns the correct translation key', () => {
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.verbPronoun',
    )
  })

  test('returns exactly four options', () => {
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word is non-empty', () => {
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
  })

  test('options are Arabic pronouns', () => {
    const { options } = verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options.every((o) => ALL_PRONOUN_KEYS.has(o))).toBe(true)
  })
})

describe('verbPronounExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('diacritics:0 (all): word has full diacritics (random=0 → active past 3ms of شعر)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).word).toEqualT('شَعَرَ')
  })

  test('diacritics:1 (some): word has some diacritics (random=0 → active past 3ms of شعر)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 }).word).toEqualT('شَعَرَ')
  })

  test('diacritics:2 (none): word has no diacritics (random=0 → active past 3ms of شعر)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 }).word).toEqualT('شعر')
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

  test('diacritics:2: correct answer is هُوَ (random=0 → 3ms)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbPronounExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 })
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

  test('diacritics:2: distractors whose conjugation strips to the same as the word are excluded', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbPronounExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 })
    expect(options.every((o) => ALL_PRONOUN_KEYS.has(o))).toBe(true)
  })
})

describe('verbPronounExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbPronounExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(
      /^verbPronoun:[a-z]+:\d+:[\w.]+:\w+$/,
    )
  })
})
