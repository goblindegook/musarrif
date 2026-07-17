import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wSl-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wSl-4')!)).toEqualT({
      '1s': 'أَوْصَلْتُ',
      '2ms': 'أَوْصَلْتَ',
      '2fs': 'أَوْصَلْتِ',
      '3ms': 'أَوْصَلَ',
      '3fs': 'أَوْصَلَتْ',
      '2d': 'أَوْصَلْتُمَا',
      '3md': 'أَوْصَلَا',
      '3fd': 'أَوْصَلَتَا',
      '1p': 'أَوْصَلْنَا',
      '2mp': 'أَوْصَلْتُمْ',
      '2fp': 'أَوْصَلْتُنَّ',
      '3mp': 'أَوْصَلُوا',
      '3fp': 'أَوْصَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wSl-4')!, 'indicative')).toEqualT({
      '1s': 'أُوصِلُ',
      '2ms': 'تُوصِلُ',
      '2fs': 'تُوصِلِينَ',
      '3ms': 'يُوصِلُ',
      '3fs': 'تُوصِلُ',
      '2d': 'تُوصِلَانِ',
      '3md': 'يُوصِلَانِ',
      '3fd': 'تُوصِلَانِ',
      '1p': 'نُوصِلُ',
      '2mp': 'تُوصِلُونَ',
      '2fp': 'تُوصِلْنَ',
      '3mp': 'يُوصِلُونَ',
      '3fp': 'يُوصِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wSl-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوصِلَ',
      '2ms': 'تُوصِلَ',
      '2fs': 'تُوصِلِي',
      '3ms': 'يُوصِلَ',
      '3fs': 'تُوصِلَ',
      '2d': 'تُوصِلَا',
      '3md': 'يُوصِلَا',
      '3fd': 'تُوصِلَا',
      '1p': 'نُوصِلَ',
      '2mp': 'تُوصِلُوا',
      '2fp': 'تُوصِلْنَ',
      '3mp': 'يُوصِلُوا',
      '3fp': 'يُوصِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wSl-4')!, 'jussive')).toEqualT({
      '1s': 'أُوصِلْ',
      '2ms': 'تُوصِلْ',
      '2fs': 'تُوصِلِي',
      '3ms': 'يُوصِلْ',
      '3fs': 'تُوصِلْ',
      '2d': 'تُوصِلَا',
      '3md': 'يُوصِلَا',
      '3fd': 'تُوصِلَا',
      '1p': 'نُوصِلْ',
      '2mp': 'تُوصِلُوا',
      '2fp': 'تُوصِلْنَ',
      '3mp': 'يُوصِلُوا',
      '3fp': 'يُوصِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wSl-4')!)).toMatchObjectT({
      '2ms': 'أَوْصِلْ',
      '2fs': 'أَوْصِلِي',
      '2d': 'أَوْصِلَا',
      '2mp': 'أَوْصِلُوا',
      '2fp': 'أَوْصِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wSl-4')!)).toEqualT({
      '1s': 'أُوصِلْتُ',
      '2ms': 'أُوصِلْتَ',
      '2fs': 'أُوصِلْتِ',
      '3ms': 'أُوصِلَ',
      '3fs': 'أُوصِلَتْ',
      '2d': 'أُوصِلْتُمَا',
      '3md': 'أُوصِلَا',
      '3fd': 'أُوصِلَتَا',
      '1p': 'أُوصِلْنَا',
      '2mp': 'أُوصِلْتُمْ',
      '2fp': 'أُوصِلْتُنَّ',
      '3mp': 'أُوصِلُوا',
      '3fp': 'أُوصِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSl-4')!, 'indicative')).toEqualT({
      '1s': 'أُوصَلُ',
      '2ms': 'تُوصَلُ',
      '2fs': 'تُوصَلِينَ',
      '3ms': 'يُوصَلُ',
      '3fs': 'تُوصَلُ',
      '2d': 'تُوصَلَانِ',
      '3md': 'يُوصَلَانِ',
      '3fd': 'تُوصَلَانِ',
      '1p': 'نُوصَلُ',
      '2mp': 'تُوصَلُونَ',
      '2fp': 'تُوصَلْنَ',
      '3mp': 'يُوصَلُونَ',
      '3fp': 'يُوصَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSl-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوصَلَ',
      '2ms': 'تُوصَلَ',
      '2fs': 'تُوصَلِي',
      '3ms': 'يُوصَلَ',
      '3fs': 'تُوصَلَ',
      '2d': 'تُوصَلَا',
      '3md': 'يُوصَلَا',
      '3fd': 'تُوصَلَا',
      '1p': 'نُوصَلَ',
      '2mp': 'تُوصَلُوا',
      '2fp': 'تُوصَلْنَ',
      '3mp': 'يُوصَلُوا',
      '3fp': 'يُوصَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wSl-4')!, 'jussive')).toEqualT({
      '1s': 'أُوصَلْ',
      '2ms': 'تُوصَلْ',
      '2fs': 'تُوصَلِي',
      '3ms': 'يُوصَلْ',
      '3fs': 'تُوصَلْ',
      '2d': 'تُوصَلَا',
      '3md': 'يُوصَلَا',
      '3fd': 'تُوصَلَا',
      '1p': 'نُوصَلْ',
      '2mp': 'تُوصَلُوا',
      '2fp': 'تُوصَلْنَ',
      '3mp': 'يُوصَلُوا',
      '3fp': 'يُوصَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wSl-4')!)).toEqualT('مُوصِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wSl-4')!)).toEqualT('مُوصَل')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wSl-4')!)).toEqualT(['إِيصَال'])
  })
})
