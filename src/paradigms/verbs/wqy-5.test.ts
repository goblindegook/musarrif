import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wqy-5', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wqy-5')!)).toEqualT({
      '1s': 'تَوَقَّيْتُ',
      '2ms': 'تَوَقَّيْتَ',
      '2fs': 'تَوَقَّيْتِ',
      '3ms': 'تَوَقَّى',
      '3fs': 'تَوَقَّتْ',
      '2d': 'تَوَقَّيْتُمَا',
      '3md': 'تَوَقَّيَا',
      '3fd': 'تَوَقَّتَا',
      '1p': 'تَوَقَّيْنَا',
      '2mp': 'تَوَقَّيْتُمْ',
      '2fp': 'تَوَقَّيْتُنَّ',
      '3mp': 'تَوَقَّوْا',
      '3fp': 'تَوَقَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wqy-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَقَّى',
      '2ms': 'تَتَوَقَّى',
      '2fs': 'تَتَوَقَّيْنَ',
      '3ms': 'يَتَوَقَّى',
      '3fs': 'تَتَوَقَّى',
      '2d': 'تَتَوَقَّيَانِ',
      '3md': 'يَتَوَقَّيَانِ',
      '3fd': 'تَتَوَقَّيَانِ',
      '1p': 'نَتَوَقَّى',
      '2mp': 'تَتَوَقَّوْنَ',
      '2fp': 'تَتَوَقَّيْنَ',
      '3mp': 'يَتَوَقَّوْنَ',
      '3fp': 'يَتَوَقَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wqy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَقَّى',
      '2ms': 'تَتَوَقَّى',
      '2fs': 'تَتَوَقَّيْ',
      '3ms': 'يَتَوَقَّى',
      '3fs': 'تَتَوَقَّى',
      '2d': 'تَتَوَقَّيَا',
      '3md': 'يَتَوَقَّيَا',
      '3fd': 'تَتَوَقَّيَا',
      '1p': 'نَتَوَقَّى',
      '2mp': 'تَتَوَقَّوْا',
      '2fp': 'تَتَوَقَّيْنَ',
      '3mp': 'يَتَوَقَّوْا',
      '3fp': 'يَتَوَقَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wqy-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَقَّ',
      '2ms': 'تَتَوَقَّ',
      '2fs': 'تَتَوَقَّيْ',
      '3ms': 'يَتَوَقَّ',
      '3fs': 'تَتَوَقَّ',
      '2d': 'تَتَوَقَّيَا',
      '3md': 'يَتَوَقَّيَا',
      '3fd': 'تَتَوَقَّيَا',
      '1p': 'نَتَوَقَّ',
      '2mp': 'تَتَوَقَّوْا',
      '2fp': 'تَتَوَقَّيْنَ',
      '3mp': 'يَتَوَقَّوْا',
      '3fp': 'يَتَوَقَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wqy-5')!)).toMatchObjectT({
      '2ms': 'تَوَقَّ',
      '2fs': 'تَوَقَّيْ',
      '2d': 'تَوَقَّيَا',
      '2mp': 'تَوَقَّوْا',
      '2fp': 'تَوَقَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wqy-5')!)).toEqualT({
      '1s': 'تُوُقِّيتُ',
      '2ms': 'تُوُقِّيتَ',
      '2fs': 'تُوُقِّيتِ',
      '3ms': 'تُوُقِّيَ',
      '3fs': 'تُوُقِّيَتْ',
      '2d': 'تُوُقِّيتُمَا',
      '3md': 'تُوُقِّيَا',
      '3fd': 'تُوُقِّيَتَا',
      '1p': 'تُوُقِّينَا',
      '2mp': 'تُوُقِّيتُمْ',
      '2fp': 'تُوُقِّيتُنَّ',
      '3mp': 'تُوُقُّوا',
      '3fp': 'تُوُقِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqy-5')!, 'indicative')).toEqualT({
      '1s': 'أُتَوَقَّى',
      '2ms': 'تُتَوَقَّى',
      '2fs': 'تُتَوَقَّيْنَ',
      '3ms': 'يُتَوَقَّى',
      '3fs': 'تُتَوَقَّى',
      '2d': 'تُتَوَقَّيَانِ',
      '3md': 'يُتَوَقَّيَانِ',
      '3fd': 'تُتَوَقَّيَانِ',
      '1p': 'نُتَوَقَّى',
      '2mp': 'تُتَوَقَّوْنَ',
      '2fp': 'تُتَوَقَّيْنَ',
      '3mp': 'يُتَوَقَّوْنَ',
      '3fp': 'يُتَوَقَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqy-5')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَوَقَّى',
      '2ms': 'تُتَوَقَّى',
      '2fs': 'تُتَوَقَّيْ',
      '3ms': 'يُتَوَقَّى',
      '3fs': 'تُتَوَقَّى',
      '2d': 'تُتَوَقَّيَا',
      '3md': 'يُتَوَقَّيَا',
      '3fd': 'تُتَوَقَّيَا',
      '1p': 'نُتَوَقَّى',
      '2mp': 'تُتَوَقَّوْا',
      '2fp': 'تُتَوَقَّيْنَ',
      '3mp': 'يُتَوَقَّوْا',
      '3fp': 'يُتَوَقَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqy-5')!, 'jussive')).toEqualT({
      '1s': 'أُتَوَقَّ',
      '2ms': 'تُتَوَقَّ',
      '2fs': 'تُتَوَقَّيْ',
      '3ms': 'يُتَوَقَّ',
      '3fs': 'تُتَوَقَّ',
      '2d': 'تُتَوَقَّيَا',
      '3md': 'يُتَوَقَّيَا',
      '3fd': 'تُتَوَقَّيَا',
      '1p': 'نُتَوَقَّ',
      '2mp': 'تُتَوَقَّوْا',
      '2fp': 'تُتَوَقَّيْنَ',
      '3mp': 'يُتَوَقَّوْا',
      '3fp': 'يُتَوَقَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wqy-5')!)).toEqualT('مُتَوَقٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wqy-5')!)).toEqualT('مُتَوَقًّى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wqy-5')!)).toEqualT(['تَوَقٍّ'])
  })
})
