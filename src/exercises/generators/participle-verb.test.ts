import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { type DimensionProfile, exerciseDiacritics } from '../dimensions.ts'
import { participleVerbExercise } from './participle-verb.ts'

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

describe('participleVerbExercise', () => {
  test('returns kind "participleVerb"', () => {
    expect(participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('participleVerb')
  })

  test('returns the correct translation key for active or passive participle', () => {
    const { promptTranslationKey } = participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.activeParticipleVerb',
      'exercise.prompt.passiveParticipleVerb',
    ])
  })

  test('medium returns exactly four options', () => {
    expect(participleVerbExercise.generate(mediumProfile).options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(participleVerbExercise.generate(hardProfile).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = participleVerbExercise.generate(mediumProfile)
    const hard = participleVerbExercise.generate(hardProfile)

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('prompt type matches the shown participle word for the selected answer at the same difficulty', () => {
    const medium = participleVerbExercise.generate(mediumProfile)
    const hard = participleVerbExercise.generate(hardProfile)

    const mediumLabel = medium.options[medium.answer]
    const hardLabel = hard.options[hard.answer]
    const mediumMatches = verbs.filter(
      (verb) => exerciseDiacritics(verb.label, mediumProfile.diacritics) === mediumLabel,
    )
    const hardMatches = verbs.filter((verb) => exerciseDiacritics(verb.label, hardProfile.diacritics) === hardLabel)

    const mediumValid =
      medium.promptTranslationKey === 'exercise.prompt.activeParticipleVerb'
        ? mediumMatches.some(
            (verb) => exerciseDiacritics(deriveActiveParticiple(verb), mediumProfile.diacritics) === medium.word,
          )
        : mediumMatches.some(
            (verb) => exerciseDiacritics(derivePassiveParticiple(verb), mediumProfile.diacritics) === medium.word,
          )

    const hardValid =
      hard.promptTranslationKey === 'exercise.prompt.activeParticipleVerb'
        ? hardMatches.some(
            (verb) => exerciseDiacritics(deriveActiveParticiple(verb), hardProfile.diacritics) === hard.word,
          )
        : hardMatches.some(
            (verb) => exerciseDiacritics(derivePassiveParticiple(verb), hardProfile.diacritics) === hard.word,
          )

    expect(mediumValid).toBe(true)
    expect(hardValid).toBe(true)
  })
})

describe('participleVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^participleVerb:[a-z]+:\d+$/)
  })
})
