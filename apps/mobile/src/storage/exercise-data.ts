import type { DimensionStore } from '../../../../src/exercises/dimensions'
import { parseDimensionStore } from '../../../../src/exercises/dimensions'
import type { SrsStore } from '../../../../src/exercises/srs'
import { parseSrsStore } from '../../../../src/exercises/srs'
import type { DailyActivity } from '../../../../src/exercises/stats'
import { isDateOnly, isRecord, type UserDataSnapshot } from './schema'

const SRS_PREFIX = 'srs:'
const DAILY_PREFIX = 'exercise:daily:'

export function readSrsStore(values: UserDataSnapshot['values']): SrsStore {
  const raw: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) {
    if (key.startsWith(SRS_PREFIX) && value != null) raw[key.slice(SRS_PREFIX.length)] = value
  }
  return parseSrsStore(raw)
}

export function readDimensionStore(values: UserDataSnapshot['values']): DimensionStore {
  return parseDimensionStore(values['dimension:store'])
}

export function readDailyActivity(values: UserDataSnapshot['values']): DailyActivity[] {
  return Object.entries(values).flatMap(([key, value]) => {
    if (!key.startsWith(DAILY_PREFIX) || !isRecord(value)) return []
    const date = key.slice(DAILY_PREFIX.length)
    if (!isDateOnly(date)) return []
    return [
      {
        date: new Date(`${date}T00:00:00`),
        correct: count(value.correct),
        incorrect: count(value.incorrect),
        passed: count(value.passed),
      },
    ]
  })
}

function count(value: unknown): number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : 0
}
