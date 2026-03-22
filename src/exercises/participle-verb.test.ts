import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { participleVerbExercise } from './participle-verb'

describe('participleVerbExercise', () => {
  test('returns kind "participleVerb"', () => {
    expect(participleVerbExercise().kind).toBe('participleVerb')
  })

  test('returns the correct translation key for active or passive participle', () => {
    const { promptTranslationKey } = participleVerbExercise()
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.activeParticipleVerb',
      'exercise.prompt.passiveParticipleVerb',
    ])
  })

  test('medium returns exactly four options', () => {
    expect(participleVerbExercise('medium').options).toHaveLength(4)
  })

  test('hard returns exactly four options', () => {
    expect(participleVerbExercise('hard').options).toHaveLength(4)
  })

  test('correct answer is a valid index into options', () => {
    const { options, answer } = participleVerbExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('all options are unique by visible label', () => {
    const medium = participleVerbExercise('medium')
    const hard = participleVerbExercise('hard')

    expect(new Set(medium.options).size).toBe(medium.options.length)
    expect(new Set(hard.options).size).toBe(hard.options.length)
  })

  test('prompt type matches the shown participle word for the selected answer at the same difficulty', () => {
    const medium = participleVerbExercise('medium')
    const hard = participleVerbExercise('hard')

    const mediumLabel = medium.options[medium.answer]
    const hardLabel = hard.options[hard.answer]
    const mediumMatches = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'medium') === mediumLabel)
    const hardMatches = verbs.filter((verb) => diacriticsDifficulty(verb.label, 'hard') === hardLabel)

    const mediumValid =
      medium.promptTranslationKey === 'exercise.prompt.activeParticipleVerb'
        ? mediumMatches.some((verb) => diacriticsDifficulty(deriveActiveParticiple(verb), 'medium') === medium.word)
        : mediumMatches.some((verb) => diacriticsDifficulty(derivePassiveParticiple(verb), 'medium') === medium.word)

    const hardValid =
      hard.promptTranslationKey === 'exercise.prompt.activeParticipleVerb'
        ? hardMatches.some((verb) => diacriticsDifficulty(deriveActiveParticiple(verb), 'hard') === hard.word)
        : hardMatches.some((verb) => diacriticsDifficulty(derivePassiveParticiple(verb), 'hard') === hard.word)

    expect(mediumValid).toBe(true)
    expect(hardValid).toBe(true)
  })
})
