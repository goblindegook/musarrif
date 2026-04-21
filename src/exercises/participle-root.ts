import { isWeakLetter } from '../paradigms/letters'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { type DimensionProfile, exerciseDiacritics, random, randomVerb } from './dimensions'
import {
  mixedWordDistractor,
  normalizeRootDistractorHamza,
  randomizeOptions,
  singleLetterWordDistractor,
  weakAlternativeRootDistractor,
  wordSliceDistractor,
} from './distractors'
import { defineExercise } from './exercises'
import { buildCardKey, getSrsRootType } from './srs'

type Participle = 'active' | 'passive'

export const participleRootExercise = defineExercise(
  'participleRoot',
  (profile, constraints) => {
    const verb = randomVerb(profile, constraints)
    const active = deriveActiveParticiple(verb)
    const passive = derivePassiveParticiple(verb)
    const kind: Participle = passive ? random(['active', 'passive']) : 'active'
    const word = exerciseDiacritics(kind === 'active' ? active : passive, profile.diacritics)
    const options = buildOptions(verb.root, word, profile)

    return {
      dimensions: ['nominals', 'forms', 'rootTypes', 'diacritics'],
      promptTranslationKey:
        kind === 'active' ? 'exercise.prompt.activeParticipleRoot' : 'exercise.prompt.passiveParticipleRoot',
      word,
      options: options.map((option) => Array.from(option).join(' ')),
      answer: options.indexOf(verb.root),
      cardKey: buildCardKey('participleRoot', getSrsRootType(verb.root), verb.form),
    }
  },
  {
    minNominals: 1,
  },
)

function buildOptions(root: string, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(root),
    wordSliceDistractor(word, root.length),
    mixedWordDistractor(word, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeRootDistractor(root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(root, generators, profile, 4, [normalizeRootDistractorHamza])
}
