import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'mn-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'mn-4")!)).toEqualT({
      '1s': 'آمَنْتُ',
      '2ms': 'آمَنْتَ',
      '2fs': 'آمَنْتِ',
      '3ms': 'آمَنَ',
      '3fs': 'آمَنَتْ',
      '2d': 'آمَنْتُمَا',
      '3md': 'آمَنَا',
      '3fd': 'آمَنَتَا',
      '1p': 'آمَنَّا',
      '2mp': 'آمَنْتُمْ',
      '2fp': 'آمَنْتُنَّ',
      '3mp': 'آمَنُوا',
      '3fp': 'آمَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'mn-4")!, 'indicative')).toEqualT({
      '1s': 'أُومِنُ',
      '2ms': 'تُؤْمِنُ',
      '2fs': 'تُؤْمِنِينَ',
      '3ms': 'يُؤْمِنُ',
      '3fs': 'تُؤْمِنُ',
      '2d': 'تُؤْمِنَانِ',
      '3md': 'يُؤْمِنَانِ',
      '3fd': 'تُؤْمِنَانِ',
      '1p': 'نُؤْمِنُ',
      '2mp': 'تُؤْمِنُونَ',
      '2fp': 'تُؤْمِنَّ',
      '3mp': 'يُؤْمِنُونَ',
      '3fp': 'يُؤْمِنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'mn-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُومِنَ',
      '2ms': 'تُؤْمِنَ',
      '2fs': 'تُؤْمِنِي',
      '3ms': 'يُؤْمِنَ',
      '3fs': 'تُؤْمِنَ',
      '2d': 'تُؤْمِنَا',
      '3md': 'يُؤْمِنَا',
      '3fd': 'تُؤْمِنَا',
      '1p': 'نُؤْمِنَ',
      '2mp': 'تُؤْمِنُوا',
      '2fp': 'تُؤْمِنَّ',
      '3mp': 'يُؤْمِنُوا',
      '3fp': 'يُؤْمِنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'mn-4")!, 'jussive')).toEqualT({
      '1s': 'أُومِنْ',
      '2ms': 'تُؤْمِنْ',
      '2fs': 'تُؤْمِنِي',
      '3ms': 'يُؤْمِنْ',
      '3fs': 'تُؤْمِنْ',
      '2d': 'تُؤْمِنَا',
      '3md': 'يُؤْمِنَا',
      '3fd': 'تُؤْمِنَا',
      '1p': 'نُؤْمِنْ',
      '2mp': 'تُؤْمِنُوا',
      '2fp': 'تُؤْمِنَّ',
      '3mp': 'يُؤْمِنُوا',
      '3fp': 'يُؤْمِنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'mn-4")!)).toMatchObjectT({
      '2ms': 'آمِنْ',
      '2fs': 'آمِنِي',
      '2d': 'آمِنَا',
      '2mp': 'آمِنُوا',
      '2fp': 'آمِنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'mn-4")!)).toMatchObjectT({
      '3ms': 'أُومِنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mn-4")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُؤْمَنُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mn-4")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُؤْمَنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'mn-4")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُؤْمَنْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'mn-4")!)).toEqualT('مُؤْمِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'mn-4")!)).toEqualT('مُؤْمَن')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'mn-4")!)).toEqualT(['إِيمَان'])
  })
})
