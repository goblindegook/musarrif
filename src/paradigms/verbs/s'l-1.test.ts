import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("s'l-1", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("s'l-1")!)).toEqualT({
      '1s': 'سَأَلْتُ',
      '2ms': 'سَأَلْتَ',
      '2fs': 'سَأَلْتِ',
      '3ms': 'سَأَلَ',
      '3fs': 'سَأَلَتْ',
      '2d': 'سَأَلْتُمَا',
      '3md': 'سَأَلَا',
      '3fd': 'سَأَلَتَا',
      '1p': 'سَأَلْنَا',
      '2mp': 'سَأَلْتُمْ',
      '2fp': 'سَأَلْتُنَّ',
      '3mp': 'سَأَلُوا',
      '3fp': 'سَأَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("s'l-1")!, 'indicative')).toEqualT({
      '1s': 'أَسْأَلُ',
      '2ms': 'تَسْأَلُ',
      '2fs': 'تَسْأَلِينَ',
      '3ms': 'يَسْأَلُ',
      '3fs': 'تَسْأَلُ',
      '2d': 'تَسْأَلَانِ',
      '3md': 'يَسْأَلَانِ',
      '3fd': 'تَسْأَلَانِ',
      '1p': 'نَسْأَلُ',
      '2mp': 'تَسْأَلُونَ',
      '2fp': 'تَسْأَلْنَ',
      '3mp': 'يَسْأَلُونَ',
      '3fp': 'يَسْأَلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("s'l-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَسْأَلَ',
      '2ms': 'تَسْأَلَ',
      '2fs': 'تَسْأَلِي',
      '3ms': 'يَسْأَلَ',
      '3fs': 'تَسْأَلَ',
      '2d': 'تَسْأَلَا',
      '3md': 'يَسْأَلَا',
      '3fd': 'تَسْأَلَا',
      '1p': 'نَسْأَلَ',
      '2mp': 'تَسْأَلُوا',
      '2fp': 'تَسْأَلْنَ',
      '3mp': 'يَسْأَلُوا',
      '3fp': 'يَسْأَلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("s'l-1")!, 'jussive')).toEqualT({
      '1s': 'أَسْأَلْ',
      '2ms': 'تَسْأَلْ',
      '2fs': 'تَسْأَلِي',
      '3ms': 'يَسْأَلْ',
      '3fs': 'تَسْأَلْ',
      '2d': 'تَسْأَلَا',
      '3md': 'يَسْأَلَا',
      '3fd': 'تَسْأَلَا',
      '1p': 'نَسْأَلْ',
      '2mp': 'تَسْأَلُوا',
      '2fp': 'تَسْأَلْنَ',
      '3mp': 'يَسْأَلُوا',
      '3fp': 'يَسْأَلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("s'l-1")!)).toMatchObjectT({
      '2ms': 'اِسْأَلْ',
      '2fs': 'اِسْأَلِي',
      '2d': 'اِسْأَلَا',
      '2mp': 'اِسْأَلُوا',
      '2fp': 'اِسْأَلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("s'l-1")!)).toEqualT({
      '1s': 'سُئِلْتُ',
      '2ms': 'سُئِلْتَ',
      '2fs': 'سُئِلْتِ',
      '3ms': 'سُئِلَ',
      '3fs': 'سُئِلَتْ',
      '2d': 'سُئِلْتُمَا',
      '3md': 'سُئِلَا',
      '3fd': 'سُئِلَتَا',
      '1p': 'سُئِلْنَا',
      '2mp': 'سُئِلْتُمْ',
      '2fp': 'سُئِلْتُنَّ',
      '3mp': 'سُئِلُوا',
      '3fp': 'سُئِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("s'l-1")!, 'indicative')).toEqualT({
      '1s': 'أُسْأَلُ',
      '2ms': 'تُسْأَلُ',
      '2fs': 'تُسْأَلِينَ',
      '3ms': 'يُسْأَلُ',
      '3fs': 'تُسْأَلُ',
      '2d': 'تُسْأَلَانِ',
      '3md': 'يُسْأَلَانِ',
      '3fd': 'تُسْأَلَانِ',
      '1p': 'نُسْأَلُ',
      '2mp': 'تُسْأَلُونَ',
      '2fp': 'تُسْأَلْنَ',
      '3mp': 'يُسْأَلُونَ',
      '3fp': 'يُسْأَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("s'l-1")!, 'subjunctive')).toEqualT({
      '1s': 'أُسْأَلَ',
      '2ms': 'تُسْأَلَ',
      '2fs': 'تُسْأَلِي',
      '3ms': 'يُسْأَلَ',
      '3fs': 'تُسْأَلَ',
      '2d': 'تُسْأَلَا',
      '3md': 'يُسْأَلَا',
      '3fd': 'تُسْأَلَا',
      '1p': 'نُسْأَلَ',
      '2mp': 'تُسْأَلُوا',
      '2fp': 'تُسْأَلْنَ',
      '3mp': 'يُسْأَلُوا',
      '3fp': 'يُسْأَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("s'l-1")!, 'jussive')).toEqualT({
      '1s': 'أُسْأَلْ',
      '2ms': 'تُسْأَلْ',
      '2fs': 'تُسْأَلِي',
      '3ms': 'يُسْأَلْ',
      '3fs': 'تُسْأَلْ',
      '2d': 'تُسْأَلَا',
      '3md': 'يُسْأَلَا',
      '3fd': 'تُسْأَلَا',
      '1p': 'نُسْأَلْ',
      '2mp': 'تُسْأَلُوا',
      '2fp': 'تُسْأَلْنَ',
      '3mp': 'يُسْأَلُوا',
      '3fp': 'يُسْأَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("s'l-1")!)).toEqualT('سَائِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("s'l-1")!)).toEqualT('مَسْؤُول')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("s'l-1")!)).toEqualT(['سُؤَال', 'مَسْأَلَة', 'تَسْآل'])
  })
})
