import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("w'd-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("w'd-1")!)).toEqualT({
      '1s': 'وَأَدْتُ',
      '2ms': 'وَأَدْتَ',
      '2fs': 'وَأَدْتِ',
      '3ms': 'وَأَدَ',
      '3fs': 'وَأَدَتْ',
      '2d': 'وَأَدْتُمَا',
      '3md': 'وَأَدَا',
      '3fd': 'وَأَدَتَا',
      '1p': 'وَأَدْنَا',
      '2mp': 'وَأَدْتُمْ',
      '2fp': 'وَأَدْتُنَّ',
      '3mp': 'وَأَدُوا',
      '3fp': 'وَأَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("w'd-1")!, 'indicative')).toEqualT({
      '1s': 'أَئِدُ',
      '2ms': 'تَئِدُ',
      '2fs': 'تَئِدِينَ',
      '3ms': 'يَئِدُ',
      '3fs': 'تَئِدُ',
      '2d': 'تَئِدَانِ',
      '3md': 'يَئِدَانِ',
      '3fd': 'تَئِدَانِ',
      '1p': 'نَئِدُ',
      '2mp': 'تَئِدُونَ',
      '2fp': 'تَئِدْنَ',
      '3mp': 'يَئِدُونَ',
      '3fp': 'يَئِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("w'd-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَئِدَ',
      '2ms': 'تَئِدَ',
      '2fs': 'تَئِدِي',
      '3ms': 'يَئِدَ',
      '3fs': 'تَئِدَ',
      '2d': 'تَئِدَا',
      '3md': 'يَئِدَا',
      '3fd': 'تَئِدَا',
      '1p': 'نَئِدَ',
      '2mp': 'تَئِدُوا',
      '2fp': 'تَئِدْنَ',
      '3mp': 'يَئِدُوا',
      '3fp': 'يَئِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("w'd-1")!, 'jussive')).toEqualT({
      '1s': 'أَئِدْ',
      '2ms': 'تَئِدْ',
      '2fs': 'تَئِدِي',
      '3ms': 'يَئِدْ',
      '3fs': 'تَئِدْ',
      '2d': 'تَئِدَا',
      '3md': 'يَئِدَا',
      '3fd': 'تَئِدَا',
      '1p': 'نَئِدْ',
      '2mp': 'تَئِدُوا',
      '2fp': 'تَئِدْنَ',
      '3mp': 'يَئِدُوا',
      '3fp': 'يَئِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("w'd-1")!)).toMatchObjectT({
      '2ms': 'إِدْ',
      '2fs': 'إِدِي',
      '2d': 'إِدَا',
      '2mp': 'إِدُوا',
      '2fp': 'إِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("w'd-1")!)).toEqualT({
      '1s': 'وُئِدْتُ',
      '2ms': 'وُئِدْتَ',
      '2fs': 'وُئِدْتِ',
      '3ms': 'وُئِدَ',
      '3fs': 'وُئِدَتْ',
      '2d': 'وُئِدْتُمَا',
      '3md': 'وُئِدَا',
      '3fd': 'وُئِدَتَا',
      '1p': 'وُئِدْنَا',
      '2mp': 'وُئِدْتُمْ',
      '2fp': 'وُئِدْتُنَّ',
      '3mp': 'وُئِدُوا',
      '3fp': 'وُئِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'd-1")!, 'indicative')).toEqualT({
      '1s': 'أُوءَدُ',
      '2ms': 'تُوءَدُ',
      '2fs': 'تُوءَدِينَ',
      '3ms': 'يُوءَدُ',
      '3fs': 'تُوءَدُ',
      '2d': 'تُوءَدَانِ',
      '3md': 'يُوءَدَانِ',
      '3fd': 'تُوءَدَانِ',
      '1p': 'نُوءَدُ',
      '2mp': 'تُوءَدُونَ',
      '2fp': 'تُوءَدْنَ',
      '3mp': 'يُوءَدُونَ',
      '3fp': 'يُوءَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'd-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُوءَدَ',
      '2ms': 'تُوءَدَ',
      '2fs': 'تُوءَدِي',
      '3ms': 'يُوءَدَ',
      '3fs': 'تُوءَدَ',
      '2d': 'تُوءَدَا',
      '3md': 'يُوءَدَا',
      '3fd': 'تُوءَدَا',
      '1p': 'نُوءَدَ',
      '2mp': 'تُوءَدُوا',
      '2fp': 'تُوءَدْنَ',
      '3mp': 'يُوءَدُوا',
      '3fp': 'يُوءَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("w'd-1")!, 'jussive')).toEqualT({
      '1s': 'أُوءَدْ',
      '2ms': 'تُوءَدْ',
      '2fs': 'تُوءَدِي',
      '3ms': 'يُوءَدْ',
      '3fs': 'تُوءَدْ',
      '2d': 'تُوءَدَا',
      '3md': 'يُوءَدَا',
      '3fd': 'تُوءَدَا',
      '1p': 'نُوءَدْ',
      '2mp': 'تُوءَدُوا',
      '2fp': 'تُوءَدْنَ',
      '3mp': 'يُوءَدُوا',
      '3fp': 'يُوءَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("w'd-1")!)).toEqualT('وَائِد')
  })

  test('passive participle', () => {
    // مَوْءُود is the correct passive participle, Wiktionary is wrong.
    expect(derivePassiveParticiple(getVerbById("w'd-1")!)).toEqualT('مَوْءُود')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("w'd-1")!))).toEqualT(new Set(['وَأْد']))
  })
})
