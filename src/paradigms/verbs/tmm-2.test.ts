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

describe('tmm-2', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('tmm-2')!)).strings.toEqualT({
      '1s': 'تَمَّمْتُ',
      '2ms': 'تَمَّمْتَ',
      '2fs': 'تَمَّمْتِ',
      '3ms': 'تَمَّمَ',
      '3fs': 'تَمَّمَتْ',
      '2d': 'تَمَّمْتُمَا',
      '3md': 'تَمَّمَا',
      '3fd': 'تَمَّمَتَا',
      '1p': 'تَمَّمْنَا',
      '2mp': 'تَمَّمْتُمْ',
      '2fp': 'تَمَّمْتُنَّ',
      '3mp': 'تَمَّمُوا',
      '3fp': 'تَمَّمْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('tmm-2')!, 'indicative')).toEqualT({
      '1s': 'أُتَمِّمُ',
      '2ms': 'تُتَمِّمُ',
      '2fs': 'تُتَمِّمِينَ',
      '3ms': 'يُتَمِّمُ',
      '3fs': 'تُتَمِّمُ',
      '2d': 'تُتَمِّمَانِ',
      '3md': 'يُتَمِّمَانِ',
      '3fd': 'تُتَمِّمَانِ',
      '1p': 'نُتَمِّمُ',
      '2mp': 'تُتَمِّمُونَ',
      '2fp': 'تُتَمِّمْنَ',
      '3mp': 'يُتَمِّمُونَ',
      '3fp': 'يُتَمِّمْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('tmm-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَمِّمَ',
      '2ms': 'تُتَمِّمَ',
      '2fs': 'تُتَمِّمِي',
      '3ms': 'يُتَمِّمَ',
      '3fs': 'تُتَمِّمَ',
      '2d': 'تُتَمِّمَا',
      '3md': 'يُتَمِّمَا',
      '3fd': 'تُتَمِّمَا',
      '1p': 'نُتَمِّمَ',
      '2mp': 'تُتَمِّمُوا',
      '2fp': 'تُتَمِّمْنَ',
      '3mp': 'يُتَمِّمُوا',
      '3fp': 'يُتَمِّمْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('tmm-2')!, 'jussive')).toEqualT({
      '1s': 'أُتَمِّمْ',
      '2ms': 'تُتَمِّمْ',
      '2fs': 'تُتَمِّمِي',
      '3ms': 'يُتَمِّمْ',
      '3fs': 'تُتَمِّمْ',
      '2d': 'تُتَمِّمَا',
      '3md': 'يُتَمِّمَا',
      '3fd': 'تُتَمِّمَا',
      '1p': 'نُتَمِّمْ',
      '2mp': 'تُتَمِّمُوا',
      '2fp': 'تُتَمِّمْنَ',
      '3mp': 'يُتَمِّمُوا',
      '3fp': 'يُتَمِّمْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('tmm-2')!)).toMatchObjectT({
      '2ms': 'تَمِّمْ',
      '2fs': 'تَمِّمِي',
      '2d': 'تَمِّمَا',
      '2mp': 'تَمِّمُوا',
      '2fp': 'تَمِّمْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('tmm-2')!)).toEqualT({
      '1s': 'تُمِّمْتُ',
      '2ms': 'تُمِّمْتَ',
      '2fs': 'تُمِّمْتِ',
      '3ms': 'تُمِّمَ',
      '3fs': 'تُمِّمَتْ',
      '2d': 'تُمِّمْتُمَا',
      '3md': 'تُمِّمَا',
      '3fd': 'تُمِّمَتَا',
      '1p': 'تُمِّمْنَا',
      '2mp': 'تُمِّمْتُمْ',
      '2fp': 'تُمِّمْتُنَّ',
      '3mp': 'تُمِّمُوا',
      '3fp': 'تُمِّمْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('tmm-2')!, 'indicative')).toEqualT({
      '1s': 'أُتَمَّمُ',
      '2ms': 'تُتَمَّمُ',
      '2fs': 'تُتَمَّمِينَ',
      '3ms': 'يُتَمَّمُ',
      '3fs': 'تُتَمَّمُ',
      '2d': 'تُتَمَّمَانِ',
      '3md': 'يُتَمَّمَانِ',
      '3fd': 'تُتَمَّمَانِ',
      '1p': 'نُتَمَّمُ',
      '2mp': 'تُتَمَّمُونَ',
      '2fp': 'تُتَمَّمْنَ',
      '3mp': 'يُتَمَّمُونَ',
      '3fp': 'يُتَمَّمْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('tmm-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُتَمَّمَ',
      '2ms': 'تُتَمَّمَ',
      '2fs': 'تُتَمَّمِي',
      '3ms': 'يُتَمَّمَ',
      '3fs': 'تُتَمَّمَ',
      '2d': 'تُتَمَّمَا',
      '3md': 'يُتَمَّمَا',
      '3fd': 'تُتَمَّمَا',
      '1p': 'نُتَمَّمَ',
      '2mp': 'تُتَمَّمُوا',
      '2fp': 'تُتَمَّمْنَ',
      '3mp': 'يُتَمَّمُوا',
      '3fp': 'يُتَمَّمْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('tmm-2')!, 'jussive')).toEqualT({
      '1s': 'أُتَمَّمْ',
      '2ms': 'تُتَمَّمْ',
      '2fs': 'تُتَمَّمِي',
      '3ms': 'يُتَمَّمْ',
      '3fs': 'تُتَمَّمْ',
      '2d': 'تُتَمَّمَا',
      '3md': 'يُتَمَّمَا',
      '3fd': 'تُتَمَّمَا',
      '1p': 'نُتَمَّمْ',
      '2mp': 'تُتَمَّمُوا',
      '2fp': 'تُتَمَّمْنَ',
      '3mp': 'يُتَمَّمُوا',
      '3fp': 'يُتَمَّمْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('tmm-2')!)).toEqualT('مُتَمِّم')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('tmm-2')!)).toEqualT('مُتَمَّم')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('tmm-2')!)).toEqualT(['تَتْمِيم', 'تَتِمَّة'])
  })
})
