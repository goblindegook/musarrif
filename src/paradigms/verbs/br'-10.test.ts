import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("br'-10 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("br'-10")!)).toEqualT({
      '1s': 'اِسْتَبْرَأْتُ',
      '2ms': 'اِسْتَبْرَأْتَ',
      '2fs': 'اِسْتَبْرَأْتِ',
      '3ms': 'اِسْتَبْرَأَ',
      '3fs': 'اِسْتَبْرَأَتْ',
      '2d': 'اِسْتَبْرَأْتُمَا',
      '3md': 'اِسْتَبْرَآ',
      '3fd': 'اِسْتَبْرَأَتَا',
      '1p': 'اِسْتَبْرَأْنَا',
      '2mp': 'اِسْتَبْرَأْتُمْ',
      '2fp': 'اِسْتَبْرَأْتُنَّ',
      '3mp': 'اِسْتَبْرَؤُوا',
      '3fp': 'اِسْتَبْرَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("br'-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَبْرِئُ',
      '2ms': 'تَسْتَبْرِئُ',
      '2fs': 'تَسْتَبْرِئِينَ',
      '3ms': 'يَسْتَبْرِئُ',
      '3fs': 'تَسْتَبْرِئُ',
      '2d': 'تَسْتَبْرِئَانِ',
      '3md': 'يَسْتَبْرِئَانِ',
      '3fd': 'تَسْتَبْرِئَانِ',
      '1p': 'نَسْتَبْرِئُ',
      '2mp': 'تَسْتَبْرِئُونَ',
      '2fp': 'تَسْتَبْرِئْنَ',
      '3mp': 'يَسْتَبْرِئُونَ',
      '3fp': 'يَسْتَبْرِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("br'-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَبْرِئَ',
      '2ms': 'تَسْتَبْرِئَ',
      '2fs': 'تَسْتَبْرِئِي',
      '3ms': 'يَسْتَبْرِئَ',
      '3fs': 'تَسْتَبْرِئَ',
      '2d': 'تَسْتَبْرِئَا',
      '3md': 'يَسْتَبْرِئَا',
      '3fd': 'تَسْتَبْرِئَا',
      '1p': 'نَسْتَبْرِئَ',
      '2mp': 'تَسْتَبْرِئُوا',
      '2fp': 'تَسْتَبْرِئْنَ',
      '3mp': 'يَسْتَبْرِئُوا',
      '3fp': 'يَسْتَبْرِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("br'-10")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَبْرِئْ',
      '2ms': 'تَسْتَبْرِئْ',
      '2fs': 'تَسْتَبْرِئِي',
      '3ms': 'يَسْتَبْرِئْ',
      '3fs': 'تَسْتَبْرِئْ',
      '2d': 'تَسْتَبْرِئَا',
      '3md': 'يَسْتَبْرِئَا',
      '3fd': 'تَسْتَبْرِئَا',
      '1p': 'نَسْتَبْرِئْ',
      '2mp': 'تَسْتَبْرِئُوا',
      '2fp': 'تَسْتَبْرِئْنَ',
      '3mp': 'يَسْتَبْرِئُوا',
      '3fp': 'يَسْتَبْرِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("br'-10")!)).toMatchObjectT({
      '2ms': 'اِسْتَبْرِئْ',
      '2fs': 'اِسْتَبْرِئِي',
      '2d': 'اِسْتَبْرِئَا',
      '2mp': 'اِسْتَبْرِئُوا',
      '2fp': 'اِسْتَبْرِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("br'-10")!)).toEqualT({
      '1s': 'اُسْتُبْرِئْتُ',
      '2ms': 'اُسْتُبْرِئْتَ',
      '2fs': 'اُسْتُبْرِئْتِ',
      '3ms': 'اُسْتُبْرِئَ',
      '3fs': 'اُسْتُبْرِئَتْ',
      '2d': 'اُسْتُبْرِئْتُمَا',
      '3md': 'اُسْتُبْرِئَا',
      '3fd': 'اُسْتُبْرِئَتَا',
      '1p': 'اُسْتُبْرِئْنَا',
      '2mp': 'اُسْتُبْرِئْتُمْ',
      '2fp': 'اُسْتُبْرِئْتُنَّ',
      '3mp': 'اُسْتُبْرِئُوا',
      '3fp': 'اُسْتُبْرِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("br'-10")!, 'indicative')).toEqualT({
      '1s': 'أُسْتَبْرَأُ',
      '2ms': 'تُسْتَبْرَأُ',
      '2fs': 'تُسْتَبْرَئِينَ',
      '3ms': 'يُسْتَبْرَأُ',
      '3fs': 'تُسْتَبْرَأُ',
      '2d': 'تُسْتَبْرَآنِ',
      '3md': 'يُسْتَبْرَآنِ',
      '3fd': 'تُسْتَبْرَآنِ',
      '1p': 'نُسْتَبْرَأُ',
      '2mp': 'تُسْتَبْرَؤُونَ',
      '2fp': 'تُسْتَبْرَأْنَ',
      '3mp': 'يُسْتَبْرَؤُونَ',
      '3fp': 'يُسْتَبْرَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("br'-10")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَبْرَأَ',
      '2ms': 'تُسْتَبْرَأَ',
      '2fs': 'تُسْتَبْرَئِي',
      '3ms': 'يُسْتَبْرَأَ',
      '3fs': 'تُسْتَبْرَأَ',
      '2d': 'تُسْتَبْرَآ',
      '3md': 'يُسْتَبْرَآ',
      '3fd': 'تُسْتَبْرَآ',
      '1p': 'نُسْتَبْرَأَ',
      '2mp': 'تُسْتَبْرَؤُوا',
      '2fp': 'تُسْتَبْرَأْنَ',
      '3mp': 'يُسْتَبْرَؤُوا',
      '3fp': 'يُسْتَبْرَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("br'-10")!, 'jussive')).toEqualT({
      '1s': 'أُسْتَبْرَأْ',
      '2ms': 'تُسْتَبْرَأْ',
      '2fs': 'تُسْتَبْرَئِي',
      '3ms': 'يُسْتَبْرَأْ',
      '3fs': 'تُسْتَبْرَأْ',
      '2d': 'تُسْتَبْرَآ',
      '3md': 'يُسْتَبْرَآ',
      '3fd': 'تُسْتَبْرَآ',
      '1p': 'نُسْتَبْرَأْ',
      '2mp': 'تُسْتَبْرَؤُوا',
      '2fp': 'تُسْتَبْرَأْنَ',
      '3mp': 'يُسْتَبْرَؤُوا',
      '3fp': 'يُسْتَبْرَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("br'-10")!)).toEqualT('مُسْتَبْرِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("br'-10")!)).toEqualT('مُسْتَبْرَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("br'-10")!))).toEqualT(new Set(['اِسْتِبْرَاء']))
  })
})
