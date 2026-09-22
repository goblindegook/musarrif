import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("S'y-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("S'y-1")!)).toEqualT({
      '1s': 'صَأَيْتُ',
      '2ms': 'صَأَيْتَ',
      '2fs': 'صَأَيْتِ',
      '3ms': 'صَأَى',
      '3fs': 'صَأَتْ',
      '2d': 'صَأَيْتُمَا',
      '3md': 'صَأَيَا',
      '3fd': 'صَأَتَا',
      '1p': 'صَأَيْنَا',
      '2mp': 'صَأَيْتُمْ',
      '2fp': 'صَأَيْتُنَّ',
      '3mp': 'صَأَوْا',
      '3fp': 'صَأَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("S'y-1")!, 'indicative')).toEqualT({
      '1s': 'أَصْأَى',
      '2ms': 'تَصْأَى',
      '2fs': 'تَصْأَيْنَ',
      '3ms': 'يَصْأَى',
      '3fs': 'تَصْأَى',
      '2d': 'تَصْأَيَانِ',
      '3md': 'يَصْأَيَانِ',
      '3fd': 'تَصْأَيَانِ',
      '1p': 'نَصْأَى',
      '2mp': 'تَصْأَوْنَ',
      '2fp': 'تَصْأَيْنَ',
      '3mp': 'يَصْأَوْنَ',
      '3fp': 'يَصْأَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("S'y-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَصْأَى',
      '2ms': 'تَصْأَى',
      '2fs': 'تَصْأَيْ',
      '3ms': 'يَصْأَى',
      '3fs': 'تَصْأَى',
      '2d': 'تَصْأَيَا',
      '3md': 'يَصْأَيَا',
      '3fd': 'تَصْأَيَا',
      '1p': 'نَصْأَى',
      '2mp': 'تَصْأَوْا',
      '2fp': 'تَصْأَيْنَ',
      '3mp': 'يَصْأَوْا',
      '3fp': 'يَصْأَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("S'y-1")!, 'jussive')).toEqualT({
      '1s': expect.toBeOneOf(['أَصْءَ', 'أَصْأَ']),
      '2ms': expect.toBeOneOf(['تَصْءَ', 'تَصْأَ']),
      '2fs': 'تَصْأَيْ',
      '3ms': expect.toBeOneOf(['يَصْءَ', 'يَصْأَ']),
      '3fs': expect.toBeOneOf(['تَصْءَ', 'تَصْأَ']),
      '2d': 'تَصْأَيَا',
      '3md': 'يَصْأَيَا',
      '3fd': 'تَصْأَيَا',
      '1p': expect.toBeOneOf(['نَصْءَ', 'نَصْأَ']),
      '2mp': 'تَصْأَوْا',
      '2fp': 'تَصْأَيْنَ',
      '3mp': 'يَصْأَوْا',
      '3fp': 'يَصْأَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("S'y-1")!)).toMatchObjectT({
      '2ms': expect.toBeOneOf(['اِصْءَ', 'اِصْأَ']),
      '2fs': 'اِصْأَيْ',
      '2d': 'اِصْأَيَا',
      '2mp': 'اِصْأَوْا',
      '2fp': 'اِصْأَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("S'y-1")!)).toEqualT('صَاءٍ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("S'y-1")!))).toEqualT(new Set(['صَئِيّ', 'صِئِيّ', 'صُئِيّ']))
  })
})
