import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { FORM_LABELS, verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { masdarFormExercise } from './masdar-form'

function labelToForm(label: string): number {
  return FORM_LABELS.indexOf(label as (typeof FORM_LABELS)[number]) + 1
}

describe('masdarFormExercise', () => {
  test('returns kind "masdarForm"', () => {
    expect(masdarFormExercise().kind).toBe('masdarForm')
  })

  test('returns a non-empty Arabic word', () => {
    const { word } = masdarFormExercise()
    expect(word.length).toBeGreaterThan(0)
  })

  test('returns the correct translation key', () => {
    expect(masdarFormExercise().promptTranslationKey).toBe('exercise.prompt.masdarForm')
  })

  test('returns exactly four options', () => {
    expect(masdarFormExercise().options).toHaveLength(4)
  })

  test('options are Roman numerals sorted in ascending form order', () => {
    const { options } = masdarFormExercise()

    const formNumbers = options.map((option) => labelToForm(option))
    expect(formNumbers).toEqual([...formNumbers].sort((a, b) => a - b))
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = masdarFormExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique', () => {
    const { options } = masdarFormExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('word matches at least one masdar for the selected form in easy difficulty', () => {
    const exercise = masdarFormExercise('easy')
    const selectedForm = labelToForm(exercise.options[exercise.answer])
    const matchingVerbs = verbs.filter((verb) => verb.form === selectedForm)

    expect(
      matchingVerbs.some((verb) =>
        deriveMasdar(verb).some((masdar) => diacriticsDifficulty(masdar, 'easy') === exercise.word),
      ),
    ).toBe(true)
  })
})

describe('masdarFormExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(masdarFormExercise('easy').cardKey).toMatch(/^masdarForm:[a-z]+:\d+$/)
  })
})
