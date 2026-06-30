import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('mdd-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('mdd-4')!)).toEqualT({
      '1s': 'أَمْدَدْتُ',
      '2ms': 'أَمْدَدْتَ',
      '2fs': 'أَمْدَدْتِ',
      '3ms': 'أَمَدَّ',
      '3fs': 'أَمَدَّتْ',
      '2d': 'أَمْدَدْتُمَا',
      '3md': 'أَمَدَّا',
      '3fd': 'أَمَدَّتَا',
      '1p': 'أَمْدَدْنَا',
      '2mp': 'أَمْدَدْتُمْ',
      '2fp': 'أَمْدَدْتُنَّ',
      '3mp': 'أَمَدُّوا',
      '3fp': 'أَمْدَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('mdd-4')!, 'indicative')).toEqualT({
      '1s': 'أُمِدُّ',
      '2ms': 'تُمِدُّ',
      '2fs': 'تُمِدِّينَ',
      '3ms': 'يُمِدُّ',
      '3fs': 'تُمِدُّ',
      '2d': 'تُمِدَّانِ',
      '3md': 'يُمِدَّانِ',
      '3fd': 'تُمِدَّانِ',
      '1p': 'نُمِدُّ',
      '2mp': 'تُمِدُّونَ',
      '2fp': 'تُمْدِدْنَ',
      '3mp': 'يُمِدُّونَ',
      '3fp': 'يُمْدِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('mdd-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُمِدَّ',
      '2ms': 'تُمِدَّ',
      '2fs': 'تُمِدِّي',
      '3ms': 'يُمِدَّ',
      '3fs': 'تُمِدَّ',
      '2d': 'تُمِدَّا',
      '3md': 'يُمِدَّا',
      '3fd': 'تُمِدَّا',
      '1p': 'نُمِدَّ',
      '2mp': 'تُمِدُّوا',
      '2fp': 'تُمْدِدْنَ',
      '3mp': 'يُمِدُّوا',
      '3fp': 'يُمْدِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('mdd-4')!, 'jussive')).toEqualT({
      '1s': 'أُمِدَّ',
      '2ms': 'تُمِدَّ',
      '2fs': 'تُمِدِّي',
      '3ms': 'يُمِدَّ',
      '3fs': 'تُمِدَّ',
      '2d': 'تُمِدَّا',
      '3md': 'يُمِدَّا',
      '3fd': 'تُمِدَّا',
      '1p': 'نُمِدَّ',
      '2mp': 'تُمِدُّوا',
      '2fp': 'تُمْدِدْنَ',
      '3mp': 'يُمِدُّوا',
      '3fp': 'يُمْدِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('mdd-4')!)).toMatchObjectT({
      '2ms': 'أَمِدَّ',
      '2fs': 'أَمِدِّي',
      '2d': 'أَمِدَّا',
      '2mp': 'أَمِدُّوا',
      '2fp': 'أَمْدِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('mdd-4')!)).toEqualT({
      '1s': 'أُمْدِدْتُ',
      '2ms': 'أُمْدِدْتَ',
      '2fs': 'أُمْدِدْتِ',
      '3ms': 'أُمِدَّ',
      '3fs': 'أُمِدَّتْ',
      '2d': 'أُمْدِدْتُمَا',
      '3md': 'أُمِدَّا',
      '3fd': 'أُمِدَّتَا',
      '1p': 'أُمْدِدْنَا',
      '2mp': 'أُمْدِدْتُمْ',
      '2fp': 'أُمْدِدْتُنَّ',
      '3mp': 'أُمِدُّوا',
      '3fp': 'أُمْدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('mdd-4')!, 'indicative')).toEqualT({
      '1s': 'أُمَدُّ',
      '2ms': 'تُمَدُّ',
      '2fs': 'تُمَدِّينَ',
      '3ms': 'يُمَدُّ',
      '3fs': 'تُمَدُّ',
      '2d': 'تُمَدَّانِ',
      '3md': 'يُمَدَّانِ',
      '3fd': 'تُمَدَّانِ',
      '1p': 'نُمَدُّ',
      '2mp': 'تُمَدُّونَ',
      '2fp': 'تُمْدَدْنَ',
      '3mp': 'يُمَدُّونَ',
      '3fp': 'يُمْدَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mdd-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُمَدَّ',
      '2ms': 'تُمَدَّ',
      '2fs': 'تُمَدِّي',
      '3ms': 'يُمَدَّ',
      '3fs': 'تُمَدَّ',
      '2d': 'تُمَدَّا',
      '3md': 'يُمَدَّا',
      '3fd': 'تُمَدَّا',
      '1p': 'نُمَدَّ',
      '2mp': 'تُمَدُّوا',
      '2fp': 'تُمْدَدْنَ',
      '3mp': 'يُمَدُّوا',
      '3fp': 'يُمْدَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('mdd-4')!, 'jussive')).toEqualT({
      '1s': 'أُمَدَّ',
      '2ms': 'تُمَدَّ',
      '2fs': 'تُمَدِّي',
      '3ms': 'يُمَدَّ',
      '3fs': 'تُمَدَّ',
      '2d': 'تُمَدَّا',
      '3md': 'يُمَدَّا',
      '3fd': 'تُمَدَّا',
      '1p': 'نُمَدَّ',
      '2mp': 'تُمَدُّوا',
      '2fp': 'تُمْدَدْنَ',
      '3mp': 'يُمَدُّوا',
      '3fp': 'يُمْدَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('mdd-4')!)).toEqualT('مُمِدّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('mdd-4')!)).toEqualT('مُمَدّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('mdd-4')!)).toEqualT(['إِمْدَاد'])
  })
})
