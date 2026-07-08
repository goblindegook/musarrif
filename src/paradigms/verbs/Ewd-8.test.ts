import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Ewd-8', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ewd-8')!)).toEqualT({
      '1s': 'اِعْتَدْتُ',
      '2ms': 'اِعْتَدْتَ',
      '2fs': 'اِعْتَدْتِ',
      '3ms': 'اِعْتَادَ',
      '3fs': 'اِعْتَادَتْ',
      '2d': 'اِعْتَدْتُمَا',
      '3md': 'اِعْتَادَا',
      '3fd': 'اِعْتَادَتَا',
      '1p': 'اِعْتَدْنَا',
      '2mp': 'اِعْتَدْتُمْ',
      '2fp': 'اِعْتَدْتُنَّ',
      '3mp': 'اِعْتَادُوا',
      '3fp': 'اِعْتَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ewd-8')!, 'indicative')).toEqualT({
      '1s': 'أَعْتَادُ',
      '2ms': 'تَعْتَادُ',
      '2fs': 'تَعْتَادِينَ',
      '3ms': 'يَعْتَادُ',
      '3fs': 'تَعْتَادُ',
      '2d': 'تَعْتَادَانِ',
      '3md': 'يَعْتَادَانِ',
      '3fd': 'تَعْتَادَانِ',
      '1p': 'نَعْتَادُ',
      '2mp': 'تَعْتَادُونَ',
      '2fp': 'تَعْتَدْنَ',
      '3mp': 'يَعْتَادُونَ',
      '3fp': 'يَعْتَدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ewd-8')!, 'subjunctive')).toEqualT({
      '1s': 'أَعْتَادَ',
      '2ms': 'تَعْتَادَ',
      '2fs': 'تَعْتَادِي',
      '3ms': 'يَعْتَادَ',
      '3fs': 'تَعْتَادَ',
      '2d': 'تَعْتَادَا',
      '3md': 'يَعْتَادَا',
      '3fd': 'تَعْتَادَا',
      '1p': 'نَعْتَادَ',
      '2mp': 'تَعْتَادُوا',
      '2fp': 'تَعْتَدْنَ',
      '3mp': 'يَعْتَادُوا',
      '3fp': 'يَعْتَدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ewd-8')!, 'jussive')).toEqualT({
      '1s': 'أَعْتَدْ',
      '2ms': 'تَعْتَدْ',
      '2fs': 'تَعْتَادِي',
      '3ms': 'يَعْتَدْ',
      '3fs': 'تَعْتَدْ',
      '2d': 'تَعْتَادَا',
      '3md': 'يَعْتَادَا',
      '3fd': 'تَعْتَادَا',
      '1p': 'نَعْتَدْ',
      '2mp': 'تَعْتَادُوا',
      '2fp': 'تَعْتَدْنَ',
      '3mp': 'يَعْتَادُوا',
      '3fp': 'يَعْتَدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ewd-8')!)).toMatchObjectT({
      '2ms': 'اِعْتَدْ',
      '2fs': 'اِعْتَادِي',
      '2d': 'اِعْتَادَا',
      '2mp': 'اِعْتَادُوا',
      '2fp': 'اِعْتَدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Ewd-8')!)).toEqualT({
      '1s': 'اُعْتِدْتُ',
      '2ms': 'اُعْتِدْتَ',
      '2fs': 'اُعْتِدْتِ',
      '3ms': 'اُعْتِيدَ',
      '3fs': 'اُعْتِيدَتْ',
      '2d': 'اُعْتِدْتُمَا',
      '3md': 'اُعْتِيدَا',
      '3fd': 'اُعْتِيدَتَا',
      '1p': 'اُعْتِدْنَا',
      '2mp': 'اُعْتِدْتُمْ',
      '2fp': 'اُعْتِدْتُنَّ',
      '3mp': 'اُعْتِيدُوا',
      '3fp': 'اُعْتِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ewd-8')!, 'indicative')).toEqualT({
      '1s': 'أُعْتَادُ',
      '2ms': 'تُعْتَادُ',
      '2fs': 'تُعْتَادِينَ',
      '3ms': 'يُعْتَادُ',
      '3fs': 'تُعْتَادُ',
      '2d': 'تُعْتَادَانِ',
      '3md': 'يُعْتَادَانِ',
      '3fd': 'تُعْتَادَانِ',
      '1p': 'نُعْتَادُ',
      '2mp': 'تُعْتَادُونَ',
      '2fp': 'تُعْتَدْنَ',
      '3mp': 'يُعْتَادُونَ',
      '3fp': 'يُعْتَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ewd-8')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْتَادَ',
      '2ms': 'تُعْتَادَ',
      '2fs': 'تُعْتَادِي',
      '3ms': 'يُعْتَادَ',
      '3fs': 'تُعْتَادَ',
      '2d': 'تُعْتَادَا',
      '3md': 'يُعْتَادَا',
      '3fd': 'تُعْتَادَا',
      '1p': 'نُعْتَادَ',
      '2mp': 'تُعْتَادُوا',
      '2fp': 'تُعْتَدْنَ',
      '3mp': 'يُعْتَادُوا',
      '3fp': 'يُعْتَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ewd-8')!, 'jussive')).toEqualT({
      '1s': 'أُعْتَدْ',
      '2ms': 'تُعْتَدْ',
      '2fs': 'تُعْتَادِي',
      '3ms': 'يُعْتَدْ',
      '3fs': 'تُعْتَدْ',
      '2d': 'تُعْتَادَا',
      '3md': 'يُعْتَادَا',
      '3fd': 'تُعْتَادَا',
      '1p': 'نُعْتَدْ',
      '2mp': 'تُعْتَادُوا',
      '2fp': 'تُعْتَدْنَ',
      '3mp': 'يُعْتَادُوا',
      '3fp': 'يُعْتَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ewd-8')!)).toEqualT('مُعْتَاد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Ewd-8')!)).toEqualT('مُعْتَاد')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Ewd-8')!)).toEqualT(['اِعْتِيَاد'])
  })
})
