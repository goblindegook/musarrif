import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { TriliteralForm } from '../paradigms/verb-types'
import type { SrsRootType } from './root-types'

export type CardType = 'production' | 'recognition'

export type MorphologicalCategory = 'verb' | 'masdar' | 'participle'

/** The cards an exercise answers. */
export interface CardFamily {
  cardType: CardType
  category: MorphologicalCategory
  /** The card is one conjugated form, keyed by tense and pronoun. */
  conjugated?: true
}

interface SrsCardDimensions {
  category: MorphologicalCategory
  rootType: SrsRootType
  form: TriliteralForm
  tense?: VerbTense
  pronoun?: PronounId
}

export type CardConstraints = Partial<SrsCardDimensions>

export interface SrsCardIdentity extends SrsCardDimensions {
  key: string
  type: CardType
}
