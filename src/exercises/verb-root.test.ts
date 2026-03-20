import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { stripDiacritics } from '../paradigms/letters'
import { verbs } from '../paradigms/verbs'
import { verbRootExercise } from './verb-root'

describe('rootExercise', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "root"', () => {
    expect(verbRootExercise().kind).toBe('verbRoot')
  })

  test('returns the correct translation key', () => {
    expect(verbRootExercise().promptTranslationKey).toBe('exercise.root.prompt')
  })

  test('returns exactly four options', () => {
    expect(verbRootExercise().options).toHaveLength(4)
  })

  test('returns unique options', () => {
    const { options } = verbRootExercise()
    expect(new Set(options).size).toBe(options.length)
  })

  test('correct answer is a valid index', () => {
    const { options, answer } = verbRootExercise()

    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('correct option matches root letters separated by spaces', () => {
    const { options, answer } = verbRootExercise()
    expect(options[answer]).toBe('ش ع ر')
  })

  test('all options use the same number of letters as the root', () => {
    const { options } = verbRootExercise()
    const rootLength = Array.from(verbs[0].root).length

    expect(
      options.every((option) => {
        const letters = option.split(' ')
        return letters.length === rootLength && letters.every((letter) => letter.length === 1)
      }),
    ).toBe(true)
  })

  test('wrong options include letters from the conjugated verb shown to the user', () => {
    const { word, options, answer } = verbRootExercise()
    const lettersInWord = new Set(Array.from(stripDiacritics(word)))
    const wrongOptions = options.filter((_, index) => index !== answer)

    expect(wrongOptions.every((option) => option.split(' ').some((letter) => lettersInWord.has(letter)))).toBe(true)
  })
})
