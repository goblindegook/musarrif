import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from '../test/profiles'
import { exerciseDiacritics } from './dimensions'
import { defineExercise } from './exercises'
import { conjugationExercise } from './generators/conjugation'

describe('defineExerciseGenerator', () => {
  test('injects kind and keys the conjugated card it returns', () => {
    const generator = defineExercise(
      'recognition',
      'verbForm',
      () => ({
        word: 'كَتَبَ',
        spokenWord: 'كَتَبَ',
        options: ['I', 'II', 'III', 'IV'],
        answer: 0,
        card: { root: 'كتب', form: 1, tense: 'active.past', pronoun: '3ms' },
        dimensions: ['forms', 'rootTypes'],
        inputModes: ['multiple-choice'],
      }),
      { conjugated: true },
    )

    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE)

    expect(generator).toMatchObject({ kind: 'verbForm' })
    expect(exercise).toEqual({
      kind: 'verbForm',
      word: 'كَتَبَ',
      spokenWord: 'كَتَبَ',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      cardKey: 'recognition:verb:sound:1:active.past:3ms',
      dimensions: ['forms', 'rootTypes'],
      inputModes: ['multiple-choice'],
    })
  })

  test('keys a card without tense and pronoun by the type of its exercise kind', () => {
    const generator = defineExercise('recognition', 'masdarForm', () => ({
      word: 'كِتَابَة',
      spokenWord: 'كِتَابَة',
      options: ['I', 'II', 'III', 'IV'],
      answer: 0,
      card: { root: 'كتب', form: 1 },
      dimensions: ['nominals', 'forms', 'rootTypes'],
      inputModes: ['multiple-choice'],
    }))

    expect(generator.generate(INITIAL_DIMENSION_PROFILE).cardKey).toBe('recognition:masdar:sound:1')
  })

  test('keeps generator config and shapes generated exercises from profile and constraints', () => {
    const generator = defineExercise(
      'recognition',
      'verbForm',
      (profile, constraints) => ({
        word: `profile:${profile.forms}`,
        spokenWord: `constraint:${constraints?.form ?? 'none'}`,
        options: ['I', 'II', 'III', 'IV'],
        answer: 0,
        card: {
          root: 'كتب',
          form: constraints?.form ?? 1,
          tense: constraints?.tense ?? 'active.past',
          pronoun: constraints?.pronoun ?? '3ms',
        },
        dimensions: ['forms', 'rootTypes'],
        inputModes: ['multiple-choice'],
      }),
      { conjugated: true, minNominals: 1, weight: 2 },
    )
    const exercise = generator.generate(INITIAL_DIMENSION_PROFILE, {
      form: 2,
      tense: 'active.past',
      pronoun: '3ms',
    })

    expect(generator).toMatchObject({
      kind: 'verbForm',
      cardType: 'recognition',
      category: 'verb',
      conjugated: true,
      minNominals: 1,
      weight: 2,
    })
    expect(exercise).toMatchObject({
      kind: 'verbForm',
      word: 'profile:0',
      spokenWord: 'constraint:2',
      cardKey: 'recognition:verb:sound:2:active.past:3ms',
      dimensions: ['forms', 'rootTypes'],
    })
  })

  test('a keyboard-capable exercise carries the fully vocalised answer', () => {
    const exercise = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(exercise.answerText).toBe(exerciseDiacritics(exercise.answerText ?? ''))
    expect(exerciseDiacritics(exercise.answerText ?? '')).toBe(exercise.options[exercise.answer])
  })
})
