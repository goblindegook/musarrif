import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$El-4 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$El-4')!)).toEqualT({
      '1s': 'أَشْعَلْتُ',
      '2ms': 'أَشْعَلْتَ',
      '2fs': 'أَشْعَلْتِ',
      '3ms': 'أَشْعَلَ',
      '3fs': 'أَشْعَلَتْ',
      '2d': 'أَشْعَلْتُمَا',
      '3md': 'أَشْعَلَا',
      '3fd': 'أَشْعَلَتَا',
      '1p': 'أَشْعَلْنَا',
      '2mp': 'أَشْعَلْتُمْ',
      '2fp': 'أَشْعَلْتُنَّ',
      '3mp': 'أَشْعَلُوا',
      '3fp': 'أَشْعَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$El-4')!, 'indicative')).toEqualT({
      '1s': 'أُشْعِلُ',
      '2ms': 'تُشْعِلُ',
      '2fs': 'تُشْعِلِينَ',
      '3ms': 'يُشْعِلُ',
      '3fs': 'تُشْعِلُ',
      '2d': 'تُشْعِلَانِ',
      '3md': 'يُشْعِلَانِ',
      '3fd': 'تُشْعِلَانِ',
      '1p': 'نُشْعِلُ',
      '2mp': 'تُشْعِلُونَ',
      '2fp': 'تُشْعِلْنَ',
      '3mp': 'يُشْعِلُونَ',
      '3fp': 'يُشْعِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$El-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُشْعِلَ',
      '2ms': 'تُشْعِلَ',
      '2fs': 'تُشْعِلِي',
      '3ms': 'يُشْعِلَ',
      '3fs': 'تُشْعِلَ',
      '2d': 'تُشْعِلَا',
      '3md': 'يُشْعِلَا',
      '3fd': 'تُشْعِلَا',
      '1p': 'نُشْعِلَ',
      '2mp': 'تُشْعِلُوا',
      '2fp': 'تُشْعِلْنَ',
      '3mp': 'يُشْعِلُوا',
      '3fp': 'يُشْعِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$El-4')!, 'jussive')).toEqualT({
      '1s': 'أُشْعِلْ',
      '2ms': 'تُشْعِلْ',
      '2fs': 'تُشْعِلِي',
      '3ms': 'يُشْعِلْ',
      '3fs': 'تُشْعِلْ',
      '2d': 'تُشْعِلَا',
      '3md': 'يُشْعِلَا',
      '3fd': 'تُشْعِلَا',
      '1p': 'نُشْعِلْ',
      '2mp': 'تُشْعِلُوا',
      '2fp': 'تُشْعِلْنَ',
      '3mp': 'يُشْعِلُوا',
      '3fp': 'يُشْعِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$El-4')!)).toMatchObjectT({
      '2ms': 'أَشْعِلْ',
      '2fs': 'أَشْعِلِي',
      '2d': 'أَشْعِلَا',
      '2mp': 'أَشْعِلُوا',
      '2fp': 'أَشْعِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$El-4')!)).toEqualT({
      '1s': 'أُشْعِلْتُ',
      '2ms': 'أُشْعِلْتَ',
      '2fs': 'أُشْعِلْتِ',
      '3ms': 'أُشْعِلَ',
      '3fs': 'أُشْعِلَتْ',
      '2d': 'أُشْعِلْتُمَا',
      '3md': 'أُشْعِلَا',
      '3fd': 'أُشْعِلَتَا',
      '1p': 'أُشْعِلْنَا',
      '2mp': 'أُشْعِلْتُمْ',
      '2fp': 'أُشْعِلْتُنَّ',
      '3mp': 'أُشْعِلُوا',
      '3fp': 'أُشْعِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$El-4')!, 'indicative')).toEqualT({
      '1s': 'أُشْعَلُ',
      '2ms': 'تُشْعَلُ',
      '2fs': 'تُشْعَلِينَ',
      '3ms': 'يُشْعَلُ',
      '3fs': 'تُشْعَلُ',
      '2d': 'تُشْعَلَانِ',
      '3md': 'يُشْعَلَانِ',
      '3fd': 'تُشْعَلَانِ',
      '1p': 'نُشْعَلُ',
      '2mp': 'تُشْعَلُونَ',
      '2fp': 'تُشْعَلْنَ',
      '3mp': 'يُشْعَلُونَ',
      '3fp': 'يُشْعَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$El-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُشْعَلَ',
      '2ms': 'تُشْعَلَ',
      '2fs': 'تُشْعَلِي',
      '3ms': 'يُشْعَلَ',
      '3fs': 'تُشْعَلَ',
      '2d': 'تُشْعَلَا',
      '3md': 'يُشْعَلَا',
      '3fd': 'تُشْعَلَا',
      '1p': 'نُشْعَلَ',
      '2mp': 'تُشْعَلُوا',
      '2fp': 'تُشْعَلْنَ',
      '3mp': 'يُشْعَلُوا',
      '3fp': 'يُشْعَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$El-4')!, 'jussive')).toEqualT({
      '1s': 'أُشْعَلْ',
      '2ms': 'تُشْعَلْ',
      '2fs': 'تُشْعَلِي',
      '3ms': 'يُشْعَلْ',
      '3fs': 'تُشْعَلْ',
      '2d': 'تُشْعَلَا',
      '3md': 'يُشْعَلَا',
      '3fd': 'تُشْعَلَا',
      '1p': 'نُشْعَلْ',
      '2mp': 'تُشْعَلُوا',
      '2fp': 'تُشْعَلْنَ',
      '3mp': 'يُشْعَلُوا',
      '3fp': 'يُشْعَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$El-4')!)).toEqualT('مُشْعِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$El-4')!)).toEqualT('مُشْعَل')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$El-4')!))).toEqualT(new Set(['إِشْعَال']))
  })
})
