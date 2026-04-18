import { afterEach, describe, expect, test, vi } from 'vitest'
import { TENSES } from '../paradigms/tense'
import { verbTenseExercise } from './verb-tense'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

const UNVOICED_KEYS = new Set(TENSES.map((t) => `tense.${t.replace(/^\w+\./, '')}`))

const VOICED_KEYS = new Set(TENSES.map((t) => `tense.${t}`))

describe('tenseExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "tense"', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbTense')
  })

  test('returns the correct translation key', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe('exercise.prompt.verbTense')
  })

  test('returns four options', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word is non-empty', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
  })
})

describe('tenseExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('diacritics:0 (all): word is شَعَرَ (active past 3ms, all diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).word).toEqualT('شَعَرَ')
  })

  test('diacritics:1 (some): word is شَعَرَ (active past 3ms, some diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 }).word).toEqualT('شَعَرَ')
  })

  test('diacritics:2 (none): word is شعر (active past 3ms, no diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 }).word).toEqualT('شعر')
  })

  test('options are unvoiced tense keys', () => {
    const { options } = verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 2 })
    expect(options.every((o) => UNVOICED_KEYS.has(o))).toBe(true)
  })

  test('options are voiced tense keys (imperative unprefixed) on higher difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 5 })
    expect(options.every((o) => VOICED_KEYS.has(o))).toBe(true)
  })

  test('correct answer is the past tense key (random=0)', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer]).toBe('tense.past')
  })

  test('imperative answer uses unvoiced imperative key', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE, { tense: 'active.imperative' })
    expect(options[answer]).toBe('tense.imperative')
  })
})

describe('tenseExercise distractor strategies', () => {
  test('three distractors are unvoiced tense keys distinct from the correct answer', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => UNVOICED_KEYS.has(d))).toBe(true)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })

  test('all options are voiced tense keys on higher difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 5 })
    expect(options.every((o) => VOICED_KEYS.has(o))).toBe(true)
    expect(VOICED_KEYS).toContain(options[answer])
  })
})

describe('verbTenseExercise with constraints', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('attaches cardKey to returned exercise', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbTense:[a-z]+:\d+:[\w.]+:\w+$/)
  })

  test('uses a valid imperative pronoun when constrained to imperative at pronoun level 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const exercise = verbTenseExercise.generate(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 5 },
      { tense: 'active.imperative' },
    )
    expect(exercise.cardKey).toMatch(/:active\.imperative:2\w+$/)
  })
})
