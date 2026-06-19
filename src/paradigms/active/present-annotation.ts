import {
  type AnnotatedForm,
  buildMorphemes,
  type DerivationStep,
  type MorphemeRole,
  PRESENT_MOOD_SUFFIX_COUNTS,
  type TaggedChar,
  tagChars,
} from '../annotation'
import { isDual, type PronounId } from '../pronouns'
import type { Mood } from '../tense'
import { ALIF, ALIF_HAMZA, FATHA, KASRA, NOON } from '../tokens'
import type { Verb } from '../verbs'
import type { MorphemeToken } from '../word'
import { annotatePast } from './past-annotation'
import { conjugatePresentMood } from './present'

const PRESENT_TENSE_PREFIX_CHARS = 2

const PRESENT_FORM_INFIX_CHARS: Partial<Record<number, number>> = { 5: 2, 6: 2, 7: 2, 10: 4 }

const PRESENT_FORM_INFIX_INDEX: Partial<Record<number, number>> = { 3: 4, 6: 6 }

function tagPresentStemChars(chars: string[], verb: Verb): TaggedChar[] {
  const formInfixChars = verb.root.length === 3 ? (PRESENT_FORM_INFIX_CHARS[verb.form] ?? 0) : 0
  const formInfixEnd = PRESENT_TENSE_PREFIX_CHARS + formInfixChars
  const nonContiguousFormIndex = verb.root.length === 3 ? (PRESENT_FORM_INFIX_INDEX[verb.form] ?? -1) : -1

  return chars.map((char, i) => ({
    char,
    role:
      i < PRESENT_TENSE_PREFIX_CHARS
        ? 'agreement'
        : i < formInfixEnd || i === nonContiguousFormIndex
          ? 'measure'
          : 'radical',
  }))
}

function droppedPastPrefix(verb: Verb): string | null {
  if (verb.root.length !== 3) return null
  if (verb.form === 4) return ALIF_HAMZA.raw + FATHA.raw
  if (verb.form === 10) return ALIF.raw + KASRA.raw
  return null
}

function toMorphemes(morphemeTokens: readonly MorphemeToken[]) {
  return morphemeTokens.map((m) => ({ text: String(m).normalize('NFC'), role: m.role }))
}

export function annotateActivePresentMood(verb: Verb, mood: Mood, pronounId: PronounId): AnnotatedForm {
  if (mood !== 'indicative') {
    const indicativeAnnotation = annotateActivePresentMood(verb, 'indicative', pronounId)
    const moodArabic = String(conjugatePresentMood(verb, mood)[pronounId])
    const suffixCount = PRESENT_MOOD_SUFFIX_COUNTS[mood][pronounId]
    const baseMorphemes = buildMorphemes(
      tagChars([...moodArabic], suffixCount, (stem) => tagPresentStemChars(stem, verb)),
    )
    const droppedNoonText = isDual(pronounId)
      ? NOON.raw + KASRA.raw
      : pronounId === '2fs' || pronounId === '2mp' || pronounId === '3mp'
        ? NOON.raw + FATHA.raw
        : null
    const droppedNoon = droppedNoonText ? [{ text: droppedNoonText, role: 'elided' as MorphemeRole }] : []
    const moodMorphemes = [...baseMorphemes, ...droppedNoon]
    return {
      steps: [
        ...indicativeAnnotation.steps,
        {
          kind: { type: 'tense', verbTense: `active.present.${mood}` as const },
          arabic: moodArabic,
          morphemes: moodMorphemes,
        },
      ],
    }
  }

  const pastAnnotation = annotatePast(verb, '3ms')

  const indicativeForms = conjugatePresentMood(verb, 'indicative')
  const stemMorphemes = toMorphemes(indicativeForms['3ms'].morphemes)
  const dropped = droppedPastPrefix(verb)
  const presentIndicativeMorphemes = dropped
    ? [{ text: dropped, role: 'elided' as MorphemeRole }, ...stemMorphemes]
    : stemMorphemes
  const presentIndicativeStep: DerivationStep = {
    kind: { type: 'tense', verbTense: 'active.present.indicative' },
    arabic: String(indicativeForms['3ms']),
    morphemes: presentIndicativeMorphemes,
  }

  if (pronounId === '3ms') {
    return {
      steps: [pastAnnotation.steps[0], pastAnnotation.steps[1], presentIndicativeStep],
    }
  }

  const word = indicativeForms[pronounId]

  return {
    steps: [
      pastAnnotation.steps[0],
      pastAnnotation.steps[1],
      presentIndicativeStep,
      {
        kind: { type: 'pronoun', pronounId },
        arabic: String(word),
        morphemes: toMorphemes(word.morphemes),
      },
    ],
  }
}
