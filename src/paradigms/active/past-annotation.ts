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
  const allForms = conjugatePast(verb)
  const thirdMs = allForms['3ms']

  const rootStep: DerivationStep = {
    kind: { type: 'root' },
    arabic: verb.root,
    morphemes: [...verb.root].map((char) => ({ text: char, role: 'root' as MorphemeRole })),
  }

  const formMorphemes = buildMorphemes(tagPastStemChars(verb, [...thirdMs]))
  const formStep: DerivationStep = {
    kind: { type: 'form', form: verb.form },
    arabic: thirdMs,
    morphemes: formMorphemes,
  }

  const pastStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'active.past' },
    arabic: thirdMs,
    morphemes: formMorphemes,
  }

  if (pronounId === '3ms') {
    return { morphemes: formMorphemes, steps: [rootStep, formStep, pastStep] }
  }

  const finalArabic = allForms[pronounId]
  const finalChars = [...finalArabic]
  const suffixCount = PAST_SUFFIX_COUNTS[pronounId]
  const stemCount = finalChars.length - suffixCount
  const taggedStem = tagPastStemChars(verb, finalChars.slice(0, stemCount))
  const taggedSuffix: TaggedChar[] = finalChars
    .slice(stemCount)
    .map((char) => ({ char, role: 'suffix' as MorphemeRole }))
  const morphemes = buildMorphemes([...taggedStem, ...taggedSuffix])

  return {
    morphemes,
    steps: [
      rootStep,
      formStep,
      pastStep,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: finalArabic,
        morphemes,
      },
    ],
  }
}

function tagPastStemChars(verb: Verb, stemChars: string[]): TaggedChar[] {
  if (verb.root.length === 3 && verb.form === 3) {
    return stemChars.map((char, i) => ({
      char,
      role: i === 2 ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  if (verb.root.length === 3 && verb.form === 4) {
    return stemChars.map((char, i) => ({
      char,
      role: i < 2 ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  if (verb.root.length === 3 && (verb.form === 5 || verb.form === 6)) {
    const alif = verb.form === 6
    return stemChars.map((char, i) => ({
      char,
      role: i < 2 || (alif && i === 4) ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  if (verb.root.length === 3 && verb.form === 7) {
    return stemChars.map((char, i) => ({
      char,
      role: i < 4 ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  if (verb.root.length === 3 && verb.form === 8) {
    return stemChars.map((char, i) => ({
      char,
      role: i < 2 || (i >= 3 && i < 6) ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  if (verb.root.length === 3 && verb.form === 9) {
    return stemChars.map((char, i) => ({
      char,
      role: i < 2 ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  if (verb.root.length === 3 && verb.form === 10) {
    return stemChars.map((char, i) => ({
      char,
      role: i < 6 ? ('form' as MorphemeRole) : ('root' as MorphemeRole),
    }))
  }
  return stemChars.map((char) => ({ char, role: 'root' as MorphemeRole }))
}
