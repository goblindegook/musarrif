import { afterEach, describe, expect, test, vi } from 'vitest'
import { getVerbById } from '../../paradigms/verbs'
import { INITIAL_DIMENSION_PROFILE } from '../../test/profiles'
import * as dimensions from '../dimensions'
import { conjugationExercise } from './conjugation'

describe('conjugationExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "conjugation"', () => {
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).kind).toBe('conjugation')
  })

  test('returns a non-empty Arabic word', () => {
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).word.length).toBeGreaterThan(0)
  })

  test('returns exactly four options', () => {
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('options[answer] is a non-empty Arabic string', () => {
    const { options, answer } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer].length).toBeGreaterThan(0)
  })

  test('includes speech in inputModes', () => {
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).inputModes).toContain('speech')
  })
})

describe('conjugationExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('word uses the exercise diacritics display', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(word).toEqualT('شَعَبَ')
  })

  test('pronouns:0/tenses:0: answer is 3ms active past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer]).toEqualT('شَعَبَ')
  })

  test('pronouns:0/tenses:0: asks for the active past without voice (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)).toMatchObject({
      tense: 'active.past',
      withVoice: false,
    })
  })

  test('tenses:3: omits voice (voice not yet unlocked)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 2, tenses: 3 })).toMatchObject({
      tense: 'active.past',
      withVoice: false,
    })
  })

  test('tenses:4: names the voice for active past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 2, tenses: 4 })).toMatchObject({
      tense: 'active.past',
      withVoice: true,
    })
  })

  test('pronouns:0/tenses:0: pronoun is 3ms (random=0 → 3ms)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)).toMatchObject({ pronoun: '3ms' })
  })
})

describe('conjugationExercise distractors', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('pronouns:0/tenses:0: all options are non-empty strings', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('medium profile: all options are non-empty strings', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 1, tenses: 2 })
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('hard profile: all options are non-empty strings', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = conjugationExercise.generate({
      ...INITIAL_DIMENSION_PROFILE,
      pronouns: 2,
      tenses: 2,
    })
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('hard profile: three distractors are each distinct from the answer', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = conjugationExercise.generate({
      ...INITIAL_DIMENSION_PROFILE,
      pronouns: 2,
      tenses: 2,
    })
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })
})

describe('conjugationExercise with constraints', () => {
  afterEach(() => vi.restoreAllMocks())

  test('attaches cardKey to returned exercise', () => {
    const exercise = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(exercise.cardKey).toMatch(/^conjugation:[a-z]+:\d+:[\w.]+:\w+$/)
  })

  test('cardKey reflects constrained form', () => {
    const exercise = conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, forms: 1 }, { form: 2 })
    expect(exercise.cardKey).toMatch(/^conjugation:[a-z]+:2:/)
  })

  test('cardKey reflects constrained tense', () => {
    const exercise = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE, {
      tense: 'active.past',
      pronoun: '3ms',
    })
    expect(exercise.cardKey).toContain(':active.past:3ms')
  })

  test('forces 3ms for impersonal passive constraints and keeps the answer non-empty', () => {
    vi.spyOn(dimensions, 'randomVerb').mockReturnValue(getVerbById('lqy-10')!)

    const exercise = conjugationExercise.generate(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 4, pronouns: 2, forms: 3, rootTypes: 5 },
      { rootType: 'defective', form: 10, tense: 'passive.present.subjunctive', pronoun: '2mp' },
    )

    expect(exercise.pronoun).toBe('3ms')
    expect(exercise.cardKey).toContain(':passive.present.subjunctive:3ms')
    expect(exercise.options[exercise.answer]).not.toBe('')
  })
})
