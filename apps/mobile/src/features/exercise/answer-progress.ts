import { getDimensionChanges, promoteDimensions, recordDimensionAnswer } from '../../../../../src/exercises/dimensions'
import { isCoveredTriple } from '../../../../../src/exercises/scheduler'
import { recordAnswer } from '../../../../../src/exercises/srs'
import { addResult, findStatsForDate, STREAK_DAILY_GOAL } from '../../../../../src/exercises/stats'
import { localDate, utcToday } from '../../../../../src/primitives/dates'
import { readDailyActivity, readDimensionStore, readSrsStore } from '../../storage/exercise-data'
import { adaptiveDimensionKey, dailyActivityKey, srsCardKey } from '../../storage/keys'
import type { UserDataKey, UserDataValue } from '../../storage/schema'
import type { UserDataValues } from '../../storage/UserDataStore'
import type { PersistedExerciseAnswer } from './ExerciseSession'

type DimensionChanges = ReturnType<typeof getDimensionChanges>

interface AnswerProgress {
  readonly writes: readonly (readonly [UserDataKey, UserDataValue])[]
  readonly dimensionChanges: DimensionChanges
  readonly streakExtended: boolean
  /** The card was already known before this answer, so it counts as a review rather than new material. */
  readonly wasCovered: boolean
  readonly skipped: boolean
}

export function recordExerciseAnswer(
  values: UserDataValues,
  answer: PersistedExerciseAnswer,
  now: Date,
): AnswerProgress | undefined {
  const srs = readSrsStore(values)
  const dimensions = readDimensionStore(values)
  const skipped = answer.result === 'pass'
  const correct = answer.result !== 'wrong'

  const nextSrs = recordAnswer(srs, answer.cardKey, answer.result, utcToday(), answer.responseTimeMs)
  const nextDimensions = skipped
    ? dimensions
    : promoteDimensions(recordDimensionAnswer(dimensions, answer.dimensions, correct), correct)
  const nextActivity = addResult(readDailyActivity(values), skipped ? 'passed' : correct ? 'correct' : 'incorrect', now)
  const daily = findStatsForDate(nextActivity, now)
  if (!daily) return undefined

  const dailyDate = localDate(daily.date)
  const writes: (readonly [UserDataKey, UserDataValue])[] = [
    [srsCardKey(answer.cardKey), nextSrs[answer.cardKey] as unknown as UserDataValue],
  ]
  if (!skipped) writes.push([adaptiveDimensionKey('store'), nextDimensions as unknown as UserDataValue])
  writes.push([
    dailyActivityKey(dailyDate),
    { date: dailyDate, correct: daily.correct, incorrect: daily.incorrect, passed: daily.passed },
  ])

  return {
    writes,
    dimensionChanges: skipped ? [] : getDimensionChanges(dimensions.profile, nextDimensions.profile),
    streakExtended: correct && !skipped && daily.correct === STREAK_DAILY_GOAL,
    wasCovered: isCoveredTriple(answer.cardKey, srs),
    skipped,
  }
}
