import { verbs } from '../paradigms/verbs'
import { type DimensionProfile, formPool, pronounPool, rootTypesPool, tensePool } from './dimensions'
import type { Exercise, ExerciseGenerator, ExerciseKind } from './exercises'
import { conjugationExercise } from './generators/conjugation'
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
import type { SrsStore } from './srs'
import { cardSrsWeight, getSrsRootType, parseCardKey, weightedRandomSrs } from './srs'

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
    if (pool.length > 0) return generator.generate(profile, { rootType, form, tense, pronoun })
  }

  return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(profile)
}
