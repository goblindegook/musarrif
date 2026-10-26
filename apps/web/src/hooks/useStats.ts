import { useCallback, useMemo } from 'preact/hooks'
import {
  addResult,
  findStatsForDate,
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStatsWindow,
  getStreak,
  getStreakRecord,
  parseTrackedExercises,
  type SerializedDailyActivity,
  type SerializedTrackedExercises,
  STREAK_DAILY_GOAL,
  type TrackedExercises,
} from '../../../../src/exercises/stats'
import { localDate } from '../../../../src/primitives/dates'
import { useLocalStorage } from './useLocalStorage'

type Result = 'correct' | 'incorrect' | 'passed'

export interface Streak {
  current: number
  record: number
  remaining: number
  correct: number
  goal: number
}

export function useStats() {
  const [rawStats, setRawStats] = useLocalStorage<readonly SerializedDailyActivity[]>('exercise:daily', [])

  const stats = useMemo(() => deserializeDayStats(rawStats), [rawStats])

  const recordResult = useCallback(
    (result: Result) => setRawStats((raw) => serializeDayStats(addResult(deserializeDayStats(raw), result))),
    [setRawStats],
  )

  const findDate = useCallback((date: Date) => findStatsForDate(stats, date), [stats])

  const getDailyWindow = useCallback((sinceDays: number) => getStatsWindow(stats, sinceDays), [stats])

  const accuracy = useMemo(() => {
    return { recent: getRecentAccuracyPercent(stats, 15), allTime: getAccuracyPercent(stats) }
  }, [stats])

  const streak = useMemo((): Streak => {
    const today = findDate(new Date())
    const correct = today?.correct ?? 0
    return {
      current: getStreak(stats),
      record: getStreakRecord(stats),
      goal: STREAK_DAILY_GOAL,
      correct,
      remaining: Math.max(0, STREAK_DAILY_GOAL - correct),
    }
  }, [stats, findDate])

  return { accuracy, stats, streak, findDate, getDailyWindow, recordResult }
}

export function serializeDayStats(stats: TrackedExercises): SerializedTrackedExercises {
  return stats.map((d) => ({ ...d, date: localDate(d.date) }))
}

export function deserializeDayStats(raw: readonly unknown[]): TrackedExercises {
  return parseTrackedExercises(raw).map((d) => {
    const [y, m, day] = d.date.split('-').map(Number)
    return { ...d, date: new Date(y, m - 1, day) }
  })
}
