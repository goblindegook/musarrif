import { afterEach, describe, expect, test, vi } from 'vitest'
import { verbPronounExercise } from './verb-pronoun'

const ALL_PRONOUN_KEYS = new Set(['أَنَا', 'نَحْنُ', 'أَنْتَ', 'أَنْتِ', 'أَنْتُمَا', 'أَنْتُمْ', 'أَنْتُنَّ', 'هُوَ', 'هِيَ', 'هُمَا', 'هُمْ', 'هُنَّ'])

const DUAL_OPTIONS = new Set(['أَنْتُمَا', 'هُمَا'])

describe('verbPronounExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "verbPronoun"', () => {
    expect(verbPronounExercise().kind).toBe('verbPronoun')
  })

  test('returns the correct translation key', () => {
    expect(verbPronounExercise().promptTranslationKey).toBe('exercise.prompt.verbPronoun')
  })

  test('returns exactly four options', () => {
    expect(verbPronounExercise().options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = verbPronounExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = verbPronounExercise()
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word is non-empty', () => {
    expect(verbPronounExercise().word.length).toBeGreaterThan(0)
  })

  test('options are Arabic pronouns', () => {
    const { options } = verbPronounExercise()
    expect(options.every((o) => ALL_PRONOUN_KEYS.has(o))).toBe(true)
  })
})

describe('verbPronounExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('easy: word has full diacritics (random=0 → active past 1s of شعر)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise('easy').word).toEqualT('شَعَرْتُ')
  })

  test('medium: word has some diacritics (random=0 → active past 1s of شعر)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise('medium').word).toEqualT('شَعَرتُ')
  })

  test('hard: word has no diacritics (random=0 → active past 1s of شعر)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise('hard').word).toEqualT('شعرت')
  })

  test('easy: options never include dual pronouns', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbPronounExercise('easy')
    expect(options.some((o) => DUAL_OPTIONS.has(o))).toBe(false)
  })

  test('defaults to easy difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbPronounExercise().word).toBe(verbPronounExercise('easy').word)
  })

  test('easy: correct answer is أَنَا (random=0 → 1s)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbPronounExercise('easy')
    expect(options[answer]).toBe('أَنَا')
  })

  test('medium: correct answer is أَنَا (random=0 → 1s)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbPronounExercise('medium')
    expect(options[answer]).toBe('أَنَا')
  })

  test('hard: correct answer is أَنَا (random=0 → 1s)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbPronounExercise('hard')
    expect(options[answer]).toBe('أَنَا')
  })
})

describe('verbPronounExercise distractor strategies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('distractors do not produce the same conjugation as the correct answer (easy)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer, word } = verbPronounExercise('easy')
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => d !== word)).toBe(true)
  })

  test('hard: distractors whose conjugation strips to the same as the word are excluded', () => {
    // active past 1s شَعَرْتُ → stripped شعرت
    // 2ms شَعَرْتَ → strips to شعرت (same) → excluded
    // 2fs شَعَرْتِ → strips to شعرت (same) → excluded
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbPronounExercise('hard')
    expect(options).not.toContain('أَنْتَ')
    expect(options).not.toContain('أَنْتِ')
  })
})

describe('verbPronounExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbPronounExercise('easy').cardKey).toMatch(/^verbPronoun:[a-z]+:\d+:[\w-]+:\w+$/)
  })
})
