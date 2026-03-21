import { shuffle } from '@pacote/shuffle'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import { type DisplayVerb, FORM_LABELS, synthesizeVerb, type VerbForm } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { Exercise } from './types'

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function verbFormExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty)
  const [word, options] = buildOptions(verb, tense, pronoun, difficulty)

  return {
    kind: 'verbForm',
    promptTranslationKey: 'exercise.prompt.verbForm',
    word,
    options: options.map((f) => FORM_LABELS[f - 1]),
    answer: options.indexOf(verb.form),
  }
}

function buildOptions(
  verb: DisplayVerb,
  tense: VerbTense,
  pronoun: PronounId,
  difficulty: Difficulty,
): [string, readonly number[]] {
  const word = diacriticsDifficulty(conjugate(verb, tense)[pronoun], difficulty)

  const eligibleForms = FORMS.filter(
    (f) =>
      f !== verb.form &&
      diacriticsDifficulty(
        conjugate(f === 1 ? synthesizeVerb(verb.root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(verb.root, f), tense)[
          pronoun
        ],
        difficulty,
      ) !== word,
  )

  const distractors = shuffle(eligibleForms).slice(0, 3)
  const options = [verb.form, ...distractors].sort((a, b) => a - b)

  return [word, options]
}
