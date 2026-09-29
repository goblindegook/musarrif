import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("'xw-6 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'xw-6")!)).toEqualT({
      '1s': 'تَآخَيْتُ',
      '2ms': 'تَآخَيْتَ',
      '2fs': 'تَآخَيْتِ',
      '3ms': 'تَآخَى',
      '3fs': 'تَآخَتْ',
      '2d': 'تَآخَيْتُمَا',
      '3md': 'تَآخَيَا',
      '3fd': 'تَآخَتَا',
      '1p': 'تَآخَيْنَا',
      '2mp': 'تَآخَيْتُمْ',
      '2fp': 'تَآخَيْتُنَّ',
      '3mp': 'تَآخَوْا',
      '3fp': 'تَآخَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'xw-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَآخَى',
      '2ms': 'تَتَآخَى',
      '2fs': 'تَتَآخَيْنَ',
      '3ms': 'يَتَآخَى',
      '3fs': 'تَتَآخَى',
      '2d': 'تَتَآخَيَانِ',
      '3md': 'يَتَآخَيَانِ',
      '3fd': 'تَتَآخَيَانِ',
      '1p': 'نَتَآخَى',
      '2mp': 'تَتَآخَوْنَ',
      '2fp': 'تَتَآخَيْنَ',
      '3mp': 'يَتَآخَوْنَ',
      '3fp': 'يَتَآخَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'xw-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَآخَى',
      '2ms': 'تَتَآخَى',
      '2fs': 'تَتَآخَيْ',
      '3ms': 'يَتَآخَى',
      '3fs': 'تَتَآخَى',
      '2d': 'تَتَآخَيَا',
      '3md': 'يَتَآخَيَا',
      '3fd': 'تَتَآخَيَا',
      '1p': 'نَتَآخَى',
      '2mp': 'تَتَآخَوْا',
      '2fp': 'تَتَآخَيْنَ',
      '3mp': 'يَتَآخَوْا',
      '3fp': 'يَتَآخَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'xw-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَآخَ',
      '2ms': 'تَتَآخَ',
      '2fs': 'تَتَآخَيْ',
      '3ms': 'يَتَآخَ',
      '3fs': 'تَتَآخَ',
      '2d': 'تَتَآخَيَا',
      '3md': 'يَتَآخَيَا',
      '3fd': 'تَتَآخَيَا',
      '1p': 'نَتَآخَ',
      '2mp': 'تَتَآخَوْا',
      '2fp': 'تَتَآخَيْنَ',
      '3mp': 'يَتَآخَوْا',
      '3fp': 'يَتَآخَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'xw-6")!)).toMatchObjectT({
      '2ms': 'تَآخَ',
      '2fs': 'تَآخَيْ',
      '2d': 'تَآخَيَا',
      '2mp': 'تَآخَوْا',
      '2fp': 'تَآخَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'xw-6")!)).toEqualT('مُتَآخٍ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'xw-6")!))).toEqualT(new Set(['تَآخٍ']))
  })
})
