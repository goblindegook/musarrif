import { activePastDerivationSteps } from '../active/past-annotation'
import type { DerivationSteps } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Mood } from '../tense'
import type { Verb } from '../verbs'
import { conjugatePassivePresentMood } from './present'

export function passivePresentMoodDerivationSteps(verb: Verb, mood: Mood, pronounId: PronounId): DerivationSteps {
  const allForms = conjugatePassivePresentMood(verb, mood)

  if (mood !== 'indicative') {
    const indicativeAnnotation = passivePresentMoodDerivationSteps(verb, 'indicative', pronounId)
    return [
      ...indicativeAnnotation,
      {
        type: 'tense',
        tense: `passive.present.${mood}` as const,
        morphemes: allForms[pronounId].morphemes,
      },
    ]
  }

  const pastAnnotation = activePastDerivationSteps(verb, '3ms')
  const indicativeForms = conjugatePassivePresentMood(verb, 'indicative')

  const steps: DerivationSteps = [
    pastAnnotation[0],
    pastAnnotation[1],
    {
      type: 'tense',
      tense: 'passive.present.indicative',
      morphemes: indicativeForms['3ms'].morphemes,
    },
  ]

  if (pronounId === '3ms') return steps

  return [
    ...steps,
    {
      type: 'pronoun',
      pronounId,
      morphemes: indicativeForms[pronounId].morphemes,
    },
  ]
}
