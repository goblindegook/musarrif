import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('jml-1-u-u (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('jml-1-u-u')!)).toEqualT({
      '1s': 'جَمُلْتُ',
      '2ms': 'جَمُلْتَ',
      '2fs': 'جَمُلْتِ',
      '3ms': 'جَمُلَ',
      '3fs': 'جَمُلَتْ',
      '2d': 'جَمُلْتُمَا',
      '3md': 'جَمُلَا',
      '3fd': 'جَمُلَتَا',
      '1p': 'جَمُلْنَا',
      '2mp': 'جَمُلْتُمْ',
      '2fp': 'جَمُلْتُنَّ',
      '3mp': 'جَمُلُوا',
      '3fp': 'جَمُلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('jml-1-u-u')!, 'indicative')).toEqualT({
      '1s': 'أَجْمُلُ',
      '2ms': 'تَجْمُلُ',
      '2fs': 'تَجْمُلِينَ',
      '3ms': 'يَجْمُلُ',
      '3fs': 'تَجْمُلُ',
      '2d': 'تَجْمُلَانِ',
      '3md': 'يَجْمُلَانِ',
      '3fd': 'تَجْمُلَانِ',
      '1p': 'نَجْمُلُ',
      '2mp': 'تَجْمُلُونَ',
      '2fp': 'تَجْمُلْنَ',
      '3mp': 'يَجْمُلُونَ',
      '3fp': 'يَجْمُلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('jml-1-u-u')!, 'subjunctive')).toEqualT({
      '1s': 'أَجْمُلَ',
      '2ms': 'تَجْمُلَ',
      '2fs': 'تَجْمُلِي',
      '3ms': 'يَجْمُلَ',
      '3fs': 'تَجْمُلَ',
      '2d': 'تَجْمُلَا',
      '3md': 'يَجْمُلَا',
      '3fd': 'تَجْمُلَا',
      '1p': 'نَجْمُلَ',
      '2mp': 'تَجْمُلُوا',
      '2fp': 'تَجْمُلْنَ',
      '3mp': 'يَجْمُلُوا',
      '3fp': 'يَجْمُلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('jml-1-u-u')!, 'jussive')).toEqualT({
      '1s': 'أَجْمُلْ',
      '2ms': 'تَجْمُلْ',
      '2fs': 'تَجْمُلِي',
      '3ms': 'يَجْمُلْ',
      '3fs': 'تَجْمُلْ',
      '2d': 'تَجْمُلَا',
      '3md': 'يَجْمُلَا',
      '3fd': 'تَجْمُلَا',
      '1p': 'نَجْمُلْ',
      '2mp': 'تَجْمُلُوا',
      '2fp': 'تَجْمُلْنَ',
      '3mp': 'يَجْمُلُوا',
      '3fp': 'يَجْمُلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('jml-1-u-u')!)).toMatchObjectT({
      '2ms': 'اُجْمُلْ',
      '2fs': 'اُجْمُلِي',
      '2d': 'اُجْمُلَا',
      '2mp': 'اُجْمُلُوا',
      '2fp': 'اُجْمُلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('jml-1-u-u')!)).toEqualT('جَمِيل')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('jml-1-u-u')!))).toEqualT(new Set(['جَمَال']))
  })
})
