import { shuffle } from '@pacote/shuffle'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { exerciseDiacritics, random, randomVerb } from './dimensions'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

type Participle = 'active' | 'passive'

export const participleFormExercise = defineExercise(
  'participleForm',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const active = deriveActiveParticiple(verb)
    const passive = derivePassiveParticiple(verb)
    const kind: Participle = passive ? random(['active', 'passive']) : 'active'
    const word = exerciseDiacritics(kind === 'active' ? active : passive, profile.diacritics)

    const eligibleForms = FORMS.filter((form) => {
      if (form === verb.form) return false
      const alternative = synthesizeVerb(verb.root, form)
      return kind === 'active'
        ? exerciseDiacritics(deriveActiveParticiple(alternative), profile.diacritics) !== word
        : exerciseDiacritics(derivePassiveParticiple(alternative), profile.diacritics) !== word
    })

    const distractors = shuffle(eligibleForms).slice(0, 3)
    const options = [verb.form, ...distractors].sort((a, b) => a - b)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.activeParticipleForm' : 'exercise.prompt.passiveParticipleForm',
      word,
      options: options.map((form) => FORM_LABELS[form - 1]),
      answer: options.indexOf(verb.form),
      cardKey: buildCardKey('participleForm', getSrsRootType(verb.root), verb.form),
    }
  },
  {
    minNominals: 1,
  },
)
