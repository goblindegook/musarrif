import { seatHamzas } from './hamza'
import { ALIF, ALIF_HAMZA, ALIF_MADDA, FATHA, SHADDA, SUKOON, type Token } from './tokens'

export type MorphemeRole = 'radical' | 'measure' | 'agreement' | 'particle' | 'elided'

export class MorphemeToken {
  readonly tokens: readonly Token[]
  readonly role: MorphemeRole

  constructor(tokens: readonly Token[], role: MorphemeRole) {
    this.tokens = tokens
    this.role = role
  }

  toString(): string {
    return this.tokens.map((t) => t.raw).join('')
  }
}

export class Word {
  readonly morphemes: readonly MorphemeToken[]

  constructor(raw: readonly MorphemeToken[]) {
    this.morphemes = shaddaPass(maddaPass(hamzaPass(raw)))
  }

  toString(): string {
    return this.morphemes.map(String).join('').normalize('NFC')
  }
}

export const radicalMorpheme = (token: Token): MorphemeToken => new MorphemeToken([token], 'radical')

export const measureMorpheme = (tokens: readonly Token[]): MorphemeToken => new MorphemeToken(tokens, 'measure')

export const particleMorpheme = (tokens: readonly Token[]): MorphemeToken => new MorphemeToken(tokens, 'particle')

export const agreementMorpheme = (tokens: readonly Token[]): MorphemeToken => new MorphemeToken(tokens, 'agreement')

export const elidedMorpheme = (tokens: readonly Token[]): MorphemeToken => new MorphemeToken(tokens, 'elided')

function hamzaPass(morphemes: readonly MorphemeToken[]): readonly MorphemeToken[] {
  const flatTokens = morphemes.flatMap((m) => [...m.tokens])
  const seated = seatHamzas(flatTokens)
  let offset = 0
  return mergeAdjacent(
    morphemes.map((m) => {
      const count = m.tokens.length
      const slice = seated.slice(offset, offset + count)
      offset += count
      return new MorphemeToken(slice, m.role)
    }),
  )
}

function maddaPass(morphemes: readonly MorphemeToken[]): readonly MorphemeToken[] {
  type Slot = { token: Token; morphemeIndex: number }
  const slots: Slot[] = morphemes.flatMap((m, mi) => m.tokens.map((t) => ({ token: t, morphemeIndex: mi })))

  const result: MorphemeToken[] = []
  let i = 0
  while (i < slots.length) {
    const { token: t0 } = slots[i]
    if (
      t0.equals(ALIF_HAMZA) &&
      i + 2 < slots.length &&
      slots[i + 1].token.equals(FATHA) &&
      (slots[i + 2].token.isHamza || slots[i + 2].token.equals(ALIF))
    ) {
      const skip = i + 3 < slots.length && slots[i + 3].token.equals(SUKOON) ? 4 : 3
      result.push(new MorphemeToken([ALIF_MADDA], 'measure'))
      i += skip
    } else {
      const origMorpheme = morphemes[slots[i].morphemeIndex]
      result.push(new MorphemeToken([t0], origMorpheme.role))
      i++
    }
  }
  return mergeAdjacent(result)
}

function shaddaPass(morphemes: readonly MorphemeToken[]): readonly MorphemeToken[] {
  type Slot = { token: Token; role: MorphemeRole }
  const slots: Slot[] = morphemes.flatMap((m) => m.tokens.map((t) => ({ token: t, role: m.role })))

  const result: MorphemeToken[] = []
  let i = 0
  while (i < slots.length) {
    if (
      i + 2 < slots.length &&
      !slots[i].token.isCombiningMark &&
      slots[i + 1].token.equals(SUKOON) &&
      slots[i].token.equals(slots[i + 2].token)
    ) {
      result.push(new MorphemeToken([slots[i].token, SHADDA], slots[i].role))
      i += 3
    } else {
      result.push(new MorphemeToken([slots[i].token], slots[i].role))
      i++
    }
  }
  return mergeAdjacent(result)
}

function mergeAdjacent(morphemes: readonly MorphemeToken[]): readonly MorphemeToken[] {
  const result: MorphemeToken[] = []
  for (const m of morphemes) {
    const last = result[result.length - 1]
    if (last && last.role === m.role) {
      result[result.length - 1] = new MorphemeToken([...last.tokens, ...m.tokens], last.role)
    } else {
      result.push(m)
    }
  }
  return result
}
