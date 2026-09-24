import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'xw-5 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'xw-5")!)).toEqualT({
      '1s': 'تَأَخَّيْتُ',
      '2ms': 'تَأَخَّيْتَ',
      '2fs': 'تَأَخَّيْتِ',
      '3ms': 'تَأَخَّى',
      '3fs': 'تَأَخَّتْ',
      '2d': 'تَأَخَّيْتُمَا',
      '3md': 'تَأَخَّيَا',
      '3fd': 'تَأَخَّتَا',
      '1p': 'تَأَخَّيْنَا',
      '2mp': 'تَأَخَّيْتُمْ',
      '2fp': 'تَأَخَّيْتُنَّ',
      '3mp': 'تَأَخَّوْا',
      '3fp': 'تَأَخَّيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'xw-5")!, 'indicative')).toEqualT({
      '1s': 'أَتَأَخَّى',
      '2ms': 'تَتَأَخَّى',
      '2fs': 'تَتَأَخَّيْنَ',
      '3ms': 'يَتَأَخَّى',
      '3fs': 'تَتَأَخَّى',
      '2d': 'تَتَأَخَّيَانِ',
      '3md': 'يَتَأَخَّيَانِ',
      '3fd': 'تَتَأَخَّيَانِ',
      '1p': 'نَتَأَخَّى',
      '2mp': 'تَتَأَخَّوْنَ',
      '2fp': 'تَتَأَخَّيْنَ',
      '3mp': 'يَتَأَخَّوْنَ',
      '3fp': 'يَتَأَخَّيْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'xw-5")!, 'subjunctive')).toEqualT({
      '1s': 'أَتَأَخَّى',
      '2ms': 'تَتَأَخَّى',
      '2fs': 'تَتَأَخَّيْ',
      '3ms': 'يَتَأَخَّى',
      '3fs': 'تَتَأَخَّى',
      '2d': 'تَتَأَخَّيَا',
      '3md': 'يَتَأَخَّيَا',
      '3fd': 'تَتَأَخَّيَا',
      '1p': 'نَتَأَخَّى',
      '2mp': 'تَتَأَخَّوْا',
      '2fp': 'تَتَأَخَّيْنَ',
      '3mp': 'يَتَأَخَّوْا',
      '3fp': 'يَتَأَخَّيْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'xw-5")!, 'jussive')).toEqualT({
      '1s': 'أَتَأَخَّ',
      '2ms': 'تَتَأَخَّ',
      '2fs': 'تَتَأَخَّيْ',
      '3ms': 'يَتَأَخَّ',
      '3fs': 'تَتَأَخَّ',
      '2d': 'تَتَأَخَّيَا',
      '3md': 'يَتَأَخَّيَا',
      '3fd': 'تَتَأَخَّيَا',
      '1p': 'نَتَأَخَّ',
      '2mp': 'تَتَأَخَّوْا',
      '2fp': 'تَتَأَخَّيْنَ',
      '3mp': 'يَتَأَخَّوْا',
      '3fp': 'يَتَأَخَّيْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'xw-5")!)).toMatchObjectT({
      '2ms': 'تَأَخَّ',
      '2fs': 'تَأَخَّيْ',
      '2d': 'تَأَخَّيَا',
      '2mp': 'تَأَخَّوْا',
      '2fp': 'تَأَخَّيْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'xw-5")!)).toEqualT({
      '1s': 'تُؤُخِّيتُ',
      '2ms': 'تُؤُخِّيتَ',
      '2fs': 'تُؤُخِّيتِ',
      '3ms': 'تُؤُخِّيَ',
      '3fs': 'تُؤُخِّيَتْ',
      '2d': 'تُؤُخِّيتُمَا',
      '3md': 'تُؤُخِّيَا',
      '3fd': 'تُؤُخِّيَتَا',
      '1p': 'تُؤُخِّينَا',
      '2mp': 'تُؤُخِّيتُمْ',
      '2fp': 'تُؤُخِّيتُنَّ',
      '3mp': 'تُؤُخُّوا',
      '3fp': 'تُؤُخِّينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'xw-5")!, 'indicative')).toEqualT({
      '1s': 'أُتَأَخَّى',
      '2ms': 'تُتَأَخَّى',
      '2fs': 'تُتَأَخَّيْنَ',
      '3ms': 'يُتَأَخَّى',
      '3fs': 'تُتَأَخَّى',
      '2d': 'تُتَأَخَّيَانِ',
      '3md': 'يُتَأَخَّيَانِ',
      '3fd': 'تُتَأَخَّيَانِ',
      '1p': 'نُتَأَخَّى',
      '2mp': 'تُتَأَخَّوْنَ',
      '2fp': 'تُتَأَخَّيْنَ',
      '3mp': 'يُتَأَخَّوْنَ',
      '3fp': 'يُتَأَخَّيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'xw-5")!, 'subjunctive')).toEqualT({
      '1s': 'أُتَأَخَّى',
      '2ms': 'تُتَأَخَّى',
      '2fs': 'تُتَأَخَّيْ',
      '3ms': 'يُتَأَخَّى',
      '3fs': 'تُتَأَخَّى',
      '2d': 'تُتَأَخَّيَا',
      '3md': 'يُتَأَخَّيَا',
      '3fd': 'تُتَأَخَّيَا',
      '1p': 'نُتَأَخَّى',
      '2mp': 'تُتَأَخَّوْا',
      '2fp': 'تُتَأَخَّيْنَ',
      '3mp': 'يُتَأَخَّوْا',
      '3fp': 'يُتَأَخَّيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'xw-5")!, 'jussive')).toEqualT({
      '1s': 'أُتَأَخَّ',
      '2ms': 'تُتَأَخَّ',
      '2fs': 'تُتَأَخَّيْ',
      '3ms': 'يُتَأَخَّ',
      '3fs': 'تُتَأَخَّ',
      '2d': 'تُتَأَخَّيَا',
      '3md': 'يُتَأَخَّيَا',
      '3fd': 'تُتَأَخَّيَا',
      '1p': 'نُتَأَخَّ',
      '2mp': 'تُتَأَخَّوْا',
      '2fp': 'تُتَأَخَّيْنَ',
      '3mp': 'يُتَأَخَّوْا',
      '3fp': 'يُتَأَخَّيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'xw-5")!)).toEqualT('مُتَأَخٍّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'xw-5")!)).toEqualT('مُتَأَخًّى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'xw-5")!))).toEqualT(new Set(['تَأَخٍّ']))
  })
})
