import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'*n-4", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'*n-4")!)).toEqualT({
      '1s': 'آذَنْتُ',
      '2ms': 'آذَنْتَ',
      '2fs': 'آذَنْتِ',
      '3ms': 'آذَنَ',
      '3fs': 'آذَنَتْ',
      '2d': 'آذَنْتُمَا',
      '3md': 'آذَنَا',
      '3fd': 'آذَنَتَا',
      '1p': 'آذَنَّا',
      '2mp': 'آذَنْتُمْ',
      '2fp': 'آذَنْتُنَّ',
      '3mp': 'آذَنُوا',
      '3fp': 'آذَنَّ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'*n-4")!, 'indicative')).toEqualT({
      '1s': 'أُوذِنُ',
      '2ms': 'تُؤْذِنُ',
      '2fs': 'تُؤْذِنِينَ',
      '3ms': 'يُؤْذِنُ',
      '3fs': 'تُؤْذِنُ',
      '2d': 'تُؤْذِنَانِ',
      '3md': 'يُؤْذِنَانِ',
      '3fd': 'تُؤْذِنَانِ',
      '1p': 'نُؤْذِنُ',
      '2mp': 'تُؤْذِنُونَ',
      '2fp': 'تُؤْذِنَّ',
      '3mp': 'يُؤْذِنُونَ',
      '3fp': 'يُؤْذِنَّ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'*n-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُوذِنَ',
      '2ms': 'تُؤْذِنَ',
      '2fs': 'تُؤْذِنِي',
      '3ms': 'يُؤْذِنَ',
      '3fs': 'تُؤْذِنَ',
      '2d': 'تُؤْذِنَا',
      '3md': 'يُؤْذِنَا',
      '3fd': 'تُؤْذِنَا',
      '1p': 'نُؤْذِنَ',
      '2mp': 'تُؤْذِنُوا',
      '2fp': 'تُؤْذِنَّ',
      '3mp': 'يُؤْذِنُوا',
      '3fp': 'يُؤْذِنَّ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'*n-4")!, 'jussive')).toEqualT({
      '1s': 'أُوذِنْ',
      '2ms': 'تُؤْذِنْ',
      '2fs': 'تُؤْذِنِي',
      '3ms': 'يُؤْذِنْ',
      '3fs': 'تُؤْذِنْ',
      '2d': 'تُؤْذِنَا',
      '3md': 'يُؤْذِنَا',
      '3fd': 'تُؤْذِنَا',
      '1p': 'نُؤْذِنْ',
      '2mp': 'تُؤْذِنُوا',
      '2fp': 'تُؤْذِنَّ',
      '3mp': 'يُؤْذِنُوا',
      '3fp': 'يُؤْذِنَّ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'*n-4")!)).toMatchObjectT({
      '2ms': 'آذِنْ',
      '2fs': 'آذِنِي',
      '2d': 'آذِنَا',
      '2mp': 'آذِنُوا',
      '2fp': 'آذِنَّ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'*n-4")!)).toEqualT({
      '1s': 'أُوذِنْتُ',
      '2ms': 'أُوذِنْتَ',
      '2fs': 'أُوذِنْتِ',
      '3ms': 'أُوذِنَ',
      '3fs': 'أُوذِنَتْ',
      '2d': 'أُوذِنْتُمَا',
      '3md': 'أُوذِنَا',
      '3fd': 'أُوذِنَتَا',
      '1p': 'أُوذِنَّا',
      '2mp': 'أُوذِنْتُمْ',
      '2fp': 'أُوذِنْتُنَّ',
      '3mp': 'أُوذِنُوا',
      '3fp': 'أُوذِنَّ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*n-4")!, 'indicative')).toEqualT({
      '1s': 'أُوذَنُ',
      '2ms': 'تُؤْذَنُ',
      '2fs': 'تُؤْذَنِينَ',
      '3ms': 'يُؤْذَنُ',
      '3fs': 'تُؤْذَنُ',
      '2d': 'تُؤْذَنَانِ',
      '3md': 'يُؤْذَنَانِ',
      '3fd': 'تُؤْذَنَانِ',
      '1p': 'نُؤْذَنُ',
      '2mp': 'تُؤْذَنُونَ',
      '2fp': 'تُؤْذَنَّ',
      '3mp': 'يُؤْذَنُونَ',
      '3fp': 'يُؤْذَنَّ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*n-4")!, 'subjunctive')).toEqualT({
      '1s': 'أُوذَنَ',
      '2ms': 'تُؤْذَنَ',
      '2fs': 'تُؤْذَنِي',
      '3ms': 'يُؤْذَنَ',
      '3fs': 'تُؤْذَنَ',
      '2d': 'تُؤْذَنَا',
      '3md': 'يُؤْذَنَا',
      '3fd': 'تُؤْذَنَا',
      '1p': 'نُؤْذَنَ',
      '2mp': 'تُؤْذَنُوا',
      '2fp': 'تُؤْذَنَّ',
      '3mp': 'يُؤْذَنُوا',
      '3fp': 'يُؤْذَنَّ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'*n-4")!, 'jussive')).toEqualT({
      '1s': 'أُوذَنْ',
      '2ms': 'تُؤْذَنْ',
      '2fs': 'تُؤْذَنِي',
      '3ms': 'يُؤْذَنْ',
      '3fs': 'تُؤْذَنْ',
      '2d': 'تُؤْذَنَا',
      '3md': 'يُؤْذَنَا',
      '3fd': 'تُؤْذَنَا',
      '1p': 'نُؤْذَنْ',
      '2mp': 'تُؤْذَنُوا',
      '2fp': 'تُؤْذَنَّ',
      '3mp': 'يُؤْذَنُوا',
      '3fp': 'يُؤْذَنَّ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'*n-4")!)).toEqualT('مُؤْذِن')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'*n-4")!)).toEqualT('مُؤْذَن')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById("'*n-4")!)).toEqualT(['إِيذَان'])
  })
})
