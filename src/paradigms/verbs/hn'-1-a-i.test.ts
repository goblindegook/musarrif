import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("hn'-1-a-i (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("hn'-1-a-i")!)).toEqualT({
      '1s': 'هَنَأْتُ',
      '2ms': 'هَنَأْتَ',
      '2fs': 'هَنَأْتِ',
      '3ms': 'هَنَأَ',
      '3fs': 'هَنَأَتْ',
      '2d': 'هَنَأْتُمَا',
      '3md': 'هَنَآ',
      '3fd': 'هَنَأَتَا',
      '1p': 'هَنَأْنَا',
      '2mp': 'هَنَأْتُمْ',
      '2fp': 'هَنَأْتُنَّ',
      '3mp': 'هَنَؤُوا',
      '3fp': 'هَنَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("hn'-1-a-i")!, 'indicative')).toEqualT({
      '1s': 'أَهْنِئُ',
      '2ms': 'تَهْنِئُ',
      '2fs': 'تَهْنِئِينَ',
      '3ms': 'يَهْنِئُ',
      '3fs': 'تَهْنِئُ',
      '2d': 'تَهْنِئَانِ',
      '3md': 'يَهْنِئَانِ',
      '3fd': 'تَهْنِئَانِ',
      '1p': 'نَهْنِئُ',
      '2mp': 'تَهْنِئُونَ',
      '2fp': 'تَهْنِئْنَ',
      '3mp': 'يَهْنِئُونَ',
      '3fp': 'يَهْنِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("hn'-1-a-i")!, 'subjunctive')).toEqualT({
      '1s': 'أَهْنِئَ',
      '2ms': 'تَهْنِئَ',
      '2fs': 'تَهْنِئِي',
      '3ms': 'يَهْنِئَ',
      '3fs': 'تَهْنِئَ',
      '2d': 'تَهْنِئَا',
      '3md': 'يَهْنِئَا',
      '3fd': 'تَهْنِئَا',
      '1p': 'نَهْنِئَ',
      '2mp': 'تَهْنِئُوا',
      '2fp': 'تَهْنِئْنَ',
      '3mp': 'يَهْنِئُوا',
      '3fp': 'يَهْنِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("hn'-1-a-i")!, 'jussive')).toEqualT({
      '1s': 'أَهْنِئْ',
      '2ms': 'تَهْنِئْ',
      '2fs': 'تَهْنِئِي',
      '3ms': 'يَهْنِئْ',
      '3fs': 'تَهْنِئْ',
      '2d': 'تَهْنِئَا',
      '3md': 'يَهْنِئَا',
      '3fd': 'تَهْنِئَا',
      '1p': 'نَهْنِئْ',
      '2mp': 'تَهْنِئُوا',
      '2fp': 'تَهْنِئْنَ',
      '3mp': 'يَهْنِئُوا',
      '3fp': 'يَهْنِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("hn'-1-a-i")!)).toMatchObjectT({
      '2ms': 'اِهْنِئْ',
      '2fs': 'اِهْنِئِي',
      '2d': 'اِهْنِئَا',
      '2mp': 'اِهْنِئُوا',
      '2fp': 'اِهْنِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("hn'-1-a-i")!)).toEqualT({
      '1s': 'هُنِئْتُ',
      '2ms': 'هُنِئْتَ',
      '2fs': 'هُنِئْتِ',
      '3ms': 'هُنِئَ',
      '3fs': 'هُنِئَتْ',
      '2d': 'هُنِئْتُمَا',
      '3md': 'هُنِئَا',
      '3fd': 'هُنِئَتَا',
      '1p': 'هُنِئْنَا',
      '2mp': 'هُنِئْتُمْ',
      '2fp': 'هُنِئْتُنَّ',
      '3mp': 'هُنِئُوا',
      '3fp': 'هُنِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("hn'-1-a-i")!, 'indicative')).toEqualT({
      '1s': 'أُهْنَأُ',
      '2ms': 'تُهْنَأُ',
      '2fs': 'تُهْنَئِينَ',
      '3ms': 'يُهْنَأُ',
      '3fs': 'تُهْنَأُ',
      '2d': 'تُهْنَآنِ',
      '3md': 'يُهْنَآنِ',
      '3fd': 'تُهْنَآنِ',
      '1p': 'نُهْنَأُ',
      '2mp': 'تُهْنَؤُونَ',
      '2fp': 'تُهْنَأْنَ',
      '3mp': 'يُهْنَؤُونَ',
      '3fp': 'يُهْنَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hn'-1-a-i")!, 'subjunctive')).toEqualT({
      '1s': 'أُهْنَأَ',
      '2ms': 'تُهْنَأَ',
      '2fs': 'تُهْنَئِي',
      '3ms': 'يُهْنَأَ',
      '3fs': 'تُهْنَأَ',
      '2d': 'تُهْنَآ',
      '3md': 'يُهْنَآ',
      '3fd': 'تُهْنَآ',
      '1p': 'نُهْنَأَ',
      '2mp': 'تُهْنَؤُوا',
      '2fp': 'تُهْنَأْنَ',
      '3mp': 'يُهْنَؤُوا',
      '3fp': 'يُهْنَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hn'-1-a-i")!, 'jussive')).toEqualT({
      '1s': 'أُهْنَأْ',
      '2ms': 'تُهْنَأْ',
      '2fs': 'تُهْنَئِي',
      '3ms': 'يُهْنَأْ',
      '3fs': 'تُهْنَأْ',
      '2d': 'تُهْنَآ',
      '3md': 'يُهْنَآ',
      '3fd': 'تُهْنَآ',
      '1p': 'نُهْنَأْ',
      '2mp': 'تُهْنَؤُوا',
      '2fp': 'تُهْنَأْنَ',
      '3mp': 'يُهْنَؤُوا',
      '3fp': 'يُهْنَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("hn'-1-a-i")!)).toEqualT('هَانِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("hn'-1-a-i")!)).toEqualT('مَهْنُوء')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("hn'-1-a-i")!))).toEqualT(new Set(['هَنْء', 'هِنْء', 'هَنَاء']))
  })
})
