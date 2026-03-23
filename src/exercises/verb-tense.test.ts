import { afterEach, describe, expect, test, vi } from 'vitest'
import { verbTenseExercise } from './verb-tense'

const UNVOICED_KEYS = new Set([
  'exercise.tense.option.past',
  'exercise.tense.option.present',
  'exercise.tense.option.subjunctive',
  'exercise.tense.option.jussive',
  'exercise.tense.option.future',
  'exercise.tense.option.imperative',
])

const VOICED_KEYS = new Set([
  'exercise.tense.option.active.past',
  'exercise.tense.option.active.present',
  'exercise.tense.option.active.subjunctive',
  'exercise.tense.option.active.jussive',
  'exercise.tense.option.active.future',
  'exercise.tense.option.imperative',
  'exercise.tense.option.passive.past',
  'exercise.tense.option.passive.present',
  'exercise.tense.option.passive.subjunctive',
  'exercise.tense.option.passive.jussive',
  'exercise.tense.option.passive.future',
])

describe('tenseExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "tense"', () => {
    expect(verbTenseExercise().kind).toBe('verbTense')
  })

  test('returns the correct translation key', () => {
    expect(verbTenseExercise().promptTranslationKey).toBe('exercise.prompt.verbTense')
  })

  test('returns exactly four options', () => {
    expect(verbTenseExercise().options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = verbTenseExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = verbTenseExercise()
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word is non-empty', () => {
    expect(verbTenseExercise().word.length).toBeGreaterThan(0)
  })
})

describe('tenseExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // شعر Form I, active past 1s — شَعَرَ "to feel/sense"
  test('easy: word is شَعَرْتُ (active past 1s, all diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise('easy').word).toEqualT('شَعَرْتُ')
  })

  test('medium: word is شَعَرتُ (active past 1s, some diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise('medium').word).toEqualT('شَعَرتُ')
  })

  test('hard: word is شعرت (active past 1s, some diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise('hard').word).toEqualT('شعرت')
  })

  test('easy: options are unvoiced tense keys', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbTenseExercise('easy')
    expect(options.every((o) => UNVOICED_KEYS.has(o))).toBe(true)
  })

  test('medium: options are unvoiced tense keys', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbTenseExercise('medium')
    expect(options.every((o) => UNVOICED_KEYS.has(o))).toBe(true)
  })

  test('hard: options are voiced tense keys (imperative unprefixed)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = verbTenseExercise('hard')
    expect(options.every((o) => VOICED_KEYS.has(o))).toBe(true)
  })

  test('defaults to easy difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise().word).toBe(verbTenseExercise('easy').word)
  })

  test('easy: correct answer is the past tense key (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbTenseExercise('easy')
    expect(options[answer]).toBe('exercise.tense.option.past')
  })
})

describe('tenseExercise distractor strategies', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('easy: three distractors are unvoiced tense keys distinct from the correct answer', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = verbTenseExercise('easy')
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => UNVOICED_KEYS.has(d))).toBe(true)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })

  test('hard: all options are voiced tense keys', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    const { options, answer } = verbTenseExercise('hard')
    expect(options.every((o) => VOICED_KEYS.has(o))).toBe(true)
    expect(VOICED_KEYS.has(options[answer])).toBe(true)
  })
})

describe('verbTenseExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbTenseExercise('easy').cardKey).toMatch(/^verbTense:[a-z]+:\d+:[\w-]+:\w+$/)
  })
})
