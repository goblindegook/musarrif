import { isWeakLetter } from '../paradigms/letters'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { getRootType } from '../paradigms/roots'
import type { DisplayVerb } from '../paradigms/verbs'
import { synthesizeVerb } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomGeneratedVerb, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { singleLetterWordDistractor } from './distractors/word-distractors'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

type Participle = 'active' | 'passive'

export function verbParticipleExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const active = deriveActiveParticiple(verb)
  const passive = derivePassiveParticiple(verb)
  const kind: Participle = passive ? random(['active', 'passive']) : 'active'
  const answer = diacriticsDifficulty(kind === 'active' ? active : passive, difficulty)
  const word = diacriticsDifficulty(verb.label, difficulty)
  const options = buildOptions(verb, answer, kind, difficulty)

  return {
    kind: 'verbParticiple',
    promptTranslationKey:
      kind === 'active' ? 'exercise.prompt.verbActiveParticiple' : 'exercise.prompt.verbPassiveParticiple',
    word,
    options,
    answer: options.indexOf(answer),
    cardKey: buildCardKey('verbParticiple', getRootType(verb.root), verb.form),
  }
}

function buildOptions(verb: DisplayVerb, answer: string, kind: Participle, difficulty: Difficulty): readonly string[] {
  const generators = [
    formDistractor(verb, kind, difficulty),
    rootDistractor(verb, kind, difficulty),
    Array.from(verb.root).some(isWeakLetter) ? weakRootDistractor(verb, kind, difficulty) : null,
    singleLetterWordDistractor(answer),
    oppositeParticipleDistractor(verb, kind, difficulty),
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, difficulty)
}

function formDistractor(verb: DisplayVerb, kind: Participle, difficulty: Difficulty): () => string {
  return () => {
    const alternative = randomGeneratedVerb(verb.root)
    const participle = kind === 'active' ? deriveActiveParticiple(alternative) : derivePassiveParticiple(alternative)
    return diacriticsDifficulty(participle, difficulty)
  }
}

function rootDistractor(verb: DisplayVerb, kind: Participle, difficulty: Difficulty): () => string {
  const rootGenerator = singleLetterWordDistractor(verb.root)

  return () => {
    const alternative = randomGeneratedVerb(rootGenerator(), verb.form)
    const participle = kind === 'active' ? deriveActiveParticiple(alternative) : derivePassiveParticiple(alternative)
    return diacriticsDifficulty(participle, difficulty)
  }
}

function weakRootDistractor(verb: DisplayVerb, kind: Participle, difficulty: Difficulty): () => string {
  const rootGenerator = weakAlternativeRootDistractor(verb.root)

  return () => {
    const alternative = randomGeneratedVerb(rootGenerator(), verb.form)
    const participle = kind === 'active' ? deriveActiveParticiple(alternative) : derivePassiveParticiple(alternative)
    return diacriticsDifficulty(participle, difficulty)
  }
}

function oppositeParticipleDistractor(verb: DisplayVerb, kind: Participle, difficulty: Difficulty): () => string {
  const alternative = synthesizeVerb(verb.root, verb.form)
  return () =>
    diacriticsDifficulty(
      kind === 'active' ? derivePassiveParticiple(alternative) : deriveActiveParticiple(alternative),
      difficulty,
    )
}
