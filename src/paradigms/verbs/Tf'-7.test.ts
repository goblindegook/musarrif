import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("Tf'-7 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Tf'-7")!)).toEqualT({
      '1s': 'اِنْطَفَأْتُ',
      '2ms': 'اِنْطَفَأْتَ',
      '2fs': 'اِنْطَفَأْتِ',
      '3ms': 'اِنْطَفَأَ',
      '3fs': 'اِنْطَفَأَتْ',
      '2d': 'اِنْطَفَأْتُمَا',
      '3md': 'اِنْطَفَآ',
      '3fd': 'اِنْطَفَأَتَا',
      '1p': 'اِنْطَفَأْنَا',
      '2mp': 'اِنْطَفَأْتُمْ',
      '2fp': 'اِنْطَفَأْتُنَّ',
      '3mp': 'اِنْطَفَؤُوا',
      '3fp': 'اِنْطَفَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Tf'-7")!, 'indicative')).toEqualT({
      '1s': 'أَنْطَفِئُ',
      '2ms': 'تَنْطَفِئُ',
      '2fs': 'تَنْطَفِئِينَ',
      '3ms': 'يَنْطَفِئُ',
      '3fs': 'تَنْطَفِئُ',
      '2d': 'تَنْطَفِئَانِ',
      '3md': 'يَنْطَفِئَانِ',
      '3fd': 'تَنْطَفِئَانِ',
      '1p': 'نَنْطَفِئُ',
      '2mp': 'تَنْطَفِئُونَ',
      '2fp': 'تَنْطَفِئْنَ',
      '3mp': 'يَنْطَفِئُونَ',
      '3fp': 'يَنْطَفِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Tf'-7")!, 'subjunctive')).toEqualT({
      '1s': 'أَنْطَفِئَ',
      '2ms': 'تَنْطَفِئَ',
      '2fs': 'تَنْطَفِئِي',
      '3ms': 'يَنْطَفِئَ',
      '3fs': 'تَنْطَفِئَ',
      '2d': 'تَنْطَفِئَا',
      '3md': 'يَنْطَفِئَا',
      '3fd': 'تَنْطَفِئَا',
      '1p': 'نَنْطَفِئَ',
      '2mp': 'تَنْطَفِئُوا',
      '2fp': 'تَنْطَفِئْنَ',
      '3mp': 'يَنْطَفِئُوا',
      '3fp': 'يَنْطَفِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Tf'-7")!, 'jussive')).toEqualT({
      '1s': 'أَنْطَفِئْ',
      '2ms': 'تَنْطَفِئْ',
      '2fs': 'تَنْطَفِئِي',
      '3ms': 'يَنْطَفِئْ',
      '3fs': 'تَنْطَفِئْ',
      '2d': 'تَنْطَفِئَا',
      '3md': 'يَنْطَفِئَا',
      '3fd': 'تَنْطَفِئَا',
      '1p': 'نَنْطَفِئْ',
      '2mp': 'تَنْطَفِئُوا',
      '2fp': 'تَنْطَفِئْنَ',
      '3mp': 'يَنْطَفِئُوا',
      '3fp': 'يَنْطَفِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Tf'-7")!)).toMatchObjectT({
      '2ms': 'اِنْطَفِئْ',
      '2fs': 'اِنْطَفِئِي',
      '2d': 'اِنْطَفِئَا',
      '2mp': 'اِنْطَفِئُوا',
      '2fp': 'اِنْطَفِئْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Tf'-7")!)).toEqualT('مُنْطَفِئ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Tf'-7")!))).toEqualT(new Set(['اِنْطِفَاء']))
  })
})
