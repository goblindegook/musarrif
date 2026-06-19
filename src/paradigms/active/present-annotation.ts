import type { AnnotatedForm, DerivationStep } from '../annotation'
import { isDual, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { ALIF, ALIF_HAMZA, FATHA, KASRA, NOON } from '../tokens'
import type { Verb } from '../verbs'
import type { MorphemeRole } from '../word'
import { annotatePast } from './past-annotation'
import { conjugatePresentMood } from './present'

function elidedPastPrefix(verb: Verb): string | null {
  if (verb.root.length !== 3) return null
  if (verb.form === 4) return ALIF_HAMZA.raw + FATHA.raw
  if (verb.form === 10) return ALIF.raw + KASRA.raw
  return null
}

export function annotateActivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  if (mood !== 'indicative') {
    const indicativeAnnotation = annotateActivePresentMood(verb, 'indicative', pronounId)
    const moodConjugation = conjugatePresentMood(verb, mood)[pronounId]
    const elidedNoon = isDual(pronounId)
      ? NOON.raw + KASRA.raw
      : pronounId === '2fs' || isMasculinePlural(pronounId)
        ? NOON.raw + FATHA.raw
        : null
    const elidedMorpheme = elidedNoon ? [{ text: elidedNoon, role: 'elided' as MorphemeRole }] : []
    return {
      steps: [
        ...indicativeAnnotation.steps,
        {
          kind: { type: 'tense', verbTense: `active.present.${mood}` },
          arabic: String(moodConjugation),
          morphemes: [...moodConjugation.toMorphemes(), ...elidedMorpheme],
        },
      ],
    }
  }

  const pastAnnotation = annotatePast(verb, '3ms')

  const indicative = conjugatePresentMood(verb, 'indicative')
  const dropped = elidedPastPrefix(verb)

  const steps: readonly DerivationStep[] = [
    pastAnnotation.steps[0],
    pastAnnotation.steps[1],
    {
      kind: { type: 'tense', verbTense: 'active.present.indicative' },
      arabic: String(indicative['3ms']),
      morphemes: dropped
        ? [{ text: dropped, role: 'elided' as MorphemeRole }, ...indicative['3ms'].toMorphemes()]
        : indicative['3ms'].toMorphemes(),
    },
  ]

  if (pronounId === '3ms') return { steps }

  return {
    steps: [
      ...steps,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(indicative[pronounId]),
        morphemes: indicative[pronounId].toMorphemes(),
      },
    ],
  }
}
