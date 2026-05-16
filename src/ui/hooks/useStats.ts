import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import {
  addPass,
  addResult,
  type DailyActivity,
  deserializeDayStats,
  findStatsForDate,
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStreak,
  getStreakGoalProgress,
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
  progress: number
  goal: number
  extended: boolean
}

export const useStats = () => {
  const [rawStats, setRawStats, refetch] = useLocalStorage<readonly SerializedDailyActivity[]>('exercise:daily', [])
  const [streakExtended, setStreakExtended] = useState(false)

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
    (result: Result) => {
      if (result === 'passed') updateStats((current) => addPass(current))
      else updateStats((current) => addResult(current, result === 'correct'))

      if (result === 'correct' && getStreakGoalProgress(stats).remaining === 1) setStreakExtended(true)
    },
    [updateStats],
  )

  const findDate = useCallback((date: Date) => findStatsForDate(stats, date), [stats])

  const getDailyWindow = useCallback(
    (days: number) => {
      const map = new Map(stats.map((d) => [d.date.toDateString(), d]))
      const result: DailyActivity[] = []
      const now = new Date()
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today)
        date.setDate(today.getDate() - i)
        result.push(map.get(date.toDateString()) ?? { date, correct: 0, incorrect: 0, passed: 0 })
      }
      return result
    },
    [stats],
  )

  const accuracy = useMemo(() => {
    return { recent: getRecentAccuracyPercent(stats, 15), allTime: getAccuracyPercent(stats) }
  }, [stats])

  const streak = useMemo<Streak>(() => {
    const today = findDate(new Date())
    const correct = today?.correct ?? 0
    return {
      current: getStreak(stats),
      record: getStreakRecord(stats),
      remaining: Math.max(0, STREAK_DAILY_GOAL - correct),
      progress: Math.min(correct, STREAK_DAILY_GOAL),
      goal: STREAK_DAILY_GOAL,
      extended: streakExtended,
    }
  }, [stats, streakExtended])

  return { stats, findDate, getDailyWindow, streak, accuracy, recordResult } as const
}
