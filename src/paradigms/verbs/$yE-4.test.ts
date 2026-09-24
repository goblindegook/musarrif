import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$yE-4 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$yE-4')!)).toEqualT({
      '1s': 'أَشَعْتُ',
      '2ms': 'أَشَعْتَ',
      '2fs': 'أَشَعْتِ',
      '3ms': 'أَشَاعَ',
      '3fs': 'أَشَاعَتْ',
      '2d': 'أَشَعْتُمَا',
      '3md': 'أَشَاعَا',
      '3fd': 'أَشَاعَتَا',
      '1p': 'أَشَعْنَا',
      '2mp': 'أَشَعْتُمْ',
      '2fp': 'أَشَعْتُنَّ',
      '3mp': 'أَشَاعُوا',
      '3fp': 'أَشَعْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$yE-4')!, 'indicative')).toEqualT({
      '1s': 'أُشِيعُ',
      '2ms': 'تُشِيعُ',
      '2fs': 'تُشِيعِينَ',
      '3ms': 'يُشِيعُ',
      '3fs': 'تُشِيعُ',
      '2d': 'تُشِيعَانِ',
      '3md': 'يُشِيعَانِ',
      '3fd': 'تُشِيعَانِ',
      '1p': 'نُشِيعُ',
      '2mp': 'تُشِيعُونَ',
      '2fp': 'تُشِعْنَ',
      '3mp': 'يُشِيعُونَ',
      '3fp': 'يُشِعْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$yE-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُشِيعَ',
      '2ms': 'تُشِيعَ',
      '2fs': 'تُشِيعِي',
      '3ms': 'يُشِيعَ',
      '3fs': 'تُشِيعَ',
      '2d': 'تُشِيعَا',
      '3md': 'يُشِيعَا',
      '3fd': 'تُشِيعَا',
      '1p': 'نُشِيعَ',
      '2mp': 'تُشِيعُوا',
      '2fp': 'تُشِعْنَ',
      '3mp': 'يُشِيعُوا',
      '3fp': 'يُشِعْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$yE-4')!, 'jussive')).toEqualT({
      '1s': 'أُشِعْ',
      '2ms': 'تُشِعْ',
      '2fs': 'تُشِيعِي',
      '3ms': 'يُشِعْ',
      '3fs': 'تُشِعْ',
      '2d': 'تُشِيعَا',
      '3md': 'يُشِيعَا',
      '3fd': 'تُشِيعَا',
      '1p': 'نُشِعْ',
      '2mp': 'تُشِيعُوا',
      '2fp': 'تُشِعْنَ',
      '3mp': 'يُشِيعُوا',
      '3fp': 'يُشِعْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$yE-4')!)).toMatchObjectT({
      '2ms': 'أَشِعْ',
      '2fs': 'أَشِيعِي',
      '2d': 'أَشِيعَا',
      '2mp': 'أَشِيعُوا',
      '2fp': 'أَشِعْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$yE-4')!)).toEqualT({
      '1s': 'أُشِعْتُ',
      '2ms': 'أُشِعْتَ',
      '2fs': 'أُشِعْتِ',
      '3ms': 'أُشِيعَ',
      '3fs': 'أُشِيعَتْ',
      '2d': 'أُشِعْتُمَا',
      '3md': 'أُشِيعَا',
      '3fd': 'أُشِيعَتَا',
      '1p': 'أُشِعْنَا',
      '2mp': 'أُشِعْتُمْ',
      '2fp': 'أُشِعْتُنَّ',
      '3mp': 'أُشِيعُوا',
      '3fp': 'أُشِعْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yE-4')!, 'indicative')).toEqualT({
      '1s': 'أُشَاعُ',
      '2ms': 'تُشَاعُ',
      '2fs': 'تُشَاعِينَ',
      '3ms': 'يُشَاعُ',
      '3fs': 'تُشَاعُ',
      '2d': 'تُشَاعَانِ',
      '3md': 'يُشَاعَانِ',
      '3fd': 'تُشَاعَانِ',
      '1p': 'نُشَاعُ',
      '2mp': 'تُشَاعُونَ',
      '2fp': 'تُشَعْنَ',
      '3mp': 'يُشَاعُونَ',
      '3fp': 'يُشَعْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yE-4')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَاعَ',
      '2ms': 'تُشَاعَ',
      '2fs': 'تُشَاعِي',
      '3ms': 'يُشَاعَ',
      '3fs': 'تُشَاعَ',
      '2d': 'تُشَاعَا',
      '3md': 'يُشَاعَا',
      '3fd': 'تُشَاعَا',
      '1p': 'نُشَاعَ',
      '2mp': 'تُشَاعُوا',
      '2fp': 'تُشَعْنَ',
      '3mp': 'يُشَاعُوا',
      '3fp': 'يُشَعْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$yE-4')!, 'jussive')).toEqualT({
      '1s': 'أُشَعْ',
      '2ms': 'تُشَعْ',
      '2fs': 'تُشَاعِي',
      '3ms': 'يُشَعْ',
      '3fs': 'تُشَعْ',
      '2d': 'تُشَاعَا',
      '3md': 'يُشَاعَا',
      '3fd': 'تُشَاعَا',
      '1p': 'نُشَعْ',
      '2mp': 'تُشَاعُوا',
      '2fp': 'تُشَعْنَ',
      '3mp': 'يُشَاعُوا',
      '3fp': 'يُشَعْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$yE-4')!)).toEqualT('مُشِيع')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$yE-4')!)).toEqualT('مُشَاع')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$yE-4')!))).toEqualT(new Set(['إِشَاعَة']))
  })
})
