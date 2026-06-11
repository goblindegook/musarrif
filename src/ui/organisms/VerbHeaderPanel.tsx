import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { useMemo } from 'preact/hooks'
import { applyDiacriticsPreference } from '../../paradigms/tokens'
import type { DisplayVerb } from '../../paradigms/verbs'
import { useI18n } from '../hooks/useI18n'
import { PanelContainer } from '../molecules/Panel'

export interface VerbHeaderPanelProps {
  readonly verb: DisplayVerb
  readonly actions?: ComponentChildren
  readonly children?: ComponentChildren
}

export const VerbHeaderPanel = ({ verb, actions, children }: VerbHeaderPanelProps) => {
  const { lang, dir, t, diacriticsPreference } = useI18n()

  const formatArabic = useMemo(
    () => (value: string | null) => applyDiacriticsPreference(value ?? '', diacriticsPreference),
    [diacriticsPreference],
  )

  const translation = useMemo(() => {
    if (verb.synthetic || lang === 'ar') return undefined
    const result = t(verb.id)
    return result !== verb.id ? result : '—'
  }, [verb, lang, t])

  return (
    <PanelContainer>
      <TitleStack>
        <PanelTitleRow dir="rtl" lang="ar">
          <Lemma>
            {verb.synthetic && <SyntheticMarker aria-hidden="true">* </SyntheticMarker>}
            {formatArabic(verb.lemma)}
          </Lemma>
          {actions}
        </PanelTitleRow>
        {translation && (
          <Translation dir={dir} lang={lang}>
            {translation}
          </Translation>
        )}
      </TitleStack>
      <PanelBody>{children}</PanelBody>
    </PanelContainer>
  )
}

const TitleStack = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const PanelTitleRow = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0;
`

const Lemma = styled('h2')`
  display: flex;
  flex: 1;
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`

const Translation = styled('p')`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--color-text-secondary);
  text-align: right;
`

const PanelBody = styled('div')`
  display: contents;
`

const SyntheticMarker = styled('span')`
  color: var(--color-text-muted);
  font-size: 0.75em;
  font-weight: 400;
  vertical-align: super;
  direction: ltr;
  unicode-bidi: embed;
`
