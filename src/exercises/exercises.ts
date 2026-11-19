import type { ExplanationLayers } from '../paradigms/explanation'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { TriliteralForm } from '../paradigms/verbs'
import type { DimensionKey, DimensionProfile } from './dimensions'
import type { ExerciseKind } from './exercise-kinds'
import { buildCardKey, type CardFamily, type CardType, getSrsRootType, type MorphologicalCategory } from './srs'
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

export interface ExerciseGenerator<T extends ExerciseKind = ExerciseKind> extends CardFamily {
  kind: T
  generate: (profile: DimensionProfile, constraints?: CardConstraints) => Exercise<T>
  minNominals?: 1 | 2
  weight?: number
}

interface ExerciseConfig extends Pick<CardFamily, 'conjugated'> {
  minNominals?: 1 | 2
  weight?: number
}

/** What an exercise's card is keyed by: the root and form, plus the tense and pronoun of a conjugated card. */
type ExerciseCard =
  | { root: string; form: TriliteralForm }
  | { root: string; form: TriliteralForm; tense: VerbTense; pronoun: PronounId }

type ExerciseBuild<T extends ExerciseKind> = Omit<ExerciseFields<T>, 'cardKey'> & { card: ExerciseCard }

const CATEGORIES: Readonly<Record<ExerciseKind, MorphologicalCategory>> = {
  conjugation: 'verb',
  rootFormVerb: 'verb',
  verbForm: 'verb',
  verbPronoun: 'verb',
  verbRoot: 'verb',
  verbTense: 'verb',
  masdarForm: 'masdar',
  masdarRoot: 'masdar',
  masdarVerb: 'masdar',
  verbMasdar: 'masdar',
  participleForm: 'participle',
  participleRoot: 'participle',
  participleVerb: 'participle',
  verbParticiple: 'participle',
}

export function defineExercise<T extends ExerciseKind>(
  exerciseType: CardType,
  kind: T,
  build: (profile: DimensionProfile, constraints?: CardConstraints) => ExerciseBuild<T>,
  config: ExerciseConfig = {},
): ExerciseGenerator<T> {
  const cardKey = (card: ExerciseCard): string => {
    const rootType = getSrsRootType(card.root)
    return 'tense' in card
      ? buildCardKey(exerciseType, 'verb', rootType, card.form, card.tense, card.pronoun)
      : buildCardKey(exerciseType, CATEGORIES[kind], rootType, card.form)
  }

  return {
    kind,
    cardType: exerciseType,
    category: CATEGORIES[kind],
    conjugated: config.conjugated,
    minNominals: config.minNominals,
    weight: config.weight,
    generate: (profile, constraints) => {
      const { card, ...fields } = build(profile, constraints)
      // TypeScript cannot follow a key swap on a generic T; the fields pass through untouched.
      return { kind, ...fields, cardKey: cardKey(card) } as unknown as Exercise<T>
    },
  }
}
