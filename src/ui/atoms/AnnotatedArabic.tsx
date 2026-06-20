import { styled } from 'goober'
import type { Morpheme, MorphemeRole, Word } from '../../paradigms/word'

export interface AnnotatedArabicProps {
  morphemes?: readonly Morpheme[]
  word?: Word
}

export function AnnotatedArabic({ morphemes = [], word }: AnnotatedArabicProps) {
  return (
    <>
      {(word?.morphemes ?? morphemes).map((morpheme, i) =>
        morpheme.role === 'elided' ? (
          <DroppedMorpheme key={`m-${i}`}>{String(morpheme)}</DroppedMorpheme>
        ) : (
          <span key={`m-${i}`} style={{ color: COLOURS[morpheme.role] }}>
            {String(morpheme)}
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
