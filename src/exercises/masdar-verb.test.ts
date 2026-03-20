import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { masdarVerbExercise } from './masdar-verb'

describe('masdarVerbExercise', () => {
  test('returns kind "masdarVerb"', () => {
    expect(masdarVerbExercise().kind).toBe('masdarVerb')
  })

  test('returns the correct translation key', () => {
    expect(masdarVerbExercise().promptTranslationKey).toBe('exercise.prompt.masdarVerb')
  })

  test('medium returns exactly four options', () => {
    expect(masdarVerbExercise('medium').options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(masdarVerbExercise('hard').options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = masdarVerbExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = masdarVerbExercise('medium')
    const hard = masdarVerbExercise('hard')

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('answer points to a verb whose masdar matches the exercise word at the same difficulty', () => {
    const medium = masdarVerbExercise('medium')
    const hard = masdarVerbExercise('hard')

    const mediumLabel = medium.options[medium.answer]
    const hardLabel = hard.options[hard.answer]

    const mediumMatches = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'medium') === mediumLabel)
    const hardMatches = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'hard') === hardLabel)

    expect(
      mediumMatches.some((verb) =>
        deriveMasdar(verb).some((masdar) => diacriticsDifficulty(masdar, 'medium') === medium.word),
      ),
    ).toBe(true)
    expect(
      hardMatches.some((verb) =>
        deriveMasdar(verb).some((masdar) => diacriticsDifficulty(masdar, 'hard') === hard.word),
      ),
    ).toBe(true)
  })
})
