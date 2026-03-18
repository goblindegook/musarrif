import { shuffle } from '@pacote/shuffle'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import { type Verb, type VerbForm, verbs } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { Exercise } from './types'

const FORM_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function formExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = difficulty === 'easy' ? '3ms' : randomPronoun(verb, tense, difficulty)
  const [word, options] = buildOptions(verb, tense, pronoun, difficulty)

  return {
    kind: 'form',
    promptTranslationKey: 'exercise.form.prompt',
    word,
    options: options.map((f) => FORM_LABELS[f - 1]),
    answer: options.indexOf(verb.form),
  }
}

function buildOptions(
  verb: Verb,
  tense: VerbTense,
  pronoun: PronounId,
  difficulty: Difficulty,
): [string, readonly number[]] {
  const word = diacriticsDifficulty(conjugate(verb, tense)[pronoun], difficulty)

  const siblings = verbs.filter((v) => v.root === verb.root && v.form !== verb.form)

  const eligibleForms = FORMS.filter((f) => {
    if (f === verb.form) return false
    const sibling = siblings.find((v) => v.form === f)
    if (!sibling) return true
    try {
      return diacriticsDifficulty(conjugate(sibling, tense)[pronoun], difficulty) !== word
    } catch {
      return true
    }
  })

  const distractors = shuffle(eligibleForms).slice(0, 3)
  const options = [verb.form, ...distractors].sort((a, b) => a - b)

  return [word, options]
}
