import { useCallback, useEffect, useMemo } from 'preact/hooks'
import * as v from 'valibot'
import {
  addResult,
  type DailyActivity,
  findStatsForDate,
  getAccuracyPercent,
  getRecentAccuracyPercent,
  getStatsWindow,
  getStreak,
  getStreakRecord,
  STREAK_DAILY_GOAL,
  type TrackedExercises,
} from '../../exercises/stats'
import { localDate } from '../../primitives/dates'
import { useLocalStorage } from './useLocalStorage'

const NonNegativeNumber = v.fallback(v.pipe(v.number(), v.integer(), v.minValue(0)), 0)

const SerializedDailyActivity = v.object({
  date: v.pipe(v.string(), v.isoDate()),
  correct: NonNegativeNumber,
  incorrect: NonNegativeNumber,
  passed: NonNegativeNumber,
})

export type SerializedDailyActivity = v.InferOutput<typeof SerializedDailyActivity>

export const SerializedTrackedExercises = v.pipe(
  v.fallback(v.array(v.fallback(v.union([SerializedDailyActivity, v.null()]), null)), []),
  v.transform((entries) => entries.filter((entry): entry is SerializedDailyActivity => entry != null)),
  v.readonly(),
)

export type SerializedTrackedExercises = v.InferOutput<typeof SerializedTrackedExercises>

type Result = 'correct' | 'incorrect' | 'passed'

export interface Streak {
  current: number
  record: number
  remaining: number
  correct: number
  goal: number
}

export function useStats() {
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
  }, [stats])

  return { stats, findDate, getDailyWindow, streak, accuracy, recordResult }
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

export function parseTrackedExercises(data: unknown): SerializedTrackedExercises {
  return v.parse(SerializedTrackedExercises, data)
}
