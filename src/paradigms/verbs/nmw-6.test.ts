import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('nmw-6', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('nmw-6')!)).toEqualT({
      '1s': 'تَنَامَيْتُ',
      '2ms': 'تَنَامَيْتَ',
      '2fs': 'تَنَامَيْتِ',
      '3ms': 'تَنَامَى',
      '3fs': 'تَنَامَتْ',
      '2d': 'تَنَامَيْتُمَا',
      '3md': 'تَنَامَيَا',
      '3fd': 'تَنَامَتَا',
      '1p': 'تَنَامَيْنَا',
      '2mp': 'تَنَامَيْتُمْ',
      '2fp': 'تَنَامَيْتُنَّ',
      '3mp': 'تَنَامَوْا',
      '3fp': 'تَنَامَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('nmw-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَنَامَى',
      '2ms': 'تَتَنَامَى',
      '2fs': 'تَتَنَامَيْنَ',
      '3ms': 'يَتَنَامَى',
      '3fs': 'تَتَنَامَى',
      '2d': 'تَتَنَامَيَانِ',
      '3md': 'يَتَنَامَيَانِ',
      '3fd': 'تَتَنَامَيَانِ',
      '1p': 'نَتَنَامَى',
      '2mp': 'تَتَنَامَوْنَ',
      '2fp': 'تَتَنَامَيْنَ',
      '3mp': 'يَتَنَامَوْنَ',
      '3fp': 'يَتَنَامَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('nmw-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَنَامَى',
      '2ms': 'تَتَنَامَى',
      '2fs': 'تَتَنَامَيْ',
      '3ms': 'يَتَنَامَى',
      '3fs': 'تَتَنَامَى',
      '2d': 'تَتَنَامَيَا',
      '3md': 'يَتَنَامَيَا',
      '3fd': 'تَتَنَامَيَا',
      '1p': 'نَتَنَامَى',
      '2mp': 'تَتَنَامَوْا',
      '2fp': 'تَتَنَامَيْنَ',
      '3mp': 'يَتَنَامَوْا',
      '3fp': 'يَتَنَامَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('nmw-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَنَامَ',
      '2ms': 'تَتَنَامَ',
      '2fs': 'تَتَنَامَيْ',
      '3ms': 'يَتَنَامَ',
      '3fs': 'تَتَنَامَ',
      '2d': 'تَتَنَامَيَا',
      '3md': 'يَتَنَامَيَا',
      '3fd': 'تَتَنَامَيَا',
      '1p': 'نَتَنَامَ',
      '2mp': 'تَتَنَامَوْا',
      '2fp': 'تَتَنَامَيْنَ',
      '3mp': 'يَتَنَامَوْا',
      '3fp': 'يَتَنَامَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('nmw-6')!)).toMatchObjectT({
      '2ms': 'تَنَامَ',
      '2fs': 'تَنَامَيْ',
      '2d': 'تَنَامَيَا',
      '2mp': 'تَنَامَوْا',
      '2fp': 'تَنَامَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('nmw-6')!)).toEqualT('مُتَنَامٍ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('nmw-6')!)).toEqualT(['تَنَامٍ'])
  })
})
