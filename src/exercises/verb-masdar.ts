import { shuffle } from '@pacote/shuffle'
import { isWeakLetter } from '../paradigms/letters'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import type { DisplayVerb } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomGeneratedVerb, randomVerb } from './difficulty'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { singleLetterWordDistractor } from './distractors/word-distractors'
import type { Exercise } from './types'

export function verbMasdarExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const masdars = deriveMasdar(verb).map((m) => diacriticsDifficulty(m, difficulty))
  const answer = random(masdars)
  const word = diacriticsDifficulty(verb.label, difficulty)
  const options = buildOptions(verb, answer, masdars, difficulty)

  return {
    kind: 'verbMasdar',
    promptTranslationKey: 'exercise.prompt.verbMasdar',
    word,
    options,
    answer: options.indexOf(answer),
  }
}

function buildOptions(
  verb: DisplayVerb,
  answer: string,
  masdars: readonly string[],
  difficulty: Difficulty,
): readonly string[] {
  const generators = [
    formDistractor(verb, difficulty),
    rootDistractor(verb, difficulty),
    Array.from(verb.root).some(isWeakLetter) ? weakRootDistractor(verb, difficulty) : null,
    singleLetterWordDistractor(answer),
  ].filter((g) => g != null)

  const options = new Set<string>([answer])

  while (options.size < 4) {
    const candidate = diacriticsDifficulty(random(generators)(), difficulty)
    if (!masdars.includes(candidate)) options.add(candidate)
  }

  return shuffle(Array.from(options))
}

function formDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  return () => {
    const candidate = randomGeneratedVerb(verb.root)
    return diacriticsDifficulty(random(deriveMasdar(candidate)), difficulty)
  }
}

function rootDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return diacriticsDifficulty(random(deriveMasdar(candidate)), difficulty)
  }
}

function weakRootDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return diacriticsDifficulty(random(deriveMasdar(candidate)), difficulty)
  }
}
