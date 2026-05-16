import { act, renderHook } from '@testing-library/preact'
import { beforeEach, describe, expect, test } from 'vitest'
import type { DailyActivity } from '../../exercises/stats'
import { deserializeDayStats, parseTrackedExercises, serializeDayStats, useStats } from './useStats'

beforeEach(() => {
  localStorage.clear()
})

test('syncs stats across multiple useStats instances in the same document', () => {
  const first = renderHook(() => useStats())
  const second = renderHook(() => useStats())

  act(() => {
    first.result.current.recordResult('correct')
  })

  expect(second.result.current.stats[0]?.correct ?? 0).toBe(1)
})

describe('serializeDayStats', () => {
  test('uses local date for a late-evening timestamp (not UTC)', () => {
    const lateEvening = new Date(2026, 2, 19, 23, 0, 0)
    expect(serializeDayStats([{ date: lateEvening, correct: 1, incorrect: 0, passed: 0 }])[0].date).toBe('2026-03-19')
  })

  test('converts Date to date-only string', () => {
    const stats: DailyActivity[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    expect(serializeDayStats(stats)).toEqual([{ date: '2026-03-19', correct: 3, incorrect: 1, passed: 0 }])
  })

  test('does not include time component in serialized date', () => {
    const stats: DailyActivity[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0, passed: 0 }]
    const serialized = serializeDayStats(stats)
    expect(serialized[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  test('includes passed field in serialized output', () => {
    const stats: DailyActivity[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 2 }]
    expect(serializeDayStats(stats)).toEqual([{ date: '2026-03-19', correct: 3, incorrect: 1, passed: 2 }])
  })
})

describe('deserializeDayStats', () => {
  test('converts date string to Date', () => {
    const raw = [{ date: '2026-03-19', correct: 3, incorrect: 1 }]
    expect(deserializeDayStats(raw)).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }])
  })

  test('defaults passed to 0 when field is absent', () => {
    const raw = [{ date: '2026-03-19', correct: 3, incorrect: 1 }]
    const result = deserializeDayStats(raw)
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }])
  })

  test('round-trips through serialize and deserialize', () => {
    const stats: DailyActivity[] = [
      { date: d('2026-03-18'), correct: 2, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 1, passed: 0 },
    ]
    expect(deserializeDayStats(serializeDayStats(stats))).toEqual(stats)
  })

  test('round-trip preserves non-zero passed value', () => {
    const stats: DailyActivity[] = [{ date: d('2026-03-19'), correct: 2, incorrect: 1, passed: 3 }]
    expect(deserializeDayStats(serializeDayStats(stats))).toEqual(stats)
  })
})

describe('parseTrackedExercises', () => {
  test('normalizes numeric fields and drops entries with invalid date', () => {
    expect(
      parseTrackedExercises([
        { date: '2026-03-19', correct: 3, incorrect: 1 },
        { date: '2026-03-21', correct: 2, incorrect: 0, passed: 4 },
        { date: '2026-03-20', correct: Number.NaN, incorrect: 1 },
        { date: 123, correct: 1, incorrect: 0 },
        null,
      ]),
    ).toEqual([
      { date: '2026-03-19', correct: 3, incorrect: 1, passed: 0 },
      { date: '2026-03-21', correct: 2, incorrect: 0, passed: 4 },
      { date: '2026-03-20', correct: 0, incorrect: 1, passed: 0 },
    ])
  })

  test('returns empty array for non-array input', () => {
    expect(parseTrackedExercises('nope')).toEqual([])
  })
})

const d = (s: string) => {
  const [y, m, day] = s.split('-').map(Number)
  return new Date(y, m - 1, day)
}
