import type { PronounId } from './pronouns'
import type { VerbTense } from './tense'
import type { TriliteralForm } from './verb-types'
import type { Morpheme } from './word'

export type DerivationStep =
  | { type: 'root'; morphemes: readonly Morpheme[] }
  | { type: 'form'; form: TriliteralForm; morphemes: readonly Morpheme[] }
  | { type: 'tense'; tense: VerbTense; morphemes: readonly Morpheme[] }
  | { type: 'pronoun'; pronounId: PronounId; morphemes: readonly Morpheme[] }

export type DerivationSteps = readonly DerivationStep[]
