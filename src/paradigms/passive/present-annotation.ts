import { annotatePast } from '../active/past-annotation'
import type { AnnotatedForm, DerivationStep } from '../annotation'
import { isDual, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { FATHA, KASRA, NOON } from '../tokens'
import type { Verb } from '../verbs'
import { elidedMorpheme } from '../word'
import { conjugatePassivePresentMood } from './present'

export function annotatePassivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  const allForms = conjugatePassivePresentMood(verb, mood)

  if (mood !== 'indicative') {
    const indicativeAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)
    const elision = []
    if (isDual(pronounId)) elision.push(elidedMorpheme(NOON, KASRA))
    if (pronounId === '2fs' || isMasculinePlural(pronounId)) elision.push(elidedMorpheme(NOON, FATHA))
    return {
      steps: [
        ...indicativeAnnotation.steps,
        {
          kind: { type: 'tense', verbTense: `passive.present.${mood}` },
          arabic: String(allForms[pronounId]),
          morphemes: [...allForms[pronounId].morphemes, ...elision],
        },
      ],
    }
  }

  const pastAnnotation = annotatePast(verb, '3ms')
  const indicativeForms = conjugatePassivePresentMood(verb, 'indicative')

  const steps: readonly DerivationStep[] = [
    pastAnnotation.steps[0],
    pastAnnotation.steps[1],
    {
      kind: { type: 'tense', verbTense: 'passive.present.indicative' },
      arabic: String(indicativeForms['3ms']),
      morphemes: indicativeForms['3ms'].morphemes,
    },
  ]

  if (pronounId === '3ms') return { steps }

  return {
    steps: [
      ...steps,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(indicativeForms[pronounId]),
        morphemes: indicativeForms[pronounId].morphemes,
      },
    ],
  }
}
