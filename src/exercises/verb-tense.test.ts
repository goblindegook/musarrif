import { afterEach, describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { verbTenseExercise } from './verb-tense'

const UNVOICED_KEYS = new Set([
  'tense.past',
  'tense.present.indicative',
  'tense.present.subjunctive',
  'tense.present.jussive',
  'tense.future',
  'tense.active.imperative',
])

const VOICED_KEYS = new Set([
  'tense.active.past',
  'tense.active.present.indicative',
  'tense.active.present.subjunctive',
  'tense.active.present.jussive',
  'tense.active.future',
  'tense.active.imperative',
  'tense.passive.past',
  'tense.passive.present.indicative',
  'tense.passive.present.subjunctive',
  'tense.passive.present.jussive',
  'tense.passive.future',
])

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

  test('easy: options are unvoiced tense keys', () => {
    const { options } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options.every((o) => UNVOICED_KEYS.has(o))).toBe(true)
  })

  test('medium: options are unvoiced tense keys', () => {
    const { options } = verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 2 })
    expect(options.every((o) => UNVOICED_KEYS.has(o))).toBe(true)
  })

  test('hard: options are voiced tense keys (imperative unprefixed)', () => {
    const { options } = verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 5 })
    expect(options.every((o) => VOICED_KEYS.has(o))).toBe(true)
  })

  test('easy: correct answer is the past tense key (random=0)', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer]).toBe('tense.past')
  })
})

describe('tenseExercise distractor strategies', () => {
  test('easy: three distractors are unvoiced tense keys distinct from the correct answer', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => UNVOICED_KEYS.has(d))).toBe(true)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })

  test('hard: all options are voiced tense keys', () => {
    const { options, answer } = verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 5 })
    expect(options.every((o) => VOICED_KEYS.has(o))).toBe(true)
    expect(VOICED_KEYS.has(options[answer])).toBe(true)
  })
})

describe('verbTenseExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbTense:[a-z]+:\d+:[\w.]+:\w+$/)
  })
})
