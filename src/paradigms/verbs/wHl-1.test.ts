import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('wHl-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wHl-1')!)).toEqualT({
      '1s': 'وَحِلْتُ',
      '2ms': 'وَحِلْتَ',
      '2fs': 'وَحِلْتِ',
      '3ms': 'وَحِلَ',
      '3fs': 'وَحِلَتْ',
      '2d': 'وَحِلْتُمَا',
      '3md': 'وَحِلَا',
      '3fd': 'وَحِلَتَا',
      '1p': 'وَحِلْنَا',
      '2mp': 'وَحِلْتُمْ',
      '2fp': 'وَحِلْتُنَّ',
      '3mp': 'وَحِلُوا',
      '3fp': 'وَحِلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wHl-1')!, 'indicative')).toEqualT({
      '1s': 'أَوْحَلُ',
      '2ms': 'تَوْحَلُ',
      '2fs': 'تَوْحَلِينَ',
      '3ms': 'يَوْحَلُ',
      '3fs': 'تَوْحَلُ',
      '2d': 'تَوْحَلَانِ',
      '3md': 'يَوْحَلَانِ',
      '3fd': 'تَوْحَلَانِ',
      '1p': 'نَوْحَلُ',
      '2mp': 'تَوْحَلُونَ',
      '2fp': 'تَوْحَلْنَ',
      '3mp': 'يَوْحَلُونَ',
      '3fp': 'يَوْحَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wHl-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَوْحَلَ',
      '2ms': 'تَوْحَلَ',
      '2fs': 'تَوْحَلِي',
      '3ms': 'يَوْحَلَ',
      '3fs': 'تَوْحَلَ',
      '2d': 'تَوْحَلَا',
      '3md': 'يَوْحَلَا',
      '3fd': 'تَوْحَلَا',
      '1p': 'نَوْحَلَ',
      '2mp': 'تَوْحَلُوا',
      '2fp': 'تَوْحَلْنَ',
      '3mp': 'يَوْحَلُوا',
      '3fp': 'يَوْحَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wHl-1')!, 'jussive')).toEqualT({
      '1s': 'أَوْحَلْ',
      '2ms': 'تَوْحَلْ',
      '2fs': 'تَوْحَلِي',
      '3ms': 'يَوْحَلْ',
      '3fs': 'تَوْحَلْ',
      '2d': 'تَوْحَلَا',
      '3md': 'يَوْحَلَا',
      '3fd': 'تَوْحَلَا',
      '1p': 'نَوْحَلْ',
      '2mp': 'تَوْحَلُوا',
      '2fp': 'تَوْحَلْنَ',
      '3mp': 'يَوْحَلُوا',
      '3fp': 'يَوْحَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wHl-1')!)).toMatchObjectT({
      '2ms': 'اِيحَلْ',
      '2fs': 'اِيحَلِي',
      '2d': 'اِيحَلَا',
      '2mp': 'اِيحَلُوا',
      '2fp': 'اِيحَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wHl-1')!)).toEqualT('وَحِل')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wHl-1')!))).toEqualT(new Set(['وَحَل']))
  })
})
