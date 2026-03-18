import { shuffle } from '@pacote/shuffle'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import { type DisplayVerb, verbs } from '../paradigms/verbs'
import {
  type Difficulty,
  diacriticsDifficulty,
  pronounPool,
  randomPronoun,
  randomTense,
  randomVerb,
  tensePool,
} from './difficulty'
import type { Exercise } from './types'

const PRONOUN_KEYS: Record<PronounId, string> = {
  '1s': 'exercise.conjugation.pronoun.1s',
  '1p': 'exercise.conjugation.pronoun.1p',
  '2ms': 'exercise.conjugation.pronoun.2ms',
  '2fs': 'exercise.conjugation.pronoun.2fs',
  '2d': 'exercise.conjugation.pronoun.2d',
  '2mp': 'exercise.conjugation.pronoun.2mp',
  '2fp': 'exercise.conjugation.pronoun.2fp',
  '3ms': 'exercise.conjugation.pronoun.3ms',
  '3fs': 'exercise.conjugation.pronoun.3fs',
  '3md': 'exercise.conjugation.pronoun.3md',
  '3fd': 'exercise.conjugation.pronoun.3fd',
  '3mp': 'exercise.conjugation.pronoun.3mp',
  '3fp': 'exercise.conjugation.pronoun.3fp',
}

const TENSE_SLUGS: Record<string, string> = {
  past: 'past',
  future: 'future',
  imperative: 'imperative',
  'present.indicative': 'present',
  'present.subjunctive': 'subjunctive',
  'present.jussive': 'jussive',
}

function tensePromptKey(tense: VerbTense, includeVoice: boolean): string {
  const slug = TENSE_SLUGS[tense.slice(1).join('.')]
  if (!includeVoice || tense[1] === 'imperative') return `exercise.conjugation.tense.${slug}`
  return `exercise.conjugation.tense.${tense[0]}.${slug}`
}

function tensesEqual(a: VerbTense, b: VerbTense): boolean {
  return a.join('.') === b.join('.')
}

function getSiblings(verb: DisplayVerb): DisplayVerb[] {
  return verbs.filter((v) => v.root === verb.root && v.form !== verb.form)
}

function tryConjugate(verb: DisplayVerb, tense: VerbTense, pronoun: PronounId): string | null {
  try {
    return conjugate(verb, tense)[pronoun]
  } catch {
    return null
  }
}

function toSet(raws: Array<string | null>, difficulty: Difficulty): Set<string> {
  return new Set(raws.filter((r): r is string => r !== null).map((r) => diacriticsDifficulty(r, difficulty)))
}

function easyCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  siblings: DisplayVerb[],
  difficulty: Difficulty,
): Set<string> {
  return toSet(
    [...siblings, verb].flatMap((v) =>
      tensePool(v, difficulty)
        .filter((t) => !tensesEqual(t, targetTense))
        .flatMap((t) =>
          pronounPool(v, t, difficulty)
            .filter((p) => p !== targetPronoun)
            .map((p) => tryConjugate(v, t, p)),
        ),
    ),
    difficulty,
  )
}

function mediumCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  siblings: DisplayVerb[],
  difficulty: Difficulty,
): Set<string> {
  const typeA = tensePool(verb, difficulty)
    .filter((t) => !tensesEqual(t, targetTense))
    .flatMap((t) =>
      pronounPool(verb, t, difficulty)
        .filter((p) => p !== targetPronoun)
        .map((p) => tryConjugate(verb, t, p)),
    )
  const typeB = siblings.flatMap((sibling) =>
    pronounPool(sibling, targetTense, difficulty)
      .filter((p) => p !== targetPronoun)
      .map((p) => tryConjugate(sibling, targetTense, p)),
  )
  const typeC = siblings.flatMap((sibling) =>
    tensePool(sibling, difficulty)
      .filter((t) => !tensesEqual(t, targetTense))
      .map((t) => tryConjugate(sibling, t, targetPronoun)),
  )
  return toSet([...typeA, ...typeB, ...typeC], difficulty)
}

function hardCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  siblings: DisplayVerb[],
  difficulty: Difficulty,
): Set<string> {
  const type1 = pronounPool(verb, targetTense, difficulty)
    .filter((p) => p !== targetPronoun)
    .map((p) => tryConjugate(verb, targetTense, p))
  const type2 = tensePool(verb, difficulty)
    .filter((t) => !tensesEqual(t, targetTense))
    .map((t) => tryConjugate(verb, t, targetPronoun))
  const type3 = siblings.map((sibling) => tryConjugate(sibling, targetTense, targetPronoun))
  return toSet([...type1, ...type2, ...type3], difficulty)
}

export function conjugationExercise(difficulty: Difficulty): Exercise {
  const verb = randomVerb(difficulty)
  const word = diacriticsDifficulty(verb.label, difficulty)
  const targetTense = randomTense(verb, difficulty)
  const targetPronoun = randomPronoun(verb, targetTense, difficulty)
  const answer = diacriticsDifficulty(conjugate(verb, targetTense)[targetPronoun], difficulty)

  const siblings = getSiblings(verb)
  const candidates =
    difficulty === 'hard'
      ? hardCandidates(verb, targetTense, targetPronoun, siblings, difficulty)
      : difficulty === 'medium'
        ? mediumCandidates(verb, targetTense, targetPronoun, siblings, difficulty)
        : easyCandidates(verb, targetTense, targetPronoun, siblings, difficulty)

  candidates.delete(answer)
  const options = new Set<string>([answer])
  for (const candidate of shuffle(Array.from(candidates))) {
    if (options.size >= 4) break
    options.add(candidate)
  }
  const shuffled = shuffle(Array.from(options))

  return {
    kind: 'conjugation',
    promptTranslationKey: 'exercise.conjugation.prompt',
    promptParams: {
      tense: tensePromptKey(targetTense, difficulty === 'hard'),
      pronoun: PRONOUN_KEYS[targetPronoun],
    },
    word,
    options: shuffled,
    answer: shuffled.indexOf(answer),
  }
}
