import { styled } from 'goober'
import type { Morpheme, MorphemeRole } from '../../paradigms/word'

export function AnnotatedArabic({ morphemes }: { morphemes: readonly Morpheme[] }) {
  return (
    <>
      {morphemes.map((morpheme, i) =>
        morpheme.role === 'elided' ? (
          <DroppedMorpheme key={`m-${i}`}>{morpheme.text}</DroppedMorpheme>
        ) : (
          <span key={`m-${i}`} style={{ color: COLOURS[morpheme.role] }}>
            {morpheme.text}
          </span>
        ),
      )}
    </>
  )
}

const COLOURS: Record<MorphemeRole, string> = {
  radical: 'var(--color-insight-root)',
  measure: 'var(--color-insight-form)',
  particle: 'var(--color-insight-tense)',
  agreement: 'var(--color-insight-suffix)',
  elided: 'var(--color-insight-dropped)',
}

const DroppedMorpheme = styled('del')`
  color: ${COLOURS.elided};
  text-decoration-thickness: 0.09em;
`
