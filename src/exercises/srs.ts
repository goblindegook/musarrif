import type { PronounId } from '../paradigms/pronouns'
import type { RootType } from '../paradigms/roots'
import type { VerbTense } from '../paradigms/tense'
import type { VerbForm } from '../paradigms/verbs'
import type { Exercise } from './types'

export interface CardConstraints {
  rootType?: RootType
  form?: VerbForm
  tense?: VerbTense
  pronoun?: PronounId
}

export interface CardState {
  interval: number
  ef: number
  repetitions: number
  dueDate: string
}

export type SrsStore = Record<string, CardState>

export interface ParsedCardKey {
  kind: Exercise['kind']
  rootType: RootType
  form: VerbForm
  tense: VerbTense | undefined
  pronoun: PronounId | undefined
}

export function buildCardKey(
  kind: Exercise['kind'],
  rootType: RootType,
  form: VerbForm,
  tense?: VerbTense,
  pronoun?: PronounId,
): string {
  if (tense == null) return `${kind}:${rootType}:${form}`
  return `${kind}:${rootType}:${form}:${tense.join('-')}:${pronoun}`
}

export function parseCardKey(key: string): ParsedCardKey {
  const [kind, rootType, formStr, tenseStr, pronoun] = key.split(':')
  const form = Number(formStr) as VerbForm
  if (tenseStr == null) {
    return {
      kind: kind as Exercise['kind'],
      rootType: rootType as RootType,
      form,
      tense: undefined,
      pronoun: undefined,
    }
  }
  const parts = tenseStr.split('-')
  const tense = (parts.length === 2 ? [parts[0], parts[1]] : [parts[0], parts[1], parts[2]]) as VerbTense
  return { kind: kind as Exercise['kind'], rootType: rootType as RootType, form, tense, pronoun: pronoun as PronounId }
}

function utcAddDays(date: string, days: number): string {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function updateCardState(current: CardState | undefined, correct: boolean, today: string): CardState {
  const ef = current?.ef ?? 2.5
  const repetitions = current?.repetitions ?? 0
  const interval = current?.interval ?? 1

  let newInterval: number
  let newRepetitions: number

  if (!correct) {
    newInterval = 1
    newRepetitions = 0
  } else {
    if (repetitions === 0) newInterval = 1
    else if (repetitions === 1) newInterval = 6
    else newInterval = Math.round(interval * ef)
    newRepetitions = repetitions + 1
  }

  const grade = correct ? 4 : 1
  const newEf = Math.max(1.3, ef + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

  return { interval: newInterval, ef: newEf, repetitions: newRepetitions, dueDate: utcAddDays(today, newInterval) }
}

const MAX_WEIGHT = 10

export function cardSrsWeight(state: CardState | undefined, today: string): number {
  if (state == null) return MAX_WEIGHT
  if (state.dueDate <= today) return MAX_WEIGHT
  const daysUntilDue = (Date.parse(state.dueDate) - Date.parse(today)) / 86_400_000
  return 1 / daysUntilDue
}

export function weightedRandomSrs<T>(items: T[], weight: (item: T) => number): T {
  const total = items.reduce((sum, item) => sum + weight(item), 0)
  let r = Math.random() * total
  for (const item of items) {
    r -= weight(item)
    if (r <= 0) return item
  }
  return items[items.length - 1]
}

function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export function recordAnswer(
  store: SrsStore,
  cardKey: string | undefined,
  correct: boolean,
  today = utcToday(),
): SrsStore {
  if (cardKey == null) return store
  return { ...store, [cardKey]: updateCardState(store[cardKey], correct, today) }
}
