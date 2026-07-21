import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mkv-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mkv-1')!)).toEqualT({
      '1s': 'مَكَثْتُ',
      '2ms': 'مَكَثْتَ',
      '2fs': 'مَكَثْتِ',
      '3ms': 'مَكَثَ',
      '3fs': 'مَكَثَتْ',
      '2d': 'مَكَثْتُمَا',
      '3md': 'مَكَثَا',
      '3fd': 'مَكَثَتَا',
      '1p': 'مَكَثْنَا',
      '2mp': 'مَكَثْتُمْ',
      '2fp': 'مَكَثْتُنَّ',
      '3mp': 'مَكَثُوا',
      '3fp': 'مَكَثْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mkv-1')!, 'indicative')).toEqualT({
      '1s': 'أَمْكُثُ',
      '2ms': 'تَمْكُثُ',
      '2fs': 'تَمْكُثِينَ',
      '3ms': 'يَمْكُثُ',
      '3fs': 'تَمْكُثُ',
      '2d': 'تَمْكُثَانِ',
      '3md': 'يَمْكُثَانِ',
      '3fd': 'تَمْكُثَانِ',
      '1p': 'نَمْكُثُ',
      '2mp': 'تَمْكُثُونَ',
      '2fp': 'تَمْكُثْنَ',
      '3mp': 'يَمْكُثُونَ',
      '3fp': 'يَمْكُثْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mkv-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَمْكُثَ',
      '2ms': 'تَمْكُثَ',
      '2fs': 'تَمْكُثِي',
      '3ms': 'يَمْكُثَ',
      '3fs': 'تَمْكُثَ',
      '2d': 'تَمْكُثَا',
      '3md': 'يَمْكُثَا',
      '3fd': 'تَمْكُثَا',
      '1p': 'نَمْكُثَ',
      '2mp': 'تَمْكُثُوا',
      '2fp': 'تَمْكُثْنَ',
      '3mp': 'يَمْكُثُوا',
      '3fp': 'يَمْكُثْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mkv-1')!, 'jussive')).toEqualT({
      '1s': 'أَمْكُثْ',
      '2ms': 'تَمْكُثْ',
      '2fs': 'تَمْكُثِي',
      '3ms': 'يَمْكُثْ',
      '3fs': 'تَمْكُثْ',
      '2d': 'تَمْكُثَا',
      '3md': 'يَمْكُثَا',
      '3fd': 'تَمْكُثَا',
      '1p': 'نَمْكُثْ',
      '2mp': 'تَمْكُثُوا',
      '2fp': 'تَمْكُثْنَ',
      '3mp': 'يَمْكُثُوا',
      '3fp': 'يَمْكُثْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mkv-1')!)).toMatchObjectT({
      '2ms': 'اُمْكُثْ',
      '2fs': 'اُمْكُثِي',
      '2d': 'اُمْكُثَا',
      '2mp': 'اُمْكُثُوا',
      '2fp': 'اُمْكُثْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mkv-1')!)).toMatchObjectT({
      '3ms': 'مُكِثَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mkv-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُمْكَثُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mkv-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُمْكَثَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mkv-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُمْكَثْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mkv-1')!)).toEqualT('مَاكِث')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mkv-1')!)).toEqualT('مَمْكُوث')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mkv-1')!)).toEqualT(['مَكْث', 'مُكْث', 'مُكُوث', 'مَكَاث', 'مَكَاثَة'])
  })
})
