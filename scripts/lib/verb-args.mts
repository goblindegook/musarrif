import { transliterateReverse } from '@pacote/buckwalter'
import { FORM_I_PATTERNS, type FormIPattern } from '../../src/paradigms/form-i-vowels.ts'
import {
  type DisplayVerb,
  formsForRoot,
  getVerbById,
  synthesizeVerb,
  type VerbForm,
} from '../../src/paradigms/verbs.ts'
import { fetchParadigms as elixirfm } from './elixirfm.mts'
import type { GenerationTool } from './paradigms.mts'
import { fetchParadigms as qutrub } from './qutrub.mts'
import { fetchParadigms as reverso } from './reverso.mts'
import { fetchParadigms as wiktionary } from './wiktionary.mts'

export const fetchers = { elixirfm, qutrub, reverso, wiktionary } as const

export interface VerbArgs {
  source: GenerationTool
  verb: DisplayVerb
  pattern?: FormIPattern
}

export function parseVerbArgs(argv: readonly string[], scriptName: string): VerbArgs {
  const sources = Object.keys(fetchers).join('|')
  const fail = (reason: string): never => {
    throw new Error(
      `${reason}\nUsage: npm run ${scriptName} <${sources}> <verb-slug> [${FORM_I_PATTERNS.join('|')}] (example: npm run ${scriptName} wiktionary ktb-1 a-u)`,
    )
  }

  const source = argv[2]?.trim()
  const slug = argv[3]?.trim()
  const pattern = argv[4]?.trim()

  if (!source || !(source in fetchers)) fail(`Unknown source "${source ?? ''}".`)
  if (!slug) fail('A verb slug is required.')

  const [rootId, formText, ...rest] = (slug as string).split('-')
  if (!rootId || !formText || rest.length > 0) fail(`Malformed slug "${slug}", expected <root>-<form>, e.g. ktb-1.`)

  const root = transliterateReverse(rootId)
  if (root.length !== 3 && root.length !== 4)
    fail(`Root "${rootId}" has ${root.length} radical(s), expected three or four.`)

  const allowedForms = formsForRoot(root) as readonly VerbForm[]
  const form = Number(formText)
  if (!Number.isInteger(form) || !allowedForms.includes(form as VerbForm))
    fail(`Form "${formText}" is not available for root "", expected one of ${allowedForms.join(', ')}.`)

  if (pattern) {
    if (!FORM_I_PATTERNS.includes(pattern as FormIPattern)) fail(`Unknown vowel pattern "${pattern}".`)
    if (form !== 1 || root.length !== 3)
      fail(`A vowel pattern only applies to a triliteral Form I verb, not "${slug}".`)
  }

  const verb = pattern
    ? synthesizeVerb(root, 1, pattern as FormIPattern)
    : (getVerbById(`${rootId}-${form}`) ?? synthesizeVerb(root, form as VerbForm))

  return { source: source as GenerationTool, verb, pattern: pattern as FormIPattern | undefined }
}
