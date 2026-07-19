import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('lwm-10', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('lwm-10')!)).toEqualT({
      '1s': 'اِسْتَلَمْتُ',
      '2ms': 'اِسْتَلَمْتَ',
      '2fs': 'اِسْتَلَمْتِ',
      '3ms': 'اِسْتَلَامَ',
      '3fs': 'اِسْتَلَامَتْ',
      '2d': 'اِسْتَلَمْتُمَا',
      '3md': 'اِسْتَلَامَا',
      '3fd': 'اِسْتَلَامَتَا',
      '1p': 'اِسْتَلَمْنَا',
      '2mp': 'اِسْتَلَمْتُمْ',
      '2fp': 'اِسْتَلَمْتُنَّ',
      '3mp': 'اِسْتَلَامُوا',
      '3fp': 'اِسْتَلَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('lwm-10')!, 'indicative')).toEqualT({
      '1s': 'أَسْتَلِيمُ',
      '2ms': 'تَسْتَلِيمُ',
      '2fs': 'تَسْتَلِيمِينَ',
      '3ms': 'يَسْتَلِيمُ',
      '3fs': 'تَسْتَلِيمُ',
      '2d': 'تَسْتَلِيمَانِ',
      '3md': 'يَسْتَلِيمَانِ',
      '3fd': 'تَسْتَلِيمَانِ',
      '1p': 'نَسْتَلِيمُ',
      '2mp': 'تَسْتَلِيمُونَ',
      '2fp': 'تَسْتَلِمْنَ',
      '3mp': 'يَسْتَلِيمُونَ',
      '3fp': 'يَسْتَلِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('lwm-10')!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَلِيمَ',
      '2ms': 'تَسْتَلِيمَ',
      '2fs': 'تَسْتَلِيمِي',
      '3ms': 'يَسْتَلِيمَ',
      '3fs': 'تَسْتَلِيمَ',
      '2d': 'تَسْتَلِيمَا',
      '3md': 'يَسْتَلِيمَا',
      '3fd': 'تَسْتَلِيمَا',
      '1p': 'نَسْتَلِيمَ',
      '2mp': 'تَسْتَلِيمُوا',
      '2fp': 'تَسْتَلِمْنَ',
      '3mp': 'يَسْتَلِيمُوا',
      '3fp': 'يَسْتَلِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('lwm-10')!, 'jussive')).toEqualT({
      '1s': 'أَسْتَلِمْ',
      '2ms': 'تَسْتَلِمْ',
      '2fs': 'تَسْتَلِيمِي',
      '3ms': 'يَسْتَلِمْ',
      '3fs': 'تَسْتَلِمْ',
      '2d': 'تَسْتَلِيمَا',
      '3md': 'يَسْتَلِيمَا',
      '3fd': 'تَسْتَلِيمَا',
      '1p': 'نَسْتَلِمْ',
      '2mp': 'تَسْتَلِيمُوا',
      '2fp': 'تَسْتَلِمْنَ',
      '3mp': 'يَسْتَلِيمُوا',
      '3fp': 'يَسْتَلِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('lwm-10')!)).toMatchObjectT({
      '2ms': 'اِسْتَلِمْ',
      '2fs': 'اِسْتَلِيمِي',
      '2d': 'اِسْتَلِيمَا',
      '2mp': 'اِسْتَلِيمُوا',
      '2fp': 'اِسْتَلِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('lwm-10')!)).toEqualT({
      '1s': 'اُسْتُلِمْتُ',
      '2ms': 'اُسْتُلِمْتَ',
      '2fs': 'اُسْتُلِمْتِ',
      '3ms': 'اُسْتُلِيمَ',
      '3fs': 'اُسْتُلِيمَتْ',
      '2d': 'اُسْتُلِمْتُمَا',
      '3md': 'اُسْتُلِيمَا',
      '3fd': 'اُسْتُلِيمَتَا',
      '1p': 'اُسْتُلِمْنَا',
      '2mp': 'اُسْتُلِمْتُمْ',
      '2fp': 'اُسْتُلِمْتُنَّ',
      '3mp': 'اُسْتُلِيمُوا',
      '3fp': 'اُسْتُلِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('lwm-10')!, 'indicative')).toEqualT({
      '1s': 'أُسْتَلَامُ',
      '2ms': 'تُسْتَلَامُ',
      '2fs': 'تُسْتَلَامِينَ',
      '3ms': 'يُسْتَلَامُ',
      '3fs': 'تُسْتَلَامُ',
      '2d': 'تُسْتَلَامَانِ',
      '3md': 'يُسْتَلَامَانِ',
      '3fd': 'تُسْتَلَامَانِ',
      '1p': 'نُسْتَلَامُ',
      '2mp': 'تُسْتَلَامُونَ',
      '2fp': 'تُسْتَلَمْنَ',
      '3mp': 'يُسْتَلَامُونَ',
      '3fp': 'يُسْتَلَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('lwm-10')!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَلَامَ',
      '2ms': 'تُسْتَلَامَ',
      '2fs': 'تُسْتَلَامِي',
      '3ms': 'يُسْتَلَامَ',
      '3fs': 'تُسْتَلَامَ',
      '2d': 'تُسْتَلَامَا',
      '3md': 'يُسْتَلَامَا',
      '3fd': 'تُسْتَلَامَا',
      '1p': 'نُسْتَلَامَ',
      '2mp': 'تُسْتَلَامُوا',
      '2fp': 'تُسْتَلَمْنَ',
      '3mp': 'يُسْتَلَامُوا',
      '3fp': 'يُسْتَلَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('lwm-10')!, 'jussive')).toEqualT({
      '1s': 'أُسْتَلَمْ',
      '2ms': 'تُسْتَلَمْ',
      '2fs': 'تُسْتَلَامِي',
      '3ms': 'يُسْتَلَمْ',
      '3fs': 'تُسْتَلَمْ',
      '2d': 'تُسْتَلَامَا',
      '3md': 'يُسْتَلَامَا',
      '3fd': 'تُسْتَلَامَا',
      '1p': 'نُسْتَلَمْ',
      '2mp': 'تُسْتَلَامُوا',
      '2fp': 'تُسْتَلَمْنَ',
      '3mp': 'يُسْتَلَامُوا',
      '3fp': 'يُسْتَلَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('lwm-10')!)).toEqualT('مُسْتَلِيم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('lwm-10')!)).toEqualT('مُسْتَلَام')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('lwm-10')!)).toEqualT(['اِسْتِلَامَة'])
  })
})
