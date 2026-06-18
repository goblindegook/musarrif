import {
  type AnnotatedForm,
  buildMorphemes,
  type DerivationStep,
  PAST_SUFFIX_COUNTS,
  type TaggedChar,
} from '../annotation'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import type { MorphemeToken } from '../word'
import { conjugatePast, conjugatePastFormI } from './past'

export function annotatePast(verb: Verb, pronounId: PronounId): AnnotatedForm {
  if (verb.form === 1 && verb.root.length === 3) {
    const words = conjugatePastFormI(verb)
    const formMorphemes = toMorphemes(words['3ms'].morphemes)

    const rootStep: DerivationStep = {
      kind: { type: 'root' },
      arabic: verb.root,
      morphemes: [...verb.root].map((char) => ({ text: char, role: 'radical' as const })),
    }
    const formStep: DerivationStep = {
      kind: { type: 'form', form: 1 },
      arabic: words['3ms'].toString(),
      morphemes: formMorphemes,
    }
    const pastStep: DerivationStep = {
      kind: { type: 'tense', verbTense: 'active.past' },
      arabic: words['3ms'].toString(),
      morphemes: formMorphemes,
    }

    if (pronounId === '3ms') return { steps: [rootStep, formStep, pastStep] }

    const word = words[pronounId]
    return {
      steps: [
        rootStep,
        formStep,
        pastStep,
        {
          kind: { type: 'pronoun', pronounId },
          arabic: word.toString(),
          morphemes: toMorphemes(word.morphemes),
        },
      ],
    }
  }

  const past = conjugatePast(verb)

  const rootStep: DerivationStep = {
    kind: { type: 'root' },
    arabic: verb.root,
    morphemes: [...verb.root].map((char) => ({ text: char, role: 'radical' as const })),
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
    ...chars.slice(stemCount).map((char) => ({ char, role: 'agreement' as const })),
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

function toMorphemes(morphemeTokens: readonly MorphemeToken[]) {
  return morphemeTokens.map((m) => ({ text: String(m), role: m.role }))
}

function tagPastStemChars(verb: Verb, stemChars: string[]): TaggedChar[] {
  if (verb.root.length !== 3) return stemChars.map((char) => ({ char, role: 'radical' }))

  switch (verb.form) {
    case 3:
      return stemChars.map((char, i) => ({ char, role: i === 2 ? 'measure' : 'radical' }))
    case 4:
    case 5:
      return stemChars.map((char, i) => ({ char, role: i < 2 ? 'measure' : 'radical' }))
    case 6:
      return stemChars.map((char, i) => ({ char, role: i < 2 || i === 4 ? 'measure' : 'radical' }))
    case 7:
      return stemChars.map((char, i) => ({ char, role: i < 4 ? 'measure' : 'radical' }))
    case 8:
      return stemChars.map((char, i) => ({ char, role: i < 2 || (i >= 3 && i < 6) ? 'measure' : 'radical' }))
    case 9:
      return stemChars.map((char, i) => ({ char, role: i < 2 ? 'measure' : 'radical' }))
    case 10:
      return stemChars.map((char, i) => ({ char, role: i < 6 ? 'measure' : 'radical' }))
    default:
      return stemChars.map((char) => ({ char, role: 'radical' }))
  }
}
