import {
  type AnnotatedForm,
  buildMorphemes,
  type DerivationStep,
  type MorphemeRole,
  PAST_SUFFIX_COUNTS,
  type TaggedChar,
} from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePast } from './past'

export function annotatePast(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const past = conjugatePast(verb)

  const rootStep: DerivationStep = {
    kind: { type: 'root' },
    arabic: verb.root,
    morphemes: [...verb.root].map((char) => ({ text: char, role: 'root' as MorphemeRole })),
  }

  const formMorphemes = buildMorphemes(tagPastStemChars(verb, [...past['3ms']]))
  const formStep: DerivationStep = {
    kind: { type: 'form', form: verb.form },
    arabic: past['3ms'],
    morphemes: formMorphemes,
  }

  const pastStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'active.past' },
    arabic: past['3ms'],
    morphemes: formMorphemes,
  }

  if (pronounId === '3ms') return { steps: [rootStep, formStep, pastStep] }

  const arabic = past[pronounId]
  const chars = [...arabic]
  const stemCount = chars.length - PAST_SUFFIX_COUNTS[pronounId]
  const morphemes = buildMorphemes([
    ...tagPastStemChars(verb, chars.slice(0, stemCount)),
    ...chars.slice(stemCount).map((char) => ({ char, role: 'suffix' as MorphemeRole })),
  ])

  return {
    steps: [
      rootStep,
      formStep,
      pastStep,
      {
        kind: { type: 'pronoun', pronounId },
        arabic,
        morphemes,
      },
    ],
  }
}

function tagPastStemChars(verb: Verb, stemChars: string[]): TaggedChar[] {
  if (verb.root.length !== 3) return stemChars.map((char) => ({ char, role: 'root' }))

  switch (verb.form) {
    case 3:
      return stemChars.map((char, i) => ({ char, role: i === 2 ? 'form' : 'root' }))
    case 4:
    case 5:
      return stemChars.map((char, i) => ({ char, role: i < 2 ? 'form' : 'root' }))
    case 6:
      return stemChars.map((char, i) => ({ char, role: i < 2 || i === 4 ? 'form' : 'root' }))
    case 7:
      return stemChars.map((char, i) => ({ char, role: i < 4 ? 'form' : 'root' }))
    case 8:
      return stemChars.map((char, i) => ({ char, role: i < 2 || (i >= 3 && i < 6) ? 'form' : 'root' }))
    case 9:
      return stemChars.map((char, i) => ({ char, role: i < 2 ? 'form' : 'root' }))
    case 10:
      return stemChars.map((char, i) => ({ char, role: i < 6 ? 'form' : 'root' }))
    default:
      return stemChars.map((char) => ({ char, role: 'root' }))
  }
}
