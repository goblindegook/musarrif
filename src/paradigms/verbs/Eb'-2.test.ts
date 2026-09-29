import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Eb'-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Eb'-2")!)).toEqualT({
      '1s': 'عَبَّأْتُ',
      '2ms': 'عَبَّأْتَ',
      '2fs': 'عَبَّأْتِ',
      '3ms': 'عَبَّأَ',
      '3fs': 'عَبَّأَتْ',
      '2d': 'عَبَّأْتُمَا',
      '3md': 'عَبَّآ',
      '3fd': 'عَبَّأَتَا',
      '1p': 'عَبَّأْنَا',
      '2mp': 'عَبَّأْتُمْ',
      '2fp': 'عَبَّأْتُنَّ',
      '3mp': 'عَبَّؤُوا',
      '3fp': 'عَبَّأْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Eb'-2")!, 'indicative')).toEqualT({
      '1s': 'أُعَبِّئُ',
      '2ms': 'تُعَبِّئُ',
      '2fs': 'تُعَبِّئِينَ',
      '3ms': 'يُعَبِّئُ',
      '3fs': 'تُعَبِّئُ',
      '2d': 'تُعَبِّئَانِ',
      '3md': 'يُعَبِّئَانِ',
      '3fd': 'تُعَبِّئَانِ',
      '1p': 'نُعَبِّئُ',
      '2mp': 'تُعَبِّئُونَ',
      '2fp': 'تُعَبِّئْنَ',
      '3mp': 'يُعَبِّئُونَ',
      '3fp': 'يُعَبِّئْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Eb'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُعَبِّئَ',
      '2ms': 'تُعَبِّئَ',
      '2fs': 'تُعَبِّئِي',
      '3ms': 'يُعَبِّئَ',
      '3fs': 'تُعَبِّئَ',
      '2d': 'تُعَبِّئَا',
      '3md': 'يُعَبِّئَا',
      '3fd': 'تُعَبِّئَا',
      '1p': 'نُعَبِّئَ',
      '2mp': 'تُعَبِّئُوا',
      '2fp': 'تُعَبِّئْنَ',
      '3mp': 'يُعَبِّئُوا',
      '3fp': 'يُعَبِّئْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Eb'-2")!, 'jussive')).toEqualT({
      '1s': 'أُعَبِّئْ',
      '2ms': 'تُعَبِّئْ',
      '2fs': 'تُعَبِّئِي',
      '3ms': 'يُعَبِّئْ',
      '3fs': 'تُعَبِّئْ',
      '2d': 'تُعَبِّئَا',
      '3md': 'يُعَبِّئَا',
      '3fd': 'تُعَبِّئَا',
      '1p': 'نُعَبِّئْ',
      '2mp': 'تُعَبِّئُوا',
      '2fp': 'تُعَبِّئْنَ',
      '3mp': 'يُعَبِّئُوا',
      '3fp': 'يُعَبِّئْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Eb'-2")!)).toMatchObjectT({
      '2ms': 'عَبِّئْ',
      '2fs': 'عَبِّئِي',
      '2d': 'عَبِّئَا',
      '2mp': 'عَبِّئُوا',
      '2fp': 'عَبِّئْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Eb'-2")!)).toEqualT({
      '1s': 'عُبِّئْتُ',
      '2ms': 'عُبِّئْتَ',
      '2fs': 'عُبِّئْتِ',
      '3ms': 'عُبِّئَ',
      '3fs': 'عُبِّئَتْ',
      '2d': 'عُبِّئْتُمَا',
      '3md': 'عُبِّئَا',
      '3fd': 'عُبِّئَتَا',
      '1p': 'عُبِّئْنَا',
      '2mp': 'عُبِّئْتُمْ',
      '2fp': 'عُبِّئْتُنَّ',
      '3mp': 'عُبِّئُوا',
      '3fp': 'عُبِّئْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Eb'-2")!, 'indicative')).toEqualT({
      '1s': 'أُعَبَّأُ',
      '2ms': 'تُعَبَّأُ',
      '2fs': 'تُعَبَّئِينَ',
      '3ms': 'يُعَبَّأُ',
      '3fs': 'تُعَبَّأُ',
      '2d': 'تُعَبَّآنِ',
      '3md': 'يُعَبَّآنِ',
      '3fd': 'تُعَبَّآنِ',
      '1p': 'نُعَبَّأُ',
      '2mp': 'تُعَبَّؤُونَ',
      '2fp': 'تُعَبَّأْنَ',
      '3mp': 'يُعَبَّؤُونَ',
      '3fp': 'يُعَبَّأْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Eb'-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُعَبَّأَ',
      '2ms': 'تُعَبَّأَ',
      '2fs': 'تُعَبَّئِي',
      '3ms': 'يُعَبَّأَ',
      '3fs': 'تُعَبَّأَ',
      '2d': 'تُعَبَّآ',
      '3md': 'يُعَبَّآ',
      '3fd': 'تُعَبَّآ',
      '1p': 'نُعَبَّأَ',
      '2mp': 'تُعَبَّؤُوا',
      '2fp': 'تُعَبَّأْنَ',
      '3mp': 'يُعَبَّؤُوا',
      '3fp': 'يُعَبَّأْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Eb'-2")!, 'jussive')).toEqualT({
      '1s': 'أُعَبَّأْ',
      '2ms': 'تُعَبَّأْ',
      '2fs': 'تُعَبَّئِي',
      '3ms': 'يُعَبَّأْ',
      '3fs': 'تُعَبَّأْ',
      '2d': 'تُعَبَّآ',
      '3md': 'يُعَبَّآ',
      '3fd': 'تُعَبَّآ',
      '1p': 'نُعَبَّأْ',
      '2mp': 'تُعَبَّؤُوا',
      '2fp': 'تُعَبَّأْنَ',
      '3mp': 'يُعَبَّؤُوا',
      '3fp': 'يُعَبَّأْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Eb'-2")!)).toEqualT('مُعَبِّئ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Eb'-2")!)).toEqualT('مُعَبَّأ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("Eb'-2")!))).toEqualT(new Set(['تَعْبِيء', 'تَعْبِئَة']))
  })
})
