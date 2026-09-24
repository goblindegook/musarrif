import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$H*-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$H*-1')!)).toEqualT({
      '1s': 'شَحَذْتُ',
      '2ms': 'شَحَذْتَ',
      '2fs': 'شَحَذْتِ',
      '3ms': 'شَحَذَ',
      '3fs': 'شَحَذَتْ',
      '2d': 'شَحَذْتُمَا',
      '3md': 'شَحَذَا',
      '3fd': 'شَحَذَتَا',
      '1p': 'شَحَذْنَا',
      '2mp': 'شَحَذْتُمْ',
      '2fp': 'شَحَذْتُنَّ',
      '3mp': 'شَحَذُوا',
      '3fp': 'شَحَذْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$H*-1')!, 'indicative')).toEqualT({
      '1s': 'أَشْحَذُ',
      '2ms': 'تَشْحَذُ',
      '2fs': 'تَشْحَذِينَ',
      '3ms': 'يَشْحَذُ',
      '3fs': 'تَشْحَذُ',
      '2d': 'تَشْحَذَانِ',
      '3md': 'يَشْحَذَانِ',
      '3fd': 'تَشْحَذَانِ',
      '1p': 'نَشْحَذُ',
      '2mp': 'تَشْحَذُونَ',
      '2fp': 'تَشْحَذْنَ',
      '3mp': 'يَشْحَذُونَ',
      '3fp': 'يَشْحَذْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$H*-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَشْحَذَ',
      '2ms': 'تَشْحَذَ',
      '2fs': 'تَشْحَذِي',
      '3ms': 'يَشْحَذَ',
      '3fs': 'تَشْحَذَ',
      '2d': 'تَشْحَذَا',
      '3md': 'يَشْحَذَا',
      '3fd': 'تَشْحَذَا',
      '1p': 'نَشْحَذَ',
      '2mp': 'تَشْحَذُوا',
      '2fp': 'تَشْحَذْنَ',
      '3mp': 'يَشْحَذُوا',
      '3fp': 'يَشْحَذْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$H*-1')!, 'jussive')).toEqualT({
      '1s': 'أَشْحَذْ',
      '2ms': 'تَشْحَذْ',
      '2fs': 'تَشْحَذِي',
      '3ms': 'يَشْحَذْ',
      '3fs': 'تَشْحَذْ',
      '2d': 'تَشْحَذَا',
      '3md': 'يَشْحَذَا',
      '3fd': 'تَشْحَذَا',
      '1p': 'نَشْحَذْ',
      '2mp': 'تَشْحَذُوا',
      '2fp': 'تَشْحَذْنَ',
      '3mp': 'يَشْحَذُوا',
      '3fp': 'يَشْحَذْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$H*-1')!)).toMatchObjectT({
      '2ms': 'اِشْحَذْ',
      '2fs': 'اِشْحَذِي',
      '2d': 'اِشْحَذَا',
      '2mp': 'اِشْحَذُوا',
      '2fp': 'اِشْحَذْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$H*-1')!)).toEqualT({
      '1s': 'شُحِذْتُ',
      '2ms': 'شُحِذْتَ',
      '2fs': 'شُحِذْتِ',
      '3ms': 'شُحِذَ',
      '3fs': 'شُحِذَتْ',
      '2d': 'شُحِذْتُمَا',
      '3md': 'شُحِذَا',
      '3fd': 'شُحِذَتَا',
      '1p': 'شُحِذْنَا',
      '2mp': 'شُحِذْتُمْ',
      '2fp': 'شُحِذْتُنَّ',
      '3mp': 'شُحِذُوا',
      '3fp': 'شُحِذْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$H*-1')!, 'indicative')).toEqualT({
      '1s': 'أُشْحَذُ',
      '2ms': 'تُشْحَذُ',
      '2fs': 'تُشْحَذِينَ',
      '3ms': 'يُشْحَذُ',
      '3fs': 'تُشْحَذُ',
      '2d': 'تُشْحَذَانِ',
      '3md': 'يُشْحَذَانِ',
      '3fd': 'تُشْحَذَانِ',
      '1p': 'نُشْحَذُ',
      '2mp': 'تُشْحَذُونَ',
      '2fp': 'تُشْحَذْنَ',
      '3mp': 'يُشْحَذُونَ',
      '3fp': 'يُشْحَذْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$H*-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُشْحَذَ',
      '2ms': 'تُشْحَذَ',
      '2fs': 'تُشْحَذِي',
      '3ms': 'يُشْحَذَ',
      '3fs': 'تُشْحَذَ',
      '2d': 'تُشْحَذَا',
      '3md': 'يُشْحَذَا',
      '3fd': 'تُشْحَذَا',
      '1p': 'نُشْحَذَ',
      '2mp': 'تُشْحَذُوا',
      '2fp': 'تُشْحَذْنَ',
      '3mp': 'يُشْحَذُوا',
      '3fp': 'يُشْحَذْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$H*-1')!, 'jussive')).toEqualT({
      '1s': 'أُشْحَذْ',
      '2ms': 'تُشْحَذْ',
      '2fs': 'تُشْحَذِي',
      '3ms': 'يُشْحَذْ',
      '3fs': 'تُشْحَذْ',
      '2d': 'تُشْحَذَا',
      '3md': 'يُشْحَذَا',
      '3fd': 'تُشْحَذَا',
      '1p': 'نُشْحَذْ',
      '2mp': 'تُشْحَذُوا',
      '2fp': 'تُشْحَذْنَ',
      '3mp': 'يُشْحَذُوا',
      '3fp': 'يُشْحَذْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$H*-1')!)).toEqualT('شَاحِذ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$H*-1')!)).toEqualT('مَشْحُوذ')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$H*-1')!))).toEqualT(new Set(['شَحْذ']))
  })
})
