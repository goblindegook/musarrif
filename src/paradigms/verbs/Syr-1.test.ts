import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Syr-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Syr-1')!)).toEqualT({
      '1s': 'صِرْتُ',
      '2ms': 'صِرْتَ',
      '2fs': 'صِرْتِ',
      '3ms': 'صَارَ',
      '3fs': 'صَارَتْ',
      '2d': 'صِرْتُمَا',
      '3md': 'صَارَا',
      '3fd': 'صَارَتَا',
      '1p': 'صِرْنَا',
      '2mp': 'صِرْتُمْ',
      '2fp': 'صِرْتُنَّ',
      '3mp': 'صَارُوا',
      '3fp': 'صِرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Syr-1')!, 'indicative')).toEqualT({
      '1s': 'أَصِيرُ',
      '2ms': 'تَصِيرُ',
      '2fs': 'تَصِيرِينَ',
      '3ms': 'يَصِيرُ',
      '3fs': 'تَصِيرُ',
      '2d': 'تَصِيرَانِ',
      '3md': 'يَصِيرَانِ',
      '3fd': 'تَصِيرَانِ',
      '1p': 'نَصِيرُ',
      '2mp': 'تَصِيرُونَ',
      '2fp': 'تَصِرْنَ',
      '3mp': 'يَصِيرُونَ',
      '3fp': 'يَصِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Syr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَصِيرَ',
      '2ms': 'تَصِيرَ',
      '2fs': 'تَصِيرِي',
      '3ms': 'يَصِيرَ',
      '3fs': 'تَصِيرَ',
      '2d': 'تَصِيرَا',
      '3md': 'يَصِيرَا',
      '3fd': 'تَصِيرَا',
      '1p': 'نَصِيرَ',
      '2mp': 'تَصِيرُوا',
      '2fp': 'تَصِرْنَ',
      '3mp': 'يَصِيرُوا',
      '3fp': 'يَصِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Syr-1')!, 'jussive')).toEqualT({
      '1s': 'أَصِرْ',
      '2ms': 'تَصِرْ',
      '2fs': 'تَصِيرِي',
      '3ms': 'يَصِرْ',
      '3fs': 'تَصِرْ',
      '2d': 'تَصِيرَا',
      '3md': 'يَصِيرَا',
      '3fd': 'تَصِيرَا',
      '1p': 'نَصِرْ',
      '2mp': 'تَصِيرُوا',
      '2fp': 'تَصِرْنَ',
      '3mp': 'يَصِيرُوا',
      '3fp': 'يَصِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Syr-1')!)).toMatchObjectT({
      '2ms': 'صِرْ',
      '2fs': 'صِيرِي',
      '2d': 'صِيرَا',
      '2mp': 'صِيرُوا',
      '2fp': 'صِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Syr-1')!)).toMatchObjectT({
      '3ms': 'صِيرَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Syr-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُصَارُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Syr-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُصَارَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Syr-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُصَرْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Syr-1')!)).toEqualT('صَائِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Syr-1')!)).toEqualT('مَصِير')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Syr-1')!))).toEqualT(new Set(['صَيْر', 'صَيْرُورَة', 'مَصِير']))
  })
})
