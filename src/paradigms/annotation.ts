// src/paradigms/annotation.ts

import { annotateActiveFuture } from './active/future-annotation'
import { annotateActiveImperative } from './active/imperative-annotation'
import { annotatePast } from './active/past-annotation'
import { annotateActivePresentMood } from './active/present-annotation'
import { SHADDA, SUKOON } from './letters'
import { annotatePassiveFuture } from './passive/future-annotation'
import { annotatePassivePast } from './passive/past-annotation'
import { annotatePassivePresentMood } from './passive/present-annotation'
import type { PronounId } from './pronouns'
import type { VerbTense } from './tense'
import type { Verb, VerbForm } from './verbs'

export type MorphemeRole = 'root' | 'form' | 'tense' | 'suffix' | 'dropped'

export interface Morpheme {
  text: string
  role: MorphemeRole
}

export type DerivationStepKind =
  | { type: 'root' }
  | { type: 'form'; form: VerbForm }
  | { type: 'tense'; verbTense: VerbTense }
  | { type: 'pronoun'; pronounId: PronounId }

export interface DerivationStep {
  kind: DerivationStepKind
  arabic: string
  morphemes: Morpheme[]
}

export interface AnnotatedForm {
  morphemes: Morpheme[]
  steps: DerivationStep[]
}

export interface TaggedChar {
  char: string
  role: MorphemeRole
}

/**
 * Build a `Morpheme[]` from a flat tagged-character array.
 *
 * - Collapses `c + SUKOON + c` (same consonant) → `c + SHADDA`, preserving role.
 * - Groups consecutive same-role characters into a single morpheme.
 * - NFC-normalises each morpheme text.
 */
export function buildMorphemes(tagged: TaggedChar[]): Morpheme[] {
  // 1. Handle gemination: c + SUKOON + c → c + SHADDA (same role)
  const processed: TaggedChar[] = []
  for (let i = 0; i < tagged.length; i++) {
    if (i + 2 < tagged.length && tagged[i + 1].char === SUKOON && tagged[i].char === tagged[i + 2].char) {
      processed.push(tagged[i])
      processed.push({ char: SHADDA, role: tagged[i].role })
      i += 2
    } else {
      processed.push(tagged[i])
    }
  }

  // 2. Group consecutive same-role characters
  const morphemes: Morpheme[] = []
  let current: { text: string; role: MorphemeRole } | null = null
  for (const { char, role } of processed) {
    if (current && current.role === role) {
      current.text += char
    } else {
      if (current) morphemes.push(current)
      current = { text: char, role }
    }
  }
  if (current) morphemes.push(current)

  return morphemes.filter((m) => m.text.length > 0).map((m) => ({ text: m.text.normalize('NFC'), role: m.role }))
}

export function annotate(verb: Verb, verbTense: VerbTense, pronounId: PronounId): AnnotatedForm | null {
  switch (verbTense) {
    case 'active.past':
      return annotatePast(verb, pronounId)
    case 'active.present.indicative':
      return annotateActivePresentMood(verb, 'indicative', pronounId)
    case 'active.present.subjunctive':
      return annotateActivePresentMood(verb, 'subjunctive', pronounId)
    case 'active.present.jussive':
      return annotateActivePresentMood(verb, 'jussive', pronounId)
    case 'active.future':
      return annotateActiveFuture(verb, pronounId)
    case 'active.imperative':
      return annotateActiveImperative(verb, pronounId)
    case 'passive.past':
      return annotatePassivePast(verb, pronounId)
    case 'passive.present.indicative':
      return annotatePassivePresentMood(verb, 'indicative', pronounId)
    case 'passive.present.subjunctive':
      return annotatePassivePresentMood(verb, 'subjunctive', pronounId)
    case 'passive.present.jussive':
      return annotatePassivePresentMood(verb, 'jussive', pronounId)
    case 'passive.future':
      return annotatePassiveFuture(verb, pronounId)
    default:
      return null
  }
}
