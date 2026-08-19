import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('jlw-7 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('jlw-7')!)).toEqualT({
      '1s': 'اِنْجَلَيْتُ',
      '2ms': 'اِنْجَلَيْتَ',
      '2fs': 'اِنْجَلَيْتِ',
      '3ms': 'اِنْجَلَى',
      '3fs': 'اِنْجَلَتْ',
      '2d': 'اِنْجَلَيْتُمَا',
      '3md': 'اِنْجَلَيَا',
      '3fd': 'اِنْجَلَتَا',
      '1p': 'اِنْجَلَيْنَا',
      '2mp': 'اِنْجَلَيْتُمْ',
      '2fp': 'اِنْجَلَيْتُنَّ',
      '3mp': 'اِنْجَلَوْا',
      '3fp': 'اِنْجَلَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('jlw-7')!, 'indicative')).toEqualT({
      '1s': 'أَنْجَلِي',
      '2ms': 'تَنْجَلِي',
      '2fs': 'تَنْجَلِينَ',
      '3ms': 'يَنْجَلِي',
      '3fs': 'تَنْجَلِي',
      '2d': 'تَنْجَلِيَانِ',
      '3md': 'يَنْجَلِيَانِ',
      '3fd': 'تَنْجَلِيَانِ',
      '1p': 'نَنْجَلِي',
      '2mp': 'تَنْجَلُونَ',
      '2fp': 'تَنْجَلِينَ',
      '3mp': 'يَنْجَلُونَ',
      '3fp': 'يَنْجَلِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('jlw-7')!, 'subjunctive')).toEqualT({
      '1s': 'أَنْجَلِيَ',
      '2ms': 'تَنْجَلِيَ',
      '2fs': 'تَنْجَلِي',
      '3ms': 'يَنْجَلِيَ',
      '3fs': 'تَنْجَلِيَ',
      '2d': 'تَنْجَلِيَا',
      '3md': 'يَنْجَلِيَا',
      '3fd': 'تَنْجَلِيَا',
      '1p': 'نَنْجَلِيَ',
      '2mp': 'تَنْجَلُوا',
      '2fp': 'تَنْجَلِينَ',
      '3mp': 'يَنْجَلُوا',
      '3fp': 'يَنْجَلِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('jlw-7')!, 'jussive')).toEqualT({
      '1s': 'أَنْجَلِ',
      '2ms': 'تَنْجَلِ',
      '2fs': 'تَنْجَلِي',
      '3ms': 'يَنْجَلِ',
      '3fs': 'تَنْجَلِ',
      '2d': 'تَنْجَلِيَا',
      '3md': 'يَنْجَلِيَا',
      '3fd': 'تَنْجَلِيَا',
      '1p': 'نَنْجَلِ',
      '2mp': 'تَنْجَلُوا',
      '2fp': 'تَنْجَلِينَ',
      '3mp': 'يَنْجَلُوا',
      '3fp': 'يَنْجَلِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('jlw-7')!)).toMatchObjectT({
      '2ms': 'اِنْجَلِ',
      '2fs': 'اِنْجَلِي',
      '2d': 'اِنْجَلِيَا',
      '2mp': 'اِنْجَلُوا',
      '2fp': 'اِنْجَلِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('jlw-7')!)).toMatchObjectT({
      '3ms': 'اُنْجُلِيَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('jlw-7')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُنْجَلَى',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('jlw-7')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُنْجَلَى',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('jlw-7')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُنْجَلَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('jlw-7')!)).toEqualT('مُنْجَلٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('jlw-7')!)).toEqualT('مُنْجَلًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('jlw-7')!))).toEqualT(new Set(['اِنْجِلَاء']))
  })
})
