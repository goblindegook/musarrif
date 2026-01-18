import { isHamzatedLetter, isWeakLetter } from '../letters'
import type { Verb } from '../verbs'

export function canConjugatePassive(verb: Verb): boolean {
  const letters = [...verb.root]
  const [c1, c2, c3] = letters

  const isStrong = letters.every((letter) => !isWeakLetter(letter) && !isHamzatedLetter(letter))
  const isHollow = isWeakLetter(c2) && !isWeakLetter(c1) && !isWeakLetter(c3) && !isHamzatedLetter(c1)
  const isInitialWeak = isWeakLetter(c1) && !isWeakLetter(c2) && !isWeakLetter(c3)
  const isHamzatedInitialStrong = isHamzatedLetter(c1) && !isWeakLetter(c2) && !isWeakLetter(c3)
  const isHamzatedMiddleDefective = isHamzatedLetter(c2) && isWeakLetter(c3)
  const isHamzatedFinalWeak = isHamzatedLetter(c1) && !isWeakLetter(c2) && isWeakLetter(c3)
  const isDoublyWeak = isWeakLetter(c2) && isWeakLetter(c3)

  return (
    !verb.noPassiveVoice &&
    verb.form === 1 &&
    (isStrong ||
      isHollow ||
      isInitialWeak ||
      isHamzatedInitialStrong ||
      isHamzatedMiddleDefective ||
      isHamzatedFinalWeak ||
      isDoublyWeak)
  )
}
