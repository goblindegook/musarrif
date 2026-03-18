import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { stripDiacritics } from '../paradigms/letters'
import { verbs } from '../paradigms/verbs'
import { rootExercise } from './root'

function spacedLetters(value: string): string {
  return Array.from(value).join(' ')
}

describe('rootExercise', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "root"', () => {
    expect(rootExercise().kind).toBe('root')
  })

  test('returns the correct translation key', () => {
    expect(rootExercise().promptTranslationKey).toBe('exercise.root.prompt')
  })

  test('returns exactly four options', () => {
    expect(rootExercise().options).toHaveLength(4)
  })

  test('returns unique options', () => {
    const { options } = rootExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index', () => {
    const { options, answer } = rootExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('correct option matches root letters separated by spaces', () => {
    const { options, answer } = rootExercise()
    expect(options[answer]).toBe(spacedLetters(verbs[0].root))
  })

  test('all options use the same number of letters as the root', () => {
    const { options } = rootExercise()
    const rootLength = Array.from(verbs[0].root).length

    expect(
      options.every((option) => {
        const letters = option.split(' ')
        return letters.length === rootLength && letters.every((letter) => letter.length === 1)
      }),
    ).toBe(true)
  })

  test('wrong options include letters from the conjugated verb shown to the user', () => {
    const { word, options, answer } = rootExercise()
    const lettersInWord = new Set(Array.from(stripDiacritics(word)))
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions.every((option) => option.split(' ').some((letter) => lettersInWord.has(letter)))).toBe(true)
  })
})
