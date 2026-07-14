import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('bqy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('bqy-4')!)).toEqualT({
      '1s': 'أَبْقَيْتُ',
      '2ms': 'أَبْقَيْتَ',
      '2fs': 'أَبْقَيْتِ',
      '3ms': 'أَبْقَى',
      '3fs': 'أَبْقَتْ',
      '2d': 'أَبْقَيْتُمَا',
      '3md': 'أَبْقَيَا',
      '3fd': 'أَبْقَتَا',
      '1p': 'أَبْقَيْنَا',
      '2mp': 'أَبْقَيْتُمْ',
      '2fp': 'أَبْقَيْتُنَّ',
      '3mp': 'أَبْقَوْا',
      '3fp': 'أَبْقَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('bqy-4')!, 'indicative')).toEqualT({
      '1s': 'أُبْقِي',
      '2ms': 'تُبْقِي',
      '2fs': 'تُبْقِينَ',
      '3ms': 'يُبْقِي',
      '3fs': 'تُبْقِي',
      '2d': 'تُبْقِيَانِ',
      '3md': 'يُبْقِيَانِ',
      '3fd': 'تُبْقِيَانِ',
      '1p': 'نُبْقِي',
      '2mp': 'تُبْقُونَ',
      '2fp': 'تُبْقِينَ',
      '3mp': 'يُبْقُونَ',
      '3fp': 'يُبْقِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('bqy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُبْقِيَ',
      '2ms': 'تُبْقِيَ',
      '2fs': 'تُبْقِي',
      '3ms': 'يُبْقِيَ',
      '3fs': 'تُبْقِيَ',
      '2d': 'تُبْقِيَا',
      '3md': 'يُبْقِيَا',
      '3fd': 'تُبْقِيَا',
      '1p': 'نُبْقِيَ',
      '2mp': 'تُبْقُوا',
      '2fp': 'تُبْقِينَ',
      '3mp': 'يُبْقُوا',
      '3fp': 'يُبْقِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('bqy-4')!, 'jussive')).toEqualT({
      '1s': 'أُبْقِ',
      '2ms': 'تُبْقِ',
      '2fs': 'تُبْقِي',
      '3ms': 'يُبْقِ',
      '3fs': 'تُبْقِ',
      '2d': 'تُبْقِيَا',
      '3md': 'يُبْقِيَا',
      '3fd': 'تُبْقِيَا',
      '1p': 'نُبْقِ',
      '2mp': 'تُبْقُوا',
      '2fp': 'تُبْقِينَ',
      '3mp': 'يُبْقُوا',
      '3fp': 'يُبْقِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('bqy-4')!)).toMatchObjectT({
      '2ms': 'أَبْقِ',
      '2fs': 'أَبْقِي',
      '2d': 'أَبْقِيَا',
      '2mp': 'أَبْقُوا',
      '2fp': 'أَبْقِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('bqy-4')!)).toEqualT({
      '1s': 'أُبْقِيتُ',
      '2ms': 'أُبْقِيتَ',
      '2fs': 'أُبْقِيتِ',
      '3ms': 'أُبْقِيَ',
      '3fs': 'أُبْقِيَتْ',
      '2d': 'أُبْقِيتُمَا',
      '3md': 'أُبْقِيَا',
      '3fd': 'أُبْقِيَتَا',
      '1p': 'أُبْقِينَا',
      '2mp': 'أُبْقِيتُمْ',
      '2fp': 'أُبْقِيتُنَّ',
      '3mp': 'أُبْقُوا',
      '3fp': 'أُبْقِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('bqy-4')!, 'indicative')).toEqualT({
      '1s': 'أُبْقَى',
      '2ms': 'تُبْقَى',
      '2fs': 'تُبْقَيْنَ',
      '3ms': 'يُبْقَى',
      '3fs': 'تُبْقَى',
      '2d': 'تُبْقَيَانِ',
      '3md': 'يُبْقَيَانِ',
      '3fd': 'تُبْقَيَانِ',
      '1p': 'نُبْقَى',
      '2mp': 'تُبْقَوْنَ',
      '2fp': 'تُبْقَيْنَ',
      '3mp': 'يُبْقَوْنَ',
      '3fp': 'يُبْقَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('bqy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُبْقَى',
      '2ms': 'تُبْقَى',
      '2fs': 'تُبْقَيْ',
      '3ms': 'يُبْقَى',
      '3fs': 'تُبْقَى',
      '2d': 'تُبْقَيَا',
      '3md': 'يُبْقَيَا',
      '3fd': 'تُبْقَيَا',
      '1p': 'نُبْقَى',
      '2mp': 'تُبْقَوْا',
      '2fp': 'تُبْقَيْنَ',
      '3mp': 'يُبْقَوْا',
      '3fp': 'يُبْقَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('bqy-4')!, 'jussive')).toEqualT({
      '1s': 'أُبْقَ',
      '2ms': 'تُبْقَ',
      '2fs': 'تُبْقَيْ',
      '3ms': 'يُبْقَ',
      '3fs': 'تُبْقَ',
      '2d': 'تُبْقَيَا',
      '3md': 'يُبْقَيَا',
      '3fd': 'تُبْقَيَا',
      '1p': 'نُبْقَ',
      '2mp': 'تُبْقَوْا',
      '2fp': 'تُبْقَيْنَ',
      '3mp': 'يُبْقَوْا',
      '3fp': 'يُبْقَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('bqy-4')!)).toEqualT('مُبْقٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('bqy-4')!)).toEqualT('مُبْقًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('bqy-4')!)).toEqualT(['إِبْقَاء'])
  })
})
