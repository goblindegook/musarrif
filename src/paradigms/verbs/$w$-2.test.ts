import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$w$-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$w$-2')!)).toEqualT({
      '1s': 'شَوَّشْتُ',
      '2ms': 'شَوَّشْتَ',
      '2fs': 'شَوَّشْتِ',
      '3ms': 'شَوَّشَ',
      '3fs': 'شَوَّشَتْ',
      '2d': 'شَوَّشْتُمَا',
      '3md': 'شَوَّشَا',
      '3fd': 'شَوَّشَتَا',
      '1p': 'شَوَّشْنَا',
      '2mp': 'شَوَّشْتُمْ',
      '2fp': 'شَوَّشْتُنَّ',
      '3mp': 'شَوَّشُوا',
      '3fp': 'شَوَّشْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$w$-2')!, 'indicative')).toEqualT({
      '1s': 'أُشَوِّشُ',
      '2ms': 'تُشَوِّشُ',
      '2fs': 'تُشَوِّشِينَ',
      '3ms': 'يُشَوِّشُ',
      '3fs': 'تُشَوِّشُ',
      '2d': 'تُشَوِّشَانِ',
      '3md': 'يُشَوِّشَانِ',
      '3fd': 'تُشَوِّشَانِ',
      '1p': 'نُشَوِّشُ',
      '2mp': 'تُشَوِّشُونَ',
      '2fp': 'تُشَوِّشْنَ',
      '3mp': 'يُشَوِّشُونَ',
      '3fp': 'يُشَوِّشْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$w$-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَوِّشَ',
      '2ms': 'تُشَوِّشَ',
      '2fs': 'تُشَوِّشِي',
      '3ms': 'يُشَوِّشَ',
      '3fs': 'تُشَوِّشَ',
      '2d': 'تُشَوِّشَا',
      '3md': 'يُشَوِّشَا',
      '3fd': 'تُشَوِّشَا',
      '1p': 'نُشَوِّشَ',
      '2mp': 'تُشَوِّشُوا',
      '2fp': 'تُشَوِّشْنَ',
      '3mp': 'يُشَوِّشُوا',
      '3fp': 'يُشَوِّشْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$w$-2')!, 'jussive')).toEqualT({
      '1s': 'أُشَوِّشْ',
      '2ms': 'تُشَوِّشْ',
      '2fs': 'تُشَوِّشِي',
      '3ms': 'يُشَوِّشْ',
      '3fs': 'تُشَوِّشْ',
      '2d': 'تُشَوِّشَا',
      '3md': 'يُشَوِّشَا',
      '3fd': 'تُشَوِّشَا',
      '1p': 'نُشَوِّشْ',
      '2mp': 'تُشَوِّشُوا',
      '2fp': 'تُشَوِّشْنَ',
      '3mp': 'يُشَوِّشُوا',
      '3fp': 'يُشَوِّشْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$w$-2')!)).toMatchObjectT({
      '2ms': 'شَوِّشْ',
      '2fs': 'شَوِّشِي',
      '2d': 'شَوِّشَا',
      '2mp': 'شَوِّشُوا',
      '2fp': 'شَوِّشْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$w$-2')!)).toEqualT({
      '1s': 'شُوِّشْتُ',
      '2ms': 'شُوِّشْتَ',
      '2fs': 'شُوِّشْتِ',
      '3ms': 'شُوِّشَ',
      '3fs': 'شُوِّشَتْ',
      '2d': 'شُوِّشْتُمَا',
      '3md': 'شُوِّشَا',
      '3fd': 'شُوِّشَتَا',
      '1p': 'شُوِّشْنَا',
      '2mp': 'شُوِّشْتُمْ',
      '2fp': 'شُوِّشْتُنَّ',
      '3mp': 'شُوِّشُوا',
      '3fp': 'شُوِّشْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$w$-2')!, 'indicative')).toEqualT({
      '1s': 'أُشَوَّشُ',
      '2ms': 'تُشَوَّشُ',
      '2fs': 'تُشَوَّشِينَ',
      '3ms': 'يُشَوَّشُ',
      '3fs': 'تُشَوَّشُ',
      '2d': 'تُشَوَّشَانِ',
      '3md': 'يُشَوَّشَانِ',
      '3fd': 'تُشَوَّشَانِ',
      '1p': 'نُشَوَّشُ',
      '2mp': 'تُشَوَّشُونَ',
      '2fp': 'تُشَوَّشْنَ',
      '3mp': 'يُشَوَّشُونَ',
      '3fp': 'يُشَوَّشْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$w$-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَوَّشَ',
      '2ms': 'تُشَوَّشَ',
      '2fs': 'تُشَوَّشِي',
      '3ms': 'يُشَوَّشَ',
      '3fs': 'تُشَوَّشَ',
      '2d': 'تُشَوَّشَا',
      '3md': 'يُشَوَّشَا',
      '3fd': 'تُشَوَّشَا',
      '1p': 'نُشَوَّشَ',
      '2mp': 'تُشَوَّشُوا',
      '2fp': 'تُشَوَّشْنَ',
      '3mp': 'يُشَوَّشُوا',
      '3fp': 'يُشَوَّشْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$w$-2')!, 'jussive')).toEqualT({
      '1s': 'أُشَوَّشْ',
      '2ms': 'تُشَوَّشْ',
      '2fs': 'تُشَوَّشِي',
      '3ms': 'يُشَوَّشْ',
      '3fs': 'تُشَوَّشْ',
      '2d': 'تُشَوَّشَا',
      '3md': 'يُشَوَّشَا',
      '3fd': 'تُشَوَّشَا',
      '1p': 'نُشَوَّشْ',
      '2mp': 'تُشَوَّشُوا',
      '2fp': 'تُشَوَّشْنَ',
      '3mp': 'يُشَوَّشُوا',
      '3fp': 'يُشَوَّشْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$w$-2')!)).toEqualT('مُشَوِّش')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$w$-2')!)).toEqualT('مُشَوَّش')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$w$-2')!))).toEqualT(new Set(['تَشْوِيش']))
  })
})
