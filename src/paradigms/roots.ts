import { type Token, WAW } from './tokens'

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

export function analyzeRoot(root: readonly Token[]): RootAnalysis {
  const weakPositions: number[] = []
  const hamzaPositions: number[] = []

  root.forEach((letter, index) => {
    if (letter.isWeak) weakPositions.push(index)
    if (letter.isHamza) hamzaPositions.push(index)
  })

  return { type: analyzeType(root, weakPositions, hamzaPositions), weakPositions, hamzaPositions }
}

function analyzeType(
  root: readonly Token[],
  weakPositions: readonly number[],
  hamzaPositions: readonly number[],
): RootAnalysisType {
  const [c1, c2, c3] = Array.from(root)

  if (hamzaPositions.length > 0) {
    if (c2.isWeak && c3.isWeak) return 'hamzated-hollow-defective'
    if (c2.isWeak) return toWeakVariant(c2, 'hamzated-hollow-waw', 'hamzated-hollow-yaa')
    if (c3.isWeak) return toWeakVariant(c3, 'hamzated-defective-waw', 'hamzated-defective-yaa')
    if (c2.equals(c3)) return 'hamzated-doubled'
    return 'hamzated'
  }

  if (weakPositions.length >= 2) {
    const dominantIndex = weakPositions.includes(1) ? 1 : 2
    return toWeakVariant(root[dominantIndex], 'doubly-weak-waw', 'doubly-weak-yaa')
  }

  if (c1.isWeak) return 'assimilated'
  if (c2.isWeak) return toWeakVariant(c2, 'hollow-waw', 'hollow-yaa')
  if (c3.isWeak) return toWeakVariant(c3, 'defective-waw', 'defective-yaa')
  if (c2.equals(c3)) return 'doubled'
  return 'sound'
}

function toWeakVariant(letter: Token, wawType: RootAnalysisType, yaaType: RootAnalysisType): RootAnalysisType {
  return letter.equals(WAW) ? wawType : yaaType
}
