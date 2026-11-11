import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('syTr-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('syTr-1')!)).toEqualT({
      '1s': 'سَيْطَرْتُ',
      '2ms': 'سَيْطَرْتَ',
      '2fs': 'سَيْطَرْتِ',
      '3ms': 'سَيْطَرَ',
      '3fs': 'سَيْطَرَتْ',
      '2d': 'سَيْطَرْتُمَا',
      '3md': 'سَيْطَرَا',
      '3fd': 'سَيْطَرَتَا',
      '1p': 'سَيْطَرْنَا',
      '2mp': 'سَيْطَرْتُمْ',
      '2fp': 'سَيْطَرْتُنَّ',
      '3mp': 'سَيْطَرُوا',
      '3fp': 'سَيْطَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('syTr-1')!, 'indicative')).toEqualT({
      '1s': 'أُسَيْطِرُ',
      '2ms': 'تُسَيْطِرُ',
      '2fs': 'تُسَيْطِرِينَ',
      '3ms': 'يُسَيْطِرُ',
      '3fs': 'تُسَيْطِرُ',
      '2d': 'تُسَيْطِرَانِ',
      '3md': 'يُسَيْطِرَانِ',
      '3fd': 'تُسَيْطِرَانِ',
      '1p': 'نُسَيْطِرُ',
      '2mp': 'تُسَيْطِرُونَ',
      '2fp': 'تُسَيْطِرْنَ',
      '3mp': 'يُسَيْطِرُونَ',
      '3fp': 'يُسَيْطِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('syTr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُسَيْطِرَ',
      '2ms': 'تُسَيْطِرَ',
      '2fs': 'تُسَيْطِرِي',
      '3ms': 'يُسَيْطِرَ',
      '3fs': 'تُسَيْطِرَ',
      '2d': 'تُسَيْطِرَا',
      '3md': 'يُسَيْطِرَا',
      '3fd': 'تُسَيْطِرَا',
      '1p': 'نُسَيْطِرَ',
      '2mp': 'تُسَيْطِرُوا',
      '2fp': 'تُسَيْطِرْنَ',
      '3mp': 'يُسَيْطِرُوا',
      '3fp': 'يُسَيْطِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('syTr-1')!, 'jussive')).toEqualT({
      '1s': 'أُسَيْطِرْ',
      '2ms': 'تُسَيْطِرْ',
      '2fs': 'تُسَيْطِرِي',
      '3ms': 'يُسَيْطِرْ',
      '3fs': 'تُسَيْطِرْ',
      '2d': 'تُسَيْطِرَا',
      '3md': 'يُسَيْطِرَا',
      '3fd': 'تُسَيْطِرَا',
      '1p': 'نُسَيْطِرْ',
      '2mp': 'تُسَيْطِرُوا',
      '2fp': 'تُسَيْطِرْنَ',
      '3mp': 'يُسَيْطِرُوا',
      '3fp': 'يُسَيْطِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('syTr-1')!)).toMatchObjectT({
      '2ms': 'سَيْطِرْ',
      '2fs': 'سَيْطِرِي',
      '2d': 'سَيْطِرَا',
      '2mp': 'سَيْطِرُوا',
      '2fp': 'سَيْطِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('syTr-1')!)).toMatchObjectT({
      '3ms': 'سُوطِرَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('syTr-1')!, 'indicative')).toMatchObjectT({
      '3ms': 'يُسَيْطَرُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('syTr-1')!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُسَيْطَرَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('syTr-1')!, 'jussive')).toMatchObjectT({
      '3ms': 'يُسَيْطَرْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('syTr-1')!)).toEqualT('مُسَيْطِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('syTr-1')!)).toEqualT('مُسَيْطَر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('syTr-1')!))).toEqualT(new Set(['سَيْطَرَة']))
  })
})
