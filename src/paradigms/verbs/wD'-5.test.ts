import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("wD'-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wD'-5")!)).toEqualT({
      '1s': 'تَوَضَّأْتُ',
      '2ms': 'تَوَضَّأْتَ',
      '2fs': 'تَوَضَّأْتِ',
      '3ms': 'تَوَضَّأَ',
      '3fs': 'تَوَضَّأَتْ',
      '2d': 'تَوَضَّأْتُمَا',
      '3md': 'تَوَضَّآ',
      '3fd': 'تَوَضَّأَتَا',
      '1p': 'تَوَضَّأْنَا',
      '2mp': 'تَوَضَّأْتُمْ',
      '2fp': 'تَوَضَّأْتُنَّ',
      '3mp': 'تَوَضَّؤُوا',
      '3fp': 'تَوَضَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wD'-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَوَضَّأُ',
      '2ms': 'تَتَوَضَّأُ',
      '2fs': 'تَتَوَضَّئِينَ',
      '3ms': 'يَتَوَضَّأُ',
      '3fs': 'تَتَوَضَّأُ',
      '2d': 'تَتَوَضَّآنِ',
      '3md': 'يَتَوَضَّآنِ',
      '3fd': 'تَتَوَضَّآنِ',
      '1p': 'نَتَوَضَّأُ',
      '2mp': 'تَتَوَضَّؤُونَ',
      '2fp': 'تَتَوَضَّأْنَ',
      '3mp': 'يَتَوَضَّؤُونَ',
      '3fp': 'يَتَوَضَّأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wD'-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَضَّأَ',
      '2ms': 'تَتَوَضَّأَ',
      '2fs': 'تَتَوَضَّئِي',
      '3ms': 'يَتَوَضَّأَ',
      '3fs': 'تَتَوَضَّأَ',
      '2d': 'تَتَوَضَّآ',
      '3md': 'يَتَوَضَّآ',
      '3fd': 'تَتَوَضَّآ',
      '1p': 'نَتَوَضَّأَ',
      '2mp': 'تَتَوَضَّؤُوا',
      '2fp': 'تَتَوَضَّأْنَ',
      '3mp': 'يَتَوَضَّؤُوا',
      '3fp': 'يَتَوَضَّأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wD'-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَوَضَّأْ',
      '2ms': 'تَتَوَضَّأْ',
      '2fs': 'تَتَوَضَّئِي',
      '3ms': 'يَتَوَضَّأْ',
      '3fs': 'تَتَوَضَّأْ',
      '2d': 'تَتَوَضَّآ',
      '3md': 'يَتَوَضَّآ',
      '3fd': 'تَتَوَضَّآ',
      '1p': 'نَتَوَضَّأْ',
      '2mp': 'تَتَوَضَّؤُوا',
      '2fp': 'تَتَوَضَّأْنَ',
      '3mp': 'يَتَوَضَّؤُوا',
      '3fp': 'يَتَوَضَّأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wD'-5")!)).toMatchObjectT({
      '2ms': 'تَوَضَّأْ',
      '2fs': 'تَوَضَّئِي',
      '2d': 'تَوَضَّآ',
      '2mp': 'تَوَضَّؤُوا',
      '2fp': 'تَوَضَّأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wD'-5")!)).toEqualT('مُتَوَضِّئ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wD'-5")!))).toEqualT(new Set(['تَوَضُّؤ', 'وُضُوء']))
  })
})
