/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { expect, test } from 'vitest'
import { verbs } from '../verbs'
import { derivePassiveParticiple } from './participle-passive'

test.each([
  ['أتي', 1, 'مَأْتِيّ'],
  ['أمن', 4, 'مُؤْمَن'],
  ['أنشأ', 4, 'مُنْشَأ'],
  ['أوي', 1, 'مَأْوِيّ'],
  ['أوي', 10, 'مُسْتَأْوًى'],
  ['أوي', 4, 'مُؤْوًى'],
  ['بدأ', 1, 'مَبْدُوء'],
  ['ترجم', 1, 'مُتَرْجَم'],
  ['حبب', 2, 'مُحَبَّب'],
  ['دحرج', 1, 'مُدَحْرَج'],
  ['رأى', 1, 'مَرْئِيّ'],
  ['ضيف', 10, 'مُسْتَضَاف'],
  ['ضيف', 4, 'مُضَاف'],
  ['عدد', 4, 'مُعَدّ'],
  ['عطى', 4, 'مُعْطَى'],
  ['عون', 10, 'مُسْتَعَان'],
  ['عون', 3, 'مُعَاوَن'],
  ['عون', 4, 'مُعَان'],
  ['عون', 6, 'مُتَعَاوَن'],
  ['غدو', 1, 'مَغْدُوو'],
  ['فلت', 4, 'مُفْلَت'],
  ['قود', 7, 'مُنْقَاد'],
  ['قود', 8, 'مُقْتَاد'],
  ['نبأ', 4, 'مُنْبَأ'],
  ['نهي', 4, 'مُنْهَى'],
  ['نهي', 8, 'مُنْتَهَى'],
  ['وصل', 1, 'مَوْصُول'],
  ['وصل', 8, 'مُتَّصَل'],
  ['وعد', 1, 'مَوْعُود'],
  ['وفي', 10, 'مُسْتَفًى'],
  ['وفي', 2, 'مُوَفًّى'],
  ['وفي', 4, 'مُوفًى'],
  ['وفي', 5, 'مُتَوَفًّى'],
  ['وقي', 1, 'مَوْقِيّ'],
  ['ولى', 1, 'مَوْلِيّ'],
])('%s (Form %d) passive participle is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(derivePassiveParticiple(verb)).toBe(expected)
})

test.each([
  ['أمن', 1],
  ['جلس', 1],
  ['حبط', 1],
  ['حضر', 1],
  ['حمر', 9],
  ['سعد', 1],
  ['صفر', 9],
  ['طلق', 7],
  ['فجر', 7],
])('%s (Form %d) has no passive participle', (root, form) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)
  expect(derivePassiveParticiple(verb!)).toBe('')
})
