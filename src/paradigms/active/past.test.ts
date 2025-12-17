/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, it } from 'vitest'
import { verbs } from '../verbs'
import { conjugatePast } from './past'

describe('active past', () => {
  it.each([
    ['أتى', 1, 'أَتَى'],
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
    ['حوي', 1, 'حَوَى'],
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
    ['مسو', 4, 'أَمْسَى'],
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
    const past = conjugatePast(verb)

    expect(past['3ms']).toBe('أَعْطَى')
    expect(past['3fs']).toBe('أَعْطَتْ')
    expect(past['3dm']).toBe('أَعْطَيَا')
    expect(past['3df']).toBe('أَعْطَتَا')
    expect(past['3pm']).toBe('أَعْطَوْا')
    expect(past['3pf']).toBe('أَعْطَيْنَ')
    expect(past['2ms']).toBe('أَعْطَيْتَ')
    expect(past['2fs']).toBe('أَعْطَيْتِ')
    expect(past['1p']).toBe('أَعْطَيْنَا')
  })

  it('shortens with suffixes for hollow verbs like قال', () => {
    const verb = verbs.find((entry) => entry.root === 'قول' && entry.form === 1)!
    const past = conjugatePast(verb)

    expect(past['3ms']).toBe('قَالَ')
    expect(past['3fs']).toBe('قَالَتْ')
    expect(past['3dm']).toBe('قَالَا')
    expect(past['3df']).toBe('قَالَتَا')
    expect(past['3pm']).toBe('قَالُوا')
    expect(past['3pf']).toBe('قُلْنَ')

    expect(past['2ms']).toBe('قُلْتَ')
    expect(past['2fs']).toBe('قُلْتِ')
    expect(past['2d']).toBe('قُلْتُمَا')
    expect(past['2pm']).toBe('قُلْتُمْ')
    expect(past['2pf']).toBe('قُلْتُنَّ')

    expect(past['1s']).toBe('قُلْتُ')
    expect(past['1p']).toBe('قُلْنَا')
  })

  it('handles hollow verb with final hamza for جَاءَ', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 1)!
    const past = conjugatePast(verb)

    expect(past['3ms']).toBe('جَاءَ')
    expect(past['3fs']).toBe('جَاءَتْ')
    expect(past['3dm']).toBe('جَاءَا')
    expect(past['3df']).toBe('جَاءَتَا')
    expect(past['3pm']).toBe('جَاؤُوا')
    expect(past['3pf']).toBe('جِئْنَ')
    expect(past['2ms']).toBe('جِئْتَ')
    expect(past['2fs']).toBe('جِئْتِ')
    expect(past['2d']).toBe('جِئْتُمَا')
    expect(past['2pm']).toBe('جِئْتُمْ')
    expect(past['2pf']).toBe('جِئْتُنَّ')
    expect(past['1s']).toBe('جِئْتُ')
    expect(past['1p']).toBe('جِئْنَا')
  })

  it('handles Form IV hollow verb with final hamza for أَجَاءَ', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 4)!
    const past = conjugatePast(verb)

    expect(past['3ms']).toBe('أَجَاءَ')
    expect(past['3fs']).toBe('أَجَاءَتْ')
    expect(past['3dm']).toBe('أَجَاءَا')
    expect(past['3df']).toBe('أَجَاءَتَا')
    expect(past['3pm']).toBe('أَجَاؤُوا')
    expect(past['3pf']).toBe('أَجِئْنَ')
    expect(past['2ms']).toBe('أَجِئْتَ')
    expect(past['2fs']).toBe('أَجِئْتِ')
    expect(past['2d']).toBe('أَجِئْتُمَا')
    expect(past['2pm']).toBe('أَجِئْتُمْ')
    expect(past['2pf']).toBe('أَجِئْتُنَّ')
    expect(past['1s']).toBe('أَجِئْتُ')
    expect(past['1p']).toBe('أَجِئْنَا')
  })

  it('handles Form VI hollow verb with final hamza for تَجَاءَ', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 6)!
    const past = conjugatePast(verb)

    expect(past['3ms']).toBe('تَجَاءَ')
    expect(past['3fs']).toBe('تَجَاءَتْ')
    expect(past['3dm']).toBe('تَجَاءَا')
    expect(past['3df']).toBe('تَجَاءَتَا')
    expect(past['3pm']).toBe('تَجَاؤُوا')
    expect(past['3pf']).toBe('تَجِئْنَ')
    expect(past['2ms']).toBe('تَجِئْتَ')
    expect(past['2fs']).toBe('تَجِئْتِ')
    expect(past['2d']).toBe('تَجِئْتُمَا')
    expect(past['2pm']).toBe('تَجِئْتُمْ')
    expect(past['2pf']).toBe('تَجِئْتُنَّ')
    expect(past['1s']).toBe('تَجِئْتُ')
    expect(past['1p']).toBe('تَجِئْنَا')
  })
})
