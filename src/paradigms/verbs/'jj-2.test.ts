import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'jj-2 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'jj-2")!)).toEqualT({
      '1s': 'أَجَّجْتُ',
      '2ms': 'أَجَّجْتَ',
      '2fs': 'أَجَّجْتِ',
      '3ms': 'أَجَّجَ',
      '3fs': 'أَجَّجَتْ',
      '2d': 'أَجَّجْتُمَا',
      '3md': 'أَجَّجَا',
      '3fd': 'أَجَّجَتَا',
      '1p': 'أَجَّجْنَا',
      '2mp': 'أَجَّجْتُمْ',
      '2fp': 'أَجَّجْتُنَّ',
      '3mp': 'أَجَّجُوا',
      '3fp': 'أَجَّجْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'jj-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَجِّجُ',
      '2ms': 'تُؤَجِّجُ',
      '2fs': 'تُؤَجِّجِينَ',
      '3ms': 'يُؤَجِّجُ',
      '3fs': 'تُؤَجِّجُ',
      '2d': 'تُؤَجِّجَانِ',
      '3md': 'يُؤَجِّجَانِ',
      '3fd': 'تُؤَجِّجَانِ',
      '1p': 'نُؤَجِّجُ',
      '2mp': 'تُؤَجِّجُونَ',
      '2fp': 'تُؤَجِّجْنَ',
      '3mp': 'يُؤَجِّجُونَ',
      '3fp': 'يُؤَجِّجْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'jj-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَجِّجَ',
      '2ms': 'تُؤَجِّجَ',
      '2fs': 'تُؤَجِّجِي',
      '3ms': 'يُؤَجِّجَ',
      '3fs': 'تُؤَجِّجَ',
      '2d': 'تُؤَجِّجَا',
      '3md': 'يُؤَجِّجَا',
      '3fd': 'تُؤَجِّجَا',
      '1p': 'نُؤَجِّجَ',
      '2mp': 'تُؤَجِّجُوا',
      '2fp': 'تُؤَجِّجْنَ',
      '3mp': 'يُؤَجِّجُوا',
      '3fp': 'يُؤَجِّجْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'jj-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَجِّجْ',
      '2ms': 'تُؤَجِّجْ',
      '2fs': 'تُؤَجِّجِي',
      '3ms': 'يُؤَجِّجْ',
      '3fs': 'تُؤَجِّجْ',
      '2d': 'تُؤَجِّجَا',
      '3md': 'يُؤَجِّجَا',
      '3fd': 'تُؤَجِّجَا',
      '1p': 'نُؤَجِّجْ',
      '2mp': 'تُؤَجِّجُوا',
      '2fp': 'تُؤَجِّجْنَ',
      '3mp': 'يُؤَجِّجُوا',
      '3fp': 'يُؤَجِّجْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'jj-2")!)).toMatchObjectT({
      '2ms': 'أَجِّجْ',
      '2fs': 'أَجِّجِي',
      '2d': 'أَجِّجَا',
      '2mp': 'أَجِّجُوا',
      '2fp': 'أَجِّجْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'jj-2")!)).toEqualT({
      '1s': 'أُجِّجْتُ',
      '2ms': 'أُجِّجْتَ',
      '2fs': 'أُجِّجْتِ',
      '3ms': 'أُجِّجَ',
      '3fs': 'أُجِّجَتْ',
      '2d': 'أُجِّجْتُمَا',
      '3md': 'أُجِّجَا',
      '3fd': 'أُجِّجَتَا',
      '1p': 'أُجِّجْنَا',
      '2mp': 'أُجِّجْتُمْ',
      '2fp': 'أُجِّجْتُنَّ',
      '3mp': 'أُجِّجُوا',
      '3fp': 'أُجِّجْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jj-2")!, 'indicative')).toEqualT({
      '1s': 'أُؤَجَّجُ',
      '2ms': 'تُؤَجَّجُ',
      '2fs': 'تُؤَجَّجِينَ',
      '3ms': 'يُؤَجَّجُ',
      '3fs': 'تُؤَجَّجُ',
      '2d': 'تُؤَجَّجَانِ',
      '3md': 'يُؤَجَّجَانِ',
      '3fd': 'تُؤَجَّجَانِ',
      '1p': 'نُؤَجَّجُ',
      '2mp': 'تُؤَجَّجُونَ',
      '2fp': 'تُؤَجَّجْنَ',
      '3mp': 'يُؤَجَّجُونَ',
      '3fp': 'يُؤَجَّجْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jj-2")!, 'subjunctive')).toEqualT({
      '1s': 'أُؤَجَّجَ',
      '2ms': 'تُؤَجَّجَ',
      '2fs': 'تُؤَجَّجِي',
      '3ms': 'يُؤَجَّجَ',
      '3fs': 'تُؤَجَّجَ',
      '2d': 'تُؤَجَّجَا',
      '3md': 'يُؤَجَّجَا',
      '3fd': 'تُؤَجَّجَا',
      '1p': 'نُؤَجَّجَ',
      '2mp': 'تُؤَجَّجُوا',
      '2fp': 'تُؤَجَّجْنَ',
      '3mp': 'يُؤَجَّجُوا',
      '3fp': 'يُؤَجَّجْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'jj-2")!, 'jussive')).toEqualT({
      '1s': 'أُؤَجَّجْ',
      '2ms': 'تُؤَجَّجْ',
      '2fs': 'تُؤَجَّجِي',
      '3ms': 'يُؤَجَّجْ',
      '3fs': 'تُؤَجَّجْ',
      '2d': 'تُؤَجَّجَا',
      '3md': 'يُؤَجَّجَا',
      '3fd': 'تُؤَجَّجَا',
      '1p': 'نُؤَجَّجْ',
      '2mp': 'تُؤَجَّجُوا',
      '2fp': 'تُؤَجَّجْنَ',
      '3mp': 'يُؤَجَّجُوا',
      '3fp': 'يُؤَجَّجْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'jj-2")!)).toEqualT('مُؤَجِّج')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'jj-2")!)).toEqualT('مُؤَجَّج')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'jj-2")!))).toEqualT(new Set(['تَأْجِيج']))
  })
})
