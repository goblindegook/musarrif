import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { getVerbById } from '../verbs'

describe("'ll-1-i-a (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'ll-1-i-a")!)).toEqualT({
      '1s': 'أَلِلْتُ',
      '2ms': 'أَلِلْتَ',
      '2fs': 'أَلِلْتِ',
      '3ms': 'أَلَّ',
      '3fs': 'أَلَّتْ',
      '2d': 'أَلِلْتُمَا',
      '3md': 'أَلَّا',
      '3fd': 'أَلَّتَا',
      '1p': 'أَلِلْنَا',
      '2mp': 'أَلِلْتُمْ',
      '2fp': 'أَلِلْتُنَّ',
      '3mp': 'أَلُّوا',
      '3fp': 'أَلِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'ll-1-i-a")!, 'indicative')).toEqualT({
      '1s': 'أَأَلُّ',
      '2ms': 'تَأَلُّ',
      '2fs': 'تَأَلِّينَ',
      '3ms': 'يَأَلُّ',
      '3fs': 'تَأَلُّ',
      '2d': 'تَأَلَّانِ',
      '3md': 'يَأَلَّانِ',
      '3fd': 'تَأَلَّانِ',
      '1p': 'نَأَلُّ',
      '2mp': 'تَأَلُّونَ',
      '2fp': 'تَأْلَلْنَ',
      '3mp': 'يَأَلُّونَ',
      '3fp': 'يَأْلَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'ll-1-i-a")!, 'subjunctive')).toEqualT({
      '1s': 'أَأَلَّ',
      '2ms': 'تَأَلَّ',
      '2fs': 'تَأَلِّي',
      '3ms': 'يَأَلَّ',
      '3fs': 'تَأَلَّ',
      '2d': 'تَأَلَّا',
      '3md': 'يَأَلَّا',
      '3fd': 'تَأَلَّا',
      '1p': 'نَأَلَّ',
      '2mp': 'تَأَلُّوا',
      '2fp': 'تَأْلَلْنَ',
      '3mp': 'يَأَلُّوا',
      '3fp': 'يَأْلَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'ll-1-i-a")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَأَلَّ', 'أَأَلِّ', 'آلَلْ']),
      '2ms': expect.toBeOneOf(['تَأَلَّ', 'تَأَلِّ', 'تَأْلَلْ']),
      '2fs': 'تَأَلِّي',
      '3ms': expect.toBeOneOf(['يَأَلَّ', 'يَأَلِّ', 'يَأْلَلْ']),
      '3fs': expect.toBeOneOf(['تَأَلَّ', 'تَأَلِّ', 'تَأْلَلْ']),
      '2d': 'تَأَلَّا',
      '3md': 'يَأَلَّا',
      '3fd': 'تَأَلَّا',
      '1p': expect.toBeOneOf(['نَأَلَّ', 'نَأَلِّ', 'نَأْلَلْ']),
      '2mp': 'تَأَلُّوا',
      '2fp': 'تَأْلَلْنَ',
      '3mp': 'يَأَلُّوا',
      '3fp': 'يَأْلَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'ll-1-i-a")!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['أَلَّ', 'أَلِّ', 'اِئْلَلْ']),
      '2fs': 'أَلِّي',
      '2d': 'أَلَّا',
      '2mp': 'أَلُّوا',
      '2fp': 'اِئْلَلْنَ',
    })
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'ll-1-i-a")!))).toEqualT(new Set(['أَلَل']))
  })
})
