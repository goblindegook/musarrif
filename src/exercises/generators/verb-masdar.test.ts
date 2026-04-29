import { afterEach, describe, expect, test, vi } from 'vitest'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { exerciseDiacritics } from '../dimensions.ts'
import { verbMasdarExercise } from './verb-masdar.ts'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

describe('verbMasdarExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

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

  test('adds mimi-masdar explanation layer when the selected masdar is mimi', () => {
    vi.spyOn(Math, 'random').mockImplementationOnce(() => 0)
    const exercise = verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE)
    const wrongExplanation = exercise.explanations?.find((_, index) => index !== exercise.answer)

    expect(wrongExplanation?.nominal).toBe('masdar')
    expect(wrongExplanation?.nominalMimiMasdar).toBe(true)
  })
})

describe('verbMasdarExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbMasdar:[a-z]+:\d+$/)
  })
})
