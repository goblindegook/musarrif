import { getRootType } from '../paradigms/roots'
import { verbs } from '../paradigms/verbs'
import { conjugationExercise } from './conjugation'
import { type DimensionProfile, formsPool, rootTypesPool } from './dimensions'
import { masdarFormExercise } from './masdar-form'
import { masdarRootExercise } from './masdar-root'
import { masdarVerbExercise } from './masdar-verb'
import { participleFormExercise } from './participle-form'
import { participleRootExercise } from './participle-root'
import { participleVerbExercise } from './participle-verb'
import { rootFormVerbExercise } from './root-form-verb'
import type { CardConstraints, SrsStore } from './srs'
import { cardSrsWeight, parseCardKey, weightedRandomSrs } from './srs'
import type { Exercise } from './types'
import { verbFormExercise } from './verb-form'
import { verbMasdarExercise } from './verb-masdar'
import { verbParticipleExercise } from './verb-participle'
import { verbPronounExercise } from './verb-pronoun'
import { verbRootExercise } from './verb-root'
import { verbTenseExercise } from './verb-tense'

interface ExerciseGenerator {
  kind: Exercise['kind']
  generate: (profile: DimensionProfile, constraints?: CardConstraints) => Exercise
  minNominals?: 1 | 2
  weight?: number
}

const EXERCISES: readonly ExerciseGenerator[] = [
  { kind: 'conjugation', generate: conjugationExercise, weight: 5 },
  { kind: 'masdarForm', generate: masdarFormExercise, minNominals: 2 },
  { kind: 'masdarRoot', generate: masdarRootExercise, minNominals: 2 },
  { kind: 'masdarVerb', generate: masdarVerbExercise, minNominals: 2 },
  { kind: 'participleForm', generate: participleFormExercise, minNominals: 1 },
  { kind: 'rootFormVerb', generate: rootFormVerbExercise },
  { kind: 'participleRoot', generate: participleRootExercise, minNominals: 1 },
  { kind: 'participleVerb', generate: participleVerbExercise, minNominals: 1 },
  { kind: 'verbForm', generate: verbFormExercise },
  { kind: 'verbMasdar', generate: verbMasdarExercise, minNominals: 2 },
  { kind: 'verbParticiple', generate: verbParticipleExercise, minNominals: 1 },
  { kind: 'verbPronoun', generate: verbPronounExercise, weight: 2 },
  { kind: 'verbRoot', generate: verbRootExercise },
  { kind: 'verbTense', generate: verbTenseExercise, weight: 2 },
]

function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export function randomExercise(profile: DimensionProfile, srsStore: SrsStore = {}): Exercise {
  const available = EXERCISES.filter((e) => e.minNominals == null || profile.nominals >= e.minNominals)
  const availableKinds = new Set(available.map((e) => e.kind))
  const today = utcToday()

  const availableForms = formsPool(profile.forms)
  const availableRootTypes = rootTypesPool(profile.rootTypes)

  const dueKeys = Object.entries(srsStore)
    .filter(([key, state]) => {
      if (state.dueDate > today) return false
      const { kind, rootType, form } = parseCardKey(key)
      if (!availableKinds.has(kind)) return false
      if (rootType != null && !availableRootTypes.includes(rootType)) return false
      if (form != null && !availableForms.includes(form)) return false
      return true
    })
    .map(([key]) => key)

  if (dueKeys.length > 0) {
    const kindWeight = (key: string): number => {
      const { kind } = parseCardKey(key)
      return available.find((e) => e.kind === kind)?.weight ?? 1
    }
    const srsWeight = (key: string): number => cardSrsWeight(srsStore[key], today) * kindWeight(key)

    const dueKey = weightedRandomSrs(dueKeys, srsWeight)
    const { kind, rootType, form, tense, pronoun } = parseCardKey(dueKey)

    const generator = available.find((e) => e.kind === kind)
    if (generator == null) return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(profile)

    const pool = verbs.filter(
      (v) => (rootType == null || getRootType(v.root) === rootType) && (form == null || v.form === form),
    )
    if (pool.length > 0) {
      return { ...generator.generate(profile, { rootType, form, tense, pronoun }), cardKey: dueKey }
    }
  }

  return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(profile)
}
