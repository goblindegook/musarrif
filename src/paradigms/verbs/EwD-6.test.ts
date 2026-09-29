import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('EwD-6 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('EwD-6')!)).toEqualT({
      '1s': 'تَعَاوَضْتُ',
      '2ms': 'تَعَاوَضْتَ',
      '2fs': 'تَعَاوَضْتِ',
      '3ms': 'تَعَاوَضَ',
      '3fs': 'تَعَاوَضَتْ',
      '2d': 'تَعَاوَضْتُمَا',
      '3md': 'تَعَاوَضَا',
      '3fd': 'تَعَاوَضَتَا',
      '1p': 'تَعَاوَضْنَا',
      '2mp': 'تَعَاوَضْتُمْ',
      '2fp': 'تَعَاوَضْتُنَّ',
      '3mp': 'تَعَاوَضُوا',
      '3fp': 'تَعَاوَضْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('EwD-6')!, 'indicative')).toEqualT({
      '1s': 'أَتَعَاوَضُ',
      '2ms': 'تَتَعَاوَضُ',
      '2fs': 'تَتَعَاوَضِينَ',
      '3ms': 'يَتَعَاوَضُ',
      '3fs': 'تَتَعَاوَضُ',
      '2d': 'تَتَعَاوَضَانِ',
      '3md': 'يَتَعَاوَضَانِ',
      '3fd': 'تَتَعَاوَضَانِ',
      '1p': 'نَتَعَاوَضُ',
      '2mp': 'تَتَعَاوَضُونَ',
      '2fp': 'تَتَعَاوَضْنَ',
      '3mp': 'يَتَعَاوَضُونَ',
      '3fp': 'يَتَعَاوَضْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('EwD-6')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَعَاوَضَ',
      '2ms': 'تَتَعَاوَضَ',
      '2fs': 'تَتَعَاوَضِي',
      '3ms': 'يَتَعَاوَضَ',
      '3fs': 'تَتَعَاوَضَ',
      '2d': 'تَتَعَاوَضَا',
      '3md': 'يَتَعَاوَضَا',
      '3fd': 'تَتَعَاوَضَا',
      '1p': 'نَتَعَاوَضَ',
      '2mp': 'تَتَعَاوَضُوا',
      '2fp': 'تَتَعَاوَضْنَ',
      '3mp': 'يَتَعَاوَضُوا',
      '3fp': 'يَتَعَاوَضْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('EwD-6')!, 'jussive')).toEqualT({
      '1s': 'أَتَعَاوَضْ',
      '2ms': 'تَتَعَاوَضْ',
      '2fs': 'تَتَعَاوَضِي',
      '3ms': 'يَتَعَاوَضْ',
      '3fs': 'تَتَعَاوَضْ',
      '2d': 'تَتَعَاوَضَا',
      '3md': 'يَتَعَاوَضَا',
      '3fd': 'تَتَعَاوَضَا',
      '1p': 'نَتَعَاوَضْ',
      '2mp': 'تَتَعَاوَضُوا',
      '2fp': 'تَتَعَاوَضْنَ',
      '3mp': 'يَتَعَاوَضُوا',
      '3fp': 'يَتَعَاوَضْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('EwD-6')!)).toMatchObjectT({
      '2ms': 'تَعَاوَضْ',
      '2fs': 'تَعَاوَضِي',
      '2d': 'تَعَاوَضَا',
      '2mp': 'تَعَاوَضُوا',
      '2fp': 'تَعَاوَضْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('EwD-6')!)).toMatchObjectT({
      '3ms': 'تُعُووِضَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('EwD-6')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَعَاوَضُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('EwD-6')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَعَاوَضَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('EwD-6')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَعَاوَضْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('EwD-6')!)).toEqualT('مُتَعَاوِض')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('EwD-6')!)).toEqualT('مُتَعَاوَض')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('EwD-6')!))).toEqualT(new Set(['تَعَاوُض']))
  })
})
