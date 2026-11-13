import type { ExplanationLayers } from '../paradigms/explanation'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { TriliteralForm } from '../paradigms/verbs'
import type { DimensionKey, DimensionProfile } from './dimensions'
import type { ExerciseKind } from './exercise-kinds'
import type { CardConstraints } from './srs-types'

export type { ExerciseKind } from './exercise-kinds'

export type InputMode = 'multiple-choice' | 'keyboard' | 'speech'

export type Participle = 'active' | 'passive'

type NoKindFields = Record<never, never>

interface ExerciseFieldsByKind {
  conjugation: { tense: VerbTense; pronoun: PronounId; withVoice: boolean }
  masdarForm: NoKindFields
  masdarRoot: NoKindFields
  masdarVerb: NoKindFields
  participleForm: { participle: Participle }
  participleRoot: { participle: Participle }
  participleVerb: { participle: Participle }
  verbParticiple: { participle: Participle }
  verbForm: NoKindFields
  verbMasdar: NoKindFields
  verbPronoun: NoKindFields
  verbRoot: NoKindFields
  rootFormVerb: { form: TriliteralForm }
  verbTense: { tenses: readonly VerbTense[]; withVoice: boolean }
}

interface ExerciseBase {
  word: string
  spokenWord: string
  options: readonly string[]
  answer: number
  answerText?: string
  cardKey: string
  dimensions: readonly DimensionKey[]
  explanation?: ExplanationLayers | null
  inputModes: readonly InputMode[]
}

type ExerciseFields<T extends ExerciseKind> = ExerciseBase & ExerciseFieldsByKind[T]

// Mapped over T, so a concrete T yields one member and the default yields a union discriminated on kind,
// while a generic T still reduces to `{ kind: T } & ExerciseFields<T>` and defineExercise needs no cast:
export type Exercise<T extends ExerciseKind = ExerciseKind> = { [K in T]: { kind: K } & ExerciseFields<K> }[T]

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
  build: (profile: DimensionProfile, constraints?: CardConstraints) => ExerciseFields<T>,
  config: ExerciseConfig = {},
): ExerciseGenerator<T> {
  return {
    kind,
    minNominals: config.minNominals,
    weight: config.weight,
    generate: (profile, constraints) => ({ kind, ...build(profile, constraints) }),
  }
}
