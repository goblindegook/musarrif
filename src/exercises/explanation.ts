import type { ExplanationLayers } from '../paradigms/explanation'
import { utcToday } from '../primitives/dates'
import { getSrsCards, isNominalCard, isVerbCard, type SrsCard, type SrsRootType, type SrsStore } from './srs'

interface LayerMastery {
  rootType: number
  form: number
  tense: number
  pronoun: number
  nominal: number
}

// Priority mirrors getSrsRootType: the last radical decides before the middle one, and a hamza
// before a doubled pair, so a root carrying several shapes lands on the same card either way.
const SRS_ROOT_TYPES: readonly SrsRootType[] = ['defective', 'hollow', 'assimilated', 'hamzated', 'doubled', 'sound']

function strongestInterval(cards: SrsCard[], today: string): number {
  return Math.max(0, ...cards.filter((card) => card.dueDate > today).map((card) => card.interval))
}

function computeLayerMastery(srsStore: SrsStore, explanation: ExplanationLayers, today: string): LayerMastery {
  const cards = getSrsCards(srsStore)
  const { rootType } = explanation
  const srsType = rootType && SRS_ROOT_TYPES.find((shape) => rootType.includes(shape))

  return {
    rootType: strongestInterval(
      cards.filter((card) => card.rootType === srsType),
      today,
    ),
    form: strongestInterval(
      cards.filter((card) => card.form === explanation.paradigmForm),
      today,
    ),
    tense:
      explanation.category === 'verb'
        ? strongestInterval(
            cards.filter((card) => isVerbCard(card) && card.tense === explanation.tense),
            today,
          )
        : 0,
    pronoun:
      explanation.category === 'verb'
        ? strongestInterval(
            cards.filter((card) => isVerbCard(card) && card.pronoun === explanation.pronoun),
            today,
          )
        : 0,
    nominal: strongestInterval(cards.filter(isNominalCard), today),
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
  const rootAndForm = {
    rootType: on(showRootType, layers.rootType),
    weakLetter: on(showRootType, layers.weakLetter),
    form: on(showForm, layers.form),
    vowels: on(showForm, layers.vowels),
    formRoot: on(showForm || showRootType, layers.formRoot),
  }

  if (layers.category === 'nominal') {
    const showNominal = mastery.nominal < threshold
    const nominal = {
      ...layers,
      ...rootAndForm,
      nominal: on(showNominal, layers.nominal),
      nominalRoot: on(showNominal || showRootType, layers.nominalRoot),
    }

    if (layers.nominal === 'masdar')
      return {
        ...nominal,
        isMasdarMimi: on(showNominal, layers.isMasdarMimi),
        masdarPattern: on(showNominal, layers.masdarPattern),
      }

    return nominal
  }

  const showTense = mastery.tense < threshold
  const showPronoun = mastery.pronoun < threshold

  return {
    ...layers,
    ...rootAndForm,
    tense: on(showTense, layers.tense),
    tenseRoot: on(showTense || showRootType, layers.tenseRoot),
    pronoun: on(showPronoun, layers.pronoun),
    prefix: on(showPronoun, layers.prefix),
    suffix: on(showPronoun, layers.suffix),
  }
}
