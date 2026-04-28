import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation.ts'
import { FORMS, formatFormLabel, synthesizeVerb } from '../../paradigms/verbs.ts'
import { pick } from '../../primitives/objects.ts'
import { exerciseDiacritics, randomVerb } from '../dimensions.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const rootFormVerbExercise = defineExercise('rootFormVerb', (profile, constraints) => {
  const verb = randomVerb(profile, constraints)
  const baseExplanation = resolveVerbExplanationLayers(verb, 'active.past', '3ms', verb.label)
  const explanation = pick(baseExplanation, ['rootLetters', 'form', 'arabic', 'rootType', 'vowels', 'formRoot'])

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
  const answer = options.findIndex(({ form }) => form === verb.form)

  return {
    dimensions: ['forms', 'rootTypes', 'diacritics'],
    promptTranslationKey: 'exercise.prompt.rootFormVerb',
    promptParams: { form: formatFormLabel(verb.form, verb.root) },
    word: Array.from(verb.root).join(' '),
    options: options.map(({ label }) => exerciseDiacritics(label, profile.diacritics)),
    answer,
    cardKey: buildCardKey('rootFormVerb', getSrsRootType(verb.root), verb.form),
    explanations: options.map((_, index) => (index === answer ? null : explanation)),
  }
})
