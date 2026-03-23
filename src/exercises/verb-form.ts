import { shuffle } from '@pacote/shuffle'
import { getRootType } from '../paradigms/roots'
import { conjugate } from '../paradigms/tense'
import { FORM_LABELS, synthesizeVerb, type VerbForm } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function verbFormExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const tense = constraints?.tense ?? randomTense(verb, difficulty)
  const pronoun = constraints?.pronoun ?? (difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty))
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

  return {
    kind: 'verbForm',
    promptTranslationKey: 'exercise.prompt.verbForm',
    word,
    options: options.map((f) => FORM_LABELS[f - 1]),
    answer: options.indexOf(verb.form),
    cardKey: buildCardKey('verbForm', getRootType(verb.root), verb.form, tense, pronoun),
  }
}
