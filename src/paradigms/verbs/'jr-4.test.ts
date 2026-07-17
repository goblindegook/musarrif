import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'jr-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'jr-4")!)).toEqualT({
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
    expect(conjugatePresentMood(getVerbById("'jr-4")!, 'indicative')).toEqualT({
      '1s': 'أُوجِرُ',
      '2ms': 'تُؤْجِرُ',
      '2fs': 'تُؤْجِرِينَ',
      '3ms': 'يُؤْجِرُ',
      '3fs': 'تُؤْجِرُ',
      '2d': 'تُؤْجِرَانِ',
      '3md': 'يُؤْجِرَانِ',
      '3fd': 'تُؤْجِرَانِ',
      '1p': 'نُؤْجِرُ',
      '2mp': 'تُؤْجِرُونَ',
      '2fp': 'تُؤْجِرْنَ',
      '3mp': 'يُؤْجِرُونَ',
      '3fp': 'يُؤْجِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'jr-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُوجِرَ',
      '2ms': 'تُؤْجِرَ',
      '2fs': 'تُؤْجِرِي',
      '3ms': 'يُؤْجِرَ',
      '3fs': 'تُؤْجِرَ',
      '2d': 'تُؤْجِرَا',
      '3md': 'يُؤْجِرَا',
      '3fd': 'تُؤْجِرَا',
      '1p': 'نُؤْجِرَ',
      '2mp': 'تُؤْجِرُوا',
      '2fp': 'تُؤْجِرْنَ',
      '3mp': 'يُؤْجِرُوا',
      '3fp': 'يُؤْجِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'jr-4")!, 'jussive')).toEqualT({
      '1s': 'أُوجِرْ',
      '2ms': 'تُؤْجِرْ',
      '2fs': 'تُؤْجِرِي',
      '3ms': 'يُؤْجِرْ',
      '3fs': 'تُؤْجِرْ',
      '2d': 'تُؤْجِرَا',
      '3md': 'يُؤْجِرَا',
      '3fd': 'تُؤْجِرَا',
      '1p': 'نُؤْجِرْ',
      '2mp': 'تُؤْجِرُوا',
      '2fp': 'تُؤْجِرْنَ',
      '3mp': 'يُؤْجِرُوا',
      '3fp': 'يُؤْجِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'jr-4")!)).toMatchObjectT({
      '2ms': 'آجِرْ',
      '2fs': 'آجِرِي',
      '2d': 'آجِرَا',
      '2mp': 'آجِرُوا',
      '2fp': 'آجِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'jr-4")!)).toEqualT({
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
    expect(conjugatePassivePresentMood(getVerbById("'jr-4")!, 'indicative')).toEqualT({
      '1s': 'أُوجَرُ',
      '2ms': 'تُؤْجَرُ',
      '2fs': 'تُؤْجَرِينَ',
      '3ms': 'يُؤْجَرُ',
      '3fs': 'تُؤْجَرُ',
      '2d': 'تُؤْجَرَانِ',
      '3md': 'يُؤْجَرَانِ',
      '3fd': 'تُؤْجَرَانِ',
      '1p': 'نُؤْجَرُ',
      '2mp': 'تُؤْجَرُونَ',
      '2fp': 'تُؤْجَرْنَ',
      '3mp': 'يُؤْجَرُونَ',
      '3fp': 'يُؤْجَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jr-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُوجَرَ',
      '2ms': 'تُؤْجَرَ',
      '2fs': 'تُؤْجَرِي',
      '3ms': 'يُؤْجَرَ',
      '3fs': 'تُؤْجَرَ',
      '2d': 'تُؤْجَرَا',
      '3md': 'يُؤْجَرَا',
      '3fd': 'تُؤْجَرَا',
      '1p': 'نُؤْجَرَ',
      '2mp': 'تُؤْجَرُوا',
      '2fp': 'تُؤْجَرْنَ',
      '3mp': 'يُؤْجَرُوا',
      '3fp': 'يُؤْجَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jr-4")!, 'jussive')).toEqualT({
      '1s': 'أُوجَرْ',
      '2ms': 'تُؤْجَرْ',
      '2fs': 'تُؤْجَرِي',
      '3ms': 'يُؤْجَرْ',
      '3fs': 'تُؤْجَرْ',
      '2d': 'تُؤْجَرَا',
      '3md': 'يُؤْجَرَا',
      '3fd': 'تُؤْجَرَا',
      '1p': 'نُؤْجَرْ',
      '2mp': 'تُؤْجَرُوا',
      '2fp': 'تُؤْجَرْنَ',
      '3mp': 'يُؤْجَرُوا',
      '3fp': 'يُؤْجَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'jr-4")!)).toEqualT('مُؤْجِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'jr-4")!)).toEqualT('مُؤْجَر')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'jr-4")!)).toEqualT(['إِيجَار'])
  })
})
