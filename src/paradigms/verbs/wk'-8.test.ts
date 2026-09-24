import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wk'-8 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wk'-8")!)).toEqualT({
      '1s': 'اِتَّكَأْتُ',
      '2ms': 'اِتَّكَأْتَ',
      '2fs': 'اِتَّكَأْتِ',
      '3ms': 'اِتَّكَأَ',
      '3fs': 'اِتَّكَأَتْ',
      '2d': 'اِتَّكَأْتُمَا',
      '3md': 'اِتَّكَآ',
      '3fd': 'اِتَّكَأَتَا',
      '1p': 'اِتَّكَأْنَا',
      '2mp': 'اِتَّكَأْتُمْ',
      '2fp': 'اِتَّكَأْتُنَّ',
      '3mp': 'اِتَّكَؤُوا',
      '3fp': 'اِتَّكَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wk'-8")!, 'indicative')).toEqualT({
      '1s': 'أَتَّكِئُ',
      '2ms': 'تَتَّكِئُ',
      '2fs': 'تَتَّكِئِينَ',
      '3ms': 'يَتَّكِئُ',
      '3fs': 'تَتَّكِئُ',
      '2d': 'تَتَّكِئَانِ',
      '3md': 'يَتَّكِئَانِ',
      '3fd': 'تَتَّكِئَانِ',
      '1p': 'نَتَّكِئُ',
      '2mp': 'تَتَّكِئُونَ',
      '2fp': 'تَتَّكِئْنَ',
      '3mp': 'يَتَّكِئُونَ',
      '3fp': 'يَتَّكِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wk'-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَّكِئَ',
      '2ms': 'تَتَّكِئَ',
      '2fs': 'تَتَّكِئِي',
      '3ms': 'يَتَّكِئَ',
      '3fs': 'تَتَّكِئَ',
      '2d': 'تَتَّكِئَا',
      '3md': 'يَتَّكِئَا',
      '3fd': 'تَتَّكِئَا',
      '1p': 'نَتَّكِئَ',
      '2mp': 'تَتَّكِئُوا',
      '2fp': 'تَتَّكِئْنَ',
      '3mp': 'يَتَّكِئُوا',
      '3fp': 'يَتَّكِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wk'-8")!, 'jussive')).toEqualT({
      '1s': 'أَتَّكِئْ',
      '2ms': 'تَتَّكِئْ',
      '2fs': 'تَتَّكِئِي',
      '3ms': 'يَتَّكِئْ',
      '3fs': 'تَتَّكِئْ',
      '2d': 'تَتَّكِئَا',
      '3md': 'يَتَّكِئَا',
      '3fd': 'تَتَّكِئَا',
      '1p': 'نَتَّكِئْ',
      '2mp': 'تَتَّكِئُوا',
      '2fp': 'تَتَّكِئْنَ',
      '3mp': 'يَتَّكِئُوا',
      '3fp': 'يَتَّكِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wk'-8")!)).toMatchObjectT({
      '2ms': 'اِتَّكِئْ',
      '2fs': 'اِتَّكِئِي',
      '2d': 'اِتَّكِئَا',
      '2mp': 'اِتَّكِئُوا',
      '2fp': 'اِتَّكِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wk'-8")!)).toMatchObjectT({
      '3ms': 'اُتُّكِئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wk'-8")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَّكَأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wk'-8")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَّكَأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wk'-8")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَّكَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wk'-8")!)).toEqualT('مُتَّكِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wk'-8")!)).toEqualT('مُتَّكَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wk'-8")!))).toEqualT(new Set(['اِتِّكَاء']))
  })
})
