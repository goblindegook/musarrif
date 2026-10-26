import { type CardState, type SrsStore, utcAddDays } from './srs'

interface DayCounts {
  readonly date: string
  readonly correct: number
  readonly incorrect: number
  readonly passed: number
}

interface ExerciseData<Day extends DayCounts, Dimensions> {
  readonly srs: SrsStore
  readonly dimensions: Dimensions
  readonly trackedExercises: readonly Day[]
}

/** On every tie the existing side wins, so merging the same file twice changes nothing. */
export function mergeExerciseData<Day extends DayCounts, Dimensions>(
  local: ExerciseData<Day, Dimensions>,
  incoming: ExerciseData<Day, Dimensions>,
): ExerciseData<Day, Dimensions> & { trackedExercises: Day[] } {
  const srs = { ...incoming.srs }
  for (const [key, card] of Object.entries(local.srs)) {
    const other = srs[key]
    if (other == null || reviewDay(card) >= reviewDay(other)) srs[key] = card
  }

  const days = new Map(incoming.trackedExercises.map((day) => [day.date, day]))
  for (const day of local.trackedExercises) {
    const other = days.get(day.date)
    if (other == null || answered(day) >= answered(other)) days.set(day.date, day)
  }

  return {
    srs,
    // Every answer updates a card and the dimension windows together, so the latest review dates both.
    dimensions: latestReview(incoming.srs) > latestReview(local.srs) ? incoming.dimensions : local.dimensions,
    trackedExercises: [...days.values()].sort((left, right) => left.date.localeCompare(right.date)),
  }
}

// utcAddDays drops the fraction when it schedules a card, so this recovers the review day exactly.
function reviewDay(card: CardState): string {
  return utcAddDays(card.dueDate, -Math.trunc(card.interval))
}

function latestReview(srs: SrsStore): string {
  return Object.values(srs).map(reviewDay).sort().at(-1) ?? ''
}

function answered(day: DayCounts): number {
  return day.correct + day.incorrect + day.passed
}
