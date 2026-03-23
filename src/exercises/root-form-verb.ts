import { shuffle } from '@pacote/shuffle'
import { getRootType } from '../paradigms/roots'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomVerb } from './difficulty'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

export function rootFormVerbExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const answerDisplay = diacriticsDifficulty(verb.label, difficulty)

  const distractors = shuffle(
    FORMS.filter((form) => {
      if (form === verb.form) return false
      const candidate = synthesizeVerb(verb.root, form)
      return diacriticsDifficulty(candidate.label, difficulty) !== answerDisplay
    }),
  )
    .slice(0, 3)
    .map((form) => ({ form, label: synthesizeVerb(verb.root, form).label }))

  const options = shuffle([{ form: verb.form, label: verb.label }, ...distractors])

  return {
    kind: 'rootFormVerb',
    promptTranslationKey: 'exercise.prompt.rootFormVerb',
    promptParams: { form: FORM_LABELS[verb.form - 1] },
    word: Array.from(verb.root).join(' '),
    options: options.map(({ label }) => diacriticsDifficulty(label, difficulty)),
    answer: options.findIndex(({ form }) => form === verb.form),
    cardKey: buildCardKey('rootFormVerb', getRootType(verb.root), verb.form),
  }
}
