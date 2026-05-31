import type { ParsedParadigms, PronounId, VerbParadigm } from './wiktionary-parse'

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

const PRONOUN_ORDER: PronounId[] = [
  '1s',
  '2ms',
  '2fs',
  '3ms',
  '3fs',
  '2d',
  '3md',
  '3fd',
  '1p',
  '2mp',
  '2fp',
  '3mp',
  '3fp',
]
const FULL_CONJUGATION_SIZE = PRONOUN_ORDER.length

function toDoubleQuotedLiteral(value: string): string {
  return JSON.stringify(value)
}

function formatObject(values: Partial<Record<PronounId, string>>): string {
  const lines = PRONOUN_ORDER.filter((pronoun) => values[pronoun]).map(
    (pronoun) => `      '${pronoun}': '${values[pronoun]}',`,
  )
  return ['{', ...lines, '    }'].join('\n')
}

function renderParadigmBody(slug: string, paradigm: VerbParadigm, values: Partial<Record<PronounId, string>>): string {
  const count = Object.keys(values).length
  const matcher = count === FULL_CONJUGATION_SIZE ? 'toEqualT' : 'toMatchObjectT'

  const conjugator =
    paradigm === 'active past'
      ? 'conjugatePast(verb)'
      : paradigm === 'active present indicative'
        ? "conjugatePresentMood(verb, 'indicative')"
        : paradigm === 'active present subjunctive'
          ? "conjugatePresentMood(verb, 'subjunctive')"
          : paradigm === 'active present jussive'
            ? "conjugatePresentMood(verb, 'jussive')"
            : paradigm === 'active imperative'
              ? 'conjugateImperative(verb)'
              : paradigm === 'passive past'
                ? 'conjugatePassivePast(verb)'
                : paradigm === 'passive present indicative'
                  ? "conjugatePassivePresentMood(verb, 'indicative')"
                  : paradigm === 'passive present subjunctive'
                    ? "conjugatePassivePresentMood(verb, 'subjunctive')"
                    : "conjugatePassivePresentMood(verb, 'jussive')"

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
