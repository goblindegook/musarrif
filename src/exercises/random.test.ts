import { afterEach, describe, expect, test, vi } from 'vitest'
import { getVerbById } from '../paradigms/verbs'
import * as dimensions from './dimensions'
import { randomExercise } from './random'

const INITIAL_DIMENSION_PROFILE = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
} as const

describe('randomExercise', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('serves a due card when one exists in srsStore', () => {
    const store = { 'conjugation:sound:1:active.past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() } }

    const keys = Array.from({ length: 20 }, () => randomExercise(INITIAL_DIMENSION_PROFILE, store).cardKey)

    expect(keys).toContain('conjugation:sound:1:active.past:3ms')
  })

  test('does not serve due subjunctive cards before subjunctive tenses are unlocked', () => {
    const store = {
      'verbTense:sound:1:active.present.subjunctive:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() },
    }

    const keys = Array.from(
      { length: 20 },
      () => randomExercise({ ...INITIAL_DIMENSION_PROFILE, tenses: 2 }, store).cardKey,
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

    const exercise = randomExercise(
      { ...INITIAL_DIMENSION_PROFILE, tenses: 5, pronouns: 2, forms: 9, rootTypes: 5 },
      store,
    )

    expect(exercise.cardKey).toBe('conjugation:defective:10:passive.present.subjunctive:3ms')
  })
})

function today() {
  return new Date().toISOString().slice(0, 10)
}
