import { PRONOUN_IDS } from '../../src/paradigms/pronouns.ts'
import type { ParsedParadigms, PronounId, VerbParadigm } from './paradigms.mts'

const PARADIGM_ORDER: VerbParadigm[] = [
  'active past',
  'active present indicative',
  'active present subjunctive',
  'active present jussive',
  'active imperative',
  'passive past',
  'passive present indicative',
  'passive present subjunctive',
  'passive present jussive',
]

function toDoubleQuotedLiteral(value: string): string {
  return JSON.stringify(value)
}

function formatObject(values: Partial<Record<PronounId, string>>): string {
  const lines = PRONOUN_IDS.filter((pronoun) => values[pronoun]).map(
    (pronoun) => `      '${pronoun}': '${values[pronoun]}',`,
  )
  return ['{', ...lines, '    }'].join('\n')
}

function renderParadigmBody(slug: string, paradigm: VerbParadigm, values: Partial<Record<PronounId, string>>): string {
  const count = Object.keys(values).length
  const matcher = count === PRONOUN_IDS.length ? 'toEqualT' : 'toMatchObjectT'

  const CONJUGATOR: Record<VerbParadigm, string> = {
    'active past': 'conjugatePast(verb)',
    'active present indicative': "conjugatePresentMood(verb, 'indicative')",
    'active present subjunctive': "conjugatePresentMood(verb, 'subjunctive')",
    'active present jussive': "conjugatePresentMood(verb, 'jussive')",
    'active imperative': 'conjugateImperative(verb)',
    'passive past': 'conjugatePassivePast(verb)',
    'passive present indicative': "conjugatePassivePresentMood(verb, 'indicative')",
    'passive present subjunctive': "conjugatePassivePresentMood(verb, 'subjunctive')",
    'passive present jussive': "conjugatePassivePresentMood(verb, 'jussive')",
  }
  const conjugator = CONJUGATOR[paradigm]

  const inlineVerb = `getVerbById(${toDoubleQuotedLiteral(slug)})!`
  const conjugationCall = conjugator.replace('verb', inlineVerb)
  return `  test('${paradigm}', () => {\n    expect(${conjugationCall}).${matcher}(${formatObject(values)})\n  })`
}

export function renderVerbTestFile(slug: string, parsed: ParsedParadigms): string {
  const needsActivePresent =
    parsed.paradigms['active present indicative'] ||
    parsed.paradigms['active present subjunctive'] ||
    parsed.paradigms['active present jussive']
  const needsPassivePresent =
    parsed.paradigms['passive present indicative'] ||
    parsed.paradigms['passive present subjunctive'] ||
    parsed.paradigms['passive present jussive']

  const imports = [
    "import { describe, expect, test } from 'vitest'",
    "import { conjugateImperative } from '../active/imperative'",
    "import { conjugatePast } from '../active/past'",
    needsActivePresent ? "import { conjugatePresentMood } from '../active/present'" : '',
    "import { deriveMasdar } from '../nominal/masdar'",
    "import { deriveActiveParticiple } from '../nominal/participle-active'",
    "import { derivePassiveParticiple } from '../nominal/participle-passive'",
    "import { conjugatePassivePast } from '../passive/past'",
    needsPassivePresent ? "import { conjugatePassivePresentMood } from '../passive/present'" : '',
    "import { getVerbById } from '../verbs'",
  ]
    .filter(Boolean)
    .join('\n')

  const tests: string[] = []

  for (const paradigm of PARADIGM_ORDER) {
    const values = parsed.paradigms[paradigm]
    if (!values || Object.keys(values).length === 0) continue
    tests.push(renderParadigmBody(slug, paradigm, values))
  }

  if (parsed.nominals.activeParticiple) {
    tests.push(
      `  test('active participle', () => {\n    expect(deriveActiveParticiple(getVerbById(${toDoubleQuotedLiteral(slug)})!)).toEqualT('${parsed.nominals.activeParticiple}')\n  })`,
    )
  }

  if (parsed.nominals.passiveParticiple) {
    tests.push(
      `  test('passive participle', () => {\n    expect(derivePassiveParticiple(getVerbById(${toDoubleQuotedLiteral(slug)})!)).toEqualT('${parsed.nominals.passiveParticiple}')\n  })`,
    )
  }

  if (parsed.nominals.masdar?.length) {
    const masdarList = parsed.nominals.masdar.map((value) => `'${value}'`).join(', ')
    tests.push(
      `  test('masdar', () => {\n    expect(deriveMasdar(getVerbById(${toDoubleQuotedLiteral(slug)})!)).toEqualT([${masdarList}])\n  })`,
    )
  }

  return `${imports}

describe(${toDoubleQuotedLiteral(slug)}, () => {
${tests.join('\n\n')}
})
`
}
