import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'yD-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'yD-2")!)).toEqualT({
      '1s': 'أَيَّضْتُ',
      '2ms': 'أَيَّضْتَ',
      '2fs': 'أَيَّضْتِ',
      '3ms': 'أَيَّضَ',
      '3fs': 'أَيَّضَتْ',
      '2d': 'أَيَّضْتُمَا',
      '3md': 'أَيَّضَا',
      '3fd': 'أَيَّضَتَا',
      '1p': 'أَيَّضْنَا',
      '2mp': 'أَيَّضْتُمْ',
      '2fp': 'أَيَّضْتُنَّ',
      '3mp': 'أَيَّضُوا',
      '3fp': 'أَيَّضْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'yD-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَيِّضُ',
      '2ms': 'تُؤَيِّضُ',
      '2fs': 'تُؤَيِّضِينَ',
      '3ms': 'يُؤَيِّضُ',
      '3fs': 'تُؤَيِّضُ',
      '2d': 'تُؤَيِّضَانِ',
      '3md': 'يُؤَيِّضَانِ',
      '3fd': 'تُؤَيِّضَانِ',
      '1p': 'نُؤَيِّضُ',
      '2mp': 'تُؤَيِّضُونَ',
      '2fp': 'تُؤَيِّضْنَ',
      '3mp': 'يُؤَيِّضُونَ',
      '3fp': 'يُؤَيِّضْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'yD-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَيِّضَ',
      '2ms': 'تُؤَيِّضَ',
      '2fs': 'تُؤَيِّضِي',
      '3ms': 'يُؤَيِّضَ',
      '3fs': 'تُؤَيِّضَ',
      '2d': 'تُؤَيِّضَا',
      '3md': 'يُؤَيِّضَا',
      '3fd': 'تُؤَيِّضَا',
      '1p': 'نُؤَيِّضَ',
      '2mp': 'تُؤَيِّضُوا',
      '2fp': 'تُؤَيِّضْنَ',
      '3mp': 'يُؤَيِّضُوا',
      '3fp': 'يُؤَيِّضْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'yD-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَيِّضْ',
      '2ms': 'تُؤَيِّضْ',
      '2fs': 'تُؤَيِّضِي',
      '3ms': 'يُؤَيِّضْ',
      '3fs': 'تُؤَيِّضْ',
      '2d': 'تُؤَيِّضَا',
      '3md': 'يُؤَيِّضَا',
      '3fd': 'تُؤَيِّضَا',
      '1p': 'نُؤَيِّضْ',
      '2mp': 'تُؤَيِّضُوا',
      '2fp': 'تُؤَيِّضْنَ',
      '3mp': 'يُؤَيِّضُوا',
      '3fp': 'يُؤَيِّضْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'yD-2")!)).toMatchObjectT({
      '2ms': 'أَيِّضْ',
      '2fs': 'أَيِّضِي',
      '2d': 'أَيِّضَا',
      '2mp': 'أَيِّضُوا',
      '2fp': 'أَيِّضْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'yD-2")!)).toEqualT({
      '1s': 'أُيِّضْتُ',
      '2ms': 'أُيِّضْتَ',
      '2fs': 'أُيِّضْتِ',
      '3ms': 'أُيِّضَ',
      '3fs': 'أُيِّضَتْ',
      '2d': 'أُيِّضْتُمَا',
      '3md': 'أُيِّضَا',
      '3fd': 'أُيِّضَتَا',
      '1p': 'أُيِّضْنَا',
      '2mp': 'أُيِّضْتُمْ',
      '2fp': 'أُيِّضْتُنَّ',
      '3mp': 'أُيِّضُوا',
      '3fp': 'أُيِّضْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'yD-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَيَّضُ',
      '2ms': 'تُؤَيَّضُ',
      '2fs': 'تُؤَيَّضِينَ',
      '3ms': 'يُؤَيَّضُ',
      '3fs': 'تُؤَيَّضُ',
      '2d': 'تُؤَيَّضَانِ',
      '3md': 'يُؤَيَّضَانِ',
      '3fd': 'تُؤَيَّضَانِ',
      '1p': 'نُؤَيَّضُ',
      '2mp': 'تُؤَيَّضُونَ',
      '2fp': 'تُؤَيَّضْنَ',
      '3mp': 'يُؤَيَّضُونَ',
      '3fp': 'يُؤَيَّضْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'yD-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَيَّضَ',
      '2ms': 'تُؤَيَّضَ',
      '2fs': 'تُؤَيَّضِي',
      '3ms': 'يُؤَيَّضَ',
      '3fs': 'تُؤَيَّضَ',
      '2d': 'تُؤَيَّضَا',
      '3md': 'يُؤَيَّضَا',
      '3fd': 'تُؤَيَّضَا',
      '1p': 'نُؤَيَّضَ',
      '2mp': 'تُؤَيَّضُوا',
      '2fp': 'تُؤَيَّضْنَ',
      '3mp': 'يُؤَيَّضُوا',
      '3fp': 'يُؤَيَّضْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'yD-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَيَّضْ',
      '2ms': 'تُؤَيَّضْ',
      '2fs': 'تُؤَيَّضِي',
      '3ms': 'يُؤَيَّضْ',
      '3fs': 'تُؤَيَّضْ',
      '2d': 'تُؤَيَّضَا',
      '3md': 'يُؤَيَّضَا',
      '3fd': 'تُؤَيَّضَا',
      '1p': 'نُؤَيَّضْ',
      '2mp': 'تُؤَيَّضُوا',
      '2fp': 'تُؤَيَّضْنَ',
      '3mp': 'يُؤَيَّضُوا',
      '3fp': 'يُؤَيَّضْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'yD-2")!)).toEqualT('مُؤَيِّض')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'yD-2")!)).toEqualT('مُؤَيَّض')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'yD-2")!))).toEqualT(new Set(['تَأْيِيض']))
  })
})
