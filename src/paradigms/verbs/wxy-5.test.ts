import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wxy-5', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wxy-5')!)).toEqualT({
      '1s': 'تَوَخَّيْتُ',
      '2ms': 'تَوَخَّيْتَ',
      '2fs': 'تَوَخَّيْتِ',
      '3ms': 'تَوَخَّى',
      '3fs': 'تَوَخَّتْ',
      '2d': 'تَوَخَّيْتُمَا',
      '3md': 'تَوَخَّيَا',
      '3fd': 'تَوَخَّتَا',
      '1p': 'تَوَخَّيْنَا',
      '2mp': 'تَوَخَّيْتُمْ',
      '2fp': 'تَوَخَّيْتُنَّ',
      '3mp': 'تَوَخَّوْا',
      '3fp': 'تَوَخَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wxy-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَخَّى',
      '2ms': 'تَتَوَخَّى',
      '2fs': 'تَتَوَخَّيْنَ',
      '3ms': 'يَتَوَخَّى',
      '3fs': 'تَتَوَخَّى',
      '2d': 'تَتَوَخَّيَانِ',
      '3md': 'يَتَوَخَّيَانِ',
      '3fd': 'تَتَوَخَّيَانِ',
      '1p': 'نَتَوَخَّى',
      '2mp': 'تَتَوَخَّوْنَ',
      '2fp': 'تَتَوَخَّيْنَ',
      '3mp': 'يَتَوَخَّوْنَ',
      '3fp': 'يَتَوَخَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wxy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَخَّى',
      '2ms': 'تَتَوَخَّى',
      '2fs': 'تَتَوَخَّيْ',
      '3ms': 'يَتَوَخَّى',
      '3fs': 'تَتَوَخَّى',
      '2d': 'تَتَوَخَّيَا',
      '3md': 'يَتَوَخَّيَا',
      '3fd': 'تَتَوَخَّيَا',
      '1p': 'نَتَوَخَّى',
      '2mp': 'تَتَوَخَّوْا',
      '2fp': 'تَتَوَخَّيْنَ',
      '3mp': 'يَتَوَخَّوْا',
      '3fp': 'يَتَوَخَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wxy-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَخَّ',
      '2ms': 'تَتَوَخَّ',
      '2fs': 'تَتَوَخَّيْ',
      '3ms': 'يَتَوَخَّ',
      '3fs': 'تَتَوَخَّ',
      '2d': 'تَتَوَخَّيَا',
      '3md': 'يَتَوَخَّيَا',
      '3fd': 'تَتَوَخَّيَا',
      '1p': 'نَتَوَخَّ',
      '2mp': 'تَتَوَخَّوْا',
      '2fp': 'تَتَوَخَّيْنَ',
      '3mp': 'يَتَوَخَّوْا',
      '3fp': 'يَتَوَخَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wxy-5')!)).toMatchObjectT({
      '2ms': 'تَوَخَّ',
      '2fs': 'تَوَخَّيْ',
      '2d': 'تَوَخَّيَا',
      '2mp': 'تَوَخَّوْا',
      '2fp': 'تَوَخَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wxy-5')!)).toEqualT({
      '1s': 'تُوُخِّيتُ',
      '2ms': 'تُوُخِّيتَ',
      '2fs': 'تُوُخِّيتِ',
      '3ms': 'تُوُخِّيَ',
      '3fs': 'تُوُخِّيَتْ',
      '2d': 'تُوُخِّيتُمَا',
      '3md': 'تُوُخِّيَا',
      '3fd': 'تُوُخِّيَتَا',
      '1p': 'تُوُخِّينَا',
      '2mp': 'تُوُخِّيتُمْ',
      '2fp': 'تُوُخِّيتُنَّ',
      '3mp': 'تُوُخُّوا',
      '3fp': 'تُوُخِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wxy-5')!, 'indicative')).toEqualT({
      '1s': 'أُتَوَخَّى',
      '2ms': 'تُتَوَخَّى',
      '2fs': 'تُتَوَخَّيْنَ',
      '3ms': 'يُتَوَخَّى',
      '3fs': 'تُتَوَخَّى',
      '2d': 'تُتَوَخَّيَانِ',
      '3md': 'يُتَوَخَّيَانِ',
      '3fd': 'تُتَوَخَّيَانِ',
      '1p': 'نُتَوَخَّى',
      '2mp': 'تُتَوَخَّوْنَ',
      '2fp': 'تُتَوَخَّيْنَ',
      '3mp': 'يُتَوَخَّوْنَ',
      '3fp': 'يُتَوَخَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wxy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَوَخَّى',
      '2ms': 'تُتَوَخَّى',
      '2fs': 'تُتَوَخَّيْ',
      '3ms': 'يُتَوَخَّى',
      '3fs': 'تُتَوَخَّى',
      '2d': 'تُتَوَخَّيَا',
      '3md': 'يُتَوَخَّيَا',
      '3fd': 'تُتَوَخَّيَا',
      '1p': 'نُتَوَخَّى',
      '2mp': 'تُتَوَخَّوْا',
      '2fp': 'تُتَوَخَّيْنَ',
      '3mp': 'يُتَوَخَّوْا',
      '3fp': 'يُتَوَخَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wxy-5')!, 'jussive')).toEqualT({
      '1s': 'أُتَوَخَّ',
      '2ms': 'تُتَوَخَّ',
      '2fs': 'تُتَوَخَّيْ',
      '3ms': 'يُتَوَخَّ',
      '3fs': 'تُتَوَخَّ',
      '2d': 'تُتَوَخَّيَا',
      '3md': 'يُتَوَخَّيَا',
      '3fd': 'تُتَوَخَّيَا',
      '1p': 'نُتَوَخَّ',
      '2mp': 'تُتَوَخَّوْا',
      '2fp': 'تُتَوَخَّيْنَ',
      '3mp': 'يُتَوَخَّوْا',
      '3fp': 'يُتَوَخَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wxy-5')!)).toEqualT('مُتَوَخٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wxy-5')!)).toEqualT('مُتَوَخًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wxy-5')!)).toEqualT(['تَوَخٍّ'])
  })
})
