import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("w'd-8 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("w'd-8")!)).toEqualT({
      '1s': 'اِتَّأَدْتُ',
      '2ms': 'اِتَّأَدْتَ',
      '2fs': 'اِتَّأَدْتِ',
      '3ms': 'اِتَّأَدَ',
      '3fs': 'اِتَّأَدَتْ',
      '2d': 'اِتَّأَدْتُمَا',
      '3md': 'اِتَّأَدَا',
      '3fd': 'اِتَّأَدَتَا',
      '1p': 'اِتَّأَدْنَا',
      '2mp': 'اِتَّأَدْتُمْ',
      '2fp': 'اِتَّأَدْتُنَّ',
      '3mp': 'اِتَّأَدُوا',
      '3fp': 'اِتَّأَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("w'd-8")!, 'indicative')).toEqualT({
      '1s': 'أَتَّئِدُ',
      '2ms': 'تَتَّئِدُ',
      '2fs': 'تَتَّئِدِينَ',
      '3ms': 'يَتَّئِدُ',
      '3fs': 'تَتَّئِدُ',
      '2d': 'تَتَّئِدَانِ',
      '3md': 'يَتَّئِدَانِ',
      '3fd': 'تَتَّئِدَانِ',
      '1p': 'نَتَّئِدُ',
      '2mp': 'تَتَّئِدُونَ',
      '2fp': 'تَتَّئِدْنَ',
      '3mp': 'يَتَّئِدُونَ',
      '3fp': 'يَتَّئِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("w'd-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَّئِدَ',
      '2ms': 'تَتَّئِدَ',
      '2fs': 'تَتَّئِدِي',
      '3ms': 'يَتَّئِدَ',
      '3fs': 'تَتَّئِدَ',
      '2d': 'تَتَّئِدَا',
      '3md': 'يَتَّئِدَا',
      '3fd': 'تَتَّئِدَا',
      '1p': 'نَتَّئِدَ',
      '2mp': 'تَتَّئِدُوا',
      '2fp': 'تَتَّئِدْنَ',
      '3mp': 'يَتَّئِدُوا',
      '3fp': 'يَتَّئِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("w'd-8")!, 'jussive')).toEqualT({
      '1s': 'أَتَّئِدْ',
      '2ms': 'تَتَّئِدْ',
      '2fs': 'تَتَّئِدِي',
      '3ms': 'يَتَّئِدْ',
      '3fs': 'تَتَّئِدْ',
      '2d': 'تَتَّئِدَا',
      '3md': 'يَتَّئِدَا',
      '3fd': 'تَتَّئِدَا',
      '1p': 'نَتَّئِدْ',
      '2mp': 'تَتَّئِدُوا',
      '2fp': 'تَتَّئِدْنَ',
      '3mp': 'يَتَّئِدُوا',
      '3fp': 'يَتَّئِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("w'd-8")!)).toMatchObjectT({
      '2ms': 'اِتَّئِدْ',
      '2fs': 'اِتَّئِدِي',
      '2d': 'اِتَّئِدَا',
      '2mp': 'اِتَّئِدُوا',
      '2fp': 'اِتَّئِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("w'd-8")!)).toMatchObjectT({
      '3ms': 'اُتُّئِدَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'd-8")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُتَّأَدُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'd-8")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُتَّأَدَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'd-8")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُتَّأَدْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("w'd-8")!)).toEqualT('مُتَّئِد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("w'd-8")!)).toEqualT('مُتَّأَد')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("w'd-8")!))).toEqualT(new Set(['اِتِّئَاد']))
  })
})
