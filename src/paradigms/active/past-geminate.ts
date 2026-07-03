import { SUKOON } from '../tokens'
import { type Morpheme, measureMorpheme } from '../word'

// Standard-shape past forms (I, III, VI, VII, VIII, IX) always build their geminate stem
// uncontracted (C2 + vowel + C3), same shape a consonant-initial suffix needs (مَدَدْتُ). Before a
// vowel-initial suffix the linking vowel becomes sukoon so the existing shaddaPass (word.ts) can
// merge the identical radicals into a shadda (مَدَّ) — mirroring how a real speaker only contracts
// when a vowel follows. Forms IV and X are excluded: their linking vowel migrates between the
// C1-C2 and C2-C3 slots across contexts rather than just appearing/disappearing between C2-C3, so
// they keep their own inline two-variant logic. Weak radicals are excluded too:  a doubled weak
// letter (e.g. حَيِيَ) doesn't contract the same way strong gemination does.
export function contractActivePastGeminateRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findIndex(
    (m, i) =>
      m.role === 'measure' &&
      morphemes[i - 1]?.role === 'radical' &&
      !morphemes[i - 1].contains((t) => t.isWeak) &&
      morphemes[i + 1]?.role === 'radical' &&
      morphemes[i + 1].equals(morphemes[i - 1]),
  )
  if (index === -1) return morphemes

  if (morphemes[index + 2]?.startsWith([SUKOON])) return morphemes

  return [...morphemes.slice(0, index), measureMorpheme(SUKOON), ...morphemes.slice(index + 1)]
}
