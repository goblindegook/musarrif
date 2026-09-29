import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Hr$f-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Hr$f-3')!)).toEqualT({
      '1s': 'اِحْرَنْشَفْتُ',
      '2ms': 'اِحْرَنْشَفْتَ',
      '2fs': 'اِحْرَنْشَفْتِ',
      '3ms': 'اِحْرَنْشَفَ',
      '3fs': 'اِحْرَنْشَفَتْ',
      '2d': 'اِحْرَنْشَفْتُمَا',
      '3md': 'اِحْرَنْشَفَا',
      '3fd': 'اِحْرَنْشَفَتَا',
      '1p': 'اِحْرَنْشَفْنَا',
      '2mp': 'اِحْرَنْشَفْتُمْ',
      '2fp': 'اِحْرَنْشَفْتُنَّ',
      '3mp': 'اِحْرَنْشَفُوا',
      '3fp': 'اِحْرَنْشَفْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Hr$f-3')!, 'indicative')).toEqualT({
      '1s': 'أَحْرَنْشِفُ',
      '2ms': 'تَحْرَنْشِفُ',
      '2fs': 'تَحْرَنْشِفِينَ',
      '3ms': 'يَحْرَنْشِفُ',
      '3fs': 'تَحْرَنْشِفُ',
      '2d': 'تَحْرَنْشِفَانِ',
      '3md': 'يَحْرَنْشِفَانِ',
      '3fd': 'تَحْرَنْشِفَانِ',
      '1p': 'نَحْرَنْشِفُ',
      '2mp': 'تَحْرَنْشِفُونَ',
      '2fp': 'تَحْرَنْشِفْنَ',
      '3mp': 'يَحْرَنْشِفُونَ',
      '3fp': 'يَحْرَنْشِفْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Hr$f-3')!, 'subjunctive')).toEqualT({
      '1s': 'أَحْرَنْشِفَ',
      '2ms': 'تَحْرَنْشِفَ',
      '2fs': 'تَحْرَنْشِفِي',
      '3ms': 'يَحْرَنْشِفَ',
      '3fs': 'تَحْرَنْشِفَ',
      '2d': 'تَحْرَنْشِفَا',
      '3md': 'يَحْرَنْشِفَا',
      '3fd': 'تَحْرَنْشِفَا',
      '1p': 'نَحْرَنْشِفَ',
      '2mp': 'تَحْرَنْشِفُوا',
      '2fp': 'تَحْرَنْشِفْنَ',
      '3mp': 'يَحْرَنْشِفُوا',
      '3fp': 'يَحْرَنْشِفْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Hr$f-3')!, 'jussive')).toEqualT({
      '1s': 'أَحْرَنْشِفْ',
      '2ms': 'تَحْرَنْشِفْ',
      '2fs': 'تَحْرَنْشِفِي',
      '3ms': 'يَحْرَنْشِفْ',
      '3fs': 'تَحْرَنْشِفْ',
      '2d': 'تَحْرَنْشِفَا',
      '3md': 'يَحْرَنْشِفَا',
      '3fd': 'تَحْرَنْشِفَا',
      '1p': 'نَحْرَنْشِفْ',
      '2mp': 'تَحْرَنْشِفُوا',
      '2fp': 'تَحْرَنْشِفْنَ',
      '3mp': 'يَحْرَنْشِفُوا',
      '3fp': 'يَحْرَنْشِفْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Hr$f-3')!)).toMatchObjectT({
      '2ms': 'اِحْرَنْشِفْ',
      '2fs': 'اِحْرَنْشِفِي',
      '2d': 'اِحْرَنْشِفَا',
      '2mp': 'اِحْرَنْشِفُوا',
      '2fp': 'اِحْرَنْشِفْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Hr$f-3')!)).toMatchObjectT({
      '3ms': 'اُحْرُنْشِفَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hr$f-3')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُحْرَنْشَفُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hr$f-3')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُحْرَنْشَفَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Hr$f-3')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُحْرَنْشَفْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Hr$f-3')!)).toEqualT('مُحْرَنْشِف')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Hr$f-3')!)).toEqualT('مُحْرَنْشَف')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('Hr$f-3')!))).toEqualT(new Set(['اِحْرِنْشَاف']))
  })
})
