import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import { FATHA, SEEN } from '../tokens'
import type { Verb } from '../verbs'
import { particleMorpheme, Word } from '../word'
import { conjugatePassivePresentMood } from './present'
import { constrainPassiveConjugation } from './support'

export function conjugatePassiveFuture(verb: Verb): Record<PronounId, Word> {
  return constrainPassiveConjugation(
    verb,
    mapRecord(
      conjugatePassivePresentMood(verb, 'indicative'),
      (word) => new Word([particleMorpheme(SEEN, FATHA), ...word.morphemes]),
    ),
    new Word([]),
  )
}
