import { shuffle } from '@pacote/shuffle'
import { conjugate } from '../../paradigms/conjugation'
import { resolveVerbExplanationLayers } from '../../paradigms/explanation'
import { formatFormLabel, formsForRoot, synthesizeVerb } from '../../paradigms/verbs.ts'
import {
  type DimensionProfile,
  exerciseDiacritics,
  normalizeExercisePronoun,
  randomPronoun,
  randomTense,
  randomVerb,
} from '../dimensions.ts'
import { defineExercise } from '../exercises.ts'
import type { CardConstraints } from '../srs.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

export const verbFormExercise = defineExercise(
  'verbForm',
  (profile: DimensionProfile, constraints?: CardConstraints) => {
    const verb = randomVerb(profile, constraints)
    const tense = constraints?.tense ?? randomTense(verb, profile.tenses)
    const pronoun = normalizeExercisePronoun(
      verb,
      tense,
      constraints?.pronoun ?? (profile.pronouns === 0 ? '3ms' : randomPronoun(verb, tense, profile.pronouns)),
    )
    const conjugatedVerb = String(conjugate(verb, tense)[pronoun])
    const word = exerciseDiacritics(conjugatedVerb, profile.diacritics)
    const explanation = resolveVerbExplanationLayers(verb, tense, pronoun, word)

    const eligibleForms = formsForRoot(verb.root).filter(
      (f) =>
        f !== verb.form &&
        exerciseDiacritics(
          String(
            conjugate(f === 1 ? synthesizeVerb(verb.root, 1, 'a-a') : synthesizeVerb(verb.root, f), tense)[pronoun],
          ),
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
      spokenWord: conjugatedVerb,
      options: options.map((form) => formatFormLabel(form, verb.root)),
      answer,
      cardKey: buildCardKey('verbForm', getSrsRootType(verb.root), verb.form, tense, pronoun),
      explanation,
      inputModes: ['multiple-choice'],
    }
  },
)
