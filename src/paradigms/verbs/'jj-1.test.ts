import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'jj-1 (ElixirFM)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'jj-1")!)).toEqualT({
      '1s': 'أَجَجْتُ',
      '2ms': 'أَجَجْتَ',
      '2fs': 'أَجَجْتِ',
      '3ms': 'أَجَّ',
      '3fs': 'أَجَّتْ',
      '2d': 'أَجَجْتُمَا',
      '3md': 'أَجَّا',
      '3fd': 'أَجَّتَا',
      '1p': 'أَجَجْنَا',
      '2mp': 'أَجَجْتُمْ',
      '2fp': 'أَجَجْتُنَّ',
      '3mp': 'أَجُّوا',
      '3fp': 'أَجَجْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'jj-1")!, 'indicative')).toEqualT({
      '1s': 'أَئِجُّ',
      '2ms': 'تَئِجُّ',
      '2fs': 'تَئِجِّينَ',
      '3ms': 'يَئِجُّ',
      '3fs': 'تَئِجُّ',
      '2d': 'تَئِجَّانِ',
      '3md': 'يَئِجَّانِ',
      '3fd': 'تَئِجَّانِ',
      '1p': 'نَئِجُّ',
      '2mp': 'تَئِجُّونَ',
      '2fp': 'تَأْجِجْنَ',
      '3mp': 'يَئِجُّونَ',
      '3fp': 'يَأْجِجْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'jj-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَئِجَّ',
      '2ms': 'تَئِجَّ',
      '2fs': 'تَئِجِّي',
      '3ms': 'يَئِجَّ',
      '3fs': 'تَئِجَّ',
      '2d': 'تَئِجَّا',
      '3md': 'يَئِجَّا',
      '3fd': 'تَئِجَّا',
      '1p': 'نَئِجَّ',
      '2mp': 'تَئِجُّوا',
      '2fp': 'تَأْجِجْنَ',
      '3mp': 'يَئِجُّوا',
      '3fp': 'يَأْجِجْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'jj-1")!, 'jussive')).toEqualT({
      '1s': 'أَئِجَّ',
      '2ms': 'تَئِجَّ',
      '2fs': 'تَئِجِّي',
      '3ms': 'يَئِجَّ',
      '3fs': 'تَئِجَّ',
      '2d': 'تَئِجَّا',
      '3md': 'يَئِجَّا',
      '3fd': 'تَئِجَّا',
      '1p': 'نَئِجَّ',
      '2mp': 'تَئِجُّوا',
      '2fp': 'تَأْجِجْنَ',
      '3mp': 'يَئِجُّوا',
      '3fp': 'يَأْجِجْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'jj-1")!)).toMatchObjectT({
      '2ms': 'إِجَّ',
      '2fs': 'إِجِّي',
      '2d': 'إِجَّا',
      '2mp': 'إِجُّوا',
      '2fp': 'اِيجِجْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'jj-1")!)).toEqualT({
      '1s': 'أُجِجْتُ',
      '2ms': 'أُجِجْتَ',
      '2fs': 'أُجِجْتِ',
      '3ms': 'أُجَّ',
      '3fs': 'أُجَّتْ',
      '2d': 'أُجِجْتُمَا',
      '3md': 'أُجَّا',
      '3fd': 'أُجَّتَا',
      '1p': 'أُجِجْنَا',
      '2mp': 'أُجِجْتُمْ',
      '2fp': 'أُجِجْتُنَّ',
      '3mp': 'أُجُّوا',
      '3fp': 'أُجِجْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jj-1")!, 'indicative')).toEqualT({
      '1s': 'أُؤَجُّ',
      '2ms': 'تُؤَجُّ',
      '2fs': 'تُؤَجِّينَ',
      '3ms': 'يُؤَجُّ',
      '3fs': 'تُؤَجُّ',
      '2d': 'تُؤَجَّانِ',
      '3md': 'يُؤَجَّانِ',
      '3fd': 'تُؤَجَّانِ',
      '1p': 'نُؤَجُّ',
      '2mp': 'تُؤَجُّونَ',
      '2fp': 'تُؤْجَجْنَ',
      '3mp': 'يُؤَجُّونَ',
      '3fp': 'يُؤْجَجْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jj-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَجَّ',
      '2ms': 'تُؤَجَّ',
      '2fs': 'تُؤَجِّي',
      '3ms': 'يُؤَجَّ',
      '3fs': 'تُؤَجَّ',
      '2d': 'تُؤَجَّا',
      '3md': 'يُؤَجَّا',
      '3fd': 'تُؤَجَّا',
      '1p': 'نُؤَجَّ',
      '2mp': 'تُؤَجُّوا',
      '2fp': 'تُؤْجَجْنَ',
      '3mp': 'يُؤَجُّوا',
      '3fp': 'يُؤْجَجْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jj-1")!, 'jussive')).toEqualT({
      '1s': 'أُؤَجَّ',
      '2ms': 'تُؤَجَّ',
      '2fs': 'تُؤَجِّي',
      '3ms': 'يُؤَجَّ',
      '3fs': 'تُؤَجَّ',
      '2d': 'تُؤَجَّا',
      '3md': 'يُؤَجَّا',
      '3fd': 'تُؤَجَّا',
      '1p': 'نُؤَجَّ',
      '2mp': 'تُؤَجُّوا',
      '2fp': 'تُؤْجَجْنَ',
      '3mp': 'يُؤَجُّوا',
      '3fp': 'يُؤْجَجْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'jj-1")!)).toEqualT('آجّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'jj-1")!)).toEqualT('مَأْجُوج')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'jj-1")!))).toEqualT(new Set(['أَجّ']))
  })
})
