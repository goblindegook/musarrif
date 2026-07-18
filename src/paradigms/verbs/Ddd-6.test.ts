import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Ddd-6', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ddd-6')!)).toEqualT({
      '1s': 'تَضَادَدْتُ',
      '2ms': 'تَضَادَدْتَ',
      '2fs': 'تَضَادَدْتِ',
      '3ms': 'تَضَادَّ',
      '3fs': 'تَضَادَّتْ',
      '2d': 'تَضَادَدْتُمَا',
      '3md': 'تَضَادَّا',
      '3fd': 'تَضَادَّتَا',
      '1p': 'تَضَادَدْنَا',
      '2mp': 'تَضَادَدْتُمْ',
      '2fp': 'تَضَادَدْتُنَّ',
      '3mp': 'تَضَادُّوا',
      '3fp': 'تَضَادَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ddd-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَضَادُّ',
      '2ms': 'تَتَضَادُّ',
      '2fs': 'تَتَضَادِّينَ',
      '3ms': 'يَتَضَادُّ',
      '3fs': 'تَتَضَادُّ',
      '2d': 'تَتَضَادَّانِ',
      '3md': 'يَتَضَادَّانِ',
      '3fd': 'تَتَضَادَّانِ',
      '1p': 'نَتَضَادُّ',
      '2mp': 'تَتَضَادُّونَ',
      '2fp': 'تَتَضَادَدْنَ',
      '3mp': 'يَتَضَادُّونَ',
      '3fp': 'يَتَضَادَدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ddd-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَضَادَّ',
      '2ms': 'تَتَضَادَّ',
      '2fs': 'تَتَضَادِّي',
      '3ms': 'يَتَضَادَّ',
      '3fs': 'تَتَضَادَّ',
      '2d': 'تَتَضَادَّا',
      '3md': 'يَتَضَادَّا',
      '3fd': 'تَتَضَادَّا',
      '1p': 'نَتَضَادَّ',
      '2mp': 'تَتَضَادُّوا',
      '2fp': 'تَتَضَادَدْنَ',
      '3mp': 'يَتَضَادُّوا',
      '3fp': 'يَتَضَادَدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ddd-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَضَادَّ',
      '2ms': 'تَتَضَادَّ',
      '2fs': 'تَتَضَادِّي',
      '3ms': 'يَتَضَادَّ',
      '3fs': 'تَتَضَادَّ',
      '2d': 'تَتَضَادَّا',
      '3md': 'يَتَضَادَّا',
      '3fd': 'تَتَضَادَّا',
      '1p': 'نَتَضَادَّ',
      '2mp': 'تَتَضَادُّوا',
      '2fp': 'تَتَضَادَدْنَ',
      '3mp': 'يَتَضَادُّوا',
      '3fp': 'يَتَضَادَدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ddd-6')!)).toMatchObjectT({
      '2ms': 'تَضَادَّ',
      '2fs': 'تَضَادِّي',
      '2d': 'تَضَادَّا',
      '2mp': 'تَضَادُّوا',
      '2fp': 'تَضَادَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ddd-6')!)).toEqualT('مُتَضَادّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Ddd-6')!)).toEqualT(['تَضَادّ'])
  })
})
