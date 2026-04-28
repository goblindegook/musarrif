import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { exerciseDiacritics } from '../dimensions.ts'
import { verbParticipleExercise } from './verb-participle.ts'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

describe('verbParticipleExercise', () => {
  test('returns kind "verbParticiple"', () => {
    expect(verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbParticiple')
  })

  test('returns the correct translation key for active or passive participle prompt', () => {
    const { promptTranslationKey } = verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.verbActiveParticiple',
      'exercise.prompt.verbPassiveParticiple',
    ])
  })

  test('medium returns exactly four options', () => {
    expect(verbParticipleExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 }).options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(verbParticipleExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 }).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = verbParticipleExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 })
    const hard = verbParticipleExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 })

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('answer matches requested participle type for the shown verb at the same difficulty', () => {
    const medium = verbParticipleExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 1 })
    const hard = verbParticipleExercise.generate({ ...INITIAL_DIMENSION_PROFILE, diacritics: 2 })

    const mediumVerbs = verbs.filter((verb) => exerciseDiacritics(verb.label, 1) === medium.word)
    const hardVerbs = verbs.filter((verb) => exerciseDiacritics(verb.label, 2) === hard.word)

    const mediumAnswer = medium.options[medium.answer]
    const hardAnswer = hard.options[hard.answer]

    expect(
      medium.promptTranslationKey === 'exercise.prompt.verbActiveParticiple'
        ? mediumVerbs.some((verb) => exerciseDiacritics(deriveActiveParticiple(verb), 1) === mediumAnswer)
        : mediumVerbs.some((verb) => exerciseDiacritics(derivePassiveParticiple(verb), 1) === mediumAnswer),
    ).toBe(true)

    expect(
      hard.promptTranslationKey === 'exercise.prompt.verbActiveParticiple'
        ? hardVerbs.some((verb) => exerciseDiacritics(deriveActiveParticiple(verb), 2) === hardAnswer)
        : hardVerbs.some((verb) => exerciseDiacritics(derivePassiveParticiple(verb), 2) === hardAnswer),
    ).toBe(true)
  })
})

describe('verbParticipleExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbParticiple:[a-z]+:\d+$/)
  })
})
