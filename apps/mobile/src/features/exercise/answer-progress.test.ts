import { DEFAULT_DIMENSION_PROFILE } from '../../../../../src/exercises/dimensions'
import { nextExercise } from '../../../../../src/exercises/scheduler'
import { STREAK_DAILY_GOAL } from '../../../../../src/exercises/stats'
import type { UserDataKey, UserDataValue } from '../../storage/schema'
import { recordExerciseAnswer } from './answer-progress'
import { seededRandom } from './seeded-random'

const NOW = new Date('2026-10-03T12:00:00')
const DAILY_KEY = 'exercise:daily:2026-10-03'

const previousRandom = Math.random
Math.random = seededRandom(7)
const exercise = nextExercise(DEFAULT_DIMENSION_PROFILE, {})
Math.random = previousRandom

const answer = (result: 'correct' | 'wrong' | 'pass') => ({
  cardKey: exercise.cardKey,
  dimensions: exercise.dimensions,
  kind: exercise.kind,
  responseTimeMs: 1200,
  result,
})

function apply(
  values: Partial<Record<UserDataKey, UserDataValue>>,
  writes: readonly (readonly [UserDataKey, UserDataValue])[],
) {
  return { ...values, ...Object.fromEntries(writes) }
}

describe('recordExerciseAnswer', () => {
  test('a correct answer updates the review card, the adaptive dimensions and today’s activity', () => {
    const progress = recordExerciseAnswer({}, answer('correct'), NOW)

    expect(progress?.writes.map(([key]) => key)).toEqual([`srs:${exercise.cardKey}`, 'dimension:store', DAILY_KEY])
    expect(progress?.writes.at(-1)?.[1]).toEqual({ date: '2026-10-03', correct: 1, incorrect: 0, passed: 0 })
  })

  test('a skipped answer leaves the adaptive dimensions alone and counts as passed', () => {
    const progress = recordExerciseAnswer({}, answer('pass'), NOW)

    expect(progress?.writes.map(([key]) => key)).toEqual([`srs:${exercise.cardKey}`, DAILY_KEY])
    expect(progress?.writes.at(-1)?.[1]).toEqual({ date: '2026-10-03', correct: 0, incorrect: 0, passed: 1 })
  })

  test('the next answer builds on the writes of the previous one', () => {
    const first = recordExerciseAnswer({}, answer('correct'), NOW)
    const second = recordExerciseAnswer(apply({}, first?.writes ?? []), answer('wrong'), NOW)

    expect(second?.writes.at(-1)?.[1]).toEqual({ date: '2026-10-03', correct: 1, incorrect: 1, passed: 0 })
  })

  test('reports the answer that reaches the daily goal as extending the streak', () => {
    const almost = { [DAILY_KEY]: { date: '2026-10-03', correct: STREAK_DAILY_GOAL - 1, incorrect: 0, passed: 0 } }

    expect(recordExerciseAnswer(almost, answer('correct'), NOW)?.streakExtended).toBe(true)
    expect(recordExerciseAnswer({}, answer('correct'), NOW)?.streakExtended).toBe(false)
  })
})
