import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wfy-5', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wfy-5')!)).toEqualT({
      '1s': 'تَوَفَّيْتُ',
      '2ms': 'تَوَفَّيْتَ',
      '2fs': 'تَوَفَّيْتِ',
      '3ms': 'تَوَفَّى',
      '3fs': 'تَوَفَّتْ',
      '2d': 'تَوَفَّيْتُمَا',
      '3md': 'تَوَفَّيَا',
      '3fd': 'تَوَفَّتَا',
      '1p': 'تَوَفَّيْنَا',
      '2mp': 'تَوَفَّيْتُمْ',
      '2fp': 'تَوَفَّيْتُنَّ',
      '3mp': 'تَوَفَّوْا',
      '3fp': 'تَوَفَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wfy-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَفَّى',
      '2ms': 'تَتَوَفَّى',
      '2fs': 'تَتَوَفَّيْنَ',
      '3ms': 'يَتَوَفَّى',
      '3fs': 'تَتَوَفَّى',
      '2d': 'تَتَوَفَّيَانِ',
      '3md': 'يَتَوَفَّيَانِ',
      '3fd': 'تَتَوَفَّيَانِ',
      '1p': 'نَتَوَفَّى',
      '2mp': 'تَتَوَفَّوْنَ',
      '2fp': 'تَتَوَفَّيْنَ',
      '3mp': 'يَتَوَفَّوْنَ',
      '3fp': 'يَتَوَفَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَفَّى',
      '2ms': 'تَتَوَفَّى',
      '2fs': 'تَتَوَفَّيْ',
      '3ms': 'يَتَوَفَّى',
      '3fs': 'تَتَوَفَّى',
      '2d': 'تَتَوَفَّيَا',
      '3md': 'يَتَوَفَّيَا',
      '3fd': 'تَتَوَفَّيَا',
      '1p': 'نَتَوَفَّى',
      '2mp': 'تَتَوَفَّوْا',
      '2fp': 'تَتَوَفَّيْنَ',
      '3mp': 'يَتَوَفَّوْا',
      '3fp': 'يَتَوَفَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wfy-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَفَّ',
      '2ms': 'تَتَوَفَّ',
      '2fs': 'تَتَوَفَّيْ',
      '3ms': 'يَتَوَفَّ',
      '3fs': 'تَتَوَفَّ',
      '2d': 'تَتَوَفَّيَا',
      '3md': 'يَتَوَفَّيَا',
      '3fd': 'تَتَوَفَّيَا',
      '1p': 'نَتَوَفَّ',
      '2mp': 'تَتَوَفَّوْا',
      '2fp': 'تَتَوَفَّيْنَ',
      '3mp': 'يَتَوَفَّوْا',
      '3fp': 'يَتَوَفَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wfy-5')!)).toMatchObjectT({
      '2ms': 'تَوَفَّ',
      '2fs': 'تَوَفَّيْ',
      '2d': 'تَوَفَّيَا',
      '2mp': 'تَوَفَّوْا',
      '2fp': 'تَوَفَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wfy-5')!)).toEqualT({
      '1s': 'تُوُفِّيتُ',
      '2ms': 'تُوُفِّيتَ',
      '2fs': 'تُوُفِّيتِ',
      '3ms': 'تُوُفِّيَ',
      '3fs': 'تُوُفِّيَتْ',
      '2d': 'تُوُفِّيتُمَا',
      '3md': 'تُوُفِّيَا',
      '3fd': 'تُوُفِّيَتَا',
      '1p': 'تُوُفِّينَا',
      '2mp': 'تُوُفِّيتُمْ',
      '2fp': 'تُوُفِّيتُنَّ',
      '3mp': 'تُوُفُّوا',
      '3fp': 'تُوُفِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-5')!, 'indicative')).toEqualT({
      '1s': 'أُتَوَفَّى',
      '2ms': 'تُتَوَفَّى',
      '2fs': 'تُتَوَفَّيْنَ',
      '3ms': 'يُتَوَفَّى',
      '3fs': 'تُتَوَفَّى',
      '2d': 'تُتَوَفَّيَانِ',
      '3md': 'يُتَوَفَّيَانِ',
      '3fd': 'تُتَوَفَّيَانِ',
      '1p': 'نُتَوَفَّى',
      '2mp': 'تُتَوَفَّوْنَ',
      '2fp': 'تُتَوَفَّيْنَ',
      '3mp': 'يُتَوَفَّوْنَ',
      '3fp': 'يُتَوَفَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَوَفَّى',
      '2ms': 'تُتَوَفَّى',
      '2fs': 'تُتَوَفَّيْ',
      '3ms': 'يُتَوَفَّى',
      '3fs': 'تُتَوَفَّى',
      '2d': 'تُتَوَفَّيَا',
      '3md': 'يُتَوَفَّيَا',
      '3fd': 'تُتَوَفَّيَا',
      '1p': 'نُتَوَفَّى',
      '2mp': 'تُتَوَفَّوْا',
      '2fp': 'تُتَوَفَّيْنَ',
      '3mp': 'يُتَوَفَّوْا',
      '3fp': 'يُتَوَفَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wfy-5')!, 'jussive')).toEqualT({
      '1s': 'أُتَوَفَّ',
      '2ms': 'تُتَوَفَّ',
      '2fs': 'تُتَوَفَّيْ',
      '3ms': 'يُتَوَفَّ',
      '3fs': 'تُتَوَفَّ',
      '2d': 'تُتَوَفَّيَا',
      '3md': 'يُتَوَفَّيَا',
      '3fd': 'تُتَوَفَّيَا',
      '1p': 'نُتَوَفَّ',
      '2mp': 'تُتَوَفَّوْا',
      '2fp': 'تُتَوَفَّيْنَ',
      '3mp': 'يُتَوَفَّوْا',
      '3fp': 'يُتَوَفَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wfy-5')!)).toEqualT('مُتَوَفٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wfy-5')!)).toEqualT('مُتَوَفًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wfy-5')!)).toEqualT(['تَوَفٍّ'])
  })
})
