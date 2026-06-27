import type { DerivationStep } from '../paradigms/annotation'

export function detokenizeDerivationSteps(annotation: readonly DerivationStep[]) {
  return annotation.map((step) => ({
    ...step,
    morphemes: step.morphemes.map((morpheme) => ({ text: String(morpheme), role: morpheme.role })),
  }))
}
