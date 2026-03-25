import { styled } from 'goober'
import { useState } from 'preact/hooks'
import { useI18n } from '../hooks/i18n'
import { renderExplanation, resolveVerbExplanationLayers } from '../paradigms/explanation'
import type { PronounId } from '../paradigms/pronouns'
import type { VerbTense } from '../paradigms/tense'
import type { DisplayVerb } from '../paradigms/verbs'
import { IconButton } from './atoms/IconButton'
import { Text } from './atoms/Text'
import { LightBulbIcon } from './icons/LightBulbIcon'
import { Modal } from './Modal'

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
          <ConjugationDisplay dir="rtl" lang="ar">
            <ConjugationText>{arabic}</ConjugationText>
          </ConjugationDisplay>
          {renderExplanation(resolveVerbExplanationLayers(verb, verbTense, pronoun, arabic), t, 'full').map(
            (paragraph, index) => (
              <Text key={`${index}-${paragraph}`}>{paragraph}</Text>
            ),
          )}
        </Modal>
      )}
    </>
  )
}

const ConjugationDisplay = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  margin-bottom: 1rem;
`

const ConjugationText = styled('span')`
  font-size: 2rem;
  font-weight: 600;
  color: #0f172a;
  text-align: center;
  word-break: break-word;
`
