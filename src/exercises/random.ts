import { verbs } from '../paradigms/verbs'
import { conjugationExercise } from './conjugation'
import { type DimensionProfile, formPool, pronounPool, rootTypesPool, tensePool } from './dimensions'
import type { Exercise, ExerciseGenerator, ExerciseKind } from './exercises'
import { masdarFormExercise } from './masdar-form'
import { masdarRootExercise } from './masdar-root'
import { masdarVerbExercise } from './masdar-verb'
import { participleFormExercise } from './participle-form'
import { participleRootExercise } from './participle-root'
import { participleVerbExercise } from './participle-verb'
import { rootFormVerbExercise } from './root-form-verb'
import type { SrsStore } from './srs'
import { cardSrsWeight, getSrsRootType, parseCardKey, weightedRandomSrs } from './srs'
import { verbFormExercise } from './verb-form'
import { verbMasdarExercise } from './verb-masdar'
import { verbParticipleExercise } from './verb-participle'
import { verbPronounExercise } from './verb-pronoun'
import { verbRootExercise } from './verb-root'
import { verbTenseExercise } from './verb-tense'

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

function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export function randomExercise(profile: DimensionProfile, srsStore: SrsStore = {}): Exercise<ExerciseKind> {
  const available = EXERCISES.filter((e) => e.minNominals == null || profile.nominals >= e.minNominals)
  const availableKinds = new Set(available.map((e) => e.kind))
  const availableRootTypes = rootTypesPool(profile.rootTypes)
  const availableForms = formPool(profile.forms)
  const availableTenses = tensePool(profile.tenses)
  const availablePronouns = pronounPool(profile.pronouns)
  const today = utcToday()

  const dueKeys = Object.entries(srsStore)
    .filter(([key, { dueDate }]) => {
      if (dueDate > today) return false
      const { kind, rootType, form, tense, pronoun } = parseCardKey(key)
      if (!availableKinds.has(kind)) return false
      if (rootType != null && !availableRootTypes.includes(rootType)) return false
      if (form != null && !availableForms.includes(form)) return false
      if (tense != null && !availableTenses.includes(tense)) return false
      if (pronoun != null && !availablePronouns.includes(pronoun)) return false
      return true
    })
    .map(([key]) => key)

  if (dueKeys.length > 0) {
    const kindWeight = (key: string): number => available.find((e) => e.kind === parseCardKey(key).kind)?.weight ?? 1
    const srsWeight = (key: string): number => cardSrsWeight(srsStore[key], today) * kindWeight(key)

    const dueKey = weightedRandomSrs(dueKeys, srsWeight)
    const { kind, rootType, form, tense, pronoun } = parseCardKey(dueKey)

    const generator = available.find((e) => e.kind === kind)
    if (generator == null) return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(profile)

    const pool = verbs.filter(
      (v) => (rootType == null || getSrsRootType(v.root) === rootType) && (form == null || v.form === form),
    )
    if (pool.length > 0) return { ...generator.generate(profile, { rootType, form, tense, pronoun }), cardKey: dueKey }
  }

  return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(profile)
}
