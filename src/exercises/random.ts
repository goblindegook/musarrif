import { type Difficulty, random } from './difficulty'
import { formExercise } from './form'
import { rootExercise } from './root'
import { tenseExercise } from './tense'
import type { Exercise } from './types'

const EXERCISES = [formExercise, rootExercise, tenseExercise]

export function randomExercise(difficulty: Difficulty = 'easy'): Exercise {
  return random(EXERCISES)(difficulty)
}
