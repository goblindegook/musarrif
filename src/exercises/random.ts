import { formExercise } from './form'
import { rootExercise } from './root'
import { random } from './selectors'
import type { Difficulty, Exercise } from './types'

const EXERCISES = [formExercise, rootExercise]

export function randomExercise(difficulty: Difficulty = 'easy'): Exercise {
  return random(EXERCISES)(difficulty)
}
