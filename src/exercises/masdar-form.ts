import { shuffle } from '@pacote/shuffle'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { getRootType } from '../paradigms/roots'
import { FORM_LABELS, synthesizeVerb, type VerbForm } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomVerb } from './difficulty'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export function masdarFormExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const word = diacriticsDifficulty(random(deriveMasdar(verb)), difficulty)

  const eligibleForms = FORMS.filter((form) => {
    if (form === verb.form) return false
    const alternative = form === 1 ? synthesizeVerb(verb.root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(verb.root, form)
    return !deriveMasdar(alternative).some((masdar) => diacriticsDifficulty(masdar, difficulty) === word)
  })

  const distractors = shuffle(eligibleForms).slice(0, 3)
  const options = [verb.form, ...distractors].sort((a, b) => a - b)

  return {
    kind: 'masdarForm',
    promptTranslationKey: 'exercise.prompt.masdarForm',
    word,
    options: options.map((form) => FORM_LABELS[form - 1]),
    answer: options.indexOf(verb.form),
    cardKey: buildCardKey('masdarForm', getRootType(verb.root), verb.form),
  }
}
