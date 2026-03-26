import { describe, expect, test } from 'vitest'
import type { ExplanationLayers } from './explanation'
import { renderExplanation, resolveVerbExplanationLayers } from './explanation'
import { getVerb } from './verbs'

// ── rootType ──────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers rootType', () => {
  test('sound root → rootType sound', () => {
    const verb = getVerb('كتب', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'كَتَبَ')
    expect(layers.rootType).toBe('sound')
  })

  test('hollow-waw root → rootType hollow-waw', () => {
    const verb = getVerb('قول', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'قَالَ')
    expect(layers.rootType).toBe('hollow-waw')
  })

  test('hollow-yaa root → rootType hollow-yaa', () => {
    const verb = getVerb('بيع', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'بَاعَ')
    expect(layers.rootType).toBe('hollow-yaa')
  })

  test('defective-waw root → rootType defective-waw', () => {
    const verb = getVerb('دعو', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'دَعَا')
    expect(layers.rootType).toBe('defective-waw')
  })

  test('defective-yaa root → rootType defective-yaa', () => {
    const verb = getVerb('رمي', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'رَمَى')
    expect(layers.rootType).toBe('defective-yaa')
  })

  test('assimilated root → rootType assimilated', () => {
    const verb = getVerb('وصل', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'وَصَلَ')
    expect(layers.rootType).toBe('assimilated')
  })

  test('doubled root → rootType doubled', () => {
    const verb = getVerb('مدد', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'مَدَّ')
    expect(layers.rootType).toBe('doubled')
  })
})

// ── formIPattern ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers formIPattern', () => {
  test('Form I verb → formIPattern is verb.formPattern', () => {
    const verb = getVerb('كتب', 1)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'كَتَبَ')
    expect(layers.formIPattern).toBe('fa3ala-yaf3ulu')
  })

  test('Form II verb → formIPattern is null', () => {
    const verb = getVerb('كتب', 2)
    const layers = resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'كَتَّبَ')
    expect(layers.formIPattern).toBeNull()
  })
})

// ── tenseContext ─────────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseContext', () => {
  const verb = getVerb('كتب', 1)

  test('active past → tense active-past', () => {
    expect(resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'x').tense).toBe('active-past')
  })

  test('active present indicative → tense active-present-indicative', () => {
    expect(resolveVerbExplanationLayers(verb, ['active', 'present', 'indicative'], '3ms', 'x').tense).toBe(
      'active-present-indicative',
    )
  })

  test('active present jussive → tense active-present-jussive', () => {
    expect(resolveVerbExplanationLayers(verb, ['active', 'present', 'jussive'], '3ms', 'x').tense).toBe(
      'active-present-jussive',
    )
  })

  test('active imperative → tense active-imperative', () => {
    expect(resolveVerbExplanationLayers(verb, ['active', 'imperative'], '2ms', 'x').tense).toBe('active-imperative')
  })

  test('passive past → tense passive-past', () => {
    expect(resolveVerbExplanationLayers(verb, ['passive', 'past'], '3ms', 'x').tense).toBe('passive-past')
  })

  test('passive present jussive → tense passive-present-jussive', () => {
    expect(resolveVerbExplanationLayers(verb, ['passive', 'present', 'jussive'], '3ms', 'x').tense).toBe(
      'passive-present-jussive',
    )
  })
})

// ── tenseRoot: hollow ────────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot hollow', () => {
  const qawl = getVerb('قول', 1) // hollow-waw
  const bay3 = getVerb('بيع', 1) // hollow-yaa

  test('hollow-waw + active-past → middle-lengthens-aa', () => {
    expect(resolveVerbExplanationLayers(qawl, ['active', 'past'], '3ms', 'قَالَ').tenseRoot).toBe('middle-lengthens-aa')
  })

  test('hollow-yaa + active-past → middle-lengthens-ii', () => {
    expect(resolveVerbExplanationLayers(bay3, ['active', 'past'], '3ms', 'بَاعَ').tenseRoot).toBe('middle-lengthens-ii')
  })

  test('hollow-waw + active-present-indicative → middle-lengthens-uu', () => {
    expect(resolveVerbExplanationLayers(qawl, ['active', 'present', 'indicative'], '3ms', 'يَقُولُ').tenseRoot).toBe(
      'middle-lengthens-uu',
    )
  })

  test('hollow-yaa + active-present-indicative → middle-lengthens-ii', () => {
    expect(resolveVerbExplanationLayers(bay3, ['active', 'present', 'indicative'], '3ms', 'يَبِيعُ').tenseRoot).toBe(
      'middle-lengthens-ii',
    )
  })

  test('hollow-waw + active-present-jussive → middle-shortens', () => {
    expect(resolveVerbExplanationLayers(qawl, ['active', 'present', 'jussive'], '3ms', 'يَقُلْ').tenseRoot).toBe(
      'middle-shortens',
    )
  })

  test('hollow + passive-past → middle-passive-ii', () => {
    expect(resolveVerbExplanationLayers(qawl, ['passive', 'past'], '3ms', 'قِيلَ').tenseRoot).toBe('middle-passive-ii')
  })

  test('hollow + passive-present-indicative → middle-passive-aa', () => {
    expect(resolveVerbExplanationLayers(qawl, ['passive', 'present', 'indicative'], '3ms', 'يُقَالُ').tenseRoot).toBe(
      'middle-passive-aa',
    )
  })

  test('hollow + active-imperative → middle-shortens', () => {
    expect(resolveVerbExplanationLayers(qawl, ['active', 'imperative'], '2ms', 'قُلْ').tenseRoot).toBe('middle-shortens')
  })
})

// ── tenseRoot: defective ─────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot defective', () => {
  const da3a = getVerb('دعو', 1) // defective-waw
  const rama = getVerb('رمي', 1) // defective-yaa

  test('defective + active-past + 3ms → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '3ms', 'دَعَا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active-past + 3fs → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '3fs', 'دَعَتْ').tenseRoot).toBe('final-isolated')
  })

  test('defective + active-past + 3mp → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '3mp', 'دَعَوْا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active-past + 3md → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '3md', 'دَعَوَا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active-past + 3fd → final-isolated', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '3fd', 'دَعَتَا').tenseRoot).toBe('final-isolated')
  })

  test('defective + active-past + 1s → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '1s', 'دَعَوْتُ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 2ms → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '2ms', 'دَعَوْتَ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 3fp → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '3fp', 'دَعَوْنَ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 1p → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '1p', 'دَعَوْنَا').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 2fs → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '2fs', 'دَعَوْتِ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 2d → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '2d', 'دَعَوْتُمَا').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 2mp → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '2mp', 'دَعَوْتُمْ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective + active-past + 2fp → final-resurfaces', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'past'], '2fp', 'دَعَوْتُنَّ').tenseRoot).toBe('final-resurfaces')
  })

  test('defective-waw + active-present-indicative → final-lengthens-uu', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'present', 'indicative'], '3ms', 'يَدْعُو').tenseRoot).toBe(
      'final-lengthens-uu',
    )
  })

  test('defective-yaa + active-present-indicative → final-lengthens-ii', () => {
    expect(resolveVerbExplanationLayers(rama, ['active', 'present', 'indicative'], '3ms', 'يَرْمِي').tenseRoot).toBe(
      'final-lengthens-ii',
    )
  })

  test('defective + active-present-jussive → final-drops', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'present', 'jussive'], '3ms', 'يَدْعُ').tenseRoot).toBe(
      'final-drops',
    )
  })

  test('defective + active-imperative → final-drops', () => {
    expect(resolveVerbExplanationLayers(da3a, ['active', 'imperative'], '2ms', 'اُدْعُ').tenseRoot).toBe('final-drops')
  })

  test('defective + passive-past → final-passive', () => {
    expect(resolveVerbExplanationLayers(da3a, ['passive', 'past'], '3ms', 'دُعِيَ').tenseRoot).toBe('final-passive')
  })

  test('defective + passive-present-indicative → final-passive', () => {
    expect(resolveVerbExplanationLayers(da3a, ['passive', 'present', 'indicative'], '3ms', 'يُدْعَى').tenseRoot).toBe(
      'final-passive',
    )
  })
})

// ── tenseRoot: assimilated ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot assimilated', () => {
  const waSala = getVerb('وصل', 1)

  test('assimilated + Form I + active-present-indicative → initial-drops', () => {
    expect(resolveVerbExplanationLayers(waSala, ['active', 'present', 'indicative'], '3ms', 'يَصِلُ').tenseRoot).toBe(
      'initial-drops',
    )
  })

  test('assimilated + Form I + active-present-subjunctive → initial-drops', () => {
    expect(resolveVerbExplanationLayers(waSala, ['active', 'present', 'subjunctive'], '3ms', 'يَصِلَ').tenseRoot).toBe(
      'initial-drops',
    )
  })

  test('assimilated + Form I + active-present-jussive → initial-drops', () => {
    expect(resolveVerbExplanationLayers(waSala, ['active', 'present', 'jussive'], '3ms', 'يَصِلْ').tenseRoot).toBe(
      'initial-drops',
    )
  })

  test('assimilated + Form I + active-past → null', () => {
    expect(resolveVerbExplanationLayers(waSala, ['active', 'past'], '3ms', 'وَصَلَ').tenseRoot).toBeNull()
  })

  test('assimilated + Form II + active-present-indicative → null', () => {
    const verb2 = getVerb('وصل', 2)
    expect(resolveVerbExplanationLayers(verb2, ['active', 'present', 'indicative'], '3ms', 'يُوَصِّلُ').tenseRoot).toBeNull()
  })
})

// ── tenseRoot: geminate ──────────────────────────────────────────────────────

describe('resolveVerbExplanationLayers tenseRoot geminate', () => {
  const madda = getVerb('مدد', 1)

  test('doubled + Form I + active-past → geminate-contracts', () => {
    expect(resolveVerbExplanationLayers(madda, ['active', 'past'], '3ms', 'مَدَّ').tenseRoot).toBe('geminate-contracts')
  })

  test('doubled + Form I + active-present-indicative → geminate-contracts', () => {
    expect(resolveVerbExplanationLayers(madda, ['active', 'present', 'indicative'], '3ms', 'يَمُدُّ').tenseRoot).toBe(
      'geminate-contracts',
    )
  })

  test('doubled + Form I + active-present-jussive → geminate-jussive', () => {
    expect(resolveVerbExplanationLayers(madda, ['active', 'present', 'jussive'], '3ms', 'يَمُدَّ').tenseRoot).toBe(
      'geminate-jussive',
    )
  })

  test('doubled + Form I + active-imperative → geminate-jussive', () => {
    expect(resolveVerbExplanationLayers(madda, ['active', 'imperative'], '2ms', 'مُدَّ').tenseRoot).toBe(
      'geminate-jussive',
    )
  })

  test('doubled + Form II + active-past → null', () => {
    const verb2 = getVerb('مدد', 2)
    expect(resolveVerbExplanationLayers(verb2, ['active', 'past'], '3ms', 'مَدَّدَ').tenseRoot).toBeNull()
  })

  test('doubled + Form V + active-past → null', () => {
    const verb5 = getVerb('مدد', 5)
    expect(resolveVerbExplanationLayers(verb5, ['active', 'past'], '3ms', 'تَمَدَّدَ').tenseRoot).toBeNull()
  })
})

// ── pronoun / arabic fields ───────────────────────────────────────────────────

describe('resolveVerbExplanationLayers pronoun and arabic', () => {
  const verb = getVerb('كتب', 1)

  test('pronoun matches passed pronoun', () => {
    expect(resolveVerbExplanationLayers(verb, ['active', 'past'], '2fs', 'كَتَبْتِ').pronoun).toBe('2fs')
  })

  test('arabic field matches passed arabic', () => {
    expect(resolveVerbExplanationLayers(verb, ['active', 'past'], '3ms', 'كَتَبَ').arabic).toBe('كَتَبَ')
  })
})

describe('renderExplanation', () => {
  // Stub t() that echoes the key so we can assert key structure without locale files
  const t = (key: string) => key
  const joined = (layers: ExplanationLayers, mode: 'full' | 'concise') => renderExplanation(layers, t, mode).join(' ')

  test('concise mode with non-null tenseRoot returns only tenseRoot sentence', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ق', 'و', 'ل'],
      form: 1,
      arabic: 'قَالَ',
      rootType: 'hollow-waw',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'active-past',
      tenseRoot: 'middle-lengthens-aa',
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t, 'concise')).toEqual(['explanation.tense-root.middle-lengthens-aa'])
  })

  test('concise mode with null tenseRoot returns empty string', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَتَبَ',
      rootType: 'sound',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t, 'concise')).toEqual([])
  })

  test('full mode includes root sentence', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَتَبَ',
      rootType: 'sound',
      formIPattern: null,
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).toContain('explanation.root.sound')
  })

  test('full mode groups root, form description, and formIPattern in first paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَتَبَ',
      rootType: 'sound',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t, 'full')).toEqual([
      'explanation.root.sound explanation.form.1 explanation.form-i-pattern.fa3ala-yaf3ulu',
      'explanation.tense.active-past explanation.tense.active-past.form-i',
      'explanation.pronoun.past.3ms',
    ])
  })

  test('full mode includes form description in first paragraph for non-form-I', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['أ', 'ت', 'ي'],
      form: 3,
      arabic: 'آتَى',
      rootType: 'defective-yaa',
      formIPattern: null,
      formRoot: null,
      tense: 'active-past',
      tenseRoot: 'final-isolated',
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t, 'full')[0]).toContain('explanation.form.3')
  })

  test('full mode includes form-i past pattern sentence for form I active-past', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَتَبَ',
      rootType: 'sound',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).toContain('explanation.tense.active-past.form-i')
  })

  test('full mode omits form-i past pattern sentence for non-form-I active-past', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['أ', 'ت', 'ي'],
      form: 3,
      arabic: 'آتَى',
      rootType: 'defective-yaa',
      formIPattern: null,
      formRoot: null,
      tense: 'active-past',
      tenseRoot: 'final-isolated',
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).not.toContain('active-past.form-i')
  })

  test('full mode omits formIPattern sentence when null', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 2,
      arabic: 'كَتَّبَ',
      rootType: 'sound',
      formIPattern: null,
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).not.toContain('form-i-pattern')
  })

  test('full mode includes passive.past voice sentence for passive-past', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كُتِبَ',
      rootType: 'sound',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'passive-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    const result = joined(layers, 'full')
    expect(result).toContain('explanation.voice.passive.past')
    expect(result).not.toContain('explanation.voice.passive.present')
  })

  test('full mode includes passive.present voice sentence for passive-present-indicative', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'يُكْتَبُ',
      rootType: 'sound',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'passive-present-indicative',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).toContain('explanation.voice.passive.present')
  })

  test('full mode omits voice sentence for active tenses', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَتَبَ',
      rootType: 'sound',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).not.toContain('explanation.voice')
  })

  test('full mode pronoun key for active-past uses past namespace', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'كَتَبَ',
      rootType: 'sound',
      formIPattern: null,
      formRoot: null,
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t, 'full')).toContain('explanation.pronoun.past.3ms')
  })

  test('full mode pronoun key for active-present-subjunctive uses present.subjunctive namespace', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'يَكْتُبَ',
      rootType: 'sound',
      formIPattern: null,
      formRoot: null,
      tense: 'active-present-subjunctive',
      tenseRoot: null,
      pronoun: '2d',
    }
    expect(renderExplanation(layers, t, 'full')).toContain('explanation.pronoun.present.subjunctive.2d')
  })

  test('full mode pronoun key for active-imperative uses imperative namespace', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ك', 'ت', 'ب'],
      form: 1,
      arabic: 'اُكْتُبْ',
      rootType: 'sound',
      formIPattern: null,
      formRoot: null,
      tense: 'active-imperative',
      tenseRoot: null,
      pronoun: '2ms',
    }
    expect(renderExplanation(layers, t, 'full')).toContain('explanation.pronoun.imperative.2ms')
  })

  test('full mode includes tenseRoot sentence when non-null', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['ق', 'و', 'ل'],
      form: 1,
      arabic: 'قَالَ',
      rootType: 'hollow-waw',
      formIPattern: 'fa3ala-yaf3ulu',
      formRoot: null,
      tense: 'active-past',
      tenseRoot: 'middle-lengthens-aa',
      pronoun: '3ms',
    }
    expect(joined(layers, 'full')).toContain('explanation.tense-root.middle-lengthens-aa')
  })

  test('full mode groups root and formRoot in first paragraph', () => {
    const layers: ExplanationLayers = {
      rootLetters: ['و', 'ص', 'ل'],
      form: 8,
      arabic: 'اِتَّصَلَ',
      rootType: 'assimilated',
      formIPattern: null,
      formRoot: 'assimilation-waw',
      tense: 'active-past',
      tenseRoot: null,
      pronoun: '3ms',
    }
    expect(renderExplanation(layers, t, 'full')).toEqual([
      'explanation.root.assimilated explanation.form.8 explanation.form-root.assimilation-waw',
      'explanation.tense.active-past',
      'explanation.pronoun.past.3ms',
    ])
  })
})
