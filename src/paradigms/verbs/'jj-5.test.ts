import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("'jj-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'jj-5")!)).toEqualT({
      '1s': 'تَأَجَّجْتُ',
      '2ms': 'تَأَجَّجْتَ',
      '2fs': 'تَأَجَّجْتِ',
      '3ms': 'تَأَجَّجَ',
      '3fs': 'تَأَجَّجَتْ',
      '2d': 'تَأَجَّجْتُمَا',
      '3md': 'تَأَجَّجَا',
      '3fd': 'تَأَجَّجَتَا',
      '1p': 'تَأَجَّجْنَا',
      '2mp': 'تَأَجَّجْتُمْ',
      '2fp': 'تَأَجَّجْتُنَّ',
      '3mp': 'تَأَجَّجُوا',
      '3fp': 'تَأَجَّجْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'jj-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَجَّجُ',
      '2ms': 'تَتَأَجَّجُ',
      '2fs': 'تَتَأَجَّجِينَ',
      '3ms': 'يَتَأَجَّجُ',
      '3fs': 'تَتَأَجَّجُ',
      '2d': 'تَتَأَجَّجَانِ',
      '3md': 'يَتَأَجَّجَانِ',
      '3fd': 'تَتَأَجَّجَانِ',
      '1p': 'نَتَأَجَّجُ',
      '2mp': 'تَتَأَجَّجُونَ',
      '2fp': 'تَتَأَجَّجْنَ',
      '3mp': 'يَتَأَجَّجُونَ',
      '3fp': 'يَتَأَجَّجْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'jj-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَجَّجَ',
      '2ms': 'تَتَأَجَّجَ',
      '2fs': 'تَتَأَجَّجِي',
      '3ms': 'يَتَأَجَّجَ',
      '3fs': 'تَتَأَجَّجَ',
      '2d': 'تَتَأَجَّجَا',
      '3md': 'يَتَأَجَّجَا',
      '3fd': 'تَتَأَجَّجَا',
      '1p': 'نَتَأَجَّجَ',
      '2mp': 'تَتَأَجَّجُوا',
      '2fp': 'تَتَأَجَّجْنَ',
      '3mp': 'يَتَأَجَّجُوا',
      '3fp': 'يَتَأَجَّجْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'jj-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَجَّجْ',
      '2ms': 'تَتَأَجَّجْ',
      '2fs': 'تَتَأَجَّجِي',
      '3ms': 'يَتَأَجَّجْ',
      '3fs': 'تَتَأَجَّجْ',
      '2d': 'تَتَأَجَّجَا',
      '3md': 'يَتَأَجَّجَا',
      '3fd': 'تَتَأَجَّجَا',
      '1p': 'نَتَأَجَّجْ',
      '2mp': 'تَتَأَجَّجُوا',
      '2fp': 'تَتَأَجَّجْنَ',
      '3mp': 'يَتَأَجَّجُوا',
      '3fp': 'يَتَأَجَّجْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'jj-5")!)).toMatchObjectT({
      '2ms': 'تَأَجَّجْ',
      '2fs': 'تَأَجَّجِي',
      '2d': 'تَأَجَّجَا',
      '2mp': 'تَأَجَّجُوا',
      '2fp': 'تَأَجَّجْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'jj-5")!)).toEqualT('مُتَأَجِّج')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'jj-5")!))).toEqualT(new Set(['تَأَجُّج']))
  })
})
