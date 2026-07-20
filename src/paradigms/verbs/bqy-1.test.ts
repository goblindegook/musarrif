import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('bqy-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('bqy-1')!)).toEqualT({
      '1s': 'بَقِيتُ',
      '2ms': 'بَقِيتَ',
      '2fs': 'بَقِيتِ',
      '3ms': 'بَقِيَ',
      '3fs': 'بَقِيَتْ',
      '2d': 'بَقِيتُمَا',
      '3md': 'بَقِيَا',
      '3fd': 'بَقِيَتَا',
      '1p': 'بَقِينَا',
      '2mp': 'بَقِيتُمْ',
      '2fp': 'بَقِيتُنَّ',
      '3mp': 'بَقُوا',
      '3fp': 'بَقِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('bqy-1')!, 'indicative')).toEqualT({
      '1s': 'أَبْقَى',
      '2ms': 'تَبْقَى',
      '2fs': 'تَبْقَيْنَ',
      '3ms': 'يَبْقَى',
      '3fs': 'تَبْقَى',
      '2d': 'تَبْقَيَانِ',
      '3md': 'يَبْقَيَانِ',
      '3fd': 'تَبْقَيَانِ',
      '1p': 'نَبْقَى',
      '2mp': 'تَبْقَوْنَ',
      '2fp': 'تَبْقَيْنَ',
      '3mp': 'يَبْقَوْنَ',
      '3fp': 'يَبْقَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('bqy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَبْقَى',
      '2ms': 'تَبْقَى',
      '2fs': 'تَبْقَيْ',
      '3ms': 'يَبْقَى',
      '3fs': 'تَبْقَى',
      '2d': 'تَبْقَيَا',
      '3md': 'يَبْقَيَا',
      '3fd': 'تَبْقَيَا',
      '1p': 'نَبْقَى',
      '2mp': 'تَبْقَوْا',
      '2fp': 'تَبْقَيْنَ',
      '3mp': 'يَبْقَوْا',
      '3fp': 'يَبْقَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('bqy-1')!, 'jussive')).toEqualT({
      '1s': 'أَبْقَ',
      '2ms': 'تَبْقَ',
      '2fs': 'تَبْقَيْ',
      '3ms': 'يَبْقَ',
      '3fs': 'تَبْقَ',
      '2d': 'تَبْقَيَا',
      '3md': 'يَبْقَيَا',
      '3fd': 'تَبْقَيَا',
      '1p': 'نَبْقَ',
      '2mp': 'تَبْقَوْا',
      '2fp': 'تَبْقَيْنَ',
      '3mp': 'يَبْقَوْا',
      '3fp': 'يَبْقَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('bqy-1')!)).toMatchObjectT({
      '2ms': 'اِبْقَ',
      '2fs': 'اِبْقَيْ',
      '2d': 'اِبْقَيَا',
      '2mp': 'اِبْقَوْا',
      '2fp': 'اِبْقَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('bqy-1')!)).toMatchObjectT({
      '3ms': 'بُقِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('bqy-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُبْقَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('bqy-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُبْقَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('bqy-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُبْقَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('bqy-1')!)).toEqualT('بَاقٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('bqy-1')!)).toEqualT('مَبْقِيّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('bqy-1')!)).toEqualT(['بَقَاء'])
  })
})
