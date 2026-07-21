import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('glb-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('glb-1')!)).toEqualT({
      '1s': 'غَلَبْتُ',
      '2ms': 'غَلَبْتَ',
      '2fs': 'غَلَبْتِ',
      '3ms': 'غَلَبَ',
      '3fs': 'غَلَبَتْ',
      '2d': 'غَلَبْتُمَا',
      '3md': 'غَلَبَا',
      '3fd': 'غَلَبَتَا',
      '1p': 'غَلَبْنَا',
      '2mp': 'غَلَبْتُمْ',
      '2fp': 'غَلَبْتُنَّ',
      '3mp': 'غَلَبُوا',
      '3fp': 'غَلَبْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('glb-1')!, 'indicative')).toEqualT({
      '1s': 'أَغْلِبُ',
      '2ms': 'تَغْلِبُ',
      '2fs': 'تَغْلِبِينَ',
      '3ms': 'يَغْلِبُ',
      '3fs': 'تَغْلِبُ',
      '2d': 'تَغْلِبَانِ',
      '3md': 'يَغْلِبَانِ',
      '3fd': 'تَغْلِبَانِ',
      '1p': 'نَغْلِبُ',
      '2mp': 'تَغْلِبُونَ',
      '2fp': 'تَغْلِبْنَ',
      '3mp': 'يَغْلِبُونَ',
      '3fp': 'يَغْلِبْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('glb-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَغْلِبَ',
      '2ms': 'تَغْلِبَ',
      '2fs': 'تَغْلِبِي',
      '3ms': 'يَغْلِبَ',
      '3fs': 'تَغْلِبَ',
      '2d': 'تَغْلِبَا',
      '3md': 'يَغْلِبَا',
      '3fd': 'تَغْلِبَا',
      '1p': 'نَغْلِبَ',
      '2mp': 'تَغْلِبُوا',
      '2fp': 'تَغْلِبْنَ',
      '3mp': 'يَغْلِبُوا',
      '3fp': 'يَغْلِبْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('glb-1')!, 'jussive')).toEqualT({
      '1s': 'أَغْلِبْ',
      '2ms': 'تَغْلِبْ',
      '2fs': 'تَغْلِبِي',
      '3ms': 'يَغْلِبْ',
      '3fs': 'تَغْلِبْ',
      '2d': 'تَغْلِبَا',
      '3md': 'يَغْلِبَا',
      '3fd': 'تَغْلِبَا',
      '1p': 'نَغْلِبْ',
      '2mp': 'تَغْلِبُوا',
      '2fp': 'تَغْلِبْنَ',
      '3mp': 'يَغْلِبُوا',
      '3fp': 'يَغْلِبْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('glb-1')!)).toMatchObjectT({
      '2ms': 'اِغْلِبْ',
      '2fs': 'اِغْلِبِي',
      '2d': 'اِغْلِبَا',
      '2mp': 'اِغْلِبُوا',
      '2fp': 'اِغْلِبْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('glb-1')!)).toEqualT({
      '1s': 'غُلِبْتُ',
      '2ms': 'غُلِبْتَ',
      '2fs': 'غُلِبْتِ',
      '3ms': 'غُلِبَ',
      '3fs': 'غُلِبَتْ',
      '2d': 'غُلِبْتُمَا',
      '3md': 'غُلِبَا',
      '3fd': 'غُلِبَتَا',
      '1p': 'غُلِبْنَا',
      '2mp': 'غُلِبْتُمْ',
      '2fp': 'غُلِبْتُنَّ',
      '3mp': 'غُلِبُوا',
      '3fp': 'غُلِبْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('glb-1')!, 'indicative')).toEqualT({
      '1s': 'أُغْلَبُ',
      '2ms': 'تُغْلَبُ',
      '2fs': 'تُغْلَبِينَ',
      '3ms': 'يُغْلَبُ',
      '3fs': 'تُغْلَبُ',
      '2d': 'تُغْلَبَانِ',
      '3md': 'يُغْلَبَانِ',
      '3fd': 'تُغْلَبَانِ',
      '1p': 'نُغْلَبُ',
      '2mp': 'تُغْلَبُونَ',
      '2fp': 'تُغْلَبْنَ',
      '3mp': 'يُغْلَبُونَ',
      '3fp': 'يُغْلَبْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('glb-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُغْلَبَ',
      '2ms': 'تُغْلَبَ',
      '2fs': 'تُغْلَبِي',
      '3ms': 'يُغْلَبَ',
      '3fs': 'تُغْلَبَ',
      '2d': 'تُغْلَبَا',
      '3md': 'يُغْلَبَا',
      '3fd': 'تُغْلَبَا',
      '1p': 'نُغْلَبَ',
      '2mp': 'تُغْلَبُوا',
      '2fp': 'تُغْلَبْنَ',
      '3mp': 'يُغْلَبُوا',
      '3fp': 'يُغْلَبْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('glb-1')!, 'jussive')).toEqualT({
      '1s': 'أُغْلَبْ',
      '2ms': 'تُغْلَبْ',
      '2fs': 'تُغْلَبِي',
      '3ms': 'يُغْلَبْ',
      '3fs': 'تُغْلَبْ',
      '2d': 'تُغْلَبَا',
      '3md': 'يُغْلَبَا',
      '3fd': 'تُغْلَبَا',
      '1p': 'نُغْلَبْ',
      '2mp': 'تُغْلَبُوا',
      '2fp': 'تُغْلَبْنَ',
      '3mp': 'يُغْلَبُوا',
      '3fp': 'يُغْلَبْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('glb-1')!)).toEqualT('غَالِب')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('glb-1')!)).toEqualT('مَغْلُوب')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('glb-1')!))).toEqualT(
      new Set(['غَلَب', 'غَلْب', 'غَلَبَة', 'مَغْلَب', 'مَغْلَبَة', 'غَلَابِيَة', 'غُلُبَّى', 'غِلِبَّى', 'غُلُبَّة', 'غَلُبَّة']),
    )
  })
})
