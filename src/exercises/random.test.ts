import { describe, expect, test } from 'vitest'
import { INITIAL_DIMENSION_PROFILE } from './dimensions'
import { randomExercise } from './random'

describe('randomExercise', () => {
  test('serves a due card when one exists in srsStore', () => {
    const today = new Date().toISOString().slice(0, 10)
    const store = { 'conjugation:sound:1:active-past:3ms': { interval: 1, ef: 2.5, repetitions: 1, dueDate: today } }

    const keys = Array.from({ length: 20 }, () => randomExercise(INITIAL_DIMENSION_PROFILE, store).cardKey)
    expect(keys).toContain('conjugation:sound:1:active-past:3ms')
  })
})
