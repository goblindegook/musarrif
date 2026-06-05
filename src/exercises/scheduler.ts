import type { PronounId } from '../paradigms/pronouns.ts'
import type { VerbTense } from '../paradigms/tense.ts'
import type { VerbForm } from '../paradigms/verbs.ts'
import { verbs } from '../paradigms/verbs.ts'
import { utcToday } from '../primitives/dates.ts'
import { type DimensionProfile, formPool, pronounPool, random, rootTypesPool, tensePool } from './dimensions.ts'
import type { Exercise, ExerciseGenerator, ExerciseKind } from './exercises.ts'
import { conjugationExercise } from './generators/conjugation.ts'
import { masdarFormExercise } from './generators/masdar-form.ts'
import { masdarRootExercise } from './generators/masdar-root.ts'
import { masdarVerbExercise } from './generators/masdar-verb.ts'
import { participleFormExercise } from './generators/participle-form.ts'
import { participleRootExercise } from './generators/participle-root.ts'
import { participleVerbExercise } from './generators/participle-verb.ts'
import { rootFormVerbExercise } from './generators/root-form-verb.ts'
import { verbFormExercise } from './generators/verb-form.ts'
import { verbMasdarExercise } from './generators/verb-masdar.ts'
import { verbParticipleExercise } from './generators/verb-participle.ts'
import { verbPronounExercise } from './generators/verb-pronoun.ts'
import { verbRootExercise } from './generators/verb-root.ts'
import { verbTenseExercise } from './generators/verb-tense.ts'
import type { SrsCardIdentity, SrsStore } from './srs.ts'
import { cardSrsWeight, getSrsRootType, parseCardKey, type SrsRootType, weightedRandomSrs } from './srs.ts'

export interface ExerciseFocus {
  form?: VerbForm | null
  tense?: VerbTense | null
  rootType?: SrsRootType | null
  pronoun?: PronounId | null
}

const EXERCISES: readonly ExerciseGenerator<ExerciseKind>[] = [
  conjugationExercise,
  masdarFormExercise,
  masdarRootExercise,
  masdarVerbExercise,
  participleFormExercise,
  rootFormVerbExercise,
  participleRootExercise,
  participleVerbExercise,
  verbFormExercise,
  verbMasdarExercise,
  verbParticipleExercise,
  verbPronounExercise,
  verbRootExercise,
  verbTenseExercise,
]

export interface ExerciseSession {
  reviews: number
  lastNewAt: number
}

export function isCoveredTriple(cardKey: string, srsStore: SrsStore): boolean {
  const parts = cardKey.split(':')
  const prefix = `${parts[0]}:${parts[1]}:${parts[2]}`
  return Object.keys(srsStore).some((k) => k === prefix || k.startsWith(`${prefix}:`))
}

export function nextExercise(
  profile: DimensionProfile,
  srsStore: SrsStore = {},
  session: ExerciseSession = { reviews: 0, lastNewAt: -3 },
  focus: ExerciseFocus = {},
): Exercise<ExerciseKind> {
  const available = EXERCISES.filter((e) => e.minNominals == null || profile.nominals >= e.minNominals)
  const availableGenerators = new Map(available.map((e) => [e.kind, e]))
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const availableTenses = tensePool(profile.tenses)
  const availablePronouns = pronounPool(profile.pronouns)
  const today = utcToday()

  const activeFocus = Math.random() < 0.75 ? focus : {}

  const availableEntries = Object.entries(srsStore).filter(([key]) => {
    const card = parseCardKey(key)
    if (!availableGenerators.has(card.kind)) return false
    if (card.rootType != null && !availableRootTypes.includes(card.rootType)) return false
    if (card.form != null && !availableForms.includes(card.form)) return false
    if (card.tense != null && !availableTenses.includes(card.tense)) return false
    if (card.pronoun != null && !availablePronouns.includes(card.pronoun)) return false
    return true
  })

  const overdueEntries = availableEntries.filter(([, { dueDate }]) => dueDate <= today)
  const overdueCount = overdueEntries.length
  const backlogPolicy = getBacklogPolicy(overdueCount)
  const focusedDueKeys = overdueEntries.filter(([key]) => isInFocus(parseCardKey(key), activeFocus)).map(([key]) => key)
  const dueKeys =
    focusedDueKeys.length > 0 || !backlogPolicy.freezeBreadth ? focusedDueKeys : overdueEntries.map(([key]) => key)

  const availableCards = availableEntries.map(([key]) => parseCardKey(key))
  const focusedUncovered = uncoveredTriples(profile, srsStore, available).filter((t) => isInFocus(t, activeFocus))
  const uncovered = backlogPolicy.freezeBreadth
    ? filterUncoveredForBacklog(focusedUncovered, availableCards)
    : focusedUncovered

  const shouldIntroduceNew =
    backlogPolicy.reviewGap != null &&
    uncovered.length > 0 &&
    (dueKeys.length === 0 || session.reviews - session.lastNewAt >= backlogPolicy.reviewGap)

  if (shouldIntroduceNew) {
    const { kind, rootType, form } = random(uncovered)
    const generator = availableGenerators.get(kind)
    if (generator != null) return generator.generate(profile, { rootType, form })
  }

  if (dueKeys.length > 0) {
    const kindWeight = (key: string): number => availableGenerators.get(parseCardKey(key).kind)?.weight ?? 1
    const srsWeight = (key: string): number => cardSrsWeight(srsStore[key], today) * kindWeight(key)
    const { kind, rootType, form, tense, pronoun } = parseCardKey(weightedRandomSrs(dueKeys, srsWeight))
    const generator = availableGenerators.get(kind)
    if (generator == null) return weightedRandomSrs(available, exerciseWeight).generate(profile)
    const pool = verbs.filter(
      (v) => (rootType == null || getSrsRootType(v.root) === rootType) && (form == null || v.form === form),
    )
    if (pool.length > 0) return generator.generate(profile, { rootType, form, tense, pronoun })
  }

  return weightedRandomSrs(available, exerciseWeight).generate(profile)
}

const exerciseWeight = (e: ExerciseGenerator) => e.weight ?? 1

function getBacklogPolicy(overdueCount: number): { freezeBreadth: boolean; reviewGap: number | null } {
  if (overdueCount > 20) return { freezeBreadth: true, reviewGap: null }
  if (overdueCount > 2) return { freezeBreadth: true, reviewGap: 8 }
  return { freezeBreadth: false, reviewGap: 3 }
}

function isInFocus(card: Omit<SrsCardIdentity, 'key'>, focus: ExerciseFocus): boolean {
  if (focus.form != null && card.form !== focus.form) return false
  if (focus.tense != null && card.tense != null && card.tense !== focus.tense) return false
  if (focus.rootType != null && card.rootType !== focus.rootType) return false
  if (focus.pronoun != null && card.pronoun != null && card.pronoun !== focus.pronoun) return false
  return true
}

interface Triple {
  kind: ExerciseKind
  rootType: SrsRootType
  form: VerbForm
}

function filterUncoveredForBacklog(
  uncovered: readonly Triple[],
  coveredCards: readonly SrsCardIdentity[],
): readonly Triple[] {
  const coveredTriples = new Set(coveredCards.map(({ kind, rootType, form }) => `${kind}:${rootType}:${form}`))
  return uncovered.filter(({ kind, rootType, form }) => coveredTriples.has(`${kind}:${rootType}:${form}`))
}

function uncoveredTriples(
  profile: DimensionProfile,
  srsStore: SrsStore,
  available: readonly ExerciseGenerator<ExerciseKind>[],
): readonly Triple[] {
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const coveredCards = Object.keys(srsStore)

  const result: Triple[] = []
  for (const generator of available) {
    for (const rootType of availableRootTypes) {
      for (const form of availableForms) {
        const prefix = `${generator.kind}:${rootType}:${form}`
        if (!coveredCards.some((k) => k === prefix || k.startsWith(`${prefix}:`))) {
          result.push({ kind: generator.kind, rootType, form })
        }
      }
    }
  }

  return result
}
