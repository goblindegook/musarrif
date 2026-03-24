import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { FORM_LABELS, verbs } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, INITIAL_DIMENSION_PROFILE } from './dimensions'
import { participleFormExercise } from './participle-form'

function labelToForm(label: string): number {
  return FORM_LABELS.indexOf(label as (typeof FORM_LABELS)[number]) + 1
}

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
    const formNumbers = options.map((option) => labelToForm(option))
    expect(formNumbers).toEqual([...formNumbers].sort((a, b) => a - b))
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
    const selectedForm = labelToForm(exercise.options[exercise.answer])
    const selectedFormVerbs = verbs.filter((verb) => verb.form === selectedForm)
    const activeMatch = selectedFormVerbs.some(
      (verb) => exerciseDiacritics(deriveActiveParticiple(verb), easyProfile.diacritics) === exercise.word,
    )
    const passiveMatch = selectedFormVerbs.some(
      (verb) => exerciseDiacritics(derivePassiveParticiple(verb), easyProfile.diacritics) === exercise.word,
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
