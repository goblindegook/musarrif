import { shuffle } from '@pacote/shuffle'
import type { PronounId } from '../paradigms/pronouns'
import { conjugate, type VerbTense } from '../paradigms/tense'
import { type DisplayVerb, synthesizeVerb, type VerbForm } from '../paradigms/verbs'
import {
  ACTIVE_TENSES,
  type Difficulty,
  diacriticsDifficulty,
  EASY_TENSES,
  PASSIVE_TENSES,
  randomPronoun,
  randomTense,
  randomVerb,
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

const ALL_FORMS: VerbForm[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const ALL_TENSES = [...ACTIVE_TENSES, ...PASSIVE_TENSES]
const ALL_PRONOUNS: PronounId[] = [
  '1s',
  '1p',
  '2ms',
  '2fs',
  '2d',
  '2mp',
  '2fp',
  '3ms',
  '3fs',
  '3md',
  '3fd',
  '3mp',
  '3fp',
]
const NO_DUAL_PRONOUNS = ALL_PRONOUNS.filter((p) => !p.includes('d'))

function tensesEqual(a: VerbTense, b: VerbTense): boolean {
  return a.join('.') === b.join('.')
}

function distractorTenses(difficulty: Difficulty): VerbTense[] {
  if (difficulty === 'easy') return EASY_TENSES
  if (difficulty === 'medium') return ACTIVE_TENSES
  return ALL_TENSES
}

function distractorPronouns(tense: VerbTense, difficulty: Difficulty): PronounId[] {
  const base = difficulty === 'easy' ? NO_DUAL_PRONOUNS : ALL_PRONOUNS
  return tense[1] === 'imperative' ? base.filter((p) => p.startsWith('2')) : base
}

function buildSiblings(verb: DisplayVerb): DisplayVerb[] {
  return ALL_FORMS.filter((f) => f !== verb.form).flatMap((form) => [
    form === 1 ? synthesizeVerb(verb.root, 1, 'fa3ala-yaf3alu') : synthesizeVerb(verb.root, form),
  ])
}

function easyCandidates(
  targetTense: VerbTense,
  targetPronoun: PronounId,
  verb: DisplayVerb,
  difficulty: Difficulty,
): string[] {
  return buildSiblings(verb).flatMap((v) =>
    distractorTenses(difficulty)
      .filter((t) => !tensesEqual(t, targetTense))
      .flatMap((t) =>
        distractorPronouns(t, difficulty)
          .filter((p) => p !== targetPronoun)
          .map((p) => conjugate(v, t)[p]),
      ),
  )
}

function mediumCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  difficulty: Difficulty,
): string[] {
  const siblings = buildSiblings(verb)
  const typeA = distractorTenses(difficulty)
    .filter((t) => !tensesEqual(t, targetTense))
    .flatMap((t) =>
      distractorPronouns(t, difficulty)
        .filter((p) => p !== targetPronoun)
        .map((p) => conjugate(verb, t)[p]),
    )
  const typeB = siblings.flatMap((sibling) =>
    distractorPronouns(targetTense, difficulty)
      .filter((p) => p !== targetPronoun)
      .map((p) => conjugate(sibling, targetTense)[p]),
  )
  const typeC = siblings.flatMap((sibling) =>
    distractorTenses(difficulty)
      .filter((t) => !tensesEqual(t, targetTense))
      .map((t) => conjugate(sibling, t)[targetPronoun]),
  )
  return [...typeA, ...typeB, ...typeC]
}

function hardCandidates(
  verb: DisplayVerb,
  targetTense: VerbTense,
  targetPronoun: PronounId,
  difficulty: Difficulty,
): string[] {
  const type1 = distractorPronouns(targetTense, difficulty)
    .filter((p) => p !== targetPronoun)
    .map((p) => conjugate(verb, targetTense)[p])
  const type2 = distractorTenses(difficulty)
    .filter((t) => !tensesEqual(t, targetTense))
    .map((t) => conjugate(verb, t)[targetPronoun])
  const type3 = buildSiblings(verb).map((sibling) => conjugate(sibling, targetTense)[targetPronoun])
  return [...type1, ...type2, ...type3]
}

export function conjugationExercise(difficulty: Difficulty): Exercise {
  const verb = randomVerb(difficulty)
  const word = diacriticsDifficulty(verb.label, difficulty)
  const targetTense = randomTense(verb, difficulty)
  const targetPronoun = randomPronoun(verb, targetTense, difficulty)
  const answer = diacriticsDifficulty(conjugate(verb, targetTense)[targetPronoun], difficulty)

  const raw =
    difficulty === 'hard'
      ? hardCandidates(verb, targetTense, targetPronoun, difficulty)
      : difficulty === 'medium'
        ? mediumCandidates(verb, targetTense, targetPronoun, difficulty)
        : easyCandidates(targetTense, targetPronoun, verb, difficulty)

  const candidates = new Set(raw.map((r) => diacriticsDifficulty(r, difficulty)))
  candidates.delete('')
  candidates.delete(answer)
  const options = new Set<string>([answer])
  for (const candidate of shuffle(Array.from(candidates))) {
    if (options.size >= 4) break
    options.add(candidate)
  }
  const shuffled = shuffle(Array.from(options))

  return {
    kind: 'conjugation',
    promptTranslationKey: 'exercise.prompt.conjugation',
    promptParams: {
      tense: tensePromptKey(targetTense, difficulty === 'hard'),
      pronoun: PRONOUN_KEYS[targetPronoun],
    },
    word,
    options: shuffled,
    answer: shuffled.indexOf(answer),
  }
}
