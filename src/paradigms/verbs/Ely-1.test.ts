import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('Ely-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ely-1')!)).toEqualT({
      '1s': 'عَلِيتُ',
      '2ms': 'عَلِيتَ',
      '2fs': 'عَلِيتِ',
      '3ms': 'عَلِيَ',
      '3fs': 'عَلِيَتْ',
      '2d': 'عَلِيتُمَا',
      '3md': 'عَلِيَا',
      '3fd': 'عَلِيَتَا',
      '1p': 'عَلِينَا',
      '2mp': 'عَلِيتُمْ',
      '2fp': 'عَلِيتُنَّ',
      '3mp': 'عَلُوا',
      '3fp': 'عَلِينَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ely-1')!, 'indicative')).toEqualT({
      '1s': 'أَعْلَى',
      '2ms': 'تَعْلَى',
      '2fs': 'تَعْلَيْنَ',
      '3ms': 'يَعْلَى',
      '3fs': 'تَعْلَى',
      '2d': 'تَعْلَيَانِ',
      '3md': 'يَعْلَيَانِ',
      '3fd': 'تَعْلَيَانِ',
      '1p': 'نَعْلَى',
      '2mp': 'تَعْلَوْنَ',
      '2fp': 'تَعْلَيْنَ',
      '3mp': 'يَعْلَوْنَ',
      '3fp': 'يَعْلَيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ely-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْلَى',
      '2ms': 'تَعْلَى',
      '2fs': 'تَعْلَيْ',
      '3ms': 'يَعْلَى',
      '3fs': 'تَعْلَى',
      '2d': 'تَعْلَيَا',
      '3md': 'يَعْلَيَا',
      '3fd': 'تَعْلَيَا',
      '1p': 'نَعْلَى',
      '2mp': 'تَعْلَوْا',
      '2fp': 'تَعْلَيْنَ',
      '3mp': 'يَعْلَوْا',
      '3fp': 'يَعْلَيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ely-1')!, 'jussive')).toEqualT({
      '1s': 'أَعْلَ',
      '2ms': 'تَعْلَ',
      '2fs': 'تَعْلَيْ',
      '3ms': 'يَعْلَ',
      '3fs': 'تَعْلَ',
      '2d': 'تَعْلَيَا',
      '3md': 'يَعْلَيَا',
      '3fd': 'تَعْلَيَا',
      '1p': 'نَعْلَ',
      '2mp': 'تَعْلَوْا',
      '2fp': 'تَعْلَيْنَ',
      '3mp': 'يَعْلَوْا',
      '3fp': 'يَعْلَيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ely-1')!)).toMatchObjectT({
      '2ms': 'اِعْلَ',
      '2fs': 'اِعْلَيْ',
      '2d': 'اِعْلَيَا',
      '2mp': 'اِعْلَوْا',
      '2fp': 'اِعْلَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ely-1')!)).toEqualT('عَلِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Ely-1')!))).toEqualT(new Set(['عَلَاء']))
  })
})
