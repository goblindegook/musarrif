import { describe, expect, test } from 'vitest'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { formatFormLabel, verbs } from '../paradigms/verbs'
import { exerciseDiacritics } from './dimensions'
import { masdarFormExercise } from './masdar-form'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

const FORM_LABEL_ORDER = [
  'I',
  'Iq',
  'II',
  'IIq',
  'III',
  'IIIq',
  'IV',
  'IVq',
  'V',
  'Vq',
  'VI',
  'VIq',
  'VII',
  'VIIq',
  'VIII',
  'VIIIq',
  'IX',
  'IXq',
  'X',
  'Xq',
]

describe('masdarFormExercise', () => {
  test('returns kind "masdarForm"', () => {
    expect(masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('masdarForm')
  })

  test('returns a non-empty Arabic word', () => {
    const { word } = masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(word.length).toBeGreaterThan(0)
  })

  test('returns the correct translation key', () => {
    expect(masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.masdarForm',
    )
  })

  test('returns exactly four options', () => {
    expect(masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('options are Roman numerals sorted in ascending form order', () => {
    const { options } = masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE)

    const optionOrder = options.map((option) => FORM_LABEL_ORDER.indexOf(option))
    expect(optionOrder).toEqual([...optionOrder].sort((a, b) => a - b))
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE)

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique', () => {
    const { options } = masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('word matches at least one masdar for the selected form in easy difficulty', () => {
    const exercise = masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    const selectedForm = exercise.options[exercise.answer]
    const matchingVerbs = verbs.filter((verb) => formatFormLabel(verb.form, verb.root) === selectedForm)

    expect(
      matchingVerbs.some((verb) =>
        deriveMasdar(verb).some((masdar) => exerciseDiacritics(masdar, 0) === exercise.word),
      ),
    ).toBe(true)
  })
})

describe('masdarFormExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(masdarFormExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^masdarForm:[a-z]+:\d+$/)
  })
})
