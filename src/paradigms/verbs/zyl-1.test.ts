import { describe, expect, test } from 'vitest'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { getVerbById } from '../verbs'

describe('zyl-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('zyl-1')!)).toEqualT({
      '1s': 'زِلْتُ',
      '2ms': 'زِلْتَ',
      '2fs': 'زِلْتِ',
      '3ms': 'زَالَ',
      '3fs': 'زَالَتْ',
      '2d': 'زِلْتُمَا',
      '3md': 'زَالَا',
      '3fd': 'زَالَتَا',
      '1p': 'زِلْنَا',
      '2mp': 'زِلْتُمْ',
      '2fp': 'زِلْتُنَّ',
      '3mp': 'زَالُوا',
      '3fp': 'زِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('zyl-1')!, 'indicative')).toEqualT({
      '1s': 'أَزَالُ',
      '2ms': 'تَزَالُ',
      '2fs': 'تَزَالِينَ',
      '3ms': 'يَزَالُ',
      '3fs': 'تَزَالُ',
      '2d': 'تَزَالَانِ',
      '3md': 'يَزَالَانِ',
      '3fd': 'تَزَالَانِ',
      '1p': 'نَزَالُ',
      '2mp': 'تَزَالُونَ',
      '2fp': 'تَزَلْنَ',
      '3mp': 'يَزَالُونَ',
      '3fp': 'يَزَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('zyl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَزَالَ',
      '2ms': 'تَزَالَ',
      '2fs': 'تَزَالِي',
      '3ms': 'يَزَالَ',
      '3fs': 'تَزَالَ',
      '2d': 'تَزَالَا',
      '3md': 'يَزَالَا',
      '3fd': 'تَزَالَا',
      '1p': 'نَزَالَ',
      '2mp': 'تَزَالُوا',
      '2fp': 'تَزَلْنَ',
      '3mp': 'يَزَالُوا',
      '3fp': 'يَزَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('zyl-1')!, 'jussive')).toEqualT({
      '1s': 'أَزَلْ',
      '2ms': 'تَزَلْ',
      '2fs': 'تَزَالِي',
      '3ms': 'يَزَلْ',
      '3fs': 'تَزَلْ',
      '2d': 'تَزَالَا',
      '3md': 'يَزَالَا',
      '3fd': 'تَزَالَا',
      '1p': 'نَزَلْ',
      '2mp': 'تَزَالُوا',
      '2fp': 'تَزَلْنَ',
      '3mp': 'يَزَالُوا',
      '3fp': 'يَزَلْنَ',
    })
  })
})
