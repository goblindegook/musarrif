import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { randomExercise } from './random'

describe('randomExercise', () => {
  test('serves a due card when one exists in srsStore', () => {
    const store = { 'conjugation:sound:1:active-past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() } }

    const keys = Array.from({ length: 20 }, () => randomExercise(INITIAL_DIMENSION_PROFILE, store).cardKey)

    expect(keys).toContain('conjugation:sound:1:active-past:3ms')
  })

  test('does not serve due subjunctive cards before subjunctive tenses are unlocked', () => {
    const store = {
      'verbTense:sound:1:active-present-subjunctive:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today() },
    }

    const keys = Array.from(
      { length: 20 },
      () => randomExercise({ ...INITIAL_DIMENSION_PROFILE, tenses: 2 }, store).cardKey,
    )

    expect(keys).not.toContain('verbTense:sound:1:active-present-subjunctive:3ms')
  })
})

function today() {
  return new Date().toISOString().slice(0, 10)
}
