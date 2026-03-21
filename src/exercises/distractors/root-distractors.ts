import { ALIF, ALIF_MAQSURA, isWeakLetter, WAW, YEH } from '../../paradigms/letters'
import { random } from '../difficulty'
import type { DistractorGenerator } from './distractors'

const WEAK_LETTER_REPLACEMENTS = [WAW, YEH, ALIF, ALIF_MAQSURA] as const

export function weakAlternativeRootDistractor(correct: string): DistractorGenerator<string> {
  const letters = Array.from(correct)
  const weakAlternatives = letters.flatMap((letter, index) => {
    if (!isWeakLetter(letter)) return []
    return WEAK_LETTER_REPLACEMENTS.filter((replacement) => replacement !== letter).map((replacement) => {
      const next = [...letters]
      next[index] = replacement
      return next.join('')
    })
  })

  return () => random(weakAlternatives)
}
