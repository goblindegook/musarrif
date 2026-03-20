import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { verbs } from '../paradigms/verbs'
import { masdarRootExercise } from './masdar-root'

describe('masdarRootExercise', () => {
  test('returns kind "masdarRoot"', () => {
    expect(masdarRootExercise().kind).toBe('masdarRoot')
  })

  test('returns the correct translation key', () => {
    expect(masdarRootExercise().promptTranslationKey).toBe('exercise.prompt.masdarRoot')
  })

  test('returns exactly four options', () => {
    expect(masdarRootExercise().options).toHaveLength(4)
  })

  test('returns unique options', () => {
    const { options } = masdarRootExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index', () => {
    const { options, answer } = masdarRootExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('correct option matches an existing root with letters separated by spaces', () => {
    const { options, answer } = masdarRootExercise()
    const correctRoot = options[answer].split(' ').join('')
    expect(verbs.some((verb) => verb.root === correctRoot)).toBe(true)
  })

  test("word is one of the selected verb's masdars", () => {
    const exercise = masdarRootExercise()
    const selectedRoot = exercise.options[exercise.answer].split(' ').join('')
    const matchingVerbs = verbs.filter((verb) => verb.root === selectedRoot)

    expect(matchingVerbs.some((verb) => deriveMasdar(verb).includes(exercise.word))).toBe(true)
  })

  test('includes exactly three wrong options and all differ from the correct root', () => {
    const { options, answer } = masdarRootExercise()
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions).toHaveLength(3)
    expect(wrongOptions.every((option) => option !== options[answer])).toBe(true)
  })
})
