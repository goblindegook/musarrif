import { afterEach, describe, expect, test, vi } from 'vitest'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { getVerbById, verbs } from '../../paradigms/verbs.ts'
import { INITIAL_DIMENSION_PROFILE } from '../../test/fixtures'
import * as dimensions from '../dimensions.ts'
import { exerciseDiacritics } from '../dimensions.ts'
import { verbMasdarExercise } from './verb-masdar.ts'

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

  test('returns exactly four options', () => {
    expect(verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const exercise = verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(new Set(exercise.options).size).toBe(exercise.options.length)
  })

  test('answer is a masdar of the shown verb', () => {
    const exercise = verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(
      verbs
        .filter((verb) => exerciseDiacritics(verb.lemma) === exercise.word)
        .some((verb) =>
          deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar) === exercise.options[exercise.answer]),
        ),
    ).toBe(true)
  })

  test('adds mimi-masdar explanation layer when the selected masdar is mimi', () => {
    vi.spyOn(dimensions, 'randomNominalVerb').mockReturnValue(getVerbById('jwy-1')!)
    const exercise = verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(exercise.explanation).toMatchObject({
      category: 'nominal',
      nominal: 'masdar',
      isMasdarMimi: true,
    })
  })
})

describe('verbMasdarExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbMasdarExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbMasdar:[a-z]+:\d+$/)
  })
})
