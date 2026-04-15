import { annotatePast } from '../active/past-annotation'
import {
  type AnnotatedForm,
  buildMorphemes,
  type DerivationStep,
  type MorphemeRole,
  PAST_SUFFIX_COUNTS,
} from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassivePast } from './past'

export function annotatePassivePast(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const activePastAnnotation = annotatePast(verb, '3ms')
  const rootStep = activePastAnnotation.steps[0]
  const formStep = activePastAnnotation.steps[1]

  const allForms = conjugatePassivePast(verb)
  const thirdMs = allForms['3ms']
  const passivePastMorphemes = buildMorphemes([...thirdMs].map((char) => ({ char, role: 'root' as MorphemeRole })))

  const pastThirdMsStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'passive.past' },
    arabic: thirdMs,
    morphemes: passivePastMorphemes,
  }

  if (pronounId === '3ms') {
    return { steps: [rootStep, formStep, pastThirdMsStep] }
  }

  const finalArabic = allForms[pronounId]
  const finalChars = [...finalArabic]
  const suffixCount = PAST_SUFFIX_COUNTS[pronounId]
  const stemCount = finalChars.length - suffixCount
  const morphemes = buildMorphemes([
    ...finalChars.slice(0, stemCount).map((char) => ({ char, role: 'root' as MorphemeRole })),
    ...finalChars.slice(stemCount).map((char) => ({ char, role: 'suffix' as MorphemeRole })),
  ])

  return {
    steps: [
      rootStep,
      formStep,
      pastThirdMsStep,
      { kind: { type: 'pronoun', pronounId }, arabic: finalArabic, morphemes },
    ],
  }
}
