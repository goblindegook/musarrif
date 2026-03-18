import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { conjugatePast } from '../paradigms/active/past'
import { applyDiacriticsPreference } from '../paradigms/letters'
import { verbs } from '../paradigms/verbs'
import { conjugationExercise } from './conjugation'

describe('conjugationExercise', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('returns kind "conjugation"', () => {
    expect(conjugationExercise('easy').kind).toBe('conjugation')
  })

  test('returns a non-empty Arabic word', () => {
    expect(conjugationExercise('easy').word.length).toBeGreaterThan(0)
  })

  test('returns promptTranslationKey "exercise.conjugation.prompt"', () => {
    expect(conjugationExercise('easy').promptTranslationKey).toBe('exercise.conjugation.prompt')
  })

  test('returns promptParams with tense and pronoun keys', () => {
    const { promptParams } = conjugationExercise('easy')
    expect(promptParams).toBeDefined()
    expect(promptParams?.tense).toBeDefined()
    expect(promptParams?.pronoun).toBeDefined()
  })

  test('returns exactly four options', () => {
    expect(conjugationExercise('easy').options).toHaveLength(4)
  })

  test('all options are unique', () => {
    const { options } = conjugationExercise('easy')
    expect(new Set(options).size).toBe(options.length)
  })

  test('answer is a valid index', () => {
    const { options, answer } = conjugationExercise('easy')
    expect(answer).toBeGreaterThanOrEqual(0)
    expect(answer).toBeLessThan(options.length)
  })

  test('options[answer] is a non-empty Arabic string', () => {
    const { options, answer } = conjugationExercise('easy')
    expect(options[answer].length).toBeGreaterThan(0)
  })
})

describe('conjugationExercise difficulty', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('easy: word is 3ms active past with all diacritics (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise('easy')
    expect(word).toEqualT(conjugatePast(verbs[0])['3ms'])
  })

  test('medium: word is 3ms active past with essential diacritics (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise('medium')
    expect(word).toEqualT(applyDiacriticsPreference(conjugatePast(verbs[0])['3ms'], 'some'))
  })

  test('hard: word has no diacritics (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { word } = conjugationExercise('hard')
    expect(word).toBe(applyDiacriticsPreference(conjugatePast(verbs[0])['3ms'], 'none'))
  })

  test('easy: answer is 1s active past with all diacritics (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = conjugationExercise('easy')
    expect(options[answer]).toEqualT(conjugatePast(verbs[0])['1s'])
  })

  test('easy: promptParams.tense is unvoiced tense key for active past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise('easy').promptParams?.tense).toBe('exercise.conjugation.tense.past')
  })

  test('hard: promptParams.tense uses voiced key for active past (random=0)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise('hard').promptParams?.tense).toBe('exercise.conjugation.tense.active.past')
  })

  test('easy: promptParams.pronoun is exercise.conjugation.pronoun.1s (random=0 → 1s)', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(conjugationExercise('easy').promptParams?.pronoun).toBe('exercise.conjugation.pronoun.1s')
  })

  test('easy: pronoun key is one of the known pronoun translation keys', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const KNOWN_PRONOUN_KEYS = new Set([
      'exercise.conjugation.pronoun.1s',
      'exercise.conjugation.pronoun.1p',
      'exercise.conjugation.pronoun.2ms',
      'exercise.conjugation.pronoun.2fs',
      'exercise.conjugation.pronoun.2d',
      'exercise.conjugation.pronoun.2mp',
      'exercise.conjugation.pronoun.2fp',
      'exercise.conjugation.pronoun.3ms',
      'exercise.conjugation.pronoun.3fs',
      'exercise.conjugation.pronoun.3md',
      'exercise.conjugation.pronoun.3fd',
      'exercise.conjugation.pronoun.3mp',
      'exercise.conjugation.pronoun.3fp',
    ])
    expect(KNOWN_PRONOUN_KEYS.has(conjugationExercise('easy').promptParams?.pronoun ?? '')).toBe(true)
  })
})

describe('conjugationExercise distractors', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('easy: all options are non-empty strings', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = conjugationExercise('easy')
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('medium: all options are non-empty strings', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = conjugationExercise('medium')
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('hard: all options are non-empty strings', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options } = conjugationExercise('hard')
    expect(options.every((o) => o.length > 0)).toBe(true)
  })

  test('hard: three distractors are each distinct from the answer', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { options, answer } = conjugationExercise('hard')
    const distractors = options.filter((_, i) => i !== answer)
    expect(distractors.every((d) => d !== options[answer])).toBe(true)
  })

  test('easy: no dual pronoun forms appear in any option (random=0)', () => {
    // Easy mode excludes dual pronouns, so no options should be dual conjugations of the target verb
    // (We verify this indirectly: promptParams.pronoun must not be a dual key)
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const DUAL_KEYS = new Set([
      'exercise.conjugation.pronoun.2d',
      'exercise.conjugation.pronoun.3md',
      'exercise.conjugation.pronoun.3fd',
    ])
    expect(DUAL_KEYS.has(conjugationExercise('easy').promptParams?.pronoun ?? '')).toBe(false)
  })
})
