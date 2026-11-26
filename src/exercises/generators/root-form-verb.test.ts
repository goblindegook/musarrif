import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from '../../test/profiles'
import { forAnyRandomness } from '../../test/random'
import { rootFormVerbExercise } from './root-form-verb.ts'

describe('rootFormVerbExercise', () => {
  test('returns kind "rootFormVerb"', () => {
    forAnyRandomness(() => {
      expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('rootFormVerb')
    })
  })

  test('returns a non-empty Arabic word', () => {
    forAnyRandomness(() => {
      expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
    })
  })

  test('returns at least two options', () => {
    forAnyRandomness(() => {
      expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).options.length).toBeGreaterThanOrEqual(2)
    })
  })

  test('all options are unique', () => {
    forAnyRandomness(() => {
      const { options } = rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE)
      expect(new Set(options).size).toBe(options.length)
    })
  })

  test('correct answer is a valid index into options', () => {
    forAnyRandomness(() => {
      const { options, answer } = rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE)
      expect(answer).toBeGreaterThanOrEqual(0)
      expect(answer).toBeLessThan(options.length)
    })
  })

  test('asks for the form of the answer verb', () => {
    forAnyRandomness(() => {
      const exercise = rootFormVerbExercise.generate(
        { ...INITIAL_DIMENSION_PROFILE, forms: 3, rootTypes: 5 },
        { form: 2, rootType: 'sound' },
      )
      expect(exercise.form).toBe(2)
    })
  })
})

describe('rootFormVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    forAnyRandomness(() => {
      expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^production:verb:[a-z]+:\d+$/)
    })
  })

  test('includes full explanation for all options', () => {
    forAnyRandomness(() => {
      const exercise = rootFormVerbExercise.generate(
        { ...INITIAL_DIMENSION_PROFILE, forms: 3, rootTypes: 5 },
        { form: 2, rootType: 'sound' },
      )
      expect(exercise.explanation).toMatchObject({
        paradigmRoots: exercise.word.split(' '),
        paradigmForm: 2,
        form: '2',
        arabic: exercise.options[exercise.answer],
        rootType: ['sound'],
        tense: 'active.past',
        pronoun: '3ms',
      })
    })
  })
})
