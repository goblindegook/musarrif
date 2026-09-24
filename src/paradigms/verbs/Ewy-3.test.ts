import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Ewy-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ewy-3')!)).toEqualT({
      '1s': 'عَاوَيْتُ',
      '2ms': 'عَاوَيْتَ',
      '2fs': 'عَاوَيْتِ',
      '3ms': 'عَاوَى',
      '3fs': 'عَاوَتْ',
      '2d': 'عَاوَيْتُمَا',
      '3md': 'عَاوَيَا',
      '3fd': 'عَاوَتَا',
      '1p': 'عَاوَيْنَا',
      '2mp': 'عَاوَيْتُمْ',
      '2fp': 'عَاوَيْتُنَّ',
      '3mp': 'عَاوَوْا',
      '3fp': 'عَاوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ewy-3')!, 'indicative')).toEqualT({
      '1s': 'أُعَاوِي',
      '2ms': 'تُعَاوِي',
      '2fs': 'تُعَاوِينَ',
      '3ms': 'يُعَاوِي',
      '3fs': 'تُعَاوِي',
      '2d': 'تُعَاوِيَانِ',
      '3md': 'يُعَاوِيَانِ',
      '3fd': 'تُعَاوِيَانِ',
      '1p': 'نُعَاوِي',
      '2mp': 'تُعَاوُونَ',
      '2fp': 'تُعَاوِينَ',
      '3mp': 'يُعَاوُونَ',
      '3fp': 'يُعَاوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ewy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُعَاوِيَ',
      '2ms': 'تُعَاوِيَ',
      '2fs': 'تُعَاوِي',
      '3ms': 'يُعَاوِيَ',
      '3fs': 'تُعَاوِيَ',
      '2d': 'تُعَاوِيَا',
      '3md': 'يُعَاوِيَا',
      '3fd': 'تُعَاوِيَا',
      '1p': 'نُعَاوِيَ',
      '2mp': 'تُعَاوُوا',
      '2fp': 'تُعَاوِينَ',
      '3mp': 'يُعَاوُوا',
      '3fp': 'يُعَاوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ewy-3')!, 'jussive')).toEqualT({
      '1s': 'أُعَاوِ',
      '2ms': 'تُعَاوِ',
      '2fs': 'تُعَاوِي',
      '3ms': 'يُعَاوِ',
      '3fs': 'تُعَاوِ',
      '2d': 'تُعَاوِيَا',
      '3md': 'يُعَاوِيَا',
      '3fd': 'تُعَاوِيَا',
      '1p': 'نُعَاوِ',
      '2mp': 'تُعَاوُوا',
      '2fp': 'تُعَاوِينَ',
      '3mp': 'يُعَاوُوا',
      '3fp': 'يُعَاوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ewy-3')!)).toMatchObjectT({
      '2ms': 'عَاوِ',
      '2fs': 'عَاوِي',
      '2d': 'عَاوِيَا',
      '2mp': 'عَاوُوا',
      '2fp': 'عَاوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Ewy-3')!)).toEqualT({
      '1s': 'عُووِيتُ',
      '2ms': 'عُووِيتَ',
      '2fs': 'عُووِيتِ',
      '3ms': 'عُووِيَ',
      '3fs': 'عُووِيَتْ',
      '2d': 'عُووِيتُمَا',
      '3md': 'عُووِيَا',
      '3fd': 'عُووِيَتَا',
      '1p': 'عُووِينَا',
      '2mp': 'عُووِيتُمْ',
      '2fp': 'عُووِيتُنَّ',
      '3mp': 'عُووُوا',
      '3fp': 'عُووِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ewy-3')!, 'indicative')).toEqualT({
      '1s': 'أُعَاوَى',
      '2ms': 'تُعَاوَى',
      '2fs': 'تُعَاوَيْنَ',
      '3ms': 'يُعَاوَى',
      '3fs': 'تُعَاوَى',
      '2d': 'تُعَاوَيَانِ',
      '3md': 'يُعَاوَيَانِ',
      '3fd': 'تُعَاوَيَانِ',
      '1p': 'نُعَاوَى',
      '2mp': 'تُعَاوَوْنَ',
      '2fp': 'تُعَاوَيْنَ',
      '3mp': 'يُعَاوَوْنَ',
      '3fp': 'يُعَاوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ewy-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُعَاوَى',
      '2ms': 'تُعَاوَى',
      '2fs': 'تُعَاوَيْ',
      '3ms': 'يُعَاوَى',
      '3fs': 'تُعَاوَى',
      '2d': 'تُعَاوَيَا',
      '3md': 'يُعَاوَيَا',
      '3fd': 'تُعَاوَيَا',
      '1p': 'نُعَاوَى',
      '2mp': 'تُعَاوَوْا',
      '2fp': 'تُعَاوَيْنَ',
      '3mp': 'يُعَاوَوْا',
      '3fp': 'يُعَاوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ewy-3')!, 'jussive')).toEqualT({
      '1s': 'أُعَاوَ',
      '2ms': 'تُعَاوَ',
      '2fs': 'تُعَاوَيْ',
      '3ms': 'يُعَاوَ',
      '3fs': 'تُعَاوَ',
      '2d': 'تُعَاوَيَا',
      '3md': 'يُعَاوَيَا',
      '3fd': 'تُعَاوَيَا',
      '1p': 'نُعَاوَ',
      '2mp': 'تُعَاوَوْا',
      '2fp': 'تُعَاوَيْنَ',
      '3mp': 'يُعَاوَوْا',
      '3fp': 'يُعَاوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ewy-3')!)).toEqualT('مُعَاوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Ewy-3')!)).toEqualT('مُعَاوًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Ewy-3')!))).toEqualT(new Set(['مُعَاوَاة']))
  })
})
