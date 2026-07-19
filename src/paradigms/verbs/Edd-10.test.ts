import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("Edd-10", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("Edd-10")!)).toEqualT({
      '1s': 'اِسْتَعْدَدْتُ',
      '2ms': 'اِسْتَعْدَدْتَ',
      '2fs': 'اِسْتَعْدَدْتِ',
      '3ms': 'اِسْتَعَدَّ',
      '3fs': 'اِسْتَعَدَّتْ',
      '2d': 'اِسْتَعْدَدْتُمَا',
      '3md': 'اِسْتَعَدَّا',
      '3fd': 'اِسْتَعَدَّتَا',
      '1p': 'اِسْتَعْدَدْنَا',
      '2mp': 'اِسْتَعْدَدْتُمْ',
      '2fp': 'اِسْتَعْدَدْتُنَّ',
      '3mp': 'اِسْتَعَدُّوا',
      '3fp': 'اِسْتَعْدَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("Edd-10")!, 'indicative')).toEqualT({
      '1s': 'أَسْتَعِدُّ',
      '2ms': 'تَسْتَعِدُّ',
      '2fs': 'تَسْتَعِدِّينَ',
      '3ms': 'يَسْتَعِدُّ',
      '3fs': 'تَسْتَعِدُّ',
      '2d': 'تَسْتَعِدَّانِ',
      '3md': 'يَسْتَعِدَّانِ',
      '3fd': 'تَسْتَعِدَّانِ',
      '1p': 'نَسْتَعِدُّ',
      '2mp': 'تَسْتَعِدُّونَ',
      '2fp': 'تَسْتَعْدِدْنَ',
      '3mp': 'يَسْتَعِدُّونَ',
      '3fp': 'يَسْتَعْدِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("Edd-10")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْتَعِدَّ',
      '2ms': 'تَسْتَعِدَّ',
      '2fs': 'تَسْتَعِدِّي',
      '3ms': 'يَسْتَعِدَّ',
      '3fs': 'تَسْتَعِدَّ',
      '2d': 'تَسْتَعِدَّا',
      '3md': 'يَسْتَعِدَّا',
      '3fd': 'تَسْتَعِدَّا',
      '1p': 'نَسْتَعِدَّ',
      '2mp': 'تَسْتَعِدُّوا',
      '2fp': 'تَسْتَعْدِدْنَ',
      '3mp': 'يَسْتَعِدُّوا',
      '3fp': 'يَسْتَعْدِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("Edd-10")!, 'jussive')).toEqualT({
      '1s': 'أَسْتَعِدَّ',
      '2ms': 'تَسْتَعِدَّ',
      '2fs': 'تَسْتَعِدِّي',
      '3ms': 'يَسْتَعِدَّ',
      '3fs': 'تَسْتَعِدَّ',
      '2d': 'تَسْتَعِدَّا',
      '3md': 'يَسْتَعِدَّا',
      '3fd': 'تَسْتَعِدَّا',
      '1p': 'نَسْتَعِدَّ',
      '2mp': 'تَسْتَعِدُّوا',
      '2fp': 'تَسْتَعْدِدْنَ',
      '3mp': 'يَسْتَعِدُّوا',
      '3fp': 'يَسْتَعْدِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("Edd-10")!)).toMatchObjectT({
      '2ms': 'اِسْتَعِدَّ',
      '2fs': 'اِسْتَعِدِّي',
      '2d': 'اِسْتَعِدَّا',
      '2mp': 'اِسْتَعِدُّوا',
      '2fp': 'اِسْتَعْدِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("Edd-10")!)).toEqualT({
      '1s': 'اُسْتُعْدِدْتُ',
      '2ms': 'اُسْتُعْدِدْتَ',
      '2fs': 'اُسْتُعْدِدْتِ',
      '3ms': 'اُسْتُعِدَّ',
      '3fs': 'اُسْتُعِدَّتْ',
      '2d': 'اُسْتُعْدِدْتُمَا',
      '3md': 'اُسْتُعِدَّا',
      '3fd': 'اُسْتُعِدَّتَا',
      '1p': 'اُسْتُعْدِدْنَا',
      '2mp': 'اُسْتُعْدِدْتُمْ',
      '2fp': 'اُسْتُعْدِدْتُنَّ',
      '3mp': 'اُسْتُعِدُّوا',
      '3fp': 'اُسْتُعْدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("Edd-10")!, 'indicative')).toEqualT({
      '1s': 'أُسْتَعَدُّ',
      '2ms': 'تُسْتَعَدُّ',
      '2fs': 'تُسْتَعَدِّينَ',
      '3ms': 'يُسْتَعَدُّ',
      '3fs': 'تُسْتَعَدُّ',
      '2d': 'تُسْتَعَدَّانِ',
      '3md': 'يُسْتَعَدَّانِ',
      '3fd': 'تُسْتَعَدَّانِ',
      '1p': 'نُسْتَعَدُّ',
      '2mp': 'تُسْتَعَدُّونَ',
      '2fp': 'تُسْتَعْدَدْنَ',
      '3mp': 'يُسْتَعَدُّونَ',
      '3fp': 'يُسْتَعْدَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Edd-10")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْتَعَدَّ',
      '2ms': 'تُسْتَعَدَّ',
      '2fs': 'تُسْتَعَدِّي',
      '3ms': 'يُسْتَعَدَّ',
      '3fs': 'تُسْتَعَدَّ',
      '2d': 'تُسْتَعَدَّا',
      '3md': 'يُسْتَعَدَّا',
      '3fd': 'تُسْتَعَدَّا',
      '1p': 'نُسْتَعَدَّ',
      '2mp': 'تُسْتَعَدُّوا',
      '2fp': 'تُسْتَعْدَدْنَ',
      '3mp': 'يُسْتَعَدُّوا',
      '3fp': 'يُسْتَعْدَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("Edd-10")!, 'jussive')).toEqualT({
      '1s': 'أُسْتَعَدَّ',
      '2ms': 'تُسْتَعَدَّ',
      '2fs': 'تُسْتَعَدِّي',
      '3ms': 'يُسْتَعَدَّ',
      '3fs': 'تُسْتَعَدَّ',
      '2d': 'تُسْتَعَدَّا',
      '3md': 'يُسْتَعَدَّا',
      '3fd': 'تُسْتَعَدَّا',
      '1p': 'نُسْتَعَدَّ',
      '2mp': 'تُسْتَعَدُّوا',
      '2fp': 'تُسْتَعْدَدْنَ',
      '3mp': 'يُسْتَعَدُّوا',
      '3fp': 'يُسْتَعْدَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("Edd-10")!)).toEqualT('مُسْتَعِدّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("Edd-10")!)).toEqualT('مُسْتَعَدّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("Edd-10")!)).toEqualT(['اِسْتِعْدَاد'])
  })
})
