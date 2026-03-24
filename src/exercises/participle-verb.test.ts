import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { verbs } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, INITIAL_DIMENSION_PROFILE } from './dimensions'
import { participleVerbExercise } from './participle-verb'

const mediumProfile: DimensionProfile = { ...INITIAL_DIMENSION_PROFILE, diacritics: 1 }
const hardProfile: DimensionProfile = { ...INITIAL_DIMENSION_PROFILE, diacritics: 2 }

describe('participleVerbExercise', () => {
  test('returns kind "participleVerb"', () => {
    expect(participleVerbExercise(INITIAL_DIMENSION_PROFILE).kind).toBe('participleVerb')
  })

  test('returns the correct translation key for active or passive participle', () => {
    const { promptTranslationKey } = participleVerbExercise(INITIAL_DIMENSION_PROFILE)
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.activeParticipleVerb',
      'exercise.prompt.passiveParticipleVerb',
    ])
  })

  test('medium returns exactly four options', () => {
    expect(participleVerbExercise(mediumProfile).options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(participleVerbExercise(hardProfile).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = participleVerbExercise(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = participleVerbExercise(mediumProfile)
    const hard = participleVerbExercise(hardProfile)

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('prompt type matches the shown participle word for the selected answer at the same difficulty', () => {
    const medium = participleVerbExercise(mediumProfile)
    const hard = participleVerbExercise(hardProfile)

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
    expect(participleVerbExercise(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^participleVerb:[a-z]+:\d+$/)
  })
})
