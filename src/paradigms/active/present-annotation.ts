import type { DerivationSteps } from '../annotation'
import { isDual, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { ALIF, ALIF_HAMZA, FATHA, KASRA, NOON, type Token } from '../tokens'
import { isQuadriliteralVerb, type Verb } from '../verbs'
import { elidedMorpheme } from '../word'
import { activePastDerivationSteps } from './past-annotation'
import { conjugatePresentMood } from './present'

export function activePresentMoodDerivationSteps(verb: Verb, mood: Mood, pronounId: PronounId): DerivationSteps {
  if (mood !== 'indicative') {
    const indicativeAnnotation = activePresentMoodDerivationSteps(verb, 'indicative', pronounId)
    const moodConjugation = conjugatePresentMood(verb, mood)[pronounId]
    const elision = []

    if (isDual(pronounId)) elision.push(elidedMorpheme(NOON, KASRA))

    if (pronounId === '2fs' || isMasculinePlural(pronounId)) elision.push(elidedMorpheme(NOON, FATHA))

    const finalIndicativeMorpheme = indicativeAnnotation.at(-1)?.morphemes.at(-1)
    if (
      mood === 'jussive' &&
      finalIndicativeMorpheme?.role === 'radical' &&
      finalIndicativeMorpheme.contains((t) => t.isWeak)
    )
      elision.push(finalIndicativeMorpheme.toElided())

    return [
      ...indicativeAnnotation,
      {
        type: 'tense',
        tense: `active.present.${mood}` as const,
        morphemes: [...moodConjugation.morphemes, ...elision],
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
  if (isQuadriliteralVerb(verb)) return null
  if (verb.form === 4) return [ALIF_HAMZA, FATHA]
  if (verb.form === 10) return [ALIF, KASRA]
  return null
}
