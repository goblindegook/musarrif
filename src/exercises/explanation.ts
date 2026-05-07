import type { ExplanationLayers } from '../paradigms/explanation'
import type { RootAnalysisType } from '../paradigms/roots'
import { utcToday } from '../primitives/dates'
import { isNominalExercise, isVerbExercise } from './mastery'
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
      cards.filter((card) => card.rootType === srsType),
      today,
    ),
    form: strongestDeduped(
      cards.filter((card) => card.form === explanation.form),
      today,
    ),
    tense:
      explanation.category === 'verb'
        ? strongestDeduped(
            cards.filter((card) => isVerbExercise(card.kind) && card.tense === explanation.tense),
            today,
          )
        : 0,
    pronoun:
      explanation.category === 'verb'
        ? strongestDeduped(
            cards.filter((card) => isVerbExercise(card.kind) && card.pronoun === explanation.pronoun),
            today,
          )
        : 0,
    nominal: strongestDeduped(
      cards.filter((card) => isNominalExercise(card.kind)),
      today,
    ),
  }
}

function on<T>(condition: boolean, value: T): T | undefined {
  return condition ? value : undefined
}

export function filterMasteredLayers<T extends ExplanationLayers>(
  srsStore: SrsStore,
  layers: T,
  threshold = 21,
  today = utcToday(),
): T {
  const mastery = computeLayerMastery(srsStore, layers, today)
  const showRootType = mastery.rootType < threshold
  const showForm = mastery.form < threshold

  if (layers.category === 'nominal') {
    const showNominal = mastery.nominal < threshold

    return {
      ...layers,
      rootType: on(showRootType, layers.rootType),
      form: on(showForm, layers.form),
      vowels: on(showForm, layers.vowels),
      formRoot: on(showForm || showRootType, layers.formRoot),
      nominal: on(showNominal, layers.nominal),
      isMasdarMimi: on(showNominal, layers.isMasdarMimi),
      masdarPattern: on(showNominal, layers.masdarPattern),
    }
  }

  const showTense = mastery.tense < threshold
  const showPronoun = mastery.pronoun < threshold

  return {
    ...layers,
    rootType: on(showRootType, layers.rootType),
    form: on(showForm, layers.form),
    vowels: on(showForm, layers.vowels),
    formRoot: on(showForm || showRootType, layers.formRoot),
    tense: on(showTense, layers.tense),
    tenseRoot: on(showTense || showRootType, layers.tenseRoot),
    pronoun: on(showPronoun, layers.pronoun),
    prefix: on(showPronoun, layers.prefix),
    suffix: on(showPronoun, layers.suffix),
  }
}
