import { shuffle } from '@pacote/shuffle'
import { deriveMasdar } from '../paradigms/nominal/masdar'
import { getRootType } from '../paradigms/roots'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { exerciseDiacritics, random, randomVerb } from './dimensions'
import { defineExercise } from './exercises'
import { buildCardKey } from './srs'

export const masdarFormExercise = defineExercise(
  'masdarForm',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const word = exerciseDiacritics(random(deriveMasdar(verb)), profile.diacritics)

    const eligibleForms = FORMS.filter((form) => {
      if (form === verb.form) return false
      const alternative = form === 1 ? synthesizeVerb(verb.root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(verb.root, form)
      return !deriveMasdar(alternative).some((masdar) => exerciseDiacritics(masdar, profile.diacritics) === word)
    })

    const distractors = shuffle(eligibleForms).slice(0, 3)
    const options = [verb.form, ...distractors].sort((a, b) => a - b)

    return {
      promptTranslationKey: 'exercise.prompt.masdarForm',
      word,
      options: options.map((form) => FORM_LABELS[form - 1]),
      answer: options.indexOf(verb.form),
      cardKey: buildCardKey('masdarForm', getRootType(verb.root), verb.form),
    }
  },
  {
    minNominals: 2,
  },
)
