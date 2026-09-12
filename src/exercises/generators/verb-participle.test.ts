import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../paradigms/nominal/participle.ts'
import { verbs } from '../../paradigms/verbs.ts'
import { INITIAL_DIMENSION_PROFILE } from '../../test/fixtures'
import { exerciseDiacritics } from '../dimensions.ts'
import { verbParticipleExercise } from './verb-participle.ts'

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

  test('attaches nominal explanation layers for the selected participle type', () => {
    const exercise = verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(exercise.explanation).toMatchObject({ category: 'nominal', nominal: /Participle/ })
  })

  test('returns exactly four options', () => {
    expect(verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const exercise = verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(new Set(exercise.options).size).toBe(exercise.options.length)
  })

  test('answer matches requested participle type for the shown verb', () => {
    const exercise = verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE)

    const matchingVerbs = verbs.filter((verb) => exerciseDiacritics(verb.lemma) === exercise.word)

    const answer = exercise.options[exercise.answer]

    expect(
      exercise.promptTranslationKey === 'exercise.prompt.verbActiveParticiple'
        ? matchingVerbs.some((verb) => exerciseDiacritics(deriveActiveParticiple(verb)) === answer)
        : matchingVerbs.some((verb) => exerciseDiacritics(derivePassiveParticiple(verb)) === answer),
    ).toBe(true)
  })
})

describe('verbParticipleExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(verbParticipleExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbParticiple:[a-z]+:\d+$/)
  })
})
