import { shuffle } from '@pacote/shuffle'
import { stripDiacritics } from '../paradigms/letters'
import { ARABIC_PRONOUNS, PRONOUN_IDS, type PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import { type Difficulty, diacriticsDifficulty, randomPronoun, randomTense, randomVerb } from './difficulty'
import type { Exercise } from './types'

export function verbPronounExercise(difficulty: Difficulty = 'easy'): Exercise {
  const verb = randomVerb(difficulty)
  const tense = randomTense(verb, difficulty)
  const pronoun = randomPronoun(verb, tense, difficulty)
  const [word, options, answer] = buildOptions(verb, tense, pronoun, difficulty)

  return {
    kind: 'verbPronoun',
    promptTranslationKey: 'exercise.prompt.verbPronoun',
    word,
    options,
    answer,
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
