import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { select } from '@inquirer/prompts'
import {
  type DimensionKey,
  type DimensionProfile,
  enforcePrerequisites,
  formPool,
  pronounPool,
  rootTypesPool,
  sanitizeDimensionProfile,
  tensePool,
} from '../src/exercises/dimensions.ts'
import type { ExerciseKind } from '../src/exercises/exercises.ts'
import {
  buildCardKey,
  getSrsRootType,
  type SrsRootType,
  type SrsStore,
  sanitizeRawSrsStore,
} from '../src/exercises/srs.ts'
import type { PronounId } from '../src/paradigms/pronouns.ts'
import type { VerbTense } from '../src/paradigms/tense.ts'
import { getAvailableParadigms, type VerbForm, verbs } from '../src/paradigms/verbs.ts'
import { utcToday } from '../src/primitives/dates.ts'

type CoverageDimension = 'kind' | 'rootType' | 'form' | 'tense' | 'pronoun' | 'nominal'
type NominalGroup = 'participles' | 'masdar'
type DueBucket = 'overdue' | 'today' | 'tomorrow' | 'next7' | 'next30' | 'next365' | 'future'

interface UniverseCard {
  key: string
  kind: ExerciseKind
  rootType: SrsRootType
  form: VerbForm
  tense: VerbTense | undefined
  pronoun: PronounId | undefined
  nominal: NominalGroup | undefined
}

interface DueDistributionRow {
  label: string
  count: number
  percent: number
}

interface CoverageRow {
  label: string
  covered: number
  uncovered: number
  total: number
  coveredPercent: number
  uncoveredPercent: number
}

interface DimensionUnlockRow {
  label: string
  unlockedLevels: string
  remainingPercent: number
  nextAnswered: string
  nextCorrect: string
}

interface LoadedDimensions {
  found: boolean
  profile: DimensionProfile
  windows: Record<DimensionKey, readonly boolean[]>
}

const EXERCISE_KINDS: readonly ExerciseKind[] = [
  'conjugation',
  'masdarForm',
  'masdarRoot',
  'masdarVerb',
  'participleForm',
  'rootFormVerb',
  'participleRoot',
  'participleVerb',
  'verbForm',
  'verbMasdar',
  'verbParticiple',
  'verbPronoun',
  'verbRoot',
  'verbTense',
]

const ROOT_TYPE_ORDER: readonly SrsRootType[] = ['sound', 'doubled', 'hamzated', 'assimilated', 'hollow', 'defective']
const FORM_ORDER: readonly VerbForm[] = formPool(9)
const TENSE_ORDER: readonly VerbTense[] = tensePool(4)
const PRONOUN_ORDER: readonly PronounId[] = [
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
const NOMINAL_ORDER: readonly NominalGroup[] = ['participles', 'masdar']
const INITIAL_DIMENSION_PROFILE: DimensionProfile = {
  tenses: 0,
  pronouns: 0,
  diacritics: 0,
  forms: 0,
  rootTypes: 0,
  nominals: 0,
}
const DIMENSION_LEVELS: Record<DimensionKey, number> = {
  tenses: 4,
  pronouns: 3,
  diacritics: 2,
  forms: 9,
  rootTypes: 5,
  nominals: 2,
}
const DIMENSION_LABELS: Record<DimensionKey, string> = {
  tenses: 'tenses',
  pronouns: 'pronouns',
  diacritics: 'diacritics',
  forms: 'forms',
  rootTypes: 'root types',
  nominals: 'nominals',
}
const DIMENSION_ORDER: readonly DimensionKey[] = ['tenses', 'pronouns', 'diacritics', 'forms', 'rootTypes', 'nominals']
const WINDOW_SIZES: Record<DimensionKey, number> = {
  tenses: 20,
  pronouns: 20,
  diacritics: 50,
  forms: 20,
  rootTypes: 20,
  nominals: 20,
}

const TENSE_EXERCISES = new Set<ExerciseKind>(['conjugation', 'verbForm', 'verbPronoun', 'verbRoot', 'verbTense'])
const PARTICIPLE_EXERCISES = new Set<ExerciseKind>([
  'participleForm',
  'participleRoot',
  'participleVerb',
  'verbParticiple',
])
const MASDAR_EXERCISES = new Set<ExerciseKind>(['masdarForm', 'masdarRoot', 'masdarVerb', 'verbMasdar'])

function utcAddDays(date: string, days: number): string {
  const next = new Date(`${date}T00:00:00.000Z`)
  next.setUTCDate(next.getUTCDate() + days)
  return next.toISOString().slice(0, 10)
}

function toPercent(part: number, total: number): number {
  if (total === 0) return 0
  return (part / total) * 100
}

function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`
}

function extractSrsPayload(raw: unknown): unknown {
  if (raw == null || typeof raw !== 'object') return raw

  const object = raw as Record<string, unknown>
  if ('srs' in object) return object.srs

  if ('conjugator:srs' in object) {
    const localStorageSrs = object['conjugator:srs']
    if (typeof localStorageSrs === 'string') {
      try {
        return JSON.parse(localStorageSrs)
      } catch {
        return {}
      }
    }
    return localStorageSrs
  }

  return raw
}

function extractDimensionsPayload(raw: unknown): unknown {
  if (raw == null || typeof raw !== 'object') return undefined

  const object = raw as Record<string, unknown>
  if ('dimensions' in object) return object.dimensions

  if ('conjugator:dimensions' in object) {
    const localStorageDimensions = object['conjugator:dimensions']
    if (typeof localStorageDimensions === 'string') {
      try {
        return JSON.parse(localStorageDimensions)
      } catch {
        return undefined
      }
    }
    return localStorageDimensions
  }

  return undefined
}

function loadDimensions(raw: unknown): LoadedDimensions {
  const emptyWindows: Record<DimensionKey, readonly boolean[]> = {
    tenses: [],
    pronouns: [],
    diacritics: [],
    forms: [],
    rootTypes: [],
    nominals: [],
  }
  const payload = extractDimensionsPayload(raw)
  if (payload == null || typeof payload !== 'object') {
    return { found: false, profile: INITIAL_DIMENSION_PROFILE, windows: emptyWindows }
  }

  const object = payload as Record<string, unknown>
  const rawProfile = 'profile' in object ? object.profile : object
  const rawWindows = 'windows' in object ? object.windows : undefined
  const windows = { ...emptyWindows }
  if (rawWindows != null && typeof rawWindows === 'object') {
    const windowRecord = rawWindows as Partial<Record<DimensionKey, unknown>>
    for (const dimension of DIMENSION_ORDER) {
      const value = windowRecord[dimension]
      if (Array.isArray(value) && value.every((entry) => typeof entry === 'boolean')) windows[dimension] = value
    }
  }

  return {
    found: true,
    profile: enforcePrerequisites(sanitizeDimensionProfile(rawProfile, INITIAL_DIMENSION_PROFILE)),
    windows,
  }
}

function dueBucket(today: string, dueDate: string): DueBucket {
  if (dueDate < today) return 'overdue'
  if (dueDate === today) return 'today'
  if (dueDate === utcAddDays(today, 1)) return 'tomorrow'
  if (dueDate <= utcAddDays(today, 7)) return 'next7'
  if (dueDate <= utcAddDays(today, 30)) return 'next30'
  if (dueDate <= utcAddDays(today, 365)) return 'next365'
  return 'future'
}

function dueDistribution(store: SrsStore, today: string): readonly DueDistributionRow[] {
  const bucketCounts: Record<DueBucket, number> = {
    overdue: 0,
    today: 0,
    tomorrow: 0,
    next7: 0,
    next30: 0,
    next365: 0,
    future: 0,
  }

  const entries = Object.values(store)
  for (const state of entries) bucketCounts[dueBucket(today, state.dueDate)] += 1

  const total = entries.length
  return [
    { label: 'overdue', count: bucketCounts.overdue, percent: toPercent(bucketCounts.overdue, total) },
    { label: 'today', count: bucketCounts.today, percent: toPercent(bucketCounts.today, total) },
    { label: 'tomorrow', count: bucketCounts.tomorrow, percent: toPercent(bucketCounts.tomorrow, total) },
    { label: 'next 7 days', count: bucketCounts.next7, percent: toPercent(bucketCounts.next7, total) },
    { label: 'next 30 days', count: bucketCounts.next30, percent: toPercent(bucketCounts.next30, total) },
    { label: 'next 365 days', count: bucketCounts.next365, percent: toPercent(bucketCounts.next365, total) },
    { label: 'future', count: bucketCounts.future, percent: toPercent(bucketCounts.future, total) },
  ]
}

function pronounSpace(
  tense: VerbTense,
  pronouns: readonly PronounId[],
  impersonalPassive: boolean,
): readonly PronounId[] {
  if (tense === 'active.imperative') {
    const imperative = pronouns.filter((pronoun) => pronoun.startsWith('2'))
    return imperative.length > 0 ? imperative : ['2ms']
  }
  if (impersonalPassive && tense.startsWith('passive')) return ['3ms']
  return pronouns
}

function nominalGroup(kind: ExerciseKind): NominalGroup | undefined {
  if (PARTICIPLE_EXERCISES.has(kind)) return 'participles'
  if (MASDAR_EXERCISES.has(kind)) return 'masdar'
  return undefined
}

function buildUniverse(): readonly UniverseCard[] {
  const allForms = new Set(formPool(9))
  const allRootTypes = new Set(rootTypesPool(5))
  const allTenses = tensePool(4)
  const allPronouns = pronounPool(3)
  const unique = new Map<string, UniverseCard>()

  for (const verb of verbs) {
    if (verb.root.length !== 3) continue
    if (!allForms.has(verb.form)) continue

    const rootType = getSrsRootType(verb.root)
    if (!allRootTypes.has(rootType)) continue

    const paradigms = new Set(getAvailableParadigms(verb))
    const availableTenses = allTenses.filter((tense) => paradigms.has(tense))

    for (const kind of EXERCISE_KINDS) {
      if (!TENSE_EXERCISES.has(kind)) {
        const key = buildCardKey(kind, rootType, verb.form)
        unique.set(key, {
          key,
          kind,
          rootType,
          form: verb.form,
          tense: undefined,
          pronoun: undefined,
          nominal: nominalGroup(kind),
        })
        continue
      }

      for (const tense of availableTenses) {
        for (const pronoun of pronounSpace(tense, allPronouns, verb.passiveVoice === 'impersonal')) {
          const key = buildCardKey(kind, rootType, verb.form, tense, pronoun)
          unique.set(key, {
            key,
            kind,
            rootType,
            form: verb.form,
            tense,
            pronoun,
            nominal: nominalGroup(kind),
          })
        }
      }
    }
  }

  return [...unique.values()]
}

function countCoverage(
  cards: readonly UniverseCard[],
  coveredKeys: ReadonlySet<string>,
  label: string,
  matches: (card: UniverseCard) => boolean,
): CoverageRow {
  const inGroup = cards.filter(matches)
  const total = inGroup.length
  const covered = inGroup.filter((card) => coveredKeys.has(card.key)).length
  const uncovered = total - covered

  return {
    label,
    covered,
    uncovered,
    total,
    coveredPercent: toPercent(covered, total),
    uncoveredPercent: toPercent(uncovered, total),
  }
}

function coverageRows(cards: readonly UniverseCard[], coveredKeys: ReadonlySet<string>, dimension: CoverageDimension) {
  if (dimension === 'kind')
    return EXERCISE_KINDS.map((kind) => countCoverage(cards, coveredKeys, kind, (card) => card.kind === kind))

  if (dimension === 'rootType')
    return ROOT_TYPE_ORDER.map((rootType) =>
      countCoverage(cards, coveredKeys, rootType, (card) => card.rootType === rootType),
    )

  if (dimension === 'form')
    return FORM_ORDER.map((form) => countCoverage(cards, coveredKeys, `form ${form}`, (card) => card.form === form))

  if (dimension === 'tense')
    return TENSE_ORDER.map((tense) =>
      countCoverage(cards, coveredKeys, tense, (card) => card.tense != null && card.tense === tense),
    )

  if (dimension === 'pronoun')
    return PRONOUN_ORDER.map((pronoun) =>
      countCoverage(cards, coveredKeys, pronoun, (card) => card.pronoun != null && card.pronoun === pronoun),
    )

  return NOMINAL_ORDER.map((nominal) =>
    countCoverage(cards, coveredKeys, nominal, (card) => card.nominal != null && card.nominal === nominal),
  )
}

function printTable(headers: readonly string[], rows: readonly (readonly string[])[]) {
  const widths = headers.map((header, index) => Math.max(header.length, ...rows.map((row) => row[index]?.length ?? 0)))
  const renderRow = (row: readonly string[]) => row.map((cell, index) => cell.padEnd(widths[index])).join('  ')

  console.log(renderRow(headers))
  console.log(widths.map((width) => '-'.repeat(width)).join('  '))
  for (const row of rows) console.log(renderRow(row))
}

function printDueDistribution(store: SrsStore) {
  const today = utcToday()
  const rows = dueDistribution(store, today)
  const total = Object.keys(store).length

  console.log(`\nDue date distribution (today = ${today}, total cards = ${total})`)
  printTable(
    ['bucket', 'count', 'percent'],
    rows.map((row) => [row.label, String(row.count), formatPercent(row.percent)]),
  )
  console.log()
}

function printCoverageDistribution(cards: readonly UniverseCard[], store: SrsStore, dimension: CoverageDimension) {
  const rows = coverageRows(cards, new Set(Object.keys(store)), dimension)

  const sectionLabel: Record<CoverageDimension, string> = {
    kind: 'exercise type',
    rootType: 'root type',
    form: 'form',
    tense: 'tense',
    pronoun: 'pronoun',
    nominal: 'nominal',
  }

  console.log(`\nCovered vs uncovered by ${sectionLabel[dimension]}`)
  printTable(
    ['group', 'covered', 'uncovered', 'total', 'covered %', 'uncovered %'],
    rows.map((row) => [
      row.label,
      String(row.covered),
      String(row.uncovered),
      String(row.total),
      formatPercent(row.coveredPercent),
      formatPercent(row.uncoveredPercent),
    ]),
  )
  console.log()
}

function printOverallCoverage(cards: readonly UniverseCard[], store: SrsStore) {
  const coveredKeys = new Set(Object.keys(store))
  const total = cards.length
  const covered = cards.filter((card) => coveredKeys.has(card.key)).length
  const uncovered = total - covered

  console.log('\nCovered vs uncovered (overall)')
  printTable(
    ['covered', 'uncovered', 'total', 'covered %', 'uncovered %'],
    [
      [
        String(covered),
        String(uncovered),
        String(total),
        formatPercent(toPercent(covered, total)),
        formatPercent(toPercent(uncovered, total)),
      ],
    ],
  )
  console.log()
}

function canPromote(profile: DimensionProfile, dimension: DimensionKey): boolean {
  if (['tenses', 'forms', 'rootTypes'].includes(dimension) && profile.pronouns < 1) return false
  if (dimension === 'tenses' && profile.tenses === 0 && profile.forms < 4) return false
  if (dimension === 'tenses' && profile.tenses >= 4 && profile.forms < DIMENSION_LEVELS.forms) return false
  return true
}

function nextUnlockProgress(dimensions: LoadedDimensions, dimension: DimensionKey): [string, string] {
  const level = dimensions.profile[dimension]
  const maxLevel = DIMENSION_LEVELS[dimension]
  const windowSize = WINDOW_SIZES[dimension]
  const window = dimensions.windows[dimension]
  const answers = Math.min(window.length, windowSize)
  const correct = window.filter(Boolean).length

  if (level >= maxLevel) return [`${windowSize}/${windowSize}`, `${windowSize}/${windowSize}`]
  if (!canPromote(dimensions.profile, dimension)) return [`${answers}/${windowSize}`, `${correct}/${windowSize}`]

  return [`${answers}/${windowSize}`, `${correct}/${windowSize}`]
}

function printDimensionUnlocks(dimensions: LoadedDimensions) {
  const rows: DimensionUnlockRow[] = DIMENSION_ORDER.map((dimension) => {
    const maxLevel = DIMENSION_LEVELS[dimension]
    const level = Math.min(dimensions.profile[dimension], maxLevel)
    const [nextAnswered, nextCorrect] = nextUnlockProgress(dimensions, dimension)
    return {
      label: DIMENSION_LABELS[dimension],
      unlockedLevels: `${level + 1}/${maxLevel + 1}`,
      remainingPercent: toPercent(maxLevel - level, maxLevel + 1),
      nextAnswered,
      nextCorrect,
    }
  })

  console.log('\nDimension unlock progress')
  if (!dimensions.found) console.log('No dimensions payload found; using baseline profile.\n')
  printTable(
    ['dimension', 'levels', 'remaining to full unlock', 'answered/total', 'correct/total'],
    rows.map((row) => [
      row.label,
      row.unlockedLevels,
      formatPercent(row.remainingPercent),
      row.nextAnswered,
      row.nextCorrect,
    ]),
  )
  console.log()
}

async function run() {
  const filePath = process.argv[2]
  if (filePath == null) {
    console.error('Usage: npm run srs -- <file>')
    process.exit(1)
  }

  let store: SrsStore
  let dimensions: LoadedDimensions
  try {
    const raw = JSON.parse(readFileSync(resolve(filePath), 'utf8')) as unknown
    store = sanitizeRawSrsStore(extractSrsPayload(raw))
    dimensions = loadDimensions(raw)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Failed to load SRS export: ${message}`)
    process.exit(1)
  }

  console.log(`Loaded SRS cards: ${Object.keys(store).length}`)

  const universe = buildUniverse()
  let lastMainAction: 'due' | 'coverage' | 'dimensions' | 'exit' = 'due'
  let lastCoverageDimension: CoverageDimension = 'kind'

  while (true) {
    const action: 'due' | 'coverage' | 'dimensions' | 'exit' = await select({
      message: 'SRS report menu:',
      choices: [
        { name: 'Card distribution by due date', value: 'due' },
        { name: 'Covered vs uncovered', value: 'coverage' },
        { name: 'Dimension unlock progress', value: 'dimensions' },
        { name: 'Exit', value: 'exit' },
      ],
      default: lastMainAction,
    })
    lastMainAction = action

    if (action === 'exit') return
    if (action === 'due') {
      printDueDistribution(store)
      continue
    }
    if (action === 'dimensions') {
      printDimensionUnlocks(dimensions)
      continue
    }

    while (true) {
      printOverallCoverage(universe, store)

      const dimension = (await select({
        message: 'Coverage submenu:',
        choices: [
          { name: 'By exercise type', value: 'kind' },
          { name: 'By root type', value: 'rootType' },
          { name: 'By form', value: 'form' },
          { name: 'By tense', value: 'tense' },
          { name: 'By pronoun', value: 'pronoun' },
          { name: 'By nominal', value: 'nominal' },
          { name: 'Back', value: 'back' },
        ],
        default: lastCoverageDimension,
      })) as CoverageDimension | 'back'

      if (dimension === 'back') break
      lastCoverageDimension = dimension
      printCoverageDistribution(universe, store, dimension)
    }
  }
}

await run()
