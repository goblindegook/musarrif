import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$yd-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$yd-1')!)).toEqualT({
      '1s': 'شِدْتُ',
      '2ms': 'شِدْتَ',
      '2fs': 'شِدْتِ',
      '3ms': 'شَادَ',
      '3fs': 'شَادَتْ',
      '2d': 'شِدْتُمَا',
      '3md': 'شَادَا',
      '3fd': 'شَادَتَا',
      '1p': 'شِدْنَا',
      '2mp': 'شِدْتُمْ',
      '2fp': 'شِدْتُنَّ',
      '3mp': 'شَادُوا',
      '3fp': 'شِدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$yd-1')!, 'indicative')).toEqualT({
      '1s': 'أَشِيدُ',
      '2ms': 'تَشِيدُ',
      '2fs': 'تَشِيدِينَ',
      '3ms': 'يَشِيدُ',
      '3fs': 'تَشِيدُ',
      '2d': 'تَشِيدَانِ',
      '3md': 'يَشِيدَانِ',
      '3fd': 'تَشِيدَانِ',
      '1p': 'نَشِيدُ',
      '2mp': 'تَشِيدُونَ',
      '2fp': 'تَشِدْنَ',
      '3mp': 'يَشِيدُونَ',
      '3fp': 'يَشِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$yd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَشِيدَ',
      '2ms': 'تَشِيدَ',
      '2fs': 'تَشِيدِي',
      '3ms': 'يَشِيدَ',
      '3fs': 'تَشِيدَ',
      '2d': 'تَشِيدَا',
      '3md': 'يَشِيدَا',
      '3fd': 'تَشِيدَا',
      '1p': 'نَشِيدَ',
      '2mp': 'تَشِيدُوا',
      '2fp': 'تَشِدْنَ',
      '3mp': 'يَشِيدُوا',
      '3fp': 'يَشِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$yd-1')!, 'jussive')).toEqualT({
      '1s': 'أَشِدْ',
      '2ms': 'تَشِدْ',
      '2fs': 'تَشِيدِي',
      '3ms': 'يَشِدْ',
      '3fs': 'تَشِدْ',
      '2d': 'تَشِيدَا',
      '3md': 'يَشِيدَا',
      '3fd': 'تَشِيدَا',
      '1p': 'نَشِدْ',
      '2mp': 'تَشِيدُوا',
      '2fp': 'تَشِدْنَ',
      '3mp': 'يَشِيدُوا',
      '3fp': 'يَشِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$yd-1')!)).toMatchObjectT({
      '2ms': 'شِدْ',
      '2fs': 'شِيدِي',
      '2d': 'شِيدَا',
      '2mp': 'شِيدُوا',
      '2fp': 'شِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$yd-1')!)).toEqualT({
      '1s': 'شِدْتُ',
      '2ms': 'شِدْتَ',
      '2fs': 'شِدْتِ',
      '3ms': 'شِيدَ',
      '3fs': 'شِيدَتْ',
      '2d': 'شِدْتُمَا',
      '3md': 'شِيدَا',
      '3fd': 'شِيدَتَا',
      '1p': 'شِدْنَا',
      '2mp': 'شِدْتُمْ',
      '2fp': 'شِدْتُنَّ',
      '3mp': 'شِيدُوا',
      '3fp': 'شِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yd-1')!, 'indicative')).toEqualT({
      '1s': 'أُشَادُ',
      '2ms': 'تُشَادُ',
      '2fs': 'تُشَادِينَ',
      '3ms': 'يُشَادُ',
      '3fs': 'تُشَادُ',
      '2d': 'تُشَادَانِ',
      '3md': 'يُشَادَانِ',
      '3fd': 'تُشَادَانِ',
      '1p': 'نُشَادُ',
      '2mp': 'تُشَادُونَ',
      '2fp': 'تُشَدْنَ',
      '3mp': 'يُشَادُونَ',
      '3fp': 'يُشَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَادَ',
      '2ms': 'تُشَادَ',
      '2fs': 'تُشَادِي',
      '3ms': 'يُشَادَ',
      '3fs': 'تُشَادَ',
      '2d': 'تُشَادَا',
      '3md': 'يُشَادَا',
      '3fd': 'تُشَادَا',
      '1p': 'نُشَادَ',
      '2mp': 'تُشَادُوا',
      '2fp': 'تُشَدْنَ',
      '3mp': 'يُشَادُوا',
      '3fp': 'يُشَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yd-1')!, 'jussive')).toEqualT({
      '1s': 'أُشَدْ',
      '2ms': 'تُشَدْ',
      '2fs': 'تُشَادِي',
      '3ms': 'يُشَدْ',
      '3fs': 'تُشَدْ',
      '2d': 'تُشَادَا',
      '3md': 'يُشَادَا',
      '3fd': 'تُشَادَا',
      '1p': 'نُشَدْ',
      '2mp': 'تُشَادُوا',
      '2fp': 'تُشَدْنَ',
      '3mp': 'يُشَادُوا',
      '3fp': 'يُشَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$yd-1')!)).toEqualT('شَائِد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$yd-1')!)).toEqualT('مَشِيد')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$yd-1')!))).toEqualT(new Set(['شَيْد']))
  })
})
