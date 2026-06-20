import type { AnnotatedForm } from '../paradigms/annotation'

export function detokenizeAnnotation(annotation: AnnotatedForm) {
  return {
    ...annotation,
    steps: annotation.steps.map((step) => ({
      ...step,
      morphemes: step.morphemes.map((morpheme) => ({ text: String(morpheme), role: morpheme.role })),
    })),
  }
}
