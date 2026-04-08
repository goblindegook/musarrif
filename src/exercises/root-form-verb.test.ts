import { describe, expect, test } from 'vitest'
import { formatFormLabel, verbs } from '../paradigms/verbs'
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
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).promptParams?.form).toMatch(/^[IVX]+q?$/)
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
    const formLabel = exercise.promptParams?.form
    expect(
      verbs.some(
        (v) =>
          v.root === root &&
          formatFormLabel(v.form, v.root) === formLabel &&
          exerciseDiacritics(v.label, easyProfile.diacritics) === exercise.options[exercise.answer],
      ),
    ).toBe(true)
  })
})

describe('rootFormVerbExercise with constraints', () => {
  test('attaches cardKey to returned exercise', () => {
    expect(rootFormVerbExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^rootFormVerb:[a-z]+:\d+$/)
  })

  test('includes only root-and-form explanation payload', () => {
    const exercise = rootFormVerbExercise.generate(
      { ...INITIAL_DIMENSION_PROFILE, forms: 3, rootTypes: 5 },
      { form: 2, rootType: 'sound' },
    )
    const wrongIndex = (exercise.answer + 1) % exercise.options.length

    expect(exercise.explanations?.[wrongIndex]).toEqual({
      rootLetters: exercise.word.split(' '),
      form: 2,
      arabic: exercise.options[exercise.answer],
      rootType: 'sound',
    })
    expect(exercise.explanations?.[exercise.answer]).toBeNull()
  })
})
