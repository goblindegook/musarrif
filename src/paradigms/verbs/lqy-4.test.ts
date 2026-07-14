import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('lqy-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('lqy-4')!)).toEqualT({
      '1s': 'أَلْقَيْتُ',
      '2ms': 'أَلْقَيْتَ',
      '2fs': 'أَلْقَيْتِ',
      '3ms': 'أَلْقَى',
      '3fs': 'أَلْقَتْ',
      '2d': 'أَلْقَيْتُمَا',
      '3md': 'أَلْقَيَا',
      '3fd': 'أَلْقَتَا',
      '1p': 'أَلْقَيْنَا',
      '2mp': 'أَلْقَيْتُمْ',
      '2fp': 'أَلْقَيْتُنَّ',
      '3mp': 'أَلْقَوْا',
      '3fp': 'أَلْقَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('lqy-4')!, 'indicative')).toEqualT({
      '1s': 'أُلْقِي',
      '2ms': 'تُلْقِي',
      '2fs': 'تُلْقِينَ',
      '3ms': 'يُلْقِي',
      '3fs': 'تُلْقِي',
      '2d': 'تُلْقِيَانِ',
      '3md': 'يُلْقِيَانِ',
      '3fd': 'تُلْقِيَانِ',
      '1p': 'نُلْقِي',
      '2mp': 'تُلْقُونَ',
      '2fp': 'تُلْقِينَ',
      '3mp': 'يُلْقُونَ',
      '3fp': 'يُلْقِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('lqy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُلْقِيَ',
      '2ms': 'تُلْقِيَ',
      '2fs': 'تُلْقِي',
      '3ms': 'يُلْقِيَ',
      '3fs': 'تُلْقِيَ',
      '2d': 'تُلْقِيَا',
      '3md': 'يُلْقِيَا',
      '3fd': 'تُلْقِيَا',
      '1p': 'نُلْقِيَ',
      '2mp': 'تُلْقُوا',
      '2fp': 'تُلْقِينَ',
      '3mp': 'يُلْقُوا',
      '3fp': 'يُلْقِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('lqy-4')!, 'jussive')).toEqualT({
      '1s': 'أُلْقِ',
      '2ms': 'تُلْقِ',
      '2fs': 'تُلْقِي',
      '3ms': 'يُلْقِ',
      '3fs': 'تُلْقِ',
      '2d': 'تُلْقِيَا',
      '3md': 'يُلْقِيَا',
      '3fd': 'تُلْقِيَا',
      '1p': 'نُلْقِ',
      '2mp': 'تُلْقُوا',
      '2fp': 'تُلْقِينَ',
      '3mp': 'يُلْقُوا',
      '3fp': 'يُلْقِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('lqy-4')!)).toMatchObjectT({
      '2ms': 'أَلْقِ',
      '2fs': 'أَلْقِي',
      '2d': 'أَلْقِيَا',
      '2mp': 'أَلْقُوا',
      '2fp': 'أَلْقِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('lqy-4')!)).toEqualT({
      '1s': 'أُلْقِيتُ',
      '2ms': 'أُلْقِيتَ',
      '2fs': 'أُلْقِيتِ',
      '3ms': 'أُلْقِيَ',
      '3fs': 'أُلْقِيَتْ',
      '2d': 'أُلْقِيتُمَا',
      '3md': 'أُلْقِيَا',
      '3fd': 'أُلْقِيَتَا',
      '1p': 'أُلْقِينَا',
      '2mp': 'أُلْقِيتُمْ',
      '2fp': 'أُلْقِيتُنَّ',
      '3mp': 'أُلْقُوا',
      '3fp': 'أُلْقِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('lqy-4')!, 'indicative')).toEqualT({
      '1s': 'أُلْقَى',
      '2ms': 'تُلْقَى',
      '2fs': 'تُلْقَيْنَ',
      '3ms': 'يُلْقَى',
      '3fs': 'تُلْقَى',
      '2d': 'تُلْقَيَانِ',
      '3md': 'يُلْقَيَانِ',
      '3fd': 'تُلْقَيَانِ',
      '1p': 'نُلْقَى',
      '2mp': 'تُلْقَوْنَ',
      '2fp': 'تُلْقَيْنَ',
      '3mp': 'يُلْقَوْنَ',
      '3fp': 'يُلْقَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('lqy-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُلْقَى',
      '2ms': 'تُلْقَى',
      '2fs': 'تُلْقَيْ',
      '3ms': 'يُلْقَى',
      '3fs': 'تُلْقَى',
      '2d': 'تُلْقَيَا',
      '3md': 'يُلْقَيَا',
      '3fd': 'تُلْقَيَا',
      '1p': 'نُلْقَى',
      '2mp': 'تُلْقَوْا',
      '2fp': 'تُلْقَيْنَ',
      '3mp': 'يُلْقَوْا',
      '3fp': 'يُلْقَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('lqy-4')!, 'jussive')).toEqualT({
      '1s': 'أُلْقَ',
      '2ms': 'تُلْقَ',
      '2fs': 'تُلْقَيْ',
      '3ms': 'يُلْقَ',
      '3fs': 'تُلْقَ',
      '2d': 'تُلْقَيَا',
      '3md': 'يُلْقَيَا',
      '3fd': 'تُلْقَيَا',
      '1p': 'نُلْقَ',
      '2mp': 'تُلْقَوْا',
      '2fp': 'تُلْقَيْنَ',
      '3mp': 'يُلْقَوْا',
      '3fp': 'يُلْقَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('lqy-4')!)).toEqualT('مُلْقٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('lqy-4')!)).toEqualT('مُلْقًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('lqy-4')!)).toEqualT(['إِلْقَاء'])
  })
})
