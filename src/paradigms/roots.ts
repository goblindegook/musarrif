import { type LetterToken, WAW } from './letters'

export type RootAnalysisType =
  | 'sound'
  | 'doubled'
  | 'assimilated'
  | 'hollow-waw'
  | 'hollow-yaa'
  | 'defective-waw'
  | 'defective-yaa'
  | 'hamzated'
  | 'hamzated-hollow-waw'
  | 'hamzated-hollow-yaa'
  | 'hamzated-defective-waw'
  | 'hamzated-defective-yaa'
  | 'hamzated-doubled'
  | 'doubly-weak-waw'
  | 'doubly-weak-yaa'
  | 'hamzated-hollow-defective'

export interface RootAnalysis {
  type: RootAnalysisType
  weakPositions: number[]
  hamzaPositions: number[]
}

export function analyzeRoot(root: readonly LetterToken[]): RootAnalysis {
  const letters = Array.from(root)
  const weakPositions: number[] = []
  const hamzaPositions: number[] = []

  letters.forEach((letter, index) => {
    if (letter.isWeak) weakPositions.push(index)
    if (letter.isHamza) hamzaPositions.push(index)
  })

  const [c1, c2, c3] = Array.from(letters)
  const isInitialWeak = c1.isWeak
  const isMiddleWeak = c2.isWeak
  const isFinalWeak = c3.isWeak
  const hasHamza = hamzaPositions.length > 0

  const toWeakVariant = (
    letter: LetterToken,
    wawType: RootAnalysisType,
    yaaType: RootAnalysisType,
  ): RootAnalysisType => (letter.equals(WAW) ? wawType : yaaType)

  if (hasHamza) {
    if (isMiddleWeak && isFinalWeak) return { type: 'hamzated-hollow-defective', weakPositions, hamzaPositions }
    if (isMiddleWeak) {
      return {
        type: toWeakVariant(c2, 'hamzated-hollow-waw', 'hamzated-hollow-yaa'),
        weakPositions,
        hamzaPositions,
      }
    }
    if (isFinalWeak) {
      return {
        type: toWeakVariant(c3, 'hamzated-defective-waw', 'hamzated-defective-yaa'),
        weakPositions,
        hamzaPositions,
      }
    }
    if (letters[1] === letters[2]) return { type: 'hamzated-doubled', weakPositions, hamzaPositions }
    return { type: 'hamzated', weakPositions, hamzaPositions }
  }

  if (weakPositions.length >= 2) {
    const dominantIndex = weakPositions.includes(1) ? 1 : 2
    return {
      type: toWeakVariant(letters[dominantIndex], 'doubly-weak-waw', 'doubly-weak-yaa'),
      weakPositions,
      hamzaPositions,
    }
  }
  if (isInitialWeak) return { type: 'assimilated', weakPositions, hamzaPositions }
  if (isMiddleWeak) return { type: toWeakVariant(c2, 'hollow-waw', 'hollow-yaa'), weakPositions, hamzaPositions }
  if (isFinalWeak) return { type: toWeakVariant(c3, 'defective-waw', 'defective-yaa'), weakPositions, hamzaPositions }
  if (letters[1] === letters[2]) return { type: 'doubled', weakPositions, hamzaPositions }
  return { type: 'sound', weakPositions, hamzaPositions }
}
