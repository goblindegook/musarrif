import { shuffle } from '@pacote/shuffle'
import { resolveVerbExplanationLayers } from '../paradigms/explanation'
import { conjugate } from '../paradigms/tense'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { pick } from '../primitives/objects'
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
    const explanation = pick(resolveVerbExplanationLayers(verb, tense, pronoun, word), [
      'rootLetters',
      'form',
      'arabic',
      'rootType',
      'formIPattern',
      'formRoot',
    ])

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
    const answer = options.indexOf(verb.form)

    return {
      dimensions: ['forms', 'rootTypes', 'diacritics'],
      promptTranslationKey: 'exercise.prompt.verbForm',
      word,
      options: options.map((f) => FORM_LABELS[f - 1]),
      answer,
      cardKey: buildCardKey('verbForm', getSrsRootType(verb.root), verb.form, tense, pronoun),
      explanations: options.map((_, index) => (index === answer ? null : explanation)),
    }
  },
)
