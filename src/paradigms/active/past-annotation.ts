import type { AnnotatedForm, DerivationStep } from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePast } from './past'

export function annotatePast(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const past = conjugatePast(verb)
  const morphemes = past['3ms'].toMorphemes()

  const steps: readonly DerivationStep[] = [
    {
      kind: { type: 'root' },
      arabic: verb.root,
      morphemes: [...verb.root].map((char) => ({ text: char, role: 'radical' })),
    },
    {
      kind: { type: 'form', form: verb.form },
      arabic: String(past['3ms']),
      morphemes,
    },
    {
      kind: { type: 'tense', verbTense: 'active.past' },
      arabic: String(past['3ms']),
      morphemes,
    },
  ]

  if (pronounId === '3ms') return { steps }

  return {
    steps: [
      ...steps,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(past[pronounId]),
        morphemes: past[pronounId].toMorphemes(),
      },
    ],
  }
}
