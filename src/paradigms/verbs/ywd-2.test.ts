import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('ywd-2 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('ywd-2')!)).toEqualT({
      '1s': 'يَوَّدْتُ',
      '2ms': 'يَوَّدْتَ',
      '2fs': 'يَوَّدْتِ',
      '3ms': 'يَوَّدَ',
      '3fs': 'يَوَّدَتْ',
      '2d': 'يَوَّدْتُمَا',
      '3md': 'يَوَّدَا',
      '3fd': 'يَوَّدَتَا',
      '1p': 'يَوَّدْنَا',
      '2mp': 'يَوَّدْتُمْ',
      '2fp': 'يَوَّدْتُنَّ',
      '3mp': 'يَوَّدُوا',
      '3fp': 'يَوَّدْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('ywd-2')!, 'indicative')).toEqualT({
      '1s': 'أُيَوِّدُ',
      '2ms': 'تُيَوِّدُ',
      '2fs': 'تُيَوِّدِينَ',
      '3ms': 'يُيَوِّدُ',
      '3fs': 'تُيَوِّدُ',
      '2d': 'تُيَوِّدَانِ',
      '3md': 'يُيَوِّدَانِ',
      '3fd': 'تُيَوِّدَانِ',
      '1p': 'نُيَوِّدُ',
      '2mp': 'تُيَوِّدُونَ',
      '2fp': 'تُيَوِّدْنَ',
      '3mp': 'يُيَوِّدُونَ',
      '3fp': 'يُيَوِّدْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('ywd-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُيَوِّدَ',
      '2ms': 'تُيَوِّدَ',
      '2fs': 'تُيَوِّدِي',
      '3ms': 'يُيَوِّدَ',
      '3fs': 'تُيَوِّدَ',
      '2d': 'تُيَوِّدَا',
      '3md': 'يُيَوِّدَا',
      '3fd': 'تُيَوِّدَا',
      '1p': 'نُيَوِّدَ',
      '2mp': 'تُيَوِّدُوا',
      '2fp': 'تُيَوِّدْنَ',
      '3mp': 'يُيَوِّدُوا',
      '3fp': 'يُيَوِّدْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('ywd-2')!, 'jussive')).toEqualT({
      '1s': 'أُيَوِّدْ',
      '2ms': 'تُيَوِّدْ',
      '2fs': 'تُيَوِّدِي',
      '3ms': 'يُيَوِّدْ',
      '3fs': 'تُيَوِّدْ',
      '2d': 'تُيَوِّدَا',
      '3md': 'يُيَوِّدَا',
      '3fd': 'تُيَوِّدَا',
      '1p': 'نُيَوِّدْ',
      '2mp': 'تُيَوِّدُوا',
      '2fp': 'تُيَوِّدْنَ',
      '3mp': 'يُيَوِّدُوا',
      '3fp': 'يُيَوِّدْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('ywd-2')!)).toMatchObjectT({
      '2ms': 'يَوِّدْ',
      '2fs': 'يَوِّدِي',
      '2d': 'يَوِّدَا',
      '2mp': 'يَوِّدُوا',
      '2fp': 'يَوِّدْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('ywd-2')!)).toEqualT({
      '1s': 'يُوِّدْتُ',
      '2ms': 'يُوِّدْتَ',
      '2fs': 'يُوِّدْتِ',
      '3ms': 'يُوِّدَ',
      '3fs': 'يُوِّدَتْ',
      '2d': 'يُوِّدْتُمَا',
      '3md': 'يُوِّدَا',
      '3fd': 'يُوِّدَتَا',
      '1p': 'يُوِّدْنَا',
      '2mp': 'يُوِّدْتُمْ',
      '2fp': 'يُوِّدْتُنَّ',
      '3mp': 'يُوِّدُوا',
      '3fp': 'يُوِّدْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('ywd-2')!, 'indicative')).toEqualT({
      '1s': 'أُيَوَّدُ',
      '2ms': 'تُيَوَّدُ',
      '2fs': 'تُيَوَّدِينَ',
      '3ms': 'يُيَوَّدُ',
      '3fs': 'تُيَوَّدُ',
      '2d': 'تُيَوَّدَانِ',
      '3md': 'يُيَوَّدَانِ',
      '3fd': 'تُيَوَّدَانِ',
      '1p': 'نُيَوَّدُ',
      '2mp': 'تُيَوَّدُونَ',
      '2fp': 'تُيَوَّدْنَ',
      '3mp': 'يُيَوَّدُونَ',
      '3fp': 'يُيَوَّدْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ywd-2')!, 'subjunctive')).toEqualT({
      '1s': 'أُيَوَّدَ',
      '2ms': 'تُيَوَّدَ',
      '2fs': 'تُيَوَّدِي',
      '3ms': 'يُيَوَّدَ',
      '3fs': 'تُيَوَّدَ',
      '2d': 'تُيَوَّدَا',
      '3md': 'يُيَوَّدَا',
      '3fd': 'تُيَوَّدَا',
      '1p': 'نُيَوَّدَ',
      '2mp': 'تُيَوَّدُوا',
      '2fp': 'تُيَوَّدْنَ',
      '3mp': 'يُيَوَّدُوا',
      '3fp': 'يُيَوَّدْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('ywd-2')!, 'jussive')).toEqualT({
      '1s': 'أُيَوَّدْ',
      '2ms': 'تُيَوَّدْ',
      '2fs': 'تُيَوَّدِي',
      '3ms': 'يُيَوَّدْ',
      '3fs': 'تُيَوَّدْ',
      '2d': 'تُيَوَّدَا',
      '3md': 'يُيَوَّدَا',
      '3fd': 'تُيَوَّدَا',
      '1p': 'نُيَوَّدْ',
      '2mp': 'تُيَوَّدُوا',
      '2fp': 'تُيَوَّدْنَ',
      '3mp': 'يُيَوَّدُوا',
      '3fp': 'يُيَوَّدْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('ywd-2')!)).toEqualT('مُيَوِّد')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('ywd-2')!)).toEqualT('مُيَوَّد')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('ywd-2')!))).toEqualT(new Set(['تَيْوِيد']))
  })
})
