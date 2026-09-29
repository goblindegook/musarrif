import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("k'k'-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("k'k'-2")!)).toEqualT({
      '1s': 'تَكَأْكَأْتُ',
      '2ms': 'تَكَأْكَأْتَ',
      '2fs': 'تَكَأْكَأْتِ',
      '3ms': 'تَكَأْكَأَ',
      '3fs': 'تَكَأْكَأَتْ',
      '2d': 'تَكَأْكَأْتُمَا',
      '3md': 'تَكَأْكَآ',
      '3fd': 'تَكَأْكَأَتَا',
      '1p': 'تَكَأْكَأْنَا',
      '2mp': 'تَكَأْكَأْتُمْ',
      '2fp': 'تَكَأْكَأْتُنَّ',
      '3mp': 'تَكَأْكَؤُوا',
      '3fp': 'تَكَأْكَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("k'k'-2")!, 'indicative')).toEqualT({
      '1s': 'أَتَكَأْكَأُ',
      '2ms': 'تَتَكَأْكَأُ',
      '2fs': 'تَتَكَأْكَئِينَ',
      '3ms': 'يَتَكَأْكَأُ',
      '3fs': 'تَتَكَأْكَأُ',
      '2d': 'تَتَكَأْكَآنِ',
      '3md': 'يَتَكَأْكَآنِ',
      '3fd': 'تَتَكَأْكَآنِ',
      '1p': 'نَتَكَأْكَأُ',
      '2mp': 'تَتَكَأْكَؤُونَ',
      '2fp': 'تَتَكَأْكَأْنَ',
      '3mp': 'يَتَكَأْكَؤُونَ',
      '3fp': 'يَتَكَأْكَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("k'k'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَكَأْكَأَ',
      '2ms': 'تَتَكَأْكَأَ',
      '2fs': 'تَتَكَأْكَئِي',
      '3ms': 'يَتَكَأْكَأَ',
      '3fs': 'تَتَكَأْكَأَ',
      '2d': 'تَتَكَأْكَآ',
      '3md': 'يَتَكَأْكَآ',
      '3fd': 'تَتَكَأْكَآ',
      '1p': 'نَتَكَأْكَأَ',
      '2mp': 'تَتَكَأْكَؤُوا',
      '2fp': 'تَتَكَأْكَأْنَ',
      '3mp': 'يَتَكَأْكَؤُوا',
      '3fp': 'يَتَكَأْكَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("k'k'-2")!, 'jussive')).toEqualT({
      '1s': 'أَتَكَأْكَأْ',
      '2ms': 'تَتَكَأْكَأْ',
      '2fs': 'تَتَكَأْكَئِي',
      '3ms': 'يَتَكَأْكَأْ',
      '3fs': 'تَتَكَأْكَأْ',
      '2d': 'تَتَكَأْكَآ',
      '3md': 'يَتَكَأْكَآ',
      '3fd': 'تَتَكَأْكَآ',
      '1p': 'نَتَكَأْكَأْ',
      '2mp': 'تَتَكَأْكَؤُوا',
      '2fp': 'تَتَكَأْكَأْنَ',
      '3mp': 'يَتَكَأْكَؤُوا',
      '3fp': 'يَتَكَأْكَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("k'k'-2")!)).toMatchObjectT({
      '2ms': 'تَكَأْكَأْ',
      '2fs': 'تَكَأْكَئِي',
      '2d': 'تَكَأْكَآ',
      '2mp': 'تَكَأْكَؤُوا',
      '2fp': 'تَكَأْكَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("k'k'-2")!)).toMatchObjectT({
      '3ms': 'تُكُؤْكِئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("k'k'-2")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَكَأْكَأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("k'k'-2")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَكَأْكَأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("k'k'-2")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَكَأْكَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("k'k'-2")!)).toEqualT('مُتَكَأْكِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("k'k'-2")!)).toEqualT('مُتَكَأْكَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("k'k'-2")!))).toEqualT(new Set(['تَكَأْكُؤ']))
  })
})
