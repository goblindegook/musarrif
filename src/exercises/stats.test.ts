import { describe, expect, test } from 'vitest'
import type { DayStats, SerializedDayStats } from './stats'
import {
  addPass,
  addResult,
  deserializeDayStats,
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStreak,
  getStreakGoalProgress,
  getStreakRecord,
  serializeDayStats,
} from './stats'

const d = (s: string) => {
  const [y, m, day] = s.split('-').map(Number)
  return new Date(y, m - 1, day)
}

describe('addResult', () => {
  test('creates a new entry for today when stats are empty', () => {
    const result = addResult([], true, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 1, incorrect: 0, passed: 0 }])
  })

  test('records incorrect answer', () => {
    const result = addResult([], false, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 0, incorrect: 1, passed: 0 }])
  })

  test('increments correct count for existing entry on same day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 2, incorrect: 1, passed: 0 }]
    const result = addResult(stats, true, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }])
  })

  test('increments incorrect count for existing entry on same day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 2, incorrect: 1, passed: 0 }]
    const result = addResult(stats, false, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 2, incorrect: 2, passed: 0 }])
  })

  test('appends a new entry for a different day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-18'), correct: 3, incorrect: 1, passed: 0 }]
    const result = addResult(stats, true, d('2026-03-19'))
    expect(result).toEqual([
      { date: d('2026-03-18'), correct: 3, incorrect: 1, passed: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 0, passed: 0 },
    ])
  })

  test('does not mutate the input array', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0, passed: 0 }]
    addResult(stats, true, d('2026-03-19'))
    expect(stats[0].correct).toBe(1)
  })
})

describe('getStreak', () => {
  test('returns 0 for empty stats', () => {
    expect(getStreak([], d('2026-03-19'))).toBe(0)
  })

  test('returns 1 when only today has exercises', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 }]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })

  test('returns 2 for today and yesterday', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(2)
  })

  test('returns 3 for three consecutive days ending today', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-18'), correct: 12, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(3)
  })

  test('resets streak when there is a gap', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-15'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })

  test('returns 0 when last exercise was more than one day ago', () => {
    const stats: DayStats[] = [{ date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 }]
    expect(getStreak(stats, d('2026-03-19'))).toBe(0)
  })

  test('counts streak from yesterday when today has no exercises', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-18'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(2)
  })

  test('ignores days with zero total exercises', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 0, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })

  test('does not count today when correct answers are below the daily goal', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 9, incorrect: 2, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })

  test('counts today when correct answers reach the daily goal', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 2, passed: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(2)
  })
})

describe('getAccuracyPercent', () => {
  test('returns 0 for empty stats', () => {
    expect(getAccuracyPercent([])).toBe(0)
  })

  test('returns 100 when all answers are correct', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 5, incorrect: 0, passed: 0 }]
    expect(getAccuracyPercent(stats)).toBe(100)
  })

  test('returns 0 when all answers are incorrect', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 0, incorrect: 4, passed: 0 }]
    expect(getAccuracyPercent(stats)).toBe(0)
  })

  test('returns 75 for 3 correct and 1 incorrect', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    expect(getAccuracyPercent(stats)).toBe(75)
  })

  test('aggregates across multiple days', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 2, incorrect: 2, passed: 0 },
      { date: d('2026-03-19'), correct: 6, incorrect: 2, passed: 0 },
    ]
    expect(getAccuracyPercent(stats)).toBe(67)
  })
})

describe('serializeDayStats', () => {
  test('uses local date for a late-evening timestamp (not UTC)', () => {
    const lateEvening = new Date(2026, 2, 19, 23, 0, 0)
    expect(serializeDayStats([{ date: lateEvening, correct: 1, incorrect: 0, passed: 0 }])[0].date).toBe('2026-03-19')
  })

  test('converts Date to date-only string', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    expect(serializeDayStats(stats)).toEqual([{ date: '2026-03-19', correct: 3, incorrect: 1, passed: 0 }])
  })

  test('does not include time component in serialized date', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0, passed: 0 }]
    const serialized = serializeDayStats(stats)
    expect(serialized[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  test('includes passed field in serialized output', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 2 }]
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
    const result = deserializeDayStats(raw as SerializedDayStats[])
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }])
  })

  test('round-trips through serialize and deserialize', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 2, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 1, passed: 0 },
    ]
    expect(deserializeDayStats(serializeDayStats(stats))).toEqual(stats)
  })

  test('round-trip preserves non-zero passed value', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 2, incorrect: 1, passed: 3 }]
    expect(deserializeDayStats(serializeDayStats(stats))).toEqual(stats)
  })
})

describe('addPass', () => {
  test('creates a new entry for today with passed: 1 when stats are empty', () => {
    const result = addPass([], d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 0, incorrect: 0, passed: 1 }])
  })

  test('increments passed on an existing entry without changing correct or incorrect', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 0 }]
    const result = addPass(stats, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1, passed: 1 }])
  })

  test('appends a new entry for a different day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-18'), correct: 2, incorrect: 0, passed: 0 }]
    const result = addPass(stats, d('2026-03-19'))
    expect(result).toEqual([
      { date: d('2026-03-18'), correct: 2, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 0, incorrect: 0, passed: 1 },
    ])
  })

  test('does not mutate the input array', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0, passed: 0 }]
    addPass(stats, d('2026-03-19'))
    expect(stats[0].passed).toBe(0)
  })
})

describe('getRecentAccuracyPercent', () => {
  test('returns 0 for empty stats', () => {
    expect(getRecentAccuracyPercent([], 15, d('2026-03-24'))).toBe(0)
  })

  test('returns correct percentage for data within the window', () => {
    const stats: DayStats[] = [{ date: d('2026-03-20'), correct: 3, incorrect: 1, passed: 0 }]
    expect(getRecentAccuracyPercent(stats, 15, d('2026-03-24'))).toBe(75)
  })

  test('includes a day exactly 14 days before today', () => {
    // today=2026-03-24, 14 days before = 2026-03-10 (inclusive boundary)
    const stats: DayStats[] = [{ date: d('2026-03-10'), correct: 4, incorrect: 0, passed: 0 }]
    expect(getRecentAccuracyPercent(stats, 15, d('2026-03-24'))).toBe(100)
  })

  test('excludes a day exactly 15 days before today', () => {
    // today=2026-03-24, 15 days before = 2026-03-09 (outside window)
    const stats: DayStats[] = [{ date: d('2026-03-09'), correct: 4, incorrect: 0, passed: 0 }]
    expect(getRecentAccuracyPercent(stats, 15, d('2026-03-24'))).toBe(0)
  })

  test('returns 0 when all data is outside the window', () => {
    const stats: DayStats[] = [{ date: d('2026-01-01'), correct: 5, incorrect: 0, passed: 0 }]
    expect(getRecentAccuracyPercent(stats, 15, d('2026-03-24'))).toBe(0)
  })

  test('only counts data within the window, ignoring older entries', () => {
    const stats: DayStats[] = [
      { date: d('2026-01-01'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-20'), correct: 1, incorrect: 3, passed: 0 },
    ]
    expect(getRecentAccuracyPercent(stats, 15, d('2026-03-24'))).toBe(25)
  })
})

describe('getStreakRecord', () => {
  test('returns 0 for empty stats', () => {
    expect(getStreakRecord([])).toBe(0)
  })

  test('returns 0 when all days have only passes', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 0, incorrect: 0, passed: 3 }]
    expect(getStreakRecord(stats)).toBe(0)
  })

  test('returns 1 for a single active day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 }]
    expect(getStreakRecord(stats)).toBe(1)
  })

  test('returns the length of a single unbroken run', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-18'), correct: 12, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreakRecord(stats)).toBe(3)
  })

  test('returns the longest run when multiple separated runs exist', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-10'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-11'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-15'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-16'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-18'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreakRecord(stats)).toBe(4)
  })

  test('a gap (no entry) breaks a run', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreakRecord(stats)).toBe(1)
  })

  test('a pass-only day does not count and breaks a run', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-18'), correct: 0, incorrect: 0, passed: 2 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreakRecord(stats)).toBe(1)
  })

  test('result is always >= getStreak for the same stats', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-10'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-11'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-12'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreakRecord(stats)).toBeGreaterThanOrEqual(getStreak(stats, d('2026-03-19')))
  })

  test('only counts days that meet the daily correct-answer goal', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-10'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-11'), correct: 9, incorrect: 0, passed: 0 },
      { date: d('2026-03-12'), correct: 10, incorrect: 0, passed: 0 },
      { date: d('2026-03-13'), correct: 10, incorrect: 0, passed: 0 },
    ]
    expect(getStreakRecord(stats)).toBe(2)
  })
})

describe('getStreakGoalProgress', () => {
  test('reports remaining answers when below goal', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 4, incorrect: 3, passed: 1 }]
    expect(getStreakGoalProgress(stats, d('2026-03-19'))).toEqual({ correct: 4, remaining: 6 })
  })

  test('reports goal met at exactly daily goal', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 10, incorrect: 0, passed: 0 }]
    expect(getStreakGoalProgress(stats, d('2026-03-19'))).toEqual({
      correct: 10,
      remaining: 0,
    })
  })
})
