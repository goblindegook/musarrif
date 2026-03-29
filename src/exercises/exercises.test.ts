import { describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { defineExercise } from './exercises'

describe('defineExerciseGenerator', () => {
  test('injects kind into generated exercise', () => {
    const generator = defineExercise(
      'verbForm',
      () => ({
        word: 'كَتَبَ',
        promptTranslationKey: 'exercise.prompt.verbForm',
        options: ['I', 'II', 'III', 'IV'],
        answer: 0,
        cardKey: 'verbForm:sound:1',
        dimensions: ['forms', 'rootTypes', 'diacritics'],
      }),
      {},
    )

    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE)

    expect(generator).toMatchObject({ kind: 'verbForm' })
    expect(exercise).toEqual({
      kind: 'verbForm',
      word: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey: 'verbForm:sound:1',
      dimensions: ['forms', 'rootTypes', 'diacritics'],
    })
  })

  test('keeps generator config and forwards arguments to build', () => {
    const build = vi.fn().mockReturnValue({
      word: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey: 'verbForm:regular:2:active-past:3ms',
      dimensions: ['forms', 'rootTypes', 'diacritics'],
    })

    const generator = defineExercise('verbForm', build, { minNominals: 1, weight: 2 })
    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE, {
      form: 2,
      tense: ['active', 'past'],
      pronoun: '3ms',
    })

    expect(generator).toMatchObject({ kind: 'verbForm', minNominals: 1, weight: 2 })
    expect(build).toHaveBeenCalledWith(INITIAL_DIMENSION_PROFILE, {
      form: 2,
      tense: ['active', 'past'],
      pronoun: '3ms',
    })
    expect(exercise.cardKey).toBe('verbForm:regular:2:active-past:3ms')
    expect(exercise.dimensions).toEqual(['forms', 'rootTypes', 'diacritics'])
  })
})
