import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mlk-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mlk-1')!)).toEqualT({
      '1s': 'مَلَكْتُ',
      '2ms': 'مَلَكْتَ',
      '2fs': 'مَلَكْتِ',
      '3ms': 'مَلَكَ',
      '3fs': 'مَلَكَتْ',
      '2d': 'مَلَكْتُمَا',
      '3md': 'مَلَكَا',
      '3fd': 'مَلَكَتَا',
      '1p': 'مَلَكْنَا',
      '2mp': 'مَلَكْتُمْ',
      '2fp': 'مَلَكْتُنَّ',
      '3mp': 'مَلَكُوا',
      '3fp': 'مَلَكْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mlk-1')!, 'indicative')).toEqualT({
      '1s': 'أَمْلِكُ',
      '2ms': 'تَمْلِكُ',
      '2fs': 'تَمْلِكِينَ',
      '3ms': 'يَمْلِكُ',
      '3fs': 'تَمْلِكُ',
      '2d': 'تَمْلِكَانِ',
      '3md': 'يَمْلِكَانِ',
      '3fd': 'تَمْلِكَانِ',
      '1p': 'نَمْلِكُ',
      '2mp': 'تَمْلِكُونَ',
      '2fp': 'تَمْلِكْنَ',
      '3mp': 'يَمْلِكُونَ',
      '3fp': 'يَمْلِكْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mlk-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَمْلِكَ',
      '2ms': 'تَمْلِكَ',
      '2fs': 'تَمْلِكِي',
      '3ms': 'يَمْلِكَ',
      '3fs': 'تَمْلِكَ',
      '2d': 'تَمْلِكَا',
      '3md': 'يَمْلِكَا',
      '3fd': 'تَمْلِكَا',
      '1p': 'نَمْلِكَ',
      '2mp': 'تَمْلِكُوا',
      '2fp': 'تَمْلِكْنَ',
      '3mp': 'يَمْلِكُوا',
      '3fp': 'يَمْلِكْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mlk-1')!, 'jussive')).toEqualT({
      '1s': 'أَمْلِكْ',
      '2ms': 'تَمْلِكْ',
      '2fs': 'تَمْلِكِي',
      '3ms': 'يَمْلِكْ',
      '3fs': 'تَمْلِكْ',
      '2d': 'تَمْلِكَا',
      '3md': 'يَمْلِكَا',
      '3fd': 'تَمْلِكَا',
      '1p': 'نَمْلِكْ',
      '2mp': 'تَمْلِكُوا',
      '2fp': 'تَمْلِكْنَ',
      '3mp': 'يَمْلِكُوا',
      '3fp': 'يَمْلِكْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mlk-1')!)).toMatchObjectT({
      '2ms': 'اِمْلِكْ',
      '2fs': 'اِمْلِكِي',
      '2d': 'اِمْلِكَا',
      '2mp': 'اِمْلِكُوا',
      '2fp': 'اِمْلِكْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mlk-1')!)).toEqualT({
      '1s': 'مُلِكْتُ',
      '2ms': 'مُلِكْتَ',
      '2fs': 'مُلِكْتِ',
      '3ms': 'مُلِكَ',
      '3fs': 'مُلِكَتْ',
      '2d': 'مُلِكْتُمَا',
      '3md': 'مُلِكَا',
      '3fd': 'مُلِكَتَا',
      '1p': 'مُلِكْنَا',
      '2mp': 'مُلِكْتُمْ',
      '2fp': 'مُلِكْتُنَّ',
      '3mp': 'مُلِكُوا',
      '3fp': 'مُلِكْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mlk-1')!, 'indicative')).toEqualT({
      '1s': 'أُمْلَكُ',
      '2ms': 'تُمْلَكُ',
      '2fs': 'تُمْلَكِينَ',
      '3ms': 'يُمْلَكُ',
      '3fs': 'تُمْلَكُ',
      '2d': 'تُمْلَكَانِ',
      '3md': 'يُمْلَكَانِ',
      '3fd': 'تُمْلَكَانِ',
      '1p': 'نُمْلَكُ',
      '2mp': 'تُمْلَكُونَ',
      '2fp': 'تُمْلَكْنَ',
      '3mp': 'يُمْلَكُونَ',
      '3fp': 'يُمْلَكْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mlk-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُمْلَكَ',
      '2ms': 'تُمْلَكَ',
      '2fs': 'تُمْلَكِي',
      '3ms': 'يُمْلَكَ',
      '3fs': 'تُمْلَكَ',
      '2d': 'تُمْلَكَا',
      '3md': 'يُمْلَكَا',
      '3fd': 'تُمْلَكَا',
      '1p': 'نُمْلَكَ',
      '2mp': 'تُمْلَكُوا',
      '2fp': 'تُمْلَكْنَ',
      '3mp': 'يُمْلَكُوا',
      '3fp': 'يُمْلَكْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mlk-1')!, 'jussive')).toEqualT({
      '1s': 'أُمْلَكْ',
      '2ms': 'تُمْلَكْ',
      '2fs': 'تُمْلَكِي',
      '3ms': 'يُمْلَكْ',
      '3fs': 'تُمْلَكْ',
      '2d': 'تُمْلَكَا',
      '3md': 'يُمْلَكَا',
      '3fd': 'تُمْلَكَا',
      '1p': 'نُمْلَكْ',
      '2mp': 'تُمْلَكُوا',
      '2fp': 'تُمْلَكْنَ',
      '3mp': 'يُمْلَكُوا',
      '3fp': 'يُمْلَكْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mlk-1')!)).toEqualT('مَالِك')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mlk-1')!)).toEqualT('مَمْلُوك')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mlk-1')!)).toEqualT(['مَلْك', 'مِلْك', 'مُلْك', 'مَلَكَة', 'مَمْلُكَة', 'مَمْلِكَة', 'مَمْلَكَة'])
  })
})
