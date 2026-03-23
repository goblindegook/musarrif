import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { FORM_LABELS, verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { participleFormExercise } from './participle-form'

function labelToForm(label: string): number {
  return FORM_LABELS.indexOf(label as (typeof FORM_LABELS)[number]) + 1
}

describe('participleFormExercise', () => {
  test('returns kind "participleForm"', () => {
    expect(participleFormExercise().kind).toBe('participleForm')
  })

  test('returns a non-empty Arabic word', () => {
    expect(participleFormExercise().word.length).toBeGreaterThan(0)
  })

  test('returns exactly four options', () => {
    expect(participleFormExercise().options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = participleFormExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('options are Roman numerals sorted in ascending form order', () => {
    const { options } = participleFormExercise()
    const formNumbers = options.map((option) => labelToForm(option))
    expect(formNumbers).toEqual([...formNumbers].sort((a, b) => a - b))
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = participleFormExercise()
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('returns the prompt translation key for active or passive participle', () => {
    const { promptTranslationKey } = participleFormExercise()
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.activeParticipleForm',
      'exercise.prompt.passiveParticipleForm',
    ])
  })

  test('prompt type matches the shown participle word in easy difficulty', () => {
    const exercise = participleFormExercise('easy')
    const selectedForm = labelToForm(exercise.options[exercise.answer])
    const selectedFormVerbs = verbs.filter((verb) => verb.form === selectedForm)
    const activeMatch = selectedFormVerbs.some(
      (verb) => diacriticsDifficulty(deriveActiveParticiple(verb), 'easy') === exercise.word,
    )
    const passiveMatch = selectedFormVerbs.some(
      (verb) => diacriticsDifficulty(derivePassiveParticiple(verb), 'easy') === exercise.word,
    )

    expect(
      (exercise.promptTranslationKey === 'exercise.prompt.activeParticipleForm' && activeMatch) ||
        (exercise.promptTranslationKey === 'exercise.prompt.passiveParticipleForm' && passiveMatch),
    ).toBe(true)
  })
})

describe('participleFormExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(participleFormExercise('easy').cardKey).toMatch(/^participleForm:[a-z]+:\d+$/)
  })
})
