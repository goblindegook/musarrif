import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wqf-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wqf-4')!)).toEqualT({
      '1s': 'أَوْقَفْتُ',
      '2ms': 'أَوْقَفْتَ',
      '2fs': 'أَوْقَفْتِ',
      '3ms': 'أَوْقَفَ',
      '3fs': 'أَوْقَفَتْ',
      '2d': 'أَوْقَفْتُمَا',
      '3md': 'أَوْقَفَا',
      '3fd': 'أَوْقَفَتَا',
      '1p': 'أَوْقَفْنَا',
      '2mp': 'أَوْقَفْتُمْ',
      '2fp': 'أَوْقَفْتُنَّ',
      '3mp': 'أَوْقَفُوا',
      '3fp': 'أَوْقَفْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wqf-4')!, 'indicative')).toEqualT({
      '1s': 'أُوقِفُ',
      '2ms': 'تُوقِفُ',
      '2fs': 'تُوقِفِينَ',
      '3ms': 'يُوقِفُ',
      '3fs': 'تُوقِفُ',
      '2d': 'تُوقِفَانِ',
      '3md': 'يُوقِفَانِ',
      '3fd': 'تُوقِفَانِ',
      '1p': 'نُوقِفُ',
      '2mp': 'تُوقِفُونَ',
      '2fp': 'تُوقِفْنَ',
      '3mp': 'يُوقِفُونَ',
      '3fp': 'يُوقِفْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wqf-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوقِفَ',
      '2ms': 'تُوقِفَ',
      '2fs': 'تُوقِفِي',
      '3ms': 'يُوقِفَ',
      '3fs': 'تُوقِفَ',
      '2d': 'تُوقِفَا',
      '3md': 'يُوقِفَا',
      '3fd': 'تُوقِفَا',
      '1p': 'نُوقِفَ',
      '2mp': 'تُوقِفُوا',
      '2fp': 'تُوقِفْنَ',
      '3mp': 'يُوقِفُوا',
      '3fp': 'يُوقِفْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wqf-4')!, 'jussive')).toEqualT({
      '1s': 'أُوقِفْ',
      '2ms': 'تُوقِفْ',
      '2fs': 'تُوقِفِي',
      '3ms': 'يُوقِفْ',
      '3fs': 'تُوقِفْ',
      '2d': 'تُوقِفَا',
      '3md': 'يُوقِفَا',
      '3fd': 'تُوقِفَا',
      '1p': 'نُوقِفْ',
      '2mp': 'تُوقِفُوا',
      '2fp': 'تُوقِفْنَ',
      '3mp': 'يُوقِفُوا',
      '3fp': 'يُوقِفْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wqf-4')!)).toMatchObjectT({
      '2ms': 'أَوْقِفْ',
      '2fs': 'أَوْقِفِي',
      '2d': 'أَوْقِفَا',
      '2mp': 'أَوْقِفُوا',
      '2fp': 'أَوْقِفْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wqf-4')!)).toEqualT({
      '1s': 'أُوقِفْتُ',
      '2ms': 'أُوقِفْتَ',
      '2fs': 'أُوقِفْتِ',
      '3ms': 'أُوقِفَ',
      '3fs': 'أُوقِفَتْ',
      '2d': 'أُوقِفْتُمَا',
      '3md': 'أُوقِفَا',
      '3fd': 'أُوقِفَتَا',
      '1p': 'أُوقِفْنَا',
      '2mp': 'أُوقِفْتُمْ',
      '2fp': 'أُوقِفْتُنَّ',
      '3mp': 'أُوقِفُوا',
      '3fp': 'أُوقِفْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqf-4')!, 'indicative')).toEqualT({
      '1s': 'أُوقَفُ',
      '2ms': 'تُوقَفُ',
      '2fs': 'تُوقَفِينَ',
      '3ms': 'يُوقَفُ',
      '3fs': 'تُوقَفُ',
      '2d': 'تُوقَفَانِ',
      '3md': 'يُوقَفَانِ',
      '3fd': 'تُوقَفَانِ',
      '1p': 'نُوقَفُ',
      '2mp': 'تُوقَفُونَ',
      '2fp': 'تُوقَفْنَ',
      '3mp': 'يُوقَفُونَ',
      '3fp': 'يُوقَفْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqf-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوقَفَ',
      '2ms': 'تُوقَفَ',
      '2fs': 'تُوقَفِي',
      '3ms': 'يُوقَفَ',
      '3fs': 'تُوقَفَ',
      '2d': 'تُوقَفَا',
      '3md': 'يُوقَفَا',
      '3fd': 'تُوقَفَا',
      '1p': 'نُوقَفَ',
      '2mp': 'تُوقَفُوا',
      '2fp': 'تُوقَفْنَ',
      '3mp': 'يُوقَفُوا',
      '3fp': 'يُوقَفْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqf-4')!, 'jussive')).toEqualT({
      '1s': 'أُوقَفْ',
      '2ms': 'تُوقَفْ',
      '2fs': 'تُوقَفِي',
      '3ms': 'يُوقَفْ',
      '3fs': 'تُوقَفْ',
      '2d': 'تُوقَفَا',
      '3md': 'يُوقَفَا',
      '3fd': 'تُوقَفَا',
      '1p': 'نُوقَفْ',
      '2mp': 'تُوقَفُوا',
      '2fp': 'تُوقَفْنَ',
      '3mp': 'يُوقَفُوا',
      '3fp': 'يُوقَفْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wqf-4')!)).toEqualT('مُوقِف')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wqf-4')!)).toEqualT('مُوقَف')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wqf-4')!)).toEqualT(['إِيقَاف'])
  })
})
