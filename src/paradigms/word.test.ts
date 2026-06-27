import { describe, expect, test } from 'vitest'
import { ALIF, ALIF_HAMZA, BA, DAL, FATHA, HAH, HAMZA, KASRA, LAM, SHADDA, SUKOON } from './tokens'
import { agreementMorpheme, Morpheme, measureMorpheme, radicalMorpheme, Word } from './word'

describe('MorphemeToken', () => {
  test('toString joins raw token strings', () => {
    const m = new Morpheme([FATHA, KASRA], 'measure')
    expect(m.toString()).toBe('َِ')
  })

  test('stores role', () => {
    const m = new Morpheme([FATHA], 'agreement')
    expect(m.role).toBe('agreement')
  })
})

describe('Word', () => {
  test('toString concatenates all morpheme strings', () => {
    const w = new Word([measureMorpheme(FATHA), measureMorpheme(KASRA)])
    expect(w.toString()).toBe('َِ')
  })
})

describe('functional constructors', () => {
  test('radicalMorpheme wraps single token as radical', () => {
    const m = radicalMorpheme(FATHA)
    expect(m.role).toBe('radical')
    expect(m.tokens).toEqual([FATHA])
  })

  test('agreementMorpheme wraps token array as agreement', () => {
    const m = agreementMorpheme(SUKOON, SHADDA)
    expect(m.role).toBe('agreement')
    expect(m.tokens).toEqual([SUKOON, SHADDA])
  })
})

describe('finalizeWord — hamza seating', () => {
  test('bare hamza at word start gets a seat', () => {
    const w = new Word([radicalMorpheme(HAMZA), measureMorpheme(FATHA)])
    expect(w.toString()).toBe('أَ')
  })
})

describe('finalizeWord — madda pass', () => {
  test('ALIF_HAMZA + FATHA + ALIF collapses to ALIF_MADDA', () => {
    const w = new Word([
      radicalMorpheme(BA),
      measureMorpheme(FATHA),
      radicalMorpheme(DAL),
      measureMorpheme(FATHA),
      radicalMorpheme(HAMZA),
      measureMorpheme(FATHA),
      agreementMorpheme(ALIF),
    ])
    expect(w.toString()).toBe('بَدَآ')
  })

  test('radical hamza + fatha + radical alif merges to radical madda (hollow root like آل)', () => {
    // ء(radical) + fatha(measure) + ا(radical transformed waw) + ل(radical) → آل
    // The madda occupies both radical positions so it must be annotated radical
    const w = new Word([
      radicalMorpheme(ALIF_HAMZA),
      measureMorpheme(FATHA),
      radicalMorpheme(ALIF),
      radicalMorpheme(LAM),
      measureMorpheme(FATHA),
    ])
    expect(w.toString()).toBe('آلَ')
    expect(w.morphemes[0].role).toBe('radical')
  })

  test('measure hamza + fatha + radical alif-hamza + sukoon merges to measure madda (Form IV prefix)', () => {
    // أَءْلَ → آلَ — the measure أَ prefix triggers madda; the SUKOON is consumed too (4-slot skip)
    const w = new Word([
      measureMorpheme(ALIF_HAMZA, FATHA),
      radicalMorpheme(ALIF_HAMZA),
      measureMorpheme(SUKOON),
      radicalMorpheme(LAM),
      measureMorpheme(FATHA),
    ])
    expect(w.toString()).toBe('آلَ')
    expect(w.morphemes[0].role).toBe('measure')
  })
})

describe('finalizeWord — shadda/gemination pass', () => {
  test('consonant + SUKOON + same-consonant collapses to consonant + SHADDA in measure', () => {
    const w = new Word([
      radicalMorpheme(HAH),
      measureMorpheme(FATHA),
      radicalMorpheme(BA),
      measureMorpheme(SUKOON),
      radicalMorpheme(BA),
      measureMorpheme(FATHA),
    ])
    expect(w.toString()).toBe('حَبَّ')
    expect(w.morphemes.map((m) => ({ text: m.toString(), role: m.role }))).toEqual([
      { text: 'ح', role: 'radical' },
      { text: 'َ', role: 'measure' },
      { text: 'ب', role: 'radical' },
      { text: 'َّ', role: 'measure' },
    ])
  })

  test('SHADDA always placed in a measure morpheme regardless of adjacent roles', () => {
    const w = new Word([radicalMorpheme(BA), agreementMorpheme(SUKOON, BA)])
    expect(w.toString()).toBe('بّ')
    expect(w.morphemes.map((m) => ({ text: m.toString(), role: m.role }))).toEqual([
      { text: 'ب', role: 'radical' },
      { text: 'ّ', role: 'measure' },
    ])
  })
})
