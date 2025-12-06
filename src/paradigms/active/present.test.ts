/** biome-ignore-all lint/style/noNonNullAssertion: tests will surface broken dataset */

import { describe, expect, it } from 'vitest'
import { verbs } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present indicative', () => {
  it('أَعْطَى', () => {
    const verb = verbs.find((entry) => entry.root === 'عطى' && entry.form === 4)!
    const indicative = conjugatePresentMood(verb, 'indicative')

    expect(indicative['3ms']).toBe('يُعْطِي')
    expect(indicative['1p']).toBe('نُعْطِي')
  })

  it.each([
    ['جلس', 1, 'يَجْلِسُ'],
    ['قفز', 1, 'يَقْفِزُ'],
    ['بدل', 1, 'يَبْدِلُ'],
    ['ترجم', 1, 'يُتَرْجِمُ'],
    ['وعد', 1, 'يَعِدُ'],
    ['أمن', 4, 'يُؤْمِنُ'],
    ['هجر', 1, 'يَهْجُرُ'],
    ['فسر', 2, 'يُفَسِّرُ'],
    ['حبب', 2, 'يُحِبُّ'],
    ['بدأ', 1, 'يَبْدَأُ'],
    ['وصل', 8, 'يَتَّصِلُ'],
    ['قتل', 1, 'يَقْتُلُ'],
    ['جمع', 1, 'يَجْمَعُ'],
    ['حلق', 1, 'يَحْلِقُ'],
    ['كسر', 1, 'يَكْسِرُ'],
    ['خسر', 1, 'يَخْسَرُ'],
    ['حسب', 1, 'يَحْسُبُ'],
    ['درس', 1, 'يَدْرُسُ'],
    ['نبأ', 4, 'يُنْبِئُ'],
    ['حبط', 1, 'يَحْبَطُ'],
    ['حضر', 1, 'يَحْضُرُ'],
    ['ضيف', 4, 'يُضِيفُ'],
    ['ضيف', 10, 'يَسْتَضِيفُ'],
    ['دحرج', 1, 'يُدَحْرِجُ'],
    ['حمر', 9, 'يَحْمَرُّ'],
    ['صفر', 9, 'يَصْفَرُّ'],
    ['رأى', 1, 'يَرَى'],
    ['حوي', 1, 'يَحْوِي'],
    ['فلت', 4, 'يُفْلِتُ'],
    ['عطى', 4, 'يُعْطِي'],
    ['عون', 3, 'يُعَاوِنُ'],
    ['عون', 4, 'يُعِينُ'],
    ['عون', 6, 'يَتَعَاوَنُ'],
    ['قود', 8, 'يَقْتَادُ'],
    ['قود', 10, 'يَسْتَقِيدُ'],
    ['عون', 10, 'يَسْتَعِينُ'],
    ['وقي', 1, 'يَقِي'],
    ['ولى', 1, 'يَلِي'],
    ['أنشأ', 4, 'يُنْشِئُ'],
    ['أتى', 1, 'يَأْتِي'],
    ['أوي', 1, 'يَأْوِي'],
    ['أوفى', 1, 'يُوفِي'],
    ['وعد', 1, 'يَعِدُ'],
  ])('%s (%d) pattern is %s', (root, form, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    expect(conjugatePresentMood(verb, 'indicative')['3ms']).toBe(expected)
  })
})

describe('active present jussive', () => {
  it('drops the final glide for أَعْطَى', () => {
    const verb = verbs.find((entry) => entry.root === 'عطى' && entry.form === 4)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يُعْطِ')
    expect(jussive['2ms']).toBe('تُعْطِ')
    expect(jussive['1p']).toBe('نُعْطِ')
    expect(jussive['2fs']).toBe('تُعْطِي')
    expect(jussive['3pm']).toBe('يُعْطُوا')
  })

  it('drops nūn endings for صَرَفَ', () => {
    const sarafa = verbs.find((entry) => entry.root === 'صرف' && entry.form === 1)!
    const jussive = conjugatePresentMood(sarafa, 'jussive')

    expect(jussive['2ms']).toBe('تَصْرِفْ')
    expect(jussive['2fs']).toBe('تَصْرِفِي')
    expect(jussive['2d']).toBe('تَصْرِفَا')
    expect(jussive['2pm']).toBe('تَصْرِفُوا')
    expect(jussive['2pf']).toBe('تَصْرِفْنَ')
    expect(jussive['3dm']).toBe('يَصْرِفَا')
    expect(jussive['3df']).toBe('تَصْرِفَا')
    expect(jussive['3pf']).toBe('يَصْرِفْنَ')
    expect(jussive['3pm']).toBe('يَصْرِفُوا')
  })

  it('shortens hollow stems without suffixes for قَالَ', () => {
    const qaala = verbs.find((entry) => entry.root === 'قول' && entry.form === 1)!
    const jussive = conjugatePresentMood(qaala, 'jussive')

    expect(jussive['3ms']).toBe('يَقُلْ')
    expect(jussive['2ms']).toBe('تَقُلْ')
    expect(jussive['3fs']).toBe('تَقُلْ')
    expect(jussive['1s']).toBe('أَقُلْ')
    expect(jussive['1p']).toBe('نَقُلْ')
    expect(jussive['2pf']).toBe('تَقُلْنَ')
    expect(jussive['3pf']).toBe('يَقُلْنَ')
  })

  it.each([
    ['قود', 7, 'يَنْقَدْ'],
    ['قود', 8, 'يَقْتَدْ'],
    ['قود', 10, 'يَسْتَقِدْ'],
  ])('%s (%d) pattern is %s', (root, form, expected3ms) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe(expected3ms)
  })
})
