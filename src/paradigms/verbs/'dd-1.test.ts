import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'dd-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'dd-1")!)).toEqualT({
      '1s': 'أَدَدْتُ',
      '2ms': 'أَدَدْتَ',
      '2fs': 'أَدَدْتِ',
      '3ms': 'أَدَّ',
      '3fs': 'أَدَّتْ',
      '2d': 'أَدَدْتُمَا',
      '3md': 'أَدَّا',
      '3fd': 'أَدَّتَا',
      '1p': 'أَدَدْنَا',
      '2mp': 'أَدَدْتُمْ',
      '2fp': 'أَدَدْتُنَّ',
      '3mp': 'أَدُّوا',
      '3fp': 'أَدَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'dd-1")!, 'indicative')).toEqualT({
      '1s': 'أَئِدُّ',
      '2ms': 'تَئِدُّ',
      '2fs': 'تَئِدِّينَ',
      '3ms': 'يَئِدُّ',
      '3fs': 'تَئِدُّ',
      '2d': 'تَئِدَّانِ',
      '3md': 'يَئِدَّانِ',
      '3fd': 'تَئِدَّانِ',
      '1p': 'نَئِدُّ',
      '2mp': 'تَئِدُّونَ',
      '2fp': 'تَأْدِدْنَ',
      '3mp': 'يَئِدُّونَ',
      '3fp': 'يَأْدِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'dd-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَئِدَّ',
      '2ms': 'تَئِدَّ',
      '2fs': 'تَئِدِّي',
      '3ms': 'يَئِدَّ',
      '3fs': 'تَئِدَّ',
      '2d': 'تَئِدَّا',
      '3md': 'يَئِدَّا',
      '3fd': 'تَئِدَّا',
      '1p': 'نَئِدَّ',
      '2mp': 'تَئِدُّوا',
      '2fp': 'تَأْدِدْنَ',
      '3mp': 'يَئِدُّوا',
      '3fp': 'يَأْدِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'dd-1")!, 'jussive')).toEqualT({
      '1s': 'أَئِدَّ',
      '2ms': 'تَئِدَّ',
      '2fs': 'تَئِدِّي',
      '3ms': 'يَئِدَّ',
      '3fs': 'تَئِدَّ',
      '2d': 'تَئِدَّا',
      '3md': 'يَئِدَّا',
      '3fd': 'تَئِدَّا',
      '1p': 'نَئِدَّ',
      '2mp': 'تَئِدُّوا',
      '2fp': 'تَأْدِدْنَ',
      '3mp': 'يَئِدُّوا',
      '3fp': 'يَأْدِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'dd-1")!)).toMatchObjectT({
      '2ms': 'إِدَّ',
      '2fs': 'إِدِّي',
      '2d': 'إِدَّا',
      '2mp': 'إِدُّوا',
      '2fp': 'اِيدِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'dd-1")!)).toEqualT({
      '1s': 'أُدِدْتُ',
      '2ms': 'أُدِدْتَ',
      '2fs': 'أُدِدْتِ',
      '3ms': 'أُدَّ',
      '3fs': 'أُدَّتْ',
      '2d': 'أُدِدْتُمَا',
      '3md': 'أُدَّا',
      '3fd': 'أُدَّتَا',
      '1p': 'أُدِدْنَا',
      '2mp': 'أُدِدْتُمْ',
      '2fp': 'أُدِدْتُنَّ',
      '3mp': 'أُدُّوا',
      '3fp': 'أُدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'dd-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَدُّ',
      '2ms': 'تُؤَدُّ',
      '2fs': 'تُؤَدِّينَ',
      '3ms': 'يُؤَدُّ',
      '3fs': 'تُؤَدُّ',
      '2d': 'تُؤَدَّانِ',
      '3md': 'يُؤَدَّانِ',
      '3fd': 'تُؤَدَّانِ',
      '1p': 'نُؤَدُّ',
      '2mp': 'تُؤَدُّونَ',
      '2fp': 'تُؤْدَدْنَ',
      '3mp': 'يُؤَدُّونَ',
      '3fp': 'يُؤْدَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'dd-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَدَّ',
      '2ms': 'تُؤَدَّ',
      '2fs': 'تُؤَدِّي',
      '3ms': 'يُؤَدَّ',
      '3fs': 'تُؤَدَّ',
      '2d': 'تُؤَدَّا',
      '3md': 'يُؤَدَّا',
      '3fd': 'تُؤَدَّا',
      '1p': 'نُؤَدَّ',
      '2mp': 'تُؤَدُّوا',
      '2fp': 'تُؤْدَدْنَ',
      '3mp': 'يُؤَدُّوا',
      '3fp': 'يُؤْدَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'dd-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَدَّ',
      '2ms': 'تُؤَدَّ',
      '2fs': 'تُؤَدِّي',
      '3ms': 'يُؤَدَّ',
      '3fs': 'تُؤَدَّ',
      '2d': 'تُؤَدَّا',
      '3md': 'يُؤَدَّا',
      '3fd': 'تُؤَدَّا',
      '1p': 'نُؤَدَّ',
      '2mp': 'تُؤَدُّوا',
      '2fp': 'تُؤْدَدْنَ',
      '3mp': 'يُؤَدُّوا',
      '3fp': 'يُؤْدَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'dd-1")!)).toEqualT('آدّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'dd-1")!)).toEqualT('مَأْدُود')
  })
})
