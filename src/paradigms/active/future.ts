import { mapRecord } from '../../primitives/objects'
import { FATHA, finalize, SEEN } from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateFuture(verb: Verb): Record<PronounId, string> {
  return mapRecord(conjugatePresentMood(verb, 'indicative'), (value) => finalize([SEEN, FATHA, value]))
}
