import { mapRecord } from '../../primitives/objects'
import { FATHA, SEEN } from '../constants'
import { join } from '../helpers'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateFuture(verb: Verb): Record<PronounId, string> {
  return mapRecord(conjugatePresentMood(verb, 'indicative'), (value) => join(SEEN, FATHA, value))
}
