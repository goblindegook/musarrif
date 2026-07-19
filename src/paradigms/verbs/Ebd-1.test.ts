import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Ebd-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ebd-1')!)).toEqualT({
      '1s': 'عَبَدْتُ',
      '2ms': 'عَبَدْتَ',
      '2fs': 'عَبَدْتِ',
      '3ms': 'عَبَدَ',
      '3fs': 'عَبَدَتْ',
      '2d': 'عَبَدْتُمَا',
      '3md': 'عَبَدَا',
      '3fd': 'عَبَدَتَا',
      '1p': 'عَبَدْنَا',
      '2mp': 'عَبَدْتُمْ',
      '2fp': 'عَبَدْتُنَّ',
      '3mp': 'عَبَدُوا',
      '3fp': 'عَبَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ebd-1')!, 'indicative')).toEqualT({
      '1s': 'أَعْبُدُ',
      '2ms': 'تَعْبُدُ',
      '2fs': 'تَعْبُدِينَ',
      '3ms': 'يَعْبُدُ',
      '3fs': 'تَعْبُدُ',
      '2d': 'تَعْبُدَانِ',
      '3md': 'يَعْبُدَانِ',
      '3fd': 'تَعْبُدَانِ',
      '1p': 'نَعْبُدُ',
      '2mp': 'تَعْبُدُونَ',
      '2fp': 'تَعْبُدْنَ',
      '3mp': 'يَعْبُدُونَ',
      '3fp': 'يَعْبُدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ebd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْبُدَ',
      '2ms': 'تَعْبُدَ',
      '2fs': 'تَعْبُدِي',
      '3ms': 'يَعْبُدَ',
      '3fs': 'تَعْبُدَ',
      '2d': 'تَعْبُدَا',
      '3md': 'يَعْبُدَا',
      '3fd': 'تَعْبُدَا',
      '1p': 'نَعْبُدَ',
      '2mp': 'تَعْبُدُوا',
      '2fp': 'تَعْبُدْنَ',
      '3mp': 'يَعْبُدُوا',
      '3fp': 'يَعْبُدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ebd-1')!, 'jussive')).toEqualT({
      '1s': 'أَعْبُدْ',
      '2ms': 'تَعْبُدْ',
      '2fs': 'تَعْبُدِي',
      '3ms': 'يَعْبُدْ',
      '3fs': 'تَعْبُدْ',
      '2d': 'تَعْبُدَا',
      '3md': 'يَعْبُدَا',
      '3fd': 'تَعْبُدَا',
      '1p': 'نَعْبُدْ',
      '2mp': 'تَعْبُدُوا',
      '2fp': 'تَعْبُدْنَ',
      '3mp': 'يَعْبُدُوا',
      '3fp': 'يَعْبُدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ebd-1')!)).toMatchObjectT({
      '2ms': 'اُعْبُدْ',
      '2fs': 'اُعْبُدِي',
      '2d': 'اُعْبُدَا',
      '2mp': 'اُعْبُدُوا',
      '2fp': 'اُعْبُدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Ebd-1')!)).toEqualT({
      '1s': 'عُبِدْتُ',
      '2ms': 'عُبِدْتَ',
      '2fs': 'عُبِدْتِ',
      '3ms': 'عُبِدَ',
      '3fs': 'عُبِدَتْ',
      '2d': 'عُبِدْتُمَا',
      '3md': 'عُبِدَا',
      '3fd': 'عُبِدَتَا',
      '1p': 'عُبِدْنَا',
      '2mp': 'عُبِدْتُمْ',
      '2fp': 'عُبِدْتُنَّ',
      '3mp': 'عُبِدُوا',
      '3fp': 'عُبِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ebd-1')!, 'indicative')).toEqualT({
      '1s': 'أُعْبَدُ',
      '2ms': 'تُعْبَدُ',
      '2fs': 'تُعْبَدِينَ',
      '3ms': 'يُعْبَدُ',
      '3fs': 'تُعْبَدُ',
      '2d': 'تُعْبَدَانِ',
      '3md': 'يُعْبَدَانِ',
      '3fd': 'تُعْبَدَانِ',
      '1p': 'نُعْبَدُ',
      '2mp': 'تُعْبَدُونَ',
      '2fp': 'تُعْبَدْنَ',
      '3mp': 'يُعْبَدُونَ',
      '3fp': 'يُعْبَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ebd-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْبَدَ',
      '2ms': 'تُعْبَدَ',
      '2fs': 'تُعْبَدِي',
      '3ms': 'يُعْبَدَ',
      '3fs': 'تُعْبَدَ',
      '2d': 'تُعْبَدَا',
      '3md': 'يُعْبَدَا',
      '3fd': 'تُعْبَدَا',
      '1p': 'نُعْبَدَ',
      '2mp': 'تُعْبَدُوا',
      '2fp': 'تُعْبَدْنَ',
      '3mp': 'يُعْبَدُوا',
      '3fp': 'يُعْبَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ebd-1')!, 'jussive')).toEqualT({
      '1s': 'أُعْبَدْ',
      '2ms': 'تُعْبَدْ',
      '2fs': 'تُعْبَدِي',
      '3ms': 'يُعْبَدْ',
      '3fs': 'تُعْبَدْ',
      '2d': 'تُعْبَدَا',
      '3md': 'يُعْبَدَا',
      '3fd': 'تُعْبَدَا',
      '1p': 'نُعْبَدْ',
      '2mp': 'تُعْبَدُوا',
      '2fp': 'تُعْبَدْنَ',
      '3mp': 'يُعْبَدُوا',
      '3fp': 'يُعْبَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ebd-1')!)).toEqualT('عَابِد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Ebd-1')!)).toEqualT('مَعْبُود')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Ebd-1')!)).toEqualT(['عِبَادَة', 'عُبُودَة', 'عُبُودِيَّة'])
  })
})
