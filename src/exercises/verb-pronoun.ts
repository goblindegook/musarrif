import { shuffle } from '@pacote/shuffle'
import { stripDiacritics } from '../paradigms/letters'
import { ARABIC_PRONOUNS, PRONOUN_IDS, type PronounId } from '../paradigms/pronouns'
import { getRootType } from '../paradigms/roots'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { CardConstraints } from './srs'
import { buildCardKey } from './srs'
import type { Exercise } from './types'

export function verbPronounExercise(difficulty: Difficulty = 'easy', constraints?: CardConstraints): Exercise {
  const verb = randomVerb(constraints)
  const tense = constraints?.tense ?? randomTense(verb, difficulty)
  const pronoun = constraints?.pronoun ?? randomPronoun(verb, tense, difficulty)
  const [word, options, answer] = buildOptions(verb, tense, pronoun, difficulty)

  return {
    kind: 'verbPronoun',
    promptTranslationKey: 'exercise.prompt.verbPronoun',
    word,
    options,
    answer,
    cardKey: buildCardKey('verbPronoun', getRootType(verb.root), verb.form, tense, pronoun),
  }
}

function buildOptions(
  verb: DisplayVerb,
  tense: VerbTense,
  pronoun: PronounId,
  difficulty: Difficulty,
): [string, readonly string[], number] {
  const conjugated = conjugate(verb, tense)
  const word = diacriticsDifficulty(conjugated[pronoun], difficulty)

  const allPronouns = difficulty === 'easy' ? PRONOUN_IDS.filter((p) => !p.includes('d')) : PRONOUN_IDS

  const isSameConjugation = (p: PronounId): boolean => {
    const form = diacriticsDifficulty(conjugated[p], difficulty)
    return difficulty === 'hard' ? stripDiacritics(form) === stripDiacritics(word) : form === word
  }

  const eligible = allPronouns.filter(
    (p) => p !== pronoun && !isSameConjugation(p) && ARABIC_PRONOUNS[p] !== ARABIC_PRONOUNS[pronoun],
  )

  const distractors = shuffle(eligible).slice(0, 3)
  const allOptions = shuffle([pronoun, ...distractors])

  return [word, allOptions.map((p) => ARABIC_PRONOUNS[p]), allOptions.indexOf(pronoun)]
}
