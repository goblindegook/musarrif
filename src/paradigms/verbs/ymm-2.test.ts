import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ymm-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ymm-2')!)).toEqualT({
      '1s': 'يَمَّمْتُ',
      '2ms': 'يَمَّمْتَ',
      '2fs': 'يَمَّمْتِ',
      '3ms': 'يَمَّمَ',
      '3fs': 'يَمَّمَتْ',
      '2d': 'يَمَّمْتُمَا',
      '3md': 'يَمَّمَا',
      '3fd': 'يَمَّمَتَا',
      '1p': 'يَمَّمْنَا',
      '2mp': 'يَمَّمْتُمْ',
      '2fp': 'يَمَّمْتُنَّ',
      '3mp': 'يَمَّمُوا',
      '3fp': 'يَمَّمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ymm-2')!, 'indicative')).toEqualT({
      '1s': 'أُيَمِّمُ',
      '2ms': 'تُيَمِّمُ',
      '2fs': 'تُيَمِّمِينَ',
      '3ms': 'يُيَمِّمُ',
      '3fs': 'تُيَمِّمُ',
      '2d': 'تُيَمِّمَانِ',
      '3md': 'يُيَمِّمَانِ',
      '3fd': 'تُيَمِّمَانِ',
      '1p': 'نُيَمِّمُ',
      '2mp': 'تُيَمِّمُونَ',
      '2fp': 'تُيَمِّمْنَ',
      '3mp': 'يُيَمِّمُونَ',
      '3fp': 'يُيَمِّمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ymm-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُيَمِّمَ',
      '2ms': 'تُيَمِّمَ',
      '2fs': 'تُيَمِّمِي',
      '3ms': 'يُيَمِّمَ',
      '3fs': 'تُيَمِّمَ',
      '2d': 'تُيَمِّمَا',
      '3md': 'يُيَمِّمَا',
      '3fd': 'تُيَمِّمَا',
      '1p': 'نُيَمِّمَ',
      '2mp': 'تُيَمِّمُوا',
      '2fp': 'تُيَمِّمْنَ',
      '3mp': 'يُيَمِّمُوا',
      '3fp': 'يُيَمِّمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ymm-2')!, 'jussive')).toEqualT({
      '1s': 'أُيَمِّمْ',
      '2ms': 'تُيَمِّمْ',
      '2fs': 'تُيَمِّمِي',
      '3ms': 'يُيَمِّمْ',
      '3fs': 'تُيَمِّمْ',
      '2d': 'تُيَمِّمَا',
      '3md': 'يُيَمِّمَا',
      '3fd': 'تُيَمِّمَا',
      '1p': 'نُيَمِّمْ',
      '2mp': 'تُيَمِّمُوا',
      '2fp': 'تُيَمِّمْنَ',
      '3mp': 'يُيَمِّمُوا',
      '3fp': 'يُيَمِّمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ymm-2')!)).toMatchObjectT({
      '2ms': 'يَمِّمْ',
      '2fs': 'يَمِّمِي',
      '2d': 'يَمِّمَا',
      '2mp': 'يَمِّمُوا',
      '2fp': 'يَمِّمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ymm-2')!)).toEqualT({
      '1s': 'يُمِّمْتُ',
      '2ms': 'يُمِّمْتَ',
      '2fs': 'يُمِّمْتِ',
      '3ms': 'يُمِّمَ',
      '3fs': 'يُمِّمَتْ',
      '2d': 'يُمِّمْتُمَا',
      '3md': 'يُمِّمَا',
      '3fd': 'يُمِّمَتَا',
      '1p': 'يُمِّمْنَا',
      '2mp': 'يُمِّمْتُمْ',
      '2fp': 'يُمِّمْتُنَّ',
      '3mp': 'يُمِّمُوا',
      '3fp': 'يُمِّمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ymm-2')!, 'indicative')).toEqualT({
      '1s': 'أُيَمَّمُ',
      '2ms': 'تُيَمَّمُ',
      '2fs': 'تُيَمَّمِينَ',
      '3ms': 'يُيَمَّمُ',
      '3fs': 'تُيَمَّمُ',
      '2d': 'تُيَمَّمَانِ',
      '3md': 'يُيَمَّمَانِ',
      '3fd': 'تُيَمَّمَانِ',
      '1p': 'نُيَمَّمُ',
      '2mp': 'تُيَمَّمُونَ',
      '2fp': 'تُيَمَّمْنَ',
      '3mp': 'يُيَمَّمُونَ',
      '3fp': 'يُيَمَّمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ymm-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُيَمَّمَ',
      '2ms': 'تُيَمَّمَ',
      '2fs': 'تُيَمَّمِي',
      '3ms': 'يُيَمَّمَ',
      '3fs': 'تُيَمَّمَ',
      '2d': 'تُيَمَّمَا',
      '3md': 'يُيَمَّمَا',
      '3fd': 'تُيَمَّمَا',
      '1p': 'نُيَمَّمَ',
      '2mp': 'تُيَمَّمُوا',
      '2fp': 'تُيَمَّمْنَ',
      '3mp': 'يُيَمَّمُوا',
      '3fp': 'يُيَمَّمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ymm-2')!, 'jussive')).toEqualT({
      '1s': 'أُيَمَّمْ',
      '2ms': 'تُيَمَّمْ',
      '2fs': 'تُيَمَّمِي',
      '3ms': 'يُيَمَّمْ',
      '3fs': 'تُيَمَّمْ',
      '2d': 'تُيَمَّمَا',
      '3md': 'يُيَمَّمَا',
      '3fd': 'تُيَمَّمَا',
      '1p': 'نُيَمَّمْ',
      '2mp': 'تُيَمَّمُوا',
      '2fp': 'تُيَمَّمْنَ',
      '3mp': 'يُيَمَّمُوا',
      '3fp': 'يُيَمَّمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ymm-2')!)).toEqualT('مُيَمِّم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ymm-2')!)).toEqualT('مُيَمَّم')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('ymm-2')!))).toEqualT(new Set(['تَيْمِيم']))
  })
})
