import { mapRecord } from '../../primitives/objects'
import { FATHA, SEEN } from '../letters'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { conjugatePassivePresentMood } from './present'

export function conjugatePassiveFuture(verb: Verb): Record<PronounId, string> {
  return mapRecord(conjugatePassivePresentMood(verb, 'indicative'), (value) => {
    return [SEEN, FATHA, value].join('').normalize('NFC')
  })
}
