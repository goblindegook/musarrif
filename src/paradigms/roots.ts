import { type Token, WAW, YEH } from './tokens'

export type RootShape = 'assimilated' | 'hollow' | 'defective' | 'doubled' | 'hamzated' | 'quadriliteral-weak'
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

function rootShapesOn(predicate: boolean, shape: RootShape): RootShape[] {
  return predicate ? [shape] : []
}

function analyzeType(
  root: readonly Token[],
  weakPositions: readonly number[],
  hamzaPositions: readonly number[],
): Pick<RootAnalysis, 'type' | 'weakLetter'> {
  const [c1, c2, c3] = Array.from(root)

  const isQuadriliteral = root.length > 3
  const hasHamza = hamzaPositions.length > 0
  const hollow = !isQuadriliteral && c2.isWeak
  const defective = !isQuadriliteral && c3.isWeak
  const doubled = !isQuadriliteral && !hollow && !defective && c2.equals(c3)
  const assimilated = !isQuadriliteral && c1.isWeak

  const type: RootShape[] = [
    ...rootShapesOn(hasHamza, 'hamzated'),
    // assimilated/hollow/defective/doubled are positions within a three-consonant root.
    ...rootShapesOn(assimilated, 'assimilated'),
    ...rootShapesOn(hollow, 'hollow'),
    ...rootShapesOn(defective, 'defective'),
    ...rootShapesOn(doubled, 'doubled'),
    // A quadriliteral can be weak but it takes none of those behaviors.
    ...rootShapesOn(isQuadriliteral && weakPositions.length > 0, 'quadriliteral-weak'),
  ]

  const weakLetter =
    hollow && defective
      ? hasHamza
        ? undefined
        : weakLetterOf(c2)
      : hollow
        ? weakLetterOf(c2)
        : defective
          ? weakLetterOf(c3)
          : undefined

  return { type, weakLetter }
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
