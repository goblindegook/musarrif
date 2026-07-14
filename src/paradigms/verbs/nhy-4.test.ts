import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('nhy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('nhy-4')!)).toEqualT({
      '1s': 'أَنْهَيْتُ',
      '2ms': 'أَنْهَيْتَ',
      '2fs': 'أَنْهَيْتِ',
      '3ms': 'أَنْهَى',
      '3fs': 'أَنْهَتْ',
      '2d': 'أَنْهَيْتُمَا',
      '3md': 'أَنْهَيَا',
      '3fd': 'أَنْهَتَا',
      '1p': 'أَنْهَيْنَا',
      '2mp': 'أَنْهَيْتُمْ',
      '2fp': 'أَنْهَيْتُنَّ',
      '3mp': 'أَنْهَوْا',
      '3fp': 'أَنْهَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('nhy-4')!, 'indicative')).toEqualT({
      '1s': 'أُنْهِي',
      '2ms': 'تُنْهِي',
      '2fs': 'تُنْهِينَ',
      '3ms': 'يُنْهِي',
      '3fs': 'تُنْهِي',
      '2d': 'تُنْهِيَانِ',
      '3md': 'يُنْهِيَانِ',
      '3fd': 'تُنْهِيَانِ',
      '1p': 'نُنْهِي',
      '2mp': 'تُنْهُونَ',
      '2fp': 'تُنْهِينَ',
      '3mp': 'يُنْهُونَ',
      '3fp': 'يُنْهِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('nhy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُنْهِيَ',
      '2ms': 'تُنْهِيَ',
      '2fs': 'تُنْهِي',
      '3ms': 'يُنْهِيَ',
      '3fs': 'تُنْهِيَ',
      '2d': 'تُنْهِيَا',
      '3md': 'يُنْهِيَا',
      '3fd': 'تُنْهِيَا',
      '1p': 'نُنْهِيَ',
      '2mp': 'تُنْهُوا',
      '2fp': 'تُنْهِينَ',
      '3mp': 'يُنْهُوا',
      '3fp': 'يُنْهِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('nhy-4')!, 'jussive')).toEqualT({
      '1s': 'أُنْهِ',
      '2ms': 'تُنْهِ',
      '2fs': 'تُنْهِي',
      '3ms': 'يُنْهِ',
      '3fs': 'تُنْهِ',
      '2d': 'تُنْهِيَا',
      '3md': 'يُنْهِيَا',
      '3fd': 'تُنْهِيَا',
      '1p': 'نُنْهِ',
      '2mp': 'تُنْهُوا',
      '2fp': 'تُنْهِينَ',
      '3mp': 'يُنْهُوا',
      '3fp': 'يُنْهِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('nhy-4')!)).toMatchObjectT({
      '2ms': 'أَنْهِ',
      '2fs': 'أَنْهِي',
      '2d': 'أَنْهِيَا',
      '2mp': 'أَنْهُوا',
      '2fp': 'أَنْهِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('nhy-4')!)).toEqualT({
      '1s': 'أُنْهِيتُ',
      '2ms': 'أُنْهِيتَ',
      '2fs': 'أُنْهِيتِ',
      '3ms': 'أُنْهِيَ',
      '3fs': 'أُنْهِيَتْ',
      '2d': 'أُنْهِيتُمَا',
      '3md': 'أُنْهِيَا',
      '3fd': 'أُنْهِيَتَا',
      '1p': 'أُنْهِينَا',
      '2mp': 'أُنْهِيتُمْ',
      '2fp': 'أُنْهِيتُنَّ',
      '3mp': 'أُنْهُوا',
      '3fp': 'أُنْهِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('nhy-4')!, 'indicative')).toEqualT({
      '1s': 'أُنْهَى',
      '2ms': 'تُنْهَى',
      '2fs': 'تُنْهَيْنَ',
      '3ms': 'يُنْهَى',
      '3fs': 'تُنْهَى',
      '2d': 'تُنْهَيَانِ',
      '3md': 'يُنْهَيَانِ',
      '3fd': 'تُنْهَيَانِ',
      '1p': 'نُنْهَى',
      '2mp': 'تُنْهَوْنَ',
      '2fp': 'تُنْهَيْنَ',
      '3mp': 'يُنْهَوْنَ',
      '3fp': 'يُنْهَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('nhy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُنْهَى',
      '2ms': 'تُنْهَى',
      '2fs': 'تُنْهَيْ',
      '3ms': 'يُنْهَى',
      '3fs': 'تُنْهَى',
      '2d': 'تُنْهَيَا',
      '3md': 'يُنْهَيَا',
      '3fd': 'تُنْهَيَا',
      '1p': 'نُنْهَى',
      '2mp': 'تُنْهَوْا',
      '2fp': 'تُنْهَيْنَ',
      '3mp': 'يُنْهَوْا',
      '3fp': 'يُنْهَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('nhy-4')!, 'jussive')).toEqualT({
      '1s': 'أُنْهَ',
      '2ms': 'تُنْهَ',
      '2fs': 'تُنْهَيْ',
      '3ms': 'يُنْهَ',
      '3fs': 'تُنْهَ',
      '2d': 'تُنْهَيَا',
      '3md': 'يُنْهَيَا',
      '3fd': 'تُنْهَيَا',
      '1p': 'نُنْهَ',
      '2mp': 'تُنْهَوْا',
      '2fp': 'تُنْهَيْنَ',
      '3mp': 'يُنْهَوْا',
      '3fp': 'يُنْهَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('nhy-4')!)).toEqualT('مُنْهٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('nhy-4')!)).toEqualT('مُنْهًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('nhy-4')!)).toEqualT(['إِنْهَاء'])
  })
})
