import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('xlw-5 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('xlw-5')!)).toEqualT({
      '1s': 'تَخَلَّيْتُ',
      '2ms': 'تَخَلَّيْتَ',
      '2fs': 'تَخَلَّيْتِ',
      '3ms': 'تَخَلَّى',
      '3fs': 'تَخَلَّتْ',
      '2d': 'تَخَلَّيْتُمَا',
      '3md': 'تَخَلَّيَا',
      '3fd': 'تَخَلَّتَا',
      '1p': 'تَخَلَّيْنَا',
      '2mp': 'تَخَلَّيْتُمْ',
      '2fp': 'تَخَلَّيْتُنَّ',
      '3mp': 'تَخَلَّوْا',
      '3fp': 'تَخَلَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('xlw-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَخَلَّى',
      '2ms': 'تَتَخَلَّى',
      '2fs': 'تَتَخَلَّيْنَ',
      '3ms': 'يَتَخَلَّى',
      '3fs': 'تَتَخَلَّى',
      '2d': 'تَتَخَلَّيَانِ',
      '3md': 'يَتَخَلَّيَانِ',
      '3fd': 'تَتَخَلَّيَانِ',
      '1p': 'نَتَخَلَّى',
      '2mp': 'تَتَخَلَّوْنَ',
      '2fp': 'تَتَخَلَّيْنَ',
      '3mp': 'يَتَخَلَّوْنَ',
      '3fp': 'يَتَخَلَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('xlw-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَخَلَّى',
      '2ms': 'تَتَخَلَّى',
      '2fs': 'تَتَخَلَّيْ',
      '3ms': 'يَتَخَلَّى',
      '3fs': 'تَتَخَلَّى',
      '2d': 'تَتَخَلَّيَا',
      '3md': 'يَتَخَلَّيَا',
      '3fd': 'تَتَخَلَّيَا',
      '1p': 'نَتَخَلَّى',
      '2mp': 'تَتَخَلَّوْا',
      '2fp': 'تَتَخَلَّيْنَ',
      '3mp': 'يَتَخَلَّوْا',
      '3fp': 'يَتَخَلَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('xlw-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَخَلَّ',
      '2ms': 'تَتَخَلَّ',
      '2fs': 'تَتَخَلَّيْ',
      '3ms': 'يَتَخَلَّ',
      '3fs': 'تَتَخَلَّ',
      '2d': 'تَتَخَلَّيَا',
      '3md': 'يَتَخَلَّيَا',
      '3fd': 'تَتَخَلَّيَا',
      '1p': 'نَتَخَلَّ',
      '2mp': 'تَتَخَلَّوْا',
      '2fp': 'تَتَخَلَّيْنَ',
      '3mp': 'يَتَخَلَّوْا',
      '3fp': 'يَتَخَلَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('xlw-5')!)).toMatchObjectT({
      '2ms': 'تَخَلَّ',
      '2fs': 'تَخَلَّيْ',
      '2d': 'تَخَلَّيَا',
      '2mp': 'تَخَلَّوْا',
      '2fp': 'تَخَلَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('xlw-5')!)).toMatchObjectT({
      '3ms': 'تُخُلِّيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('xlw-5')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَخَلَّى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xlw-5')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَخَلَّى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('xlw-5')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَخَلَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('xlw-5')!)).toEqualT('مُتَخَلٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('xlw-5')!)).toEqualT('مُتَخَلًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('xlw-5')!))).toEqualT(new Set(['تَخَلٍّ']))
  })
})
