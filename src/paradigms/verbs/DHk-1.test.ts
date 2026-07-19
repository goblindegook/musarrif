import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('DHk-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('DHk-1')!)).toEqualT({
      '1s': 'ضَحِكْتُ',
      '2ms': 'ضَحِكْتَ',
      '2fs': 'ضَحِكْتِ',
      '3ms': 'ضَحِكَ',
      '3fs': 'ضَحِكَتْ',
      '2d': 'ضَحِكْتُمَا',
      '3md': 'ضَحِكَا',
      '3fd': 'ضَحِكَتَا',
      '1p': 'ضَحِكْنَا',
      '2mp': 'ضَحِكْتُمْ',
      '2fp': 'ضَحِكْتُنَّ',
      '3mp': 'ضَحِكُوا',
      '3fp': 'ضَحِكْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('DHk-1')!, 'indicative')).toEqualT({
      '1s': 'أَضْحَكُ',
      '2ms': 'تَضْحَكُ',
      '2fs': 'تَضْحَكِينَ',
      '3ms': 'يَضْحَكُ',
      '3fs': 'تَضْحَكُ',
      '2d': 'تَضْحَكَانِ',
      '3md': 'يَضْحَكَانِ',
      '3fd': 'تَضْحَكَانِ',
      '1p': 'نَضْحَكُ',
      '2mp': 'تَضْحَكُونَ',
      '2fp': 'تَضْحَكْنَ',
      '3mp': 'يَضْحَكُونَ',
      '3fp': 'يَضْحَكْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('DHk-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَضْحَكَ',
      '2ms': 'تَضْحَكَ',
      '2fs': 'تَضْحَكِي',
      '3ms': 'يَضْحَكَ',
      '3fs': 'تَضْحَكَ',
      '2d': 'تَضْحَكَا',
      '3md': 'يَضْحَكَا',
      '3fd': 'تَضْحَكَا',
      '1p': 'نَضْحَكَ',
      '2mp': 'تَضْحَكُوا',
      '2fp': 'تَضْحَكْنَ',
      '3mp': 'يَضْحَكُوا',
      '3fp': 'يَضْحَكْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('DHk-1')!, 'jussive')).toEqualT({
      '1s': 'أَضْحَكْ',
      '2ms': 'تَضْحَكْ',
      '2fs': 'تَضْحَكِي',
      '3ms': 'يَضْحَكْ',
      '3fs': 'تَضْحَكْ',
      '2d': 'تَضْحَكَا',
      '3md': 'يَضْحَكَا',
      '3fd': 'تَضْحَكَا',
      '1p': 'نَضْحَكْ',
      '2mp': 'تَضْحَكُوا',
      '2fp': 'تَضْحَكْنَ',
      '3mp': 'يَضْحَكُوا',
      '3fp': 'يَضْحَكْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('DHk-1')!)).toMatchObjectT({
      '2ms': 'اِضْحَكْ',
      '2fs': 'اِضْحَكِي',
      '2d': 'اِضْحَكَا',
      '2mp': 'اِضْحَكُوا',
      '2fp': 'اِضْحَكْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('DHk-1')!)).toMatchObjectT({
      '3ms': 'ضُحِكَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('DHk-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُضْحَكُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('DHk-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُضْحَكَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('DHk-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُضْحَكْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('DHk-1')!)).toEqualT('ضَاحِك')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('DHk-1')!)).toEqualT('مَضْحُوك')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('DHk-1')!)).toEqualT(['ضَحِك', 'ضِحْك', 'ضَحْك'])
  })
})
