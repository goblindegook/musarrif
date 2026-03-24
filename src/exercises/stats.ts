export type DayStats = { date: Date; correct: number; incorrect: number; passed: number }
export type SerializedDayStats = { date: string; correct: number; incorrect: number; passed?: number }

export function addResult(stats: DayStats[], correct: boolean, date?: Date): DayStats[] {
  const d = date ?? todayDate()
  const key = dateKey(d)
  const existing = stats.find((s) => dateKey(s.date) === key)
  if (existing) {
    return stats.map((s) =>
      dateKey(s.date) === key
        ? {
            ...s,
            correct: s.correct + (correct ? 1 : 0),
            incorrect: s.incorrect + (correct ? 0 : 1),
            passed: s.passed ?? 0,
          }
        : s,
    )
  }
  return [...stats, { date: d, correct: correct ? 1 : 0, incorrect: correct ? 0 : 1, passed: 0 }]
}

export function addPass(stats: DayStats[], date?: Date): DayStats[] {
  const d = date ?? todayDate()
  const key = dateKey(d)
  const existing = stats.find((s) => dateKey(s.date) === key)
  if (existing) {
    return stats.map((s) => (dateKey(s.date) === key ? { ...s, passed: s.passed + 1 } : s))
  }
  return [...stats, { date: d, correct: 0, incorrect: 0, passed: 1 }]
}

export function getStreak(stats: DayStats[], today?: Date): number {
  const todayStr = dateKey(today ?? todayDate())
  const activeDates = new Set(stats.filter((d) => d.correct + d.incorrect > 0).map((d) => dateKey(d.date)))

  // Streak can start from today or yesterday
  const startDate = activeDates.has(todayStr) ? todayStr : offsetDate(todayStr, -1)
  if (!activeDates.has(startDate)) return 0

  let streak = 0
  let current = startDate
  while (activeDates.has(current)) {
    streak++
    current = offsetDate(current, -1)
  }
  return streak
}

export function getScorePercent(stats: DayStats[]): number {
  const total = stats.reduce((s, d) => s + d.correct + d.incorrect, 0)
  if (total === 0) return 0
  const correct = stats.reduce((s, d) => s + d.correct, 0)
  return Math.round((correct / total) * 100)
}

export function getRecentScorePercent(stats: DayStats[], days: number, today?: Date): number {
  const todayStr = dateKey(today ?? todayDate())
  const windowStart = offsetDate(todayStr, -(days - 1))
  const filtered = stats.filter((s) => {
    const key = dateKey(s.date)
    return key >= windowStart && key <= todayStr
  })
  return getScorePercent(filtered)
}

export function getStreakRecord(stats: DayStats[]): number {
  const activeDates = stats
    .filter((d) => d.correct + d.incorrect > 0)
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

export function serializeDayStats(stats: DayStats[]): SerializedDayStats[] {
  return stats.map((d) => ({ ...d, date: dateKey(d.date) }))
}

export function deserializeDayStats(raw: SerializedDayStats[]): DayStats[] {
  return raw.map((d) => ({ ...d, date: new Date(d.date), passed: d.passed ?? 0 }))
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function todayDate(): Date {
  return new Date(new Date().toISOString().slice(0, 10))
}

function offsetDate(dateStr: string, days: number): string {
  const d = new Date(dateStr)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}
