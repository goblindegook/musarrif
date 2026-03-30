import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { renderExplanation, resolveVerbExplanationLayers } from '../paradigms/explanation'
import { formIPastVowel, formIPresentVowel } from '../paradigms/form-i-vowels'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import { IconButton } from './atoms/IconButton'
import { Text } from './atoms/Text'
import { Detail } from './Detail'
import { LightBulbIcon } from './icons/LightBulbIcon'
import { Modal } from './molecules/Modal'

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'] as const

const formIVowelPattern = (verb: DisplayVerb) => {
  if (verb.form !== 1) return null
  const past = formIPastVowel(verb)
  const present = formIPresentVowel(verb)
  return past === present ? `\u25cc${past}` : `\u25cc${past} / \u25cc${present}`
}

interface ConjugationInsightsProps {
  verb: DisplayVerb
  verbTense: VerbTense
  pronoun: PronounId
  arabic: string
}

export function ConjugationInsights({ verb, verbTense, pronoun, arabic }: ConjugationInsightsProps) {
  const { t, dir } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <>
      <IconButton ariaLabel={t('aria.explanation', { word: arabic })} onClick={() => setOpen(true)}>
        <LightBulbIcon />
      </IconButton>
      {open && (
        <Modal dir={dir} isOpen={open} onClose={() => setOpen(false)} title={t('conjugationInfo.title')}>
          <VerbDisplayArea>
            <ConjugationDisplay dir="rtl" lang="ar">
              <ConjugationText>{arabic}</ConjugationText>
            </ConjugationDisplay>
            <VerbContextSection>
              <Detail label={t('meta.root')} valueDir="rtl" valueLang="ar">
                <RootLetters dir="rtl" lang="ar">
                  {Array.from(verb.root).map((letter, i) => (
                    <span key={i}>{letter}</span>
                  ))}
                </RootLetters>
              </Detail>
              <Detail label={t('meta.form')} valueLang="en" valueDir="rtl">
                <FormValue>
                  <FormNumeral>{ROMAN_NUMERALS[verb.form - 1]}</FormNumeral>
                  {formIVowelPattern(verb) && <FormPattern>{formIVowelPattern(verb)}</FormPattern>}
                </FormValue>
              </Detail>
              <Detail label={t('meta.verb')} value={verb.label} valueLang="ar" valueDir="rtl" />
            </VerbContextSection>
          </VerbDisplayArea>
          {renderExplanation(resolveVerbExplanationLayers(verb, verbTense, pronoun, arabic), t).map(
            (paragraph, index) => (
              <Text key={`${index}-${paragraph}`}>{paragraph}</Text>
            ),
          )}
        </Modal>
      )}
    </>
  )
}

const VerbContextSection = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`

const FormValue = styled('div')`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: baseline;
  gap: 0.5rem;
`

const FormNumeral = styled('span')`
  font-weight: 600;
`

const FormPattern = styled('span')`
  font-size: 1.2rem;
  font-weight: 400;
`

const RootLetters = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.75rem;
`

const VerbDisplayArea = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`

const ConjugationDisplay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
`

const ConjugationText = styled('span')`
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  word-break: break-word;
`
