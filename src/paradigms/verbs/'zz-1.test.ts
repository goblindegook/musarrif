import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'zz-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'zz-1")!)).toEqualT({
      '1s': 'أَزَزْتُ',
      '2ms': 'أَزَزْتَ',
      '2fs': 'أَزَزْتِ',
      '3ms': 'أَزَّ',
      '3fs': 'أَزَّتْ',
      '2d': 'أَزَزْتُمَا',
      '3md': 'أَزَّا',
      '3fd': 'أَزَّتَا',
      '1p': 'أَزَزْنَا',
      '2mp': 'أَزَزْتُمْ',
      '2fp': 'أَزَزْتُنَّ',
      '3mp': 'أَزُّوا',
      '3fp': 'أَزَزْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'zz-1")!, 'indicative')).toEqualT({
      '1s': 'أَؤُزُّ',
      '2ms': 'تَؤُزُّ',
      '2fs': 'تَؤُزِّينَ',
      '3ms': 'يَؤُزُّ',
      '3fs': 'تَؤُزُّ',
      '2d': 'تَؤُزَّانِ',
      '3md': 'يَؤُزَّانِ',
      '3fd': 'تَؤُزَّانِ',
      '1p': 'نَؤُزُّ',
      '2mp': 'تَؤُزُّونَ',
      '2fp': 'تَأْزُزْنَ',
      '3mp': 'يَؤُزُّونَ',
      '3fp': 'يَأْزُزْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'zz-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَؤُزَّ',
      '2ms': 'تَؤُزَّ',
      '2fs': 'تَؤُزِّي',
      '3ms': 'يَؤُزَّ',
      '3fs': 'تَؤُزَّ',
      '2d': 'تَؤُزَّا',
      '3md': 'يَؤُزَّا',
      '3fd': 'تَؤُزَّا',
      '1p': 'نَؤُزَّ',
      '2mp': 'تَؤُزُّوا',
      '2fp': 'تَأْزُزْنَ',
      '3mp': 'يَؤُزُّوا',
      '3fp': 'يَأْزُزْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'zz-1")!, 'jussive')).toEqualT({
      '1s': 'أَؤُزَّ',
      '2ms': 'تَؤُزَّ',
      '2fs': 'تَؤُزِّي',
      '3ms': 'يَؤُزَّ',
      '3fs': 'تَؤُزَّ',
      '2d': 'تَؤُزَّا',
      '3md': 'يَؤُزَّا',
      '3fd': 'تَؤُزَّا',
      '1p': 'نَؤُزَّ',
      '2mp': 'تَؤُزُّوا',
      '2fp': 'تَأْزُزْنَ',
      '3mp': 'يَؤُزُّوا',
      '3fp': 'يَأْزُزْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'zz-1")!)).toMatchObjectT({
      '2ms': 'أُزَّ',
      '2fs': 'أُزِّي',
      '2d': 'أُزَّا',
      '2mp': 'أُزُّوا',
      '2fp': 'اُوزُزْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'zz-1")!)).toEqualT({
      '1s': 'أُزِزْتُ',
      '2ms': 'أُزِزْتَ',
      '2fs': 'أُزِزْتِ',
      '3ms': 'أُزَّ',
      '3fs': 'أُزَّتْ',
      '2d': 'أُزِزْتُمَا',
      '3md': 'أُزَّا',
      '3fd': 'أُزَّتَا',
      '1p': 'أُزِزْنَا',
      '2mp': 'أُزِزْتُمْ',
      '2fp': 'أُزِزْتُنَّ',
      '3mp': 'أُزُّوا',
      '3fp': 'أُزِزْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'zz-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَزُّ',
      '2ms': 'تُؤَزُّ',
      '2fs': 'تُؤَزِّينَ',
      '3ms': 'يُؤَزُّ',
      '3fs': 'تُؤَزُّ',
      '2d': 'تُؤَزَّانِ',
      '3md': 'يُؤَزَّانِ',
      '3fd': 'تُؤَزَّانِ',
      '1p': 'نُؤَزُّ',
      '2mp': 'تُؤَزُّونَ',
      '2fp': 'تُؤْزَزْنَ',
      '3mp': 'يُؤَزُّونَ',
      '3fp': 'يُؤْزَزْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'zz-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَزَّ',
      '2ms': 'تُؤَزَّ',
      '2fs': 'تُؤَزِّي',
      '3ms': 'يُؤَزَّ',
      '3fs': 'تُؤَزَّ',
      '2d': 'تُؤَزَّا',
      '3md': 'يُؤَزَّا',
      '3fd': 'تُؤَزَّا',
      '1p': 'نُؤَزَّ',
      '2mp': 'تُؤَزُّوا',
      '2fp': 'تُؤْزَزْنَ',
      '3mp': 'يُؤَزُّوا',
      '3fp': 'يُؤْزَزْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'zz-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَزَّ',
      '2ms': 'تُؤَزَّ',
      '2fs': 'تُؤَزِّي',
      '3ms': 'يُؤَزَّ',
      '3fs': 'تُؤَزَّ',
      '2d': 'تُؤَزَّا',
      '3md': 'يُؤَزَّا',
      '3fd': 'تُؤَزَّا',
      '1p': 'نُؤَزَّ',
      '2mp': 'تُؤَزُّوا',
      '2fp': 'تُؤْزَزْنَ',
      '3mp': 'يُؤَزُّوا',
      '3fp': 'يُؤْزَزْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'zz-1")!)).toEqualT('آزّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'zz-1")!)).toEqualT('مَأْزُوز')
  })
})
