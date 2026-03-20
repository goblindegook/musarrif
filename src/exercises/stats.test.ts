import { describe, expect, test } from 'vitest'
import type { DayStats } from './stats'
import { addResult, deserializeDayStats, getScorePercent, getStreak, serializeDayStats } from './stats'

const d = (s: string) => new Date(s)

describe('addResult', () => {
  test('creates a new entry for today when stats are empty', () => {
    const result = addResult([], true, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 1, incorrect: 0 }])
  })

  test('records incorrect answer', () => {
    const result = addResult([], false, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 0, incorrect: 1 }])
  })

  test('increments correct count for existing entry on same day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 2, incorrect: 1 }]
    const result = addResult(stats, true, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1 }])
  })

  test('increments incorrect count for existing entry on same day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 2, incorrect: 1 }]
    const result = addResult(stats, false, d('2026-03-19'))
    expect(result).toEqual([{ date: d('2026-03-19'), correct: 2, incorrect: 2 }])
  })

  test('appends a new entry for a different day', () => {
    const stats: DayStats[] = [{ date: d('2026-03-18'), correct: 3, incorrect: 1 }]
    const result = addResult(stats, true, d('2026-03-19'))
    expect(result).toEqual([
      { date: d('2026-03-18'), correct: 3, incorrect: 1 },
      { date: d('2026-03-19'), correct: 1, incorrect: 0 },
    ])
  })

  test('does not mutate the input array', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0 }]
    addResult(stats, true, d('2026-03-19'))
    expect(stats[0].correct).toBe(1)
  })
})

describe('getStreak', () => {
  test('returns 0 for empty stats', () => {
    expect(getStreak([], d('2026-03-19'))).toBe(0)
  })

  test('returns 1 when only today has exercises', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0 }]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })

  test('returns 2 for today and yesterday', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 2, incorrect: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(2)
  })

  test('returns 3 for three consecutive days ending today', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 1, incorrect: 0 },
      { date: d('2026-03-18'), correct: 2, incorrect: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(3)
  })

  test('resets streak when there is a gap', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-15'), correct: 5, incorrect: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })

  test('returns 0 when last exercise was more than one day ago', () => {
    const stats: DayStats[] = [{ date: d('2026-03-17'), correct: 3, incorrect: 0 }]
    expect(getStreak(stats, d('2026-03-19'))).toBe(0)
  })

  test('counts streak from yesterday when today has no exercises', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-17'), correct: 2, incorrect: 0 },
      { date: d('2026-03-18'), correct: 1, incorrect: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(2)
  })

  test('ignores days with zero total exercises', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 0, incorrect: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 0 },
    ]
    expect(getStreak(stats, d('2026-03-19'))).toBe(1)
  })
})

describe('getScorePercent', () => {
  test('returns 0 for empty stats', () => {
    expect(getScorePercent([])).toBe(0)
  })

  test('returns 100 when all answers are correct', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 5, incorrect: 0 }]
    expect(getScorePercent(stats)).toBe(100)
  })

  test('returns 0 when all answers are incorrect', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 0, incorrect: 4 }]
    expect(getScorePercent(stats)).toBe(0)
  })

  test('returns 75 for 3 correct and 1 incorrect', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1 }]
    expect(getScorePercent(stats)).toBe(75)
  })

  test('aggregates across multiple days', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 2, incorrect: 2 },
      { date: d('2026-03-19'), correct: 6, incorrect: 2 },
    ]
    expect(getScorePercent(stats)).toBe(67)
  })
})

describe('serializeDayStats', () => {
  test('converts Date to date-only string', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 3, incorrect: 1 }]
    expect(serializeDayStats(stats)).toEqual([{ date: '2026-03-19', correct: 3, incorrect: 1 }])
  })

  test('does not include time component in serialized date', () => {
    const stats: DayStats[] = [{ date: d('2026-03-19'), correct: 1, incorrect: 0 }]
    const serialized = serializeDayStats(stats)
    expect(serialized[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})

describe('deserializeDayStats', () => {
  test('converts date string to Date', () => {
    const raw = [{ date: '2026-03-19', correct: 3, incorrect: 1 }]
    expect(deserializeDayStats(raw)).toEqual([{ date: d('2026-03-19'), correct: 3, incorrect: 1 }])
  })

  test('round-trips through serialize and deserialize', () => {
    const stats: DayStats[] = [
      { date: d('2026-03-18'), correct: 2, incorrect: 0 },
      { date: d('2026-03-19'), correct: 1, incorrect: 1 },
    ]
    expect(deserializeDayStats(serializeDayStats(stats))).toEqual(stats)
  })
})
