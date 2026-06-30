import type { Verb } from '../verbs'
import { Word } from '../word'
import { deriveParticiple } from './participle'

export function derivePassiveParticiple(verb: Verb): Word {
  return new Word(verb.noPassiveParticiple ? [] : deriveParticiple(verb, false))
}
