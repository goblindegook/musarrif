import type { RootShape } from '../../../../../src/paradigms/roots'
import { analyzeRoot } from '../../../../../src/paradigms/roots'
import type { DisplayVerb } from '../../../../../src/paradigms/verb-types'
import { FORMS, QUADRILITERAL_FORMS } from '../../../../../src/paradigms/verb-types'
import { frequencyRank, KWN_SISTERS_IDS, verbs, ZNN_SISTERS_IDS } from '../../../../../src/paradigms/verbs'
import { toRoman } from '../../../../../src/primitives/numbers'

type SortOrder = 'frequency' | 'alphabetical'
type GroupFilter = 'favourites' | 'kana' | 'zanna'
export type FilterState = {
  sort: SortOrder
  form: string | null
  rootShapes: readonly RootShape[]
  group: GroupFilter | null
}

export const DEFAULT_FILTERS: FilterState = { sort: 'frequency', form: null, rootShapes: [], group: null }

export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.sort !== DEFAULT_FILTERS.sort ||
    filters.form != null ||
    filters.rootShapes.length > 0 ||
    filters.group != null
  )
}
export const ROOT_SHAPES: readonly RootShape[] = [
  'sound',
  'doubled',
  'assimilated',
  'hollow',
  'defective',
  'hamzated',
  'biliteral',
]
export const FORM_OPTIONS = [
  ...FORMS.map((form) => ({ value: String(form), label: toRoman(form) })),
  ...QUADRILITERAL_FORMS.map((form) => ({ value: `${form}q`, label: `${toRoman(form)}q` })),
]

const ALPHABETICAL_VERBS = [...verbs].sort((a, b) => a.lemma.localeCompare(b.lemma, 'ar'))
const FREQUENCY_VERBS = [...ALPHABETICAL_VERBS].sort((a, b) => frequencyRank(a) - frequencyRank(b))

export function filterVerbs(filters: FilterState, favouriteVerbIDs: ReadonlySet<string>): DisplayVerb[] {
  let list = filters.sort === 'frequency' ? FREQUENCY_VERBS : ALPHABETICAL_VERBS
  if (filters.form) {
    const isQuadriliteral = filters.form.endsWith('q')
    const targetForm = Number(isQuadriliteral ? filters.form.slice(0, -1) : filters.form)
    list = list.filter((verb) => verb.form === targetForm && (verb.root.length === 4) === isQuadriliteral)
  }
  if (filters.rootShapes.length > 0) {
    list = list.filter((verb) => {
      const shapes = analyzeRoot(verb.rootTokens).type
      return filters.rootShapes.every((shape) => shapes.includes(shape))
    })
  }
  if (filters.group === 'favourites') list = list.filter((verb) => favouriteVerbIDs.has(verb.id))
  if (filters.group === 'kana') list = list.filter((verb) => KWN_SISTERS_IDS.has(verb.id))
  if (filters.group === 'zanna') list = list.filter((verb) => ZNN_SISTERS_IDS.has(verb.id))
  return list
}
