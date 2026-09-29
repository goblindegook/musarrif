import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'lw-4 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'lw-4")!)).toEqualT({
      '1s': 'آلَيْتُ',
      '2ms': 'آلَيْتَ',
      '2fs': 'آلَيْتِ',
      '3ms': 'آلَى',
      '3fs': 'آلَتْ',
      '2d': 'آلَيْتُمَا',
      '3md': 'آلَيَا',
      '3fd': 'آلَتَا',
      '1p': 'آلَيْنَا',
      '2mp': 'آلَيْتُمْ',
      '2fp': 'آلَيْتُنَّ',
      '3mp': 'آلَوْا',
      '3fp': 'آلَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'lw-4")!, 'indicative')).toEqualT({
      '1s': 'أُولِي',
      '2ms': 'تُؤْلِي',
      '2fs': 'تُؤْلِينَ',
      '3ms': 'يُؤْلِي',
      '3fs': 'تُؤْلِي',
      '2d': 'تُؤْلِيَانِ',
      '3md': 'يُؤْلِيَانِ',
      '3fd': 'تُؤْلِيَانِ',
      '1p': 'نُؤْلِي',
      '2mp': 'تُؤْلُونَ',
      '2fp': 'تُؤْلِينَ',
      '3mp': 'يُؤْلُونَ',
      '3fp': 'يُؤْلِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'lw-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُولِيَ',
      '2ms': 'تُؤْلِيَ',
      '2fs': 'تُؤْلِي',
      '3ms': 'يُؤْلِيَ',
      '3fs': 'تُؤْلِيَ',
      '2d': 'تُؤْلِيَا',
      '3md': 'يُؤْلِيَا',
      '3fd': 'تُؤْلِيَا',
      '1p': 'نُؤْلِيَ',
      '2mp': 'تُؤْلُوا',
      '2fp': 'تُؤْلِينَ',
      '3mp': 'يُؤْلُوا',
      '3fp': 'يُؤْلِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'lw-4")!, 'jussive')).toEqualT({
      '1s': 'أُولِ',
      '2ms': 'تُؤْلِ',
      '2fs': 'تُؤْلِي',
      '3ms': 'يُؤْلِ',
      '3fs': 'تُؤْلِ',
      '2d': 'تُؤْلِيَا',
      '3md': 'يُؤْلِيَا',
      '3fd': 'تُؤْلِيَا',
      '1p': 'نُؤْلِ',
      '2mp': 'تُؤْلُوا',
      '2fp': 'تُؤْلِينَ',
      '3mp': 'يُؤْلُوا',
      '3fp': 'يُؤْلِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'lw-4")!)).toMatchObjectT({
      '2ms': 'آلِ',
      '2fs': 'آلِي',
      '2d': 'آلِيَا',
      '2mp': 'آلُوا',
      '2fp': 'آلِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'lw-4")!)).toEqualT({
      '1s': 'أُولِيتُ',
      '2ms': 'أُولِيتَ',
      '2fs': 'أُولِيتِ',
      '3ms': 'أُولِيَ',
      '3fs': 'أُولِيَتْ',
      '2d': 'أُولِيتُمَا',
      '3md': 'أُولِيَا',
      '3fd': 'أُولِيَتَا',
      '1p': 'أُولِينَا',
      '2mp': 'أُولِيتُمْ',
      '2fp': 'أُولِيتُنَّ',
      '3mp': 'أُولُوا',
      '3fp': 'أُولِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lw-4")!, 'indicative')).toEqualT({
      '1s': 'أُولَى',
      '2ms': 'تُؤْلَى',
      '2fs': 'تُؤْلَيْنَ',
      '3ms': 'يُؤْلَى',
      '3fs': 'تُؤْلَى',
      '2d': 'تُؤْلَيَانِ',
      '3md': 'يُؤْلَيَانِ',
      '3fd': 'تُؤْلَيَانِ',
      '1p': 'نُؤْلَى',
      '2mp': 'تُؤْلَوْنَ',
      '2fp': 'تُؤْلَيْنَ',
      '3mp': 'يُؤْلَوْنَ',
      '3fp': 'يُؤْلَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lw-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُولَى',
      '2ms': 'تُؤْلَى',
      '2fs': 'تُؤْلَيْ',
      '3ms': 'يُؤْلَى',
      '3fs': 'تُؤْلَى',
      '2d': 'تُؤْلَيَا',
      '3md': 'يُؤْلَيَا',
      '3fd': 'تُؤْلَيَا',
      '1p': 'نُؤْلَى',
      '2mp': 'تُؤْلَوْا',
      '2fp': 'تُؤْلَيْنَ',
      '3mp': 'يُؤْلَوْا',
      '3fp': 'يُؤْلَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'lw-4")!, 'jussive')).toEqualT({
      '1s': 'أُولَ',
      '2ms': 'تُؤْلَ',
      '2fs': 'تُؤْلَيْ',
      '3ms': 'يُؤْلَ',
      '3fs': 'تُؤْلَ',
      '2d': 'تُؤْلَيَا',
      '3md': 'يُؤْلَيَا',
      '3fd': 'تُؤْلَيَا',
      '1p': 'نُؤْلَ',
      '2mp': 'تُؤْلَوْا',
      '2fp': 'تُؤْلَيْنَ',
      '3mp': 'يُؤْلَوْا',
      '3fp': 'يُؤْلَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'lw-4")!)).toEqualT('مُؤْلٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'lw-4")!)).toEqualT('مُؤْلًى')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'lw-4")!))).toEqualT(new Set(['إِيلَاء']))
  })
})
