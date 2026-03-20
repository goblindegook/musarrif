import { shuffle } from '@pacote/shuffle'
import { ALIF, ALIF_MAQSURA, isWeakLetter, WAW, YEH } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { buildVerb, type DisplayVerb, type VerbForm, verbs } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomVerb } from './difficulty'
import type { Exercise } from './types'

const TRILITERAL_FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const QUADRILITERAL_FORMS: VerbForm[] = [1, 2, 3, 4]
const WEAK_LETTERS = [WAW, YEH, ALIF, ALIF_MAQSURA] as const
const RANDOM_ROOT_LETTERS = Array.from(new Set(verbs.flatMap((verb) => Array.from(verb.root))))
const DISTRACTOR_LETTERS = Array.from(new Set([...RANDOM_ROOT_LETTERS, ...WEAK_LETTERS]))

export function masdarVerbExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const word = diacriticsDifficulty(random(deriveMasdar(verb)), difficulty)
  const options = buildOptions(verb, difficulty)
  const answerLabel = diacriticsDifficulty(verb.label, difficulty)

  return {
    kind: 'masdarVerb',
    promptTranslationKey: 'exercise.prompt.masdarVerb',
    word,
    options,
    answer: options.indexOf(answerLabel),
  }
}

function buildOptions(verb: DisplayVerb, difficulty: Difficulty): readonly string[] {
  const answer = diacriticsDifficulty(verb.label, difficulty)

  const options = new Set<string>([answer])

  const generators = [
    sameRootDifferentFormDistractor(verb, difficulty),
    singleLetterDistractor(verb, difficulty),
    Array.from(verb.root).some(isWeakLetter) ? weakAlternativeDistractor(verb, difficulty) : null,
    difficulty === 'medium' ? mediumDifferentFormSingleLetterDistractor(verb, difficulty) : null,
  ].filter((generator) => generator != null)

  while (options.size < 4) options.add(random(generators)())

  return shuffle(Array.from(options))
}

function sameRootDifferentFormDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const forms = formPool(verb.root).filter((form) => form !== verb.form)

  return () => {
    const form = random(forms)
    const candidate = buildGeneratedVerb(verb.root, form, verb)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const letters = Array.from(verb.root)
  const weakIndexes = letters.flatMap((letter, index) => (isWeakLetter(letter) ? [index] : []))

  return () => {
    const index = random(weakIndexes)
    const replacements = WEAK_LETTERS.filter((letter) => letter !== letters[index])
    const candidateRoot = [...letters]
    candidateRoot[index] = random(replacements)
    const candidate = buildGeneratedVerb(candidateRoot.join(''), verb.form, verb)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function singleLetterDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const letters = Array.from(verb.root)

  return () => {
    const index = Math.floor(Math.random() * letters.length)
    const replacements = DISTRACTOR_LETTERS.filter((letter) => letter !== letters[index])
    const candidateRoot = [...letters]
    candidateRoot[index] = random(replacements)
    const candidate = buildGeneratedVerb(candidateRoot.join(''), verb.form, verb)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const forms = formPool(verb.root).filter((form) => form !== verb.form)
  const letters = Array.from(verb.root)

  return () => {
    const form = random(forms)
    const index = Math.floor(Math.random() * letters.length)
    const replacements = DISTRACTOR_LETTERS.filter((letter) => letter !== letters[index])
    const candidateRoot = [...letters]
    candidateRoot[index] = random(replacements)
    const candidate = buildGeneratedVerb(candidateRoot.join(''), form, verb)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function formPool(root: string): readonly VerbForm[] {
  return Array.from(root).length === 4 ? QUADRILITERAL_FORMS : TRILITERAL_FORMS
}

function buildGeneratedVerb(root: string, form: VerbForm, template: DisplayVerb): DisplayVerb {
  if (form === 1) return buildVerb(root, 1, template.form === 1 ? template.formPattern : 'fa3ala-yaf3alu')
  return buildVerb(root, form)
}
