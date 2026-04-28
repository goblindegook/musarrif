import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { type DimensionProfile, exerciseDiacritics } from '../dimensions.ts'
import { masdarVerbExercise } from './masdar-verb.ts'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

const mediumProfile: DimensionProfile = { ...INITIAL_DIMENSION_PROFILE, diacritics: 1 }
const hardProfile: DimensionProfile = { ...INITIAL_DIMENSION_PROFILE, diacritics: 2 }

describe('masdarVerbExercise', () => {
  test('returns kind "masdarVerb"', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('masdarVerb')
  })

  test('returns the correct translation key', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.masdarVerb',
    )
  })

  test('medium returns exactly four options', () => {
    expect(masdarVerbExercise.generate(mediumProfile).options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(masdarVerbExercise.generate(hardProfile).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = masdarVerbExercise.generate(mediumProfile)
    const hard = masdarVerbExercise.generate(hardProfile)

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('answer points to a verb whose masdar matches the exercise word at the same difficulty', () => {
    const medium = masdarVerbExercise.generate(mediumProfile)
    const hard = masdarVerbExercise.generate(hardProfile)

    const mediumLabel = medium.options[medium.answer]
    const hardLabel = hard.options[hard.answer]

    const mediumMatches = verbs.filter(
      (verb) => exerciseDiacritics(verb.label, mediumProfile.diacritics) === mediumLabel,
    )
    const hardMatches = verbs.filter((verb) => exerciseDiacritics(verb.label, hardProfile.diacritics) === hardLabel)

    expect(
      mediumMatches.some((verb) =>
        deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar, mediumProfile.diacritics) === medium.word),
      ),
    ).toBe(true)
    expect(
      hardMatches.some((verb) =>
        deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar, hardProfile.diacritics) === hard.word),
      ),
    ).toBe(true)
  })
})

describe('masdarVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(masdarVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^masdarVerb:[a-z]+:\d+$/)
  })
})
