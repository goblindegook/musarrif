import type { Verb } from '../verbs'

export function canConjugatePassive(verb: Verb): boolean {
  return !verb.noPassiveVoice
}
