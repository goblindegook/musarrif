import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Dmn-5', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Dmn-5')!)).toEqualT({
      '1s': 'تَضَمَّنْتُ',
      '2ms': 'تَضَمَّنْتَ',
      '2fs': 'تَضَمَّنْتِ',
      '3ms': 'تَضَمَّنَ',
      '3fs': 'تَضَمَّنَتْ',
      '2d': 'تَضَمَّنْتُمَا',
      '3md': 'تَضَمَّنَا',
      '3fd': 'تَضَمَّنَتَا',
      '1p': 'تَضَمَّنَّا',
      '2mp': 'تَضَمَّنْتُمْ',
      '2fp': 'تَضَمَّنْتُنَّ',
      '3mp': 'تَضَمَّنُوا',
      '3fp': 'تَضَمَّنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Dmn-5')!, 'indicative')).toEqualT({
      '1s': 'أَتَضَمَّنُ',
      '2ms': 'تَتَضَمَّنُ',
      '2fs': 'تَتَضَمَّنِينَ',
      '3ms': 'يَتَضَمَّنُ',
      '3fs': 'تَتَضَمَّنُ',
      '2d': 'تَتَضَمَّنَانِ',
      '3md': 'يَتَضَمَّنَانِ',
      '3fd': 'تَتَضَمَّنَانِ',
      '1p': 'نَتَضَمَّنُ',
      '2mp': 'تَتَضَمَّنُونَ',
      '2fp': 'تَتَضَمَّنَّ',
      '3mp': 'يَتَضَمَّنُونَ',
      '3fp': 'يَتَضَمَّنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Dmn-5')!, 'subjunctive')).toEqualT({
      '1s': 'أَتَضَمَّنَ',
      '2ms': 'تَتَضَمَّنَ',
      '2fs': 'تَتَضَمَّنِي',
      '3ms': 'يَتَضَمَّنَ',
      '3fs': 'تَتَضَمَّنَ',
      '2d': 'تَتَضَمَّنَا',
      '3md': 'يَتَضَمَّنَا',
      '3fd': 'تَتَضَمَّنَا',
      '1p': 'نَتَضَمَّنَ',
      '2mp': 'تَتَضَمَّنُوا',
      '2fp': 'تَتَضَمَّنَّ',
      '3mp': 'يَتَضَمَّنُوا',
      '3fp': 'يَتَضَمَّنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Dmn-5')!, 'jussive')).toEqualT({
      '1s': 'أَتَضَمَّنْ',
      '2ms': 'تَتَضَمَّنْ',
      '2fs': 'تَتَضَمَّنِي',
      '3ms': 'يَتَضَمَّنْ',
      '3fs': 'تَتَضَمَّنْ',
      '2d': 'تَتَضَمَّنَا',
      '3md': 'يَتَضَمَّنَا',
      '3fd': 'تَتَضَمَّنَا',
      '1p': 'نَتَضَمَّنْ',
      '2mp': 'تَتَضَمَّنُوا',
      '2fp': 'تَتَضَمَّنَّ',
      '3mp': 'يَتَضَمَّنُوا',
      '3fp': 'يَتَضَمَّنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Dmn-5')!)).toMatchObjectT({
      '2ms': 'تَضَمَّنْ',
      '2fs': 'تَضَمَّنِي',
      '2d': 'تَضَمَّنَا',
      '2mp': 'تَضَمَّنُوا',
      '2fp': 'تَضَمَّنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Dmn-5')!)).toEqualT({
      '1s': 'تُضُمِّنْتُ',
      '2ms': 'تُضُمِّنْتَ',
      '2fs': 'تُضُمِّنْتِ',
      '3ms': 'تُضُمِّنَ',
      '3fs': 'تُضُمِّنَتْ',
      '2d': 'تُضُمِّنْتُمَا',
      '3md': 'تُضُمِّنَا',
      '3fd': 'تُضُمِّنَتَا',
      '1p': 'تُضُمِّنَّا',
      '2mp': 'تُضُمِّنْتُمْ',
      '2fp': 'تُضُمِّنْتُنَّ',
      '3mp': 'تُضُمِّنُوا',
      '3fp': 'تُضُمِّنَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dmn-5')!, 'indicative')).toEqualT({
      '1s': 'أُتَضَمَّنُ',
      '2ms': 'تُتَضَمَّنُ',
      '2fs': 'تُتَضَمَّنِينَ',
      '3ms': 'يُتَضَمَّنُ',
      '3fs': 'تُتَضَمَّنُ',
      '2d': 'تُتَضَمَّنَانِ',
      '3md': 'يُتَضَمَّنَانِ',
      '3fd': 'تُتَضَمَّنَانِ',
      '1p': 'نُتَضَمَّنُ',
      '2mp': 'تُتَضَمَّنُونَ',
      '2fp': 'تُتَضَمَّنَّ',
      '3mp': 'يُتَضَمَّنُونَ',
      '3fp': 'يُتَضَمَّنَّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dmn-5')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَضَمَّنَ',
      '2ms': 'تُتَضَمَّنَ',
      '2fs': 'تُتَضَمَّنِي',
      '3ms': 'يُتَضَمَّنَ',
      '3fs': 'تُتَضَمَّنَ',
      '2d': 'تُتَضَمَّنَا',
      '3md': 'يُتَضَمَّنَا',
      '3fd': 'تُتَضَمَّنَا',
      '1p': 'نُتَضَمَّنَ',
      '2mp': 'تُتَضَمَّنُوا',
      '2fp': 'تُتَضَمَّنَّ',
      '3mp': 'يُتَضَمَّنُوا',
      '3fp': 'يُتَضَمَّنَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Dmn-5')!, 'jussive')).toEqualT({
      '1s': 'أُتَضَمَّنْ',
      '2ms': 'تُتَضَمَّنْ',
      '2fs': 'تُتَضَمَّنِي',
      '3ms': 'يُتَضَمَّنْ',
      '3fs': 'تُتَضَمَّنْ',
      '2d': 'تُتَضَمَّنَا',
      '3md': 'يُتَضَمَّنَا',
      '3fd': 'تُتَضَمَّنَا',
      '1p': 'نُتَضَمَّنْ',
      '2mp': 'تُتَضَمَّنُوا',
      '2fp': 'تُتَضَمَّنَّ',
      '3mp': 'يُتَضَمَّنُوا',
      '3fp': 'يُتَضَمَّنَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Dmn-5')!)).toEqualT('مُتَضَمِّن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Dmn-5')!)).toEqualT('مُتَضَمَّن')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Dmn-5')!)).toEqualT(['تَضَمُّن'])
  })
})
