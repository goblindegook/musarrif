import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ywm-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ywm-3')!)).toEqualT({
      '1s': 'يَاوَمْتُ',
      '2ms': 'يَاوَمْتَ',
      '2fs': 'يَاوَمْتِ',
      '3ms': 'يَاوَمَ',
      '3fs': 'يَاوَمَتْ',
      '2d': 'يَاوَمْتُمَا',
      '3md': 'يَاوَمَا',
      '3fd': 'يَاوَمَتَا',
      '1p': 'يَاوَمْنَا',
      '2mp': 'يَاوَمْتُمْ',
      '2fp': 'يَاوَمْتُنَّ',
      '3mp': 'يَاوَمُوا',
      '3fp': 'يَاوَمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ywm-3')!, 'indicative')).toEqualT({
      '1s': 'أُيَاوِمُ',
      '2ms': 'تُيَاوِمُ',
      '2fs': 'تُيَاوِمِينَ',
      '3ms': 'يُيَاوِمُ',
      '3fs': 'تُيَاوِمُ',
      '2d': 'تُيَاوِمَانِ',
      '3md': 'يُيَاوِمَانِ',
      '3fd': 'تُيَاوِمَانِ',
      '1p': 'نُيَاوِمُ',
      '2mp': 'تُيَاوِمُونَ',
      '2fp': 'تُيَاوِمْنَ',
      '3mp': 'يُيَاوِمُونَ',
      '3fp': 'يُيَاوِمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ywm-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُيَاوِمَ',
      '2ms': 'تُيَاوِمَ',
      '2fs': 'تُيَاوِمِي',
      '3ms': 'يُيَاوِمَ',
      '3fs': 'تُيَاوِمَ',
      '2d': 'تُيَاوِمَا',
      '3md': 'يُيَاوِمَا',
      '3fd': 'تُيَاوِمَا',
      '1p': 'نُيَاوِمَ',
      '2mp': 'تُيَاوِمُوا',
      '2fp': 'تُيَاوِمْنَ',
      '3mp': 'يُيَاوِمُوا',
      '3fp': 'يُيَاوِمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ywm-3')!, 'jussive')).toEqualT({
      '1s': 'أُيَاوِمْ',
      '2ms': 'تُيَاوِمْ',
      '2fs': 'تُيَاوِمِي',
      '3ms': 'يُيَاوِمْ',
      '3fs': 'تُيَاوِمْ',
      '2d': 'تُيَاوِمَا',
      '3md': 'يُيَاوِمَا',
      '3fd': 'تُيَاوِمَا',
      '1p': 'نُيَاوِمْ',
      '2mp': 'تُيَاوِمُوا',
      '2fp': 'تُيَاوِمْنَ',
      '3mp': 'يُيَاوِمُوا',
      '3fp': 'يُيَاوِمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ywm-3')!)).toMatchObjectT({
      '2ms': 'يَاوِمْ',
      '2fs': 'يَاوِمِي',
      '2d': 'يَاوِمَا',
      '2mp': 'يَاوِمُوا',
      '2fp': 'يَاوِمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ywm-3')!)).toEqualT({
      '1s': 'يُووِمْتُ',
      '2ms': 'يُووِمْتَ',
      '2fs': 'يُووِمْتِ',
      '3ms': 'يُووِمَ',
      '3fs': 'يُووِمَتْ',
      '2d': 'يُووِمْتُمَا',
      '3md': 'يُووِمَا',
      '3fd': 'يُووِمَتَا',
      '1p': 'يُووِمْنَا',
      '2mp': 'يُووِمْتُمْ',
      '2fp': 'يُووِمْتُنَّ',
      '3mp': 'يُووِمُوا',
      '3fp': 'يُووِمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ywm-3')!, 'indicative')).toEqualT({
      '1s': 'أُيَاوَمُ',
      '2ms': 'تُيَاوَمُ',
      '2fs': 'تُيَاوَمِينَ',
      '3ms': 'يُيَاوَمُ',
      '3fs': 'تُيَاوَمُ',
      '2d': 'تُيَاوَمَانِ',
      '3md': 'يُيَاوَمَانِ',
      '3fd': 'تُيَاوَمَانِ',
      '1p': 'نُيَاوَمُ',
      '2mp': 'تُيَاوَمُونَ',
      '2fp': 'تُيَاوَمْنَ',
      '3mp': 'يُيَاوَمُونَ',
      '3fp': 'يُيَاوَمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ywm-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُيَاوَمَ',
      '2ms': 'تُيَاوَمَ',
      '2fs': 'تُيَاوَمِي',
      '3ms': 'يُيَاوَمَ',
      '3fs': 'تُيَاوَمَ',
      '2d': 'تُيَاوَمَا',
      '3md': 'يُيَاوَمَا',
      '3fd': 'تُيَاوَمَا',
      '1p': 'نُيَاوَمَ',
      '2mp': 'تُيَاوَمُوا',
      '2fp': 'تُيَاوَمْنَ',
      '3mp': 'يُيَاوَمُوا',
      '3fp': 'يُيَاوَمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ywm-3')!, 'jussive')).toEqualT({
      '1s': 'أُيَاوَمْ',
      '2ms': 'تُيَاوَمْ',
      '2fs': 'تُيَاوَمِي',
      '3ms': 'يُيَاوَمْ',
      '3fs': 'تُيَاوَمْ',
      '2d': 'تُيَاوَمَا',
      '3md': 'يُيَاوَمَا',
      '3fd': 'تُيَاوَمَا',
      '1p': 'نُيَاوَمْ',
      '2mp': 'تُيَاوَمُوا',
      '2fp': 'تُيَاوَمْنَ',
      '3mp': 'يُيَاوَمُوا',
      '3fp': 'يُيَاوَمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ywm-3')!)).toEqualT('مُيَاوِم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ywm-3')!)).toEqualT('مُيَاوَم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('ywm-3')!))).toEqualT(new Set(['مُيَاوَمَة']))
  })
})
