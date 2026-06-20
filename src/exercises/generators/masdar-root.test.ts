import { afterEach, describe, expect, test, vi } from 'vitest'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { INITIAL_DIMENSION_PROFILE } from '../../test/fixtures'
import { masdarRootExercise } from './masdar-root.ts'

describe('masdarRootExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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
    expect(verbs.map((verb) => verb.root)).toContain(correctRoot)
  })

  test("word is one of the selected verb's masdars", () => {
    const exercise = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    const selectedRoot = exercise.options[exercise.answer].split(' ').join('')
    const matchingVerbs = verbs.filter((verb) => verb.root === selectedRoot)

    expect(matchingVerbs.flatMap((verb) => deriveMasdar(verb).map(String))).toContain(exercise.word)
  })

  test('includes exactly three wrong options and all differ from the correct root', () => {
    const { options, answer } = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions).toHaveLength(3)
    expect(wrongOptions.every((option) => option !== options[answer])).toBe(true)
  })

  test('adds mimi-masdar explanation layer when the selected masdar is mimi', () => {
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0)
    const exercise = masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(exercise.explanation).toMatchObject({
      category: 'nominal',
      nominal: 'masdar',
      isMasdarMimi: true,
    })
  })
})

describe('masdarRootExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(masdarRootExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^masdarRoot:[a-z]+:\d+$/)
  })
})
