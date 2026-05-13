import { memoize } from '@pacote/memoize'
import * as v from 'valibot'
import { isHamzatedLetter, isWeakLetter } from '../paradigms/letters'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import { getAvailableParadigms, type VerbForm, verbs } from '../paradigms/verbs'
import { utcToday } from '../primitives/dates'
import { formPool, pronounPool, rootTypesPool, tensePool } from './dimensions'
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

export interface SrsCardIdentity {
  key: string
  kind: ExerciseKind
  rootType: SrsRootType
  form: VerbForm
  tense?: VerbTense
  pronoun?: PronounId
}

export type SrsCard = SrsCardIdentity & CardState

const VERB_EXERCISES = new Set<ExerciseKind>(['conjugation', 'verbForm', 'verbPronoun', 'verbRoot', 'verbTense'])

const PARTICIPLE_EXERCISES = new Set<ExerciseKind>([
  'participleForm',
  'participleRoot',
  'participleVerb',
  'verbParticiple',
])

const MASDAR_EXERCISES = new Set<ExerciseKind>(['masdarForm', 'masdarRoot', 'masdarVerb', 'verbMasdar'])

export function getSrsRootType(root: string): SrsRootType {
  const [c1, c2, c3] = Array.from(root)
  if (isWeakLetter(c3)) return 'defective'
  if (isWeakLetter(c2)) return 'hollow'
  if (isWeakLetter(c1)) return 'assimilated'
  if ([c1, c2, c3].some(isHamzatedLetter)) return 'hamzated'
  if (c2 === c3) return 'doubled'
  return 'sound'
}

export function buildCardKey(kind: ExerciseKind, rootType: SrsRootType, form: VerbForm): string
export function buildCardKey(
  kind: ExerciseKind,
  rootType: SrsRootType,
  form: VerbForm,
  tense: VerbTense,
  pronoun: PronounId,
): string
export function buildCardKey(
  kind: ExerciseKind,
  rootType: SrsRootType,
  form: VerbForm,
  tense?: VerbTense,
  pronoun?: PronounId,
): string {
  return tense == null ? `${kind}:${rootType}:${form}` : `${kind}:${rootType}:${form}:${tense}:${pronoun}`
}

export function isVerbCard(card: SrsCardIdentity): boolean {
  return card.tense != null
}

export function isParticipleCard(card: SrsCardIdentity): boolean {
  return PARTICIPLE_EXERCISES.has(card.kind)
}

export function isMasdarCard(card: SrsCardIdentity): boolean {
  return MASDAR_EXERCISES.has(card.kind)
}

export function isNominalCard(card: SrsCardIdentity): boolean {
  return card.tense == null
}

export function parseCardKey(key: string): SrsCardIdentity {
  const [kind, rootType, formStr, tense, pronoun] = key.split(':')

  if (tense == null) {
    return {
      key,
      kind: kind as ExerciseKind,
      rootType: rootType as SrsRootType,
      form: Number(formStr) as VerbForm,
      tense: undefined,
      pronoun: undefined,
    }
  }

  return {
    key,
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

const CardState = v.object({
  interval: v.pipe(v.number(), v.finite(), v.gtValue(0)),
  ef: v.pipe(v.number(), v.finite(), v.minValue(1.3)),
  repetitions: v.pipe(v.number(), v.integer(), v.minValue(0)),
  dueDate: v.pipe(v.string(), v.isoDate()),
})

export const SrsStore = v.fallback(
  v.pipe(
    v.record(v.string(), v.fallback(v.union([CardState, v.null()]), null)),
    v.transform((store) => {
      const validCards: SrsStore = {}
      for (const [key, state] of Object.entries(store)) {
        if (state != null && v.is(v.string(), key)) validCards[key] = state
      }
      return validCards
    }),
  ),
  {},
)

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

export function normalizeSrsStore(store: SrsStore): SrsStore {
  let normalized = store
  for (const [key, state] of Object.entries(store)) {
    const interval = Math.max(1, Math.round(state.interval))
    const nextState = interval === state.interval ? state : { ...state, interval }
    if (nextState === state) continue
    if (normalized === store) normalized = { ...store }
    normalized[key] = nextState
  }
  return normalized
}

export function parseSrsStore(raw: unknown): SrsStore {
  return normalizeSrsStore(v.parse(SrsStore, raw))
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

export function getSrsCards(srsStore: SrsStore): readonly SrsCard[] {
  return Object.entries(srsStore).map(([key, state]) => ({
    ...parseCardKey(key),
    ...state,
    key,
  }))
}

function pronounSpace(tense: VerbTense, impersonalPassive: boolean): readonly PronounId[] {
  const pronouns = pronounPool(3)
  if (tense === 'active.imperative') {
    const imperativePool = pronouns.filter((pronoun) => pronoun.startsWith('2'))
    return imperativePool.length > 0 ? imperativePool : ['2ms']
  }
  if (impersonalPassive && tense.startsWith('passive')) return ['3ms']
  return pronouns
}

export const cardSpace = memoize(
  () => 'constant',
  () => {
    const allForms = new Set(formPool(9))
    const allRootTypes = new Set(rootTypesPool(5))
    const allTenses = tensePool(4)
    const unique = new Map<string, SrsCardIdentity>()

    for (const verb of verbs) {
      if (verb.root.length !== 3) continue
      const rootType = getSrsRootType(verb.root)
      if (!allForms.has(verb.form) || !allRootTypes.has(rootType)) continue
      const paradigms = new Set(getAvailableParadigms(verb))
      const availableVerbTenses = allTenses.filter((tense) => paradigms.has(tense))

      for (const kind of VERB_EXERCISES) {
        for (const tense of availableVerbTenses) {
          for (const pronoun of pronounSpace(tense, verb.passiveVoice === 'impersonal')) {
            const key = buildCardKey(kind, rootType, verb.form, tense, pronoun)
            unique.set(key, { key, kind, rootType, form: verb.form, tense, pronoun })
          }
        }
      }

      for (const kind of [...PARTICIPLE_EXERCISES, ...MASDAR_EXERCISES]) {
        const key = buildCardKey(kind, rootType, verb.form)
        unique.set(key, { key, kind, rootType, form: verb.form })
      }
    }

    return [...unique.values()]
  },
)
