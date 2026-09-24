import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("b's-1-i-a (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("b's-1-i-a")!)).toEqualT({
      '1s': 'بَئِسْتُ',
      '2ms': 'بَئِسْتَ',
      '2fs': 'بَئِسْتِ',
      '3ms': 'بَئِسَ',
      '3fs': 'بَئِسَتْ',
      '2d': 'بَئِسْتُمَا',
      '3md': 'بَئِسَا',
      '3fd': 'بَئِسَتَا',
      '1p': 'بَئِسْنَا',
      '2mp': 'بَئِسْتُمْ',
      '2fp': 'بَئِسْتُنَّ',
      '3mp': 'بَئِسُوا',
      '3fp': 'بَئِسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("b's-1-i-a")!, 'indicative')).toEqualT({
      '1s': 'أَبْأَسُ',
      '2ms': 'تَبْأَسُ',
      '2fs': 'تَبْأَسِينَ',
      '3ms': 'يَبْأَسُ',
      '3fs': 'تَبْأَسُ',
      '2d': 'تَبْأَسَانِ',
      '3md': 'يَبْأَسَانِ',
      '3fd': 'تَبْأَسَانِ',
      '1p': 'نَبْأَسُ',
      '2mp': 'تَبْأَسُونَ',
      '2fp': 'تَبْأَسْنَ',
      '3mp': 'يَبْأَسُونَ',
      '3fp': 'يَبْأَسْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("b's-1-i-a")!, 'subjunctive')).toEqualT({
      '1s': 'أَبْأَسَ',
      '2ms': 'تَبْأَسَ',
      '2fs': 'تَبْأَسِي',
      '3ms': 'يَبْأَسَ',
      '3fs': 'تَبْأَسَ',
      '2d': 'تَبْأَسَا',
      '3md': 'يَبْأَسَا',
      '3fd': 'تَبْأَسَا',
      '1p': 'نَبْأَسَ',
      '2mp': 'تَبْأَسُوا',
      '2fp': 'تَبْأَسْنَ',
      '3mp': 'يَبْأَسُوا',
      '3fp': 'يَبْأَسْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("b's-1-i-a")!, 'jussive')).toEqualT({
      '1s': 'أَبْأَسْ',
      '2ms': 'تَبْأَسْ',
      '2fs': 'تَبْأَسِي',
      '3ms': 'يَبْأَسْ',
      '3fs': 'تَبْأَسْ',
      '2d': 'تَبْأَسَا',
      '3md': 'يَبْأَسَا',
      '3fd': 'تَبْأَسَا',
      '1p': 'نَبْأَسْ',
      '2mp': 'تَبْأَسُوا',
      '2fp': 'تَبْأَسْنَ',
      '3mp': 'يَبْأَسُوا',
      '3fp': 'يَبْأَسْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("b's-1-i-a")!)).toMatchObjectT({
      '2ms': 'اِبْأَسْ',
      '2fs': 'اِبْأَسِي',
      '2d': 'اِبْأَسَا',
      '2mp': 'اِبْأَسُوا',
      '2fp': 'اِبْأَسْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("b's-1-i-a")!)).toEqualT('بَائِس')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("b's-1-i-a")!))).toEqualT(new Set(['بُؤْس']))
  })
})
