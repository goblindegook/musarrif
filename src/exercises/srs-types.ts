import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { TriliteralForm } from '../paradigms/verb-types'
import type { ExerciseKind } from './exercise-kinds'
import type { SrsRootType } from './root-types'

interface SrsCardDimensions {
  rootType: SrsRootType
  form: TriliteralForm
  tense?: VerbTense
  pronoun?: PronounId
}

export type CardConstraints = Partial<SrsCardDimensions>

export interface SrsCardIdentity extends SrsCardDimensions {
  key: string
  kind: ExerciseKind
}
