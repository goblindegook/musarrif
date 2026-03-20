import { conjugationExercise } from './conjugation'
import { type Difficulty, random } from './difficulty'
import type { Exercise } from './types'
import { verbFormExercise } from './verb-form'
import { verbRootExercise } from './verb-root'
import { verbTenseExercise } from './verb-tense'

const EXERCISES = [verbFormExercise, verbRootExercise, verbTenseExercise, conjugationExercise]

export function randomExercise(difficulty: Difficulty = 'easy'): Exercise {
  return random(EXERCISES)(difficulty)
}
