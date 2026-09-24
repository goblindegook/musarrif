import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$bh-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$bh-3')!)).toEqualT({
      '1s': 'شَابَهْتُ',
      '2ms': 'شَابَهْتَ',
      '2fs': 'شَابَهْتِ',
      '3ms': 'شَابَهَ',
      '3fs': 'شَابَهَتْ',
      '2d': 'شَابَهْتُمَا',
      '3md': 'شَابَهَا',
      '3fd': 'شَابَهَتَا',
      '1p': 'شَابَهْنَا',
      '2mp': 'شَابَهْتُمْ',
      '2fp': 'شَابَهْتُنَّ',
      '3mp': 'شَابَهُوا',
      '3fp': 'شَابَهْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$bh-3')!, 'indicative')).toEqualT({
      '1s': 'أُشَابِهُ',
      '2ms': 'تُشَابِهُ',
      '2fs': 'تُشَابِهِينَ',
      '3ms': 'يُشَابِهُ',
      '3fs': 'تُشَابِهُ',
      '2d': 'تُشَابِهَانِ',
      '3md': 'يُشَابِهَانِ',
      '3fd': 'تُشَابِهَانِ',
      '1p': 'نُشَابِهُ',
      '2mp': 'تُشَابِهُونَ',
      '2fp': 'تُشَابِهْنَ',
      '3mp': 'يُشَابِهُونَ',
      '3fp': 'يُشَابِهْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$bh-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَابِهَ',
      '2ms': 'تُشَابِهَ',
      '2fs': 'تُشَابِهِي',
      '3ms': 'يُشَابِهَ',
      '3fs': 'تُشَابِهَ',
      '2d': 'تُشَابِهَا',
      '3md': 'يُشَابِهَا',
      '3fd': 'تُشَابِهَا',
      '1p': 'نُشَابِهَ',
      '2mp': 'تُشَابِهُوا',
      '2fp': 'تُشَابِهْنَ',
      '3mp': 'يُشَابِهُوا',
      '3fp': 'يُشَابِهْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$bh-3')!, 'jussive')).toEqualT({
      '1s': 'أُشَابِهْ',
      '2ms': 'تُشَابِهْ',
      '2fs': 'تُشَابِهِي',
      '3ms': 'يُشَابِهْ',
      '3fs': 'تُشَابِهْ',
      '2d': 'تُشَابِهَا',
      '3md': 'يُشَابِهَا',
      '3fd': 'تُشَابِهَا',
      '1p': 'نُشَابِهْ',
      '2mp': 'تُشَابِهُوا',
      '2fp': 'تُشَابِهْنَ',
      '3mp': 'يُشَابِهُوا',
      '3fp': 'يُشَابِهْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$bh-3')!)).toMatchObjectT({
      '2ms': 'شَابِهْ',
      '2fs': 'شَابِهِي',
      '2d': 'شَابِهَا',
      '2mp': 'شَابِهُوا',
      '2fp': 'شَابِهْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$bh-3')!)).toEqualT({
      '1s': 'شُوبِهْتُ',
      '2ms': 'شُوبِهْتَ',
      '2fs': 'شُوبِهْتِ',
      '3ms': 'شُوبِهَ',
      '3fs': 'شُوبِهَتْ',
      '2d': 'شُوبِهْتُمَا',
      '3md': 'شُوبِهَا',
      '3fd': 'شُوبِهَتَا',
      '1p': 'شُوبِهْنَا',
      '2mp': 'شُوبِهْتُمْ',
      '2fp': 'شُوبِهْتُنَّ',
      '3mp': 'شُوبِهُوا',
      '3fp': 'شُوبِهْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$bh-3')!, 'indicative')).toEqualT({
      '1s': 'أُشَابَهُ',
      '2ms': 'تُشَابَهُ',
      '2fs': 'تُشَابَهِينَ',
      '3ms': 'يُشَابَهُ',
      '3fs': 'تُشَابَهُ',
      '2d': 'تُشَابَهَانِ',
      '3md': 'يُشَابَهَانِ',
      '3fd': 'تُشَابَهَانِ',
      '1p': 'نُشَابَهُ',
      '2mp': 'تُشَابَهُونَ',
      '2fp': 'تُشَابَهْنَ',
      '3mp': 'يُشَابَهُونَ',
      '3fp': 'يُشَابَهْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$bh-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَابَهَ',
      '2ms': 'تُشَابَهَ',
      '2fs': 'تُشَابَهِي',
      '3ms': 'يُشَابَهَ',
      '3fs': 'تُشَابَهَ',
      '2d': 'تُشَابَهَا',
      '3md': 'يُشَابَهَا',
      '3fd': 'تُشَابَهَا',
      '1p': 'نُشَابَهَ',
      '2mp': 'تُشَابَهُوا',
      '2fp': 'تُشَابَهْنَ',
      '3mp': 'يُشَابَهُوا',
      '3fp': 'يُشَابَهْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$bh-3')!, 'jussive')).toEqualT({
      '1s': 'أُشَابَهْ',
      '2ms': 'تُشَابَهْ',
      '2fs': 'تُشَابَهِي',
      '3ms': 'يُشَابَهْ',
      '3fs': 'تُشَابَهْ',
      '2d': 'تُشَابَهَا',
      '3md': 'يُشَابَهَا',
      '3fd': 'تُشَابَهَا',
      '1p': 'نُشَابَهْ',
      '2mp': 'تُشَابَهُوا',
      '2fp': 'تُشَابَهْنَ',
      '3mp': 'يُشَابَهُوا',
      '3fp': 'يُشَابَهْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$bh-3')!)).toEqualT('مُشَابِه')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$bh-3')!)).toEqualT('مُشَابَه')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$bh-3')!))).toEqualT(new Set(['مُشَابَهَة']))
  })
})
