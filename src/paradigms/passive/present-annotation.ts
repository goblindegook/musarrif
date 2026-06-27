import { annotatePast } from '../active/past-annotation'
import type { DerivationStep } from '../annotation'
import { isDual, isMasculinePlural, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { FATHA, KASRA, NOON } from '../tokens'
import type { Verb } from '../verbs'
import { elidedMorpheme } from '../word'
import { conjugatePassivePresentMood } from './present'

export function annotatePassivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): readonly DerivationStep[] {
  const allForms = conjugatePassivePresentMood(verb, mood)

  if (mood !== 'indicative') {
    const indicativeAnnotation = annotatePassivePresentMood(verb, 'indicative', pronounId)
    const elision = []
    if (isDual(pronounId)) elision.push(elidedMorpheme(NOON, KASRA))
    if (pronounId === '2fs' || isMasculinePlural(pronounId)) elision.push(elidedMorpheme(NOON, FATHA))
    return [
      ...indicativeAnnotation,
      {
        type: 'tense',
        verbTense: `passive.present.${mood}` as const,
        morphemes: [...allForms[pronounId].morphemes, ...elision],
      },
    ]
  }

  const pastAnnotation = annotatePast(verb, '3ms')
  const indicativeForms = conjugatePassivePresentMood(verb, 'indicative')

  const steps: readonly DerivationStep[] = [
    pastAnnotation[0],
    pastAnnotation[1],
    {
      type: 'tense',
      verbTense: 'passive.present.indicative',
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
