import { activeFutureDerivationSteps } from './active/future-annotation'
import { imperativeDerivationSteps } from './active/imperative-annotation'
import { activePastDerivationSteps } from './active/past-annotation'
import { activePresentMoodDerivationSteps } from './active/present-annotation'
import { passiveFutureDerivationSteps } from './passive/future-annotation'
import { passivePastDerivationSteps } from './passive/past-annotation'
import { passivePresentMoodDerivationSteps } from './passive/present-annotation'
import type { PronounId } from './pronouns'
import type { VerbTense } from './tense'
import type { Verb, VerbForm } from './verbs'
import type { Morpheme } from './word'

export type DerivationStep =
  | { type: 'root'; morphemes: readonly Morpheme[] }
  | { type: 'form'; form: VerbForm; morphemes: readonly Morpheme[] }
  | { type: 'tense'; verbTense: VerbTense; morphemes: readonly Morpheme[] }
  | { type: 'pronoun'; pronounId: PronounId; morphemes: readonly Morpheme[] }

export type DerivationSteps = readonly DerivationStep[]

export function derivationSteps(verb: Verb, verbTense: VerbTense, pronounId: PronounId): DerivationSteps {
  switch (verbTense) {
    case 'active.past':
      return activePastDerivationSteps(verb, pronounId)
    case 'active.present.indicative':
      return activePresentMoodDerivationSteps(verb, 'indicative', pronounId)
    case 'active.present.subjunctive':
      return activePresentMoodDerivationSteps(verb, 'subjunctive', pronounId)
    case 'active.present.jussive':
      return activePresentMoodDerivationSteps(verb, 'jussive', pronounId)
    case 'active.future':
      return activeFutureDerivationSteps(verb, pronounId)
    case 'active.imperative':
      return imperativeDerivationSteps(verb, pronounId)
    case 'passive.past':
      return passivePastDerivationSteps(verb, pronounId)
    case 'passive.present.indicative':
      return passivePresentMoodDerivationSteps(verb, 'indicative', pronounId)
    case 'passive.present.subjunctive':
      return passivePresentMoodDerivationSteps(verb, 'subjunctive', pronounId)
    case 'passive.present.jussive':
      return passivePresentMoodDerivationSteps(verb, 'jussive', pronounId)
    case 'passive.future':
      return passiveFutureDerivationSteps(verb, pronounId)
    default:
      return []
  }
}
