import { styled } from 'goober'
import { useI18n } from '../../hooks/useI18n'
import type { NominalKind } from '../../paradigms/explanation'
import { renderExplanation, resolveNominalExplanationLayers } from '../../paradigms/explanation'
import { type DisplayVerb, formatFormLabel } from '../../paradigms/verbs'
import { ArabicDisplay } from '../atoms/ArabicDisplay'
import { Text } from '../atoms/Text'
import { Detail } from '../molecules/Detail'

interface NominalInsightsProps {
  verb: DisplayVerb
  nominal: NominalKind
  arabic: string
}

export function NominalInsights({ verb, nominal, arabic }: NominalInsightsProps) {
  const { t } = useI18n()
  const formLabel = formatFormLabel(verb.form, verb.root)

  return (
    <>
      <ArabicDisplay>{arabic}</ArabicDisplay>
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
        <Detail label={t('meta.verb')} value={verb.label} valueLang="ar" valueDir="rtl" />
      </VerbContextSection>
      {renderExplanation(resolveNominalExplanationLayers(verb, nominal, arabic), t).map((paragraph, index) => (
        <Text key={`${index}-${paragraph}`}>{paragraph}</Text>
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
