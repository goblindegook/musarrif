import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'dy-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'dy-2")!)).toEqualT({
      '1s': 'أَدَّيْتُ',
      '2ms': 'أَدَّيْتَ',
      '2fs': 'أَدَّيْتِ',
      '3ms': 'أَدَّى',
      '3fs': 'أَدَّتْ',
      '2d': 'أَدَّيْتُمَا',
      '3md': 'أَدَّيَا',
      '3fd': 'أَدَّتَا',
      '1p': 'أَدَّيْنَا',
      '2mp': 'أَدَّيْتُمْ',
      '2fp': 'أَدَّيْتُنَّ',
      '3mp': 'أَدَّوْا',
      '3fp': 'أَدَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'dy-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَدِّي',
      '2ms': 'تُؤَدِّي',
      '2fs': 'تُؤَدِّينَ',
      '3ms': 'يُؤَدِّي',
      '3fs': 'تُؤَدِّي',
      '2d': 'تُؤَدِّيَانِ',
      '3md': 'يُؤَدِّيَانِ',
      '3fd': 'تُؤَدِّيَانِ',
      '1p': 'نُؤَدِّي',
      '2mp': 'تُؤَدُّونَ',
      '2fp': 'تُؤَدِّينَ',
      '3mp': 'يُؤَدُّونَ',
      '3fp': 'يُؤَدِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'dy-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَدِّيَ',
      '2ms': 'تُؤَدِّيَ',
      '2fs': 'تُؤَدِّي',
      '3ms': 'يُؤَدِّيَ',
      '3fs': 'تُؤَدِّيَ',
      '2d': 'تُؤَدِّيَا',
      '3md': 'يُؤَدِّيَا',
      '3fd': 'تُؤَدِّيَا',
      '1p': 'نُؤَدِّيَ',
      '2mp': 'تُؤَدُّوا',
      '2fp': 'تُؤَدِّينَ',
      '3mp': 'يُؤَدُّوا',
      '3fp': 'يُؤَدِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'dy-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَدِّ',
      '2ms': 'تُؤَدِّ',
      '2fs': 'تُؤَدِّي',
      '3ms': 'يُؤَدِّ',
      '3fs': 'تُؤَدِّ',
      '2d': 'تُؤَدِّيَا',
      '3md': 'يُؤَدِّيَا',
      '3fd': 'تُؤَدِّيَا',
      '1p': 'نُؤَدِّ',
      '2mp': 'تُؤَدُّوا',
      '2fp': 'تُؤَدِّينَ',
      '3mp': 'يُؤَدُّوا',
      '3fp': 'يُؤَدِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'dy-2")!)).toMatchObjectT({
      '2ms': 'أَدِّ',
      '2fs': 'أَدِّي',
      '2d': 'أَدِّيَا',
      '2mp': 'أَدُّوا',
      '2fp': 'أَدِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'dy-2")!)).toEqualT({
      '1s': 'أُدِّيتُ',
      '2ms': 'أُدِّيتَ',
      '2fs': 'أُدِّيتِ',
      '3ms': 'أُدِّيَ',
      '3fs': 'أُدِّيَتْ',
      '2d': 'أُدِّيتُمَا',
      '3md': 'أُدِّيَا',
      '3fd': 'أُدِّيَتَا',
      '1p': 'أُدِّينَا',
      '2mp': 'أُدِّيتُمْ',
      '2fp': 'أُدِّيتُنَّ',
      '3mp': 'أُدُّوا',
      '3fp': 'أُدِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'dy-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَدَّى',
      '2ms': 'تُؤَدَّى',
      '2fs': 'تُؤَدَّيْنَ',
      '3ms': 'يُؤَدَّى',
      '3fs': 'تُؤَدَّى',
      '2d': 'تُؤَدَّيَانِ',
      '3md': 'يُؤَدَّيَانِ',
      '3fd': 'تُؤَدَّيَانِ',
      '1p': 'نُؤَدَّى',
      '2mp': 'تُؤَدَّوْنَ',
      '2fp': 'تُؤَدَّيْنَ',
      '3mp': 'يُؤَدَّوْنَ',
      '3fp': 'يُؤَدَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'dy-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَدَّى',
      '2ms': 'تُؤَدَّى',
      '2fs': 'تُؤَدَّيْ',
      '3ms': 'يُؤَدَّى',
      '3fs': 'تُؤَدَّى',
      '2d': 'تُؤَدَّيَا',
      '3md': 'يُؤَدَّيَا',
      '3fd': 'تُؤَدَّيَا',
      '1p': 'نُؤَدَّى',
      '2mp': 'تُؤَدَّوْا',
      '2fp': 'تُؤَدَّيْنَ',
      '3mp': 'يُؤَدَّوْا',
      '3fp': 'يُؤَدَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'dy-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَدَّ',
      '2ms': 'تُؤَدَّ',
      '2fs': 'تُؤَدَّيْ',
      '3ms': 'يُؤَدَّ',
      '3fs': 'تُؤَدَّ',
      '2d': 'تُؤَدَّيَا',
      '3md': 'يُؤَدَّيَا',
      '3fd': 'تُؤَدَّيَا',
      '1p': 'نُؤَدَّ',
      '2mp': 'تُؤَدَّوْا',
      '2fp': 'تُؤَدَّيْنَ',
      '3mp': 'يُؤَدَّوْا',
      '3fp': 'يُؤَدَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'dy-2")!)).toEqualT('مُؤَدٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'dy-2")!)).toEqualT('مُؤَدًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'dy-2")!))).toEqualT(new Set(['تَأْدِيَة', 'أَدَاء']))
  })
})
