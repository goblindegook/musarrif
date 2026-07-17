import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wm'-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wm'-4")!)).toEqualT({
      '1s': 'أَوْمَأْتُ',
      '2ms': 'أَوْمَأْتَ',
      '2fs': 'أَوْمَأْتِ',
      '3ms': 'أَوْمَأَ',
      '3fs': 'أَوْمَأَتْ',
      '2d': 'أَوْمَأْتُمَا',
      '3md': 'أَوْمَآ',
      '3fd': 'أَوْمَأَتَا',
      '1p': 'أَوْمَأْنَا',
      '2mp': 'أَوْمَأْتُمْ',
      '2fp': 'أَوْمَأْتُنَّ',
      '3mp': 'أَوْمَؤُوا',
      '3fp': 'أَوْمَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wm'-4")!, 'indicative')).toEqualT({
      '1s': 'أُومِئُ',
      '2ms': 'تُومِئُ',
      '2fs': 'تُومِئِينَ',
      '3ms': 'يُومِئُ',
      '3fs': 'تُومِئُ',
      '2d': 'تُومِئَانِ',
      '3md': 'يُومِئَانِ',
      '3fd': 'تُومِئَانِ',
      '1p': 'نُومِئُ',
      '2mp': 'تُومِئُونَ',
      '2fp': 'تُومِئْنَ',
      '3mp': 'يُومِئُونَ',
      '3fp': 'يُومِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wm'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُومِئَ',
      '2ms': 'تُومِئَ',
      '2fs': 'تُومِئِي',
      '3ms': 'يُومِئَ',
      '3fs': 'تُومِئَ',
      '2d': 'تُومِئَا',
      '3md': 'يُومِئَا',
      '3fd': 'تُومِئَا',
      '1p': 'نُومِئَ',
      '2mp': 'تُومِئُوا',
      '2fp': 'تُومِئْنَ',
      '3mp': 'يُومِئُوا',
      '3fp': 'يُومِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wm'-4")!, 'jussive')).toEqualT({
      '1s': 'أُومِئْ',
      '2ms': 'تُومِئْ',
      '2fs': 'تُومِئِي',
      '3ms': 'يُومِئْ',
      '3fs': 'تُومِئْ',
      '2d': 'تُومِئَا',
      '3md': 'يُومِئَا',
      '3fd': 'تُومِئَا',
      '1p': 'نُومِئْ',
      '2mp': 'تُومِئُوا',
      '2fp': 'تُومِئْنَ',
      '3mp': 'يُومِئُوا',
      '3fp': 'يُومِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wm'-4")!)).toMatchObjectT({
      '2ms': 'أَوْمِئْ',
      '2fs': 'أَوْمِئِي',
      '2d': 'أَوْمِئَا',
      '2mp': 'أَوْمِئُوا',
      '2fp': 'أَوْمِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wm'-4")!)).toEqualT({
      '1s': 'أُومِئْتُ',
      '2ms': 'أُومِئْتَ',
      '2fs': 'أُومِئْتِ',
      '3ms': 'أُومِئَ',
      '3fs': 'أُومِئَتْ',
      '2d': 'أُومِئْتُمَا',
      '3md': 'أُومِئَا',
      '3fd': 'أُومِئَتَا',
      '1p': 'أُومِئْنَا',
      '2mp': 'أُومِئْتُمْ',
      '2fp': 'أُومِئْتُنَّ',
      '3mp': 'أُومِئُوا',
      '3fp': 'أُومِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wm'-4")!, 'indicative')).toEqualT({
      '1s': 'أُومَأُ',
      '2ms': 'تُومَأُ',
      '2fs': 'تُومَئِينَ',
      '3ms': 'يُومَأُ',
      '3fs': 'تُومَأُ',
      '2d': 'تُومَآنِ',
      '3md': 'يُومَآنِ',
      '3fd': 'تُومَآنِ',
      '1p': 'نُومَأُ',
      '2mp': 'تُومَؤُونَ',
      '2fp': 'تُومَأْنَ',
      '3mp': 'يُومَؤُونَ',
      '3fp': 'يُومَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wm'-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُومَأَ',
      '2ms': 'تُومَأَ',
      '2fs': 'تُومَئِي',
      '3ms': 'يُومَأَ',
      '3fs': 'تُومَأَ',
      '2d': 'تُومَآ',
      '3md': 'يُومَآ',
      '3fd': 'تُومَآ',
      '1p': 'نُومَأَ',
      '2mp': 'تُومَؤُوا',
      '2fp': 'تُومَأْنَ',
      '3mp': 'يُومَؤُوا',
      '3fp': 'يُومَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wm'-4")!, 'jussive')).toEqualT({
      '1s': 'أُومَأْ',
      '2ms': 'تُومَأْ',
      '2fs': 'تُومَئِي',
      '3ms': 'يُومَأْ',
      '3fs': 'تُومَأْ',
      '2d': 'تُومَآ',
      '3md': 'يُومَآ',
      '3fd': 'تُومَآ',
      '1p': 'نُومَأْ',
      '2mp': 'تُومَؤُوا',
      '2fp': 'تُومَأْنَ',
      '3mp': 'يُومَؤُوا',
      '3fp': 'يُومَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wm'-4")!)).toEqualT('مُومِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wm'-4")!)).toEqualT('مُومَأ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("wm'-4")!)).toEqualT(['إِيمَاء'])
  })
})
