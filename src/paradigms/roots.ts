import { type Token, WAW, YEH } from './tokens'

export type RootShape = 'assimilated' | 'hollow' | 'defective' | 'doubled' | 'hamzated'
export type RootAnalysisType = readonly RootShape[]
export type WeakLetter = 'waw' | 'yaa'

export interface RootAnalysis {
  type: RootAnalysisType
  weakLetter?: WeakLetter
  weakPositions: number[]
  hamzaPositions: number[]
  isBiliteral: boolean
}

export function analyzeRoot(root: readonly Token[]): RootAnalysis {
  const weakPositions: number[] = []
  const hamzaPositions: number[] = []

  root.forEach((letter, index) => {
    if (letter.isWeak) weakPositions.push(index)
    if (letter.isHamza) hamzaPositions.push(index)
  })

  return {
    ...analyzeType(root, weakPositions, hamzaPositions),
    weakPositions,
    hamzaPositions,
    isBiliteral: isBiliteralRoot(root),
  }
}

function isBiliteralRoot(root: readonly Token[]): boolean {
  const [c1, c2, c3, c4] = Array.from(root)
  return root.length === 4 && c1.equals(c3) && c2.equals(c4)
}

function analyzeType(
  root: readonly Token[],
  weakPositions: readonly number[],
  hamzaPositions: readonly number[],
): Pick<RootAnalysis, 'type' | 'weakLetter'> {
  const [c1, c2, c3] = Array.from(root)

  if (hamzaPositions.length > 0) {
    if (c2.isWeak && c3.isWeak) return { type: ['hamzated', 'hollow', 'defective'] }
    if (c2.isWeak) return { type: ['hamzated', 'hollow'], weakLetter: weakLetterOf(c2) }
    if (c3.isWeak) return { type: ['hamzated', 'defective'], weakLetter: weakLetterOf(c3) }
    if (c2.equals(c3)) return { type: ['hamzated', 'doubled'] }
    return { type: ['hamzated'] }
  }

  if (weakPositions.length >= 2) {
    const dominant = weakPositions.includes(1) ? c2 : c3
    const type: RootShape[] = weakPositions.includes(1)
      ? weakPositions.includes(2)
        ? ['hollow', 'defective']
        : ['assimilated', 'hollow']
      : ['assimilated', 'defective']
    return { type, weakLetter: weakLetterOf(dominant) }
  }

  if (c1.isWeak) return { type: ['assimilated'] }
  if (c2.isWeak) return { type: ['hollow'], weakLetter: weakLetterOf(c2) }
  if (c3.isWeak) return { type: ['defective'], weakLetter: weakLetterOf(c3) }
  if (c2.equals(c3)) return { type: ['doubled'] }
  return { type: [] }
}

function weakLetterOf(letter: Token): WeakLetter {
  return letter.equals(WAW) ? 'waw' : 'yaa'
}

export function rootTypeLocaleKey(type: RootAnalysisType, weakLetter?: WeakLetter): string {
  if (type.length === 0) return 'sound'
  return weakLetter ? `${type.join('-')}-${weakLetter}` : type.join('-')
}

// Outside Form I a final weak radical always surfaces as yā', so a wāw-final root builds its derived
// stems on yā' (خَلَّى، يُخَلِّي، أَعْطَى، اِصْطَفَى) instead of keeping the wāw the way Form I does (خَلَا، يَخْلُو).
export function derivedRadicals(rootTokens: readonly [Token, Token, Token]): readonly [Token, Token, Token] {
  const [c1, c2, c3] = rootTokens
  return [c1, c2, c3.isWeak ? YEH : c3]
}
