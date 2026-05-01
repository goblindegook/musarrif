import { afterEach, describe, expect, test, vi } from 'vitest'
import { getVerbById } from '../paradigms/verbs'
import * as dimensions from './dimensions'
import { isCoveredTriple, nextExercise } from './scheduler'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

describe('nextExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('serves a due card when session does not allow new card introduction', () => {
    const store = { 'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() } }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session).cardKey)

    expect(keys).toContain('conjugation:sound:1:active.past:3ms')
  })

  test('does not serve due subjunctive cards before subjunctive tenses are unlocked', () => {
    const store = {
      'verbTense:sound:1:active.present.subjunctive:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const keys = Array.from(
      { length: 20 },
      () => nextExercise({ ...INITIAL_DIMENSION_PROFILE, tenses: 1 }, store, session).cardKey,
    )

    expect(keys).not.toContain('verbTense:sound:1:active.present.subjunctive:3ms')
  })

  test('uses normalized cardKey when due key has an incompatible pronoun for impersonal passive', () => {
    vi.spyOn(dimensions, 'randomVerb').mockReturnValue(getVerbById('lqy-10')!)
    const store = {
      'conjugation:defective:10:passive.present.subjunctive:2mp': {
        interval: 1,
        ef: 2.5,
        repetitions: 1,
        dueDate: today(),
      },
    }
    const session = { reviews: 0, lastNewAt: 0 }

    const exercise = nextExercise(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 4, pronouns: 2, forms: 9, rootTypes: 5 },
      store,
      session,
    )

    expect(exercise.cardKey).toBe('conjugation:defective:10:passive.present.subjunctive:3ms')
  })

  test('serves a new triple when session allows and due cards exist', () => {
    const store = { 'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() } }
    const session = { reviews: 3, lastNewAt: 0 }

    const exercises = Array.from({ length: 20 }, () => nextExercise(INITIAL_DIMENSION_PROFILE, store, session))

    expect(exercises.every((e) => !isCoveredTriple(e.cardKey, store))).toBe(true)
  })

  test('serves a new triple when no due cards exist regardless of session ratio', () => {
    const store = { 'verbForm:sound:1': { interval: 7, ef: 2.5, repetitions: 2, dueDate: '2030-01-01' } }
    const session = { reviews: 0, lastNewAt: 0 }

    const exercise = nextExercise(INITIAL_DIMENSION_PROFILE, store, session)

    expect(isCoveredTriple(exercise.cardKey, store)).toBe(false)
  })

  test('introduces nominal triples when nominals unlock and uncovered triples exist', () => {
    const exercises = Array.from({ length: 50 }, () =>
      nextExercise(
        { ...INITIAL_DIMENSION_PROFILE, tenses: 2, pronouns: 2, forms: 1, rootTypes: 1, nominals: 1 },
        { 'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() } },
        { reviews: 3, lastNewAt: 0 },
      ),
    )

    const nominalKinds = [
      'participleForm',
      'participleRoot',
      'participleVerb',
      'verbParticiple',
      'masdarForm',
      'masdarRoot',
      'masdarVerb',
      'verbMasdar',
    ]
    expect(exercises.some((e) => nominalKinds.includes(e.kind))).toBe(true)
  })
})

describe('isCoveredTriple', () => {
  test('returns false for a triple absent from the store', () => {
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', {})).toBe(false)
  })

  test('returns true when an exact triple key with no tense/pronoun is in the store', () => {
    const store = { 'masdarForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' } }
    expect(isCoveredTriple('masdarForm:sound:1', store)).toBe(true)
  })

  test('returns true when a key with tense and pronoun suffix for the same triple is in the store', () => {
    const store = {
      'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' },
    }
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', store)).toBe(true)
  })

  test('returns false when a different kind has an entry but not the queried triple', () => {
    const store = { 'verbForm:sound:1': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' } }
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', store)).toBe(false)
  })

  test('does not confuse form 1 with form 10', () => {
    const store = {
      'conjugation:sound:10:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: '2030-01-01' },
    }
    expect(isCoveredTriple('conjugation:sound:1:active.past:3ms', store)).toBe(false)
  })
})

function today() {
  return new Date().toISOString().slice(0, 10)
}
