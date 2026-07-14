import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ETy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ETy-4')!)).toEqualT({
      '1s': 'أَعْطَيْتُ',
      '2ms': 'أَعْطَيْتَ',
      '2fs': 'أَعْطَيْتِ',
      '3ms': 'أَعْطَى',
      '3fs': 'أَعْطَتْ',
      '2d': 'أَعْطَيْتُمَا',
      '3md': 'أَعْطَيَا',
      '3fd': 'أَعْطَتَا',
      '1p': 'أَعْطَيْنَا',
      '2mp': 'أَعْطَيْتُمْ',
      '2fp': 'أَعْطَيْتُنَّ',
      '3mp': 'أَعْطَوْا',
      '3fp': 'أَعْطَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ETy-4')!, 'indicative')).toEqualT({
      '1s': 'أُعْطِي',
      '2ms': 'تُعْطِي',
      '2fs': 'تُعْطِينَ',
      '3ms': 'يُعْطِي',
      '3fs': 'تُعْطِي',
      '2d': 'تُعْطِيَانِ',
      '3md': 'يُعْطِيَانِ',
      '3fd': 'تُعْطِيَانِ',
      '1p': 'نُعْطِي',
      '2mp': 'تُعْطُونَ',
      '2fp': 'تُعْطِينَ',
      '3mp': 'يُعْطُونَ',
      '3fp': 'يُعْطِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ETy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْطِيَ',
      '2ms': 'تُعْطِيَ',
      '2fs': 'تُعْطِي',
      '3ms': 'يُعْطِيَ',
      '3fs': 'تُعْطِيَ',
      '2d': 'تُعْطِيَا',
      '3md': 'يُعْطِيَا',
      '3fd': 'تُعْطِيَا',
      '1p': 'نُعْطِيَ',
      '2mp': 'تُعْطُوا',
      '2fp': 'تُعْطِينَ',
      '3mp': 'يُعْطُوا',
      '3fp': 'يُعْطِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ETy-4')!, 'jussive')).toEqualT({
      '1s': 'أُعْطِ',
      '2ms': 'تُعْطِ',
      '2fs': 'تُعْطِي',
      '3ms': 'يُعْطِ',
      '3fs': 'تُعْطِ',
      '2d': 'تُعْطِيَا',
      '3md': 'يُعْطِيَا',
      '3fd': 'تُعْطِيَا',
      '1p': 'نُعْطِ',
      '2mp': 'تُعْطُوا',
      '2fp': 'تُعْطِينَ',
      '3mp': 'يُعْطُوا',
      '3fp': 'يُعْطِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ETy-4')!)).toMatchObjectT({
      '2ms': 'أَعْطِ',
      '2fs': 'أَعْطِي',
      '2d': 'أَعْطِيَا',
      '2mp': 'أَعْطُوا',
      '2fp': 'أَعْطِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ETy-4')!)).toEqualT({
      '1s': 'أُعْطِيتُ',
      '2ms': 'أُعْطِيتَ',
      '2fs': 'أُعْطِيتِ',
      '3ms': 'أُعْطِيَ',
      '3fs': 'أُعْطِيَتْ',
      '2d': 'أُعْطِيتُمَا',
      '3md': 'أُعْطِيَا',
      '3fd': 'أُعْطِيَتَا',
      '1p': 'أُعْطِينَا',
      '2mp': 'أُعْطِيتُمْ',
      '2fp': 'أُعْطِيتُنَّ',
      '3mp': 'أُعْطُوا',
      '3fp': 'أُعْطِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ETy-4')!, 'indicative')).toEqualT({
      '1s': 'أُعْطَى',
      '2ms': 'تُعْطَى',
      '2fs': 'تُعْطَيْنَ',
      '3ms': 'يُعْطَى',
      '3fs': 'تُعْطَى',
      '2d': 'تُعْطَيَانِ',
      '3md': 'يُعْطَيَانِ',
      '3fd': 'تُعْطَيَانِ',
      '1p': 'نُعْطَى',
      '2mp': 'تُعْطَوْنَ',
      '2fp': 'تُعْطَيْنَ',
      '3mp': 'يُعْطَوْنَ',
      '3fp': 'يُعْطَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ETy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْطَى',
      '2ms': 'تُعْطَى',
      '2fs': 'تُعْطَيْ',
      '3ms': 'يُعْطَى',
      '3fs': 'تُعْطَى',
      '2d': 'تُعْطَيَا',
      '3md': 'يُعْطَيَا',
      '3fd': 'تُعْطَيَا',
      '1p': 'نُعْطَى',
      '2mp': 'تُعْطَوْا',
      '2fp': 'تُعْطَيْنَ',
      '3mp': 'يُعْطَوْا',
      '3fp': 'يُعْطَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ETy-4')!, 'jussive')).toEqualT({
      '1s': 'أُعْطَ',
      '2ms': 'تُعْطَ',
      '2fs': 'تُعْطَيْ',
      '3ms': 'يُعْطَ',
      '3fs': 'تُعْطَ',
      '2d': 'تُعْطَيَا',
      '3md': 'يُعْطَيَا',
      '3fd': 'تُعْطَيَا',
      '1p': 'نُعْطَ',
      '2mp': 'تُعْطَوْا',
      '2fp': 'تُعْطَيْنَ',
      '3mp': 'يُعْطَوْا',
      '3fp': 'يُعْطَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ETy-4')!)).toEqualT('مُعْطٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ETy-4')!)).toEqualT('مُعْطًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('ETy-4')!)).toEqualT(['إِعْطَاء', 'عَطَاء'])
  })
})
