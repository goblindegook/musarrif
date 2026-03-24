import { shuffle } from '@pacote/shuffle'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { getRootType } from '../paradigms/roots'
import { FORM_LABELS, FORMS, synthesizeVerb } from '../paradigms/verbs'
import { type DimensionProfile, exerciseDiacritics, random, randomVerb } from './dimensions'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

type Participle = 'active' | 'passive'

export function participleFormExercise(profile: DimensionProfile, constraints?: CardConstraints): Exercise {
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
    kind: 'participleForm',
    promptTranslationKey:
      kind === 'active' ? 'exercise.prompt.activeParticipleForm' : 'exercise.prompt.passiveParticipleForm',
    word,
    options: options.map((form) => FORM_LABELS[form - 1]),
    answer: options.indexOf(verb.form),
    cardKey: buildCardKey('participleForm', getRootType(verb.root), verb.form),
  }
}
