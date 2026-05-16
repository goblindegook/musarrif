import * as v from 'valibot'

const NonNegativeNumber = v.fallback(v.pipe(v.number(), v.integer(), v.minValue(0)), 0)

const SerializedDayStats = v.object({
  date: v.pipe(v.string(), v.isoDate()),
  correct: NonNegativeNumber,
  incorrect: NonNegativeNumber,
  passed: NonNegativeNumber,
})

export const TrackedExercises = v.pipe(
  v.fallback(v.array(v.fallback(v.union([SerializedDayStats, v.null()]), null)), []),
  v.transform((entries) => entries.filter((entry): entry is SerializedDailyActivity => entry != null)),
)

export type TrackedExercises = readonly DailyActivity[]

export interface DailyActivity {
  date: Date
  correct: number
  incorrect: number
  passed: number
}

// FIXME: Serialized type for localStorage, use Valibot to handle date parsing and serialization
export interface SerializedDailyActivity {
  date: string
  correct: number
  incorrect: number
  passed: number
}

type SerializedTrackedExercises = readonly SerializedDailyActivity[]

export const STREAK_DAILY_GOAL = 10

type Result = 'correct' | 'incorrect' | 'passed'

export function addResult(stats: TrackedExercises, result: Result, date = todayDate()): TrackedExercises {
  if (findStatsForDate(stats, date)) {
    const dateString = date.toDateString()
    return stats.map((s) => (s.date.toDateString() === dateString ? { ...s, [result]: (s[result] ?? 0) + 1 } : s))
  }
  return [...stats, { date: date, correct: 0, incorrect: 0, passed: 0, [result]: 1 }]
}

export function getStreak(stats: TrackedExercises, today = todayDate()): number {
  const todayStr = dateKey(today)
  const extendedDates = new Set(stats.filter((d) => d.correct >= STREAK_DAILY_GOAL).map((d) => dateKey(d.date)))

  // Streak can start from today or yesterday
  const startDate = extendedDates.has(todayStr) ? todayStr : offsetDate(todayStr, -1)
  if (!extendedDates.has(startDate)) return 0

  let streak = 0
  let current = startDate
  while (extendedDates.has(current)) {
    streak++
    current = offsetDate(current, -1)
  }
  return streak
}

export function getAccuracyPercent(stats: TrackedExercises): number {
  const total = stats.reduce((s, d) => s + d.correct + d.incorrect, 0)
  if (total === 0) return 0
  const correct = stats.reduce((s, d) => s + d.correct, 0)
  return Math.round((correct / total) * 100)
}

export function getRecentAccuracyPercent(stats: TrackedExercises, days: number, date?: Date): number {
  return getAccuracyPercent(getStatsWindow(stats, days, date))
}

export function getStreakRecord(stats: TrackedExercises): number {
  const activeDates = stats
    .filter((d) => d.correct >= STREAK_DAILY_GOAL)
    .map((d) => dateKey(d.date))
    .sort()

  let currentRun = 0
  let max = 0
  let prev: string | null = null

  for (const date of activeDates) {
    currentRun = prev !== null && date === offsetDate(prev, 1) ? currentRun + 1 : 1
    max = Math.max(max, currentRun)
    prev = date
  }

  return max
}

export function findStatsForDate(stats: readonly DailyActivity[], date: Date): DailyActivity | undefined {
  const dateString = date.toDateString()
  return stats.find((s) => s.date.toDateString() === dateString)
}

export function getStatsWindow(stats: readonly DailyActivity[], sinceDays: number, end = todayDate()): DailyActivity[] {
  const start = new Date(end)
  start.setDate(end.getDate() - sinceDays + 1)
  const map = new Map<string, DailyActivity>()

  for (const entry of stats) if (entry.date >= start && entry.date <= end) map.set(entry.date.toDateString(), entry)

  const result: DailyActivity[] = []

  for (let i = 0; i < sinceDays; i++) {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    result.push(map.get(date.toDateString()) ?? { date, correct: 0, incorrect: 0, passed: 0 })
  }

  return result
}

// TODO: move to useStats
export function serializeDayStats(stats: TrackedExercises): SerializedTrackedExercises {
  return stats.map((d) => ({ ...d, date: dateKey(d.date) }))
}

// TODO: Move to useStats
export function deserializeDayStats(raw: readonly unknown[]): TrackedExercises {
  return parseTrackedExercises(raw).map((d) => {
    const [y, m, day] = d.date.split('-').map(Number)
    return { ...d, date: new Date(y, m - 1, day) }
  })
}

function dateKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function todayDate(): Date {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function offsetDate(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

// TODO: move to useStats
export function parseTrackedExercises(data: unknown): SerializedTrackedExercises {
  return v.parse(TrackedExercises, data)
}
