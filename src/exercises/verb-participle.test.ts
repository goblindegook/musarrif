import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { verbParticipleExercise } from './verb-participle'

describe('verbParticipleExercise', () => {
  test('returns kind "verbParticiple"', () => {
    expect(verbParticipleExercise().kind).toBe('verbParticiple')
  })

  test('returns the correct translation key for active or passive participle prompt', () => {
    const { promptTranslationKey } = verbParticipleExercise()
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.verbActiveParticiple',
      'exercise.prompt.verbPassiveParticiple',
    ])
  })

  test('medium returns exactly four options', () => {
    expect(verbParticipleExercise('medium').options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(verbParticipleExercise('hard').options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = verbParticipleExercise()
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = verbParticipleExercise('medium')
    const hard = verbParticipleExercise('hard')

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('answer matches requested participle type for the shown verb at the same difficulty', () => {
    const medium = verbParticipleExercise('medium')
    const hard = verbParticipleExercise('hard')

    const mediumVerbs = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'medium') === medium.word)
    const hardVerbs = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'hard') === hard.word)

    const mediumAnswer = medium.options[medium.answer]
    const hardAnswer = hard.options[hard.answer]

    expect(
      medium.promptTranslationKey === 'exercise.prompt.verbActiveParticiple'
        ? mediumVerbs.some((verb) => diacriticsDifficulty(deriveActiveParticiple(verb), 'medium') === mediumAnswer)
        : mediumVerbs.some((verb) => diacriticsDifficulty(derivePassiveParticiple(verb), 'medium') === mediumAnswer),
    ).toBe(true)

    expect(
      hard.promptTranslationKey === 'exercise.prompt.verbActiveParticiple'
        ? hardVerbs.some((verb) => diacriticsDifficulty(deriveActiveParticiple(verb), 'hard') === hardAnswer)
        : hardVerbs.some((verb) => diacriticsDifficulty(derivePassiveParticiple(verb), 'hard') === hardAnswer),
    ).toBe(true)
  })
})
