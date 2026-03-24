import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { verbs } from '../paradigms/verbs'
import { exerciseDiacritics, INITIAL_DIMENSION_PROFILE } from './dimensions'
import { verbMasdarExercise } from './verb-masdar'

describe('verbMasdarExercise', () => {
  test('returns kind "verbMasdar"', () => {
    expect(verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbMasdar')
  })

  test('returns the correct translation key', () => {
    expect(verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.verbMasdar',
    )
  })

  test('medium returns exactly four options', () => {
    expect(verbMasdarExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 }).options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(verbMasdarExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 }).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = verbMasdarExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 })
    const hard = verbMasdarExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 })

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('answer is a masdar of the shown verb at the same difficulty', () => {
    const medium = verbMasdarExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 })
    const hard = verbMasdarExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 })

    expect(
      verbs
        .filter((verb) => exerciseDiacritics(verb.label, 1) === medium.word)
        .some((verb) =>
          deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar, 1) === medium.options[medium.answer]),
        ),
    ).toBe(true)

    expect(
      verbs
        .filter((verb) => exerciseDiacritics(verb.label, 2) === hard.word)
        .some((verb) =>
          deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar, 2) === hard.options[hard.answer]),
        ),
    ).toBe(true)
  })
})

describe('verbMasdarExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbMasdar:[a-z]+:\d+$/)
  })
})
