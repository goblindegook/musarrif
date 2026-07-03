import { ALIF, DAMMA, FATHA, KASRA, SUKOON, WAW, YEH } from '../tokens'
import { type Morpheme, measureMorpheme, radicalMorpheme } from '../word'

function findHollowRadicalIndex(morphemes: readonly Morpheme[]): number {
  return morphemes.findIndex(
    (m, i) =>
      m.role === 'radical' &&
      (m.equals([WAW]) || m.equals([YEH])) &&
      morphemes[i - 1]?.equals([FATHA]) &&
      morphemes[i + 1]?.role === 'radical',
  )
}

// Form I hollow roots (قَالَ، بَاعَ) build their bare stem as C1 + FATHA + weak-C2 + C3, keeping the
// original radical rather than pre-selecting the long-vowel or dropped-radical shape a given
// pronoun's suffix will need. Before a vowel-initial suffix the weak radical becomes the long
// vowel ALIF (قَالَ). Other forms never reach this shape — their own weak-C2 branches already spell
// the contracted ALIF directly, since only Form I past has a hollow alternation at all.
function contractHollowRadicalBeforeVowelSuffix(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findHollowRadicalIndex(morphemes)
  if (index === -1 || morphemes[index + 2]?.startsWith([SUKOON])) return morphemes

  return [...morphemes.slice(0, index), radicalMorpheme(ALIF), ...morphemes.slice(index + 1)]
}

// Before a consonant-initial suffix the weak radical is dropped entirely and C1's FATHA shifts to
// the vowel the radical's own identity implies — KASRA for a يّ-medial root (بِعْتُ), DAMMA otherwise
// (قُلْتُ) — regardless of the verb's own pastVowel, matching what the original two-variant branches
// always produced.
function elideHollowRadicalBeforeConsonantSuffix(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findHollowRadicalIndex(morphemes)
  if (index === -1 || !morphemes[index + 2]?.startsWith([SUKOON])) return morphemes

  const vowel = morphemes[index].equals([YEH]) ? KASRA : DAMMA
  return [...morphemes.slice(0, index - 1), measureMorpheme(vowel), ...morphemes.slice(index + 1)]
}

const HOLLOW_CONTRACTION_RULES = [contractHollowRadicalBeforeVowelSuffix, elideHollowRadicalBeforeConsonantSuffix]

export function contractActivePastHollowRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  return HOLLOW_CONTRACTION_RULES.reduce((result, rule) => rule(result), morphemes)
}
