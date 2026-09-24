import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'wy-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'wy-1")!)).toEqualT({
      '1s': 'أَوَيْتُ',
      '2ms': 'أَوَيْتَ',
      '2fs': 'أَوَيْتِ',
      '3ms': 'أَوَى',
      '3fs': 'أَوَتْ',
      '2d': 'أَوَيْتُمَا',
      '3md': 'أَوَيَا',
      '3fd': 'أَوَتَا',
      '1p': 'أَوَيْنَا',
      '2mp': 'أَوَيْتُمْ',
      '2fp': 'أَوَيْتُنَّ',
      '3mp': 'أَوَوْا',
      '3fp': 'أَوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'wy-1")!, 'indicative')).toEqualT({
      '1s': 'آوِي',
      '2ms': 'تَأْوِي',
      '2fs': 'تَأْوِينَ',
      '3ms': 'يَأْوِي',
      '3fs': 'تَأْوِي',
      '2d': 'تَأْوِيَانِ',
      '3md': 'يَأْوِيَانِ',
      '3fd': 'تَأْوِيَانِ',
      '1p': 'نَأْوِي',
      '2mp': 'تَأْوُونَ',
      '2fp': 'تَأْوِينَ',
      '3mp': 'يَأْوُونَ',
      '3fp': 'يَأْوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'wy-1")!, 'subjunctive')).toEqualT({
      '1s': 'آوِيَ',
      '2ms': 'تَأْوِيَ',
      '2fs': 'تَأْوِي',
      '3ms': 'يَأْوِيَ',
      '3fs': 'تَأْوِيَ',
      '2d': 'تَأْوِيَا',
      '3md': 'يَأْوِيَا',
      '3fd': 'تَأْوِيَا',
      '1p': 'نَأْوِيَ',
      '2mp': 'تَأْوُوا',
      '2fp': 'تَأْوِينَ',
      '3mp': 'يَأْوُوا',
      '3fp': 'يَأْوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'wy-1")!, 'jussive')).toEqualT({
      '1s': 'آوِ',
      '2ms': 'تَأْوِ',
      '2fs': 'تَأْوِي',
      '3ms': 'يَأْوِ',
      '3fs': 'تَأْوِ',
      '2d': 'تَأْوِيَا',
      '3md': 'يَأْوِيَا',
      '3fd': 'تَأْوِيَا',
      '1p': 'نَأْوِ',
      '2mp': 'تَأْوُوا',
      '2fp': 'تَأْوِينَ',
      '3mp': 'يَأْوُوا',
      '3fp': 'يَأْوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'wy-1")!)).toMatchObjectT({
      '2ms': 'اِئْوِ',
      '2fs': 'اِئْوِي',
      '2d': 'اِئْوِيَا',
      '2mp': 'اِئْوُوا',
      '2fp': 'اِئْوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'wy-1")!)).toEqualT({
      '1s': 'أُوِيتُ',
      '2ms': 'أُوِيتَ',
      '2fs': 'أُوِيتِ',
      '3ms': 'أُوِيَ',
      '3fs': 'أُوِيَتْ',
      '2d': 'أُوِيتُمَا',
      '3md': 'أُوِيَا',
      '3fd': 'أُوِيَتَا',
      '1p': 'أُوِينَا',
      '2mp': 'أُوِيتُمْ',
      '2fp': 'أُوِيتُنَّ',
      '3mp': 'أُوُوا',
      '3fp': 'أُوِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-1")!, 'indicative')).toEqualT({
      '1s': 'أُووَى',
      '2ms': 'تُؤْوَى',
      '2fs': 'تُؤْوَيْنَ',
      '3ms': 'يُؤْوَى',
      '3fs': 'تُؤْوَى',
      '2d': 'تُؤْوَيَانِ',
      '3md': 'يُؤْوَيَانِ',
      '3fd': 'تُؤْوَيَانِ',
      '1p': 'نُؤْوَى',
      '2mp': 'تُؤْوَوْنَ',
      '2fp': 'تُؤْوَيْنَ',
      '3mp': 'يُؤْوَوْنَ',
      '3fp': 'يُؤْوَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُووَى',
      '2ms': 'تُؤْوَى',
      '2fs': 'تُؤْوَيْ',
      '3ms': 'يُؤْوَى',
      '3fs': 'تُؤْوَى',
      '2d': 'تُؤْوَيَا',
      '3md': 'يُؤْوَيَا',
      '3fd': 'تُؤْوَيَا',
      '1p': 'نُؤْوَى',
      '2mp': 'تُؤْوَوْا',
      '2fp': 'تُؤْوَيْنَ',
      '3mp': 'يُؤْوَوْا',
      '3fp': 'يُؤْوَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-1")!, 'jussive')).toEqualT({
      '1s': 'أُووَ',
      '2ms': 'تُؤْوَ',
      '2fs': 'تُؤْوَيْ',
      '3ms': 'يُؤْوَ',
      '3fs': 'تُؤْوَ',
      '2d': 'تُؤْوَيَا',
      '3md': 'يُؤْوَيَا',
      '3fd': 'تُؤْوَيَا',
      '1p': 'نُؤْوَ',
      '2mp': 'تُؤْوَوْا',
      '2fp': 'تُؤْوَيْنَ',
      '3mp': 'يُؤْوَوْا',
      '3fp': 'يُؤْوَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'wy-1")!)).toEqualT('آوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'wy-1")!)).toEqualT('مَأْوِيّ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'wy-1")!))).toEqualT(new Set(['إِوِيّ', 'أُوِيّ', 'إِوَاء']))
  })
})
