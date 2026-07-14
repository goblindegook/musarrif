import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('Ely-4', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('Ely-4')!)).toEqualT({
      '1s': 'أَعْلَيْتُ',
      '2ms': 'أَعْلَيْتَ',
      '2fs': 'أَعْلَيْتِ',
      '3ms': 'أَعْلَى',
      '3fs': 'أَعْلَتْ',
      '2d': 'أَعْلَيْتُمَا',
      '3md': 'أَعْلَيَا',
      '3fd': 'أَعْلَتَا',
      '1p': 'أَعْلَيْنَا',
      '2mp': 'أَعْلَيْتُمْ',
      '2fp': 'أَعْلَيْتُنَّ',
      '3mp': 'أَعْلَوْا',
      '3fp': 'أَعْلَيْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('Ely-4')!, 'indicative')).toEqualT({
      '1s': 'أُعْلِي',
      '2ms': 'تُعْلِي',
      '2fs': 'تُعْلِينَ',
      '3ms': 'يُعْلِي',
      '3fs': 'تُعْلِي',
      '2d': 'تُعْلِيَانِ',
      '3md': 'يُعْلِيَانِ',
      '3fd': 'تُعْلِيَانِ',
      '1p': 'نُعْلِي',
      '2mp': 'تُعْلُونَ',
      '2fp': 'تُعْلِينَ',
      '3mp': 'يُعْلُونَ',
      '3fp': 'يُعْلِينَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('Ely-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْلِيَ',
      '2ms': 'تُعْلِيَ',
      '2fs': 'تُعْلِي',
      '3ms': 'يُعْلِيَ',
      '3fs': 'تُعْلِيَ',
      '2d': 'تُعْلِيَا',
      '3md': 'يُعْلِيَا',
      '3fd': 'تُعْلِيَا',
      '1p': 'نُعْلِيَ',
      '2mp': 'تُعْلُوا',
      '2fp': 'تُعْلِينَ',
      '3mp': 'يُعْلُوا',
      '3fp': 'يُعْلِينَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('Ely-4')!, 'jussive')).toEqualT({
      '1s': 'أُعْلِ',
      '2ms': 'تُعْلِ',
      '2fs': 'تُعْلِي',
      '3ms': 'يُعْلِ',
      '3fs': 'تُعْلِ',
      '2d': 'تُعْلِيَا',
      '3md': 'يُعْلِيَا',
      '3fd': 'تُعْلِيَا',
      '1p': 'نُعْلِ',
      '2mp': 'تُعْلُوا',
      '2fp': 'تُعْلِينَ',
      '3mp': 'يُعْلُوا',
      '3fp': 'يُعْلِينَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('Ely-4')!)).toMatchObjectT({
      '2ms': 'أَعْلِ',
      '2fs': 'أَعْلِي',
      '2d': 'أَعْلِيَا',
      '2mp': 'أَعْلُوا',
      '2fp': 'أَعْلِينَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('Ely-4')!)).toEqualT({
      '1s': 'أُعْلِيتُ',
      '2ms': 'أُعْلِيتَ',
      '2fs': 'أُعْلِيتِ',
      '3ms': 'أُعْلِيَ',
      '3fs': 'أُعْلِيَتْ',
      '2d': 'أُعْلِيتُمَا',
      '3md': 'أُعْلِيَا',
      '3fd': 'أُعْلِيَتَا',
      '1p': 'أُعْلِينَا',
      '2mp': 'أُعْلِيتُمْ',
      '2fp': 'أُعْلِيتُنَّ',
      '3mp': 'أُعْلُوا',
      '3fp': 'أُعْلِينَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ely-4')!, 'indicative')).toEqualT({
      '1s': 'أُعْلَى',
      '2ms': 'تُعْلَى',
      '2fs': 'تُعْلَيْنَ',
      '3ms': 'يُعْلَى',
      '3fs': 'تُعْلَى',
      '2d': 'تُعْلَيَانِ',
      '3md': 'يُعْلَيَانِ',
      '3fd': 'تُعْلَيَانِ',
      '1p': 'نُعْلَى',
      '2mp': 'تُعْلَوْنَ',
      '2fp': 'تُعْلَيْنَ',
      '3mp': 'يُعْلَوْنَ',
      '3fp': 'يُعْلَيْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ely-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُعْلَى',
      '2ms': 'تُعْلَى',
      '2fs': 'تُعْلَيْ',
      '3ms': 'يُعْلَى',
      '3fs': 'تُعْلَى',
      '2d': 'تُعْلَيَا',
      '3md': 'يُعْلَيَا',
      '3fd': 'تُعْلَيَا',
      '1p': 'نُعْلَى',
      '2mp': 'تُعْلَوْا',
      '2fp': 'تُعْلَيْنَ',
      '3mp': 'يُعْلَوْا',
      '3fp': 'يُعْلَيْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('Ely-4')!, 'jussive')).toEqualT({
      '1s': 'أُعْلَ',
      '2ms': 'تُعْلَ',
      '2fs': 'تُعْلَيْ',
      '3ms': 'يُعْلَ',
      '3fs': 'تُعْلَ',
      '2d': 'تُعْلَيَا',
      '3md': 'يُعْلَيَا',
      '3fd': 'تُعْلَيَا',
      '1p': 'نُعْلَ',
      '2mp': 'تُعْلَوْا',
      '2fp': 'تُعْلَيْنَ',
      '3mp': 'يُعْلَوْا',
      '3fp': 'يُعْلَيْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('Ely-4')!)).toEqualT('مُعْلٍ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('Ely-4')!)).toEqualT('مُعْلًى')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('Ely-4')!)).toEqualT(['إِعْلَاء'])
  })
})
