import { describe, expect, test } from 'vitest'
import { randomExercise } from './random'

describe('randomExercise', () => {
  test('serves a due card when one exists in srsStore', () => {
    const exercise = randomExercise('easy')
    const key = exercise.cardKey!
    const store = { [key]: { interval: 1, ef: 2.5, repetitions: 1, dueDate: new Date().toISOString().slice(0, 10) } }

    const keys = Array.from({ length: 20 }, () => randomExercise('easy', store).cardKey)
    expect(keys).toContain(key)
  })
})
