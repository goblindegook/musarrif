import type { ExplanationKind, ExplanationSentence } from '../../paradigms/explanation'
import { applyDiacriticsPreference } from '../../paradigms/tokens'
import { FormattedText } from '../atoms/FormattedText'
import { Text } from '../atoms/Text'
import { useI18n } from '../hooks/useI18n'

const KIND_COLORS: Record<ExplanationKind, string> = {
  radical: 'var(--color-insight-root)',
  measure: 'var(--color-insight-form)',
  agreement: 'var(--color-insight-suffix)',
  particle: 'var(--color-insight-tense)',
  elided: 'var(--color-insight-dropped)',
}

interface ExplanationTextProps {
  paragraphs: ExplanationSentence[][]
  /** Only where a morpheme breakdown is on screen for the markers to key into. */
  showMorphemeMarkers?: boolean
}

export const ExplanationText = ({ paragraphs, showMorphemeMarkers = false }: ExplanationTextProps) => {
  const { diacriticsPreference } = useI18n()

  return (
    <>
      {paragraphs.map((paragraph, pi) => (
        <Text key={pi}>
          {paragraph.map((sentence, si) => (
            <span key={si}>
              {showMorphemeMarkers && (si === 0 || paragraph[si - 1]?.kind !== sentence.kind) && (
                <span style={{ color: KIND_COLORS[sentence.kind] }}>● </span>
              )}
              <FormattedText as="span" text={applyDiacriticsPreference(sentence.text, diacriticsPreference)} />{' '}
            </span>
          ))}
        </Text>
      ))}
    </>
  )
}
