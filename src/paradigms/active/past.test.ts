/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { describe, expect, it } from 'vitest'
import { verbs } from '../verbs'
import { conjugatePast } from './past'

describe('active past', () => {
  it.each([
    ['أمن', 1, 'أَمِنَ'],
    ['أمن', 4, 'آمَنَ'],
    ['جلس', 1, 'جَلَسَ'],
    ['بدل', 2, 'بَدَّلَ'],
    ['حبب', 1, 'حَبَّ'],
    ['حبب', 2, 'حَبَّبَ'],
    ['حرب', 3, 'حَارَبَ'],
    ['عون', 3, 'عَاوَنَ'],
    ['قود', 3, 'قَاوَدَ'],
    ['عدد', 4, 'أَعَدَّ'],
    ['عطى', 4, 'أَعْطَى'],
    ['عون', 4, 'أَعَانَ'],
    ['علم', 5, 'تَعَلَّمَ'],
    ['عون', 6, 'تَعَاوَنَ'],
    ['فجر', 7, 'اِنْفَجَرَ'],
    ['قود', 7, 'اِنْقَادَ'],
    ['قود', 8, 'اِقْتَادَ'],
    ['قود', 10, 'اِسْتَقَادَ'],
    ['عون', 10, 'اِسْتَعَانَ'],
    ['نهي', 8, 'اِنْتَهَى'],
    ['حوي', 1, 'حَوَى'],
    ['وصل', 8, 'اِتَّصَلَ'],
    ['بدل', 10, 'اِسْتَبْدَلَ'],
    ['وقي', 1, 'وَقَى'],
    ['ولى', 1, 'وَلِي'],
    ['أنشأ', 4, 'أَنْشَأَ'],
    ['أتى', 1, 'أَتَى'],
    ['أوي', 1, 'أَوَى'],
    ['أوي', 4, 'آوَى'],
    ['أوي', 10, 'اِسْتَأْوَى'],
    ['أوفى', 1, 'أَوْفَى'],
    ['وعد', 1, 'وَعَدَ'],
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
})
