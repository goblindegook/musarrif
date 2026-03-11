import { mapRecord } from '../../primitives/objects'
import { FATHA, SEEN } from '../letters'
import type { PronounId } from '../pronouns'
import type { RawVerb } from '../verbs'
import { conjugatePassivePresentMood } from './present'
import { constrainPassiveConjugation } from './support'

export function conjugatePassiveFuture(verb: RawVerb): Record<PronounId, string> {
  return constrainPassiveConjugation(
    verb,
    mapRecord(conjugatePassivePresentMood(verb, 'indicative'), (value) =>
      [SEEN, FATHA, value].join('').normalize('NFC'),
    ),
  )
}
