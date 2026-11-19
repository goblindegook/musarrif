import type { PronounId } from '../paradigms/pronouns.ts'
import type { VerbTense } from '../paradigms/tense.ts'
import type { TriliteralForm } from '../paradigms/verbs.ts'
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
import {
  answersCard,
  type CardConstraints,
  cardSrsWeight,
  getSrsRootType,
  isMasdarCard,
  isParticipleCard,
  parseCardKey,
  type SrsRootType,
  weightedRandomSrs,
} from './srs.ts'

export interface ExerciseFocus {
  form?: TriliteralForm | null
  tense?: VerbTense | null
  rootType?: SrsRootType | null
  pronoun?: PronounId | null
  nominal?: 'participles' | 'masdar' | null
}

export const EXERCISE_GENERATORS: readonly ExerciseGenerator<ExerciseKind>[] = [
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
  const card = parseCardKey(cardKey)
  return Object.keys(srsStore).some((key) => {
    const stored = parseCardKey(key)
    return (
      stored.type === card.type &&
      stored.category === card.category &&
      stored.rootType === card.rootType &&
      stored.form === card.form &&
      (stored.tense == null) === (card.tense == null)
    )
  })
}

export function nextExercise(
  profile: DimensionProfile,
  srsStore: SrsStore = {},
  session: ExerciseSession = { reviews: 0, lastNewAt: -3 },
  focus: ExerciseFocus = {},
): Exercise<ExerciseKind> {
  const available = EXERCISE_GENERATORS.filter((e) => e.minNominals == null || profile.nominals >= e.minNominals)
  const generatorsFor = (key: string): ExerciseGenerator<ExerciseKind>[] => {
    const card = parseCardKey(key)
    return available.filter((e) => answersCard(e, card))
  }
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const availableTenses = tensePool(profile.tenses)
  const availablePronouns = pronounPool(profile.pronouns)
  const today = utcToday()

  const activeFocus = Math.random() < 0.75 ? focus : {}

  const availableEntries = Object.entries(srsStore).filter(([key]) => {
    if (generatorsFor(key).length === 0) return false
    const card = parseCardKey(key)
    if (card.rootType != null && !availableRootTypes.includes(card.rootType)) return false
    if (card.form != null && !availableForms.includes(card.form)) return false
    if (card.tense != null && !availableTenses.includes(card.tense)) return false
    if (card.pronoun != null && !availablePronouns.includes(card.pronoun)) return false
    return true
  })

  const overdueEntries = availableEntries.filter(([, { dueDate }]) => dueDate <= today)
  const overdueCount = overdueEntries.length
  const backlogPolicy = getBacklogPolicy(overdueCount)
  const focusedDueKeys = overdueEntries
    .filter(([key]) => isDueCardInFocus(parseCardKey(key), activeFocus, backlogPolicy.freezeBreadth))
    .map(([key]) => key)
  const dueKeys =
    focusedDueKeys.length > 0 || !backlogPolicy.freezeBreadth ? focusedDueKeys : overdueEntries.map(([key]) => key)

  const availableCards = availableEntries.map(([key]) => parseCardKey(key))
  const focusedUncovered = uncoveredTriples(profile, srsStore, available).filter((t) => isTripleInFocus(t, activeFocus))
  const uncovered = backlogPolicy.freezeBreadth
    ? filterUncoveredForBacklog(focusedUncovered, availableCards)
    : focusedUncovered

  const shouldIntroduceNew =
    backlogPolicy.reviewGap != null &&
    uncovered.length > 0 &&
    (dueKeys.length === 0 || session.reviews - session.lastNewAt >= backlogPolicy.reviewGap)

  if (shouldIntroduceNew) {
    const { generator, rootType, form } = random(uncovered)
    return generator.generate(profile, { rootType, form })
  }

  if (dueKeys.length > 0) {
    const kindWeight = (key: string): number => generatorsFor(key).reduce((sum, e) => sum + exerciseWeight(e), 0)
    const srsWeight = (key: string): number => cardSrsWeight(srsStore[key], today) * kindWeight(key)
    const dueKey = weightedRandomSrs(dueKeys, srsWeight)
    const { rootType, form, tense, pronoun, category } = parseCardKey(dueKey)
    const generator = weightedRandomSrs(generatorsFor(dueKey), exerciseWeight)
    const pool = verbs.filter(
      (v) => (rootType == null || getSrsRootType(v.root) === rootType) && (form == null || v.form === form),
    )
    if (pool.length > 0) return generator.generate(profile, { rootType, form, tense, pronoun, category })
  }

  return weightedRandomSrs(available, exerciseWeight).generate(profile)
}

const exerciseWeight = (e: ExerciseGenerator) => e.weight ?? 1

function getBacklogPolicy(overdueCount: number): { freezeBreadth: boolean; reviewGap: number | null } {
  if (overdueCount > 20) return { freezeBreadth: true, reviewGap: null }
  if (overdueCount > 2) return { freezeBreadth: true, reviewGap: 8 }
  return { freezeBreadth: false, reviewGap: 3 }
}

function isInFocus(card: CardConstraints, focus: ExerciseFocus): boolean {
  if (focus.form != null && card.form !== focus.form) return false
  if (focus.tense != null && card.tense != null && card.tense !== focus.tense) return false
  if (focus.rootType != null && card.rootType !== focus.rootType) return false
  if (focus.pronoun != null && card.pronoun != null && card.pronoun !== focus.pronoun) return false
  if (focus.nominal === 'participles' && !isParticipleCard(card)) return false
  if (focus.nominal === 'masdar' && !isMasdarCard(card)) return false
  return true
}

function isTripleInFocus({ generator, rootType, form }: Triple, focus: ExerciseFocus): boolean {
  if (focus.nominal === 'participles' && generator.category !== 'participle') return false
  if (focus.nominal === 'masdar' && generator.category !== 'masdar') return false
  return isInFocus({ rootType, form }, { ...focus, nominal: null })
}

function isDueCardInFocus(card: CardConstraints, focus: ExerciseFocus, freezeBreadth: boolean): boolean {
  if (!isInFocus(card, focus)) return false
  if (!freezeBreadth) return true
  if (focus.tense && card.tense == null) return false
  if (focus.pronoun && card.pronoun == null) return false
  return true
}

interface Triple {
  generator: ExerciseGenerator<ExerciseKind>
  rootType: SrsRootType
  form: TriliteralForm
}

function filterUncoveredForBacklog(
  uncovered: readonly Triple[],
  coveredCards: readonly SrsCardIdentity[],
): readonly Triple[] {
  return uncovered.filter((triple) => coveredCards.some((card) => coversTriple(card, triple)))
}

function uncoveredTriples(
  profile: DimensionProfile,
  srsStore: SrsStore,
  available: readonly ExerciseGenerator<ExerciseKind>[],
): readonly Triple[] {
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const coveredCards = Object.keys(srsStore).map(parseCardKey)

  const result: Triple[] = []
  for (const generator of available) {
    for (const rootType of availableRootTypes) {
      for (const form of availableForms) {
        const triple = { generator, rootType, form }
        if (!coveredCards.some((card) => coversTriple(card, triple))) result.push(triple)
      }
    }
  }

  return result
}

function coversTriple(card: SrsCardIdentity, { generator, rootType, form }: Triple): boolean {
  return card.rootType === rootType && card.form === form && answersCard(generator, card)
}
