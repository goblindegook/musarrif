import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'

export function canConjugatePassive(verb: Verb): boolean {
  return verb.passiveVoice !== 'none'
}

export function constrainPassiveConjugation(
  verb: Verb,
  conjugation: Record<PronounId, string>,
): Record<PronounId, string> {
  if (verb.passiveVoice !== 'impersonal') return conjugation
  return mapRecord(conjugation, (value, pronounId) => (pronounId === '3ms' ? value : ''))
}
