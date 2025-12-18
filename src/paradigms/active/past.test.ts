/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, it } from 'vitest'
import { verbs } from '../verbs'
import { conjugatePast } from './past'

describe('active past', () => {
  it.each([
    ['أتي', 1, 'أَتَى'],
    ['أمن', 1, 'أَمِنَ'],
    ['أمن', 4, 'آمَنَ'],
    ['أنشأ', 4, 'أَنْشَأَ'],
    ['أوي', 1, 'أَوَى'],
    ['أوي', 10, 'اِسْتَأْوَى'],
    ['أوي', 4, 'آوَى'],
    ['بدل', 10, 'اِسْتَبْدَلَ'],
    ['بدل', 2, 'بَدَّلَ'],
    ['جلس', 1, 'جَلَسَ'],
    ['حبب', 1, 'حَبَّ'],
    ['حبب', 2, 'حَبَّبَ'],
    ['حرب', 3, 'حَارَبَ'],
    ['حمر', 9, 'اِحْمَرَّ'],
    ['عدد', 4, 'أَعَدَّ'],
    ['عطى', 4, 'أَعْطَى'],
    ['علم', 5, 'تَعَلَّمَ'],
    ['عون', 10, 'اِسْتَعَانَ'],
    ['عون', 3, 'عَاوَنَ'],
    ['عون', 4, 'أَعَانَ'],
    ['عون', 6, 'تَعَاوَنَ'],
    ['غدو', 1, 'غَدَا'],
    ['فجر', 7, 'اِنْفَجَرَ'],
    ['قود', 10, 'اِسْتَقَادَ'],
    ['قود', 3, 'قَاوَدَ'],
    ['قود', 7, 'اِنْقَادَ'],
    ['قود', 8, 'اِقْتَادَ'],
    ['نهي', 8, 'اِنْتَهَى'],
    ['وصل', 8, 'اِتَّصَلَ'],
    ['وعد', 1, 'وَعَدَ'],
    ['وقي', 1, 'وَقَى'],
    ['ولى', 1, 'وَلِي'],
    ['جيء', 1, 'جَاءَ'],
    ['جيء', 4, 'أَجَاءَ'],
    ['جيء', 6, 'تَجَاءَ'],
  ])('%s (%d) pattern is %s', (root, form, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const past = conjugatePast(verb)
    expect(past['3ms']).toBe(expected)
  })

  it('handles defective endings for أعطى', () => {
    const verb = verbs.find((entry) => entry.root === 'عطى' && entry.form === 4)!
    expect(conjugatePast(verb)).toEqual({
      '1s': 'أَعْطَيْتُ',
      '2ms': 'أَعْطَيْتَ',
      '2fs': 'أَعْطَيْتِ',
      '3ms': 'أَعْطَى',
      '3fs': 'أَعْطَتْ',
      '2d': 'أَعْطَيْتُمَا',
      '3dm': 'أَعْطَيَا',
      '3df': 'أَعْطَتَا',
      '1p': 'أَعْطَيْنَا',
      '2pm': 'أَعْطَيْتُمْ',
      '2pf': 'أَعْطَيْتُنَّ',
      '3pf': 'أَعْطَيْنَ',
      '3pm': 'أَعْطَوْا',
    })
  })

  it('shortens with suffixes for hollow verbs like قال', () => {
    const verb = verbs.find((entry) => entry.root === 'قول' && entry.form === 1)!
    expect(conjugatePast(verb)).toEqual({
      '1s': 'قُلْتُ',
      '2ms': 'قُلْتَ',
      '2fs': 'قُلْتِ',
      '3ms': 'قَالَ',
      '3fs': 'قَالَتْ',
      '2d': 'قُلْتُمَا',
      '3dm': 'قَالَا',
      '3df': 'قَالَتَا',
      '1p': 'قُلْنَا',
      '2pm': 'قُلْتُمْ',
      '2pf': 'قُلْتُنَّ',
      '3pm': 'قَالُوا',
      '3pf': 'قُلْنَ',
    })
  })

  it('handles hollow verb with final hamza for جَاءَ', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 1)!
    expect(conjugatePast(verb)).toEqual({
      '3ms': 'جَاءَ',
      '3fs': 'جَاءَتْ',
      '3dm': 'جَاءَا',
      '3df': 'جَاءَتَا',
      '3pm': 'جَاؤُوا',
      '3pf': 'جِئْنَ',
      '2ms': 'جِئْتَ',
      '2fs': 'جِئْتِ',
      '2d': 'جِئْتُمَا',
      '2pm': 'جِئْتُمْ',
      '2pf': 'جِئْتُنَّ',
      '1s': 'جِئْتُ',
      '1p': 'جِئْنَا',
    })
  })

  it('handles Form IV hollow verb with final hamza for أَجَاءَ', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 4)!
    expect(conjugatePast(verb)).toEqual({
      '3ms': 'أَجَاءَ',
      '3fs': 'أَجَاءَتْ',
      '3dm': 'أَجَاءَا',
      '3df': 'أَجَاءَتَا',
      '3pm': 'أَجَاؤُوا',
      '3pf': 'أَجِئْنَ',
      '2ms': 'أَجِئْتَ',
      '2fs': 'أَجِئْتِ',
      '2d': 'أَجِئْتُمَا',
      '2pm': 'أَجِئْتُمْ',
      '2pf': 'أَجِئْتُنَّ',
      '1s': 'أَجِئْتُ',
      '1p': 'أَجِئْنَا',
    })
  })

  it('handles Form VI hollow verb with final hamza for تَجَاءَ', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 6)!
    expect(conjugatePast(verb)).toEqual({
      '3ms': 'تَجَاءَ',
      '3fs': 'تَجَاءَتْ',
      '3dm': 'تَجَاءَا',
      '3df': 'تَجَاءَتَا',
      '3pm': 'تَجَاؤُوا',
      '3pf': 'تَجِئْنَ',
      '2ms': 'تَجِئْتَ',
      '2fs': 'تَجِئْتِ',
      '2d': 'تَجِئْتُمَا',
      '2pm': 'تَجِئْتُمْ',
      '2pf': 'تَجِئْتُنَّ',
      '1s': 'تَجِئْتُ',
      '1p': 'تَجِئْنَا',
    })
  })
})
