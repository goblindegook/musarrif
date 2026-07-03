import { ALIF, ALIF_MAQSURA, DAMMA, FATHA, KASRA, SUKOON, TEH, WAW, YEH } from '../tokens'
import { agreementMorpheme, type Morpheme, measureMorpheme, radicalMorpheme } from '../word'

function findDefectiveRadicalIndex(morphemes: readonly Morpheme[]): number {
  return morphemes.findLastIndex((m) => m.role === 'radical' && (m.equals([WAW]) || m.equals([YEH])))
}

function findPrecedingRadical(morphemes: readonly Morpheme[], index: number): Morpheme | undefined {
  let i = index - 1
  while (i >= 0 && morphemes[i].role === 'measure') i--
  return morphemes.at(i)
}

function contractDefectiveRadicalAtWordEnd(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findDefectiveRadicalIndex(morphemes)

  if (
    // Form I's fi3ila-vowel-class exception (قَوِيَ, بَقِيَ — pastVowel is KASRA) keeps the radical fully
    // spelled with its own trailing FATHA rather than contracting. Content-detectable: the radical
    // is immediately preceded by KASRA, never true for regular defective/doubled-weak roots.
    morphemes[index - 1]?.equals([KASRA]) ||
    !morphemes[index + 1].startsWith([FATHA]) ||
    morphemes[index + 2] != null
  )
    return morphemes

  // A weak radical immediately preceded by an identical weak radical (skipping measure material,
  // e.g. a geminated ي or a doubled-weak root's C2=C3) always contracts to plain ALIF, regardless
  // of WAW/YEH identity — confirmed against حَيَّى and أَحْيَا (both C2=C3=ي, lemma ends in ا not ى).
  const c3 = morphemes[index]

  return [
    ...morphemes.slice(0, index),
    radicalMorpheme(findPrecedingRadical(morphemes, index)?.equals(c3) || c3.equals([WAW]) ? ALIF : ALIF_MAQSURA),
  ]
}

function elideDefectiveRadicalBeforeFeminineMarker(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findDefectiveRadicalIndex(morphemes)

  if (
    // Same fi3ila-vowel-class exception as contractDefectiveRadicalAtWordEnd.
    // بَقِيَتْ keeps the radical before the feminine marker, it does not elide to بَقِتْ.
    morphemes[index - 1]?.equals([KASRA]) ||
    !morphemes[index + 1].startsWith([FATHA]) ||
    !morphemes[index + 2].startsWith([TEH])
  )
    return morphemes

  return [...morphemes.slice(0, index), ...morphemes.slice(index + 2)]
}

function elideDefectiveRadicalBeforeMasculinePluralMarker(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findDefectiveRadicalIndex(morphemes)

  if (!morphemes[index + 1].startsWith([DAMMA])) return morphemes

  // Form I's fi3ila-vowel-class exception (قَوِيَ → بَقُوا) drops its class-defining KASRA along with
  // the radical, but — unlike the regular case, which drops the auto-appended DAMMA too — keeps it,
  // since it's what carries ق's vowel once the radical is gone.
  if (morphemes[index - 1].equals([KASRA])) return [...morphemes.slice(0, index - 1), ...morphemes.slice(index + 1)]

  return [...morphemes.slice(0, index), ...morphemes.slice(index + 2)]
}

function insertLinkingVowelBeforeMasculineDualMarker(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = findDefectiveRadicalIndex(morphemes)

  if (morphemes[index + 2]?.length !== 1 || !morphemes[index + 2].equals([ALIF])) return morphemes

  return [
    ...morphemes.slice(0, index + 1),
    measureMorpheme(morphemes[index].equals([WAW]) ? SUKOON : FATHA),
    ...morphemes.slice(index + 2),
  ]
}

// Disambiguates two adjacent weak letters: when a masculine-plural WAW+ALIF marker is immediately
// preceded (skipping measure-role material like a pattern vowel or gemination mark) by a radical
// that is itself WAW or YEH, the marker's WAW needs an explicit SUKOON — otherwise the two weak
// letters in a row are ambiguous. Does not fire for the common case (marker preceded by a strong
// radical), confirmed against both defective (دَعَوا, no mark needed) and sound-root (حَبُّوا, no
// mark needed) 3mp forms.
function insertSukoonInMasculinePluralMarkerAfterWeakRadical(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  const index = morphemes.findLastIndex((m) => m.equals([WAW, ALIF]))
  if (index === -1) return morphemes

  const precedingToken = findPrecedingRadical(morphemes, index)
  if (!precedingToken?.equals([WAW]) && !precedingToken?.equals([YEH])) return morphemes

  return [...morphemes.slice(0, index), agreementMorpheme(WAW, SUKOON, ALIF), ...morphemes.slice(index + 1)]
}

const DEFECTIVE_CONTRACTION_RULES = [
  contractDefectiveRadicalAtWordEnd,
  elideDefectiveRadicalBeforeFeminineMarker,
  elideDefectiveRadicalBeforeMasculinePluralMarker,
  insertLinkingVowelBeforeMasculineDualMarker,
  insertSukoonInMasculinePluralMarkerAfterWeakRadical,
]

export function contractActivePastDefectiveRoot(morphemes: readonly Morpheme[]): readonly Morpheme[] {
  return DEFECTIVE_CONTRACTION_RULES.reduce((result, rule) => rule(result), morphemes)
}
