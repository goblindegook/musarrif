import { seatHamzas } from './hamza'
import { ALIF, ALIF_HAMZA, ALIF_MADDA, DAMMA, FATHA, KASRA, SHADDA, SUKOON, type Token } from './tokens'

export type MorphemeRole = 'radical' | 'measure' | 'agreement' | 'particle' | 'elided'

export type NullableToken = Token | null | undefined

export class Morpheme {
  readonly tokens: readonly Token[]
  readonly role: MorphemeRole

  constructor(tokens: readonly NullableToken[], role: MorphemeRole) {
    this.tokens = tokens.filter((t): t is Token => t != null)
    this.role = role
  }

  toString(): string {
    return stringify(this.tokens)
  }

  get length(): number {
    return this.tokens.length
  }

  at(index: number): Token | undefined {
    return this.tokens.at(index)
  }

  startsWith(tokens: readonly Token[]): boolean {
    return String(this).startsWith(stringify(tokens))
  }

  endsWith(tokens: readonly Token[]): boolean {
    return String(this).endsWith(stringify(tokens))
  }

  equals(tokens: Morpheme | readonly Token[]): boolean {
    return tokens instanceof Morpheme ? String(this) === String(tokens) : String(this) === stringify(tokens)
  }

  includes(token: Token): boolean {
    return this.some((t) => t.equals(token))
  }

  slice(start?: number, end?: number) {
    return new Morpheme(this.tokens.slice(start, end), this.role)
  }

  some(predicate: (t: Token) => boolean): boolean {
    return this.tokens.some(predicate)
  }

  with(index: number, value: Token): Morpheme {
    return new Morpheme(this.tokens.with(index, value), this.role)
  }

  toElided(): Morpheme {
    return new Morpheme(this.tokens, 'elided')
  }
}

export class Word {
  readonly morphemes: readonly Morpheme[]

  constructor(raw: readonly Morpheme[]) {
    this.morphemes = maddaPass(hamzaPass(shaddaPass(raw)))
  }

  toString(): string {
    return stringify(this.morphemes.filter((m) => m.role !== 'elided'))
  }
}

export const radicalMorpheme = (token: Token): Morpheme => new Morpheme([token], 'radical')

export const measureMorpheme = (...tokens: readonly NullableToken[]): Morpheme => new Morpheme(tokens, 'measure')

export const particleMorpheme = (...tokens: readonly NullableToken[]): Morpheme => new Morpheme(tokens, 'particle')

export const agreementMorpheme = (...tokens: readonly NullableToken[]): Morpheme => new Morpheme(tokens, 'agreement')

export const elidedMorpheme = (...tokens: readonly NullableToken[]): Morpheme => new Morpheme(tokens, 'elided')

function stringify(tokens: readonly unknown[]): string {
  return tokens.map(String).join('').normalize('NFC')
}

function hamzaPass(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const seatedTokens = seatHamzas(morphemes.filter((m) => m.role !== 'elided').flatMap((m) => m.tokens))
  let offset = 0
  return morphemes.map((m) => {
    if (m.role === 'elided') return m
    const count = m.tokens.length
    const slice = seatedTokens.slice(offset, offset + count)
    offset += count
    return new Morpheme(slice, m.role)
  })
}

function maddaPass(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  type Slot = { token: Token; index: number }
  const slots: Slot[] = morphemes.flatMap((m, i) => m.tokens.map((t) => ({ token: t, index: i })))

  const result: Morpheme[] = []
  let i = 0
  while (i < slots.length) {
    const token = slots[i].token
    // A second hamza only merges into madda when its own vowel matches (fatha/sukoon); a
    // differing vowel means the two hamzas stay distinct letters.
    if (
      token.equals(ALIF_HAMZA) &&
      slots.at(i + 1)?.token.equals(FATHA) &&
      (slots.at(i + 2)?.token.equals(ALIF) ||
        (slots.at(i + 2)?.token.equals(ALIF_HAMZA) && !slots.at(i + 3)?.token?.oneOf(KASRA, DAMMA)))
    ) {
      const skip = slots.at(i + 3)?.token.equals(SUKOON) ? 4 : 3
      const role0 = morphemes[slots[i].index].role
      const role2 = morphemes[slots[i + 2].index].role
      result.push(new Morpheme([ALIF_MADDA], role0 === 'radical' && role2 === 'radical' ? 'radical' : 'measure'))
      i += skip
    } else {
      const origMorpheme = morphemes[slots[i].index]
      result.push(new Morpheme([token], origMorpheme.role))
      i++
    }
  }
  return mergeAdjacent(result)
}

export function shaddaPass(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  type Slot = { token: Token; role: MorphemeRole }
  const slots: Slot[] = morphemes.flatMap((m) => m.tokens.map((t) => ({ token: t, role: m.role })))

  const result: Morpheme[] = []
  let i = 0
  while (i < slots.length) {
    if (
      i + 2 < slots.length &&
      !slots[i].token.isCombiningMark &&
      slots[i + 1].token.equals(SUKOON) &&
      slots[i].token.equals(slots[i + 2].token)
    ) {
      result.push(new Morpheme([slots[i].token], slots[i].role))
      result.push(measureMorpheme(SHADDA))
      i += 3
    } else {
      result.push(new Morpheme([slots[i].token], slots[i].role))
      i++
    }
  }
  return result
}

function mergeAdjacent(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const result: Morpheme[] = []
  for (const morpheme of morphemes) {
    const previous = result.at(-1)
    if (previous?.role === morpheme.role) {
      result[result.length - 1] = new Morpheme([...previous.tokens, ...morpheme.tokens], previous.role)
    } else {
      result.push(morpheme)
    }
  }
  return result
}
