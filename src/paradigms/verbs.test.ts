import fc from 'fast-check'
import { describe, expect, test } from 'vitest'
import { formatFormLabel, getAvailableParadigms, getVerb, synthesizeVerb, type VerbForm, verbs } from './verbs'

describe('synthesizeVerb', () => {
  test('marks synthesized Form I verb as synthetic', () => {
    expect(synthesizeVerb('كتب', 1, 'fa3ala-yaf3ulu').synthetic).toBe(true)
  })

  test('marks synthesized Form II–X verb as synthetic', () => {
    expect(synthesizeVerb('كتب', 2).synthetic).toBe(true)
  })

  test('corpus verbs are not synthetic', () => {
    expect(getVerb('كتب', 1).synthetic).toBeUndefined()
  })
})

describe('buildSyntheticVerb', () => {
  test('Form I', () => {
    const verb = synthesizeVerb('كتب', 1, 'fa3ala-yaf3ulu')
    expect(verb).toEqual({
      id: 'ktb-1',
      form: 1,
      formPattern: 'fa3ala-yaf3ulu',
      masdarPatterns: ['fi3aal'],
      label: 'كَتَبَ',
      root: 'كتب',
      rootId: 'ktb',
      synthetic: true,
    })
  })

  test('Forms II-X', () => {
    const verb = synthesizeVerb('كتب', 2)
    expect(verb).toEqual({
      form: 2,
      id: 'ktb-2',
      label: 'كَتَّبَ',
      root: 'كتب',
      rootId: 'ktb',
      synthetic: true,
    })
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

  test('excludes all passive.* for a verb with passiveVoice: none', () => {
    const verb = getVerb('وفي', 1) // passiveVoice: 'none' in roots.json
    const available = getAvailableParadigms(verb)
    expect(available.filter((p) => p.startsWith('passive'))).toHaveLength(0)
  })

  test('excludes passive.participle for a verb with noPassiveParticiple: true', () => {
    // ءمن form 1 has noPassiveParticiple: true but passive conjugation is available
    const verb = getVerb('ءمن', 1)
    const available = getAvailableParadigms(verb)
    expect(available).not.toContain('passive.participle')
    expect(available).toContain('passive.past')
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
    test.each<[string, VerbForm]>([
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
      ['برغش', 4],
      ['جلعب', 4],
      ['ءتي', 3],
      ['رءي', 3],
      ['ءتي', 4],
      ['سلم', 4],
      ['مدد', 4],
      ['عرف', 5],
      ['رءي', 5],
      ['هدد', 5],
      ['عزز', 5],
      ['قرر', 5],
      ['سلم', 5],
      ['وصل', 5],
      ['وفر', 5],
      ['وقف', 5],
      ['وقع', 5],
      ['ءثر', 5],
      ['ءول', 5],
      ['ءتي', 5],
      ['بقي', 5],
      ['بني', 5],
      ['وفي', 5],
      ['وقي', 5],
      ['وخي', 5],
      ['شرك', 6],
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
      ['قصص', 7],
      ['بثث', 7],
      ['كفف', 7],
      ['دسس', 7],
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
    ])('%s (Form %d)', (root, form) => {
      expect(getAvailableParadigms(getVerb(root, form))).toContain('passive.past')
    })
  })

  describe('has no passive voice', () => {
    test.each<[string, VerbForm]>([
      ['وفي', 1],
      ['قضي', 7],
      ['وهن', 1],
      ['يءس', 1],
      ['وجب', 1],
      ['ظلل', 1],
      ['ميل', 1],
      ['موت', 1],
      ['قرر', 1],
      ['بعد', 1],
      ['بدو', 1],
      ['جرء', 1],
      ['ءذن', 1],
      ['ءصل', 1],
      ['ءمر', 1],
      ['وري', 1],
      ['حدث', 5],
      ['طلب', 5],
      ['مثل', 5],
      ['حدد', 5],
      ['سبب', 5],
      ['وسع', 5],
      ['سني', 5],
      ['حدي', 5],
      ['سمي', 5],
      ['حني', 7],
      ['زوي', 7],
      ['قرء', 7],
      ['عين', 5],
      ['ءخر', 5],
      ['ءمم', 5],
      ['ءلف', 5],
      ['ءكد', 5],
      ['ءكل', 5],
      ['ءوه', 5],
      ['ءذي', 5],
      ['زوي', 5],
      ['وكء', 5],
      ['حول', 5],
      ['ضوء', 5],
      ['هيء', 5],
      ['طور', 5],
      ['غير', 5],
      ['شوق', 5],
      ['مدد', 5],
      ['كمل', 6],
      ['قسم', 6],
      ['نمو', 6],
      ['مشي', 6],
      ['وجه', 6],
      ['وزن', 6],
      ['ءكل', 6],
      ['بطء', 6],
      ['وسخ', 8],
      ['ظلم', 8],
      ['حلم', 8],
      ['ضرب', 8],
      ['حمر', 9],
      ['بيض', 9],
      ['خضر', 9],
      ['زرق', 9],
      ['صفر', 9],
      ['خضل', 9],
      ['جلفع', 3],
      ['جرمز', 4],
      ['جلعد', 4],
      ['لءلء', 1],
    ])('%s (Form %d)', (root, form) => {
      expect(getAvailableParadigms(getVerb(root, form))).not.toContain('passive.past')
    })
  })

  test('never allows passive for any Form IX verb in the corpus', () => {
    fc.assert(
      fc.property(fc.constantFrom(...verbs.filter((v) => v.form === 9)), (verb) => {
        expect(getAvailableParadigms(verb)).not.toContain('passive.past')
      }),
    )
  })

  test.each<[string, VerbForm]>([
    ['جلس', 1],
    ['حبط', 1],
    ['سعد', 1],
    ['موت', 1],
    ['كون', 1],
    ['وري', 1],
    ['ءصل', 1],
    ['ءمن', 1],
    ['مدد', 5],
    ['طلق', 7],
    ['فجر', 7],
    ['قرء', 7],
    ['زوي', 7],
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
