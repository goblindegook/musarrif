import { describe, expect, test } from 'vitest'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { verbs } from '../paradigms/verbs'
import { diacriticsDifficulty } from './difficulty'
import { participleRootExercise } from './participle-root'

describe('participleRootExercise', () => {
  test('returns kind "participleRoot"', () => {
    expect(participleRootExercise().kind).toBe('participleRoot')
  })

  test('returns the correct translation key for active or passive participle', () => {
    const { promptTranslationKey } = participleRootExercise()
    expect(promptTranslationKey).toBeOneOf([
      'exercise.prompt.activeParticipleRoot',
      'exercise.prompt.passiveParticipleRoot',
    ])
  })

  test('returns exactly four options', () => {
    expect(participleRootExercise().options).toHaveLength(4)
  })

  test('returns unique options', () => {
    const { options } = participleRootExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index', () => {
    const { options, answer } = participleRootExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('correct option matches an existing root with letters separated by spaces', () => {
    const { options, answer } = participleRootExercise()
    const correctRoot = options[answer].split(' ').join('')
    expect(verbs.some((verb) => verb.root === correctRoot)).toBe(true)
  })

  test('prompt type matches the shown participle word in easy difficulty', () => {
    const exercise = participleRootExercise('easy')
    const selectedRoot = exercise.options[exercise.answer].split(' ').join('')
    const matchingVerbs = verbs.filter((verb) => verb.root === selectedRoot)
    const matchesActive = matchingVerbs.some(
      (verb) => diacriticsDifficulty(deriveActiveParticiple(verb), 'easy') === exercise.word,
    )
    const matchesPassive = matchingVerbs.some(
      (verb) => diacriticsDifficulty(derivePassiveParticiple(verb), 'easy') === exercise.word,
    )

    expect(
      (exercise.promptTranslationKey === 'exercise.prompt.activeParticipleRoot' && matchesActive) ||
        (exercise.promptTranslationKey === 'exercise.prompt.passiveParticipleRoot' && matchesPassive),
    ).toBe(true)
  })

  test('includes exactly three wrong options and all differ from the correct root', () => {
    const { options, answer } = participleRootExercise()
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions).toHaveLength(3)
    expect(wrongOptions.every((option) => option !== options[answer])).toBe(true)
  })
})
