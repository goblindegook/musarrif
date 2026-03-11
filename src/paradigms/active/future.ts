import { mapRecord } from '../../primitives/objects'
import { FATHA, SEEN } from '../letters'
import type { PronounId } from '../pronouns'
import type { RawVerb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateFuture(verb: RawVerb): Record<PronounId, string> {
  return mapRecord(conjugatePresentMood(verb, 'indicative'), (value) => [SEEN, FATHA, value].join('').normalize('NFC'))
}
