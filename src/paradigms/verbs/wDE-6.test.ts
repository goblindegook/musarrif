import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wDE-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wDE-6')!)).toEqualT({
      '1s': 'تَوَاضَعْتُ',
      '2ms': 'تَوَاضَعْتَ',
      '2fs': 'تَوَاضَعْتِ',
      '3ms': 'تَوَاضَعَ',
      '3fs': 'تَوَاضَعَتْ',
      '2d': 'تَوَاضَعْتُمَا',
      '3md': 'تَوَاضَعَا',
      '3fd': 'تَوَاضَعَتَا',
      '1p': 'تَوَاضَعْنَا',
      '2mp': 'تَوَاضَعْتُمْ',
      '2fp': 'تَوَاضَعْتُنَّ',
      '3mp': 'تَوَاضَعُوا',
      '3fp': 'تَوَاضَعْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wDE-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَوَاضَعُ',
      '2ms': 'تَتَوَاضَعُ',
      '2fs': 'تَتَوَاضَعِينَ',
      '3ms': 'يَتَوَاضَعُ',
      '3fs': 'تَتَوَاضَعُ',
      '2d': 'تَتَوَاضَعَانِ',
      '3md': 'يَتَوَاضَعَانِ',
      '3fd': 'تَتَوَاضَعَانِ',
      '1p': 'نَتَوَاضَعُ',
      '2mp': 'تَتَوَاضَعُونَ',
      '2fp': 'تَتَوَاضَعْنَ',
      '3mp': 'يَتَوَاضَعُونَ',
      '3fp': 'يَتَوَاضَعْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wDE-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَوَاضَعَ',
      '2ms': 'تَتَوَاضَعَ',
      '2fs': 'تَتَوَاضَعِي',
      '3ms': 'يَتَوَاضَعَ',
      '3fs': 'تَتَوَاضَعَ',
      '2d': 'تَتَوَاضَعَا',
      '3md': 'يَتَوَاضَعَا',
      '3fd': 'تَتَوَاضَعَا',
      '1p': 'نَتَوَاضَعَ',
      '2mp': 'تَتَوَاضَعُوا',
      '2fp': 'تَتَوَاضَعْنَ',
      '3mp': 'يَتَوَاضَعُوا',
      '3fp': 'يَتَوَاضَعْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wDE-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَوَاضَعْ',
      '2ms': 'تَتَوَاضَعْ',
      '2fs': 'تَتَوَاضَعِي',
      '3ms': 'يَتَوَاضَعْ',
      '3fs': 'تَتَوَاضَعْ',
      '2d': 'تَتَوَاضَعَا',
      '3md': 'يَتَوَاضَعَا',
      '3fd': 'تَتَوَاضَعَا',
      '1p': 'نَتَوَاضَعْ',
      '2mp': 'تَتَوَاضَعُوا',
      '2fp': 'تَتَوَاضَعْنَ',
      '3mp': 'يَتَوَاضَعُوا',
      '3fp': 'يَتَوَاضَعْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wDE-6')!)).toMatchObjectT({
      '2ms': 'تَوَاضَعْ',
      '2fs': 'تَوَاضَعِي',
      '2d': 'تَوَاضَعَا',
      '2mp': 'تَوَاضَعُوا',
      '2fp': 'تَوَاضَعْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wDE-6')!)).toMatchObjectT({
      '3ms': 'تُوُوضِعَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDE-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَوَاضَعُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDE-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَوَاضَعَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wDE-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَوَاضَعْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wDE-6')!)).toEqualT('مُتَوَاضِع')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wDE-6')!)).toEqualT('مُتَوَاضَع')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wDE-6')!))).toEqualT(new Set(['تَوَاضُع']))
  })
})
