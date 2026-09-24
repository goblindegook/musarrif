import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hyz-7 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hyz-7')!)).toEqualT({
      '1s': 'اِنْحَزْتُ',
      '2ms': 'اِنْحَزْتَ',
      '2fs': 'اِنْحَزْتِ',
      '3ms': 'اِنْحَازَ',
      '3fs': 'اِنْحَازَتْ',
      '2d': 'اِنْحَزْتُمَا',
      '3md': 'اِنْحَازَا',
      '3fd': 'اِنْحَازَتَا',
      '1p': 'اِنْحَزْنَا',
      '2mp': 'اِنْحَزْتُمْ',
      '2fp': 'اِنْحَزْتُنَّ',
      '3mp': 'اِنْحَازُوا',
      '3fp': 'اِنْحَزْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hyz-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْحَازُ',
      '2ms': 'تَنْحَازُ',
      '2fs': 'تَنْحَازِينَ',
      '3ms': 'يَنْحَازُ',
      '3fs': 'تَنْحَازُ',
      '2d': 'تَنْحَازَانِ',
      '3md': 'يَنْحَازَانِ',
      '3fd': 'تَنْحَازَانِ',
      '1p': 'نَنْحَازُ',
      '2mp': 'تَنْحَازُونَ',
      '2fp': 'تَنْحَزْنَ',
      '3mp': 'يَنْحَازُونَ',
      '3fp': 'يَنْحَزْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hyz-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْحَازَ',
      '2ms': 'تَنْحَازَ',
      '2fs': 'تَنْحَازِي',
      '3ms': 'يَنْحَازَ',
      '3fs': 'تَنْحَازَ',
      '2d': 'تَنْحَازَا',
      '3md': 'يَنْحَازَا',
      '3fd': 'تَنْحَازَا',
      '1p': 'نَنْحَازَ',
      '2mp': 'تَنْحَازُوا',
      '2fp': 'تَنْحَزْنَ',
      '3mp': 'يَنْحَازُوا',
      '3fp': 'يَنْحَزْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hyz-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْحَزْ',
      '2ms': 'تَنْحَزْ',
      '2fs': 'تَنْحَازِي',
      '3ms': 'يَنْحَزْ',
      '3fs': 'تَنْحَزْ',
      '2d': 'تَنْحَازَا',
      '3md': 'يَنْحَازَا',
      '3fd': 'تَنْحَازَا',
      '1p': 'نَنْحَزْ',
      '2mp': 'تَنْحَازُوا',
      '2fp': 'تَنْحَزْنَ',
      '3mp': 'يَنْحَازُوا',
      '3fp': 'يَنْحَزْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hyz-7')!)).toMatchObjectT({
      '2ms': 'اِنْحَزْ',
      '2fs': 'اِنْحَازِي',
      '2d': 'اِنْحَازَا',
      '2mp': 'اِنْحَازُوا',
      '2fp': 'اِنْحَزْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hyz-7')!)).toMatchObjectT({
      '3ms': 'اُنْحِيزَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyz-7')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُنْحَازُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyz-7')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُنْحَازَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyz-7')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُنْحَزْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hyz-7')!)).toEqualT('مُنْحَاز')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hyz-7')!)).toEqualT('مُنْحَاز')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hyz-7')!))).toEqualT(new Set(['اِنْحِيَاز']))
  })
})
