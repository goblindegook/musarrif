import { shuffle } from '@pacote/shuffle'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { FORM_LABELS, synthesizeVerb, type VerbForm } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, random, randomVerb } from './difficulty'
import type { Exercise } from './types'

const FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

type Participle = 'active' | 'passive'

export function participleFormExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const active = deriveActiveParticiple(verb)
  const passive = derivePassiveParticiple(verb)
  const kind: Participle = passive ? random(['active', 'passive']) : 'active'
  const word = diacriticsDifficulty(kind === 'active' ? active : passive, difficulty)

  const eligibleForms = FORMS.filter((form) => {
    if (form === verb.form) return false
    const alternative = synthesizeVerb(verb.root, form)
    return kind === 'active'
      ? diacriticsDifficulty(deriveActiveParticiple(alternative), difficulty) !== word
      : diacriticsDifficulty(derivePassiveParticiple(alternative), difficulty) !== word
  })

  const distractors = shuffle(eligibleForms).slice(0, 3)
  const options = [verb.form, ...distractors].sort((a, b) => a - b)

  return {
    kind: 'participleForm',
    promptTranslationKey:
      kind === 'active' ? 'exercise.prompt.activeParticipleForm' : 'exercise.prompt.passiveParticipleForm',
    word,
    options: options.map((form) => FORM_LABELS[form - 1]),
    answer: options.indexOf(verb.form),
  }
}
