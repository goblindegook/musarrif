import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('E$w-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('E$w-1')!)).toEqualT({
      '1s': 'عَشَوْتُ',
      '2ms': 'عَشَوْتَ',
      '2fs': 'عَشَوْتِ',
      '3ms': 'عَشَا',
      '3fs': 'عَشَتْ',
      '2d': 'عَشَوْتُمَا',
      '3md': 'عَشَوَا',
      '3fd': 'عَشَتَا',
      '1p': 'عَشَوْنَا',
      '2mp': 'عَشَوْتُمْ',
      '2fp': 'عَشَوْتُنَّ',
      '3mp': 'عَشَوْا',
      '3fp': 'عَشَوْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('E$w-1')!, 'indicative')).toEqualT({
      '1s': 'أَعْشَى',
      '2ms': 'تَعْشَى',
      '2fs': 'تَعْشَيْنَ',
      '3ms': 'يَعْشَى',
      '3fs': 'تَعْشَى',
      '2d': 'تَعْشَيَانِ',
      '3md': 'يَعْشَيَانِ',
      '3fd': 'تَعْشَيَانِ',
      '1p': 'نَعْشَى',
      '2mp': 'تَعْشَوْنَ',
      '2fp': 'تَعْشَيْنَ',
      '3mp': 'يَعْشَوْنَ',
      '3fp': 'يَعْشَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('E$w-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْشَى',
      '2ms': 'تَعْشَى',
      '2fs': 'تَعْشَيْ',
      '3ms': 'يَعْشَى',
      '3fs': 'تَعْشَى',
      '2d': 'تَعْشَيَا',
      '3md': 'يَعْشَيَا',
      '3fd': 'تَعْشَيَا',
      '1p': 'نَعْشَى',
      '2mp': 'تَعْشَوْا',
      '2fp': 'تَعْشَيْنَ',
      '3mp': 'يَعْشَوْا',
      '3fp': 'يَعْشَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('E$w-1')!, 'jussive')).toEqualT({
      '1s': 'أَعْشَ',
      '2ms': 'تَعْشَ',
      '2fs': 'تَعْشَيْ',
      '3ms': 'يَعْشَ',
      '3fs': 'تَعْشَ',
      '2d': 'تَعْشَيَا',
      '3md': 'يَعْشَيَا',
      '3fd': 'تَعْشَيَا',
      '1p': 'نَعْشَ',
      '2mp': 'تَعْشَوْا',
      '2fp': 'تَعْشَيْنَ',
      '3mp': 'يَعْشَوْا',
      '3fp': 'يَعْشَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('E$w-1')!)).toMatchObjectT({
      '2ms': 'اِعْشَ',
      '2fs': 'اِعْشَيْ',
      '2d': 'اِعْشَيَا',
      '2mp': 'اِعْشَوْا',
      '2fp': 'اِعْشَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('E$w-1')!)).toEqualT({
      '1s': 'عُشِيتُ',
      '2ms': 'عُشِيتَ',
      '2fs': 'عُشِيتِ',
      '3ms': 'عُشِيَ',
      '3fs': 'عُشِيَتْ',
      '2d': 'عُشِيتُمَا',
      '3md': 'عُشِيَا',
      '3fd': 'عُشِيَتَا',
      '1p': 'عُشِينَا',
      '2mp': 'عُشِيتُمْ',
      '2fp': 'عُشِيتُنَّ',
      '3mp': 'عُشُوا',
      '3fp': 'عُشِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('E$w-1')!, 'indicative')).toEqualT({
      '1s': 'أُعْشَى',
      '2ms': 'تُعْشَى',
      '2fs': 'تُعْشَيْنَ',
      '3ms': 'يُعْشَى',
      '3fs': 'تُعْشَى',
      '2d': 'تُعْشَيَانِ',
      '3md': 'يُعْشَيَانِ',
      '3fd': 'تُعْشَيَانِ',
      '1p': 'نُعْشَى',
      '2mp': 'تُعْشَوْنَ',
      '2fp': 'تُعْشَيْنَ',
      '3mp': 'يُعْشَوْنَ',
      '3fp': 'يُعْشَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('E$w-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْشَى',
      '2ms': 'تُعْشَى',
      '2fs': 'تُعْشَيْ',
      '3ms': 'يُعْشَى',
      '3fs': 'تُعْشَى',
      '2d': 'تُعْشَيَا',
      '3md': 'يُعْشَيَا',
      '3fd': 'تُعْشَيَا',
      '1p': 'نُعْشَى',
      '2mp': 'تُعْشَوْا',
      '2fp': 'تُعْشَيْنَ',
      '3mp': 'يُعْشَوْا',
      '3fp': 'يُعْشَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('E$w-1')!, 'jussive')).toEqualT({
      '1s': 'أُعْشَ',
      '2ms': 'تُعْشَ',
      '2fs': 'تُعْشَيْ',
      '3ms': 'يُعْشَ',
      '3fs': 'تُعْشَ',
      '2d': 'تُعْشَيَا',
      '3md': 'يُعْشَيَا',
      '3fd': 'تُعْشَيَا',
      '1p': 'نُعْشَ',
      '2mp': 'تُعْشَوْا',
      '2fp': 'تُعْشَيْنَ',
      '3mp': 'يُعْشَوْا',
      '3fp': 'يُعْشَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('E$w-1')!)).toEqualT('عَاشٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('E$w-1')!)).toEqualT('مَعْشُوّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('E$w-1')!))).toEqualT(new Set(['عَشَاء']))
  })
})
