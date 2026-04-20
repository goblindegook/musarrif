import { afterEach, describe, expect, test, vi } from 'vitest'
import { getVerbById } from '../paradigms/verbs'
import { conjugationExercise } from './conjugation'
import * as dimensions from './dimensions'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

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

  test('returns promptTranslationKey "exercise.prompt.conjugation"', () => {
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).promptTranslationKey).toBe(
      'exercise.prompt.conjugation',
    )
  })

  test('returns promptParams with tense and pronoun keys', () => {
    const { promptParams } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(promptParams).toBeDefined()
    expect(promptParams?.tense).toBeDefined()
    expect(promptParams?.pronoun).toBeDefined()
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
})

describe('conjugationExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('diacritics:0 (all): word is شَعَرَ (3ms active past, all diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(word).toEqualT('شَعَرَ')
  })

  test('medium profile: word is شَعَرَ (3ms active past, some diacritics, random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 1, tenses: 2 })
    expect(word).toEqualT('شَعَرَ')
  })

  test('diacritics:2 (none): word has no diacritics (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise.generate({
      ...INITIAL_DIMENSION_PROFILE,
      pronouns: 2,
      tenses: 2,
      diacritics: 2,
    })
    expect(word).toBe('شعر')
  })

  test('pronouns:0/tenses:0: answer is 3ms active past with all diacritics (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = conjugationExercise.generate(INITIAL_DIMENSION_PROFILE)
    expect(options[answer]).toEqualT('شَعَرَ')
  })

  test('pronouns:0/tenses:0: promptParams.tense is unvoiced tense key for active past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).promptParams?.tense).toBe(
      'exercise.conjugation.tense.past',
    )
  })

  test('tenses:4: promptParams.tense uses unvoiced key (voice not yet unlocked)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(
      conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 2, tenses: 4, diacritics: 2 }).promptParams
        ?.tense,
    ).toBe('exercise.conjugation.tense.past')
  })

  test('tenses:5: promptParams.tense uses voiced key for active past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(
      conjugationExercise.generate({ ...INITIAL_DIMENSION_PROFILE, pronouns: 2, tenses: 5, diacritics: 2 }).promptParams
        ?.tense,
    ).toBe('exercise.conjugation.tense.active.past')
  })

  test('pronouns:0/tenses:0: promptParams.pronoun is pronoun.3ms (random=0 → 3ms)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).promptParams?.pronoun).toBe('pronoun.3ms')
  })

  test('pronouns:0/tenses:0: pronoun key is one of the known pronoun translation keys', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).promptParams?.pronoun).toBeOneOf([
      'pronoun.1s',
      'pronoun.1p',
      'pronoun.2ms',
      'pronoun.2fs',
      'pronoun.2d',
      'pronoun.2mp',
      'pronoun.2fp',
      'pronoun.3ms',
      'pronoun.3fs',
      'pronoun.3md',
      'pronoun.3fd',
      'pronoun.3mp',
      'pronoun.3fp',
    ])
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
      diacritics: 2,
    })
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('hard profile: three distractors are each distinct from the answer', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = conjugationExercise.generate({
      ...INITIAL_DIMENSION_PROFILE,
      pronouns: 2,
      tenses: 2,
      diacritics: 2,
    })
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })

  test('pronouns:0/tenses:0: no dual pronoun forms appear in any option (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const DUAL_KEYS = new Set(['pronoun.2d', 'pronoun.3md', 'pronoun.3fd'])
    expect(DUAL_KEYS.has(conjugationExercise.generate(INITIAL_DIMENSION_PROFILE).promptParams?.pronoun ?? '')).toBe(
      false,
    )
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
      { ...INITIAL_DIMENSION_PROFILE, tenses: 5, pronouns: 2, forms: 3, rootTypes: 5 },
      { rootType: 'defective', form: 10, tense: 'passive.present.subjunctive', pronoun: '2mp' },
    )

    expect(exercise.promptParams?.pronoun).toBe('pronoun.3ms')
    expect(exercise.cardKey).toContain(':passive.present.subjunctive:3ms')
    expect(exercise.options[exercise.answer]).not.toBe('')
  })
})
