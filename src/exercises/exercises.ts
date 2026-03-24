import type { DimensionProfile } from './dimensions'
import type { CardConstraints } from './srs'

export type ExerciseKind =
  | 'conjugation'
  | 'masdarForm'
  | 'masdarRoot'
  | 'masdarVerb'
  | 'participleForm'
  | 'participleRoot'
  | 'participleVerb'
  | 'verbParticiple'
  | 'verbForm'
  | 'verbMasdar'
  | 'verbPronoun'
  | 'verbRoot'
  | 'rootFormVerb'
  | 'verbTense'

export interface Exercise<T extends ExerciseKind = ExerciseKind> {
  kind: T
  word: string
  promptTranslationKey: string
  promptParams?: Record<string, string>
  options: readonly string[]
  answer: number
  cardKey?: string
}

export interface ExerciseGenerator<T extends ExerciseKind = ExerciseKind> {
  kind: T
  generate: (profile: DimensionProfile, constraints?: CardConstraints) => Exercise<T>
  minNominals?: 1 | 2
  weight?: number
}

interface ExerciseConfig {
  minNominals?: 1 | 2
  weight?: number
}

export function defineExercise<T extends ExerciseKind>(
  kind: T,
  build: (profile: DimensionProfile, constraints?: CardConstraints) => Omit<Exercise<T>, 'kind'>,
  config: ExerciseConfig = {},
): ExerciseGenerator<T> {
  return {
    kind,
    minNominals: config.minNominals,
    weight: config.weight,
    generate: (profile, constraints) => ({ kind, ...build(profile, constraints) }),
  }
}
