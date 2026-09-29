import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("hy'-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("hy'-3")!)).toEqualT({
      '1s': 'هَايَأْتُ',
      '2ms': 'هَايَأْتَ',
      '2fs': 'هَايَأْتِ',
      '3ms': 'هَايَأَ',
      '3fs': 'هَايَأَتْ',
      '2d': 'هَايَأْتُمَا',
      '3md': 'هَايَآ',
      '3fd': 'هَايَأَتَا',
      '1p': 'هَايَأْنَا',
      '2mp': 'هَايَأْتُمْ',
      '2fp': 'هَايَأْتُنَّ',
      '3mp': 'هَايَؤُوا',
      '3fp': 'هَايَأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("hy'-3")!, 'indicative')).toEqualT({
      '1s': 'أُهَايِئُ',
      '2ms': 'تُهَايِئُ',
      '2fs': 'تُهَايِئِينَ',
      '3ms': 'يُهَايِئُ',
      '3fs': 'تُهَايِئُ',
      '2d': 'تُهَايِئَانِ',
      '3md': 'يُهَايِئَانِ',
      '3fd': 'تُهَايِئَانِ',
      '1p': 'نُهَايِئُ',
      '2mp': 'تُهَايِئُونَ',
      '2fp': 'تُهَايِئْنَ',
      '3mp': 'يُهَايِئُونَ',
      '3fp': 'يُهَايِئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("hy'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُهَايِئَ',
      '2ms': 'تُهَايِئَ',
      '2fs': 'تُهَايِئِي',
      '3ms': 'يُهَايِئَ',
      '3fs': 'تُهَايِئَ',
      '2d': 'تُهَايِئَا',
      '3md': 'يُهَايِئَا',
      '3fd': 'تُهَايِئَا',
      '1p': 'نُهَايِئَ',
      '2mp': 'تُهَايِئُوا',
      '2fp': 'تُهَايِئْنَ',
      '3mp': 'يُهَايِئُوا',
      '3fp': 'يُهَايِئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("hy'-3")!, 'jussive')).toEqualT({
      '1s': 'أُهَايِئْ',
      '2ms': 'تُهَايِئْ',
      '2fs': 'تُهَايِئِي',
      '3ms': 'يُهَايِئْ',
      '3fs': 'تُهَايِئْ',
      '2d': 'تُهَايِئَا',
      '3md': 'يُهَايِئَا',
      '3fd': 'تُهَايِئَا',
      '1p': 'نُهَايِئْ',
      '2mp': 'تُهَايِئُوا',
      '2fp': 'تُهَايِئْنَ',
      '3mp': 'يُهَايِئُوا',
      '3fp': 'يُهَايِئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("hy'-3")!)).toMatchObjectT({
      '2ms': 'هَايِئْ',
      '2fs': 'هَايِئِي',
      '2d': 'هَايِئَا',
      '2mp': 'هَايِئُوا',
      '2fp': 'هَايِئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("hy'-3")!)).toEqualT({
      '1s': 'هُويِئْتُ',
      '2ms': 'هُويِئْتَ',
      '2fs': 'هُويِئْتِ',
      '3ms': 'هُويِئَ',
      '3fs': 'هُويِئَتْ',
      '2d': 'هُويِئْتُمَا',
      '3md': 'هُويِئَا',
      '3fd': 'هُويِئَتَا',
      '1p': 'هُويِئْنَا',
      '2mp': 'هُويِئْتُمْ',
      '2fp': 'هُويِئْتُنَّ',
      '3mp': 'هُويِئُوا',
      '3fp': 'هُويِئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("hy'-3")!, 'indicative')).toEqualT({
      '1s': 'أُهَايَأُ',
      '2ms': 'تُهَايَأُ',
      '2fs': 'تُهَايَئِينَ',
      '3ms': 'يُهَايَأُ',
      '3fs': 'تُهَايَأُ',
      '2d': 'تُهَايَآنِ',
      '3md': 'يُهَايَآنِ',
      '3fd': 'تُهَايَآنِ',
      '1p': 'نُهَايَأُ',
      '2mp': 'تُهَايَؤُونَ',
      '2fp': 'تُهَايَأْنَ',
      '3mp': 'يُهَايَؤُونَ',
      '3fp': 'يُهَايَأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hy'-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُهَايَأَ',
      '2ms': 'تُهَايَأَ',
      '2fs': 'تُهَايَئِي',
      '3ms': 'يُهَايَأَ',
      '3fs': 'تُهَايَأَ',
      '2d': 'تُهَايَآ',
      '3md': 'يُهَايَآ',
      '3fd': 'تُهَايَآ',
      '1p': 'نُهَايَأَ',
      '2mp': 'تُهَايَؤُوا',
      '2fp': 'تُهَايَأْنَ',
      '3mp': 'يُهَايَؤُوا',
      '3fp': 'يُهَايَأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("hy'-3")!, 'jussive')).toEqualT({
      '1s': 'أُهَايَأْ',
      '2ms': 'تُهَايَأْ',
      '2fs': 'تُهَايَئِي',
      '3ms': 'يُهَايَأْ',
      '3fs': 'تُهَايَأْ',
      '2d': 'تُهَايَآ',
      '3md': 'يُهَايَآ',
      '3fd': 'تُهَايَآ',
      '1p': 'نُهَايَأْ',
      '2mp': 'تُهَايَؤُوا',
      '2fp': 'تُهَايَأْنَ',
      '3mp': 'يُهَايَؤُوا',
      '3fp': 'يُهَايَأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("hy'-3")!)).toEqualT('مُهَايِئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("hy'-3")!)).toEqualT('مُهَايَأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("hy'-3")!))).toEqualT(new Set(['مُهَايَأَة']))
  })
})
