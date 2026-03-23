import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { verbMasdarExercise } from './verb-masdar'

describe('verbMasdarExercise', () => {
  test('returns kind "verbMasdar"', () => {
    expect(verbMasdarExercise().kind).toBe('verbMasdar')
  })

  test('returns the correct translation key', () => {
    expect(verbMasdarExercise().promptTranslationKey).toBe('exercise.prompt.verbMasdar')
  })

  test('medium returns exactly four options', () => {
    expect(verbMasdarExercise('medium').options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(verbMasdarExercise('hard').options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = verbMasdarExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = verbMasdarExercise('medium')
    const hard = verbMasdarExercise('hard')

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('answer is a masdar of the shown verb at the same difficulty', () => {
    const medium = verbMasdarExercise('medium')
    const hard = verbMasdarExercise('hard')

    const mediumVerbMatches = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'medium') === medium.word)
    const hardVerbMatches = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'hard') === hard.word)

    expect(
      mediumVerbMatches.some((verb) =>
        deriveMasdar(verb).some((masdar) => diacriticsDifficulty(masdar, 'medium') === medium.options[medium.answer]),
      ),
    ).toBe(true)

    expect(
      hardVerbMatches.some((verb) =>
        deriveMasdar(verb).some((masdar) => diacriticsDifficulty(masdar, 'hard') === hard.options[hard.answer]),
      ),
    ).toBe(true)
  })
})

describe('verbMasdarExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbMasdarExercise('easy').cardKey).toMatch(/^verbMasdar:[a-z]+:\d+$/)
  })
})
