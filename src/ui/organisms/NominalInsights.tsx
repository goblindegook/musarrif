import { styled } from 'goober'
import { Fragment } from 'preact'
import type { ExplanationKind, NominalKind } from '../../paradigms/explanation'
import { renderExplanation, resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { deriveMasdar } from '../../paradigms/nominal/masdar'
import { deriveActiveParticiple, derivePassiveParticiple } from '../../paradigms/nominal/participle'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'
import { AnnotatedArabic } from '../atoms/AnnotatedArabic'
import { ArabicDisplay } from '../atoms/ArabicDisplay'
import { FormattedText } from '../atoms/FormattedText'
import { Text } from '../atoms/Text'
import { useI18n } from '../hooks/useI18n'
import { Detail } from '../molecules/Detail'

const KIND_COLORS: Record<ExplanationKind, string> = {
  radical: 'var(--color-insight-root)',
  measure: 'var(--color-insight-form)',
  agreement: 'var(--color-insight-suffix)',
  particle: 'var(--color-insight-tense)',
  elided: 'var(--color-insight-dropped)',
}

interface NominalInsightsProps {
  verb: DisplayVerb
  nominal: NominalKind
  arabic: string | readonly string[]
}

export function NominalInsights({ verb, nominal, arabic }: NominalInsightsProps) {
  const { t } = useI18n()
  const formLabel = formatFormLabel(verb.form, verb.root)
  const masdarValues = Array.isArray(arabic) ? arabic : [arabic]
  const lexicalizedMasdarStartIndex =
    masdarValues.length - (nominal === 'masdar' ? (verb.lexicalizedMasdars?.length ?? 0) : 0)

  return (
    <>
      <ArabicDisplay>
        {nominal === 'masdar' ? (
          <MasdarList>
            {deriveMasdar(verb).map((masdar, index) => (
              <Fragment key={masdar}>
                <MasdarItem>
                  <span>
                    <AnnotatedArabic word={masdar} />
                  </span>
                  {index >= lexicalizedMasdarStartIndex && (
                    <MasdarNote>({t('meta.verbalNoun.lexicalized')})</MasdarNote>
                  )}
                </MasdarItem>
                {index < masdarValues.length - 1 && <MasdarSeparator>،</MasdarSeparator>}
              </Fragment>
            ))}
          </MasdarList>
        ) : nominal === 'activeParticiple' ? (
          <AnnotatedArabic word={deriveActiveParticiple(verb)} />
        ) : nominal === 'passiveParticiple' ? (
          <AnnotatedArabic word={derivePassiveParticiple(verb)} />
        ) : null}
      </ArabicDisplay>
      <VerbContextSection>
        <Detail label={t('meta.root')} valueDir="rtl" valueLang="ar">
          <RootLetters dir="rtl" lang="ar">
            {Array.from(verb.root).map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
          </RootLetters>
        </Detail>
        <Detail label={t('meta.form')} valueLang="en" valueDir="rtl">
          <FormNumeral>{formLabel}</FormNumeral>
        </Detail>
        <Detail label={t('meta.verb')} value={verb.lemma} valueLang="ar" valueDir="rtl" />
      </VerbContextSection>
      {renderExplanation(resolveNominalExplanationLayers(verb, nominal, arabic), t).map((paragraph, pi) => (
        <Text key={pi}>
          {paragraph.map((sentence, si) => (
            <span key={si}>
              {(si === 0 || paragraph[si - 1]?.kind !== sentence.kind) && (
                <span style={{ color: KIND_COLORS[sentence.kind] }}>● </span>
              )}
              <FormattedText as="span" text={sentence.text} />{' '}
            </span>
          ))}
        </Text>
      ))}
    </>
  )
}

const VerbContextSection = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`

const RootLetters = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`

const FormNumeral = styled('span')`
  font-weight: 600;
`

const MasdarList = styled('div')`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: baseline;
`

const MasdarItem = styled('div')`
  display: inline-flex;
  align-items: baseline;
  gap: 0.35rem;
`

const MasdarNote = styled('span')`
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-text-secondary);

  @media print {
    font-size: 0.7rem;
  }
`

const MasdarSeparator = styled('span')`
  margin-inline-end: 0.3rem;
  color: var(--color-text-muted);
  font-weight: 400;
`
