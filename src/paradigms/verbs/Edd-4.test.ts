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

describe('Edd-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Edd-4')!)).toEqualT({
      '1s': 'أَعْدَدْتُ',
      '2ms': 'أَعْدَدْتَ',
      '2fs': 'أَعْدَدْتِ',
      '3ms': 'أَعَدَّ',
      '3fs': 'أَعَدَّتْ',
      '2d': 'أَعْدَدْتُمَا',
      '3md': 'أَعَدَّا',
      '3fd': 'أَعَدَّتَا',
      '1p': 'أَعْدَدْنَا',
      '2mp': 'أَعْدَدْتُمْ',
      '2fp': 'أَعْدَدْتُنَّ',
      '3mp': 'أَعَدُّوا',
      '3fp': 'أَعْدَدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Edd-4')!, 'indicative')).toEqualT({
      '1s': 'أُعِدُّ',
      '2ms': 'تُعِدُّ',
      '2fs': 'تُعِدِّينَ',
      '3ms': 'يُعِدُّ',
      '3fs': 'تُعِدُّ',
      '2d': 'تُعِدَّانِ',
      '3md': 'يُعِدَّانِ',
      '3fd': 'تُعِدَّانِ',
      '1p': 'نُعِدُّ',
      '2mp': 'تُعِدُّونَ',
      '2fp': 'تُعْدِدْنَ',
      '3mp': 'يُعِدُّونَ',
      '3fp': 'يُعْدِدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Edd-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُعِدَّ',
      '2ms': 'تُعِدَّ',
      '2fs': 'تُعِدِّي',
      '3ms': 'يُعِدَّ',
      '3fs': 'تُعِدَّ',
      '2d': 'تُعِدَّا',
      '3md': 'يُعِدَّا',
      '3fd': 'تُعِدَّا',
      '1p': 'نُعِدَّ',
      '2mp': 'تُعِدُّوا',
      '2fp': 'تُعْدِدْنَ',
      '3mp': 'يُعِدُّوا',
      '3fp': 'يُعْدِدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Edd-4')!, 'jussive')).toEqualT({
      '1s': 'أُعِدَّ',
      '2ms': 'تُعِدَّ',
      '2fs': 'تُعِدِّي',
      '3ms': 'يُعِدَّ',
      '3fs': 'تُعِدَّ',
      '2d': 'تُعِدَّا',
      '3md': 'يُعِدَّا',
      '3fd': 'تُعِدَّا',
      '1p': 'نُعِدَّ',
      '2mp': 'تُعِدُّوا',
      '2fp': 'تُعْدِدْنَ',
      '3mp': 'يُعِدُّوا',
      '3fp': 'يُعْدِدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Edd-4')!)).toMatchObjectT({
      '2ms': 'أَعِدَّ',
      '2fs': 'أَعِدِّي',
      '2d': 'أَعِدَّا',
      '2mp': 'أَعِدُّوا',
      '2fp': 'أَعْدِدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Edd-4')!)).toEqualT({
      '1s': 'أُعْدِدْتُ',
      '2ms': 'أُعْدِدْتَ',
      '2fs': 'أُعْدِدْتِ',
      '3ms': 'أُعِدَّ',
      '3fs': 'أُعِدَّتْ',
      '2d': 'أُعْدِدْتُمَا',
      '3md': 'أُعِدَّا',
      '3fd': 'أُعِدَّتَا',
      '1p': 'أُعْدِدْنَا',
      '2mp': 'أُعْدِدْتُمْ',
      '2fp': 'أُعْدِدْتُنَّ',
      '3mp': 'أُعِدُّوا',
      '3fp': 'أُعْدِدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Edd-4')!, 'indicative')).toEqualT({
      '1s': 'أُعَدُّ',
      '2ms': 'تُعَدُّ',
      '2fs': 'تُعَدِّينَ',
      '3ms': 'يُعَدُّ',
      '3fs': 'تُعَدُّ',
      '2d': 'تُعَدَّانِ',
      '3md': 'يُعَدَّانِ',
      '3fd': 'تُعَدَّانِ',
      '1p': 'نُعَدُّ',
      '2mp': 'تُعَدُّونَ',
      '2fp': 'تُعْدَدْنَ',
      '3mp': 'يُعَدُّونَ',
      '3fp': 'يُعْدَدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Edd-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُعَدَّ',
      '2ms': 'تُعَدَّ',
      '2fs': 'تُعَدِّي',
      '3ms': 'يُعَدَّ',
      '3fs': 'تُعَدَّ',
      '2d': 'تُعَدَّا',
      '3md': 'يُعَدَّا',
      '3fd': 'تُعَدَّا',
      '1p': 'نُعَدَّ',
      '2mp': 'تُعَدُّوا',
      '2fp': 'تُعْدَدْنَ',
      '3mp': 'يُعَدُّوا',
      '3fp': 'يُعْدَدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Edd-4')!, 'jussive')).toEqualT({
      '1s': 'أُعَدَّ',
      '2ms': 'تُعَدَّ',
      '2fs': 'تُعَدِّي',
      '3ms': 'يُعَدَّ',
      '3fs': 'تُعَدَّ',
      '2d': 'تُعَدَّا',
      '3md': 'يُعَدَّا',
      '3fd': 'تُعَدَّا',
      '1p': 'نُعَدَّ',
      '2mp': 'تُعَدُّوا',
      '2fp': 'تُعْدَدْنَ',
      '3mp': 'يُعَدُّوا',
      '3fp': 'يُعْدَدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Edd-4')!)).toEqualT('مُعِدّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Edd-4')!)).toEqualT('مُعَدّ')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Edd-4')!)).toEqualT(['إِعْدَاد'])
  })
})
