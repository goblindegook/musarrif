import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('wDH-8 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wDH-8')!)).toEqualT({
      '1s': 'اِتَّضَحْتُ',
      '2ms': 'اِتَّضَحْتَ',
      '2fs': 'اِتَّضَحْتِ',
      '3ms': 'اِتَّضَحَ',
      '3fs': 'اِتَّضَحَتْ',
      '2d': 'اِتَّضَحْتُمَا',
      '3md': 'اِتَّضَحَا',
      '3fd': 'اِتَّضَحَتَا',
      '1p': 'اِتَّضَحْنَا',
      '2mp': 'اِتَّضَحْتُمْ',
      '2fp': 'اِتَّضَحْتُنَّ',
      '3mp': 'اِتَّضَحُوا',
      '3fp': 'اِتَّضَحْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wDH-8')!, 'indicative')).toEqualT({
      '1s': 'أَتَّضِحُ',
      '2ms': 'تَتَّضِحُ',
      '2fs': 'تَتَّضِحِينَ',
      '3ms': 'يَتَّضِحُ',
      '3fs': 'تَتَّضِحُ',
      '2d': 'تَتَّضِحَانِ',
      '3md': 'يَتَّضِحَانِ',
      '3fd': 'تَتَّضِحَانِ',
      '1p': 'نَتَّضِحُ',
      '2mp': 'تَتَّضِحُونَ',
      '2fp': 'تَتَّضِحْنَ',
      '3mp': 'يَتَّضِحُونَ',
      '3fp': 'يَتَّضِحْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wDH-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَّضِحَ',
      '2ms': 'تَتَّضِحَ',
      '2fs': 'تَتَّضِحِي',
      '3ms': 'يَتَّضِحَ',
      '3fs': 'تَتَّضِحَ',
      '2d': 'تَتَّضِحَا',
      '3md': 'يَتَّضِحَا',
      '3fd': 'تَتَّضِحَا',
      '1p': 'نَتَّضِحَ',
      '2mp': 'تَتَّضِحُوا',
      '2fp': 'تَتَّضِحْنَ',
      '3mp': 'يَتَّضِحُوا',
      '3fp': 'يَتَّضِحْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wDH-8')!, 'jussive')).toEqualT({
      '1s': 'أَتَّضِحْ',
      '2ms': 'تَتَّضِحْ',
      '2fs': 'تَتَّضِحِي',
      '3ms': 'يَتَّضِحْ',
      '3fs': 'تَتَّضِحْ',
      '2d': 'تَتَّضِحَا',
      '3md': 'يَتَّضِحَا',
      '3fd': 'تَتَّضِحَا',
      '1p': 'نَتَّضِحْ',
      '2mp': 'تَتَّضِحُوا',
      '2fp': 'تَتَّضِحْنَ',
      '3mp': 'يَتَّضِحُوا',
      '3fp': 'يَتَّضِحْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wDH-8')!)).toMatchObjectT({
      '2ms': 'اِتَّضِحْ',
      '2fs': 'اِتَّضِحِي',
      '2d': 'اِتَّضِحَا',
      '2mp': 'اِتَّضِحُوا',
      '2fp': 'اِتَّضِحْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wDH-8')!)).toEqualT('مُتَّضِح')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('wDH-8')!))).toEqualT(new Set(['اِتِّضَاح']))
  })
})
