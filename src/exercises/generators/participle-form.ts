import { shuffle } from '@pacote/shuffle'
import { resolveNominalExplanationLayers } from '../../paradigms/explanation.ts'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../paradigms/nominal/participle.ts'
import { formatFormLabel, formsForRoot, getAvailableParadigms, getVerb } from '../../paradigms/verbs.ts'
import { exerciseDiacritics, random, randomNominalVerb } from '../dimensions.ts'
import { defineExercise, type Participle } from '../exercises.ts'

export const participleFormExercise = defineExercise(
  'recognition',
  'participleForm',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const paradigms = getAvailableParadigms(verb)
    const active = String(deriveActiveParticiple(verb))
    const passive = paradigms.includes('passive.participle') ? String(derivePassiveParticiple(verb)) : ''
    const kind: Participle = paradigms.includes('passive.participle') ? random(['active', 'passive']) : 'active'
    const participle = kind === 'active' ? active : passive
    const word = exerciseDiacritics(participle)

    const eligibleForms = formsForRoot(verb.root).filter((form) => {
      if (form === verb.form) return false
      const alternative = getVerb(verb.root, form)
      const available = getAvailableParadigms(alternative)
      return kind === 'active'
        ? available.includes('active.participle') && exerciseDiacritics(deriveActiveParticiple(alternative)) !== word
        : available.includes('passive.participle') && exerciseDiacritics(derivePassiveParticiple(alternative)) !== word
    })

    const distractors = shuffle(eligibleForms).slice(0, 3)
    const options = [verb.form, ...distractors].sort((a, b) => a - b)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes'],
      participle: kind,
      word,
      spokenWord: participle,
      options: options.map((form) => formatFormLabel(form, verb.root)),
      answer: options.indexOf(verb.form),
      card: { root: verb.root, form: verb.form },
      explanation: resolveNominalExplanationLayers(
        verb,
        kind === 'active' ? 'activeParticiple' : 'passiveParticiple',
        participle,
      ),
      inputModes: ['multiple-choice'],
    }
  },
  { minNominals: 1 },
)
