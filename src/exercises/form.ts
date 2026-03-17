import { shuffle } from '@pacote/shuffle'
import { applyDiacriticsPreference } from '../paradigms/letters'
import type { PronounId } from '../paradigms/pronouns'
import { type Verb, type VerbForm, verbs } from '../paradigms/verbs'
import { ACTIVE_TENSES, conjugate, random, randomPronoun, supportedTenses, type TenseConfig } from './selectors'
import type { Difficulty, Exercise } from './types'

const FORM_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const EASY_TENSES: TenseConfig[] = [
  { voice: 'active', tense: 'past' },
  { voice: 'active', tense: 'present', mood: 'indicative' },
]

export function formExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = verbs[Math.floor(Math.random() * verbs.length)]
  const incorrectAnswers = shuffle(FORMS.filter((f) => f !== verb.form)).slice(0, 3)
  const options = [verb.form, ...incorrectAnswers].sort((a, b) => a - b).map((f) => FORM_LABELS[f - 1])

  return {
    kind: 'form',
    promptTranslationKey: 'exercise.form.prompt',
    word: randomConjugation(verb, difficulty),
    options,
    answer: options.indexOf(FORM_LABELS[verb.form - 1]),
  }
}

function randomConjugation(verb: Verb, difficulty: Difficulty): string {
  if (difficulty === 'easy') {
    const config = random(EASY_TENSES)
    return conjugate(verb, config)['3ms']
  }

  if (difficulty === 'medium') {
    const tense = random(ACTIVE_TENSES)
    const pronounId: PronounId = tense.tense === 'imperative' ? '2ms' : '3ms'
    return applyDiacriticsPreference(conjugate(verb, tense)[pronounId], 'some')
  }

  const config = random(supportedTenses(verb))

  return applyDiacriticsPreference(conjugate(verb, config)[randomPronoun(verb, config)], 'none')
}
