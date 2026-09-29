import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("$n'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("$n'-1")!)).toEqualT({
      '1s': 'شَنَأْتُ',
      '2ms': 'شَنَأْتَ',
      '2fs': 'شَنَأْتِ',
      '3ms': 'شَنَأَ',
      '3fs': 'شَنَأَتْ',
      '2d': 'شَنَأْتُمَا',
      '3md': 'شَنَآ',
      '3fd': 'شَنَأَتَا',
      '1p': 'شَنَأْنَا',
      '2mp': 'شَنَأْتُمْ',
      '2fp': 'شَنَأْتُنَّ',
      '3mp': 'شَنَؤُوا',
      '3fp': 'شَنَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("$n'-1")!, 'indicative')).toEqualT({
      '1s': 'أَشْنَأُ',
      '2ms': 'تَشْنَأُ',
      '2fs': 'تَشْنَئِينَ',
      '3ms': 'يَشْنَأُ',
      '3fs': 'تَشْنَأُ',
      '2d': 'تَشْنَآنِ',
      '3md': 'يَشْنَآنِ',
      '3fd': 'تَشْنَآنِ',
      '1p': 'نَشْنَأُ',
      '2mp': 'تَشْنَؤُونَ',
      '2fp': 'تَشْنَأْنَ',
      '3mp': 'يَشْنَؤُونَ',
      '3fp': 'يَشْنَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("$n'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَشْنَأَ',
      '2ms': 'تَشْنَأَ',
      '2fs': 'تَشْنَئِي',
      '3ms': 'يَشْنَأَ',
      '3fs': 'تَشْنَأَ',
      '2d': 'تَشْنَآ',
      '3md': 'يَشْنَآ',
      '3fd': 'تَشْنَآ',
      '1p': 'نَشْنَأَ',
      '2mp': 'تَشْنَؤُوا',
      '2fp': 'تَشْنَأْنَ',
      '3mp': 'يَشْنَؤُوا',
      '3fp': 'يَشْنَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("$n'-1")!, 'jussive')).toEqualT({
      '1s': 'أَشْنَأْ',
      '2ms': 'تَشْنَأْ',
      '2fs': 'تَشْنَئِي',
      '3ms': 'يَشْنَأْ',
      '3fs': 'تَشْنَأْ',
      '2d': 'تَشْنَآ',
      '3md': 'يَشْنَآ',
      '3fd': 'تَشْنَآ',
      '1p': 'نَشْنَأْ',
      '2mp': 'تَشْنَؤُوا',
      '2fp': 'تَشْنَأْنَ',
      '3mp': 'يَشْنَؤُوا',
      '3fp': 'يَشْنَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("$n'-1")!)).toMatchObjectT({
      '2ms': 'اِشْنَأْ',
      '2fs': 'اِشْنَئِي',
      '2d': 'اِشْنَآ',
      '2mp': 'اِشْنَؤُوا',
      '2fp': 'اِشْنَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("$n'-1")!)).toEqualT({
      '1s': 'شُنِئْتُ',
      '2ms': 'شُنِئْتَ',
      '2fs': 'شُنِئْتِ',
      '3ms': 'شُنِئَ',
      '3fs': 'شُنِئَتْ',
      '2d': 'شُنِئْتُمَا',
      '3md': 'شُنِئَا',
      '3fd': 'شُنِئَتَا',
      '1p': 'شُنِئْنَا',
      '2mp': 'شُنِئْتُمْ',
      '2fp': 'شُنِئْتُنَّ',
      '3mp': 'شُنِئُوا',
      '3fp': 'شُنِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("$n'-1")!, 'indicative')).toEqualT({
      '1s': 'أُشْنَأُ',
      '2ms': 'تُشْنَأُ',
      '2fs': 'تُشْنَئِينَ',
      '3ms': 'يُشْنَأُ',
      '3fs': 'تُشْنَأُ',
      '2d': 'تُشْنَآنِ',
      '3md': 'يُشْنَآنِ',
      '3fd': 'تُشْنَآنِ',
      '1p': 'نُشْنَأُ',
      '2mp': 'تُشْنَؤُونَ',
      '2fp': 'تُشْنَأْنَ',
      '3mp': 'يُشْنَؤُونَ',
      '3fp': 'يُشْنَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$n'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُشْنَأَ',
      '2ms': 'تُشْنَأَ',
      '2fs': 'تُشْنَئِي',
      '3ms': 'يُشْنَأَ',
      '3fs': 'تُشْنَأَ',
      '2d': 'تُشْنَآ',
      '3md': 'يُشْنَآ',
      '3fd': 'تُشْنَآ',
      '1p': 'نُشْنَأَ',
      '2mp': 'تُشْنَؤُوا',
      '2fp': 'تُشْنَأْنَ',
      '3mp': 'يُشْنَؤُوا',
      '3fp': 'يُشْنَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("$n'-1")!, 'jussive')).toEqualT({
      '1s': 'أُشْنَأْ',
      '2ms': 'تُشْنَأْ',
      '2fs': 'تُشْنَئِي',
      '3ms': 'يُشْنَأْ',
      '3fs': 'تُشْنَأْ',
      '2d': 'تُشْنَآ',
      '3md': 'يُشْنَآ',
      '3fd': 'تُشْنَآ',
      '1p': 'نُشْنَأْ',
      '2mp': 'تُشْنَؤُوا',
      '2fp': 'تُشْنَأْنَ',
      '3mp': 'يُشْنَؤُوا',
      '3fp': 'يُشْنَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("$n'-1")!)).toEqualT('شَانِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("$n'-1")!)).toEqualT('مَشْنُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("$n'-1")!))).toEqualT(
      new Set(['شَنْء', 'شُنْء', 'شِنْء', 'شَنْأَة', 'مَشْنَأ', 'مَشْنَأَة', 'مَشْنُؤَة', 'شَنَآن', 'شَنْآن']),
    )
  })
})
