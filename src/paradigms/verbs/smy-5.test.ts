import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('smy-5', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('smy-5')!)).toEqualT({
      '1s': 'تَسَمَّيْتُ',
      '2ms': 'تَسَمَّيْتَ',
      '2fs': 'تَسَمَّيْتِ',
      '3ms': 'تَسَمَّى',
      '3fs': 'تَسَمَّتْ',
      '2d': 'تَسَمَّيْتُمَا',
      '3md': 'تَسَمَّيَا',
      '3fd': 'تَسَمَّتَا',
      '1p': 'تَسَمَّيْنَا',
      '2mp': 'تَسَمَّيْتُمْ',
      '2fp': 'تَسَمَّيْتُنَّ',
      '3mp': 'تَسَمَّوْا',
      '3fp': 'تَسَمَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('smy-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَسَمَّى',
      '2ms': 'تَتَسَمَّى',
      '2fs': 'تَتَسَمَّيْنَ',
      '3ms': 'يَتَسَمَّى',
      '3fs': 'تَتَسَمَّى',
      '2d': 'تَتَسَمَّيَانِ',
      '3md': 'يَتَسَمَّيَانِ',
      '3fd': 'تَتَسَمَّيَانِ',
      '1p': 'نَتَسَمَّى',
      '2mp': 'تَتَسَمَّوْنَ',
      '2fp': 'تَتَسَمَّيْنَ',
      '3mp': 'يَتَسَمَّوْنَ',
      '3fp': 'يَتَسَمَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('smy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَسَمَّى',
      '2ms': 'تَتَسَمَّى',
      '2fs': 'تَتَسَمَّيْ',
      '3ms': 'يَتَسَمَّى',
      '3fs': 'تَتَسَمَّى',
      '2d': 'تَتَسَمَّيَا',
      '3md': 'يَتَسَمَّيَا',
      '3fd': 'تَتَسَمَّيَا',
      '1p': 'نَتَسَمَّى',
      '2mp': 'تَتَسَمَّوْا',
      '2fp': 'تَتَسَمَّيْنَ',
      '3mp': 'يَتَسَمَّوْا',
      '3fp': 'يَتَسَمَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('smy-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَسَمَّ',
      '2ms': 'تَتَسَمَّ',
      '2fs': 'تَتَسَمَّيْ',
      '3ms': 'يَتَسَمَّ',
      '3fs': 'تَتَسَمَّ',
      '2d': 'تَتَسَمَّيَا',
      '3md': 'يَتَسَمَّيَا',
      '3fd': 'تَتَسَمَّيَا',
      '1p': 'نَتَسَمَّ',
      '2mp': 'تَتَسَمَّوْا',
      '2fp': 'تَتَسَمَّيْنَ',
      '3mp': 'يَتَسَمَّوْا',
      '3fp': 'يَتَسَمَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('smy-5')!)).toMatchObjectT({
      '2ms': 'تَسَمَّ',
      '2fs': 'تَسَمَّيْ',
      '2d': 'تَسَمَّيَا',
      '2mp': 'تَسَمَّوْا',
      '2fp': 'تَسَمَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('smy-5')!)).toMatchObjectT({
      '3ms': 'تُسُمِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('smy-5')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَسَمَّى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('smy-5')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَسَمَّى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('smy-5')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَسَمَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('smy-5')!)).toEqualT('مُتَسَمٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('smy-5')!)).toEqualT('مُتَسَمًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('smy-5')!)).toEqualT(['تَسَمٍّ'])
  })
})
