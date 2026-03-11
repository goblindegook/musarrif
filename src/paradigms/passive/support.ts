import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import type { RawVerb } from '../verbs'

export function canConjugatePassive(verb: RawVerb): boolean {
  return verb.form !== 9 && verb.passiveVoice !== 'none'
}

export function constrainPassiveConjugation(
  verb: RawVerb,
  conjugation: Record<PronounId, string>,
): Record<PronounId, string> {
  if (verb.passiveVoice !== 'impersonal') return conjugation
  return mapRecord(conjugation, (value, pronounId) => (pronounId === '3ms' ? value : ''))
}
