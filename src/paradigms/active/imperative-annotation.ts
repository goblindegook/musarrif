import { type AnnotatedForm, buildMorphemes, type MorphemeRole, type TaggedChar } from '../annotation'
import { ALIF, ALIF_HAMZA } from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugateImperative } from './imperative'
import { annotateActivePresentMood } from './present-annotation'

const IMPERATIVE_SUFFIX_COUNTS: Partial<Record<string, number>> = {
  '2ms': 0,
  '2fs': 2,
  '2d': 2,
  '2mp': 4,
  '2fp': 3,
}

const IMPERATIVE_FORM_INFIX_CHARS: Partial<Record<number, number>> = { 10: 4 }

function tagImperativeChars(chars: string[], suffixCount: number, formInfixChars: number): TaggedChar[] {
  const stemCount = chars.length - suffixCount
  const tenseChars = chars[0] === ALIF ? 2 : 0
  const formPrefixChars = chars[0] === ALIF_HAMZA ? 2 : 0
  const formEnd = tenseChars + formPrefixChars + formInfixChars

  return chars.map((char, i) => ({
    char,
    role: i < tenseChars ? 'tense' : i < formEnd ? 'form' : i < stemCount ? 'root' : 'suffix',
  }))
}

export function annotateActiveImperative(verb: Verb, pronounId: PronounId): AnnotatedForm {
  const jussiveAnnotation = annotateActivePresentMood(verb, 'jussive', pronounId)

  const formInfixChars = verb.root.length === 3 ? (IMPERATIVE_FORM_INFIX_CHARS[verb.form] ?? 0) : 0
  const imperativeArabic = conjugateImperative(verb)[pronounId]
  const suffixCount = IMPERATIVE_SUFFIX_COUNTS[pronounId] ?? 0
  const baseMorphemes = buildMorphemes(tagImperativeChars([...imperativeArabic], suffixCount, formInfixChars))
  const jussiveStep = jussiveAnnotation.steps[jussiveAnnotation.steps.length - 1]
  const droppedPersonText = [...jussiveStep.arabic].slice(0, 2).join('')
  const morphemes = [{ text: droppedPersonText, role: 'dropped' as MorphemeRole }, ...baseMorphemes]

  return {
    morphemes,
    steps: [
      ...jussiveAnnotation.steps,
      {
        kind: { type: 'tense', verbTense: 'active.imperative' },
        arabic: imperativeArabic,
        morphemes,
      },
    ],
  }
}
