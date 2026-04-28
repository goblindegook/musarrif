import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive.ts'
import { formatFormLabel, getAvailableParadigms, verbs } from '../../paradigms/verbs.ts'
import { type DimensionProfile, exerciseDiacritics } from '../dimensions.ts'
import { participleFormExercise } from './participle-form.ts'

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

describe('participleFormExercise', () => {
  test('returns kind "participleForm"', () => {
    expect(participleFormExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('participleForm')
  })

  test('returns a non-empty Arabic word', () => {
    expect(participleFormExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
  })

  test('returns exactly four options', () => {
    expect(participleFormExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = participleFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('options are Roman numerals sorted in ascending form order', () => {
    const { options } = participleFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    const optionOrder = options.map((option) => FORM_LABEL_ORDER.indexOf(option))
    expect(optionOrder).toEqual([...optionOrder].sort((a, b) => a - b))
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = participleFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('returns the prompt translation key for active or passive participle', () => {
    const { promptTranslationKey } = participleFormExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.activeParticipleForm',
      'exercise.prompt.passiveParticipleForm',
    ])
  })

  test('prompt type matches the shown participle word in easy difficulty', () => {
    const easyProfile: DimensionProfile = INITIAL_DIMENSION_PROFILE
    const exercise = participleFormExercise.generate(easyProfile)
    const selectedForm = exercise.options[exercise.answer]
    const selectedFormVerbs = verbs.filter((verb) => formatFormLabel(verb.form, verb.root) === selectedForm)
    const activeMatch = selectedFormVerbs.some(
      (verb) =>
        getAvailableParadigms(verb).includes('active.participle') &&
        exerciseDiacritics(deriveActiveParticiple(verb), easyProfile.diacritics) === exercise.word,
    )
    const passiveMatch = selectedFormVerbs.some(
      (verb) =>
        getAvailableParadigms(verb).includes('passive.participle') &&
        exerciseDiacritics(derivePassiveParticiple(verb), easyProfile.diacritics) === exercise.word,
    )

    expect(
      (exercise.promptTranslationKey === 'exercise.prompt.activeParticipleForm' && activeMatch) ||
        (exercise.promptTranslationKey === 'exercise.prompt.passiveParticipleForm' && passiveMatch),
    ).toBe(true)
  })
})

describe('participleFormExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(participleFormExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^participleForm:[a-z]+:\d+$/)
  })
})
