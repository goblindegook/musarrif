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
import type { SrsStore } from './srs.ts'
import { cardSrsWeight, getSrsRootType, parseCardKey, type SrsRootType, weightedRandomSrs } from './srs.ts'

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

export interface ExerciseFocus {
  form?: VerbForm | null
}

export function isCoveredTriple(cardKey: string, srsStore: SrsStore): boolean {
  const parts = cardKey.split(':')
  const prefix = `${parts[0]}:${parts[1]}:${parts[2]}`
  return Object.keys(srsStore).some((k) => k === prefix || k.startsWith(`${prefix}:`))
}

function uncoveredTriples(
  profile: DimensionProfile,
  srsStore: SrsStore,
  available: readonly ExerciseGenerator<ExerciseKind>[],
): Array<{ kind: ExerciseKind; rootType: SrsRootType; form: VerbForm }> {
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const coveredCards = Object.keys(srsStore)

  const result: Array<{ kind: ExerciseKind; rootType: SrsRootType; form: VerbForm }> = []
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

export function nextExercise(
  profile: DimensionProfile,
  srsStore: SrsStore = {},
  session: ExerciseSession = { reviews: 0, lastNewAt: -3 },
  focus: ExerciseFocus = {},
): Exercise<ExerciseKind> {
  const available = EXERCISES.filter((e) => e.minNominals == null || profile.nominals >= e.minNominals)
  const availableKinds = new Set(available.map((e) => e.kind))
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const availableTenses = tensePool(profile.tenses)
  const availablePronouns = pronounPool(profile.pronouns)
  const today = utcToday()

  const activeFocusForm = Math.random() < 0.75 ? focus.form : undefined

  const dueKeys = Object.entries(srsStore)
    .filter(([key, { dueDate }]) => {
      if (dueDate > today) return false
      const { kind, rootType, form, tense, pronoun } = parseCardKey(key)
      if (!availableKinds.has(kind)) return false
      if (rootType != null && !availableRootTypes.includes(rootType)) return false
      if (form != null && !availableForms.includes(form)) return false
      if (tense != null && !availableTenses.includes(tense)) return false
      if (pronoun != null && !availablePronouns.includes(pronoun)) return false
      // FIXME: Why filter when we can pass the active form focus in the generator constraints object?
      if (activeFocusForm != null && form !== activeFocusForm) return false
      return true
    })
    .map(([key]) => key)

  // FIXME: Why filter when we can pass the active form focus in the generator constraints object?
  const uncovered = uncoveredTriples(profile, srsStore, available).filter(
    (t) => activeFocusForm == null || t.form === activeFocusForm,
  )
  const shouldIntroduceNew = uncovered.length > 0 && (dueKeys.length === 0 || session.reviews - session.lastNewAt >= 3)

  if (shouldIntroduceNew) {
    const { kind, rootType, form } = random(uncovered)
    const generator = available.find((e) => e.kind === kind)
    if (generator != null) return generator.generate(profile, { rootType, form })
  }

  if (dueKeys.length > 0) {
    const kindWeight = (key: string): number => available.find((e) => e.kind === parseCardKey(key).kind)?.weight ?? 1
    const srsWeight = (key: string): number => cardSrsWeight(srsStore[key], today) * kindWeight(key)
    const { kind, rootType, form, tense, pronoun } = parseCardKey(weightedRandomSrs(dueKeys, srsWeight))
    const generator = available.find((e) => e.kind === kind)
    if (generator == null) return weightedRandomSrs(available, exerciseWeight).generate(profile)
    const pool = verbs.filter(
      (v) => (rootType == null || getSrsRootType(v.root) === rootType) && (form == null || v.form === form),
    )
    if (pool.length > 0) return generator.generate(profile, { rootType, form, tense, pronoun })
  }

  return weightedRandomSrs(available, exerciseWeight).generate(profile)
}

const exerciseWeight = (e: ExerciseGenerator) => e.weight ?? 1
