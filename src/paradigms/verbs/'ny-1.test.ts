import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("'ny-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ny-1")!)).toEqualT({
      '1s': 'أَنَيْتُ',
      '2ms': 'أَنَيْتَ',
      '2fs': 'أَنَيْتِ',
      '3ms': 'أَنَى',
      '3fs': 'أَنَتْ',
      '2d': 'أَنَيْتُمَا',
      '3md': 'أَنَيَا',
      '3fd': 'أَنَتَا',
      '1p': 'أَنَيْنَا',
      '2mp': 'أَنَيْتُمْ',
      '2fp': 'أَنَيْتُنَّ',
      '3mp': 'أَنَوْا',
      '3fp': 'أَنَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'ny-1")!, 'indicative')).toEqualT({
      '1s': 'آنِي',
      '2ms': 'تَأْنِي',
      '2fs': 'تَأْنِينَ',
      '3ms': 'يَأْنِي',
      '3fs': 'تَأْنِي',
      '2d': 'تَأْنِيَانِ',
      '3md': 'يَأْنِيَانِ',
      '3fd': 'تَأْنِيَانِ',
      '1p': 'نَأْنِي',
      '2mp': 'تَأْنُونَ',
      '2fp': 'تَأْنِينَ',
      '3mp': 'يَأْنُونَ',
      '3fp': 'يَأْنِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ny-1")!, 'subjunctive')).toEqualT({
      '1s': 'آنِيَ',
      '2ms': 'تَأْنِيَ',
      '2fs': 'تَأْنِي',
      '3ms': 'يَأْنِيَ',
      '3fs': 'تَأْنِيَ',
      '2d': 'تَأْنِيَا',
      '3md': 'يَأْنِيَا',
      '3fd': 'تَأْنِيَا',
      '1p': 'نَأْنِيَ',
      '2mp': 'تَأْنُوا',
      '2fp': 'تَأْنِينَ',
      '3mp': 'يَأْنُوا',
      '3fp': 'يَأْنِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ny-1")!, 'jussive')).toEqualT({
      '1s': 'آنِ',
      '2ms': 'تَأْنِ',
      '2fs': 'تَأْنِي',
      '3ms': 'يَأْنِ',
      '3fs': 'تَأْنِ',
      '2d': 'تَأْنِيَا',
      '3md': 'يَأْنِيَا',
      '3fd': 'تَأْنِيَا',
      '1p': 'نَأْنِ',
      '2mp': 'تَأْنُوا',
      '2fp': 'تَأْنِينَ',
      '3mp': 'يَأْنُوا',
      '3fp': 'يَأْنِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ny-1")!)).toMatchObjectT({
      '2ms': 'اِئْنِ',
      '2fs': 'اِئْنِي',
      '2d': 'اِئْنِيَا',
      '2mp': 'اِئْنُوا',
      '2fp': 'اِئْنِينَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'ny-1")!)).toEqualT('آنٍ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'ny-1")!))).toEqualT(new Set(['إنًى']))
  })
})
