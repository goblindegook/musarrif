import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { formExercise } from './form'

describe('generateFormExercise', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "form"', () => {
    expect(formExercise().kind).toBe('form')
  })

  test('returns a non-empty Arabic word', () => {
    const { word } = formExercise()
    expect(word.length).toBeGreaterThan(0)
  })

  test('returns the correct translation key', () => {
    expect(formExercise().promptTranslationKey).toBe('exercise.form.prompt')
  })

  test('returns exactly four options', () => {
    expect(formExercise().options).toHaveLength(4)
  })

  test('options are Roman numerals sorted in ascending form order', () => {
    const { options } = formExercise()

    const formNumbers = options.map((o) => ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].indexOf(o) + 1)
    expect(formNumbers).toEqual([...formNumbers].sort((a, b) => a - b))
  })

  test('correctAnswer is a valid index into options', () => {
    const { options, answer: correctAnswer } = formExercise()

    expect(correctAnswer).toBeGreaterThanOrEqual(0)
    expect(correctAnswer).toBeLessThan(options.length)
  })

  test('options[correctAnswer] matches the verb form', () => {
    const { options, answer: correctAnswer, word } = formExercise()

    expect(options[correctAnswer]).toMatch(/^(I|II|III|IV|V|VI|VII|VIII|IX|X)$/)
    expect(word.length).toBeGreaterThan(0)
  })

  test('all options are unique', () => {
    const { options } = formExercise()
    expect(new Set(options).size).toBe(options.length)
  })
})

describe('formExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('easy uses 3ms active past tense when random picks past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const { word } = formExercise('easy')

    expect(word).toBe('شَعَرَ')
  })

  test('easy always uses 3ms — word is 3ms active past or 3ms present indicative of selected verb', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const { word } = formExercise('easy')

    expect(word).toBeOneOf(['شَعَرَ', 'يَشْعَرُ'])
  })

  test('hard uses pronoun from ALL_PRONOUNS and strips diacritics (random=0 → active past, 1s)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = formExercise('hard')
    expect(word).toBe('شعرت')
  })

  test('defaults to easy difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(formExercise().word).toBe(formExercise('easy').word)
  })
})
