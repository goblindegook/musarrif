import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hyy-10 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hyy-10')!)).toEqualT({
      '1s': 'اِسْتَحَيْتُ',
      '2ms': 'اِسْتَحَيْتَ',
      '2fs': 'اِسْتَحَيْتِ',
      '3ms': 'اِسْتَحَى',
      '3fs': 'اِسْتَحَتْ',
      '2d': 'اِسْتَحَيْتُمَا',
      '3md': 'اِسْتَحَيَا',
      '3fd': 'اِسْتَحَتَا',
      '1p': 'اِسْتَحَيْنَا',
      '2mp': 'اِسْتَحَيْتُمْ',
      '2fp': 'اِسْتَحَيْتُنَّ',
      '3mp': 'اِسْتَحَوْا',
      '3fp': 'اِسْتَحَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hyy-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَحِي',
      '2ms': 'تَسْتَحِي',
      '2fs': 'تَسْتَحِينَ',
      '3ms': 'يَسْتَحِي',
      '3fs': 'تَسْتَحِي',
      '2d': 'تَسْتَحِيَانِ',
      '3md': 'يَسْتَحِيَانِ',
      '3fd': 'تَسْتَحِيَانِ',
      '1p': 'نَسْتَحِي',
      '2mp': 'تَسْتَحُونَ',
      '2fp': 'تَسْتَحِينَ',
      '3mp': 'يَسْتَحُونَ',
      '3fp': 'يَسْتَحِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hyy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَحِيَ',
      '2ms': 'تَسْتَحِيَ',
      '2fs': 'تَسْتَحِي',
      '3ms': 'يَسْتَحِيَ',
      '3fs': 'تَسْتَحِيَ',
      '2d': 'تَسْتَحِيَا',
      '3md': 'يَسْتَحِيَا',
      '3fd': 'تَسْتَحِيَا',
      '1p': 'نَسْتَحِيَ',
      '2mp': 'تَسْتَحُوا',
      '2fp': 'تَسْتَحِينَ',
      '3mp': 'يَسْتَحُوا',
      '3fp': 'يَسْتَحِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hyy-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَحِ',
      '2ms': 'تَسْتَحِ',
      '2fs': 'تَسْتَحِي',
      '3ms': 'يَسْتَحِ',
      '3fs': 'تَسْتَحِ',
      '2d': 'تَسْتَحِيَا',
      '3md': 'يَسْتَحِيَا',
      '3fd': 'تَسْتَحِيَا',
      '1p': 'نَسْتَحِ',
      '2mp': 'تَسْتَحُوا',
      '2fp': 'تَسْتَحِينَ',
      '3mp': 'يَسْتَحُوا',
      '3fp': 'يَسْتَحِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hyy-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَحِ',
      '2fs': 'اِسْتَحِي',
      '2d': 'اِسْتَحِيَا',
      '2mp': 'اِسْتَحُوا',
      '2fp': 'اِسْتَحِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hyy-10')!)).toEqualT({
      '1s': 'اُسْتُحِيتُ',
      '2ms': 'اُسْتُحِيتَ',
      '2fs': 'اُسْتُحِيتِ',
      '3ms': 'اُسْتُحِيَ',
      '3fs': 'اُسْتُحِيَتْ',
      '2d': 'اُسْتُحِيتُمَا',
      '3md': 'اُسْتُحِيَا',
      '3fd': 'اُسْتُحِيَتَا',
      '1p': 'اُسْتُحِينَا',
      '2mp': 'اُسْتُحِيتُمْ',
      '2fp': 'اُسْتُحِيتُنَّ',
      '3mp': 'اُسْتُحُوا',
      '3fp': 'اُسْتُحِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyy-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَحَى',
      '2ms': 'تُسْتَحَى',
      '2fs': 'تُسْتَحَيْنَ',
      '3ms': 'يُسْتَحَى',
      '3fs': 'تُسْتَحَى',
      '2d': 'تُسْتَحَيَانِ',
      '3md': 'يُسْتَحَيَانِ',
      '3fd': 'تُسْتَحَيَانِ',
      '1p': 'نُسْتَحَى',
      '2mp': 'تُسْتَحَوْنَ',
      '2fp': 'تُسْتَحَيْنَ',
      '3mp': 'يُسْتَحَوْنَ',
      '3fp': 'يُسْتَحَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyy-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَحَى',
      '2ms': 'تُسْتَحَى',
      '2fs': 'تُسْتَحَيْ',
      '3ms': 'يُسْتَحَى',
      '3fs': 'تُسْتَحَى',
      '2d': 'تُسْتَحَيَا',
      '3md': 'يُسْتَحَيَا',
      '3fd': 'تُسْتَحَيَا',
      '1p': 'نُسْتَحَى',
      '2mp': 'تُسْتَحَوْا',
      '2fp': 'تُسْتَحَيْنَ',
      '3mp': 'يُسْتَحَوْا',
      '3fp': 'يُسْتَحَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hyy-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَحَ',
      '2ms': 'تُسْتَحَ',
      '2fs': 'تُسْتَحَيْ',
      '3ms': 'يُسْتَحَ',
      '3fs': 'تُسْتَحَ',
      '2d': 'تُسْتَحَيَا',
      '3md': 'يُسْتَحَيَا',
      '3fd': 'تُسْتَحَيَا',
      '1p': 'نُسْتَحَ',
      '2mp': 'تُسْتَحَوْا',
      '2fp': 'تُسْتَحَيْنَ',
      '3mp': 'يُسْتَحَوْا',
      '3fp': 'يُسْتَحَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hyy-10')!)).toEqualT('مُسْتَحٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hyy-10')!)).toEqualT('مُسْتَحًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hyy-10')!))).toEqualT(new Set(['اِسْتِحَاء']))
  })
})
