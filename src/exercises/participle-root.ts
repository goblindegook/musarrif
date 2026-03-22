import { isWeakLetter } from '../paradigms/letters'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { type Difficulty, diacriticsDifficulty, random, randomVerb } from './difficulty'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { Exercise } from './types'

type Participle = 'active' | 'passive'

export function participleRootExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const active = deriveActiveParticiple(verb)
  const passive = derivePassiveParticiple(verb)
  const kind: Participle = passive ? random(['active', 'passive']) : 'active'
  const word = diacriticsDifficulty(kind === 'active' ? active : passive, difficulty)
  const options = buildOptions(verb.root, word, difficulty)

  return {
    kind: 'participleRoot',
    promptTranslationKey:
      kind === 'active' ? 'exercise.prompt.activeParticipleRoot' : 'exercise.prompt.passiveParticipleRoot',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
  }
}

function buildOptions(root: string, word: string, difficulty: Difficulty): readonly string[] {
  const generators = [
    singleLetterWordDistractor(root),
    wordSliceDistractor(word, root.length),
    mixedWordDistractor(word, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeRootDistractor(root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(root, generators, difficulty)
}
