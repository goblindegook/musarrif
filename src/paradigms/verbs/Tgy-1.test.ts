import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Tgy-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Tgy-1')!)).toEqualT({
      '1s': 'طَغَيْتُ',
      '2ms': 'طَغَيْتَ',
      '2fs': 'طَغَيْتِ',
      '3ms': 'طَغَى',
      '3fs': 'طَغَتْ',
      '2d': 'طَغَيْتُمَا',
      '3md': 'طَغَيَا',
      '3fd': 'طَغَتَا',
      '1p': 'طَغَيْنَا',
      '2mp': 'طَغَيْتُمْ',
      '2fp': 'طَغَيْتُنَّ',
      '3mp': 'طَغَوْا',
      '3fp': 'طَغَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Tgy-1')!, 'indicative')).toEqualT({
      '1s': 'أَطْغَى',
      '2ms': 'تَطْغَى',
      '2fs': 'تَطْغَيْنَ',
      '3ms': 'يَطْغَى',
      '3fs': 'تَطْغَى',
      '2d': 'تَطْغَيَانِ',
      '3md': 'يَطْغَيَانِ',
      '3fd': 'تَطْغَيَانِ',
      '1p': 'نَطْغَى',
      '2mp': 'تَطْغَوْنَ',
      '2fp': 'تَطْغَيْنَ',
      '3mp': 'يَطْغَوْنَ',
      '3fp': 'يَطْغَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Tgy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَطْغَى',
      '2ms': 'تَطْغَى',
      '2fs': 'تَطْغَيْ',
      '3ms': 'يَطْغَى',
      '3fs': 'تَطْغَى',
      '2d': 'تَطْغَيَا',
      '3md': 'يَطْغَيَا',
      '3fd': 'تَطْغَيَا',
      '1p': 'نَطْغَى',
      '2mp': 'تَطْغَوْا',
      '2fp': 'تَطْغَيْنَ',
      '3mp': 'يَطْغَوْا',
      '3fp': 'يَطْغَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Tgy-1')!, 'jussive')).toEqualT({
      '1s': 'أَطْغَ',
      '2ms': 'تَطْغَ',
      '2fs': 'تَطْغَيْ',
      '3ms': 'يَطْغَ',
      '3fs': 'تَطْغَ',
      '2d': 'تَطْغَيَا',
      '3md': 'يَطْغَيَا',
      '3fd': 'تَطْغَيَا',
      '1p': 'نَطْغَ',
      '2mp': 'تَطْغَوْا',
      '2fp': 'تَطْغَيْنَ',
      '3mp': 'يَطْغَوْا',
      '3fp': 'يَطْغَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Tgy-1')!)).toMatchObjectT({
      '2ms': 'اِطْغَ',
      '2fs': 'اِطْغَيْ',
      '2d': 'اِطْغَيَا',
      '2mp': 'اِطْغَوْا',
      '2fp': 'اِطْغَيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Tgy-1')!)).toEqualT({
      '1s': 'طُغِيتُ',
      '2ms': 'طُغِيتَ',
      '2fs': 'طُغِيتِ',
      '3ms': 'طُغِيَ',
      '3fs': 'طُغِيَتْ',
      '2d': 'طُغِيتُمَا',
      '3md': 'طُغِيَا',
      '3fd': 'طُغِيَتَا',
      '1p': 'طُغِينَا',
      '2mp': 'طُغِيتُمْ',
      '2fp': 'طُغِيتُنَّ',
      '3mp': 'طُغُوا',
      '3fp': 'طُغِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Tgy-1')!, 'indicative')).toEqualT({
      '1s': 'أُطْغَى',
      '2ms': 'تُطْغَى',
      '2fs': 'تُطْغَيْنَ',
      '3ms': 'يُطْغَى',
      '3fs': 'تُطْغَى',
      '2d': 'تُطْغَيَانِ',
      '3md': 'يُطْغَيَانِ',
      '3fd': 'تُطْغَيَانِ',
      '1p': 'نُطْغَى',
      '2mp': 'تُطْغَوْنَ',
      '2fp': 'تُطْغَيْنَ',
      '3mp': 'يُطْغَوْنَ',
      '3fp': 'يُطْغَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Tgy-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُطْغَى',
      '2ms': 'تُطْغَى',
      '2fs': 'تُطْغَيْ',
      '3ms': 'يُطْغَى',
      '3fs': 'تُطْغَى',
      '2d': 'تُطْغَيَا',
      '3md': 'يُطْغَيَا',
      '3fd': 'تُطْغَيَا',
      '1p': 'نُطْغَى',
      '2mp': 'تُطْغَوْا',
      '2fp': 'تُطْغَيْنَ',
      '3mp': 'يُطْغَوْا',
      '3fp': 'يُطْغَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Tgy-1')!, 'jussive')).toEqualT({
      '1s': 'أُطْغَ',
      '2ms': 'تُطْغَ',
      '2fs': 'تُطْغَيْ',
      '3ms': 'يُطْغَ',
      '3fs': 'تُطْغَ',
      '2d': 'تُطْغَيَا',
      '3md': 'يُطْغَيَا',
      '3fd': 'تُطْغَيَا',
      '1p': 'نُطْغَ',
      '2mp': 'تُطْغَوْا',
      '2fp': 'تُطْغَيْنَ',
      '3mp': 'يُطْغَوْا',
      '3fp': 'يُطْغَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Tgy-1')!)).toEqualT('طَاغٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Tgy-1')!)).toEqualT('مَطْغِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Tgy-1')!))).toEqualT(new Set(['طَغْي', 'طُغْيَان']))
  })
})
