import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation.ts'
import { spell } from '../../paradigms/tokens.ts'
import { FORMS, formatFormLabel, synthesizeVerb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, randomVerb } from '../dimensions.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const rootFormVerbExercise = defineExercise('rootFormVerb', (profile, constraints) => {
  const verb = randomVerb(profile, constraints)
  const explanation = resolveVerbExplanationLayers(verb, 'active.past', '3ms', verb.lemma)

  const answerDisplay = exerciseDiacritics(verb.lemma, profile.diacritics)

  const distractors = shuffle(
    FORMS.filter((form) => {
      if (form === verb.form) return false
      const candidate = synthesizeVerb(verb.root, form)
      return exerciseDiacritics(candidate.lemma, profile.diacritics) !== answerDisplay
    }),
  )
    .slice(0, 3)
    .map((form) => ({ form, label: synthesizeVerb(verb.root, form).lemma }))

  const options = shuffle([{ form: verb.form, label: verb.lemma }, ...distractors])
  const answer = options.findIndex(({ form }) => form === verb.form)

  return {
    dimensions: ['forms', 'rootTypes', 'diacritics'],
    promptTranslationKey: 'exercise.prompt.rootFormVerb',
    promptParams: { form: formatFormLabel(verb.form, verb.root) },
    word: Array.from(verb.root).join(' '),
    spokenWord: spell(verb.root).join(', '),
    options: options.map(({ label }) => exerciseDiacritics(label, profile.diacritics)),
    answer,
    cardKey: buildCardKey('rootFormVerb', getSrsRootType(verb.root), verb.form),
    explanation,
    supportsTyping: true,
  }
})
