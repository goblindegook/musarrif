import type { ExplanationLayers } from '../paradigms/explanation'
import type { RootAnalysisType } from '../paradigms/roots'
import {
  FORM_SCORE_KINDS,
  MASDAR_KINDS,
  PARTICIPLE_KINDS,
  PRONOUN_SCORE_KINDS,
  ROOT_TYPE_SCORE_KINDS,
  TENSE_SCORE_KINDS,
} from './mastery'
import { getSrsCards, type SrsCard, type SrsRootType, type SrsStore } from './srs'

interface LayerMastery {
  rootType: number
  form: number
  tense: number
  pronoun: number
  nominal: number
}

// Priority mirrors getSrsRootType: defective > hollow > assimilated > hamzated > doubled > sound
function toSrsRootType(rootType?: RootAnalysisType): SrsRootType | undefined {
  if (!rootType) return undefined
  if (rootType.includes('defective') || rootType.startsWith('doubly-weak')) return 'defective'
  if (rootType.includes('hollow')) return 'hollow'
  if (rootType === 'assimilated') return 'assimilated'
  if (rootType.includes('hamzated')) return 'hamzated'
  if (rootType === 'doubled') return 'doubled'
  return 'sound'
}

function utcToday(): string {
  return new Date().toISOString().slice(0, 10)
}

function strongestDeduped(cards: SrsCard[], today: string): number {
  const grouped = new Map<string, number>()
  for (const card of cards) {
    if (card.dueDate <= today) continue
    const current = grouped.get(card.key)
    if (current == null || card.interval > current) grouped.set(card.key, card.interval)
  }
  return Math.max(0, ...grouped.values())
}

function computeLayerMastery(srsStore: SrsStore, explanation: ExplanationLayers, today: string): LayerMastery {
  const cards = getSrsCards(srsStore)
  const srsType = toSrsRootType(explanation.rootType)

  return {
    rootType: strongestDeduped(
      cards.filter((card) => ROOT_TYPE_SCORE_KINDS.has(card.kind) && card.rootType === srsType),
      today,
    ),
    form: strongestDeduped(
      cards.filter((card) => FORM_SCORE_KINDS.has(card.kind) && card.form === explanation.form),
      today,
    ),
    tense: strongestDeduped(
      cards.filter((card) => TENSE_SCORE_KINDS.has(card.kind) && card.tense === explanation.tense),
      today,
    ),
    pronoun: strongestDeduped(
      cards.filter((card) => PRONOUN_SCORE_KINDS.has(card.kind) && card.pronoun === explanation.pronoun),
      today,
    ),
    nominal: strongestDeduped(
      cards.filter((card) =>
        explanation.nominal === 'masdar' ? MASDAR_KINDS.has(card.kind) : PARTICIPLE_KINDS.has(card.kind),
      ),
      today,
    ),
  }
}

function on<T>(condition: boolean, value: T): T | undefined {
  return condition ? value : undefined
}

export function filterMasteredLayers(
  srsStore: SrsStore,
  layers: ExplanationLayers,
  threshold = 21,
  today = utcToday(),
): ExplanationLayers {
  const mastery = computeLayerMastery(srsStore, layers, today)
  const showRootType = mastery.rootType < threshold
  const showForm = mastery.form < threshold
  const showNominal = mastery.nominal < threshold
  const showTense = mastery.tense < threshold
  const showPronoun = mastery.pronoun < threshold

  return {
    ...layers,
    rootType: on(showRootType, layers.rootType),
    form: on(showForm, layers.form),
    vowels: on(showForm, layers.vowels),
    formRoot: on(showForm || showRootType, layers.formRoot),
    nominal: on(showNominal, layers.nominal),
    tense: on(showTense, layers.tense),
    tenseRoot: on(showTense || showRootType, layers.tenseRoot),
    pronoun: on(showPronoun, layers.pronoun),
    prefix: on(showPronoun, layers.prefix),
    suffix: on(showPronoun, layers.suffix),
  }
}
