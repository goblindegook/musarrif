import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("r'f-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("r'f-5")!)).toEqualT({
      '1s': 'تَرَأَّفْتُ',
      '2ms': 'تَرَأَّفْتَ',
      '2fs': 'تَرَأَّفْتِ',
      '3ms': 'تَرَأَّفَ',
      '3fs': 'تَرَأَّفَتْ',
      '2d': 'تَرَأَّفْتُمَا',
      '3md': 'تَرَأَّفَا',
      '3fd': 'تَرَأَّفَتَا',
      '1p': 'تَرَأَّفْنَا',
      '2mp': 'تَرَأَّفْتُمْ',
      '2fp': 'تَرَأَّفْتُنَّ',
      '3mp': 'تَرَأَّفُوا',
      '3fp': 'تَرَأَّفْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("r'f-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَرَأَّفُ',
      '2ms': 'تَتَرَأَّفُ',
      '2fs': 'تَتَرَأَّفِينَ',
      '3ms': 'يَتَرَأَّفُ',
      '3fs': 'تَتَرَأَّفُ',
      '2d': 'تَتَرَأَّفَانِ',
      '3md': 'يَتَرَأَّفَانِ',
      '3fd': 'تَتَرَأَّفَانِ',
      '1p': 'نَتَرَأَّفُ',
      '2mp': 'تَتَرَأَّفُونَ',
      '2fp': 'تَتَرَأَّفْنَ',
      '3mp': 'يَتَرَأَّفُونَ',
      '3fp': 'يَتَرَأَّفْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("r'f-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَرَأَّفَ',
      '2ms': 'تَتَرَأَّفَ',
      '2fs': 'تَتَرَأَّفِي',
      '3ms': 'يَتَرَأَّفَ',
      '3fs': 'تَتَرَأَّفَ',
      '2d': 'تَتَرَأَّفَا',
      '3md': 'يَتَرَأَّفَا',
      '3fd': 'تَتَرَأَّفَا',
      '1p': 'نَتَرَأَّفَ',
      '2mp': 'تَتَرَأَّفُوا',
      '2fp': 'تَتَرَأَّفْنَ',
      '3mp': 'يَتَرَأَّفُوا',
      '3fp': 'يَتَرَأَّفْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("r'f-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَرَأَّفْ',
      '2ms': 'تَتَرَأَّفْ',
      '2fs': 'تَتَرَأَّفِي',
      '3ms': 'يَتَرَأَّفْ',
      '3fs': 'تَتَرَأَّفْ',
      '2d': 'تَتَرَأَّفَا',
      '3md': 'يَتَرَأَّفَا',
      '3fd': 'تَتَرَأَّفَا',
      '1p': 'نَتَرَأَّفْ',
      '2mp': 'تَتَرَأَّفُوا',
      '2fp': 'تَتَرَأَّفْنَ',
      '3mp': 'يَتَرَأَّفُوا',
      '3fp': 'يَتَرَأَّفْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("r'f-5")!)).toMatchObjectT({
      '2ms': 'تَرَأَّفْ',
      '2fs': 'تَرَأَّفِي',
      '2d': 'تَرَأَّفَا',
      '2mp': 'تَرَأَّفُوا',
      '2fp': 'تَرَأَّفْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("r'f-5")!)).toMatchObjectT({
      '3ms': 'تُرُئِّفَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'f-5")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَرَأَّفُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'f-5")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَرَأَّفَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("r'f-5")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَرَأَّفْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("r'f-5")!)).toEqualT('مُتَرَئِّف')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("r'f-5")!)).toEqualT('مُتَرَأَّف')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("r'f-5")!))).toEqualT(new Set(['تَرَؤُّف']))
  })
})
