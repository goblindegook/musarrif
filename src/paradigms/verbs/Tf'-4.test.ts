import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Tf'-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Tf'-4")!)).toEqualT({
      '1s': 'أَطْفَأْتُ',
      '2ms': 'أَطْفَأْتَ',
      '2fs': 'أَطْفَأْتِ',
      '3ms': 'أَطْفَأَ',
      '3fs': 'أَطْفَأَتْ',
      '2d': 'أَطْفَأْتُمَا',
      '3md': 'أَطْفَآ',
      '3fd': 'أَطْفَأَتَا',
      '1p': 'أَطْفَأْنَا',
      '2mp': 'أَطْفَأْتُمْ',
      '2fp': 'أَطْفَأْتُنَّ',
      '3mp': 'أَطْفَؤُوا',
      '3fp': 'أَطْفَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Tf'-4")!, 'indicative')).toEqualT({
      '1s': 'أُطْفِئُ',
      '2ms': 'تُطْفِئُ',
      '2fs': 'تُطْفِئِينَ',
      '3ms': 'يُطْفِئُ',
      '3fs': 'تُطْفِئُ',
      '2d': 'تُطْفِئَانِ',
      '3md': 'يُطْفِئَانِ',
      '3fd': 'تُطْفِئَانِ',
      '1p': 'نُطْفِئُ',
      '2mp': 'تُطْفِئُونَ',
      '2fp': 'تُطْفِئْنَ',
      '3mp': 'يُطْفِئُونَ',
      '3fp': 'يُطْفِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Tf'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُطْفِئَ',
      '2ms': 'تُطْفِئَ',
      '2fs': 'تُطْفِئِي',
      '3ms': 'يُطْفِئَ',
      '3fs': 'تُطْفِئَ',
      '2d': 'تُطْفِئَا',
      '3md': 'يُطْفِئَا',
      '3fd': 'تُطْفِئَا',
      '1p': 'نُطْفِئَ',
      '2mp': 'تُطْفِئُوا',
      '2fp': 'تُطْفِئْنَ',
      '3mp': 'يُطْفِئُوا',
      '3fp': 'يُطْفِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Tf'-4")!, 'jussive')).toEqualT({
      '1s': 'أُطْفِئْ',
      '2ms': 'تُطْفِئْ',
      '2fs': 'تُطْفِئِي',
      '3ms': 'يُطْفِئْ',
      '3fs': 'تُطْفِئْ',
      '2d': 'تُطْفِئَا',
      '3md': 'يُطْفِئَا',
      '3fd': 'تُطْفِئَا',
      '1p': 'نُطْفِئْ',
      '2mp': 'تُطْفِئُوا',
      '2fp': 'تُطْفِئْنَ',
      '3mp': 'يُطْفِئُوا',
      '3fp': 'يُطْفِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Tf'-4")!)).toMatchObjectT({
      '2ms': 'أَطْفِئْ',
      '2fs': 'أَطْفِئِي',
      '2d': 'أَطْفِئَا',
      '2mp': 'أَطْفِئُوا',
      '2fp': 'أَطْفِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Tf'-4")!)).toEqualT({
      '1s': 'أُطْفِئْتُ',
      '2ms': 'أُطْفِئْتَ',
      '2fs': 'أُطْفِئْتِ',
      '3ms': 'أُطْفِئَ',
      '3fs': 'أُطْفِئَتْ',
      '2d': 'أُطْفِئْتُمَا',
      '3md': 'أُطْفِئَا',
      '3fd': 'أُطْفِئَتَا',
      '1p': 'أُطْفِئْنَا',
      '2mp': 'أُطْفِئْتُمْ',
      '2fp': 'أُطْفِئْتُنَّ',
      '3mp': 'أُطْفِئُوا',
      '3fp': 'أُطْفِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Tf'-4")!, 'indicative')).toEqualT({
      '1s': 'أُطْفَأُ',
      '2ms': 'تُطْفَأُ',
      '2fs': 'تُطْفَئِينَ',
      '3ms': 'يُطْفَأُ',
      '3fs': 'تُطْفَأُ',
      '2d': 'تُطْفَآنِ',
      '3md': 'يُطْفَآنِ',
      '3fd': 'تُطْفَآنِ',
      '1p': 'نُطْفَأُ',
      '2mp': 'تُطْفَؤُونَ',
      '2fp': 'تُطْفَأْنَ',
      '3mp': 'يُطْفَؤُونَ',
      '3fp': 'يُطْفَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Tf'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُطْفَأَ',
      '2ms': 'تُطْفَأَ',
      '2fs': 'تُطْفَئِي',
      '3ms': 'يُطْفَأَ',
      '3fs': 'تُطْفَأَ',
      '2d': 'تُطْفَآ',
      '3md': 'يُطْفَآ',
      '3fd': 'تُطْفَآ',
      '1p': 'نُطْفَأَ',
      '2mp': 'تُطْفَؤُوا',
      '2fp': 'تُطْفَأْنَ',
      '3mp': 'يُطْفَؤُوا',
      '3fp': 'يُطْفَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Tf'-4")!, 'jussive')).toEqualT({
      '1s': 'أُطْفَأْ',
      '2ms': 'تُطْفَأْ',
      '2fs': 'تُطْفَئِي',
      '3ms': 'يُطْفَأْ',
      '3fs': 'تُطْفَأْ',
      '2d': 'تُطْفَآ',
      '3md': 'يُطْفَآ',
      '3fd': 'تُطْفَآ',
      '1p': 'نُطْفَأْ',
      '2mp': 'تُطْفَؤُوا',
      '2fp': 'تُطْفَأْنَ',
      '3mp': 'يُطْفَؤُوا',
      '3fp': 'يُطْفَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Tf'-4")!)).toEqualT('مُطْفِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Tf'-4")!)).toEqualT('مُطْفَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Tf'-4")!))).toEqualT(new Set(['إِطْفَاء']))
  })
})
