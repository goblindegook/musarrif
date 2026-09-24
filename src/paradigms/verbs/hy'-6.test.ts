import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("hy'-6 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("hy'-6")!)).toEqualT({
      '1s': 'تَهَايَأْتُ',
      '2ms': 'تَهَايَأْتَ',
      '2fs': 'تَهَايَأْتِ',
      '3ms': 'تَهَايَأَ',
      '3fs': 'تَهَايَأَتْ',
      '2d': 'تَهَايَأْتُمَا',
      '3md': 'تَهَايَآ',
      '3fd': 'تَهَايَأَتَا',
      '1p': 'تَهَايَأْنَا',
      '2mp': 'تَهَايَأْتُمْ',
      '2fp': 'تَهَايَأْتُنَّ',
      '3mp': 'تَهَايَؤُوا',
      '3fp': 'تَهَايَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("hy'-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَهَايَأُ',
      '2ms': 'تَتَهَايَأُ',
      '2fs': 'تَتَهَايَئِينَ',
      '3ms': 'يَتَهَايَأُ',
      '3fs': 'تَتَهَايَأُ',
      '2d': 'تَتَهَايَآنِ',
      '3md': 'يَتَهَايَآنِ',
      '3fd': 'تَتَهَايَآنِ',
      '1p': 'نَتَهَايَأُ',
      '2mp': 'تَتَهَايَؤُونَ',
      '2fp': 'تَتَهَايَأْنَ',
      '3mp': 'يَتَهَايَؤُونَ',
      '3fp': 'يَتَهَايَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("hy'-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَهَايَأَ',
      '2ms': 'تَتَهَايَأَ',
      '2fs': 'تَتَهَايَئِي',
      '3ms': 'يَتَهَايَأَ',
      '3fs': 'تَتَهَايَأَ',
      '2d': 'تَتَهَايَآ',
      '3md': 'يَتَهَايَآ',
      '3fd': 'تَتَهَايَآ',
      '1p': 'نَتَهَايَأَ',
      '2mp': 'تَتَهَايَؤُوا',
      '2fp': 'تَتَهَايَأْنَ',
      '3mp': 'يَتَهَايَؤُوا',
      '3fp': 'يَتَهَايَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("hy'-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَهَايَأْ',
      '2ms': 'تَتَهَايَأْ',
      '2fs': 'تَتَهَايَئِي',
      '3ms': 'يَتَهَايَأْ',
      '3fs': 'تَتَهَايَأْ',
      '2d': 'تَتَهَايَآ',
      '3md': 'يَتَهَايَآ',
      '3fd': 'تَتَهَايَآ',
      '1p': 'نَتَهَايَأْ',
      '2mp': 'تَتَهَايَؤُوا',
      '2fp': 'تَتَهَايَأْنَ',
      '3mp': 'يَتَهَايَؤُوا',
      '3fp': 'يَتَهَايَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("hy'-6")!)).toMatchObjectT({
      '2ms': 'تَهَايَأْ',
      '2fs': 'تَهَايَئِي',
      '2d': 'تَهَايَآ',
      '2mp': 'تَهَايَؤُوا',
      '2fp': 'تَهَايَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("hy'-6")!)).toMatchObjectT({
      '3ms': 'تُهُويِئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("hy'-6")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَهَايَأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hy'-6")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَهَايَأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hy'-6")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَهَايَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("hy'-6")!)).toEqualT('مُتَهَايِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("hy'-6")!)).toEqualT('مُتَهَايَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("hy'-6")!))).toEqualT(new Set(['تَهَايُؤ']))
  })
})
