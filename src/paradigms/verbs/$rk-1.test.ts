import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('$rk-1 (Wiktionary)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('$rk-1')!)).toEqualT({
      '1s': 'شَرِكْتُ',
      '2ms': 'شَرِكْتَ',
      '2fs': 'شَرِكْتِ',
      '3ms': 'شَرِكَ',
      '3fs': 'شَرِكَتْ',
      '2d': 'شَرِكْتُمَا',
      '3md': 'شَرِكَا',
      '3fd': 'شَرِكَتَا',
      '1p': 'شَرِكْنَا',
      '2mp': 'شَرِكْتُمْ',
      '2fp': 'شَرِكْتُنَّ',
      '3mp': 'شَرِكُوا',
      '3fp': 'شَرِكْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('$rk-1')!, 'indicative')).toEqualT({
      '1s': 'أَشْرَكُ',
      '2ms': 'تَشْرَكُ',
      '2fs': 'تَشْرَكِينَ',
      '3ms': 'يَشْرَكُ',
      '3fs': 'تَشْرَكُ',
      '2d': 'تَشْرَكَانِ',
      '3md': 'يَشْرَكَانِ',
      '3fd': 'تَشْرَكَانِ',
      '1p': 'نَشْرَكُ',
      '2mp': 'تَشْرَكُونَ',
      '2fp': 'تَشْرَكْنَ',
      '3mp': 'يَشْرَكُونَ',
      '3fp': 'يَشْرَكْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('$rk-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَشْرَكَ',
      '2ms': 'تَشْرَكَ',
      '2fs': 'تَشْرَكِي',
      '3ms': 'يَشْرَكَ',
      '3fs': 'تَشْرَكَ',
      '2d': 'تَشْرَكَا',
      '3md': 'يَشْرَكَا',
      '3fd': 'تَشْرَكَا',
      '1p': 'نَشْرَكَ',
      '2mp': 'تَشْرَكُوا',
      '2fp': 'تَشْرَكْنَ',
      '3mp': 'يَشْرَكُوا',
      '3fp': 'يَشْرَكْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('$rk-1')!, 'jussive')).toEqualT({
      '1s': 'أَشْرَكْ',
      '2ms': 'تَشْرَكْ',
      '2fs': 'تَشْرَكِي',
      '3ms': 'يَشْرَكْ',
      '3fs': 'تَشْرَكْ',
      '2d': 'تَشْرَكَا',
      '3md': 'يَشْرَكَا',
      '3fd': 'تَشْرَكَا',
      '1p': 'نَشْرَكْ',
      '2mp': 'تَشْرَكُوا',
      '2fp': 'تَشْرَكْنَ',
      '3mp': 'يَشْرَكُوا',
      '3fp': 'يَشْرَكْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('$rk-1')!)).toMatchObjectT({
      '2ms': 'اِشْرَكْ',
      '2fs': 'اِشْرَكِي',
      '2d': 'اِشْرَكَا',
      '2mp': 'اِشْرَكُوا',
      '2fp': 'اِشْرَكْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('$rk-1')!)).toEqualT({
      '1s': 'شُرِكْتُ',
      '2ms': 'شُرِكْتَ',
      '2fs': 'شُرِكْتِ',
      '3ms': 'شُرِكَ',
      '3fs': 'شُرِكَتْ',
      '2d': 'شُرِكْتُمَا',
      '3md': 'شُرِكَا',
      '3fd': 'شُرِكَتَا',
      '1p': 'شُرِكْنَا',
      '2mp': 'شُرِكْتُمْ',
      '2fp': 'شُرِكْتُنَّ',
      '3mp': 'شُرِكُوا',
      '3fp': 'شُرِكْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('$rk-1')!, 'indicative')).toEqualT({
      '1s': 'أُشْرَكُ',
      '2ms': 'تُشْرَكُ',
      '2fs': 'تُشْرَكِينَ',
      '3ms': 'يُشْرَكُ',
      '3fs': 'تُشْرَكُ',
      '2d': 'تُشْرَكَانِ',
      '3md': 'يُشْرَكَانِ',
      '3fd': 'تُشْرَكَانِ',
      '1p': 'نُشْرَكُ',
      '2mp': 'تُشْرَكُونَ',
      '2fp': 'تُشْرَكْنَ',
      '3mp': 'يُشْرَكُونَ',
      '3fp': 'يُشْرَكْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$rk-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُشْرَكَ',
      '2ms': 'تُشْرَكَ',
      '2fs': 'تُشْرَكِي',
      '3ms': 'يُشْرَكَ',
      '3fs': 'تُشْرَكَ',
      '2d': 'تُشْرَكَا',
      '3md': 'يُشْرَكَا',
      '3fd': 'تُشْرَكَا',
      '1p': 'نُشْرَكَ',
      '2mp': 'تُشْرَكُوا',
      '2fp': 'تُشْرَكْنَ',
      '3mp': 'يُشْرَكُوا',
      '3fp': 'يُشْرَكْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('$rk-1')!, 'jussive')).toEqualT({
      '1s': 'أُشْرَكْ',
      '2ms': 'تُشْرَكْ',
      '2fs': 'تُشْرَكِي',
      '3ms': 'يُشْرَكْ',
      '3fs': 'تُشْرَكْ',
      '2d': 'تُشْرَكَا',
      '3md': 'يُشْرَكَا',
      '3fd': 'تُشْرَكَا',
      '1p': 'نُشْرَكْ',
      '2mp': 'تُشْرَكُوا',
      '2fp': 'تُشْرَكْنَ',
      '3mp': 'يُشْرَكُوا',
      '3fp': 'يُشْرَكْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('$rk-1')!)).toEqualT('شَرِيك')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('$rk-1')!)).toEqualT('مَشْرُوك')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('$rk-1')!))).toEqualT(new Set(['شِرْك', 'شِرْكَة', 'شَرِكَة']))
  })
})
