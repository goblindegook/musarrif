import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import { FATHA, finalize, SEEN, tokenize } from '../tokens'
import type { Verb } from '../verbs'
import { conjugatePresentMood } from './present'

export function conjugateFuture(verb: Verb): Record<PronounId, string> {
  return mapRecord(conjugatePresentMood(verb, 'indicative'), (value) =>
    finalize([SEEN, FATHA, ...tokenize(String(value))]),
  )
}
