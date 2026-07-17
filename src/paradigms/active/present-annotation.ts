import type { DerivationSteps } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { ALIF, ALIF_HAMZA, FATHA, KASRA, type Token } from '../tokens'
import type { Verb } from '../verbs'
import { elidedMorpheme } from '../word'
import { activePastDerivationSteps } from './past-annotation'
import { conjugatePresentMood } from './present'

export function activePresentMoodDerivationSteps(verb: Verb, mood: Mood, pronounId: PronounId): DerivationSteps {
  if (mood !== 'indicative') {
    const indicativeAnnotation = activePresentMoodDerivationSteps(verb, 'indicative', pronounId)
    const moodConjugation = conjugatePresentMood(verb, mood)[pronounId]

    return [
      ...indicativeAnnotation,
      {
        type: 'tense',
        tense: `active.present.${mood}` as const,
        morphemes: moodConjugation.morphemes,
      },
    ]
  }

  const pastAnnotation = activePastDerivationSteps(verb, '3ms')

  const indicative = conjugatePresentMood(verb, 'indicative')
  const dropped = elidedPastPrefix(verb)

  const steps: DerivationSteps = [
    pastAnnotation[0],
    pastAnnotation[1],
    {
      type: 'tense',
      tense: 'active.present.indicative',
      morphemes: dropped ? [elidedMorpheme(...dropped), ...indicative['3ms'].morphemes] : indicative['3ms'].morphemes,
    },
  ]

  if (pronounId === '3ms') return steps

  return [
    ...steps,
    {
      type: 'pronoun',
      pronounId,
      morphemes: indicative[pronounId].morphemes,
    },
  ]
}

function elidedPastPrefix(verb: Verb): readonly Token[] | null {
  if (verb.form === 4) return [ALIF_HAMZA, FATHA]
  if (verb.form === 10) return [ALIF, KASRA]
  return null
}
