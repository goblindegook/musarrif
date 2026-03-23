import { describe, expect, test } from 'vitest'
import { FORM_LABELS, verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { rootFormVerbExercise } from './root-form-verb'

describe('rootFormVerbExercise', () => {
  test('returns kind "rootFormVerb"', () => {
    expect(rootFormVerbExercise().kind).toBe('rootFormVerb')
  })

  test('returns a non-empty Arabic word', () => {
    expect(rootFormVerbExercise().word.length).toBeGreaterThan(0)
  })

  test('returns the correct translation key', () => {
    expect(rootFormVerbExercise().promptTranslationKey).toBe('exercise.prompt.rootFormVerb')
  })

  test('returns promptParams with a form Roman numeral', () => {
    expect(rootFormVerbExercise().promptParams?.form).toMatch(/^[IVX]+$/)
  })

  test('returns at least two options', () => {
    expect(rootFormVerbExercise().options.length).toBeGreaterThanOrEqual(2)
  })

  test('all options are unique', () => {
    const { options } = rootFormVerbExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = rootFormVerbExercise()
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word matches the root of the selected verb', () => {
    const exercise = rootFormVerbExercise('easy')
    const root = exercise.word.replace(/ /g, '')
    const form = FORM_LABELS.indexOf(exercise.promptParams?.form as (typeof FORM_LABELS)[number]) + 1
    expect(
      verbs.some(
        (v) =>
          v.root === root &&
          v.form === form &&
          diacriticsDifficulty(v.label, 'easy') === exercise.options[exercise.answer],
      ),
    ).toBe(true)
  })
})

describe('rootFormVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(rootFormVerbExercise('easy').cardKey).toMatch(/^rootFormVerb:[a-z]+:\d+$/)
  })
})
