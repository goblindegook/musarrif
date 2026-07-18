import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('mss-6', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mss-6')!)).toEqualT({
      '1s': 'تَمَاسَسْتُ',
      '2ms': 'تَمَاسَسْتَ',
      '2fs': 'تَمَاسَسْتِ',
      '3ms': 'تَمَاسَّ',
      '3fs': 'تَمَاسَّتْ',
      '2d': 'تَمَاسَسْتُمَا',
      '3md': 'تَمَاسَّا',
      '3fd': 'تَمَاسَّتَا',
      '1p': 'تَمَاسَسْنَا',
      '2mp': 'تَمَاسَسْتُمْ',
      '2fp': 'تَمَاسَسْتُنَّ',
      '3mp': 'تَمَاسُّوا',
      '3fp': 'تَمَاسَسْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mss-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَمَاسُّ',
      '2ms': 'تَتَمَاسُّ',
      '2fs': 'تَتَمَاسِّينَ',
      '3ms': 'يَتَمَاسُّ',
      '3fs': 'تَتَمَاسُّ',
      '2d': 'تَتَمَاسَّانِ',
      '3md': 'يَتَمَاسَّانِ',
      '3fd': 'تَتَمَاسَّانِ',
      '1p': 'نَتَمَاسُّ',
      '2mp': 'تَتَمَاسُّونَ',
      '2fp': 'تَتَمَاسَسْنَ',
      '3mp': 'يَتَمَاسُّونَ',
      '3fp': 'يَتَمَاسَسْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mss-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَمَاسَّ',
      '2ms': 'تَتَمَاسَّ',
      '2fs': 'تَتَمَاسِّي',
      '3ms': 'يَتَمَاسَّ',
      '3fs': 'تَتَمَاسَّ',
      '2d': 'تَتَمَاسَّا',
      '3md': 'يَتَمَاسَّا',
      '3fd': 'تَتَمَاسَّا',
      '1p': 'نَتَمَاسَّ',
      '2mp': 'تَتَمَاسُّوا',
      '2fp': 'تَتَمَاسَسْنَ',
      '3mp': 'يَتَمَاسُّوا',
      '3fp': 'يَتَمَاسَسْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mss-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَمَاسَّ',
      '2ms': 'تَتَمَاسَّ',
      '2fs': 'تَتَمَاسِّي',
      '3ms': 'يَتَمَاسَّ',
      '3fs': 'تَتَمَاسَّ',
      '2d': 'تَتَمَاسَّا',
      '3md': 'يَتَمَاسَّا',
      '3fd': 'تَتَمَاسَّا',
      '1p': 'نَتَمَاسَّ',
      '2mp': 'تَتَمَاسُّوا',
      '2fp': 'تَتَمَاسَسْنَ',
      '3mp': 'يَتَمَاسُّوا',
      '3fp': 'يَتَمَاسَسْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mss-6')!)).toMatchObjectT({
      '2ms': 'تَمَاسَّ',
      '2fs': 'تَمَاسِّي',
      '2d': 'تَمَاسَّا',
      '2mp': 'تَمَاسُّوا',
      '2fp': 'تَمَاسَسْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mss-6')!)).toEqualT('مُتَمَاسّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mss-6')!)).toEqualT(['تَمَاسّ'])
  })
})
