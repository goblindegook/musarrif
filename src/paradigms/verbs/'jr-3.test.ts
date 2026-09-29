import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'jr-3 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'jr-3")!)).toEqualT({
      '1s': 'آجَرْتُ',
      '2ms': 'آجَرْتَ',
      '2fs': 'آجَرْتِ',
      '3ms': 'آجَرَ',
      '3fs': 'آجَرَتْ',
      '2d': 'آجَرْتُمَا',
      '3md': 'آجَرَا',
      '3fd': 'آجَرَتَا',
      '1p': 'آجَرْنَا',
      '2mp': 'آجَرْتُمْ',
      '2fp': 'آجَرْتُنَّ',
      '3mp': 'آجَرُوا',
      '3fp': 'آجَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'jr-3")!, 'indicative')).toEqualT({
      '1s': 'أُؤَاجِرُ',
      '2ms': 'تُؤَاجِرُ',
      '2fs': 'تُؤَاجِرِينَ',
      '3ms': 'يُؤَاجِرُ',
      '3fs': 'تُؤَاجِرُ',
      '2d': 'تُؤَاجِرَانِ',
      '3md': 'يُؤَاجِرَانِ',
      '3fd': 'تُؤَاجِرَانِ',
      '1p': 'نُؤَاجِرُ',
      '2mp': 'تُؤَاجِرُونَ',
      '2fp': 'تُؤَاجِرْنَ',
      '3mp': 'يُؤَاجِرُونَ',
      '3fp': 'يُؤَاجِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'jr-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَاجِرَ',
      '2ms': 'تُؤَاجِرَ',
      '2fs': 'تُؤَاجِرِي',
      '3ms': 'يُؤَاجِرَ',
      '3fs': 'تُؤَاجِرَ',
      '2d': 'تُؤَاجِرَا',
      '3md': 'يُؤَاجِرَا',
      '3fd': 'تُؤَاجِرَا',
      '1p': 'نُؤَاجِرَ',
      '2mp': 'تُؤَاجِرُوا',
      '2fp': 'تُؤَاجِرْنَ',
      '3mp': 'يُؤَاجِرُوا',
      '3fp': 'يُؤَاجِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'jr-3")!, 'jussive')).toEqualT({
      '1s': 'أُؤَاجِرْ',
      '2ms': 'تُؤَاجِرْ',
      '2fs': 'تُؤَاجِرِي',
      '3ms': 'يُؤَاجِرْ',
      '3fs': 'تُؤَاجِرْ',
      '2d': 'تُؤَاجِرَا',
      '3md': 'يُؤَاجِرَا',
      '3fd': 'تُؤَاجِرَا',
      '1p': 'نُؤَاجِرْ',
      '2mp': 'تُؤَاجِرُوا',
      '2fp': 'تُؤَاجِرْنَ',
      '3mp': 'يُؤَاجِرُوا',
      '3fp': 'يُؤَاجِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'jr-3")!)).toMatchObjectT({
      '2ms': 'آجِرْ',
      '2fs': 'آجِرِي',
      '2d': 'آجِرَا',
      '2mp': 'آجِرُوا',
      '2fp': 'آجِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'jr-3")!)).toEqualT({
      '1s': 'أُوجِرْتُ',
      '2ms': 'أُوجِرْتَ',
      '2fs': 'أُوجِرْتِ',
      '3ms': 'أُوجِرَ',
      '3fs': 'أُوجِرَتْ',
      '2d': 'أُوجِرْتُمَا',
      '3md': 'أُوجِرَا',
      '3fd': 'أُوجِرَتَا',
      '1p': 'أُوجِرْنَا',
      '2mp': 'أُوجِرْتُمْ',
      '2fp': 'أُوجِرْتُنَّ',
      '3mp': 'أُوجِرُوا',
      '3fp': 'أُوجِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jr-3")!, 'indicative')).toEqualT({
      '1s': 'أُؤَاجَرُ',
      '2ms': 'تُؤَاجَرُ',
      '2fs': 'تُؤَاجَرِينَ',
      '3ms': 'يُؤَاجَرُ',
      '3fs': 'تُؤَاجَرُ',
      '2d': 'تُؤَاجَرَانِ',
      '3md': 'يُؤَاجَرَانِ',
      '3fd': 'تُؤَاجَرَانِ',
      '1p': 'نُؤَاجَرُ',
      '2mp': 'تُؤَاجَرُونَ',
      '2fp': 'تُؤَاجَرْنَ',
      '3mp': 'يُؤَاجَرُونَ',
      '3fp': 'يُؤَاجَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jr-3")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَاجَرَ',
      '2ms': 'تُؤَاجَرَ',
      '2fs': 'تُؤَاجَرِي',
      '3ms': 'يُؤَاجَرَ',
      '3fs': 'تُؤَاجَرَ',
      '2d': 'تُؤَاجَرَا',
      '3md': 'يُؤَاجَرَا',
      '3fd': 'تُؤَاجَرَا',
      '1p': 'نُؤَاجَرَ',
      '2mp': 'تُؤَاجَرُوا',
      '2fp': 'تُؤَاجَرْنَ',
      '3mp': 'يُؤَاجَرُوا',
      '3fp': 'يُؤَاجَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jr-3")!, 'jussive')).toEqualT({
      '1s': 'أُؤَاجَرْ',
      '2ms': 'تُؤَاجَرْ',
      '2fs': 'تُؤَاجَرِي',
      '3ms': 'يُؤَاجَرْ',
      '3fs': 'تُؤَاجَرْ',
      '2d': 'تُؤَاجَرَا',
      '3md': 'يُؤَاجَرَا',
      '3fd': 'تُؤَاجَرَا',
      '1p': 'نُؤَاجَرْ',
      '2mp': 'تُؤَاجَرُوا',
      '2fp': 'تُؤَاجَرْنَ',
      '3mp': 'يُؤَاجَرُوا',
      '3fp': 'يُؤَاجَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'jr-3")!)).toEqualT('مُؤَاجِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'jr-3")!)).toEqualT('مُؤَاجَر')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'jr-3")!))).toEqualT(new Set(['مُؤَاجَرَة']))
  })
})
