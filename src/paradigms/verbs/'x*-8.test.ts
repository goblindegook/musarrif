import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'x*-8 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'x*-8")!)).toEqualT({
      '1s': 'اِتَّخَذْتُ',
      '2ms': 'اِتَّخَذْتَ',
      '2fs': 'اِتَّخَذْتِ',
      '3ms': 'اِتَّخَذَ',
      '3fs': 'اِتَّخَذَتْ',
      '2d': 'اِتَّخَذْتُمَا',
      '3md': 'اِتَّخَذَا',
      '3fd': 'اِتَّخَذَتَا',
      '1p': 'اِتَّخَذْنَا',
      '2mp': 'اِتَّخَذْتُمْ',
      '2fp': 'اِتَّخَذْتُنَّ',
      '3mp': 'اِتَّخَذُوا',
      '3fp': 'اِتَّخَذْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'x*-8")!, 'indicative')).toEqualT({
      '1s': 'أَتَّخِذُ',
      '2ms': 'تَتَّخِذُ',
      '2fs': 'تَتَّخِذِينَ',
      '3ms': 'يَتَّخِذُ',
      '3fs': 'تَتَّخِذُ',
      '2d': 'تَتَّخِذَانِ',
      '3md': 'يَتَّخِذَانِ',
      '3fd': 'تَتَّخِذَانِ',
      '1p': 'نَتَّخِذُ',
      '2mp': 'تَتَّخِذُونَ',
      '2fp': 'تَتَّخِذْنَ',
      '3mp': 'يَتَّخِذُونَ',
      '3fp': 'يَتَّخِذْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'x*-8")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَّخِذَ',
      '2ms': 'تَتَّخِذَ',
      '2fs': 'تَتَّخِذِي',
      '3ms': 'يَتَّخِذَ',
      '3fs': 'تَتَّخِذَ',
      '2d': 'تَتَّخِذَا',
      '3md': 'يَتَّخِذَا',
      '3fd': 'تَتَّخِذَا',
      '1p': 'نَتَّخِذَ',
      '2mp': 'تَتَّخِذُوا',
      '2fp': 'تَتَّخِذْنَ',
      '3mp': 'يَتَّخِذُوا',
      '3fp': 'يَتَّخِذْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'x*-8")!, 'jussive')).toEqualT({
      '1s': 'أَتَّخِذْ',
      '2ms': 'تَتَّخِذْ',
      '2fs': 'تَتَّخِذِي',
      '3ms': 'يَتَّخِذْ',
      '3fs': 'تَتَّخِذْ',
      '2d': 'تَتَّخِذَا',
      '3md': 'يَتَّخِذَا',
      '3fd': 'تَتَّخِذَا',
      '1p': 'نَتَّخِذْ',
      '2mp': 'تَتَّخِذُوا',
      '2fp': 'تَتَّخِذْنَ',
      '3mp': 'يَتَّخِذُوا',
      '3fp': 'يَتَّخِذْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'x*-8")!)).toMatchObjectT({
      '2ms': 'اِتَّخِذْ',
      '2fs': 'اِتَّخِذِي',
      '2d': 'اِتَّخِذَا',
      '2mp': 'اِتَّخِذُوا',
      '2fp': 'اِتَّخِذْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'x*-8")!)).toEqualT({
      '1s': 'اُتُّخِذْتُ',
      '2ms': 'اُتُّخِذْتَ',
      '2fs': 'اُتُّخِذْتِ',
      '3ms': 'اُتُّخِذَ',
      '3fs': 'اُتُّخِذَتْ',
      '2d': 'اُتُّخِذْتُمَا',
      '3md': 'اُتُّخِذَا',
      '3fd': 'اُتُّخِذَتَا',
      '1p': 'اُتُّخِذْنَا',
      '2mp': 'اُتُّخِذْتُمْ',
      '2fp': 'اُتُّخِذْتُنَّ',
      '3mp': 'اُتُّخِذُوا',
      '3fp': 'اُتُّخِذْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'x*-8")!, 'indicative')).toEqualT({
      '1s': 'أُتَّخَذُ',
      '2ms': 'تُتَّخَذُ',
      '2fs': 'تُتَّخَذِينَ',
      '3ms': 'يُتَّخَذُ',
      '3fs': 'تُتَّخَذُ',
      '2d': 'تُتَّخَذَانِ',
      '3md': 'يُتَّخَذَانِ',
      '3fd': 'تُتَّخَذَانِ',
      '1p': 'نُتَّخَذُ',
      '2mp': 'تُتَّخَذُونَ',
      '2fp': 'تُتَّخَذْنَ',
      '3mp': 'يُتَّخَذُونَ',
      '3fp': 'يُتَّخَذْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'x*-8")!, 'subjunctive')).toEqualT({
      '1s': 'أُتَّخَذَ',
      '2ms': 'تُتَّخَذَ',
      '2fs': 'تُتَّخَذِي',
      '3ms': 'يُتَّخَذَ',
      '3fs': 'تُتَّخَذَ',
      '2d': 'تُتَّخَذَا',
      '3md': 'يُتَّخَذَا',
      '3fd': 'تُتَّخَذَا',
      '1p': 'نُتَّخَذَ',
      '2mp': 'تُتَّخَذُوا',
      '2fp': 'تُتَّخَذْنَ',
      '3mp': 'يُتَّخَذُوا',
      '3fp': 'يُتَّخَذْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'x*-8")!, 'jussive')).toEqualT({
      '1s': 'أُتَّخَذْ',
      '2ms': 'تُتَّخَذْ',
      '2fs': 'تُتَّخَذِي',
      '3ms': 'يُتَّخَذْ',
      '3fs': 'تُتَّخَذْ',
      '2d': 'تُتَّخَذَا',
      '3md': 'يُتَّخَذَا',
      '3fd': 'تُتَّخَذَا',
      '1p': 'نُتَّخَذْ',
      '2mp': 'تُتَّخَذُوا',
      '2fp': 'تُتَّخَذْنَ',
      '3mp': 'يُتَّخَذُوا',
      '3fp': 'يُتَّخَذْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'x*-8")!)).toEqualT('مُتَّخِذ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'x*-8")!)).toEqualT('مُتَّخَذ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'x*-8")!))).toEqualT(new Set(['اِتِّخَاذ']))
  })
})
