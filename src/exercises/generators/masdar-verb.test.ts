import { afterEach, describe, expect, test, vi } from 'vitest'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { getVerbById, verbs } from '../../paradigms/verbs.ts'
import { INITIAL_DIMENSION_PROFILE } from '../../test/fixtures'
import * as dimensions from '../dimensions.ts'
import { exerciseDiacritics } from '../dimensions.ts'
import { masdarVerbExercise } from './masdar-verb.ts'

describe('masdarVerbExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "masdarVerb"', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('masdarVerb')
  })

  test('returns the correct translation key', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.masdarVerb',
    )
  })

  test('returns exactly four options', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const exercise = masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(new Set(exercise.options).size).toBe(exercise.options.length)
  })

  test('answer points to a verb whose masdar matches the exercise word', () => {
    const exercise = masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    const answerLabel = exercise.options[exercise.answer]

    const matches = verbs.filter((verb) => exerciseDiacritics(verb.lemma) === answerLabel)

    expect(
      matches.some((verb) => deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar) === exercise.word)),
    ).toBe(true)
  })

  test('adds mimi-masdar explanation layer when the selected masdar is mimi', () => {
    vi.spyOn(dimensions, 'randomNominalVerb').mockReturnValue(getVerbById('jwy-1')!)
    const exercise = masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(exercise.explanation).toMatchObject({
      category: 'nominal',
      nominal: 'masdar',
      isMasdarMimi: true,
    })
  })
})

describe('masdarVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^masdarVerb:[a-z]+:\d+$/)
  })
})
