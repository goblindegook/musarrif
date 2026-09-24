import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("fy'-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("fy'-2")!)).toEqualT({
      '1s': 'فَيَّأْتُ',
      '2ms': 'فَيَّأْتَ',
      '2fs': 'فَيَّأْتِ',
      '3ms': 'فَيَّأَ',
      '3fs': 'فَيَّأَتْ',
      '2d': 'فَيَّأْتُمَا',
      '3md': 'فَيَّآ',
      '3fd': 'فَيَّأَتَا',
      '1p': 'فَيَّأْنَا',
      '2mp': 'فَيَّأْتُمْ',
      '2fp': 'فَيَّأْتُنَّ',
      '3mp': 'فَيَّؤُوا',
      '3fp': 'فَيَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("fy'-2")!, 'indicative')).toEqualT({
      '1s': 'أُفَيِّئُ',
      '2ms': 'تُفَيِّئُ',
      '2fs': 'تُفَيِّئِينَ',
      '3ms': 'يُفَيِّئُ',
      '3fs': 'تُفَيِّئُ',
      '2d': 'تُفَيِّئَانِ',
      '3md': 'يُفَيِّئَانِ',
      '3fd': 'تُفَيِّئَانِ',
      '1p': 'نُفَيِّئُ',
      '2mp': 'تُفَيِّئُونَ',
      '2fp': 'تُفَيِّئْنَ',
      '3mp': 'يُفَيِّئُونَ',
      '3fp': 'يُفَيِّئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("fy'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُفَيِّئَ',
      '2ms': 'تُفَيِّئَ',
      '2fs': 'تُفَيِّئِي',
      '3ms': 'يُفَيِّئَ',
      '3fs': 'تُفَيِّئَ',
      '2d': 'تُفَيِّئَا',
      '3md': 'يُفَيِّئَا',
      '3fd': 'تُفَيِّئَا',
      '1p': 'نُفَيِّئَ',
      '2mp': 'تُفَيِّئُوا',
      '2fp': 'تُفَيِّئْنَ',
      '3mp': 'يُفَيِّئُوا',
      '3fp': 'يُفَيِّئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("fy'-2")!, 'jussive')).toEqualT({
      '1s': 'أُفَيِّئْ',
      '2ms': 'تُفَيِّئْ',
      '2fs': 'تُفَيِّئِي',
      '3ms': 'يُفَيِّئْ',
      '3fs': 'تُفَيِّئْ',
      '2d': 'تُفَيِّئَا',
      '3md': 'يُفَيِّئَا',
      '3fd': 'تُفَيِّئَا',
      '1p': 'نُفَيِّئْ',
      '2mp': 'تُفَيِّئُوا',
      '2fp': 'تُفَيِّئْنَ',
      '3mp': 'يُفَيِّئُوا',
      '3fp': 'يُفَيِّئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("fy'-2")!)).toMatchObjectT({
      '2ms': 'فَيِّئْ',
      '2fs': 'فَيِّئِي',
      '2d': 'فَيِّئَا',
      '2mp': 'فَيِّئُوا',
      '2fp': 'فَيِّئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("fy'-2")!)).toEqualT({
      '1s': 'فُيِّئْتُ',
      '2ms': 'فُيِّئْتَ',
      '2fs': 'فُيِّئْتِ',
      '3ms': 'فُيِّئَ',
      '3fs': 'فُيِّئَتْ',
      '2d': 'فُيِّئْتُمَا',
      '3md': 'فُيِّئَا',
      '3fd': 'فُيِّئَتَا',
      '1p': 'فُيِّئْنَا',
      '2mp': 'فُيِّئْتُمْ',
      '2fp': 'فُيِّئْتُنَّ',
      '3mp': 'فُيِّئُوا',
      '3fp': 'فُيِّئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("fy'-2")!, 'indicative')).toEqualT({
      '1s': 'أُفَيَّأُ',
      '2ms': 'تُفَيَّأُ',
      '2fs': 'تُفَيَّئِينَ',
      '3ms': 'يُفَيَّأُ',
      '3fs': 'تُفَيَّأُ',
      '2d': 'تُفَيَّآنِ',
      '3md': 'يُفَيَّآنِ',
      '3fd': 'تُفَيَّآنِ',
      '1p': 'نُفَيَّأُ',
      '2mp': 'تُفَيَّؤُونَ',
      '2fp': 'تُفَيَّأْنَ',
      '3mp': 'يُفَيَّؤُونَ',
      '3fp': 'يُفَيَّأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("fy'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُفَيَّأَ',
      '2ms': 'تُفَيَّأَ',
      '2fs': 'تُفَيَّئِي',
      '3ms': 'يُفَيَّأَ',
      '3fs': 'تُفَيَّأَ',
      '2d': 'تُفَيَّآ',
      '3md': 'يُفَيَّآ',
      '3fd': 'تُفَيَّآ',
      '1p': 'نُفَيَّأَ',
      '2mp': 'تُفَيَّؤُوا',
      '2fp': 'تُفَيَّأْنَ',
      '3mp': 'يُفَيَّؤُوا',
      '3fp': 'يُفَيَّأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("fy'-2")!, 'jussive')).toEqualT({
      '1s': 'أُفَيَّأْ',
      '2ms': 'تُفَيَّأْ',
      '2fs': 'تُفَيَّئِي',
      '3ms': 'يُفَيَّأْ',
      '3fs': 'تُفَيَّأْ',
      '2d': 'تُفَيَّآ',
      '3md': 'يُفَيَّآ',
      '3fd': 'تُفَيَّآ',
      '1p': 'نُفَيَّأْ',
      '2mp': 'تُفَيَّؤُوا',
      '2fp': 'تُفَيَّأْنَ',
      '3mp': 'يُفَيَّؤُوا',
      '3fp': 'يُفَيَّأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("fy'-2")!)).toEqualT('مُفَيِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("fy'-2")!)).toEqualT('مُفَيَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("fy'-2")!))).toEqualT(new Set(['تَفْيِيء']))
  })
})
