import type { AnnotatedForm, DerivationStep } from '../annotation'
import { isDual, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { ALIF, ALIF_HAMZA, FATHA, KASRA, NOON, type Token } from '../tokens'
import type { Verb } from '../verbs'
import { elidedMorpheme } from '../word'
import { annotatePast } from './past-annotation'
import { conjugatePresentMood } from './present'

export function annotateActivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  if (mood !== 'indicative') {
    const indicativeAnnotation = annotateActivePresentMood(verb, 'indicative', pronounId)
    const moodConjugation = conjugatePresentMood(verb, mood)[pronounId]
    const elidedNoon = isDual(pronounId)
      ? [NOON, KASRA]
      : pronounId === '2fs' || isMasculinePlural(pronounId)
        ? [NOON, FATHA]
        : null
    const elision = elidedNoon ? [elidedMorpheme(...elidedNoon)] : []
    return {
      steps: [
        ...indicativeAnnotation.steps,
        {
          kind: { type: 'tense', verbTense: `active.present.${mood}` },
          arabic: String(moodConjugation),
          morphemes: [...moodConjugation.morphemes, ...elision],
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
      morphemes: dropped ? [elidedMorpheme(...dropped), ...indicative['3ms'].morphemes] : indicative['3ms'].morphemes,
    },
  ]

  if (pronounId === '3ms') return { steps }

  return {
    steps: [
      ...steps,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(indicative[pronounId]),
        morphemes: indicative[pronounId].morphemes,
      },
    ],
  }
}

function elidedPastPrefix(verb: Verb): readonly Token[] | null {
  if (verb.root.length !== 3) return null
  if (verb.form === 4) return [ALIF_HAMZA, FATHA]
  if (verb.form === 10) return [ALIF, KASRA]
  return null
}
