import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'y-5", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'y-5")!)).toEqualT({
      '1s': 'تَرَأَّيْتُ',
      '2ms': 'تَرَأَّيْتَ',
      '2fs': 'تَرَأَّيْتِ',
      '3ms': 'تَرَأَّى',
      '3fs': 'تَرَأَّتْ',
      '2d': 'تَرَأَّيْتُمَا',
      '3md': 'تَرَأَّيَا',
      '3fd': 'تَرَأَّتَا',
      '1p': 'تَرَأَّيْنَا',
      '2mp': 'تَرَأَّيْتُمْ',
      '2fp': 'تَرَأَّيْتُنَّ',
      '3mp': 'تَرَأَّوْا',
      '3fp': 'تَرَأَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'y-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَرَأَّى',
      '2ms': 'تَتَرَأَّى',
      '2fs': 'تَتَرَأَّيْنَ',
      '3ms': 'يَتَرَأَّى',
      '3fs': 'تَتَرَأَّى',
      '2d': 'تَتَرَأَّيَانِ',
      '3md': 'يَتَرَأَّيَانِ',
      '3fd': 'تَتَرَأَّيَانِ',
      '1p': 'نَتَرَأَّى',
      '2mp': 'تَتَرَأَّوْنَ',
      '2fp': 'تَتَرَأَّيْنَ',
      '3mp': 'يَتَرَأَّوْنَ',
      '3fp': 'يَتَرَأَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَرَأَّى',
      '2ms': 'تَتَرَأَّى',
      '2fs': 'تَتَرَأَّيْ',
      '3ms': 'يَتَرَأَّى',
      '3fs': 'تَتَرَأَّى',
      '2d': 'تَتَرَأَّيَا',
      '3md': 'يَتَرَأَّيَا',
      '3fd': 'تَتَرَأَّيَا',
      '1p': 'نَتَرَأَّى',
      '2mp': 'تَتَرَأَّوْا',
      '2fp': 'تَتَرَأَّيْنَ',
      '3mp': 'يَتَرَأَّوْا',
      '3fp': 'يَتَرَأَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'y-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَرَأَّ',
      '2ms': 'تَتَرَأَّ',
      '2fs': 'تَتَرَأَّيْ',
      '3ms': 'يَتَرَأَّ',
      '3fs': 'تَتَرَأَّ',
      '2d': 'تَتَرَأَّيَا',
      '3md': 'يَتَرَأَّيَا',
      '3fd': 'تَتَرَأَّيَا',
      '1p': 'نَتَرَأَّ',
      '2mp': 'تَتَرَأَّوْا',
      '2fp': 'تَتَرَأَّيْنَ',
      '3mp': 'يَتَرَأَّوْا',
      '3fp': 'يَتَرَأَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'y-5")!)).toMatchObjectT({
      '2ms': 'تَرَأَّ',
      '2fs': 'تَرَأَّيْ',
      '2d': 'تَرَأَّيَا',
      '2mp': 'تَرَأَّوْا',
      '2fp': 'تَرَأَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'y-5")!)).toMatchObjectT({
      '3ms': 'تُرُئِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَرَأَّى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَرَأَّى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'y-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَرَأَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'y-5")!)).toEqualT('مُتَرَأٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'y-5")!)).toEqualT('مُتَرَأًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("r'y-5")!)).toEqualT(['تَرَأٍّ'])
  })
})
