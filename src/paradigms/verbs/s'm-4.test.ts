import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("s'm-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("s'm-4")!)).toEqualT({
      '1s': 'أَسْأَمْتُ',
      '2ms': 'أَسْأَمْتَ',
      '2fs': 'أَسْأَمْتِ',
      '3ms': 'أَسْأَمَ',
      '3fs': 'أَسْأَمَتْ',
      '2d': 'أَسْأَمْتُمَا',
      '3md': 'أَسْأَمَا',
      '3fd': 'أَسْأَمَتَا',
      '1p': 'أَسْأَمْنَا',
      '2mp': 'أَسْأَمْتُمْ',
      '2fp': 'أَسْأَمْتُنَّ',
      '3mp': 'أَسْأَمُوا',
      '3fp': 'أَسْأَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("s'm-4")!, 'indicative')).toEqualT({
      '1s': 'أُسْئِمُ',
      '2ms': 'تُسْئِمُ',
      '2fs': 'تُسْئِمِينَ',
      '3ms': 'يُسْئِمُ',
      '3fs': 'تُسْئِمُ',
      '2d': 'تُسْئِمَانِ',
      '3md': 'يُسْئِمَانِ',
      '3fd': 'تُسْئِمَانِ',
      '1p': 'نُسْئِمُ',
      '2mp': 'تُسْئِمُونَ',
      '2fp': 'تُسْئِمْنَ',
      '3mp': 'يُسْئِمُونَ',
      '3fp': 'يُسْئِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("s'm-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْئِمَ',
      '2ms': 'تُسْئِمَ',
      '2fs': 'تُسْئِمِي',
      '3ms': 'يُسْئِمَ',
      '3fs': 'تُسْئِمَ',
      '2d': 'تُسْئِمَا',
      '3md': 'يُسْئِمَا',
      '3fd': 'تُسْئِمَا',
      '1p': 'نُسْئِمَ',
      '2mp': 'تُسْئِمُوا',
      '2fp': 'تُسْئِمْنَ',
      '3mp': 'يُسْئِمُوا',
      '3fp': 'يُسْئِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("s'm-4")!, 'jussive')).toEqualT({
      '1s': 'أُسْئِمْ',
      '2ms': 'تُسْئِمْ',
      '2fs': 'تُسْئِمِي',
      '3ms': 'يُسْئِمْ',
      '3fs': 'تُسْئِمْ',
      '2d': 'تُسْئِمَا',
      '3md': 'يُسْئِمَا',
      '3fd': 'تُسْئِمَا',
      '1p': 'نُسْئِمْ',
      '2mp': 'تُسْئِمُوا',
      '2fp': 'تُسْئِمْنَ',
      '3mp': 'يُسْئِمُوا',
      '3fp': 'يُسْئِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("s'm-4")!)).toMatchObjectT({
      '2ms': 'أَسْئِمْ',
      '2fs': 'أَسْئِمِي',
      '2d': 'أَسْئِمَا',
      '2mp': 'أَسْئِمُوا',
      '2fp': 'أَسْئِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("s'm-4")!)).toEqualT({
      '1s': 'أُسْئِمْتُ',
      '2ms': 'أُسْئِمْتَ',
      '2fs': 'أُسْئِمْتِ',
      '3ms': 'أُسْئِمَ',
      '3fs': 'أُسْئِمَتْ',
      '2d': 'أُسْئِمْتُمَا',
      '3md': 'أُسْئِمَا',
      '3fd': 'أُسْئِمَتَا',
      '1p': 'أُسْئِمْنَا',
      '2mp': 'أُسْئِمْتُمْ',
      '2fp': 'أُسْئِمْتُنَّ',
      '3mp': 'أُسْئِمُوا',
      '3fp': 'أُسْئِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("s'm-4")!, 'indicative')).toEqualT({
      '1s': 'أُسْأَمُ',
      '2ms': 'تُسْأَمُ',
      '2fs': 'تُسْأَمِينَ',
      '3ms': 'يُسْأَمُ',
      '3fs': 'تُسْأَمُ',
      '2d': 'تُسْأَمَانِ',
      '3md': 'يُسْأَمَانِ',
      '3fd': 'تُسْأَمَانِ',
      '1p': 'نُسْأَمُ',
      '2mp': 'تُسْأَمُونَ',
      '2fp': 'تُسْأَمْنَ',
      '3mp': 'يُسْأَمُونَ',
      '3fp': 'يُسْأَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("s'm-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْأَمَ',
      '2ms': 'تُسْأَمَ',
      '2fs': 'تُسْأَمِي',
      '3ms': 'يُسْأَمَ',
      '3fs': 'تُسْأَمَ',
      '2d': 'تُسْأَمَا',
      '3md': 'يُسْأَمَا',
      '3fd': 'تُسْأَمَا',
      '1p': 'نُسْأَمَ',
      '2mp': 'تُسْأَمُوا',
      '2fp': 'تُسْأَمْنَ',
      '3mp': 'يُسْأَمُوا',
      '3fp': 'يُسْأَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("s'm-4")!, 'jussive')).toEqualT({
      '1s': 'أُسْأَمْ',
      '2ms': 'تُسْأَمْ',
      '2fs': 'تُسْأَمِي',
      '3ms': 'يُسْأَمْ',
      '3fs': 'تُسْأَمْ',
      '2d': 'تُسْأَمَا',
      '3md': 'يُسْأَمَا',
      '3fd': 'تُسْأَمَا',
      '1p': 'نُسْأَمْ',
      '2mp': 'تُسْأَمُوا',
      '2fp': 'تُسْأَمْنَ',
      '3mp': 'يُسْأَمُوا',
      '3fp': 'يُسْأَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("s'm-4")!)).toEqualT('مُسْئِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("s'm-4")!)).toEqualT('مُسْأَم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("s'm-4")!))).toEqualT(new Set(['إِسْآم']))
  })
})
