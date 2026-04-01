import { mapRecord } from '../../primitives/objects'
import { FATHA, finalize, SEEN } from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassivePresentMood } from './present'
import { constrainPassiveConjugation } from './support'

export function conjugatePassiveFuture(verb: Verb): Record<PronounId, string> {
  return constrainPassiveConjugation(
    verb,
    mapRecord(conjugatePassivePresentMood(verb, 'indicative'), (value) => finalize([SEEN, FATHA, value])),
  )
}
