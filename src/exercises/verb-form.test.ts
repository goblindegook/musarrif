import { afterEach, describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { verbFormExercise } from './verb-form'

describe('generateFormExercise', () => {
  test('returns kind "form"', () => {
    expect(verbFormExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbForm')
  })

  test('returns a non-empty Arabic word', () => {
    const { word } = verbFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(word.length).toBeGreaterThan(0)
  })

  test('returns the correct translation key', () => {
    expect(verbFormExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe('exercise.prompt.verbForm')
  })

  test('returns exactly four options', () => {
    expect(verbFormExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('options are Roman numerals sorted in ascending form order', () => {
    const { options } = verbFormExercise.generate(INITIAL_DIMENSION_PROFILE)

    const formNumbers = options.map((o) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].indexOf(o) + 1)
    expect(formNumbers).toEqual([...formNumbers].sort((a, b) => a - b))
  })

  test('correctAnswer is a valid index into options', () => {
    const { options, answer: correctAnswer } = verbFormExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(correctAnswer).toBeGreaterThanOrEqual(0)
    expect(correctAnswer).toBeLessThan(options.length)
  })

  test('options[correctAnswer] matches the verb form', () => {
    const { options, answer: correctAnswer, word } = verbFormExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(options[correctAnswer]).toMatch(/^(I|II|III|IV|V|VI|VII|VIII|IX|X)$/)
    expect(word.length).toBeGreaterThan(0)
  })

  test('all options are unique', () => {
    const { options } = verbFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })
})

describe('formExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('pronouns:0 uses 3ms active past tense when random picks past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const { word } = verbFormExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 0 })

    expect(word).toBe('شَعَرَ')
  })

  test('pronouns:0 always uses 3ms — word is 3ms active past of selected verb', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const { word } = verbFormExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 0 })

    expect(word).toBe('شَعَرَ')
  })

  test('pronouns:2 diacritics:2 uses random pronoun and strips diacritics (random=0 → active past, 3ms)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = verbFormExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 2, diacritics: 2 })
    expect(word).toBe('شعر')
  })
})

describe('verbFormExercise with constraints', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('attaches cardKey to returned exercise', () => {
    expect(verbFormExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbForm:[a-z]+:\d+:[\w.]+:\w+$/)
  })

  test('includes only root-and-form explanation payload', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const exercise = verbFormExercise.generate(
      { ...INITIAL_DIMENSION_PROFILE, forms: 3, rootTypes: 0 },
      { form: 10, rootType: 'sound', tense: 'active.past', pronoun: '3ms' },
    )
    const wrongIndex = (exercise.answer + 1) % exercise.options.length

    expect(exercise.explanations?.[wrongIndex]).toEqual({
      rootLetters: ['ش', 'ر', 'ب'],
      form: 10,
      arabic: 'اِسْتَشْرَبَ',
      rootType: 'sound',
    })
    expect(exercise.explanations?.[exercise.answer]).toBeNull()
  })
})
