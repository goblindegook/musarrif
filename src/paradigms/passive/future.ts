import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import { FATHA, finalize, SEEN, tokenize } from '../tokens'
import type { Verb } from '../verbs'
import { conjugatePassivePresentMood } from './present'
import { constrainPassiveConjugation } from './support'

export function conjugatePassiveFuture(verb: Verb): Record<PronounId, string> {
  return constrainPassiveConjugation(
    verb,
    mapRecord(conjugatePassivePresentMood(verb, 'indicative'), (value) => finalize([SEEN, FATHA, ...tokenize(value)])),
    '',
  )
}
