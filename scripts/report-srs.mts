import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseDimensionStore } from '../src/exercises/dimensions.ts'
import {
  computeInsights,
  type InsightCandidate,
  type InsightCandidateType,
  type InsightData,
  type MasteryCategoryId,
  type Recommendation,
} from '../src/exercises/mastery.ts'
import type { SrsCard, SrsStore } from '../src/exercises/srs.ts'
import { getSrsCards, parseSrsStore, utcAddDays } from '../src/exercises/srs.ts'
import { isDual, isFemininePlural, isMasculinePlural } from '../src/paradigms/pronouns.ts'
import { utcToday } from '../src/primitives/dates.ts'
import { parseInteger, toRoman } from '../src/primitives/numbers.ts'
import { parseTrackedExercises } from '../src/ui/hooks/useStats.ts'
import en from '../src/ui/locales/en.strings.json' with { type: 'json' }

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npm run report:srs -- <path/to/user-data.musarrif>')
  process.exit(1)
}

const raw = JSON.parse(readFileSync(resolve(filePath), 'utf-8')) as Record<string, unknown>
const today = utcToday()
const exercises = parseTrackedExercises(raw.trackedExercises)
const srsStore: SrsStore = parseSrsStore(raw.srs)
const cards = getSrsCards(srsStore)

const insights = computeInsights(
  parseDimensionStore(raw.dimensions).profile,
  srsStore,
  exercises.map((d) => {
    const [y, m, day] = d.date.split('-').map(Number)
    return { ...d, date: new Date(y, m - 1, day) }
  }),
)

// --- Exercise stats ---

const totalCorrect = exercises.reduce((s, e) => s + e.correct, 0)
const totalIncorrect = exercises.reduce((s, e) => s + e.incorrect, 0)

const monthMap = new Map<string, { correct: number; incorrect: number; days: number }>()
for (const ex of exercises) {
  const ym = ex.date.slice(0, 7)
  const cur = monthMap.get(ym) ?? { correct: 0, incorrect: 0, days: 0 }
  monthMap.set(ym, { correct: cur.correct + ex.correct, incorrect: cur.incorrect + ex.incorrect, days: cur.days + 1 })
}
const months = [...monthMap.entries()].sort(([a], [b]) => a.localeCompare(b))

// --- SRS stats ---

const overdueCards = cards.filter((c) => c.dueDate <= today)

const daysBefore = (n: number) => new Date(new Date(today).getTime() - n * 86400000).toISOString().slice(0, 10)
const ago2w = daysBefore(14)
const ago1w = daysBefore(7)

function countByEf(cs: readonly SrsCard[]): Record<string, number> {
  const out: Record<string, number> = { '2.5': 0, '1.96': 0, '1.42': 0, '1.3': 0 }
  for (const c of cs) {
    const k = String(c.ef)
    if (k in out) out[k]++
  }
  return out
}
const allEfBuckets = countByEf(cards)
const overdueEfBuckets = countByEf(overdueCards)

type DueBucket = 'overdue' | 'today' | 'tomorrow' | 'next7' | 'next30' | 'next365' | 'future'

function dueBucket(today: string, dueDate: string): DueBucket {
  if (dueDate < today) return 'overdue'
  if (dueDate === today) return 'today'
  if (dueDate === utcAddDays(today, 1)) return 'tomorrow'
  if (dueDate <= utcAddDays(today, 7)) return 'next7'
  if (dueDate <= utcAddDays(today, 30)) return 'next30'
  if (dueDate <= utcAddDays(today, 365)) return 'next365'
  return 'future'
}

const dueBucketCounts: Record<DueBucket, number> = {
  overdue: 0,
  today: 0,
  tomorrow: 0,
  next7: 0,
  next30: 0,
  next365: 0,
  future: 0,
}
for (const card of cards) dueBucketCounts[dueBucket(today, card.dueDate)] += 1

const sortedOverdue = [...overdueCards].sort((a, b) => a.dueDate.localeCompare(b.dueDate))
const oldestDaysAgo = sortedOverdue[0] ? daysDiff(sortedOverdue[0].dueDate, today) : 0
const oldestDate = sortedOverdue[0]?.dueDate ?? '-'

// --- Card health by dimension ---

type HealthBucket = 'solid' | 'learning' | 'shaky' | 'struggling'

function strugglePct(efs: number[]): number {
  return (efs.filter((e) => e <= 1.3).length / efs.length) * 100
}

function efToBucket(efs: number[]): HealthBucket {
  const pct = strugglePct(efs)
  if (pct <= 10) return 'solid'
  if (pct <= 18) return 'learning'
  if (pct <= 24) return 'shaky'
  return 'struggling'
}

const dimGroups: Record<string, number[]> = {}
function pushDim(label: string, ef: number) {
  if (dimGroups[label] == null) dimGroups[label] = []
  dimGroups[label].push(ef)
}

for (const card of cards) {
  const { rootType, form, tense, pronoun, ef } = card

  pushDim(`${rootType} roots`, ef)
  pushDim(`form ${toRoman(form)}`, ef)

  if (tense != null) {
    pushDim(tense.startsWith('passive') ? 'passive voice' : 'active voice', ef)

    if (tense.includes('jussive')) pushDim('jussive', ef)
    else if (tense.includes('subjunctive')) pushDim('subjunctive', ef)
    else if (tense.includes('indicative')) pushDim('indicative', ef)
    else if (tense.includes('past')) pushDim('past tense', ef)
    else if (tense.includes('imperative')) pushDim('imperative', ef)
  }

  if (pronoun != null) {
    if (isDual(pronoun)) pushDim('dual', ef)
    else if (isFemininePlural(pronoun)) pushDim('fem. plural', ef)
    else if (isMasculinePlural(pronoun)) pushDim('masc. plural', ef)
    else pushDim('singular', ef)
  }
}

interface DimEntry {
  label: string
  struggle: number
  count: number
  bucket: HealthBucket
}
const dimEntries: DimEntry[] = Object.entries(dimGroups).map(([label, efs]) => ({
  label,
  struggle: strugglePct(efs),
  count: efs.length,
  bucket: efToBucket(efs),
}))

const byBucket: Record<HealthBucket, DimEntry[]> = {
  solid: dimEntries.filter((d) => d.bucket === 'solid').sort((a, b) => a.struggle - b.struggle),
  learning: dimEntries.filter((d) => d.bucket === 'learning').sort((a, b) => a.struggle - b.struggle),
  shaky: dimEntries.filter((d) => d.bucket === 'shaky').sort((a, b) => a.struggle - b.struggle),
  struggling: dimEntries.filter((d) => d.bucket === 'struggling').sort((a, b) => b.struggle - a.struggle),
}

// --- Helpers ---

function daysDiff(a: string, b: string): number {
  return Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)
}

function acc(correct: number, incorrect: number): string {
  const total = correct + incorrect
  return total === 0 ? '—' : `${((correct / total) * 100).toFixed(1)}%`
}

function fmtMonth(ym: string): string {
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${names[parseInt(ym.slice(5, 7), 10) - 1]} ${ym.slice(0, 4)}`
}

function accColor(pct: number): string {
  if (pct >= 80) return 'var(--green)'
  if (pct >= 70) return 'var(--amber)'
  return 'var(--red)'
}

function barRow(label: string, count: number, total: number, bg: string): string {
  const w = total > 0 ? Math.round((count / total) * 100) : 0
  const textCol = bg === 'var(--amber)' ? 'var(--bg)' : '#fff'
  return `<div class="bar-row">
      <span class="bar-label">${label}</span>
      <div class="bar-track">
        <div class="bar-fill" style="width:${w}%;background:${bg};color:${textCol}">${w > 12 ? count : ''}</div>
      </div>
      <span class="bar-count">${count}</span>
    </div>`
}

const kindLabels: Record<string, string> = {
  conjugation: 'conjugate',
  verbRoot: 'identify root',
  verbForm: 'identify form',
  verbTense: 'identify tense',
  verbPronoun: 'identify pronoun',
  rootFormVerb: 'root→form→verb',
  participleRoot: 'participle→root',
  participleVerb: 'participle→verb',
  participleForm: 'participle→form',
  verbParticiple: 'verb→participle',
  masdarRoot: 'masdar→root',
  masdarVerb: 'masdar→verb',
  masdarForm: 'masdar→form',
  verbMasdar: 'verb→masdar',
}

function describeCard(card: SrsCard): string {
  const { kind, rootType, form, tense, pronoun } = card
  const tenseStr = tense ? tense.replace(/\./g, ' ') : ''
  const pronounStr = pronoun ?? ''
  return [kindLabels[kind] ?? kind, rootType, toRoman(form), tenseStr, pronounStr].filter(Boolean).join(' · ')
}

// --- Insights text (mirrors LearningInsights.tsx) ---

function t(key: string, params?: Record<string, string>): string {
  let str = (en as Record<string, string>)[key] ?? key
  if (params) for (const [k, v] of Object.entries(params)) str = str.replaceAll(`{${k}}`, v)
  return str
}

const TYPE_ORDER: readonly InsightCandidateType[] = ['rootType', 'tense', 'form', 'pronounClass']

function candidateKey(c: Pick<InsightCandidate, 'type' | 'value'>): string {
  switch (c.type) {
    case 'rootType':
      return `exercise.unlock.rootType.${c.value}`
    case 'tense':
      return `exercise.conjugation.tense.${c.value}`
    case 'form':
      return `exercise.unlock.form.${c.value}`
    case 'pronounClass':
      return `exercise.insights.pronounClass.${c.value}`
  }
}

function sortPair(a: InsightCandidate, b: InsightCandidate): [InsightCandidate, InsightCandidate] {
  return TYPE_ORDER.indexOf(a.type) <= TYPE_ORDER.indexOf(b.type) ? [a, b] : [b, a]
}

function resolveNextLabel(dim: MasteryCategoryId, value: string): string {
  switch (dim) {
    case 'rootTypes':
      return t(`exercise.stats.mastery.rootType.${value}`)
    case 'tenses':
      return t(`tense.${value}`)
    case 'forms':
      return toRoman(parseInteger(value, 0))
    case 'pronouns':
      return t(`pronoun.${value}`)
    case 'nominals':
      return t(`exercise.stats.mastery.nominal.${value}`)
  }
}

function sectionText(
  candidates: InsightData['strengths'],
  section: 'strengths' | 'challenge',
  noneKey: string,
): string {
  if (candidates.length === 0) return t(noneKey)
  if (candidates.length === 1) {
    const [a] = candidates
    return t(`exercise.insights.${section}.single.${a.type}`, { value: t(candidateKey(a)) })
  }
  const [first, second] = sortPair(candidates[0], candidates[1])
  return t(`exercise.insights.${section}.pair.${first.type}.${second.type}`, {
    value1: t(candidateKey(first)),
    value2: t(candidateKey(second)),
  })
}

function backlogText(ins: InsightData['backlog']): string | null {
  if (ins.state === 'none') return null
  if (ins.eta == null) return t(`exercise.insights.backlog.${ins.state}.noEta`)
  return t(`exercise.insights.backlog.${ins.state}`, { eta: t(`exercise.insights.backlog.eta.${ins.eta}`) })
}

function recommendationText(r: Recommendation): string {
  if (r.kind === 'habit') return t(`exercise.insights.recommendation.habit.${r.action}`)
  return r.action === 'focusCandidate'
    ? t('exercise.insights.recommendation.focus.focusCandidate', { value: t(candidateKey(r.candidate)) })
    : t('exercise.insights.recommendation.focus.keepUnlocking')
}

function buildInsightRows(): Array<{ label: string; text: string }> {
  const journeyText =
    insights.journey.days === 0
      ? t('exercise.insights.journey.new')
      : t('exercise.insights.journey', {
          days: String(insights.journey.days),
          answers: String(insights.journey.answers),
          accuracy: String(insights.journey.accuracy),
        })
  const journeyLine =
    insights.journey.days > 0
      ? `${journeyText} ${t(`exercise.insights.journey.trend.${insights.journey.trend}`)}`
      : journeyText

  const stageLine = (() => {
    const base = t('exercise.insights.stage', {
      unlocked: String(insights.stage.unlockedRootTypes),
      total: String(insights.stage.totalRootTypes),
    })
    const next =
      insights.stage.nextDimension != null && insights.stage.nextValue != null
        ? t(`exercise.insights.stage.next.${insights.stage.nextDimension}`, {
            value: resolveNextLabel(insights.stage.nextDimension, insights.stage.nextValue),
          })
        : t('exercise.insights.stage.next.complete')
    return insights.stage.nextDimension == null ? next : `${base} ${next}`
  })()

  const challengeText =
    insights.stuck.topDimensions.length > 0
      ? insights.stuck.topDimensions.length === 1
        ? t('exercise.insights.difficult.single', { value: t(candidateKey(insights.stuck.topDimensions[0])) })
        : t('exercise.insights.difficult.pair', {
            value1: t(candidateKey(insights.stuck.topDimensions[0])),
            value2: t(candidateKey(insights.stuck.topDimensions[1])),
          })
      : sectionText(insights.challenge, 'challenge', 'exercise.insights.challenge.none')

  const rows: Array<{ label: string; text: string }> = [
    { label: t('exercise.insights.heading.journey'), text: journeyLine },
    { label: t('exercise.insights.heading.momentum'), text: t(`exercise.insights.momentum.${insights.volume.trend}`) },
    {
      label: t('exercise.insights.heading.strengths'),
      text: sectionText(insights.strengths, 'strengths', 'exercise.insights.strengths.none'),
    },
    { label: t('exercise.insights.heading.challenge'), text: challengeText },
    { label: t('exercise.insights.heading.stage'), text: stageLine },
    {
      label: t('exercise.insights.heading.recommendation'),
      text: insights.recommendation.map(recommendationText).join(' '),
    },
  ]

  const bl = backlogText(insights.backlog)
  if (bl != null) rows.splice(2, 0, { label: t('exercise.insights.heading.backlog'), text: bl })

  return rows
}

// --- HTML ---

const latestMonth = months[months.length - 1]
const latestAcc = latestMonth
  ? ((latestMonth[1].correct / (latestMonth[1].correct + latestMonth[1].incorrect)) * 100).toFixed(1)
  : '—'

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>SRS Report — ${today}</title>
<style>
:root {
  --bg: #fff; --bg2: #f5f4f0; --text: #111; --muted: #666; --hint: #aaa;
  --border: rgba(0,0,0,0.09);
  --green: #1D9E75; --red: #E24B4A; --amber: #BA7517; --blue: #378ADD;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a; --bg2: #252525; --text: #e2e2e2; --muted: #888; --hint: #555;
    --border: rgba(255,255,255,0.08);
  }
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); font-size: 14px; line-height: 1.6; }
.page { max-width: 900px; margin: 0 auto; padding: 2rem 1.5rem 4rem; }
h1 { font-size: 20px; font-weight: 500; }
.subtitle { color: var(--muted); font-size: 13px; margin-bottom: 2.5rem; }
h2 { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); margin: 2.5rem 0 .75rem; border-bottom: 0.5px solid var(--border); padding-bottom: .4rem; }
.metric-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.metric-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.metric { background: var(--bg2); border-radius: 8px; padding: 12px 14px; }
.metric-label { font-size: 11px; color: var(--muted); margin-bottom: 3px; }
.metric-value { font-size: 22px; font-weight: 500; }
.metric-sub { font-size: 11px; color: var(--hint); margin-top: 2px; }
.month-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
.month-card { background: var(--bg2); border-radius: 8px; padding: 12px 14px; border-left: 3px solid transparent; }
.month-name { font-size: 11px; color: var(--muted); margin-bottom: 3px; }
.month-acc { font-size: 18px; font-weight: 500; margin-bottom: 2px; }
.month-detail { font-size: 11px; color: var(--hint); }
.chart-wrap { width: 100%; }
canvas { display: block; }
.legend { display: flex; gap: 16px; font-size: 11px; color: var(--muted); margin-bottom: 8px; }
.legend span { display: flex; align-items: center; gap: 5px; }
.swatch { width: 10px; height: 10px; border-radius: 2px; }
.bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 7px; font-size: 12px; }
.bar-label { width: 170px; color: var(--muted); text-align: right; flex-shrink: 0; }
.bar-track { flex: 1; height: 20px; background: var(--bg2); border-radius: 3px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 3px; display: flex; align-items: center; padding-left: 7px; font-size: 11px; font-weight: 500; }
.bar-count { width: 34px; font-weight: 500; text-align: right; }
.health-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.health-header { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 8px; }
.health-tags { display: flex; flex-direction: column; gap: 5px; }
.health-tag { font-size: 11px; padding: 3px 8px; border-radius: 3px; cursor: default; }
.health-tag-solid      { background: #EAF3DE; color: #27500A; }
.health-tag-learning   { background: #E6F1FB; color: #0C447C; }
.health-tag-shaky      { background: #FAEEDA; color: #633806; }
.health-tag-struggling { background: #FCEBEB; color: #791F1F; }
@media (prefers-color-scheme: dark) {
  .health-tag-solid      { background: #173404; color: #C0DD97; }
  .health-tag-learning   { background: #042C53; color: #B5D4F4; }
  .health-tag-shaky      { background: #412402; color: #FAC775; }
  .health-tag-struggling { background: #3d1515; color: #F09595; }
}
table { width: 100%; border-collapse: collapse; font-size: 12px; }
thead th { text-align: left; padding: 6px 10px; font-weight: 500; color: var(--muted); border-bottom: 1px solid var(--border); font-size: 11px; }
tbody td { padding: 7px 10px; border-bottom: 0.5px solid var(--border); vertical-align: middle; }
tbody tr:last-child td { border-bottom: none; }
.mono { font-family: ui-monospace, monospace; font-size: 11px; }
.badge { display: inline-block; font-size: 10px; padding: 1px 6px; border-radius: 3px; font-weight: 500; }
.badge-red { background: #FCEBEB; color: #A32D2D; }
@media (prefers-color-scheme: dark) { .badge-red { background: #3d1515; color: #F09595; } }
.insight-rows { display: flex; flex-direction: column; gap: 10px; }
.insight-row { font-size: 13px; line-height: 1.6; }
.insight-label { font-weight: 500; color: var(--text); }
.insight-text { color: var(--muted); }
</style>
</head>
<body>
<div class="page">

<h1>SRS Learning Report</h1>
<p class="subtitle">Generated ${today} &nbsp;·&nbsp; ${exercises.length} practice days &nbsp;·&nbsp; ${cards.length} active SRS cards</p>

<h2>Summary</h2>
<div class="metric-grid">
  <div class="metric">
    <div class="metric-label">Practice days</div>
    <div class="metric-value" style="color:var(--blue)">${exercises.length}</div>
    <div class="metric-sub">${exercises[0].date} → ${exercises[exercises.length - 1].date}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Total correct</div>
    <div class="metric-value" style="color:var(--green)">${totalCorrect.toLocaleString()}</div>
    <div class="metric-sub">of ${(totalCorrect + totalIncorrect).toLocaleString()} answered</div>
  </div>
  <div class="metric">
    <div class="metric-label">Overall accuracy</div>
    <div class="metric-value">${acc(totalCorrect, totalIncorrect)}</div>
    <div class="metric-sub">latest month ${latestAcc}%</div>
  </div>
  <div class="metric">
    <div class="metric-label">SRS cards</div>
    <div class="metric-value" style="color:var(--amber)">${cards.length}</div>
    <div class="metric-sub">${overdueCards.length} overdue (${Math.round((overdueCards.length / cards.length) * 100)}%)</div>
  </div>
</div>

<h2>Learning insights</h2>
<div class="insight-rows">
  ${buildInsightRows()
    .map(
      ({ label, text }) =>
        `<div class="insight-row"><span class="insight-label">${label}:</span> <span class="insight-text">${text}</span></div>`,
    )
    .join('\n  ')}
</div>

<h2>Monthly breakdown</h2>
<div class="month-grid">
  ${months
    .map(([ym, m]) => {
      const pct = (m.correct / (m.correct + m.incorrect)) * 100
      const col = accColor(pct)
      return `<div class="month-card" style="border-left-color:${col}">
    <div class="month-name">${fmtMonth(ym)} &nbsp;·&nbsp; ${m.days}d</div>
    <div class="month-acc" style="color:${col}">${pct.toFixed(1)}%</div>
    <div class="month-detail">${m.correct} correct · ${m.incorrect} wrong</div>
  </div>`
    })
    .join('\n  ')}
</div>

<h2>Daily practice</h2>
<div class="legend">
  <span><span class="swatch" style="background:var(--green)"></span>Correct</span>
  <span><span class="swatch" style="background:var(--red)"></span>Incorrect</span>
  <span><span class="swatch" style="background:var(--amber);height:3px;border-radius:2px"></span>7-day accuracy</span>
</div>
<div class="chart-wrap"><canvas id="chart"></canvas></div>

<h2>SRS card health — all ${cards.length} cards</h2>
${barRow('ef 2.5 — solid', allEfBuckets['2.5'], cards.length, 'var(--green)')}
${barRow('ef 1.96 — learning', allEfBuckets['1.96'], cards.length, 'var(--blue)')}
${barRow('ef 1.42 — shaky', allEfBuckets['1.42'], cards.length, 'var(--amber)')}
${barRow('ef 1.3 — struggling', allEfBuckets['1.3'], cards.length, 'var(--red)')}

<h2>Card health by pattern</h2>
<div class="health-grid">
  ${(['solid', 'learning', 'shaky', 'struggling'] as HealthBucket[])
    .map((bucket) => {
      const entries = byBucket[bucket]
      if (entries.length === 0) return ''
      const headerColor = {
        solid: 'var(--green)',
        learning: 'var(--blue)',
        shaky: 'var(--amber)',
        struggling: 'var(--red)',
      }[bucket]
      return `<div>
    <div class="health-header" style="color:${headerColor}">${bucket}</div>
    <div class="health-tags">
      ${entries.map((e) => `<span class="health-tag health-tag-${bucket}" title="${e.struggle.toFixed(0)}% struggling, ${e.count} cards">${e.label}</span>`).join('\n      ')}
    </div>
  </div>`
    })
    .join('\n  ')}
</div>

<h2>Due date distribution — all ${cards.length} cards</h2>
${barRow('overdue', dueBucketCounts.overdue, cards.length, 'var(--red)')}
${barRow('today', dueBucketCounts.today, cards.length, 'var(--amber)')}
${barRow('tomorrow', dueBucketCounts.tomorrow, cards.length, 'var(--blue)')}
${barRow('next 7 days', dueBucketCounts.next7, cards.length, 'var(--blue)')}
${barRow('next 30 days', dueBucketCounts.next30, cards.length, 'var(--green)')}
${barRow('next 365 days', dueBucketCounts.next365, cards.length, 'var(--green)')}
${barRow('future (1y+)', dueBucketCounts.future, cards.length, 'var(--muted)')}

<h2>Overdue backlog</h2>
<div class="metric-grid-3">
  <div class="metric">
    <div class="metric-label">Total overdue</div>
    <div class="metric-value" style="color:var(--red)">${overdueCards.length}</div>
    <div class="metric-sub">of ${cards.length} cards (${Math.round((overdueCards.length / cards.length) * 100)}%)</div>
  </div>
  <div class="metric">
    <div class="metric-label">Oldest overdue</div>
    <div class="metric-value" style="color:var(--red)">${oldestDaysAgo}d</div>
    <div class="metric-sub">${oldestDate}</div>
  </div>
  <div class="metric">
    <div class="metric-label">Est. sessions to clear</div>
    <div class="metric-value" style="color:var(--amber)">${Math.ceil(overdueCards.length / 20)}</div>
    <div class="metric-sub">at ~20 exercises/day</div>
  </div>
</div>

<h2>By age</h2>
${barRow('older than 2 weeks', overdueCards.filter((c) => c.dueDate < ago2w).length, overdueCards.length, 'var(--red)')}
${barRow('1–2 weeks old', overdueCards.filter((c) => c.dueDate >= ago2w && c.dueDate < ago1w).length, overdueCards.length, 'var(--amber)')}
${barRow('within 1 week', overdueCards.filter((c) => c.dueDate >= ago1w).length, overdueCards.length, 'var(--green)')}

<h2>By card health (overdue only)</h2>
${barRow('ef 2.5 — solid', overdueEfBuckets['2.5'], overdueCards.length, 'var(--green)')}
${barRow('ef 1.96 — learning', overdueEfBuckets['1.96'], overdueCards.length, 'var(--blue)')}
${barRow('ef 1.42 — shaky', overdueEfBuckets['1.42'], overdueCards.length, 'var(--amber)')}
${barRow('ef 1.3 — struggling', overdueEfBuckets['1.3'], overdueCards.length, 'var(--red)')}

<h2>Priority: struggling cards overdue (ef ≤ 1.3)</h2>
<table>
  <thead><tr>
    <th>Card</th>
    <th>Due date</th>
    <th>Days overdue</th>
    <th>Reps</th>
    <th>ef</th>
  </tr></thead>
  <tbody>
    ${overdueCards
      .filter((c) => c.ef <= 1.3)
      .toSorted((a, b) => a.dueDate.localeCompare(b.dueDate))
      .slice(0, 20)
      .map(
        (c) => `<tr>
      <td style="color:var(--muted)">${describeCard(c)}</td>
      <td>${c.dueDate}</td>
      <td><span class="badge badge-red">${daysDiff(c.dueDate, today)}d ago</span></td>
      <td>${c.repetitions}</td>
      <td>${c.ef}</td>
    </tr>`,
      )
      .join('\n    ')}
  </tbody>
</table>

</div>

<script type="application/json" id="d">${JSON.stringify(exercises)}</script>
<script>
(function () {
  const days = JSON.parse(document.getElementById('d').textContent)
  const canvas = document.getElementById('chart')
  const ctx = canvas.getContext('2d')
  const dark = matchMedia('(prefers-color-scheme: dark)').matches
  const textCol = dark ? 'rgba(255,255,255,.45)' : 'rgba(0,0,0,.4)'
  const gridCol = dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.05)'

  const rolling = days.map(function (_, i) {
    const w = days.slice(Math.max(0, i - 6), i + 1)
    const c = w.reduce(function (a, b) { return a + b.correct }, 0)
    const t = w.reduce(function (a, b) { return a + b.correct + b.incorrect }, 0)
    return t > 0 ? c / t : 0
  })

  function draw() {
    const W = canvas.parentElement.clientWidth
    const H = 220
    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    canvas.style.width = W + 'px'
    canvas.style.height = H + 'px'
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, W, H)

    const pL = 44, pR = 44, pT = 8, pB = 30
    const cW = W - pL - pR
    const cH = H - pT - pB
    const n = days.length
    const slot = cW / n
    const barW = Math.max(1, slot * 0.75)
    const maxTotal = Math.max.apply(null, days.map(function (d) { return d.correct + d.incorrect }))
    const accMin = 0.5

    function xOf(i) { return pL + i * slot + (slot - barW) / 2 }
    function yCount(v) { return pT + cH - (v / maxTotal) * cH }
    function yAcc(v) { return pT + cH - ((v - accMin) / (1 - accMin)) * cH }

    var step = Math.pow(10, Math.floor(Math.log10(maxTotal)))
    if (maxTotal / step < 3) step /= 2
    ctx.font = '10px system-ui'
    ctx.textAlign = 'right'
    for (var v = 0; v <= maxTotal; v += step) {
      var y = Math.round(yCount(v)) + .5
      ctx.strokeStyle = gridCol; ctx.lineWidth = .5
      ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke()
      ctx.fillStyle = textCol
      ctx.fillText(String(v), pL - 4, y + 3)
    }

    ctx.textAlign = 'left'
    ;[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].forEach(function (p) {
      var y = Math.round(yAcc(p)) + .5
      ctx.strokeStyle = gridCol; ctx.lineWidth = .5
      ctx.beginPath(); ctx.moveTo(pL, y); ctx.lineTo(W - pR, y); ctx.stroke()
      ctx.fillStyle = 'rgba(186,117,23,.65)'
      ctx.fillText(Math.round(p * 100) + '%', W - pR + 4, y + 3)
    })

    days.forEach(function (d, i) {
      var x = xOf(i)
      var total = d.correct + d.incorrect
      if (total === 0) return
      var tH = (total / maxTotal) * cH
      var cH2 = (d.correct / total) * tH
      ctx.fillStyle = '#E24B4A'
      ctx.fillRect(x, pT + cH - tH, barW, tH - cH2)
      ctx.fillStyle = '#1D9E75'
      ctx.fillRect(x, pT + cH - cH2, barW, cH2)
    })

    ctx.beginPath()
    ctx.strokeStyle = '#BA7517'; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'
    rolling.forEach(function (a, i) {
      var x = xOf(i) + barW / 2
      var y = yAcc(Math.max(accMin, a))
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.stroke()

    ctx.fillStyle = textCol; ctx.textAlign = 'center'
    var lastMonth = ''
    var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    days.forEach(function (d, i) {
      var m = d.date.slice(0, 7)
      if (m !== lastMonth) {
        lastMonth = m
        ctx.fillText(monthNames[parseInt(d.date.slice(5, 7)) - 1], xOf(i) + barW / 2, H - pB + 14)
      }
    })
  }

  draw()
  var timer
  window.addEventListener('resize', function () { clearTimeout(timer); timer = setTimeout(draw, 80) })
})()
</script>
</body>
</html>`

mkdirSync(resolve('reports'), { recursive: true })
const outPath = resolve(`reports/srs-${today}.html`)
writeFileSync(outPath, html, 'utf-8')
console.log(`Report written → ${outPath}`)
