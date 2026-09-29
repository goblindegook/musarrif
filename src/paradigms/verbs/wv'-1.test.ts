import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("wv'-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("wv'-1")!)).toEqualT({
      '1s': 'وَثَأْتُ',
      '2ms': 'وَثَأْتَ',
      '2fs': 'وَثَأْتِ',
      '3ms': 'وَثَأَ',
      '3fs': 'وَثَأَتْ',
      '2d': 'وَثَأْتُمَا',
      '3md': 'وَثَآ',
      '3fd': 'وَثَأَتَا',
      '1p': 'وَثَأْنَا',
      '2mp': 'وَثَأْتُمْ',
      '2fp': 'وَثَأْتُنَّ',
      '3mp': 'وَثَؤُوا',
      '3fp': 'وَثَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("wv'-1")!, 'indicative')).toEqualT({
      '1s': 'أَثَأُ',
      '2ms': 'تَثَأُ',
      '2fs': 'تَثَئِينَ',
      '3ms': 'يَثَأُ',
      '3fs': 'تَثَأُ',
      '2d': 'تَثَآنِ',
      '3md': 'يَثَآنِ',
      '3fd': 'تَثَآنِ',
      '1p': 'نَثَأُ',
      '2mp': 'تَثَؤُونَ',
      '2fp': 'تَثَأْنَ',
      '3mp': 'يَثَؤُونَ',
      '3fp': 'يَثَأْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("wv'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَثَأَ',
      '2ms': 'تَثَأَ',
      '2fs': 'تَثَئِي',
      '3ms': 'يَثَأَ',
      '3fs': 'تَثَأَ',
      '2d': 'تَثَآ',
      '3md': 'يَثَآ',
      '3fd': 'تَثَآ',
      '1p': 'نَثَأَ',
      '2mp': 'تَثَؤُوا',
      '2fp': 'تَثَأْنَ',
      '3mp': 'يَثَؤُوا',
      '3fp': 'يَثَأْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("wv'-1")!, 'jussive')).toEqualT({
      '1s': 'أَثَأْ',
      '2ms': 'تَثَأْ',
      '2fs': 'تَثَئِي',
      '3ms': 'يَثَأْ',
      '3fs': 'تَثَأْ',
      '2d': 'تَثَآ',
      '3md': 'يَثَآ',
      '3fd': 'تَثَآ',
      '1p': 'نَثَأْ',
      '2mp': 'تَثَؤُوا',
      '2fp': 'تَثَأْنَ',
      '3mp': 'يَثَؤُوا',
      '3fp': 'يَثَأْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("wv'-1")!)).toMatchObjectT({
      '2ms': 'ثَأْ',
      '2fs': 'ثَئِي',
      '2d': 'ثَآ',
      '2mp': 'ثَؤُوا',
      '2fp': 'ثَأْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("wv'-1")!)).toEqualT({
      '1s': 'وُثِئْتُ',
      '2ms': 'وُثِئْتَ',
      '2fs': 'وُثِئْتِ',
      '3ms': 'وُثِئَ',
      '3fs': 'وُثِئَتْ',
      '2d': 'وُثِئْتُمَا',
      '3md': 'وُثِئَا',
      '3fd': 'وُثِئَتَا',
      '1p': 'وُثِئْنَا',
      '2mp': 'وُثِئْتُمْ',
      '2fp': 'وُثِئْتُنَّ',
      '3mp': 'وُثِئُوا',
      '3fp': 'وُثِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("wv'-1")!, 'indicative')).toEqualT({
      '1s': 'أُوثَأُ',
      '2ms': 'تُوثَأُ',
      '2fs': 'تُوثَئِينَ',
      '3ms': 'يُوثَأُ',
      '3fs': 'تُوثَأُ',
      '2d': 'تُوثَآنِ',
      '3md': 'يُوثَآنِ',
      '3fd': 'تُوثَآنِ',
      '1p': 'نُوثَأُ',
      '2mp': 'تُوثَؤُونَ',
      '2fp': 'تُوثَأْنَ',
      '3mp': 'يُوثَؤُونَ',
      '3fp': 'يُوثَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wv'-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُوثَأَ',
      '2ms': 'تُوثَأَ',
      '2fs': 'تُوثَئِي',
      '3ms': 'يُوثَأَ',
      '3fs': 'تُوثَأَ',
      '2d': 'تُوثَآ',
      '3md': 'يُوثَآ',
      '3fd': 'تُوثَآ',
      '1p': 'نُوثَأَ',
      '2mp': 'تُوثَؤُوا',
      '2fp': 'تُوثَأْنَ',
      '3mp': 'يُوثَؤُوا',
      '3fp': 'يُوثَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("wv'-1")!, 'jussive')).toEqualT({
      '1s': 'أُوثَأْ',
      '2ms': 'تُوثَأْ',
      '2fs': 'تُوثَئِي',
      '3ms': 'يُوثَأْ',
      '3fs': 'تُوثَأْ',
      '2d': 'تُوثَآ',
      '3md': 'يُوثَآ',
      '3fd': 'تُوثَآ',
      '1p': 'نُوثَأْ',
      '2mp': 'تُوثَؤُوا',
      '2fp': 'تُوثَأْنَ',
      '3mp': 'يُوثَؤُوا',
      '3fp': 'يُوثَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("wv'-1")!)).toEqualT('وَاثِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("wv'-1")!)).toEqualT('مَوْثُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("wv'-1")!))).toEqualT(new Set(['وَثْء']))
  })
})
