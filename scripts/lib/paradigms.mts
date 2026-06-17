import type { PronounId } from '../../src/paradigms/pronouns.ts'

export type { PronounId }

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

export type NominalSet = {
  masdar?: string[]
  activeParticiple?: string
  passiveParticiple?: string
}

export type ParsedParadigms = {
  paradigms: Partial<Record<VerbParadigm, Partial<Record<PronounId, string>>>>
  nominals: NominalSet
}
