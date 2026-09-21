import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("b's-1-u-u (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("b's-1-u-u")!)).toEqualT({
      '1s': 'بَؤُسْتُ',
      '2ms': 'بَؤُسْتَ',
      '2fs': 'بَؤُسْتِ',
      '3ms': 'بَؤُسَ',
      '3fs': 'بَؤُسَتْ',
      '2d': 'بَؤُسْتُمَا',
      '3md': 'بَؤُسَا',
      '3fd': 'بَؤُسَتَا',
      '1p': 'بَؤُسْنَا',
      '2mp': 'بَؤُسْتُمْ',
      '2fp': 'بَؤُسْتُنَّ',
      '3mp': 'بَؤُسُوا',
      '3fp': 'بَؤُسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("b's-1-u-u")!, 'indicative')).toEqualT({
      '1s': 'أَبْؤُسُ',
      '2ms': 'تَبْؤُسُ',
      '2fs': 'تَبْؤُسِينَ',
      '3ms': 'يَبْؤُسُ',
      '3fs': 'تَبْؤُسُ',
      '2d': 'تَبْؤُسَانِ',
      '3md': 'يَبْؤُسَانِ',
      '3fd': 'تَبْؤُسَانِ',
      '1p': 'نَبْؤُسُ',
      '2mp': 'تَبْؤُسُونَ',
      '2fp': 'تَبْؤُسْنَ',
      '3mp': 'يَبْؤُسُونَ',
      '3fp': 'يَبْؤُسْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("b's-1-u-u")!, 'subjunctive')).toEqualT({
      '1s': 'أَبْؤُسَ',
      '2ms': 'تَبْؤُسَ',
      '2fs': 'تَبْؤُسِي',
      '3ms': 'يَبْؤُسَ',
      '3fs': 'تَبْؤُسَ',
      '2d': 'تَبْؤُسَا',
      '3md': 'يَبْؤُسَا',
      '3fd': 'تَبْؤُسَا',
      '1p': 'نَبْؤُسَ',
      '2mp': 'تَبْؤُسُوا',
      '2fp': 'تَبْؤُسْنَ',
      '3mp': 'يَبْؤُسُوا',
      '3fp': 'يَبْؤُسْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("b's-1-u-u")!, 'jussive')).toEqualT({
      '1s': 'أَبْؤُسْ',
      '2ms': 'تَبْؤُسْ',
      '2fs': 'تَبْؤُسِي',
      '3ms': 'يَبْؤُسْ',
      '3fs': 'تَبْؤُسْ',
      '2d': 'تَبْؤُسَا',
      '3md': 'يَبْؤُسَا',
      '3fd': 'تَبْؤُسَا',
      '1p': 'نَبْؤُسْ',
      '2mp': 'تَبْؤُسُوا',
      '2fp': 'تَبْؤُسْنَ',
      '3mp': 'يَبْؤُسُوا',
      '3fp': 'يَبْؤُسْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("b's-1-u-u")!)).toMatchObjectT({
      '2ms': 'اُبْؤُسْ',
      '2fs': 'اُبْؤُسِي',
      '2d': 'اُبْؤُسَا',
      '2mp': 'اُبْؤُسُوا',
      '2fp': 'اُبْؤُسْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("b's-1-u-u")!)).toEqualT('بَئِيس')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("b's-1-u-u")!))).toEqualT(new Set(['بَأْس']))
  })
})
