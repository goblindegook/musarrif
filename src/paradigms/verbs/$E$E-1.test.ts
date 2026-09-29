import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$E$E-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$E$E-1')!)).toEqualT({
      '1s': 'شَعْشَعْتُ',
      '2ms': 'شَعْشَعْتَ',
      '2fs': 'شَعْشَعْتِ',
      '3ms': 'شَعْشَعَ',
      '3fs': 'شَعْشَعَتْ',
      '2d': 'شَعْشَعْتُمَا',
      '3md': 'شَعْشَعَا',
      '3fd': 'شَعْشَعَتَا',
      '1p': 'شَعْشَعْنَا',
      '2mp': 'شَعْشَعْتُمْ',
      '2fp': 'شَعْشَعْتُنَّ',
      '3mp': 'شَعْشَعُوا',
      '3fp': 'شَعْشَعْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$E$E-1')!, 'indicative')).toEqualT({
      '1s': 'أُشَعْشِعُ',
      '2ms': 'تُشَعْشِعُ',
      '2fs': 'تُشَعْشِعِينَ',
      '3ms': 'يُشَعْشِعُ',
      '3fs': 'تُشَعْشِعُ',
      '2d': 'تُشَعْشِعَانِ',
      '3md': 'يُشَعْشِعَانِ',
      '3fd': 'تُشَعْشِعَانِ',
      '1p': 'نُشَعْشِعُ',
      '2mp': 'تُشَعْشِعُونَ',
      '2fp': 'تُشَعْشِعْنَ',
      '3mp': 'يُشَعْشِعُونَ',
      '3fp': 'يُشَعْشِعْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$E$E-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَعْشِعَ',
      '2ms': 'تُشَعْشِعَ',
      '2fs': 'تُشَعْشِعِي',
      '3ms': 'يُشَعْشِعَ',
      '3fs': 'تُشَعْشِعَ',
      '2d': 'تُشَعْشِعَا',
      '3md': 'يُشَعْشِعَا',
      '3fd': 'تُشَعْشِعَا',
      '1p': 'نُشَعْشِعَ',
      '2mp': 'تُشَعْشِعُوا',
      '2fp': 'تُشَعْشِعْنَ',
      '3mp': 'يُشَعْشِعُوا',
      '3fp': 'يُشَعْشِعْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$E$E-1')!, 'jussive')).toEqualT({
      '1s': 'أُشَعْشِعْ',
      '2ms': 'تُشَعْشِعْ',
      '2fs': 'تُشَعْشِعِي',
      '3ms': 'يُشَعْشِعْ',
      '3fs': 'تُشَعْشِعْ',
      '2d': 'تُشَعْشِعَا',
      '3md': 'يُشَعْشِعَا',
      '3fd': 'تُشَعْشِعَا',
      '1p': 'نُشَعْشِعْ',
      '2mp': 'تُشَعْشِعُوا',
      '2fp': 'تُشَعْشِعْنَ',
      '3mp': 'يُشَعْشِعُوا',
      '3fp': 'يُشَعْشِعْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$E$E-1')!)).toMatchObjectT({
      '2ms': 'شَعْشِعْ',
      '2fs': 'شَعْشِعِي',
      '2d': 'شَعْشِعَا',
      '2mp': 'شَعْشِعُوا',
      '2fp': 'شَعْشِعْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$E$E-1')!)).toEqualT({
      '1s': 'شُعْشِعْتُ',
      '2ms': 'شُعْشِعْتَ',
      '2fs': 'شُعْشِعْتِ',
      '3ms': 'شُعْشِعَ',
      '3fs': 'شُعْشِعَتْ',
      '2d': 'شُعْشِعْتُمَا',
      '3md': 'شُعْشِعَا',
      '3fd': 'شُعْشِعَتَا',
      '1p': 'شُعْشِعْنَا',
      '2mp': 'شُعْشِعْتُمْ',
      '2fp': 'شُعْشِعْتُنَّ',
      '3mp': 'شُعْشِعُوا',
      '3fp': 'شُعْشِعْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$E$E-1')!, 'indicative')).toEqualT({
      '1s': 'أُشَعْشَعُ',
      '2ms': 'تُشَعْشَعُ',
      '2fs': 'تُشَعْشَعِينَ',
      '3ms': 'يُشَعْشَعُ',
      '3fs': 'تُشَعْشَعُ',
      '2d': 'تُشَعْشَعَانِ',
      '3md': 'يُشَعْشَعَانِ',
      '3fd': 'تُشَعْشَعَانِ',
      '1p': 'نُشَعْشَعُ',
      '2mp': 'تُشَعْشَعُونَ',
      '2fp': 'تُشَعْشَعْنَ',
      '3mp': 'يُشَعْشَعُونَ',
      '3fp': 'يُشَعْشَعْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$E$E-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَعْشَعَ',
      '2ms': 'تُشَعْشَعَ',
      '2fs': 'تُشَعْشَعِي',
      '3ms': 'يُشَعْشَعَ',
      '3fs': 'تُشَعْشَعَ',
      '2d': 'تُشَعْشَعَا',
      '3md': 'يُشَعْشَعَا',
      '3fd': 'تُشَعْشَعَا',
      '1p': 'نُشَعْشَعَ',
      '2mp': 'تُشَعْشَعُوا',
      '2fp': 'تُشَعْشَعْنَ',
      '3mp': 'يُشَعْشَعُوا',
      '3fp': 'يُشَعْشَعْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$E$E-1')!, 'jussive')).toEqualT({
      '1s': 'أُشَعْشَعْ',
      '2ms': 'تُشَعْشَعْ',
      '2fs': 'تُشَعْشَعِي',
      '3ms': 'يُشَعْشَعْ',
      '3fs': 'تُشَعْشَعْ',
      '2d': 'تُشَعْشَعَا',
      '3md': 'يُشَعْشَعَا',
      '3fd': 'تُشَعْشَعَا',
      '1p': 'نُشَعْشَعْ',
      '2mp': 'تُشَعْشَعُوا',
      '2fp': 'تُشَعْشَعْنَ',
      '3mp': 'يُشَعْشَعُوا',
      '3fp': 'يُشَعْشَعْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$E$E-1')!)).toEqualT('مُشَعْشِع')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$E$E-1')!)).toEqualT('مُشَعْشَع')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$E$E-1')!))).toEqualT(new Set(['شَعْشَعَة']))
  })
})
