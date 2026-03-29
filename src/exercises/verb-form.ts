import { shuffle } from '@pacote/shuffle'
import { conjugate } from '../paradigms/tense'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, randomPronoun, randomTense, randomVerb } from './dimensions'
import { defineExercise } from './exercises'
import type { CardConstraints } from './srs'
import { buildCardKey, getSrsRootType } from './srs'

export const verbFormExercise = defineExercise(
  'verbForm',
  (profile: DimensionProfile, constraints?: CardConstraints) => {
    const verb = randomVerb(profile, constraints)
    const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const pronoun =
      constraints?.pronoun ?? (profile.pronouns === 0 ? '3ms' : randomPronoun(verb, tense, profile.pronouns))
    const word = exerciseDiacritics(conjugate(verb, tense)[pronoun], profile.diacritics)

    const eligibleForms = FORMS.filter(
      (f) =>
        f !== verb.form &&
        exerciseDiacritics(
          conjugate(f === 1 ? synthesizeVerb(verb.root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(verb.root, f), tense)[
            pronoun
          ],
          profile.diacritics,
        ) !== word,
    )

    const distractors = shuffle(eligibleForms).slice(0, 3)
    const options = [verb.form, ...distractors].sort((a, b) => a - b)

    return {
      dimensions: ['forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbForm',
      word,
      options: options.map((f) => FORM_LABELS[f - 1]),
      answer: options.indexOf(verb.form),
      cardKey: buildCardKey('verbForm', getSrsRootType(verb.root), verb.form, tense, pronoun),
    }
  },
)
