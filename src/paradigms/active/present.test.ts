/** biome-ignore-all lint/style/noNonNullAssertion: tests will surface broken dataset */
import { describe, expect, it } from 'vitest'
import type { PronounId } from '../pronouns'
import { verbs } from '../verbs'
import { conjugatePresentMood } from './present'

describe('active present indicative', () => {
  it.each<[string, number, PronounId, string]>([
    ['أتى', 1, '3ms', 'يَأْتِي'],
    ['أمن', 4, '3ms', 'يُؤْمِنُ'],
    ['أنشأ', 4, '3ms', 'يُنْشِئُ'],
    ['أوي', 1, '3ms', 'يَأْوِي'],
    ['أوي', 4, '3ms', 'يُؤْوِي'],
    ['بدأ', 1, '3ms', 'يَبْدَأُ'],
    ['بدل', 1, '3ms', 'يَبْدِلُ'],
    ['ترجم', 1, '3ms', 'يُتَرْجِمُ'],
    ['جلس', 1, '3ms', 'يَجْلِسُ'],
    ['جمع', 1, '3ms', 'يَجْمَعُ'],
    ['حبب', 1, '3ms', 'يُحِبُّ'],
    ['حبب', 2, '3ms', 'يُحَبِّبُ'],
    ['حبط', 1, '3ms', 'يَحْبَطُ'],
    ['حسب', 1, '3ms', 'يَحْسُبُ'],
    ['حضر', 1, '3ms', 'يَحْضُرُ'],
    ['حلق', 1, '3ms', 'يَحْلِقُ'],
    ['حمر', 9, '3ms', 'يَحْمَرُّ'],
    ['حمر', 9, '2pf', 'تَحْمَرَرْنَ'],
    ['حمر', 9, '3pf', 'يَحْمَرَرْنَ'],
    ['حوي', 1, '3ms', 'يَحْوِي'],
    ['خسر', 1, '3ms', 'يَخْسَرُ'],
    ['دحرج', 1, '3ms', 'يُدَحْرِجُ'],
    ['درس', 1, '2pm', 'تَدْرُسُونَ'],
    ['درس', 1, '3ms', 'يَدْرُسُ'],
    ['درس', 1, '3pm', 'يَدْرُسُونَ'],
    ['رأى', 1, '3ms', 'يَرَى'],
    ['صفر', 9, '3ms', 'يَصْفَرُّ'],
    ['ضيف', 10, '3ms', 'يَسْتَضِيفُ'],
    ['ضيف', 4, '3ms', 'يُضِيفُ'],
    ['عطى', 4, '3ms', 'يُعْطِي'],
    ['عون', 10, '3ms', 'يَسْتَعِينُ'],
    ['عون', 3, '3ms', 'يُعَاوِنُ'],
    ['عون', 4, '3ms', 'يُعِينُ'],
    ['عون', 6, '3ms', 'يَتَعَاوَنُ'],
    ['غدو', 1, '3ms', 'يَغْداو'],
    ['فسر', 2, '3ms', 'يُفَسِّرُ'],
    ['فلت', 4, '3ms', 'يُفْلِتُ'],
    ['قتل', 1, '3ms', 'يَقْتُلُ'],
    ['قفز', 1, '3ms', 'يَقْفِزُ'],
    ['قود', 10, '3ms', 'يَسْتَقِيدُ'],
    ['قود', 8, '3ms', 'يَقْتَادُ'],
    ['كسر', 1, '3ms', 'يَكْسِرُ'],
    ['مسو', 4, '3ms', 'يُمْسِي'],
    ['نبأ', 4, '3ms', 'يُنْبِئُ'],
    ['هجر', 1, '3ms', 'يَهْجُرُ'],
    ['وصل', 8, '3ms', 'يَتَّصِلُ'],
    ['وعد', 1, '3ms', 'يَعِدُ'],
    ['وعد', 1, '3ms', 'يَعِدُ'],
    ['وقي', 1, '3ms', 'يَقِي'],
    ['ولى', 1, '3ms', 'يَلِي'],
    ['جيء', 1, '3ms', 'يَجِيءُ'],
    ['جيء', 1, '2fs', 'تَجِيئِينَ'],
    ['جيء', 1, '2d', 'تَجِيئَانِ'],
    ['جيء', 1, '3dm', 'يَجِيئَانِ'],
    ['جيء', 1, '3df', 'تَجِيئَانِ'],
    ['جيء', 1, '2pm', 'تَجِيئُونَ'],
    ['جيء', 1, '2pf', 'تَجِيئْنَ'],
    ['جيء', 1, '3pm', 'يَجِيئُونَ'],
    ['جيء', 1, '3pf', 'يَجِيئْنَ'],
    ['وفي', 5, '3ms', 'يَتَوَفَّى'],
    ['وفي', 5, '3fs', 'تَتَوَفَّى'],
    ['وفي', 5, '2ms', 'تَتَوَفَّى'],
    ['وفي', 5, '2fs', 'تَتَوَفِّيْنَ'],
    ['وفي', 5, '3pm', 'يَتَوَفَّونَ'],
    ['وفي', 5, '3pf', 'يَتَوَفَّىْنَ'],
  ])('%s (%d) %s is %s', (root, form, pronoun, expected) => {
    const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
    expect(conjugatePresentMood(verb, 'indicative')[pronoun]).toBe(expected)
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

  it('handles initial hamza + middle weak + final weak for أَوَى', () => {
    const verb = verbs.find((entry) => entry.root === 'أوي' && entry.form === 1)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يَأْوِ')
    expect(jussive['2ms']).toBe('تَأْوِ')
    expect(jussive['1s']).toBe('آوِ')
    expect(jussive['1p']).toBe('نَأْوِ')
    expect(jussive['3fs']).toBe('تَأْوِ')
    expect(jussive['2fs']).toBe('تَأْوِي')
    expect(jussive['3pm']).toBe('يَأْوُوا')
  })

  it('preserves shadda for form IX verbs in jussive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يَحْمَرَّ')
    expect(jussive['2ms']).toBe('تَحْمَرَّ')
    expect(jussive['1s']).toBe('أَحْمَرَّ')
  })

  it('expands shadda for form IX verbs in feminine plural forms in jussive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['2pf']).toBe('تَحْمَرَرْنَ')
    expect(jussive['3pf']).toBe('يَحْمَرَرْنَ')
  })

  it('drops final hamza for جَاءَ (middle weak + final hamza)', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 1)!
    const jussive = conjugatePresentMood(verb, 'jussive')

    expect(jussive['3ms']).toBe('يَجِئْ')
    expect(jussive['2ms']).toBe('تَجِئْ')
    expect(jussive['1s']).toBe('أَجِئْ')
    expect(jussive['1p']).toBe('نَجِئْ')
    expect(jussive['3fs']).toBe('تَجِئْ')
    expect(jussive['2fs']).toBe('تَجِيئِي')
    expect(jussive['3pm']).toBe('يَجِيئُوا')
  })
})

describe('active present subjunctive', () => {
  it('preserves shadda for form IX verbs in subjunctive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const subjunctive = conjugatePresentMood(verb, 'subjunctive')

    expect(subjunctive['3ms']).toBe('يَحْمَرَّ')
    expect(subjunctive['2ms']).toBe('تَحْمَرَّ')
    expect(subjunctive['1s']).toBe('أَحْمَرَّ')
  })

  it('expands shadda for form IX verbs in feminine plural forms in subjunctive', () => {
    const verb = verbs.find((entry) => entry.root === 'حمر' && entry.form === 9)!
    const subjunctive = conjugatePresentMood(verb, 'subjunctive')

    expect(subjunctive['2pf']).toBe('تَحْمَرَرْنَ')
    expect(subjunctive['3pf']).toBe('يَحْمَرَرْنَ')
  })

  it('changes final damma to fatḥa for جَاءَ in subjunctive', () => {
    const verb = verbs.find((entry) => entry.root === 'جيء' && entry.form === 1)!
    const subjunctive = conjugatePresentMood(verb, 'subjunctive')

    expect(subjunctive['3ms']).toBe('يَجِيءَ')
    expect(subjunctive['2ms']).toBe('تَجِيءَ')
    expect(subjunctive['1s']).toBe('أَجِيءَ')
    expect(subjunctive['1p']).toBe('نَجِيءَ')
    expect(subjunctive['3fs']).toBe('تَجِيءَ')
  })
})
