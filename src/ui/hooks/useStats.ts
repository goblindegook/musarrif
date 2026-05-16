import { useCallback, useEffect, useMemo } from 'preact/hooks'
import {
  addResult,
  type DailyActivity,
  deserializeDayStats,
  findStatsForDate,
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStatsWindow,
  getStreak,
  getStreakRecord,
  type SerializedDailyActivity,
  STREAK_DAILY_GOAL,
  serializeDayStats,
} from '../../exercises/stats'
import { useLocalStorage } from './useLocalStorage'

type Result = 'correct' | 'incorrect' | 'passed'

export interface Streak {
  current: number
  record: number
  remaining: number
  correct: number
  goal: number
}

export const useStats = () => {
  const [rawStats, setRawStats, refetch] = useLocalStorage<readonly SerializedDailyActivity[]>('exercise:daily', [])

  const stats = useMemo(() => deserializeDayStats(rawStats), [rawStats])

  const updateStats = useCallback(
    (updater: (current: readonly DailyActivity[]) => readonly DailyActivity[]) => {
      setRawStats((raw) => serializeDayStats(updater(deserializeDayStats(raw))))
      window.dispatchEvent(new CustomEvent('statschanged'))
    },
    [setRawStats],
  )

  useEffect(() => {
    const controller = new AbortController()
    window.addEventListener('statschanged', () => refetch(), { signal: controller.signal })
    return () => controller.abort()
  }, [refetch])

  const recordResult = useCallback(
    (result: Result) => updateStats((current) => addResult(current, result)),
    [updateStats],
  )

  const findDate = useCallback((date: Date) => findStatsForDate(stats, date), [stats])

  const getDailyWindow = useCallback((sinceDays: number) => getStatsWindow(stats, sinceDays), [stats])

  // FIXME: make lazy
  const accuracy = useMemo(() => {
    return { recent: getRecentAccuracyPercent(stats, 15), allTime: getAccuracyPercent(stats) }
  }, [stats])

  // FIXME: make lazy
  const streak = useMemo<Streak>(() => {
    const today = findDate(new Date())
    const correct = today?.correct ?? 0
    return {
      current: getStreak(stats),
      record: getStreakRecord(stats),
      goal: STREAK_DAILY_GOAL,
      correct,
      remaining: Math.max(0, STREAK_DAILY_GOAL - correct),
    }
  }, [stats])

  return { stats, findDate, getDailyWindow, streak, accuracy, recordResult } as const
}
