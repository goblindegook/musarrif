import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'wy-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'wy-2")!)).toEqualT({
      '1s': 'أَوَّيْتُ',
      '2ms': 'أَوَّيْتَ',
      '2fs': 'أَوَّيْتِ',
      '3ms': 'أَوَّى',
      '3fs': 'أَوَّتْ',
      '2d': 'أَوَّيْتُمَا',
      '3md': 'أَوَّيَا',
      '3fd': 'أَوَّتَا',
      '1p': 'أَوَّيْنَا',
      '2mp': 'أَوَّيْتُمْ',
      '2fp': 'أَوَّيْتُنَّ',
      '3mp': 'أَوَّوْا',
      '3fp': 'أَوَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'wy-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَوِّي',
      '2ms': 'تُؤَوِّي',
      '2fs': 'تُؤَوِّينَ',
      '3ms': 'يُؤَوِّي',
      '3fs': 'تُؤَوِّي',
      '2d': 'تُؤَوِّيَانِ',
      '3md': 'يُؤَوِّيَانِ',
      '3fd': 'تُؤَوِّيَانِ',
      '1p': 'نُؤَوِّي',
      '2mp': 'تُؤَوُّونَ',
      '2fp': 'تُؤَوِّينَ',
      '3mp': 'يُؤَوُّونَ',
      '3fp': 'يُؤَوِّينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'wy-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَوِّيَ',
      '2ms': 'تُؤَوِّيَ',
      '2fs': 'تُؤَوِّي',
      '3ms': 'يُؤَوِّيَ',
      '3fs': 'تُؤَوِّيَ',
      '2d': 'تُؤَوِّيَا',
      '3md': 'يُؤَوِّيَا',
      '3fd': 'تُؤَوِّيَا',
      '1p': 'نُؤَوِّيَ',
      '2mp': 'تُؤَوُّوا',
      '2fp': 'تُؤَوِّينَ',
      '3mp': 'يُؤَوُّوا',
      '3fp': 'يُؤَوِّينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'wy-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَوِّ',
      '2ms': 'تُؤَوِّ',
      '2fs': 'تُؤَوِّي',
      '3ms': 'يُؤَوِّ',
      '3fs': 'تُؤَوِّ',
      '2d': 'تُؤَوِّيَا',
      '3md': 'يُؤَوِّيَا',
      '3fd': 'تُؤَوِّيَا',
      '1p': 'نُؤَوِّ',
      '2mp': 'تُؤَوُّوا',
      '2fp': 'تُؤَوِّينَ',
      '3mp': 'يُؤَوُّوا',
      '3fp': 'يُؤَوِّينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'wy-2")!)).toMatchObjectT({
      '2ms': 'أَوِّ',
      '2fs': 'أَوِّي',
      '2d': 'أَوِّيَا',
      '2mp': 'أَوُّوا',
      '2fp': 'أَوِّينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'wy-2")!)).toEqualT({
      '1s': 'أُوِّيتُ',
      '2ms': 'أُوِّيتَ',
      '2fs': 'أُوِّيتِ',
      '3ms': 'أُوِّيَ',
      '3fs': 'أُوِّيَتْ',
      '2d': 'أُوِّيتُمَا',
      '3md': 'أُوِّيَا',
      '3fd': 'أُوِّيَتَا',
      '1p': 'أُوِّينَا',
      '2mp': 'أُوِّيتُمْ',
      '2fp': 'أُوِّيتُنَّ',
      '3mp': 'أُوُّوا',
      '3fp': 'أُوِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَوَّى',
      '2ms': 'تُؤَوَّى',
      '2fs': 'تُؤَوَّيْنَ',
      '3ms': 'يُؤَوَّى',
      '3fs': 'تُؤَوَّى',
      '2d': 'تُؤَوَّيَانِ',
      '3md': 'يُؤَوَّيَانِ',
      '3fd': 'تُؤَوَّيَانِ',
      '1p': 'نُؤَوَّى',
      '2mp': 'تُؤَوَّوْنَ',
      '2fp': 'تُؤَوَّيْنَ',
      '3mp': 'يُؤَوَّوْنَ',
      '3fp': 'يُؤَوَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَوَّى',
      '2ms': 'تُؤَوَّى',
      '2fs': 'تُؤَوَّيْ',
      '3ms': 'يُؤَوَّى',
      '3fs': 'تُؤَوَّى',
      '2d': 'تُؤَوَّيَا',
      '3md': 'يُؤَوَّيَا',
      '3fd': 'تُؤَوَّيَا',
      '1p': 'نُؤَوَّى',
      '2mp': 'تُؤَوَّوْا',
      '2fp': 'تُؤَوَّيْنَ',
      '3mp': 'يُؤَوَّوْا',
      '3fp': 'يُؤَوَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَوَّ',
      '2ms': 'تُؤَوَّ',
      '2fs': 'تُؤَوَّيْ',
      '3ms': 'يُؤَوَّ',
      '3fs': 'تُؤَوَّ',
      '2d': 'تُؤَوَّيَا',
      '3md': 'يُؤَوَّيَا',
      '3fd': 'تُؤَوَّيَا',
      '1p': 'نُؤَوَّ',
      '2mp': 'تُؤَوَّوْا',
      '2fp': 'تُؤَوَّيْنَ',
      '3mp': 'يُؤَوَّوْا',
      '3fp': 'يُؤَوَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'wy-2")!)).toEqualT('مُؤَوٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'wy-2")!)).toEqualT('مُؤَوًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'wy-2")!))).toEqualT(new Set(['تَأْوِيَة']))
  })
})
