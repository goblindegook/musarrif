import { describe, expect, test } from 'vitest'
import { verbs } from '../paradigms/verbs'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { verbRootExercise } from './verb-root'

describe('rootExercise', () => {
  test('returns kind "root"', () => {
    expect(verbRootExercise(INITIAL_DIMENSION_PROFILE).kind).toBe('verbRoot')
  })

  test('returns the correct translation key', () => {
    expect(verbRootExercise(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe('exercise.prompt.verbRoot')
  })

  test('returns exactly four options', () => {
    expect(verbRootExercise(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('returns unique options', () => {
    const { options } = verbRootExercise(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index', () => {
    const { options, answer } = verbRootExercise(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('correct option matches an existing root with letters separated by spaces', () => {
    const { options, answer } = verbRootExercise(INITIAL_DIMENSION_PROFILE)
    const correctRoot = options[answer].split(' ').join('')
    expect(verbs.some((verb) => verb.root === correctRoot)).toBe(true)
  })

  test('all options use the same number of letters as the root', () => {
    const { options, answer } = verbRootExercise(INITIAL_DIMENSION_PROFILE)
    const rootLength = options[answer].split(' ').length

    expect(
      options.every((option) => {
        const letters = option.split(' ')
        return letters.length === rootLength && letters.every((letter) => letter.length === 1)
      }),
    ).toBe(true)
  })

  test('includes exactly three wrong options', () => {
    const { options, answer } = verbRootExercise(INITIAL_DIMENSION_PROFILE)
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions).toHaveLength(3)
  })
})

describe('verbRootExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbRootExercise(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbRoot:[a-z]+:\d+:[\w-]+:\w+$/)
  })
})
