import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import type { Verb } from '../verbs'
import { Word } from '../word'

const noWord = new Word([])

export function constrainPassiveConjugation(verb: Verb, conjugation: Record<PronounId, Word>): Record<PronounId, Word> {
  if (verb.passive === 'none') return mapRecord(conjugation, () => noWord)
  if (verb.passive !== 'impersonal') return conjugation
  return mapRecord(conjugation, (value, pronounId) => (pronounId === '3ms' ? value : noWord))
}
