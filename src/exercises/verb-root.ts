import { isWeakLetter } from '../paradigms/letters'
import { getRootType } from '../paradigms/roots'
import { conjugate } from '../paradigms/tense'
import { type DimensionProfile, exerciseDiacritics, randomPronoun, randomTense, randomVerb } from './dimensions'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

export function verbRootExercise(profile: DimensionProfile, constraints?: CardConstraints): Exercise {
  const verb = randomVerb(profile, constraints)
  const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
  const pronoun = constraints?.pronoun ?? randomPronoun(verb, tense, profile.pronouns)
  const word = exerciseDiacritics(conjugate(verb, tense)[pronoun], profile.diacritics)
  const options = buildOptions(verb.root, word, profile)

  return {
    kind: 'verbRoot',
    promptTranslationKey: 'exercise.prompt.verbRoot',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
    cardKey: buildCardKey('verbRoot', getRootType(verb.root), verb.form, tense, pronoun),
  }
}

function buildOptions(answer: string, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(answer),
    wordSliceDistractor(word, answer.length),
    mixedWordDistractor(word, answer.length),
    Array.from(answer).some(isWeakLetter) ? weakAlternativeRootDistractor(answer) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(answer, generators, profile)
}
