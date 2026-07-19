import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('wjz-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wjz-1')!)).toEqualT({
      '1s': 'وَجُزْتُ',
      '2ms': 'وَجُزْتَ',
      '2fs': 'وَجُزْتِ',
      '3ms': 'وَجُزَ',
      '3fs': 'وَجُزَتْ',
      '2d': 'وَجُزْتُمَا',
      '3md': 'وَجُزَا',
      '3fd': 'وَجُزَتَا',
      '1p': 'وَجُزْنَا',
      '2mp': 'وَجُزْتُمْ',
      '2fp': 'وَجُزْتُنَّ',
      '3mp': 'وَجُزُوا',
      '3fp': 'وَجُزْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wjz-1')!, 'indicative')).toEqualT({
      '1s': 'أَوْجُزُ',
      '2ms': 'تَوْجُزُ',
      '2fs': 'تَوْجُزِينَ',
      '3ms': 'يَوْجُزُ',
      '3fs': 'تَوْجُزُ',
      '2d': 'تَوْجُزَانِ',
      '3md': 'يَوْجُزَانِ',
      '3fd': 'تَوْجُزَانِ',
      '1p': 'نَوْجُزُ',
      '2mp': 'تَوْجُزُونَ',
      '2fp': 'تَوْجُزْنَ',
      '3mp': 'يَوْجُزُونَ',
      '3fp': 'يَوْجُزْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wjz-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَوْجُزَ',
      '2ms': 'تَوْجُزَ',
      '2fs': 'تَوْجُزِي',
      '3ms': 'يَوْجُزَ',
      '3fs': 'تَوْجُزَ',
      '2d': 'تَوْجُزَا',
      '3md': 'يَوْجُزَا',
      '3fd': 'تَوْجُزَا',
      '1p': 'نَوْجُزَ',
      '2mp': 'تَوْجُزُوا',
      '2fp': 'تَوْجُزْنَ',
      '3mp': 'يَوْجُزُوا',
      '3fp': 'يَوْجُزْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wjz-1')!, 'jussive')).toEqualT({
      '1s': 'أَوْجُزْ',
      '2ms': 'تَوْجُزْ',
      '2fs': 'تَوْجُزِي',
      '3ms': 'يَوْجُزْ',
      '3fs': 'تَوْجُزْ',
      '2d': 'تَوْجُزَا',
      '3md': 'يَوْجُزَا',
      '3fd': 'تَوْجُزَا',
      '1p': 'نَوْجُزْ',
      '2mp': 'تَوْجُزُوا',
      '2fp': 'تَوْجُزْنَ',
      '3mp': 'يَوْجُزُوا',
      '3fp': 'يَوْجُزْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wjz-1')!)).toMatchObjectT({
      '2ms': 'اُوجُزْ',
      '2fs': 'اُوجُزِي',
      '2d': 'اُوجُزَا',
      '2mp': 'اُوجُزُوا',
      '2fp': 'اُوجُزْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wjz-1')!)).toEqualT('وَجِيز')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wjz-1')!)).toEqualT(['وَجَازَة'])
  })
})
