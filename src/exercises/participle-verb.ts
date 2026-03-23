import { isWeakLetter } from '../paradigms/letters'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { getRootType } from '../paradigms/roots'
import type { DisplayVerb } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomGeneratedVerb, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { singleLetterWordDistractor } from './distractors/word-distractors'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

type Participle = 'active' | 'passive'

export function participleVerbExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const active = deriveActiveParticiple(verb)
  const passive = derivePassiveParticiple(verb)
  const kind: Participle = passive ? random(['active', 'passive']) : 'active'
  const word = diacriticsDifficulty(kind === 'active' ? active : passive, difficulty)
  const options = buildOptions(verb, difficulty)
  const answerLabel = diacriticsDifficulty(verb.label, difficulty)

  return {
    kind: 'participleVerb',
    promptTranslationKey:
      kind === 'active' ? 'exercise.prompt.activeParticipleVerb' : 'exercise.prompt.passiveParticipleVerb',
    word,
    options,
    answer: options.indexOf(answerLabel),
    cardKey: buildCardKey('participleVerb', getRootType(verb.root), verb.form),
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
    const candidate = randomGeneratedVerb(verb.root)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function weakAlternativeDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function singleLetterDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator(), verb.form)
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}

function mediumDifferentFormSingleLetterDistractor(verb: DisplayVerb, difficulty: Difficulty): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const candidate = randomGeneratedVerb(rootGenerator())
    return diacriticsDifficulty(candidate.label, difficulty)
  }
}
