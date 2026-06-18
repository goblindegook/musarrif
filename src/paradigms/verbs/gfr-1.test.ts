import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple } from '../nominal/participle-active'
import { derivePassiveParticiple } from '../nominal/participle-passive'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('gfr-1', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('gfr-1')!)).strings.toEqualT({
      '1s': 'غَفَرْتُ',
      '2ms': 'غَفَرْتَ',
      '2fs': 'غَفَرْتِ',
      '3ms': 'غَفَرَ',
      '3fs': 'غَفَرَتْ',
      '2d': 'غَفَرْتُمَا',
      '3md': 'غَفَرَا',
      '3fd': 'غَفَرَتَا',
      '1p': 'غَفَرْنَا',
      '2mp': 'غَفَرْتُمْ',
      '2fp': 'غَفَرْتُنَّ',
      '3mp': 'غَفَرُوا',
      '3fp': 'غَفَرْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('gfr-1')!, 'indicative')).toEqualT({
      '1s': 'أَغْفِرُ',
      '2ms': 'تَغْفِرُ',
      '2fs': 'تَغْفِرِينَ',
      '3ms': 'يَغْفِرُ',
      '3fs': 'تَغْفِرُ',
      '2d': 'تَغْفِرَانِ',
      '3md': 'يَغْفِرَانِ',
      '3fd': 'تَغْفِرَانِ',
      '1p': 'نَغْفِرُ',
      '2mp': 'تَغْفِرُونَ',
      '2fp': 'تَغْفِرْنَ',
      '3mp': 'يَغْفِرُونَ',
      '3fp': 'يَغْفِرْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('gfr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَغْفِرَ',
      '2ms': 'تَغْفِرَ',
      '2fs': 'تَغْفِرِي',
      '3ms': 'يَغْفِرَ',
      '3fs': 'تَغْفِرَ',
      '2d': 'تَغْفِرَا',
      '3md': 'يَغْفِرَا',
      '3fd': 'تَغْفِرَا',
      '1p': 'نَغْفِرَ',
      '2mp': 'تَغْفِرُوا',
      '2fp': 'تَغْفِرْنَ',
      '3mp': 'يَغْفِرُوا',
      '3fp': 'يَغْفِرْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('gfr-1')!, 'jussive')).toEqualT({
      '1s': 'أَغْفِرْ',
      '2ms': 'تَغْفِرْ',
      '2fs': 'تَغْفِرِي',
      '3ms': 'يَغْفِرْ',
      '3fs': 'تَغْفِرْ',
      '2d': 'تَغْفِرَا',
      '3md': 'يَغْفِرَا',
      '3fd': 'تَغْفِرَا',
      '1p': 'نَغْفِرْ',
      '2mp': 'تَغْفِرُوا',
      '2fp': 'تَغْفِرْنَ',
      '3mp': 'يَغْفِرُوا',
      '3fp': 'يَغْفِرْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('gfr-1')!)).toMatchObjectT({
      '2ms': 'اِغْفِرْ',
      '2fs': 'اِغْفِرِي',
      '2d': 'اِغْفِرَا',
      '2mp': 'اِغْفِرُوا',
      '2fp': 'اِغْفِرْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('gfr-1')!)).toEqualT({
      '1s': 'غُفِرْتُ',
      '2ms': 'غُفِرْتَ',
      '2fs': 'غُفِرْتِ',
      '3ms': 'غُفِرَ',
      '3fs': 'غُفِرَتْ',
      '2d': 'غُفِرْتُمَا',
      '3md': 'غُفِرَا',
      '3fd': 'غُفِرَتَا',
      '1p': 'غُفِرْنَا',
      '2mp': 'غُفِرْتُمْ',
      '2fp': 'غُفِرْتُنَّ',
      '3mp': 'غُفِرُوا',
      '3fp': 'غُفِرْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('gfr-1')!, 'indicative')).toEqualT({
      '1s': 'أُغْفَرُ',
      '2ms': 'تُغْفَرُ',
      '2fs': 'تُغْفَرِينَ',
      '3ms': 'يُغْفَرُ',
      '3fs': 'تُغْفَرُ',
      '2d': 'تُغْفَرَانِ',
      '3md': 'يُغْفَرَانِ',
      '3fd': 'تُغْفَرَانِ',
      '1p': 'نُغْفَرُ',
      '2mp': 'تُغْفَرُونَ',
      '2fp': 'تُغْفَرْنَ',
      '3mp': 'يُغْفَرُونَ',
      '3fp': 'يُغْفَرْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gfr-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُغْفَرَ',
      '2ms': 'تُغْفَرَ',
      '2fs': 'تُغْفَرِي',
      '3ms': 'يُغْفَرَ',
      '3fs': 'تُغْفَرَ',
      '2d': 'تُغْفَرَا',
      '3md': 'يُغْفَرَا',
      '3fd': 'تُغْفَرَا',
      '1p': 'نُغْفَرَ',
      '2mp': 'تُغْفَرُوا',
      '2fp': 'تُغْفَرْنَ',
      '3mp': 'يُغْفَرُوا',
      '3fp': 'يُغْفَرْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('gfr-1')!, 'jussive')).toEqualT({
      '1s': 'أُغْفَرْ',
      '2ms': 'تُغْفَرْ',
      '2fs': 'تُغْفَرِي',
      '3ms': 'يُغْفَرْ',
      '3fs': 'تُغْفَرْ',
      '2d': 'تُغْفَرَا',
      '3md': 'يُغْفَرَا',
      '3fd': 'تُغْفَرَا',
      '1p': 'نُغْفَرْ',
      '2mp': 'تُغْفَرُوا',
      '2fp': 'تُغْفَرْنَ',
      '3mp': 'يُغْفَرُوا',
      '3fp': 'يُغْفَرْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('gfr-1')!)).toEqualT('غَافِر')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('gfr-1')!)).toEqualT('مَغْفُور')
  })

  test('masdar', () => {
    expect(deriveMasdar(getVerbById('gfr-1')!)).toEqualT(['غَفْر', 'غُفْرَان', 'مَغْفِرَة'])
  })
})
