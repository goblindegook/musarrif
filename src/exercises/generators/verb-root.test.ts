import { describe, expect, test } from 'vitest'
import { verbs } from '../../paradigms/verbs.ts'
import { INITIAL_DIMENSION_PROFILE } from '../../test/profiles'
import { forAnyRandomness } from '../../test/random'
import { verbRootExercise } from './verb-root.ts'

describe('rootExercise', () => {
  test('returns kind "root"', () => {
    forAnyRandomness(() => {
      expect(verbRootExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbRoot')
    })
  })

  test('returns exactly four options', () => {
    forAnyRandomness(() => {
      expect(verbRootExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
    })
  })

  test('returns unique options', () => {
    forAnyRandomness(() => {
      const { options } = verbRootExercise.generate(INITIAL_DIMENSION_PROFILE)
      expect(new Set(options).size).toBe(options.length)
    })
  })

  test('correct answer is a valid index', () => {
    forAnyRandomness(() => {
      const { options, answer } = verbRootExercise.generate(INITIAL_DIMENSION_PROFILE)

      expect(answer).toBeGreaterThanOrEqual(0)
      expect(answer).toBeLessThan(options.length)
    })
  })

  test('correct option matches an existing root with letters separated by spaces', () => {
    forAnyRandomness(() => {
      const { options, answer } = verbRootExercise.generate(INITIAL_DIMENSION_PROFILE)
      const correctRoot = options[answer].split(' ').join('')
      expect(verbs.map((verb) => verb.root)).toContain(correctRoot)
    })
  })

  test('all options use the same number of letters as the root', () => {
    forAnyRandomness(() => {
      const { options, answer } = verbRootExercise.generate(INITIAL_DIMENSION_PROFILE)
      const rootLength = options[answer].split(' ').length

      expect(
        options.every((option) => {
          const letters = option.split(' ')
          return letters.length === rootLength && letters.every((letter) => letter.length === 1)
        }),
      ).toBe(true)
    })
  })

  test('includes exactly three wrong options', () => {
    forAnyRandomness(() => {
      const { options, answer } = verbRootExercise.generate(INITIAL_DIMENSION_PROFILE)
      const wrongOptions = options.filter((_, index) => index !== answer)

      expect(wrongOptions).toHaveLength(3)
    })
  })
})

describe('verbRootExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    forAnyRandomness(() => {
      expect(verbRootExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(
        /^recognition:verb:[a-z]+:\d+:[\w.]+:\w+$/,
      )
    })
  })

  test('includes explanation layers for the selected tense and pronoun', () => {
    forAnyRandomness(() => {
      const exercise = verbRootExercise.generate(INITIAL_DIMENSION_PROFILE, {
        form: 1,
        rootType: 'sound',
        tense: 'active.past',
        pronoun: '3ms',
      })
      expect(exercise.explanation).toEqual(
        expect.objectContaining({
          tense: 'active.past',
          pronoun: '3ms',
        }),
      )
    })
  })
})
