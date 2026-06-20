import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'

export function constrainPassiveConjugation<T>(
  verb: Verb,
  conjugation: Record<PronounId, T>,
  emptyValue: T,
): Record<PronounId, T> {
  if (verb.passiveVoice !== 'impersonal') return conjugation
  return mapRecord(conjugation, (value, pronounId) => (pronounId === '3ms' ? value : emptyValue))
}
