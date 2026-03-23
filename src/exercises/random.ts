import { getRootType } from '../paradigms/roots'
import { verbs } from '../paradigms/verbs'
import { conjugationExercise } from './conjugation'
import type { Difficulty } from './difficulty'
import { masdarFormExercise } from './masdar-form'
import { masdarRootExercise } from './masdar-root'
import { masdarVerbExercise } from './masdar-verb'
import { participleFormExercise } from './participle-form'
import { participleRootExercise } from './participle-root'
import { participleVerbExercise } from './participle-verb'
import type { CardConstraints, SrsStore } from './srs'
import { cardSrsWeight, parseCardKey, weightedRandomSrs } from './srs'
import type { Exercise } from './types'
import { verbFormExercise } from './verb-form'
import { verbMasdarExercise } from './verb-masdar'
import { verbParticipleExercise } from './verb-participle'
import { verbPronounExercise } from './verb-pronoun'
import { verbRootExercise } from './verb-root'
import { verbTenseExercise } from './verb-tense'

interface ExerciseGenerator {
  kind: Exercise['kind']
  generate: (difficulty: Difficulty, constraints?: CardConstraints) => Exercise
  difficulty?: Difficulty[]
  weight?: number
}

const EXERCISES: readonly ExerciseGenerator[] = [
  { kind: 'conjugation', generate: conjugationExercise, weight: 3 },
  { kind: 'masdarForm', generate: masdarFormExercise, difficulty: ['medium', 'hard'] },
  { kind: 'masdarRoot', generate: masdarRootExercise, difficulty: ['medium', 'hard'] },
  { kind: 'masdarVerb', generate: masdarVerbExercise, difficulty: ['medium', 'hard'] },
  { kind: 'participleForm', generate: participleFormExercise },
  { kind: 'participleRoot', generate: participleRootExercise },
  { kind: 'participleVerb', generate: participleVerbExercise },
  { kind: 'verbForm', generate: verbFormExercise },
  { kind: 'verbMasdar', generate: verbMasdarExercise, difficulty: ['medium', 'hard'] },
  { kind: 'verbParticiple', generate: verbParticipleExercise },
  { kind: 'verbPronoun', generate: verbPronounExercise },
  { kind: 'verbRoot', generate: verbRootExercise },
  { kind: 'verbTense', generate: verbTenseExercise },
]

function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export function randomExercise(difficulty: Difficulty, srsStore: SrsStore = {}): Exercise {
  const available = EXERCISES.filter((e) => e.difficulty == null || e.difficulty.includes(difficulty))
  const availableKinds = new Set(available.map((e) => e.kind))
  const today = utcToday()

  const dueKeys = Object.entries(srsStore)
    .filter(([key, state]) => {
      if (state.dueDate > today) return false
      const { kind } = parseCardKey(key)
      return availableKinds.has(kind)
    })
    .map(([key]) => key)

  if (dueKeys.length > 0) {
    const kindWeight = (key: string): number => {
      const { kind } = parseCardKey(key)
      return available.find((e) => e.kind === kind)?.weight ?? 1
    }
    const srsWeight = (key: string): number => cardSrsWeight(srsStore[key], today) * kindWeight(key)

    const dueKey = weightedRandomSrs(dueKeys, srsWeight)
    const { kind, rootType, form, tense, pronoun } = parseCardKey(dueKey)

    const generator = available.find((e) => e.kind === kind)
    if (generator == null) return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(difficulty)

    const pool = verbs.filter(
      (v) => (rootType == null || getRootType(v.root) === rootType) && (form == null || v.form === form),
    )
    if (pool.length > 0) {
      const exercise = generator.generate(difficulty, {
        rootType,
        form,
        tense,
        pronoun,
      })
      return { ...exercise, cardKey: dueKey }
    }
  }

  return weightedRandomSrs(available, (e) => e.weight ?? 1).generate(difficulty)
}
