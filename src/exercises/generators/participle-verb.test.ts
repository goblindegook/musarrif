import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../paradigms/nominal/participle.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { INITIAL_DIMENSION_PROFILE } from '../../test/fixtures'
import { exerciseDiacritics } from '../dimensions.ts'
import { participleVerbExercise } from './participle-verb.ts'

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

  test('attaches nominal explanation layers for the selected participle type', () => {
    const exercise = participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(exercise.explanation).toMatchObject({ category: 'nominal', nominal: /Participle/ })
  })

  test('returns exactly four options', () => {
    expect(participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const exercise = participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(new Set(exercise.options).size).toBe(exercise.options.length)
  })

  test('prompt type matches the shown participle word for the selected answer', () => {
    const exercise = participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE)

    const answerLabel = exercise.options[exercise.answer]
    const matches = verbs.filter((verb) => exerciseDiacritics(verb.lemma) === answerLabel)

    const valid =
      exercise.promptTranslationKey === 'exercise.prompt.activeParticipleVerb'
        ? matches.some((verb) => exerciseDiacritics(deriveActiveParticiple(verb)) === exercise.word)
        : matches.some((verb) => exerciseDiacritics(derivePassiveParticiple(verb)) === exercise.word)

    expect(valid).toBe(true)
  })
})

describe('participleVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(participleVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^participleVerb:[a-z]+:\d+$/)
  })
})
