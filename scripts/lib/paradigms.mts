import type { PronounId } from '../../src/paradigms/pronouns.ts'
import type { Preposition } from '../../src/paradigms/verb-types.ts'

export type { PronounId }

export type GenerationTool = 'wiktionary' | 'reverso' | 'elixirfm' | 'qutrub'

export type VerbParadigm =
  | 'active past'
  | 'active present indicative'
  | 'active present subjunctive'
  | 'active present jussive'
  | 'active imperative'
  | 'passive past'
  | 'passive present indicative'
  | 'passive present subjunctive'
  | 'passive present jussive'

export interface NominalSet {
  masdar?: string[]
  activeParticiple?: string
  passiveParticiple?: string
}

export interface ParsedParadigms {
  paradigms: Partial<Record<VerbParadigm, Partial<Record<PronounId, string[]>>>>
  nominals: NominalSet
  prepositions?: Preposition[]
}
