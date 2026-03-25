import { isHamzatedLetter, isWeakLetter } from './letters'

export type RootType = 'sound' | 'doubled' | 'hamzated' | 'weak'

export function getRootType(root: string): RootType {
  const letters = Array.from(root)
  if (letters.some(isWeakLetter)) return 'weak'
  if (letters.some(isHamzatedLetter)) return 'hamzated'
  if (letters.length >= 3 && letters[1] === letters[2]) return 'doubled'
  return 'sound'
}

interface RootAnalysis {
  type:
    | 'sound'
    | 'hollow'
    | 'defective'
    | 'doubly-weak'
    | 'assimilated'
    | 'hamzated'
    | 'hamzated-hollow'
    | 'hamzated-defective'
    | 'hamzated-hollow-defective'
    | 'doubled'
    | 'hamzated-doubled'
  weakPositions: number[]
  hamzaPositions: number[]
}

export function analyzeRoot(root: string): RootAnalysis {
  const letters = Array.from(root)
  const weakPositions: number[] = []
  const hamzaPositions: number[] = []

  letters.forEach((letter, index) => {
    if (isWeakLetter(letter)) weakPositions.push(index)
    if (isHamzatedLetter(letter)) hamzaPositions.push(index)
  })

  const [c1, c2, c3] = Array.from(letters)
  const isInitialWeak = isWeakLetter(c1)
  const isMiddleWeak = isWeakLetter(c2)
  const isFinalWeak = isWeakLetter(c3)
  const hasHamza = hamzaPositions.length > 0

  if (hasHamza) {
    if (isMiddleWeak && isFinalWeak) return { type: 'hamzated-hollow-defective', weakPositions, hamzaPositions }
    if (isMiddleWeak) return { type: 'hamzated-hollow', weakPositions, hamzaPositions }
    if (isFinalWeak) return { type: 'hamzated-defective', weakPositions, hamzaPositions }
    if (letters[1] === letters[2]) return { type: 'hamzated-doubled', weakPositions, hamzaPositions }
    return { type: 'hamzated', weakPositions, hamzaPositions }
  }

  if (weakPositions.length >= 2) return { type: 'doubly-weak', weakPositions, hamzaPositions }
  if (isInitialWeak) return { type: 'assimilated', weakPositions, hamzaPositions }
  if (isMiddleWeak) return { type: 'hollow', weakPositions, hamzaPositions }
  if (isFinalWeak) return { type: 'defective', weakPositions, hamzaPositions }
  if (letters[1] === letters[2]) return { type: 'doubled', weakPositions, hamzaPositions }
  return { type: 'sound', weakPositions, hamzaPositions }
}
