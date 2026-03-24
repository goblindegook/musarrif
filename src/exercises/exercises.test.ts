import { describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { defineExercise } from './exercises'
import type { CardConstraints } from './srs'

describe('defineExerciseGenerator', () => {
  test('injects kind into generated exercise', () => {
    const generator = defineExercise(
      'verbForm',
      () => ({
        word: 'كَتَبَ',
        promptTranslationKey: 'exercise.prompt.verbForm',
        options: ['I', 'II', 'III', 'IV'],
        answer: 0,
      }),
      {},
    )

    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE)

    expect(generator.kind).toBe('verbForm')
    expect(exercise.kind).toBe('verbForm')
    expect(exercise.word).toBe('كَتَبَ')
    expect(exercise.promptTranslationKey).toBe('exercise.prompt.verbForm')
    expect(exercise.options).toEqual(['I', 'II', 'III', 'IV'])
    expect(exercise.answer).toBe(0)
  })

  test('keeps generator config and forwards arguments to build', () => {
    const constraints: CardConstraints = {
      form: 2,
      tense: ['active', 'past'],
      pronoun: '3ms',
    }
    const build = vi.fn().mockReturnValue({
      word: 'كَتَبَ',
      promptTranslationKey: 'exercise.prompt.verbForm',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey: 'verbForm:regular:2:active-past:3ms',
    })

    const generator = defineExercise('verbForm', build, { minNominals: 1, weight: 2 })

    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE, constraints)

    expect(generator.minNominals).toBe(1)
    expect(generator.weight).toBe(2)
    expect(build).toHaveBeenCalledWith(INITIAL_DIMENSION_PROFILE, constraints)
    expect(exercise.cardKey).toBe('verbForm:regular:2:active-past:3ms')
  })
})
