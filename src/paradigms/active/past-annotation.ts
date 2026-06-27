import type { DerivationSteps } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { radicalMorpheme } from '../word'
import { conjugatePast } from './past'

export function activePastDerivationSteps(verb: Verb, pronounId: PronounId): DerivationSteps {
  const past = conjugatePast(verb)
  const morphemes = past['3ms'].morphemes

  const steps: DerivationSteps = [
    {
      type: 'root',
      morphemes: verb.rootTokens.map((char) => radicalMorpheme(char)),
    },
    {
      type: 'form',
      form: verb.form,
      morphemes,
    },
    {
      type: 'tense',
      tense: 'active.past',
      morphemes,
    },
  ]

  if (pronounId === '3ms') return steps

  return [
    ...steps,
    {
      type: 'pronoun',
      pronounId,
      morphemes: past[pronounId].morphemes,
    },
  ]
}
