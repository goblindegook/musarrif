import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('wxm-1-i-a (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wxm-1-i-a')!)).toEqualT({
      '1s': 'وَخِمْتُ',
      '2ms': 'وَخِمْتَ',
      '2fs': 'وَخِمْتِ',
      '3ms': 'وَخِمَ',
      '3fs': 'وَخِمَتْ',
      '2d': 'وَخِمْتُمَا',
      '3md': 'وَخِمَا',
      '3fd': 'وَخِمَتَا',
      '1p': 'وَخِمْنَا',
      '2mp': 'وَخِمْتُمْ',
      '2fp': 'وَخِمْتُنَّ',
      '3mp': 'وَخِمُوا',
      '3fp': 'وَخِمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wxm-1-i-a')!, 'indicative')).toEqualT({
      '1s': 'أَوْخَمُ',
      '2ms': 'تَوْخَمُ',
      '2fs': 'تَوْخَمِينَ',
      '3ms': 'يَوْخَمُ',
      '3fs': 'تَوْخَمُ',
      '2d': 'تَوْخَمَانِ',
      '3md': 'يَوْخَمَانِ',
      '3fd': 'تَوْخَمَانِ',
      '1p': 'نَوْخَمُ',
      '2mp': 'تَوْخَمُونَ',
      '2fp': 'تَوْخَمْنَ',
      '3mp': 'يَوْخَمُونَ',
      '3fp': 'يَوْخَمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wxm-1-i-a')!, 'subjunctive')).toEqualT({
      '1s': 'أَوْخَمَ',
      '2ms': 'تَوْخَمَ',
      '2fs': 'تَوْخَمِي',
      '3ms': 'يَوْخَمَ',
      '3fs': 'تَوْخَمَ',
      '2d': 'تَوْخَمَا',
      '3md': 'يَوْخَمَا',
      '3fd': 'تَوْخَمَا',
      '1p': 'نَوْخَمَ',
      '2mp': 'تَوْخَمُوا',
      '2fp': 'تَوْخَمْنَ',
      '3mp': 'يَوْخَمُوا',
      '3fp': 'يَوْخَمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wxm-1-i-a')!, 'jussive')).toEqualT({
      '1s': 'أَوْخَمْ',
      '2ms': 'تَوْخَمْ',
      '2fs': 'تَوْخَمِي',
      '3ms': 'يَوْخَمْ',
      '3fs': 'تَوْخَمْ',
      '2d': 'تَوْخَمَا',
      '3md': 'يَوْخَمَا',
      '3fd': 'تَوْخَمَا',
      '1p': 'نَوْخَمْ',
      '2mp': 'تَوْخَمُوا',
      '2fp': 'تَوْخَمْنَ',
      '3mp': 'يَوْخَمُوا',
      '3fp': 'يَوْخَمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wxm-1-i-a')!)).toMatchObjectT({
      '2ms': 'اِيخَمْ',
      '2fs': 'اِيخَمِي',
      '2d': 'اِيخَمَا',
      '2mp': 'اِيخَمُوا',
      '2fp': 'اِيخَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wxm-1-i-a')!)).toEqualT('وَخِم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wxm-1-i-a')!))).toEqualT(new Set(['وَخَم']))
  })
})
