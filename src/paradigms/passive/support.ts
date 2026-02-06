import type { Verb } from '../verbs'

export function canConjugatePassive(verb: Verb): boolean {
  return !verb.noPassiveVoice && [1, 2, 3, 4].includes(verb.form)
}
