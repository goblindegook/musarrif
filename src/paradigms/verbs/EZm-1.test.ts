import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('EZm-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('EZm-1')!)).toEqualT({
      '1s': 'عَظُمْتُ',
      '2ms': 'عَظُمْتَ',
      '2fs': 'عَظُمْتِ',
      '3ms': 'عَظُمَ',
      '3fs': 'عَظُمَتْ',
      '2d': 'عَظُمْتُمَا',
      '3md': 'عَظُمَا',
      '3fd': 'عَظُمَتَا',
      '1p': 'عَظُمْنَا',
      '2mp': 'عَظُمْتُمْ',
      '2fp': 'عَظُمْتُنَّ',
      '3mp': 'عَظُمُوا',
      '3fp': 'عَظُمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('EZm-1')!, 'indicative')).toEqualT({
      '1s': 'أَعْظُمُ',
      '2ms': 'تَعْظُمُ',
      '2fs': 'تَعْظُمِينَ',
      '3ms': 'يَعْظُمُ',
      '3fs': 'تَعْظُمُ',
      '2d': 'تَعْظُمَانِ',
      '3md': 'يَعْظُمَانِ',
      '3fd': 'تَعْظُمَانِ',
      '1p': 'نَعْظُمُ',
      '2mp': 'تَعْظُمُونَ',
      '2fp': 'تَعْظُمْنَ',
      '3mp': 'يَعْظُمُونَ',
      '3fp': 'يَعْظُمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('EZm-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْظُمَ',
      '2ms': 'تَعْظُمَ',
      '2fs': 'تَعْظُمِي',
      '3ms': 'يَعْظُمَ',
      '3fs': 'تَعْظُمَ',
      '2d': 'تَعْظُمَا',
      '3md': 'يَعْظُمَا',
      '3fd': 'تَعْظُمَا',
      '1p': 'نَعْظُمَ',
      '2mp': 'تَعْظُمُوا',
      '2fp': 'تَعْظُمْنَ',
      '3mp': 'يَعْظُمُوا',
      '3fp': 'يَعْظُمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('EZm-1')!, 'jussive')).toEqualT({
      '1s': 'أَعْظُمْ',
      '2ms': 'تَعْظُمْ',
      '2fs': 'تَعْظُمِي',
      '3ms': 'يَعْظُمْ',
      '3fs': 'تَعْظُمْ',
      '2d': 'تَعْظُمَا',
      '3md': 'يَعْظُمَا',
      '3fd': 'تَعْظُمَا',
      '1p': 'نَعْظُمْ',
      '2mp': 'تَعْظُمُوا',
      '2fp': 'تَعْظُمْنَ',
      '3mp': 'يَعْظُمُوا',
      '3fp': 'يَعْظُمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('EZm-1')!)).toMatchObjectT({
      '2ms': 'اُعْظُمْ',
      '2fs': 'اُعْظُمِي',
      '2d': 'اُعْظُمَا',
      '2mp': 'اُعْظُمُوا',
      '2fp': 'اُعْظُمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('EZm-1')!)).toEqualT('عَظِيم')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('EZm-1')!)).toEqualT(['عِظَم', 'عَظَامَة'])
  })
})
