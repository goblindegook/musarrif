/** biome-ignore-all lint/style/noNonNullAssertion: tests can tolerate it */
import { expect, test } from 'vitest'
import { verbs } from '../verbs'
import { derivePassiveParticiple } from './participle-passive'

test.each([
  ['عدد', 4, 'مُعَدّ'],
  ['ترجم', 1, 'مُتَرْجَم'],
  ['وصل', 1, 'مَوْصُول'],
  ['وصل', 8, 'مُتَّصَل'],
  ['أمن', 4, 'مُؤْمَن'],
  ['نبأ', 4, 'مُنْبَأ'],
  ['نهي', 4, 'مُنْهَى'],
  ['نهي', 8, 'مُنْتَهَى'],
  ['بدأ', 1, 'مَبْدُوء'],
  ['فلت', 4, 'مُفْلَت'],
  ['رأى', 1, 'مَرْئِيّ'],
  ['حوي', 1, 'مَحْوِيّ'],
  ['حوي', 3, 'مُحَاوًى'],
  ['حبب', 2, 'مُحَبَّب'],
  ['عون', 3, 'مُعَاوَن'],
  ['عون', 4, 'مُعَان'],
  ['عون', 6, 'مُتَعَاوَن'],
  ['عون', 10, 'مُسْتَعَان'],
  ['ضيف', 4, 'مُضَاف'],
  ['ضيف', 10, 'مُسْتَضَاف'],
  ['دحرج', 1, 'مُدَحْرَج'],
  ['قود', 7, 'مُنْقَاد'],
  ['قود', 8, 'مُقْتَاد'],
  ['وقي', 1, 'مَوْقِيّ'],
  ['ولى', 1, 'مَوْلِيّ'],
  ['أنشأ', 4, 'مُنْشَأ'],
  ['أتى', 1, 'مَأْتِيّ'],
  ['أوي', 1, 'مَأْوِيّ'],
  ['أوي', 4, 'مُؤْوًى'],
  ['أوي', 10, 'مُسْتَأْوًى'],
  ['أوفى', 1, 'مُوفًى'],
  ['عطى', 4, 'مُعْطَى'],
  ['مسو', 4, 'مُمْسَى'],
  ['غدو', 1, 'مَغْدُوو'],
  ['وعد', 1, 'مَوْعُود'],
])('%s (Form %d) passive participle is %s', (root, form, expected) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)!
  expect(derivePassiveParticiple(verb)).toBe(expected)
})

test.each([
  ['سعد', 1],
  ['أمن', 1],
  ['طلق', 7],
  ['فجر', 7],
  ['جلس', 1],
  ['حبط', 1],
  ['حضر', 1],
  ['حمر', 9],
  ['صفر', 9],
])('%s (Form %d) has no passive participle', (root, form) => {
  const verb = verbs.find((entry) => entry.root === root && entry.form === form)
  expect(derivePassiveParticiple(verb!)).toBe('')
})
