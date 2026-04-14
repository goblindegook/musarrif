import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { verbs } from '../paradigms/verbs'
import { masdarRootExercise } from './masdar-root'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

describe('masdarRootExercise', () => {
  test('returns kind "masdarRoot"', () => {
    expect(masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('masdarRoot')
  })

  test('returns the correct translation key', () => {
    expect(masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.masdarRoot',
    )
  })

  test('returns exactly four options', () => {
    expect(masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('returns unique options', () => {
    const { options } = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index', () => {
    const { options, answer } = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('correct option matches an existing root with letters separated by spaces', () => {
    const { options, answer } = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    const correctRoot = options[answer].split(' ').join('')
    expect(verbs.some((verb) => verb.root === correctRoot)).toBe(true)
  })

  test("word is one of the selected verb's masdars", () => {
    const exercise = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    const selectedRoot = exercise.options[exercise.answer].split(' ').join('')
    const matchingVerbs = verbs.filter((verb) => verb.root === selectedRoot)

    expect(matchingVerbs.some((verb) => deriveMasdar(verb).includes(exercise.word))).toBe(true)
  })

  test('includes exactly three wrong options and all differ from the correct root', () => {
    const { options, answer } = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions).toHaveLength(3)
    expect(wrongOptions.every((option) => option !== options[answer])).toBe(true)
  })
})

describe('masdarRootExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^masdarRoot:[a-z]+:\d+$/)
  })
})
