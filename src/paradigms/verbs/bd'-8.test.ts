import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("bd'-8 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("bd'-8")!)).toEqualT({
      '1s': 'اِبْتَدَأْتُ',
      '2ms': 'اِبْتَدَأْتَ',
      '2fs': 'اِبْتَدَأْتِ',
      '3ms': 'اِبْتَدَأَ',
      '3fs': 'اِبْتَدَأَتْ',
      '2d': 'اِبْتَدَأْتُمَا',
      '3md': 'اِبْتَدَآ',
      '3fd': 'اِبْتَدَأَتَا',
      '1p': 'اِبْتَدَأْنَا',
      '2mp': 'اِبْتَدَأْتُمْ',
      '2fp': 'اِبْتَدَأْتُنَّ',
      '3mp': 'اِبْتَدَؤُوا',
      '3fp': 'اِبْتَدَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("bd'-8")!, 'indicative')).toEqualT({
      '1s': 'أَبْتَدِئُ',
      '2ms': 'تَبْتَدِئُ',
      '2fs': 'تَبْتَدِئِينَ',
      '3ms': 'يَبْتَدِئُ',
      '3fs': 'تَبْتَدِئُ',
      '2d': 'تَبْتَدِئَانِ',
      '3md': 'يَبْتَدِئَانِ',
      '3fd': 'تَبْتَدِئَانِ',
      '1p': 'نَبْتَدِئُ',
      '2mp': 'تَبْتَدِئُونَ',
      '2fp': 'تَبْتَدِئْنَ',
      '3mp': 'يَبْتَدِئُونَ',
      '3fp': 'يَبْتَدِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("bd'-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَبْتَدِئَ',
      '2ms': 'تَبْتَدِئَ',
      '2fs': 'تَبْتَدِئِي',
      '3ms': 'يَبْتَدِئَ',
      '3fs': 'تَبْتَدِئَ',
      '2d': 'تَبْتَدِئَا',
      '3md': 'يَبْتَدِئَا',
      '3fd': 'تَبْتَدِئَا',
      '1p': 'نَبْتَدِئَ',
      '2mp': 'تَبْتَدِئُوا',
      '2fp': 'تَبْتَدِئْنَ',
      '3mp': 'يَبْتَدِئُوا',
      '3fp': 'يَبْتَدِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("bd'-8")!, 'jussive')).toEqualT({
      '1s': 'أَبْتَدِئْ',
      '2ms': 'تَبْتَدِئْ',
      '2fs': 'تَبْتَدِئِي',
      '3ms': 'يَبْتَدِئْ',
      '3fs': 'تَبْتَدِئْ',
      '2d': 'تَبْتَدِئَا',
      '3md': 'يَبْتَدِئَا',
      '3fd': 'تَبْتَدِئَا',
      '1p': 'نَبْتَدِئْ',
      '2mp': 'تَبْتَدِئُوا',
      '2fp': 'تَبْتَدِئْنَ',
      '3mp': 'يَبْتَدِئُوا',
      '3fp': 'يَبْتَدِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("bd'-8")!)).toMatchObjectT({
      '2ms': 'اِبْتَدِئْ',
      '2fs': 'اِبْتَدِئِي',
      '2d': 'اِبْتَدِئَا',
      '2mp': 'اِبْتَدِئُوا',
      '2fp': 'اِبْتَدِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("bd'-8")!)).toMatchObjectT({
      '3ms': 'اُبْتُدِئَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("bd'-8")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُبْتَدَأُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("bd'-8")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُبْتَدَأَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("bd'-8")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُبْتَدَأْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("bd'-8")!)).toEqualT('مُبْتَدِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("bd'-8")!)).toEqualT('مُبْتَدَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("bd'-8")!))).toEqualT(new Set(['اِبْتِدَاء']))
  })
})
