import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('byt-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('byt-1')!)).toEqualT({
      '1s': 'بِتُّ',
      '2ms': 'بِتَّ',
      '2fs': 'بِتِّ',
      '3ms': 'بَاتَ',
      '3fs': 'بَاتَتْ',
      '2d': 'بِتُّمَا',
      '3md': 'بَاتَا',
      '3fd': 'بَاتَتَا',
      '1p': 'بِتْنَا',
      '2mp': 'بِتُّمْ',
      '2fp': 'بِتُّنَّ',
      '3mp': 'بَاتُوا',
      '3fp': 'بِتْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('byt-1')!, 'indicative')).toEqualT({
      '1s': 'أَبِيتُ',
      '2ms': 'تَبِيتُ',
      '2fs': 'تَبِيتِينَ',
      '3ms': 'يَبِيتُ',
      '3fs': 'تَبِيتُ',
      '2d': 'تَبِيتَانِ',
      '3md': 'يَبِيتَانِ',
      '3fd': 'تَبِيتَانِ',
      '1p': 'نَبِيتُ',
      '2mp': 'تَبِيتُونَ',
      '2fp': 'تَبِتْنَ',
      '3mp': 'يَبِيتُونَ',
      '3fp': 'يَبِتْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('byt-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَبِيتَ',
      '2ms': 'تَبِيتَ',
      '2fs': 'تَبِيتِي',
      '3ms': 'يَبِيتَ',
      '3fs': 'تَبِيتَ',
      '2d': 'تَبِيتَا',
      '3md': 'يَبِيتَا',
      '3fd': 'تَبِيتَا',
      '1p': 'نَبِيتَ',
      '2mp': 'تَبِيتُوا',
      '2fp': 'تَبِتْنَ',
      '3mp': 'يَبِيتُوا',
      '3fp': 'يَبِتْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('byt-1')!, 'jussive')).toEqualT({
      '1s': 'أَبِتْ',
      '2ms': 'تَبِتْ',
      '2fs': 'تَبِيتِي',
      '3ms': 'يَبِتْ',
      '3fs': 'تَبِتْ',
      '2d': 'تَبِيتَا',
      '3md': 'يَبِيتَا',
      '3fd': 'تَبِيتَا',
      '1p': 'نَبِتْ',
      '2mp': 'تَبِيتُوا',
      '2fp': 'تَبِتْنَ',
      '3mp': 'يَبِيتُوا',
      '3fp': 'يَبِتْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('byt-1')!)).toMatchObjectT({
      '2ms': 'بِتْ',
      '2fs': 'بِيتِي',
      '2d': 'بِيتَا',
      '2mp': 'بِيتُوا',
      '2fp': 'بِتْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('byt-1')!)).toMatchObjectT({
      '3ms': 'بِيتَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('byt-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُبَاتُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('byt-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُبَاتَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('byt-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُبَتْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('byt-1')!)).toEqualT('بَائِت')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('byt-1')!)).toEqualT('مَبِيت')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('byt-1')!)).toEqualT(['مَبِيت', 'بَيَات'])
  })
})
