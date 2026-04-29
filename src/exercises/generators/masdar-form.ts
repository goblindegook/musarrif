import { shuffle } from '@pacote/shuffle'
import { resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar.ts'
import { FORMS, formatFormLabel, synthesizeVerb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, random, randomVerb } from '../dimensions.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const masdarFormExercise = defineExercise(
  'masdarForm',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const word = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)

    const eligibleForms = FORMS.filter((form) => {
      if (form === verb.form) return false
      const alternative = form === 1 ? synthesizeVerb(verb.root, 1, 'a-a') : synthesizeVerb(verb.root, form)
      return !deriveMasdar(alternative).some((masdar) => exerciseDiacritics(masdar, profile.diacritics) === word)
    })

    const distractors = shuffle(eligibleForms).slice(0, 3)
    const options = [verb.form, ...distractors].sort((a, b) => a - b)
    const answer = options.indexOf(verb.form)
    const explanation = resolveNominalExplanationLayers(verb, 'masdar', word)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.masdarForm',
      word,
      options: options.map((form) => formatFormLabel(form, verb.root)),
      answer,
      cardKey: buildCardKey('masdarForm', getSrsRootType(verb.root), verb.form),
      explanations: options.map((_, index) => (index === answer ? null : explanation)),
    }
  },
  {
    minNominals: 2,
  },
)
