import { describe, expect, test } from 'vitest'
import { FORM_LABELS, verbs } from '../paradigms/verbs'
import { exerciseDiacritics, INITIAL_DIMENSION_PROFILE } from './dimensions'
import { rootFormVerbExercise } from './root-form-verb'

describe('rootFormVerbExercise', () => {
  test('returns kind "rootFormVerb"', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('rootFormVerb')
  })

  test('returns a non-empty Arabic word', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
  })

  test('returns the correct translation key', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.rootFormVerb',
    )
  })

  test('returns promptParams with a form Roman numeral', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).promptParams?.form).toMatch(/^[IVX]+$/)
  })

  test('returns at least two options', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).options.length).toBeGreaterThanOrEqual(2)
  })

  test('all options are unique', () => {
    const { options } = rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word matches the root of the selected verb', () => {
    const easyProfile = INITIAL_DIMENSION_PROFILE
    const exercise = rootFormVerbExercise.generate(easyProfile)
    const root = exercise.word.replace(/ /g, '')
    const form = FORM_LABELS.indexOf(exercise.promptParams?.form as (typeof FORM_LABELS)[number]) + 1
    expect(
      verbs.some(
        (v) =>
          v.root === root &&
          v.form === form &&
          exerciseDiacritics(v.label, easyProfile.diacritics) === exercise.options[exercise.answer],
      ),
    ).toBe(true)
  })
})

describe('rootFormVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^rootFormVerb:[a-z]+:\d+$/)
  })
})
