import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Hbb-6', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hbb-6')!)).toEqualT({
      '1s': 'تَحَابَبْتُ',
      '2ms': 'تَحَابَبْتَ',
      '2fs': 'تَحَابَبْتِ',
      '3ms': 'تَحَابَّ',
      '3fs': 'تَحَابَّتْ',
      '2d': 'تَحَابَبْتُمَا',
      '3md': 'تَحَابَّا',
      '3fd': 'تَحَابَّتَا',
      '1p': 'تَحَابَبْنَا',
      '2mp': 'تَحَابَبْتُمْ',
      '2fp': 'تَحَابَبْتُنَّ',
      '3mp': 'تَحَابُّوا',
      '3fp': 'تَحَابَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَحَابُّ',
      '2ms': 'تَتَحَابُّ',
      '2fs': 'تَتَحَابِّينَ',
      '3ms': 'يَتَحَابُّ',
      '3fs': 'تَتَحَابُّ',
      '2d': 'تَتَحَابَّانِ',
      '3md': 'يَتَحَابَّانِ',
      '3fd': 'تَتَحَابَّانِ',
      '1p': 'نَتَحَابُّ',
      '2mp': 'تَتَحَابُّونَ',
      '2fp': 'تَتَحَابَبْنَ',
      '3mp': 'يَتَحَابُّونَ',
      '3fp': 'يَتَحَابَبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَحَابَّ',
      '2ms': 'تَتَحَابَّ',
      '2fs': 'تَتَحَابِّي',
      '3ms': 'يَتَحَابَّ',
      '3fs': 'تَتَحَابَّ',
      '2d': 'تَتَحَابَّا',
      '3md': 'يَتَحَابَّا',
      '3fd': 'تَتَحَابَّا',
      '1p': 'نَتَحَابَّ',
      '2mp': 'تَتَحَابُّوا',
      '2fp': 'تَتَحَابَبْنَ',
      '3mp': 'يَتَحَابُّوا',
      '3fp': 'يَتَحَابَبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hbb-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَحَابَّ',
      '2ms': 'تَتَحَابَّ',
      '2fs': 'تَتَحَابِّي',
      '3ms': 'يَتَحَابَّ',
      '3fs': 'تَتَحَابَّ',
      '2d': 'تَتَحَابَّا',
      '3md': 'يَتَحَابَّا',
      '3fd': 'تَتَحَابَّا',
      '1p': 'نَتَحَابَّ',
      '2mp': 'تَتَحَابُّوا',
      '2fp': 'تَتَحَابَبْنَ',
      '3mp': 'يَتَحَابُّوا',
      '3fp': 'يَتَحَابَبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hbb-6')!)).toMatchObjectT({
      '2ms': 'تَحَابَّ',
      '2fs': 'تَحَابِّي',
      '2d': 'تَحَابَّا',
      '2mp': 'تَحَابُّوا',
      '2fp': 'تَحَابَبْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hbb-6')!)).toEqualT('مُتَحَابّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Hbb-6')!)).toEqualT(['تَحَابّ'])
  })
})
