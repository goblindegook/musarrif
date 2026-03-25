import { shuffle } from '@pacote/shuffle'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { exerciseDiacritics, randomVerb } from './dimensions'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

export const rootFormVerbExercise = defineExercise('rootFormVerb', (profile, constraints) => {
  const verb = randomVerb(profile, constraints)
  const answerDisplay = exerciseDiacritics(verb.label, profile.diacritics)

  const distractors = shuffle(
    FORMS.filter((form) => {
      if (form === verb.form) return false
      const candidate = synthesizeVerb(verb.root, form)
      return exerciseDiacritics(candidate.label, profile.diacritics) !== answerDisplay
    }),
  )
    .slice(0, 3)
    .map((form) => ({ form, label: synthesizeVerb(verb.root, form).label }))

  const options = shuffle([{ form: verb.form, label: verb.label }, ...distractors])

  return {
    promptTranslationKey: 'exercise.prompt.rootFormVerb',
    promptParams: { form: FORM_LABELS[verb.form - 1] },
    word: Array.from(verb.root).join(' '),
    options: options.map(({ label }) => exerciseDiacritics(label, profile.diacritics)),
    answer: options.findIndex(({ form }) => form === verb.form),
    cardKey: buildCardKey('rootFormVerb', getSrsRootType(verb.root), verb.form),
  }
})
