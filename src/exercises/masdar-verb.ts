import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { type DisplayVerb, synthesizeVerb, type VerbForm } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomForm, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { singleLetterWordDistractor } from './distractors/word-distractors'
import type { Exercise } from './types'

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

  const generators = [
    sameRootDifferentFormDistractor(verb, difficulty),
    singleLetterDistractor(verb, difficulty),
    Array.from(verb.root).some(isWeakLetter) ? weakAlternativeDistractor(verb, difficulty) : null,
    difficulty === 'medium' ? mediumDifferentFormSingleLetterDistractor(verb, difficulty) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, difficulty)
}

function sameRootDifferentFormDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  return () => {
    const candidate = buildGeneratedVerb(verb.root, randomForm())
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = buildGeneratedVerb(rootGenerator(), verb.form)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function singleLetterDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = buildGeneratedVerb(rootGenerator(), verb.form)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = buildGeneratedVerb(rootGenerator(), randomForm())
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function buildGeneratedVerb(root: string, form: VerbForm): DisplayVerb {
  if (form === 1) return synthesizeVerb(root, 1, 'fa3ala-yaf3alu')
  return synthesizeVerb(root, form)
}
