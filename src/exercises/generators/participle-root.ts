import { resolveNominalExplanationLayers } from '../../paradigms/explanation.ts'
import { deriveActiveParticiple } from '../../paradigms/nominal/participle-active.ts'
import { derivePassiveParticiple } from '../../paradigms/nominal/participle-passive.ts'
import { normalizeHamza } from '../../paradigms/tokens.ts'
import type { Verb } from '../../paradigms/verbs.ts'
import { type DimensionProfile, exerciseDiacritics, random, randomNominalVerb } from '../dimensions.ts'
import {
  mixedWordDistractor,
  randomizeOptions,
  singleLetterWordDistractor,
  weakAlternativeRootDistractor,
  wordSliceDistractor,
} from '../distractors.ts'
import { defineExercise } from '../exercises.ts'
import { buildCardKey, getSrsRootType } from '../srs.ts'

type Participle = 'active' | 'passive'

export const participleRootExercise = defineExercise(
  'participleRoot',
  (profile, constraints) => {
    const verb = randomNominalVerb(profile, constraints)
    const active = String(deriveActiveParticiple(verb))
    const passive = String(derivePassiveParticiple(verb))
    const kind: Participle = passive ? random(['active', 'passive']) : 'active'
    const participle = kind === 'active' ? active : passive
    const options = buildOptions(verb, exerciseDiacritics(participle, profile.diacritics), profile)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.activeParticipleRoot' : 'exercise.prompt.passiveParticipleRoot',
      word: exerciseDiacritics(participle, profile.diacritics),
      spokenWord: participle,
      options: options.map((option) => Array.from(option).join(' ')),
      answer: options.indexOf(verb.root),
      cardKey: buildCardKey('participleRoot', getSrsRootType(verb.root), verb.form),
      explanation: resolveNominalExplanationLayers(
        verb,
        kind === 'active' ? 'activeParticiple' : 'passiveParticiple',
        participle,
      ),
      inputModes: ['multiple-choice'],
    }
  },
  {
    minNominals: 1,
  },
)

function buildOptions(verb: Verb, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(verb.root),
    wordSliceDistractor(word, verb.root.length),
    mixedWordDistractor(word, verb.root.length),
    verb.rootTokens.some((t) => t.isWeak) ? weakAlternativeRootDistractor(verb.root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(verb.root, generators, profile, 4, [normalizeHamza])
}
