import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'mm-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'mm-1")!)).toEqualT({
      '1s': 'أَمَمْتُ',
      '2ms': 'أَمَمْتَ',
      '2fs': 'أَمَمْتِ',
      '3ms': 'أَمَّ',
      '3fs': 'أَمَّتْ',
      '2d': 'أَمَمْتُمَا',
      '3md': 'أَمَّا',
      '3fd': 'أَمَّتَا',
      '1p': 'أَمَمْنَا',
      '2mp': 'أَمَمْتُمْ',
      '2fp': 'أَمَمْتُنَّ',
      '3mp': 'أَمُّوا',
      '3fp': 'أَمَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'mm-1")!, 'indicative')).toEqualT({
      '1s': 'أَؤُمُّ',
      '2ms': 'تَؤُمُّ',
      '2fs': 'تَؤُمِّينَ',
      '3ms': 'يَؤُمُّ',
      '3fs': 'تَؤُمُّ',
      '2d': 'تَؤُمَّانِ',
      '3md': 'يَؤُمَّانِ',
      '3fd': 'تَؤُمَّانِ',
      '1p': 'نَؤُمُّ',
      '2mp': 'تَؤُمُّونَ',
      '2fp': 'تَأْمُمْنَ',
      '3mp': 'يَؤُمُّونَ',
      '3fp': 'يَأْمُمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'mm-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَؤُمَّ',
      '2ms': 'تَؤُمَّ',
      '2fs': 'تَؤُمِّي',
      '3ms': 'يَؤُمَّ',
      '3fs': 'تَؤُمَّ',
      '2d': 'تَؤُمَّا',
      '3md': 'يَؤُمَّا',
      '3fd': 'تَؤُمَّا',
      '1p': 'نَؤُمَّ',
      '2mp': 'تَؤُمُّوا',
      '2fp': 'تَأْمُمْنَ',
      '3mp': 'يَؤُمُّوا',
      '3fp': 'يَأْمُمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'mm-1")!, 'jussive')).toEqualT({
      '1s': 'أَؤُمَّ',
      '2ms': 'تَؤُمَّ',
      '2fs': 'تَؤُمِّي',
      '3ms': 'يَؤُمَّ',
      '3fs': 'تَؤُمَّ',
      '2d': 'تَؤُمَّا',
      '3md': 'يَؤُمَّا',
      '3fd': 'تَؤُمَّا',
      '1p': 'نَؤُمَّ',
      '2mp': 'تَؤُمُّوا',
      '2fp': 'تَأْمُمْنَ',
      '3mp': 'يَؤُمُّوا',
      '3fp': 'يَأْمُمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'mm-1")!)).toMatchObjectT({
      '2ms': 'أُمَّ',
      '2fs': 'أُمِّي',
      '2d': 'أُمَّا',
      '2mp': 'أُمُّوا',
      '2fp': 'اُومُمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'mm-1")!)).toEqualT({
      '1s': 'أُمِمْتُ',
      '2ms': 'أُمِمْتَ',
      '2fs': 'أُمِمْتِ',
      '3ms': 'أُمَّ',
      '3fs': 'أُمَّتْ',
      '2d': 'أُمِمْتُمَا',
      '3md': 'أُمَّا',
      '3fd': 'أُمَّتَا',
      '1p': 'أُمِمْنَا',
      '2mp': 'أُمِمْتُمْ',
      '2fp': 'أُمِمْتُنَّ',
      '3mp': 'أُمُّوا',
      '3fp': 'أُمِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَمُّ',
      '2ms': 'تُؤَمُّ',
      '2fs': 'تُؤَمِّينَ',
      '3ms': 'يُؤَمُّ',
      '3fs': 'تُؤَمُّ',
      '2d': 'تُؤَمَّانِ',
      '3md': 'يُؤَمَّانِ',
      '3fd': 'تُؤَمَّانِ',
      '1p': 'نُؤَمُّ',
      '2mp': 'تُؤَمُّونَ',
      '2fp': 'تُؤْمَمْنَ',
      '3mp': 'يُؤَمُّونَ',
      '3fp': 'يُؤْمَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَمَّ',
      '2ms': 'تُؤَمَّ',
      '2fs': 'تُؤَمِّي',
      '3ms': 'يُؤَمَّ',
      '3fs': 'تُؤَمَّ',
      '2d': 'تُؤَمَّا',
      '3md': 'يُؤَمَّا',
      '3fd': 'تُؤَمَّا',
      '1p': 'نُؤَمَّ',
      '2mp': 'تُؤَمُّوا',
      '2fp': 'تُؤْمَمْنَ',
      '3mp': 'يُؤَمُّوا',
      '3fp': 'يُؤْمَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mm-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَمَّ',
      '2ms': 'تُؤَمَّ',
      '2fs': 'تُؤَمِّي',
      '3ms': 'يُؤَمَّ',
      '3fs': 'تُؤَمَّ',
      '2d': 'تُؤَمَّا',
      '3md': 'يُؤَمَّا',
      '3fd': 'تُؤَمَّا',
      '1p': 'نُؤَمَّ',
      '2mp': 'تُؤَمُّوا',
      '2fp': 'تُؤْمَمْنَ',
      '3mp': 'يُؤَمُّوا',
      '3fp': 'يُؤْمَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'mm-1")!)).toEqualT('آمّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'mm-1")!)).toEqualT('مَأْمُوم')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'mm-1")!)).toEqualT(['أَمّ'])
  })
})
