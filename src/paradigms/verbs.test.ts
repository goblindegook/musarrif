import { describe, expect, test } from 'vitest'
import type { FormIPattern } from './form-i-vowels'
import { tokenize } from './tokens'
import {
  findVerbsByRoot,
  findVerbsByRootPrefix,
  formatFormLabel,
  getAvailableParadigms,
  getVerb,
  getVerbById,
  isTriliteralFormIDisplayVerb,
  type TriliteralForm,
  ZNN_SISTERS_IDS,
} from './verbs'

describe('getVerbById', () => {
  test('returns corpus verbs without marking them synthetic', () => {
    expect(getVerbById('ktb-1')).toEqual({
      root: 'كتب',
      rootTokens: tokenize('كتب'),
      form: 1,
      vowels: 'a-u',
      hollowContraction: undefined,
      masdars: ['fi3aala', 'fa3l', 'fi3aal'],
      lexicalMasdars: undefined,
      passive: undefined,
      contractedImperative: undefined,
      lexicalActiveParticiple: undefined,
      valency: [2, 3],
      id: 'ktb-1',
      lemma: 'كَتَبَ',
      rootId: 'ktb',
    })
  })

  test('synthesizes missing ids and marks them synthetic', () => {
    expect(getVerbById('Dfz-2')).toEqual({
      id: 'Dfz-2',
      form: 2,
      lemma: 'ضَفَّزَ',
      root: 'ضفز',
      rootId: 'Dfz',
      rootTokens: tokenize('ضفز'),
      passive: undefined,
      synthetic: true,
      valency: [],
    })
  })

  test('Form I', () => {
    expect(getVerbById('Dfz-1-a-u')).toEqual({
      id: 'Dfz-1-a-u',
      form: 1,
      vowels: 'a-u',
      lemma: 'ضَفَزَ',
      root: 'ضفز',
      rootId: 'Dfz',
      rootTokens: tokenize('ضفز'),
      masdars: undefined,
      lexicalMasdars: [],
      lexicalActiveParticiple: undefined,
      synthetic: true,
      valency: [],
    })
  })

  test('Forms II-X', () => {
    expect(getVerbById('Dfz-2')).toEqual({
      form: 2,
      id: 'Dfz-2',
      lemma: 'ضَفَّزَ',
      root: 'ضفز',
      rootId: 'Dfz',
      rootTokens: tokenize('ضفز'),
      synthetic: true,
      valency: [],
    })
  })
})

describe('getVerbById fallback parsing', () => {
  test('falls back to Form I when form segment is missing', () => {
    expect(getVerbById('ktb-')).toEqual(getVerb('كتب', 1))
  })

  test('falls back to Form I when form segment is invalid', () => {
    expect(getVerbById('ktb-foo')).toEqual(getVerb('كتب', 1))
  })
})

describe('root lookup helpers', () => {
  test('findVerbsByRoot returns all derived forms for a root', () => {
    const matches = findVerbsByRoot('درس')

    expect(matches.map((verb) => verb.form)).toEqual([1, 2, 5, 10])
  })

  test('findVerbsByRootPrefix returns verbs whose roots start with the prefix', () => {
    const matches = findVerbsByRootPrefix('كت')

    expect(matches.find((verb) => verb.root === 'كتب')).toBeDefined()
  })
})

describe('formatFormLabel', () => {
  test('renders triliteral form names as roman numerals', () => {
    expect(formatFormLabel(4, 'كتب')).toBe('IV')
  })

  test('appends q for quadriliteral form names', () => {
    expect(formatFormLabel(4, 'برهن')).toBe('IVq')
  })
})

describe('getAvailableParadigms', () => {
  test('returns only active past for ليس', () => {
    const verb = getVerb('ليس', 1)
    expect(getAvailableParadigms(verb)).toEqual(['active.past'])
  })

  test('returns restricted paradigms for زَالَ', () => {
    const verb = getVerb('زيل', 1)
    expect(getAvailableParadigms(verb)).toEqual([
      'active.past',
      'active.present.indicative',
      'active.present.subjunctive',
      'active.present.jussive',
      'active.future',
    ])
  })

  test('excludes all passive.* for a verb with passive: none', () => {
    const verb = getVerb('وجب', 1) // passive: 'none' in roots.json
    const available = getAvailableParadigms(verb)
    expect(available.filter((p) => p.startsWith('passive'))).toHaveLength(0)
  })

  test('excludes all passive.* for Form IX verbs', () => {
    const verb = getVerb('حمر', 9)
    const available = getAvailableParadigms(verb)
    expect(available.some((p) => p.startsWith('passive'))).toBe(false)
  })

  test('returns all paradigms for a normal verb', () => {
    const verb = getVerb('كتب', 1)
    const available = getAvailableParadigms(verb)
    expect(available).toContain('active.past')
    expect(available).toContain('passive.past')
    expect(available).toContain('active.participle')
    expect(available).toContain('passive.participle')
    expect(available).toContain('masdar')
  })

  describe('has passive voice', () => {
    test.each<[string, TriliteralForm]>([
      ['يود', 2],
      ['شوق', 2],
      ['زور', 2],
      ['عرقل', 2],
      ['مركز', 2],
      ['بلور', 2],
      ['ذبذب', 2],
      ['غلغل', 2],
      ['ءمرك', 2],
      ['ءلمن', 2],
      ['عمل', 3],
      ['سلم', 3],
      ['حرجم', 3],
      ['حرشف', 3],
      ['حرفز', 3],
      ['خرطم', 3],
      ['قشعر', 4],
      ['شمءز', 4],
      ['ءتي', 3],
      ['ءتي', 4],
      ['ءتي', 5],
      ['ءثر', 5],
      ['ءول', 5],
      ['برغش', 4],
      ['بقي', 5],
      ['بني', 5],
      ['جلعب', 4],
      ['رءي', 3],
      ['رءي', 5],
      ['زوي', 5],
      ['سلم', 4],
      ['سلم', 5],
      ['شرك', 6],
      ['عرف', 5],
      ['عزز', 5],
      ['قرر', 5],
      ['مدد', 4],
      ['هدد', 5],
      ['وخي', 5],
      ['وصل', 5],
      ['وفر', 5],
      ['وفي', 5],
      ['وقع', 5],
      ['وقف', 5],
      ['وقي', 5],
      ['علج', 6],
      ['عمل', 6],
      ['نول', 6],
      ['فوض', 6],
      ['جوز', 6],
      ['عفو', 6],
      ['وفق', 6],
      ['وفر', 6],
      ['وجد', 6],
      ['ءلف', 6],
      ['ءمر', 6],
      ['حبب', 6],
      ['هوي', 6],
      ['مسس', 6],
      ['وطء', 6],
      ['ضدد', 6],
      ['ردد', 6],
      ['وصي', 6],
      ['خفض', 7],
      ['عكس', 7],
      ['كفف', 7],
      ['ثني', 7],
      ['هيل', 7],
      ['حوز', 7],
      ['قرح', 8],
      ['عبر', 8],
      ['عمد', 8],
      ['زحم', 8],
      ['سلم', 8],
      ['نظر', 8],
      ['ضلع', 8],
      ['كءب', 8],
      ['بءس', 8],
      ['ضرر', 8],
      ['حلل', 8],
      ['مدد', 8],
      ['حجج', 8],
      ['ردد', 8],
      ['دعو', 8],
      ['قضي', 8],
      ['ردي', 8],
      ['وقي', 8],
      ['نوي', 8],
      ['سوي', 8],
      ['صفو', 8],
      ['رءي', 8],
      ['شري', 8],
      ['خفي', 8],
      ['ذكر', 8],
      ['وعد', 8],
      ['وكء', 8],
      ['وحد', 8],
      ['وصل', 8],
      ['خبء', 8],
      ['ءمم', 8],
      ['بدء', 8],
      ['زوج', 8],
      ['زيد', 8],
      ['سوء', 8],
      ['خير', 8],
      ['عود', 8],
      ['روح', 8],
      ['شوق', 8],
      ['جوب', 10],
      ['عرض', 10],
      ['شفف', 10],
      ['غرق', 10],
      ['هدف', 10],
      ['مرر', 10],
      ['ميل', 1],
      ['حقق', 10],
      ['غلل', 10],
      ['طرد', 10],
      ['عمل', 10],
      ['ءجر', 10],
      ['دعو', 10],
      ['ءني', 10],
      ['رعي', 10],
      ['ثني', 10],
      ['لقي', 10],
      ['عصي', 10],
      ['رخو', 10],
      ['ولي', 10],
      ['وجب', 10],
      ['وعب', 10],
      ['ورد', 10],
      ['فيد', 10],
      ['لوم', 10],
      ['حول', 10],
      ['وضح', 10],
      ['وطن', 10],
      ['حيي', 10],
      ['شور', 10],
      ['مدد', 10],
      ['ضوء', 10],
      ['زيد', 1],
      ['سيطر', 1],
      ['كلور', 1],
      ['وسوس', 1],
      ['ترجم', 1],
      ['برهن', 1],
      ['عرقل', 1],
      ['شوق', 1],
      ['سلم', 1],
      ['سكن', 1],
      ['زرق', 1],
      ['ءجر', 1],
      ['زرق', 2],
      ['ءجر', 2],
      ['ءكل', 2],
      ['نوم', 1],
      ['نوم', 2],
      ['نوم', 4],
      ['نوم', 10],
      ['بعد', 1],
      ['خضل', 9],
      ['وفي', 1],
      ['يءس', 1],
      ['ظلل', 1],
      ['بدو', 1],
      ['جرء', 1],
      ['ءذن', 1],
      ['ءمر', 1],
      ['حدث', 5],
      ['طلب', 5],
      ['مثل', 5],
      ['حدد', 5],
      ['حدي', 5],
      ['سمي', 5],
      ['عين', 5],
      ['ءخر', 5],
      ['ءمم', 5],
      ['ءكد', 5],
      ['ءوه', 5],
      ['ءذي', 5],
      ['وكء', 5],
      ['حول', 5],
      ['ضوء', 5],
      ['غير', 5],
      ['شوق', 5],
      ['قسم', 6],
      ['وجه', 6],
    ])('%s (Form %d)', (root, form) => {
      expect(getAvailableParadigms(getVerb(root, form))).toContain('passive.past')
    })
  })

  describe('has no passive voice', () => {
    test.each<[string, TriliteralForm]>([
      ['قضي', 7],
      ['وجب', 1],
      ['موت', 1],
      ['قرر', 1],
      ['ءصل', 1],
      ['وري', 1],
      ['سبب', 5],
      ['وسع', 5],
      ['سني', 5],
      ['حني', 7],
      ['زوي', 7],
      ['قرء', 7],
      ['بثث', 7],
      ['دسس', 7],
      ['ءلف', 5],
      ['ءكل', 5],
      ['هيء', 5],
      ['طور', 5],
      ['مدد', 5],
      ['كمل', 6],
      ['نمو', 6],
      ['مشي', 6],
      ['وزن', 6],
      ['ءكل', 6],
      ['بطء', 6],
      ['قصص', 7],
      ['وسخ', 8],
      ['ظلم', 8],
      ['حلم', 8],
      ['ضرب', 8],
      ['حمر', 9],
      ['بيض', 9],
      ['خضر', 9],
      ['زرق', 9],
      ['صفر', 9],
      ['جلفع', 3],
      ['جرمز', 4],
      ['جلعد', 4],
      ['لءلء', 1],
    ])('%s (Form %d)', (root, form) => {
      expect(getAvailableParadigms(getVerb(root, form))).not.toContain('passive.past')
    })
  })

  test.each<[string, TriliteralForm]>([
    ['Ewm', 1],
    ['سعد', 1],
    ['موت', 1],
    ['كون', 1],
    ['وري', 1],
    ['ءصل', 1],
    ['مدد', 5],
    ['طلق', 7],
    ['قرء', 7],
    ['زوي', 7],
    ['قصص', 7],
    ['ظلم', 8],
    ['ضرب', 8],
    ['حلم', 8],
    ['لءلء', 1],
    ['جلفع', 3],
    ['جرمز', 4],
    ['جلعد', 4],
  ])('%s (Form %d) omits passive participle', (root, form) => {
    expect(getAvailableParadigms(getVerb(root, form))).not.toContain('passive.participle')
  })
})

describe('Form I roots with more than one vowel pattern', () => {
  test.each<[string, FormIPattern]>([
    ['Hsb-1-a-u', 'a-u'],
    ['Hsb-1-i-a', 'i-a'],
  ])('%s is addressable and carries vowels %s', (id, vowels) => {
    expect(getVerbById(id)).toEqual(getVerb('حسب', 1, vowels))
  })

  test.each<[string, string]>([
    ['Hsb-1', 'Hsb-1-a-u'],
    ['jml-1', 'jml-1-a-u'],
  ])('a stale bare lookup for %s resolves to %s', (bareId, canonicalId) => {
    expect(getVerbById(bareId)).toEqual(getVerbById(canonicalId))
  })

  test.each<[string, FormIPattern]>([
    ['حسب', 'a-u'],
    ['جمل', 'a-u'],
  ])('getVerb(%s, 1) returns the alphabetically-first reading', (root, vowels) => {
    expect(getVerb(root, 1).vowels).toBe(vowels)
  })

  test('getVerb defaults a missing Form I root to a-a', () => {
    expect(getVerb('ضفز', 1)).toEqual({
      id: 'Dfz-1',
      form: 1,
      lemma: 'ضَفَزَ',
      root: 'ضفز',
      rootId: 'Dfz',
      rootTokens: tokenize('ضفز'),
      vowels: 'a-a',
      masdars: undefined,
      lexicalMasdars: [],
      lexicalActiveParticiple: undefined,
      synthetic: true,
      valency: [],
    })
  })

  test('an unambiguous root keeps its bare Form I id', () => {
    expect(getVerbById('ktb-1')).toEqual(getVerb('كتب', 1))
    expect(getVerbById('ktb-1-a-u')).toEqual(getVerb('كتب', 1))
  })

  test('a root with no Form I row gets distinct ids for distinct synthetic vowel patterns', () => {
    expect(getVerb('ضفز', 1, 'a-a').id).toBe('Dfz-1')
    expect(getVerb('ضفز', 1, 'a-i').id).toBe('Dfz-1-a-i')
    expect(getVerb('ضفز', 1, 'a-i').id).not.toBe(getVerb('ضفز', 1, 'a-a').id)
  })

  test.each<[string, FormIPattern, string]>([
    ['حسب', 'a-u', 'Hsb-1-a-u'],
    ['جمل', 'u-u', 'jml-1-u-u'],
  ])('looking up %s %s for an ambiguous root produces the suffixed id %s', (root, pattern, id) => {
    expect(getVerb(root, 1, pattern).id).toBe(id)
  })

  test('ZNN_SISTERS_IDS points at Hsb’s "to deem" sense, not the "to compute" one', () => {
    expect(ZNN_SISTERS_IDS.has('Hsb-1-i-a')).toBe(true)
    expect(ZNN_SISTERS_IDS.has('Hsb-1')).toBe(false)
  })

  test.each<[string, FormIPattern[]]>([
    ['حسب', ['a-u', 'i-a']],
    ['جمل', ['a-u', 'u-u']],
  ])('%s stores its Form I readings in ascending vowel order', (root, expected) => {
    const patterns = findVerbsByRoot(root)
      .filter(isTriliteralFormIDisplayVerb)
      .map((verb) => verb.vowels)
    expect(patterns).toEqual(expected)
  })
})
