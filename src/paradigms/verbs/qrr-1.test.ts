import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('qrr-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('qrr-1')!)).toEqualT({
      '1s': 'قَرَرْتُ',
      '2ms': 'قَرَرْتَ',
      '2fs': 'قَرَرْتِ',
      '3ms': 'قَرَّ',
      '3fs': 'قَرَّتْ',
      '2d': 'قَرَرْتُمَا',
      '3md': 'قَرَّا',
      '3fd': 'قَرَّتَا',
      '1p': 'قَرَرْنَا',
      '2mp': 'قَرَرْتُمْ',
      '2fp': 'قَرَرْتُنَّ',
      '3mp': 'قَرُّوا',
      '3fp': 'قَرَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('qrr-1')!, 'indicative')).toEqualT({
      '1s': 'أَقِرُّ',
      '2ms': 'تَقِرُّ',
      '2fs': 'تَقِرِّينَ',
      '3ms': 'يَقِرُّ',
      '3fs': 'تَقِرُّ',
      '2d': 'تَقِرَّانِ',
      '3md': 'يَقِرَّانِ',
      '3fd': 'تَقِرَّانِ',
      '1p': 'نَقِرُّ',
      '2mp': 'تَقِرُّونَ',
      '2fp': 'تَقْرِرْنَ',
      '3mp': 'يَقِرُّونَ',
      '3fp': 'يَقْرِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('qrr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَقِرَّ',
      '2ms': 'تَقِرَّ',
      '2fs': 'تَقِرِّي',
      '3ms': 'يَقِرَّ',
      '3fs': 'تَقِرَّ',
      '2d': 'تَقِرَّا',
      '3md': 'يَقِرَّا',
      '3fd': 'تَقِرَّا',
      '1p': 'نَقِرَّ',
      '2mp': 'تَقِرُّوا',
      '2fp': 'تَقْرِرْنَ',
      '3mp': 'يَقِرُّوا',
      '3fp': 'يَقْرِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('qrr-1')!, 'jussive')).toEqualT({
      '1s': 'أَقِرَّ',
      '2ms': 'تَقِرَّ',
      '2fs': 'تَقِرِّي',
      '3ms': 'يَقِرَّ',
      '3fs': 'تَقِرَّ',
      '2d': 'تَقِرَّا',
      '3md': 'يَقِرَّا',
      '3fd': 'تَقِرَّا',
      '1p': 'نَقِرَّ',
      '2mp': 'تَقِرُّوا',
      '2fp': 'تَقْرِرْنَ',
      '3mp': 'يَقِرُّوا',
      '3fp': 'يَقْرِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('qrr-1')!)).toMatchObjectT({
      '2ms': 'قِرَّ',
      '2fs': 'قِرِّي',
      '2d': 'قِرَّا',
      '2mp': 'قِرُّوا',
      '2fp': 'اِقْرِرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('qrr-1')!)).toEqualT('قَارّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('qrr-1')!)).toEqualT(['قَرّ', 'قُرَّة', 'قُرُور', 'قَرَّة'])
  })
})
