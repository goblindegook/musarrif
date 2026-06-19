import { mapRecord } from '../../primitives/objects'
import type { PronounId } from '../pronouns'
import { FATHA, SEEN } from '../tokens'
import type { Verb } from '../verbs'
import { particleMorpheme, Word } from '../word'
import { conjugatePresentMood } from './present'

export function conjugateFuture(verb: Verb): Record<PronounId, Word> {
  return mapRecord(
    conjugatePresentMood(verb, 'indicative'),
    (value) => new Word([particleMorpheme(SEEN, FATHA), ...value.morphemes]),
  )
}
