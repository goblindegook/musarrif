import { shuffle } from '@pacote/shuffle'
import { applyDiacriticsPreference } from '../paradigms/letters'
import { conjugate } from '../paradigms/tense'
import type { VerbForm } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { Exercise } from './types'

const FORM_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function formExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty)
  const distrators = shuffle(FORMS.filter((f) => f !== verb.form)).slice(0, 3)
  const options = [verb.form, ...distrators].sort((a, b) => a - b)

  return {
    kind: 'form',
    promptTranslationKey: 'exercise.form.prompt',
    word: applyDiacriticsPreference(conjugate(verb, tense)[pronoun], diacriticsDifficulty(difficulty)),
    options: options.map((f) => FORM_LABELS[f - 1]),
    answer: options.indexOf(verb.form),
  }
}
