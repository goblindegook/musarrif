import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('wqE-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('wqE-4')!)).toEqualT({
      '1s': 'أَوْقَعْتُ',
      '2ms': 'أَوْقَعْتَ',
      '2fs': 'أَوْقَعْتِ',
      '3ms': 'أَوْقَعَ',
      '3fs': 'أَوْقَعَتْ',
      '2d': 'أَوْقَعْتُمَا',
      '3md': 'أَوْقَعَا',
      '3fd': 'أَوْقَعَتَا',
      '1p': 'أَوْقَعْنَا',
      '2mp': 'أَوْقَعْتُمْ',
      '2fp': 'أَوْقَعْتُنَّ',
      '3mp': 'أَوْقَعُوا',
      '3fp': 'أَوْقَعْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('wqE-4')!, 'indicative')).toEqualT({
      '1s': 'أُوقِعُ',
      '2ms': 'تُوقِعُ',
      '2fs': 'تُوقِعِينَ',
      '3ms': 'يُوقِعُ',
      '3fs': 'تُوقِعُ',
      '2d': 'تُوقِعَانِ',
      '3md': 'يُوقِعَانِ',
      '3fd': 'تُوقِعَانِ',
      '1p': 'نُوقِعُ',
      '2mp': 'تُوقِعُونَ',
      '2fp': 'تُوقِعْنَ',
      '3mp': 'يُوقِعُونَ',
      '3fp': 'يُوقِعْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('wqE-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوقِعَ',
      '2ms': 'تُوقِعَ',
      '2fs': 'تُوقِعِي',
      '3ms': 'يُوقِعَ',
      '3fs': 'تُوقِعَ',
      '2d': 'تُوقِعَا',
      '3md': 'يُوقِعَا',
      '3fd': 'تُوقِعَا',
      '1p': 'نُوقِعَ',
      '2mp': 'تُوقِعُوا',
      '2fp': 'تُوقِعْنَ',
      '3mp': 'يُوقِعُوا',
      '3fp': 'يُوقِعْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('wqE-4')!, 'jussive')).toEqualT({
      '1s': 'أُوقِعْ',
      '2ms': 'تُوقِعْ',
      '2fs': 'تُوقِعِي',
      '3ms': 'يُوقِعْ',
      '3fs': 'تُوقِعْ',
      '2d': 'تُوقِعَا',
      '3md': 'يُوقِعَا',
      '3fd': 'تُوقِعَا',
      '1p': 'نُوقِعْ',
      '2mp': 'تُوقِعُوا',
      '2fp': 'تُوقِعْنَ',
      '3mp': 'يُوقِعُوا',
      '3fp': 'يُوقِعْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('wqE-4')!)).toMatchObjectT({
      '2ms': 'أَوْقِعْ',
      '2fs': 'أَوْقِعِي',
      '2d': 'أَوْقِعَا',
      '2mp': 'أَوْقِعُوا',
      '2fp': 'أَوْقِعْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('wqE-4')!)).toEqualT({
      '1s': 'أُوقِعْتُ',
      '2ms': 'أُوقِعْتَ',
      '2fs': 'أُوقِعْتِ',
      '3ms': 'أُوقِعَ',
      '3fs': 'أُوقِعَتْ',
      '2d': 'أُوقِعْتُمَا',
      '3md': 'أُوقِعَا',
      '3fd': 'أُوقِعَتَا',
      '1p': 'أُوقِعْنَا',
      '2mp': 'أُوقِعْتُمْ',
      '2fp': 'أُوقِعْتُنَّ',
      '3mp': 'أُوقِعُوا',
      '3fp': 'أُوقِعْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqE-4')!, 'indicative')).toEqualT({
      '1s': 'أُوقَعُ',
      '2ms': 'تُوقَعُ',
      '2fs': 'تُوقَعِينَ',
      '3ms': 'يُوقَعُ',
      '3fs': 'تُوقَعُ',
      '2d': 'تُوقَعَانِ',
      '3md': 'يُوقَعَانِ',
      '3fd': 'تُوقَعَانِ',
      '1p': 'نُوقَعُ',
      '2mp': 'تُوقَعُونَ',
      '2fp': 'تُوقَعْنَ',
      '3mp': 'يُوقَعُونَ',
      '3fp': 'يُوقَعْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqE-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُوقَعَ',
      '2ms': 'تُوقَعَ',
      '2fs': 'تُوقَعِي',
      '3ms': 'يُوقَعَ',
      '3fs': 'تُوقَعَ',
      '2d': 'تُوقَعَا',
      '3md': 'يُوقَعَا',
      '3fd': 'تُوقَعَا',
      '1p': 'نُوقَعَ',
      '2mp': 'تُوقَعُوا',
      '2fp': 'تُوقَعْنَ',
      '3mp': 'يُوقَعُوا',
      '3fp': 'يُوقَعْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('wqE-4')!, 'jussive')).toEqualT({
      '1s': 'أُوقَعْ',
      '2ms': 'تُوقَعْ',
      '2fs': 'تُوقَعِي',
      '3ms': 'يُوقَعْ',
      '3fs': 'تُوقَعْ',
      '2d': 'تُوقَعَا',
      '3md': 'يُوقَعَا',
      '3fd': 'تُوقَعَا',
      '1p': 'نُوقَعْ',
      '2mp': 'تُوقَعُوا',
      '2fp': 'تُوقَعْنَ',
      '3mp': 'يُوقَعُوا',
      '3fp': 'يُوقَعْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('wqE-4')!)).toEqualT('مُوقِع')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('wqE-4')!)).toEqualT('مُوقَع')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('wqE-4')!)).toEqualT(['إِيقَاع'])
  })
})
