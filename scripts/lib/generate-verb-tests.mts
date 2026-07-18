export type GenerationSource = 'existing' | 'wiktionary' | 'reverso' | 'elixirfm' | 'missing'
export type FallbackGenerationSource = Exclude<GenerationSource, 'existing' | 'missing'>

export interface VerbTestGenerationResult {
  slug: string
  source: GenerationSource
}

export interface VerbTestGenerator {
  source: FallbackGenerationSource
  generate: (slug: string) => boolean | Promise<boolean>
}

export interface GenerateVerbTestsOptions {
  slugs: readonly string[]
  reportDir: string
  hasExistingTest: (slug: string) => boolean | Promise<boolean>
  generators: readonly VerbTestGenerator[]
  writeReport: (path: string, content: string) => void | Promise<void>
  now?: () => Date
}

function formatTimestamp(date: Date): string {
  return date.toISOString().replaceAll(':', '-')
}

function escapeCsv(value: string): string {
  if (!/[",\n]/.test(value)) return value
  return `"${value.replaceAll('"', '""')}"`
}

export function renderVerbTestsReport(results: readonly VerbTestGenerationResult[]): string {
  const rows = results.map(({ slug, source }) => `${escapeCsv(slug)},${escapeCsv(source)}`)
  return ['slug,source', ...rows, ''].join('\n')
}

async function generateSource(
  slug: string,
  generators: readonly VerbTestGenerator[],
): Promise<FallbackGenerationSource | 'missing'> {
  for (const generator of generators) {
    if (await generator.generate(slug)) return generator.source
  }

  return 'missing'
}

export async function generateVerbTests({
  slugs,
  reportDir,
  hasExistingTest,
  generators,
  writeReport,
  now = () => new Date(),
}: GenerateVerbTestsOptions): Promise<{
  reportPath: string
  results: VerbTestGenerationResult[]
}> {
  const results: VerbTestGenerationResult[] = []

  for (const slug of slugs) {
    if (await hasExistingTest(slug)) {
      results.push({ slug, source: 'existing' })
      continue
    }

    results.push({
      slug,
      source: await generateSource(slug, generators),
    })
  }

  const reportPath = `${reportDir}/verb-test-generation-${formatTimestamp(now())}.csv`
  await writeReport(reportPath, renderVerbTestsReport(results))

  return { reportPath, results }
}
