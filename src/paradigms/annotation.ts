import { annotateActiveFuture } from './active/future-annotation'
import { annotateActiveImperative } from './active/imperative-annotation'
import { annotatePast } from './active/past-annotation'
import { annotateActivePresentMood } from './active/present-annotation'
import { annotatePassiveFuture } from './passive/future-annotation'
import { annotatePassivePast } from './passive/past-annotation'
import { annotatePassivePresentMood } from './passive/present-annotation'
import type { PronounId } from './pronouns'
import type { VerbTense } from './tense'
import type { Verb, VerbForm } from './verbs'
import type { Morpheme } from './word'

export type DerivationStepKind =
  | { type: 'root' }
  | { type: 'form'; form: VerbForm }
  | { type: 'tense'; verbTense: VerbTense }
  | { type: 'pronoun'; pronounId: PronounId }

export interface DerivationStep {
  kind: DerivationStepKind
  arabic: string
  morphemes: readonly Morpheme[]
}

export interface AnnotatedForm {
  steps: readonly DerivationStep[]
}

export function annotate(verb: Verb, verbTense: VerbTense, pronounId: PronounId): AnnotatedForm | null {
  switch (verbTense) {
    case 'active.past':
      return annotatePast(verb, pronounId)
    case 'active.present.indicative':
      return annotateActivePresentMood(verb, 'indicative', pronounId)
    case 'active.present.subjunctive':
      return annotateActivePresentMood(verb, 'subjunctive', pronounId)
    case 'active.present.jussive':
      return annotateActivePresentMood(verb, 'jussive', pronounId)
    case 'active.future':
      return annotateActiveFuture(verb, pronounId)
    case 'active.imperative':
      return annotateActiveImperative(verb, pronounId)
    case 'passive.past':
      return annotatePassivePast(verb, pronounId)
    case 'passive.present.indicative':
      return annotatePassivePresentMood(verb, 'indicative', pronounId)
    case 'passive.present.subjunctive':
      return annotatePassivePresentMood(verb, 'subjunctive', pronounId)
    case 'passive.present.jussive':
      return annotatePassivePresentMood(verb, 'jussive', pronounId)
    case 'passive.future':
      return annotatePassiveFuture(verb, pronounId)
    default:
      return null
  }
}
