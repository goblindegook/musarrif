import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'wy-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'wy-4")!)).toEqualT({
      '1s': 'آوَيْتُ',
      '2ms': 'آوَيْتَ',
      '2fs': 'آوَيْتِ',
      '3ms': 'آوَى',
      '3fs': 'آوَتْ',
      '2d': 'آوَيْتُمَا',
      '3md': 'آوَيَا',
      '3fd': 'آوَتَا',
      '1p': 'آوَيْنَا',
      '2mp': 'آوَيْتُمْ',
      '2fp': 'آوَيْتُنَّ',
      '3mp': 'آوَوْا',
      '3fp': 'آوَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'wy-4")!, 'indicative')).toEqualT({
      '1s': 'أُووِي',
      '2ms': 'تُؤْوِي',
      '2fs': 'تُؤْوِينَ',
      '3ms': 'يُؤْوِي',
      '3fs': 'تُؤْوِي',
      '2d': 'تُؤْوِيَانِ',
      '3md': 'يُؤْوِيَانِ',
      '3fd': 'تُؤْوِيَانِ',
      '1p': 'نُؤْوِي',
      '2mp': 'تُؤْوُونَ',
      '2fp': 'تُؤْوِينَ',
      '3mp': 'يُؤْوُونَ',
      '3fp': 'يُؤْوِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'wy-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُووِيَ',
      '2ms': 'تُؤْوِيَ',
      '2fs': 'تُؤْوِي',
      '3ms': 'يُؤْوِيَ',
      '3fs': 'تُؤْوِيَ',
      '2d': 'تُؤْوِيَا',
      '3md': 'يُؤْوِيَا',
      '3fd': 'تُؤْوِيَا',
      '1p': 'نُؤْوِيَ',
      '2mp': 'تُؤْوُوا',
      '2fp': 'تُؤْوِينَ',
      '3mp': 'يُؤْوُوا',
      '3fp': 'يُؤْوِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'wy-4")!, 'jussive')).toEqualT({
      '1s': 'أُووِ',
      '2ms': 'تُؤْوِ',
      '2fs': 'تُؤْوِي',
      '3ms': 'يُؤْوِ',
      '3fs': 'تُؤْوِ',
      '2d': 'تُؤْوِيَا',
      '3md': 'يُؤْوِيَا',
      '3fd': 'تُؤْوِيَا',
      '1p': 'نُؤْوِ',
      '2mp': 'تُؤْوُوا',
      '2fp': 'تُؤْوِينَ',
      '3mp': 'يُؤْوُوا',
      '3fp': 'يُؤْوِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'wy-4")!)).toMatchObjectT({
      '2ms': 'آوِ',
      '2fs': 'آوِي',
      '2d': 'آوِيَا',
      '2mp': 'آوُوا',
      '2fp': 'آوِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'wy-4")!)).toEqualT({
      '1s': 'أُووِيتُ',
      '2ms': 'أُووِيتَ',
      '2fs': 'أُووِيتِ',
      '3ms': 'أُووِيَ',
      '3fs': 'أُووِيَتْ',
      '2d': 'أُووِيتُمَا',
      '3md': 'أُووِيَا',
      '3fd': 'أُووِيَتَا',
      '1p': 'أُووِينَا',
      '2mp': 'أُووِيتُمْ',
      '2fp': 'أُووِيتُنَّ',
      '3mp': 'أُووُوا',
      '3fp': 'أُووِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wy-4")!, 'indicative')).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById("'wy-4")!, 'subjunctive')).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById("'wy-4")!, 'jussive')).toEqualT({
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
    expect(deriveActiveParticiple(getVerbById("'wy-4")!)).toEqualT('مُؤْوٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'wy-4")!)).toEqualT('مُؤْوًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'wy-4")!)).toEqualT(['إِيوَاء'])
  })
})
