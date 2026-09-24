import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle'
import { getVerbById } from '../verbs'

describe('w$k-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('w$k-2')!)).toEqualT({
      '1s': 'وَشَّكْتُ',
      '2ms': 'وَشَّكْتَ',
      '2fs': 'وَشَّكْتِ',
      '3ms': 'وَشَّكَ',
      '3fs': 'وَشَّكَتْ',
      '2d': 'وَشَّكْتُمَا',
      '3md': 'وَشَّكَا',
      '3fd': 'وَشَّكَتَا',
      '1p': 'وَشَّكْنَا',
      '2mp': 'وَشَّكْتُمْ',
      '2fp': 'وَشَّكْتُنَّ',
      '3mp': 'وَشَّكُوا',
      '3fp': 'وَشَّكْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('w$k-2')!, 'indicative')).toEqualT({
      '1s': 'أُوَشِّكُ',
      '2ms': 'تُوَشِّكُ',
      '2fs': 'تُوَشِّكِينَ',
      '3ms': 'يُوَشِّكُ',
      '3fs': 'تُوَشِّكُ',
      '2d': 'تُوَشِّكَانِ',
      '3md': 'يُوَشِّكَانِ',
      '3fd': 'تُوَشِّكَانِ',
      '1p': 'نُوَشِّكُ',
      '2mp': 'تُوَشِّكُونَ',
      '2fp': 'تُوَشِّكْنَ',
      '3mp': 'يُوَشِّكُونَ',
      '3fp': 'يُوَشِّكْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('w$k-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُوَشِّكَ',
      '2ms': 'تُوَشِّكَ',
      '2fs': 'تُوَشِّكِي',
      '3ms': 'يُوَشِّكَ',
      '3fs': 'تُوَشِّكَ',
      '2d': 'تُوَشِّكَا',
      '3md': 'يُوَشِّكَا',
      '3fd': 'تُوَشِّكَا',
      '1p': 'نُوَشِّكَ',
      '2mp': 'تُوَشِّكُوا',
      '2fp': 'تُوَشِّكْنَ',
      '3mp': 'يُوَشِّكُوا',
      '3fp': 'يُوَشِّكْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('w$k-2')!, 'jussive')).toEqualT({
      '1s': 'أُوَشِّكْ',
      '2ms': 'تُوَشِّكْ',
      '2fs': 'تُوَشِّكِي',
      '3ms': 'يُوَشِّكْ',
      '3fs': 'تُوَشِّكْ',
      '2d': 'تُوَشِّكَا',
      '3md': 'يُوَشِّكَا',
      '3fd': 'تُوَشِّكَا',
      '1p': 'نُوَشِّكْ',
      '2mp': 'تُوَشِّكُوا',
      '2fp': 'تُوَشِّكْنَ',
      '3mp': 'يُوَشِّكُوا',
      '3fp': 'يُوَشِّكْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('w$k-2')!)).toMatchObjectT({
      '2ms': 'وَشِّكْ',
      '2fs': 'وَشِّكِي',
      '2d': 'وَشِّكَا',
      '2mp': 'وَشِّكُوا',
      '2fp': 'وَشِّكْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('w$k-2')!)).toEqualT('مُوَشِّك')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('w$k-2')!))).toEqualT(new Set(['تَوْشِيك']))
  })
})
