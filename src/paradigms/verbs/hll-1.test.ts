import { describe, expect, test } from 'vitest'
import { conjugateImperative } from '../active/imperative'
import { conjugatePast } from '../active/past'
import { conjugatePresentMood } from '../active/present'
import { deriveMasdar } from '../nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../nominal/participle'
import { conjugatePassivePast } from '../passive/past'
import { conjugatePassivePresentMood } from '../passive/present'
import { getVerbById } from '../verbs'

describe('hll-1 (ElixirFM)', () => {
  test('active past', () => {
    expect(conjugatePast(getVerbById('hll-1')!)).toEqualT({
      '1s': 'هَلَلْتُ',
      '2ms': 'هَلَلْتَ',
      '2fs': 'هَلَلْتِ',
      '3ms': 'هَلَّ',
      '3fs': 'هَلَّتْ',
      '2d': 'هَلَلْتُمَا',
      '3md': 'هَلَّا',
      '3fd': 'هَلَّتَا',
      '1p': 'هَلَلْنَا',
      '2mp': 'هَلَلْتُمْ',
      '2fp': 'هَلَلْتُنَّ',
      '3mp': 'هَلُّوا',
      '3fp': 'هَلَلْنَ',
    })
  })

  test('active present indicative', () => {
    expect(conjugatePresentMood(getVerbById('hll-1')!, 'indicative')).toEqualT({
      '1s': 'أَهِلُّ',
      '2ms': 'تَهِلُّ',
      '2fs': 'تَهِلِّينَ',
      '3ms': 'يَهِلُّ',
      '3fs': 'تَهِلُّ',
      '2d': 'تَهِلَّانِ',
      '3md': 'يَهِلَّانِ',
      '3fd': 'تَهِلَّانِ',
      '1p': 'نَهِلُّ',
      '2mp': 'تَهِلُّونَ',
      '2fp': 'تَهْلِلْنَ',
      '3mp': 'يَهِلُّونَ',
      '3fp': 'يَهْلِلْنَ',
    })
  })

  test('active present subjunctive', () => {
    expect(conjugatePresentMood(getVerbById('hll-1')!, 'subjunctive')).toEqualT({
      '1s': 'أَهِلَّ',
      '2ms': 'تَهِلَّ',
      '2fs': 'تَهِلِّي',
      '3ms': 'يَهِلَّ',
      '3fs': 'تَهِلَّ',
      '2d': 'تَهِلَّا',
      '3md': 'يَهِلَّا',
      '3fd': 'تَهِلَّا',
      '1p': 'نَهِلَّ',
      '2mp': 'تَهِلُّوا',
      '2fp': 'تَهْلِلْنَ',
      '3mp': 'يَهِلُّوا',
      '3fp': 'يَهْلِلْنَ',
    })
  })

  test('active present jussive', () => {
    expect(conjugatePresentMood(getVerbById('hll-1')!, 'jussive')).toEqualT({
      '1s': 'أَهِلَّ',
      '2ms': 'تَهِلَّ',
      '2fs': 'تَهِلِّي',
      '3ms': 'يَهِلَّ',
      '3fs': 'تَهِلَّ',
      '2d': 'تَهِلَّا',
      '3md': 'يَهِلَّا',
      '3fd': 'تَهِلَّا',
      '1p': 'نَهِلَّ',
      '2mp': 'تَهِلُّوا',
      '2fp': 'تَهْلِلْنَ',
      '3mp': 'يَهِلُّوا',
      '3fp': 'يَهْلِلْنَ',
    })
  })

  test('active imperative', () => {
    expect(conjugateImperative(getVerbById('hll-1')!)).toMatchObjectT({
      '2ms': 'هِلَّ',
      '2fs': 'هِلِّي',
      '2d': 'هِلَّا',
      '2mp': 'هِلُّوا',
      '2fp': 'اِهْلِلْنَ',
    })
  })

  test('passive past', () => {
    expect(conjugatePassivePast(getVerbById('hll-1')!)).toEqualT({
      '1s': 'هُلِلْتُ',
      '2ms': 'هُلِلْتَ',
      '2fs': 'هُلِلْتِ',
      '3ms': 'هُلَّ',
      '3fs': 'هُلَّتْ',
      '2d': 'هُلِلْتُمَا',
      '3md': 'هُلَّا',
      '3fd': 'هُلَّتَا',
      '1p': 'هُلِلْنَا',
      '2mp': 'هُلِلْتُمْ',
      '2fp': 'هُلِلْتُنَّ',
      '3mp': 'هُلُّوا',
      '3fp': 'هُلِلْنَ',
    })
  })

  test('passive present indicative', () => {
    expect(conjugatePassivePresentMood(getVerbById('hll-1')!, 'indicative')).toEqualT({
      '1s': 'أُهَلُّ',
      '2ms': 'تُهَلُّ',
      '2fs': 'تُهَلِّينَ',
      '3ms': 'يُهَلُّ',
      '3fs': 'تُهَلُّ',
      '2d': 'تُهَلَّانِ',
      '3md': 'يُهَلَّانِ',
      '3fd': 'تُهَلَّانِ',
      '1p': 'نُهَلُّ',
      '2mp': 'تُهَلُّونَ',
      '2fp': 'تُهْلَلْنَ',
      '3mp': 'يُهَلُّونَ',
      '3fp': 'يُهْلَلْنَ',
    })
  })

  test('passive present subjunctive', () => {
    expect(conjugatePassivePresentMood(getVerbById('hll-1')!, 'subjunctive')).toEqualT({
      '1s': 'أُهَلَّ',
      '2ms': 'تُهَلَّ',
      '2fs': 'تُهَلِّي',
      '3ms': 'يُهَلَّ',
      '3fs': 'تُهَلَّ',
      '2d': 'تُهَلَّا',
      '3md': 'يُهَلَّا',
      '3fd': 'تُهَلَّا',
      '1p': 'نُهَلَّ',
      '2mp': 'تُهَلُّوا',
      '2fp': 'تُهْلَلْنَ',
      '3mp': 'يُهَلُّوا',
      '3fp': 'يُهْلَلْنَ',
    })
  })

  test('passive present jussive', () => {
    expect(conjugatePassivePresentMood(getVerbById('hll-1')!, 'jussive')).toEqualT({
      '1s': 'أُهَلَّ',
      '2ms': 'تُهَلَّ',
      '2fs': 'تُهَلِّي',
      '3ms': 'يُهَلَّ',
      '3fs': 'تُهَلَّ',
      '2d': 'تُهَلَّا',
      '3md': 'يُهَلَّا',
      '3fd': 'تُهَلَّا',
      '1p': 'نُهَلَّ',
      '2mp': 'تُهَلُّوا',
      '2fp': 'تُهْلَلْنَ',
      '3mp': 'يُهَلُّوا',
      '3fp': 'يُهْلَلْنَ',
    })
  })

  test('active participle', () => {
    expect(deriveActiveParticiple(getVerbById('hll-1')!)).toEqualT('هَالّ')
  })

  test('passive participle', () => {
    expect(derivePassiveParticiple(getVerbById('hll-1')!)).toEqualT('مَهْلُول')
  })

  test('masdar', () => {
    expect(new Set(deriveMasdar(getVerbById('hll-1')!))).toEqualT(new Set(['هَلّ']))
  })
})
