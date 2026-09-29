import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe("bT'-6 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("bT'-6")!)).toEqualT({
      '1s': 'تَبَاطَأْتُ',
      '2ms': 'تَبَاطَأْتَ',
      '2fs': 'تَبَاطَأْتِ',
      '3ms': 'تَبَاطَأَ',
      '3fs': 'تَبَاطَأَتْ',
      '2d': 'تَبَاطَأْتُمَا',
      '3md': 'تَبَاطَآ',
      '3fd': 'تَبَاطَأَتَا',
      '1p': 'تَبَاطَأْنَا',
      '2mp': 'تَبَاطَأْتُمْ',
      '2fp': 'تَبَاطَأْتُنَّ',
      '3mp': 'تَبَاطَؤُوا',
      '3fp': 'تَبَاطَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("bT'-6")!, 'indicative')).toEqualT({
      '1s': 'أَتَبَاطَأُ',
      '2ms': 'تَتَبَاطَأُ',
      '2fs': 'تَتَبَاطَئِينَ',
      '3ms': 'يَتَبَاطَأُ',
      '3fs': 'تَتَبَاطَأُ',
      '2d': 'تَتَبَاطَآنِ',
      '3md': 'يَتَبَاطَآنِ',
      '3fd': 'تَتَبَاطَآنِ',
      '1p': 'نَتَبَاطَأُ',
      '2mp': 'تَتَبَاطَؤُونَ',
      '2fp': 'تَتَبَاطَأْنَ',
      '3mp': 'يَتَبَاطَؤُونَ',
      '3fp': 'يَتَبَاطَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("bT'-6")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَبَاطَأَ',
      '2ms': 'تَتَبَاطَأَ',
      '2fs': 'تَتَبَاطَئِي',
      '3ms': 'يَتَبَاطَأَ',
      '3fs': 'تَتَبَاطَأَ',
      '2d': 'تَتَبَاطَآ',
      '3md': 'يَتَبَاطَآ',
      '3fd': 'تَتَبَاطَآ',
      '1p': 'نَتَبَاطَأَ',
      '2mp': 'تَتَبَاطَؤُوا',
      '2fp': 'تَتَبَاطَأْنَ',
      '3mp': 'يَتَبَاطَؤُوا',
      '3fp': 'يَتَبَاطَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("bT'-6")!, 'jussive')).toEqualT({
      '1s': 'أَتَبَاطَأْ',
      '2ms': 'تَتَبَاطَأْ',
      '2fs': 'تَتَبَاطَئِي',
      '3ms': 'يَتَبَاطَأْ',
      '3fs': 'تَتَبَاطَأْ',
      '2d': 'تَتَبَاطَآ',
      '3md': 'يَتَبَاطَآ',
      '3fd': 'تَتَبَاطَآ',
      '1p': 'نَتَبَاطَأْ',
      '2mp': 'تَتَبَاطَؤُوا',
      '2fp': 'تَتَبَاطَأْنَ',
      '3mp': 'يَتَبَاطَؤُوا',
      '3fp': 'يَتَبَاطَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("bT'-6")!)).toMatchObjectT({
      '2ms': 'تَبَاطَأْ',
      '2fs': 'تَبَاطَئِي',
      '2d': 'تَبَاطَآ',
      '2mp': 'تَبَاطَؤُوا',
      '2fp': 'تَبَاطَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("bT'-6")!)).toEqualT('مُتَبَاطِئ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("bT'-6")!))).toEqualT(new Set(['تَبَاطُؤ']))
  })
})
