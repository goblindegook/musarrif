import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Sgr-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Sgr-1')!)).toEqualT({
      '1s': 'صَغُرْتُ',
      '2ms': 'صَغُرْتَ',
      '2fs': 'صَغُرْتِ',
      '3ms': 'صَغُرَ',
      '3fs': 'صَغُرَتْ',
      '2d': 'صَغُرْتُمَا',
      '3md': 'صَغُرَا',
      '3fd': 'صَغُرَتَا',
      '1p': 'صَغُرْنَا',
      '2mp': 'صَغُرْتُمْ',
      '2fp': 'صَغُرْتُنَّ',
      '3mp': 'صَغُرُوا',
      '3fp': 'صَغُرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Sgr-1')!, 'indicative')).toEqualT({
      '1s': 'أَصْغُرُ',
      '2ms': 'تَصْغُرُ',
      '2fs': 'تَصْغُرِينَ',
      '3ms': 'يَصْغُرُ',
      '3fs': 'تَصْغُرُ',
      '2d': 'تَصْغُرَانِ',
      '3md': 'يَصْغُرَانِ',
      '3fd': 'تَصْغُرَانِ',
      '1p': 'نَصْغُرُ',
      '2mp': 'تَصْغُرُونَ',
      '2fp': 'تَصْغُرْنَ',
      '3mp': 'يَصْغُرُونَ',
      '3fp': 'يَصْغُرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Sgr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَصْغُرَ',
      '2ms': 'تَصْغُرَ',
      '2fs': 'تَصْغُرِي',
      '3ms': 'يَصْغُرَ',
      '3fs': 'تَصْغُرَ',
      '2d': 'تَصْغُرَا',
      '3md': 'يَصْغُرَا',
      '3fd': 'تَصْغُرَا',
      '1p': 'نَصْغُرَ',
      '2mp': 'تَصْغُرُوا',
      '2fp': 'تَصْغُرْنَ',
      '3mp': 'يَصْغُرُوا',
      '3fp': 'يَصْغُرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Sgr-1')!, 'jussive')).toEqualT({
      '1s': 'أَصْغُرْ',
      '2ms': 'تَصْغُرْ',
      '2fs': 'تَصْغُرِي',
      '3ms': 'يَصْغُرْ',
      '3fs': 'تَصْغُرْ',
      '2d': 'تَصْغُرَا',
      '3md': 'يَصْغُرَا',
      '3fd': 'تَصْغُرَا',
      '1p': 'نَصْغُرْ',
      '2mp': 'تَصْغُرُوا',
      '2fp': 'تَصْغُرْنَ',
      '3mp': 'يَصْغُرُوا',
      '3fp': 'يَصْغُرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Sgr-1')!)).toMatchObjectT({
      '2ms': 'اُصْغُرْ',
      '2fs': 'اُصْغُرِي',
      '2d': 'اُصْغُرَا',
      '2mp': 'اُصْغُرُوا',
      '2fp': 'اُصْغُرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Sgr-1')!)).toEqualT('صَاغِر')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Sgr-1')!)).toEqualT(['صِغَر', 'صَغَارَة', 'صَغَار'])
  })
})
