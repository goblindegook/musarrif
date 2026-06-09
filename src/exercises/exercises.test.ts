import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from '../test/fixtures'
import { defineExercise } from './exercises'

describe('defineExerciseGenerator', () => {
  test('injects kind into generated exercise', () => {
    const generator = defineExercise(
      'verbForm',
      () => ({
        word: 'كَتَبَ',
        spokenWord: 'كَتَبَ',
        promptTranslationKey: 'exercise.prompt.verbForm',
        options: ['I', 'II', 'III', 'IV'],
        answer: 0,
        cardKey: 'verbForm:sound:1',
        dimensions: ['forms', 'rootTypes', 'diacritics'],
        inputModes: ['multiple-choice'],
      }),
      {},
    )

    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE)

    expect(generator).toMatchObject({ kind: 'verbForm' })
    expect(exercise).toEqual({
      kind: 'verbForm',
      word: 'كَتَبَ',
      spokenWord: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey: 'verbForm:sound:1',
      dimensions: ['forms', 'rootTypes', 'diacritics'],
      inputModes: ['multiple-choice'],
    })
  })

  test('keeps generator config and shapes generated exercises from profile and constraints', () => {
    const generator = defineExercise(
      'verbForm',
      (profile, constraints) => ({
        word: `profile:${profile.forms}`,
        spokenWord: `constraint:${constraints?.form ?? 'none'}`,
        promptTranslationKey: 'exercise.prompt.verbForm',
        options: ['I', 'II', 'III', 'IV'],
        answer: 0,
        cardKey: `verbForm:regular:${constraints?.form}:${constraints?.tense}:${constraints?.pronoun}`,
        dimensions: ['forms', 'rootTypes', 'diacritics'],
        inputModes: ['multiple-choice'],
      }),
      { minNominals: 1, weight: 2 },
    )
    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE, {
      form: 2,
      tense: 'active.past',
      pronoun: '3ms',
    })

    expect(generator).toMatchObject({ kind: 'verbForm', minNominals: 1, weight: 2 })
    expect(exercise).toMatchObject({
      kind: 'verbForm',
      word: 'profile:0',
      spokenWord: 'constraint:2',
      cardKey: 'verbForm:regular:2:active.past:3ms',
      dimensions: ['forms', 'rootTypes', 'diacritics'],
    })
  })
})
