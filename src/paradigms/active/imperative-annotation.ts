import type { DerivationSteps } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateImperative } from './imperative'
import { activePresentMoodDerivationSteps } from './present-annotation'

export function imperativeDerivationSteps(verb: Verb, pronounId: PronounId): DerivationSteps {
  const word = conjugateImperative(verb)[pronounId]
  const jussive = activePresentMoodDerivationSteps(verb, 'jussive', pronounId)
  const jussiveStep = jussive[jussive.length - 1]
  const dropped = [jussiveStep.morphemes[0].toElided()]

  if (verb.form === 1 && jussiveStep.morphemes[1].tokens[0].isHamza) dropped.push(jussiveStep.morphemes[1].toElided())

  return [
    ...jussive,
    {
      type: 'tense',
      tense: 'active.imperative',
      morphemes: [...dropped, ...word.morphemes],
    },
  ]
}
