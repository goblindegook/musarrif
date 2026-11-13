import { afterEach, describe, expect, test, vi } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from '../../test/profiles'
import { verbTenseExercise } from './verb-tense.ts'

describe('tenseExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "tense"', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('verbTense')
  })

  test('options are its tenses', () => {
    const { tenses, options } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(tenses).toEqual(options)
  })

  test('returns four options', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('word is non-empty', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
  })
})

describe('tenseExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('word uses the exercise diacritics display', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).word).toEqualT('شَعَبَ')
  })

  test('options omit voice before the passive is unlocked', () => {
    expect(verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 2 })).toMatchObject({
      withVoice: false,
    })
  })

  test('correct answer is the active past (random=0)', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer]).toBe('active.past')
  })

  test('imperative constraint makes the imperative the answer', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE, { tense: 'active.imperative' })
    expect(options[answer]).toBe('active.imperative')
  })
})

describe('tenseExercise distractor strategies', () => {
  test('three distractors are distinct from the correct answer', () => {
    const { options, answer } = verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE)
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })

  test('options name the voice on higher difficulty', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(verbTenseExercise.generate({ ...INITIAL_DIMENSION_PROFILE, tenses: 4 })).toMatchObject({
      withVoice: true,
    })
  })
})

describe('verbTenseExercise with constraints', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('attaches cardKey to returned exercise', () => {
    expect(verbTenseExercise.generate(INITIAL_DIMENSION_PROFILE).cardKey).toMatch(/^verbTense:[a-z]+:\d+:[\w.]+:\w+$/)
  })

  test('uses a valid imperative pronoun when constrained to imperative at pronoun level 0', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const exercise = verbTenseExercise.generate(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 4 },
      { tense: 'active.imperative' },
    )
    expect(exercise.cardKey).toMatch(/:active\.imperative:2\w+$/)
  })
})
