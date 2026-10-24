import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("z'r-1-a-i (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("z'r-1-a-i")!)).toEqualT({
      '1s': 'زَأَرْتُ',
      '2ms': 'زَأَرْتَ',
      '2fs': 'زَأَرْتِ',
      '3ms': 'زَأَرَ',
      '3fs': 'زَأَرَتْ',
      '2d': 'زَأَرْتُمَا',
      '3md': 'زَأَرَا',
      '3fd': 'زَأَرَتَا',
      '1p': 'زَأَرْنَا',
      '2mp': 'زَأَرْتُمْ',
      '2fp': 'زَأَرْتُنَّ',
      '3mp': 'زَأَرُوا',
      '3fp': 'زَأَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("z'r-1-a-i")!, 'indicative')).toEqualT({
      '1s': 'أَزْئِرُ',
      '2ms': 'تَزْئِرُ',
      '2fs': 'تَزْئِرِينَ',
      '3ms': 'يَزْئِرُ',
      '3fs': 'تَزْئِرُ',
      '2d': 'تَزْئِرَانِ',
      '3md': 'يَزْئِرَانِ',
      '3fd': 'تَزْئِرَانِ',
      '1p': 'نَزْئِرُ',
      '2mp': 'تَزْئِرُونَ',
      '2fp': 'تَزْئِرْنَ',
      '3mp': 'يَزْئِرُونَ',
      '3fp': 'يَزْئِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("z'r-1-a-i")!, 'subjunctive')).toEqualT({
      '1s': 'أَزْئِرَ',
      '2ms': 'تَزْئِرَ',
      '2fs': 'تَزْئِرِي',
      '3ms': 'يَزْئِرَ',
      '3fs': 'تَزْئِرَ',
      '2d': 'تَزْئِرَا',
      '3md': 'يَزْئِرَا',
      '3fd': 'تَزْئِرَا',
      '1p': 'نَزْئِرَ',
      '2mp': 'تَزْئِرُوا',
      '2fp': 'تَزْئِرْنَ',
      '3mp': 'يَزْئِرُوا',
      '3fp': 'يَزْئِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("z'r-1-a-i")!, 'jussive')).toEqualT({
      '1s': 'أَزْئِرْ',
      '2ms': 'تَزْئِرْ',
      '2fs': 'تَزْئِرِي',
      '3ms': 'يَزْئِرْ',
      '3fs': 'تَزْئِرْ',
      '2d': 'تَزْئِرَا',
      '3md': 'يَزْئِرَا',
      '3fd': 'تَزْئِرَا',
      '1p': 'نَزْئِرْ',
      '2mp': 'تَزْئِرُوا',
      '2fp': 'تَزْئِرْنَ',
      '3mp': 'يَزْئِرُوا',
      '3fp': 'يَزْئِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("z'r-1-a-i")!)).toMatchObjectT({
      '2ms': 'اِزْئِرْ',
      '2fs': 'اِزْئِرِي',
      '2d': 'اِزْئِرَا',
      '2mp': 'اِزْئِرُوا',
      '2fp': 'اِزْئِرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("z'r-1-a-i")!)).toEqualT('زَائِر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("z'r-1-a-i")!))).toEqualT(new Set(['زَأْر', 'زَئِير']))
  })
})
