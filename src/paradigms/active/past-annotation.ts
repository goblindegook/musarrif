import type { AnnotatedForm, DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePast } from './past'

export function annotatePast(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const past = conjugatePast(verb)
  const formMorphemes = past['3ms'].toMorphemes()

  const rootStep: DerivationStep = {
    kind: { type: 'root' },
    arabic: verb.root,
    morphemes: [...verb.root].map((char) => ({ text: char, role: 'radical' as const })),
  }
  const formStep: DerivationStep = {
    kind: { type: 'form', form: verb.form },
    arabic: String(past['3ms']),
    morphemes: formMorphemes,
  }

  const pastStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'active.past' },
    arabic: String(past['3ms']),
    morphemes: formMorphemes,
  }

  if (pronounId === '3ms') return { steps: [rootStep, formStep, pastStep] }

  const word = past[pronounId]

  return {
    steps: [
      rootStep,
      formStep,
      pastStep,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(word),
        morphemes: word.toMorphemes(),
      },
    ],
  }
}
