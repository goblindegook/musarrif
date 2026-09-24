import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$wr-3 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$wr-3')!)).toEqualT({
      '1s': 'شَاوَرْتُ',
      '2ms': 'شَاوَرْتَ',
      '2fs': 'شَاوَرْتِ',
      '3ms': 'شَاوَرَ',
      '3fs': 'شَاوَرَتْ',
      '2d': 'شَاوَرْتُمَا',
      '3md': 'شَاوَرَا',
      '3fd': 'شَاوَرَتَا',
      '1p': 'شَاوَرْنَا',
      '2mp': 'شَاوَرْتُمْ',
      '2fp': 'شَاوَرْتُنَّ',
      '3mp': 'شَاوَرُوا',
      '3fp': 'شَاوَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$wr-3')!, 'indicative')).toEqualT({
      '1s': 'أُشَاوِرُ',
      '2ms': 'تُشَاوِرُ',
      '2fs': 'تُشَاوِرِينَ',
      '3ms': 'يُشَاوِرُ',
      '3fs': 'تُشَاوِرُ',
      '2d': 'تُشَاوِرَانِ',
      '3md': 'يُشَاوِرَانِ',
      '3fd': 'تُشَاوِرَانِ',
      '1p': 'نُشَاوِرُ',
      '2mp': 'تُشَاوِرُونَ',
      '2fp': 'تُشَاوِرْنَ',
      '3mp': 'يُشَاوِرُونَ',
      '3fp': 'يُشَاوِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$wr-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَاوِرَ',
      '2ms': 'تُشَاوِرَ',
      '2fs': 'تُشَاوِرِي',
      '3ms': 'يُشَاوِرَ',
      '3fs': 'تُشَاوِرَ',
      '2d': 'تُشَاوِرَا',
      '3md': 'يُشَاوِرَا',
      '3fd': 'تُشَاوِرَا',
      '1p': 'نُشَاوِرَ',
      '2mp': 'تُشَاوِرُوا',
      '2fp': 'تُشَاوِرْنَ',
      '3mp': 'يُشَاوِرُوا',
      '3fp': 'يُشَاوِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$wr-3')!, 'jussive')).toEqualT({
      '1s': 'أُشَاوِرْ',
      '2ms': 'تُشَاوِرْ',
      '2fs': 'تُشَاوِرِي',
      '3ms': 'يُشَاوِرْ',
      '3fs': 'تُشَاوِرْ',
      '2d': 'تُشَاوِرَا',
      '3md': 'يُشَاوِرَا',
      '3fd': 'تُشَاوِرَا',
      '1p': 'نُشَاوِرْ',
      '2mp': 'تُشَاوِرُوا',
      '2fp': 'تُشَاوِرْنَ',
      '3mp': 'يُشَاوِرُوا',
      '3fp': 'يُشَاوِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$wr-3')!)).toMatchObjectT({
      '2ms': 'شَاوِرْ',
      '2fs': 'شَاوِرِي',
      '2d': 'شَاوِرَا',
      '2mp': 'شَاوِرُوا',
      '2fp': 'شَاوِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$wr-3')!)).toEqualT({
      '1s': 'شُووِرْتُ',
      '2ms': 'شُووِرْتَ',
      '2fs': 'شُووِرْتِ',
      '3ms': 'شُووِرَ',
      '3fs': 'شُووِرَتْ',
      '2d': 'شُووِرْتُمَا',
      '3md': 'شُووِرَا',
      '3fd': 'شُووِرَتَا',
      '1p': 'شُووِرْنَا',
      '2mp': 'شُووِرْتُمْ',
      '2fp': 'شُووِرْتُنَّ',
      '3mp': 'شُووِرُوا',
      '3fp': 'شُووِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$wr-3')!, 'indicative')).toEqualT({
      '1s': 'أُشَاوَرُ',
      '2ms': 'تُشَاوَرُ',
      '2fs': 'تُشَاوَرِينَ',
      '3ms': 'يُشَاوَرُ',
      '3fs': 'تُشَاوَرُ',
      '2d': 'تُشَاوَرَانِ',
      '3md': 'يُشَاوَرَانِ',
      '3fd': 'تُشَاوَرَانِ',
      '1p': 'نُشَاوَرُ',
      '2mp': 'تُشَاوَرُونَ',
      '2fp': 'تُشَاوَرْنَ',
      '3mp': 'يُشَاوَرُونَ',
      '3fp': 'يُشَاوَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$wr-3')!, 'subjunctive')).toEqualT({
      '1s': 'أُشَاوَرَ',
      '2ms': 'تُشَاوَرَ',
      '2fs': 'تُشَاوَرِي',
      '3ms': 'يُشَاوَرَ',
      '3fs': 'تُشَاوَرَ',
      '2d': 'تُشَاوَرَا',
      '3md': 'يُشَاوَرَا',
      '3fd': 'تُشَاوَرَا',
      '1p': 'نُشَاوَرَ',
      '2mp': 'تُشَاوَرُوا',
      '2fp': 'تُشَاوَرْنَ',
      '3mp': 'يُشَاوَرُوا',
      '3fp': 'يُشَاوَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$wr-3')!, 'jussive')).toEqualT({
      '1s': 'أُشَاوَرْ',
      '2ms': 'تُشَاوَرْ',
      '2fs': 'تُشَاوَرِي',
      '3ms': 'يُشَاوَرْ',
      '3fs': 'تُشَاوَرْ',
      '2d': 'تُشَاوَرَا',
      '3md': 'يُشَاوَرَا',
      '3fd': 'تُشَاوَرَا',
      '1p': 'نُشَاوَرْ',
      '2mp': 'تُشَاوَرُوا',
      '2fp': 'تُشَاوَرْنَ',
      '3mp': 'يُشَاوَرُوا',
      '3fp': 'يُشَاوَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$wr-3')!)).toEqualT('مُشَاوِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$wr-3')!)).toEqualT('مُشَاوَر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$wr-3')!))).toEqualT(new Set(['مُشَاوَرَة', 'شِوَار']))
  })
})
