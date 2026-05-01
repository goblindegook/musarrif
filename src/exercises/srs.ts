import { isHamzatedLetter, isWeakLetter } from '../paradigms/letters'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { VerbForm } from '../paradigms/verbs'
import type { ExerciseKind } from './exercises'

export type AnswerResult = 'correct' | 'wrong' | 'pass'
export type SrsRootType = 'sound' | 'doubled' | 'hamzated' | 'assimilated' | 'hollow' | 'defective'

export interface CardConstraints {
  rootType?: SrsRootType
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
  kind: ExerciseKind
  rootType: SrsRootType
  form: VerbForm
  tense: VerbTense | undefined
  pronoun: PronounId | undefined
}

export function getSrsRootType(root: string): SrsRootType {
  const [c1, c2, c3] = Array.from(root)
  if (isWeakLetter(c3)) return 'defective'
  if (isWeakLetter(c2)) return 'hollow'
  if (isWeakLetter(c1)) return 'assimilated'
  if ([c1, c2, c3].some(isHamzatedLetter)) return 'hamzated'
  if (c2 === c3) return 'doubled'
  return 'sound'
}

export function buildCardKey(
  kind: ExerciseKind,
  rootType: SrsRootType,
  form: VerbForm,
  tense?: VerbTense,
  pronoun?: PronounId,
): string {
  if (tense == null) return `${kind}:${rootType}:${form}`
  return `${kind}:${rootType}:${form}:${tense}:${pronoun}`
}

export function parseCardKey(key: string): ParsedCardKey {
  const [kind, rootType, formStr, tense, pronoun] = key.split(':')

  if (tense == null) {
    return {
      kind: kind as ExerciseKind,
      rootType: rootType as SrsRootType,
      form: Number(formStr) as VerbForm,
      tense: undefined,
      pronoun: undefined,
    }
  }

  return {
    kind: kind as ExerciseKind,
    rootType: rootType as SrsRootType,
    form: Number(formStr) as VerbForm,
    tense: tense as VerbTense,
    pronoun: pronoun as PronounId,
  }
}

function utcAddDays(date: string, days: number): string {
  const d = new Date(date)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

export function updateCardState(current: CardState | undefined, result: AnswerResult, today: string): CardState {
  const ef = current?.ef ?? 2.5
  const repetitions = current?.repetitions ?? 0
  const interval = current?.interval ?? 1

  let newInterval: number
  let newRepetitions: number

  if (result === 'pass') {
    newInterval = Math.max(1, Math.round(interval / 2))
    newRepetitions = repetitions
  } else if (result === 'wrong') {
    newInterval = 1
    newRepetitions = 0
  } else {
    if (repetitions === 0) newInterval = 1
    else if (repetitions === 1) newInterval = 6
    else newInterval = Math.round(interval * ef)
    newRepetitions = repetitions + 1
  }

  const grade = result === 'correct' ? 4 : result === 'wrong' ? 1 : 3
  const newEf = result === 'pass' ? ef : Math.max(1.3, ef + 0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))

  return { interval: newInterval, ef: newEf, repetitions: newRepetitions, dueDate: utcAddDays(today, newInterval) }
}

const MAX_WEIGHT = 10

export function cardSrsWeight(state: CardState | undefined, today: string): number {
  if (state == null) return MAX_WEIGHT
  if (state.dueDate < today) {
    const daysOverdue = (Date.parse(today) - Date.parse(state.dueDate)) / 86_400_000
    return MAX_WEIGHT + daysOverdue
  }
  if (state.dueDate === today) return MAX_WEIGHT
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

function sanitizeCardState(state: CardState): CardState {
  const interval = Math.max(1, Math.round(state.interval))
  return interval === state.interval ? state : { ...state, interval }
}

export function sanitizeSrsStore(store: SrsStore, _today = utcToday()): SrsStore {
  let sanitized = store
  for (const [key, state] of Object.entries(store)) {
    const nextState = sanitizeCardState(state)
    if (nextState === state) continue
    if (sanitized === store) sanitized = { ...store }
    sanitized[key] = nextState
  }
  return sanitized
}

function isCardState(raw: unknown): raw is CardState {
  if (raw == null || typeof raw !== 'object') return false
  const state = raw as Partial<CardState>
  return (
    Number.isFinite(state.interval) &&
    Number(state.interval) > 0 &&
    Number.isFinite(state.ef) &&
    Number(state.ef) >= 1.3 &&
    Number.isInteger(state.repetitions) &&
    Number(state.repetitions) >= 0 &&
    /^\d{4}-\d{2}-\d{2}$/.test(String(state.dueDate))
  )
}

export function sanitizeRawSrsStore(raw: unknown, today = utcToday()): SrsStore {
  if (raw == null || typeof raw !== 'object') return {}
  const imported: SrsStore = {}
  for (const [key, value] of Object.entries(raw)) {
    if (typeof key !== 'string' || key.length === 0 || !isCardState(value)) continue
    imported[key] = value
  }
  return sanitizeSrsStore(imported, today)
}

export function recordAnswer(
  store: SrsStore,
  cardKey: string | undefined,
  result: AnswerResult,
  today = utcToday(),
): SrsStore {
  if (cardKey == null) return store
  return { ...store, [cardKey]: updateCardState(store[cardKey], result, today) }
}
