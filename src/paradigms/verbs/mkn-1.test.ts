import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mkn-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mkn-1')!)).toEqualT({
      '1s': 'مَكُنْتُ',
      '2ms': 'مَكُنْتَ',
      '2fs': 'مَكُنْتِ',
      '3ms': 'مَكُنَ',
      '3fs': 'مَكُنَتْ',
      '2d': 'مَكُنْتُمَا',
      '3md': 'مَكُنَا',
      '3fd': 'مَكُنَتَا',
      '1p': 'مَكُنَّا',
      '2mp': 'مَكُنْتُمْ',
      '2fp': 'مَكُنْتُنَّ',
      '3mp': 'مَكُنُوا',
      '3fp': 'مَكُنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mkn-1')!, 'indicative')).toEqualT({
      '1s': 'أَمْكُنُ',
      '2ms': 'تَمْكُنُ',
      '2fs': 'تَمْكُنِينَ',
      '3ms': 'يَمْكُنُ',
      '3fs': 'تَمْكُنُ',
      '2d': 'تَمْكُنَانِ',
      '3md': 'يَمْكُنَانِ',
      '3fd': 'تَمْكُنَانِ',
      '1p': 'نَمْكُنُ',
      '2mp': 'تَمْكُنُونَ',
      '2fp': 'تَمْكُنَّ',
      '3mp': 'يَمْكُنُونَ',
      '3fp': 'يَمْكُنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mkn-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَمْكُنَ',
      '2ms': 'تَمْكُنَ',
      '2fs': 'تَمْكُنِي',
      '3ms': 'يَمْكُنَ',
      '3fs': 'تَمْكُنَ',
      '2d': 'تَمْكُنَا',
      '3md': 'يَمْكُنَا',
      '3fd': 'تَمْكُنَا',
      '1p': 'نَمْكُنَ',
      '2mp': 'تَمْكُنُوا',
      '2fp': 'تَمْكُنَّ',
      '3mp': 'يَمْكُنُوا',
      '3fp': 'يَمْكُنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mkn-1')!, 'jussive')).toEqualT({
      '1s': 'أَمْكُنْ',
      '2ms': 'تَمْكُنْ',
      '2fs': 'تَمْكُنِي',
      '3ms': 'يَمْكُنْ',
      '3fs': 'تَمْكُنْ',
      '2d': 'تَمْكُنَا',
      '3md': 'يَمْكُنَا',
      '3fd': 'تَمْكُنَا',
      '1p': 'نَمْكُنْ',
      '2mp': 'تَمْكُنُوا',
      '2fp': 'تَمْكُنَّ',
      '3mp': 'يَمْكُنُوا',
      '3fp': 'يَمْكُنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mkn-1')!)).toMatchObjectT({
      '2ms': 'اُمْكُنْ',
      '2fs': 'اُمْكُنِي',
      '2d': 'اُمْكُنَا',
      '2mp': 'اُمْكُنُوا',
      '2fp': 'اُمْكُنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mkn-1')!)).toMatchObjectT({
      '3ms': 'مُكِنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mkn-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُمْكَنُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mkn-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُمْكَنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mkn-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُمْكَنْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mkn-1')!)).toEqualT('مَكِين')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mkn-1')!)).toEqualT('مَمْكُون')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mkn-1')!)).toEqualT(['مَكَانَة'])
  })
})
