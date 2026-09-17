import { type Token, WAW, YEH } from './tokens'

export type RootShape =
  | 'sound'
  | 'assimilated'
  | 'hollow'
  | 'defective'
  | 'doubled'
  | 'hamzated'
  | 'quadriliteral-weak'
  | 'biliteral'
export type RootAnalysisType = readonly RootShape[]
export type WeakLetter = 'waw' | 'yaa'

export interface RootAnalysis {
  type: RootAnalysisType
  weakLetter?: WeakLetter
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

  return { ...analyzeType(root, weakPositions, hamzaPositions), weakPositions, hamzaPositions }
}

function isBiliteralRoot(root: readonly Token[]): boolean {
  const [c1, c2, c3, c4] = Array.from(root)
  return root.length === 4 && c1.equals(c3) && c2.equals(c4)
}

function rootShapesOn(predicate: boolean, shape: RootShape): RootShape[] {
  return predicate ? [shape] : []
}

// عِلَّة is carried by و and ي alone, so only they make a root weak: a hamza seat (أَمَّ) and a
// doubled pair (مَدَّ) are shapes a صحيح root wears, and reduplication rides along with either
// (زلزل is a sound biliteral root, وسوس a weak one).
const WEAK_SHAPES: readonly RootShape[] = ['assimilated', 'hollow', 'defective', 'quadriliteral-weak']

export function rootShapes(shapes: readonly RootShape[]): RootAnalysisType {
  const named = shapes.filter((shape) => shape !== 'sound')
  return [...rootShapesOn(!named.some((shape) => WEAK_SHAPES.includes(shape)), 'sound'), ...named]
}

// 'sound' and 'biliteral' classify the root without naming anything a cell has to work around.
export function behaviourShapes(type: RootAnalysisType): RootAnalysisType {
  return type.filter((shape) => shape !== 'sound' && shape !== 'biliteral')
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

  const type = rootShapes([
    ...rootShapesOn(hasHamza, 'hamzated'),
    // assimilated/hollow/defective/doubled are positions within a three-consonant root.
    ...rootShapesOn(assimilated, 'assimilated'),
    ...rootShapesOn(hollow, 'hollow'),
    ...rootShapesOn(defective, 'defective'),
    ...rootShapesOn(doubled, 'doubled'),
    // A quadriliteral can be weak but it takes none of those behaviors.
    ...rootShapesOn(isQuadriliteral && weakPositions.length > 0, 'quadriliteral-weak'),
    // Reduplication (زلزل) is a shape of the root itself, so it holds in every form built on it.
    ...rootShapesOn(isBiliteralRoot(root), 'biliteral'),
  ])

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
  const key = behaviourShapes(type).join('-') || 'sound'
  return weakLetter ? `${key}-${weakLetter}` : key
}

// Outside Form I a final weak radical always surfaces as yā', so a wāw-final root builds its derived
// stems on yā' (خَلَّى، يُخَلِّي، أَعْطَى، اِصْطَفَى) instead of keeping the wāw the way Form I does (خَلَا، يَخْلُو).
export function derivedRadicals(rootTokens: readonly [Token, Token, Token]): readonly [Token, Token, Token] {
  const [c1, c2, c3] = rootTokens
  return [c1, c2, c3.isWeak ? YEH : c3]
}
