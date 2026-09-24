import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe("'wl-1 (Wiktionary)", () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById("'wl-1")!)).toEqualT({
      '1s': 'أُلْتُ',
      '2ms': 'أُلْتَ',
      '2fs': 'أُلْتِ',
      '3ms': 'آلَ',
      '3fs': 'آلَتْ',
      '2d': 'أُلْتُمَا',
      '3md': 'آلَا',
      '3fd': 'آلَتَا',
      '1p': 'أُلْنَا',
      '2mp': 'أُلْتُمْ',
      '2fp': 'أُلْتُنَّ',
      '3mp': 'آلُوا',
      '3fp': 'أُلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById("'wl-1")!, 'indicative')).toEqualT({
      '1s': 'أَؤُولُ',
      '2ms': 'تَؤُولُ',
      '2fs': 'تَؤُولِينَ',
      '3ms': 'يَؤُولُ',
      '3fs': 'تَؤُولُ',
      '2d': 'تَؤُولَانِ',
      '3md': 'يَؤُولَانِ',
      '3fd': 'تَؤُولَانِ',
      '1p': 'نَؤُولُ',
      '2mp': 'تَؤُولُونَ',
      '2fp': 'تَؤُلْنَ',
      '3mp': 'يَؤُولُونَ',
      '3fp': 'يَؤُلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById("'wl-1")!, 'subjunctive')).toEqualT({
      '1s': 'أَؤُولَ',
      '2ms': 'تَؤُولَ',
      '2fs': 'تَؤُولِي',
      '3ms': 'يَؤُولَ',
      '3fs': 'تَؤُولَ',
      '2d': 'تَؤُولَا',
      '3md': 'يَؤُولَا',
      '3fd': 'تَؤُولَا',
      '1p': 'نَؤُولَ',
      '2mp': 'تَؤُولُوا',
      '2fp': 'تَؤُلْنَ',
      '3mp': 'يَؤُولُوا',
      '3fp': 'يَؤُلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById("'wl-1")!, 'jussive')).toEqualT({
      '1s': 'أَؤُلْ',
      '2ms': 'تَؤُلْ',
      '2fs': 'تَؤُولِي',
      '3ms': 'يَؤُلْ',
      '3fs': 'تَؤُلْ',
      '2d': 'تَؤُولَا',
      '3md': 'يَؤُولَا',
      '3fd': 'تَؤُولَا',
      '1p': 'نَؤُلْ',
      '2mp': 'تَؤُولُوا',
      '2fp': 'تَؤُلْنَ',
      '3mp': 'يَؤُولُوا',
      '3fp': 'يَؤُلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById("'wl-1")!)).toMatchObjectT({
      '2ms': 'أُلْ',
      '2fs': 'أُولِي',
      '2d': 'أُولَا',
      '2mp': 'أُولُوا',
      '2fp': 'أُلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById("'wl-1")!)).toMatchObjectT({
      '3ms': 'إِيلَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wl-1")!, 'indicative')).toMatchObjectT({
      '3ms': 'يُؤَالُ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wl-1")!, 'subjunctive')).toMatchObjectT({
      '3ms': 'يُؤَالَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById("'wl-1")!, 'jussive')).toMatchObjectT({
      '3ms': 'يُؤَلْ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById("'wl-1")!)).toEqualT('آئِل')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById("'wl-1")!)).toEqualT('مَؤُول')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById("'wl-1")!))).toEqualT(new Set(['أَوْل', 'إِيَال', 'أَيْلُولَة']))
  })
})
