import { isWeakLetter } from '../paradigms/letters'
import { deriveActiveParticiple } from '../paradigms/nominal/participle-active'
import { derivePassiveParticiple } from '../paradigms/nominal/participle-passive'
import { getRootType } from '../paradigms/roots'
import { type DimensionProfile, exerciseDiacritics, random, randomVerb } from './dimensions'
import { randomizeOptions } from './distractors/distractors'
import { weakAlternativeRootDistractor } from './distractors/root-distractors'
import { mixedWordDistractor, singleLetterWordDistractor, wordSliceDistractor } from './distractors/word-distractors'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

type Participle = 'active' | 'passive'

export function participleRootExercise(profile: DimensionProfile, constraints?: CardConstraints): Exercise {
  const verb = randomVerb(profile, constraints)
  const active = deriveActiveParticiple(verb)
  const passive = derivePassiveParticiple(verb)
  const kind: Participle = passive ? random(['active', 'passive']) : 'active'
  const word = exerciseDiacritics(kind === 'active' ? active : passive, profile.diacritics)
  const options = buildOptions(verb.root, word, profile)

  return {
    kind: 'participleRoot',
    promptTranslationKey:
      kind === 'active' ? 'exercise.prompt.activeParticipleRoot' : 'exercise.prompt.passiveParticipleRoot',
    word,
    options: options.map((option) => Array.from(option).join(' ')),
    answer: options.indexOf(verb.root),
    cardKey: buildCardKey('participleRoot', getRootType(verb.root), verb.form),
  }
}

function buildOptions(root: string, word: string, profile: DimensionProfile): readonly string[] {
  const generators = [
    singleLetterWordDistractor(root),
    wordSliceDistractor(word, root.length),
    mixedWordDistractor(word, root.length),
    Array.from(root).some(isWeakLetter) ? weakAlternativeRootDistractor(root) : null,
  ].filter((generator) => generator != null)

  return randomizeOptions(root, generators, profile)
}
