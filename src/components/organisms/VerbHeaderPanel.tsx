import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { PanelContainer } from '../molecules/Panel'

interface VerbHeaderPanelProps {
  readonly title: string
  readonly subtitle?: string
  readonly subtitleDir?: 'auto' | 'rtl' | 'ltr'
  readonly subtitleLang?: string
  readonly dir?: 'auto' | 'rtl' | 'ltr'
  readonly lang?: string
  readonly actions?: ComponentChildren
  readonly children?: ComponentChildren
}

export const VerbHeaderPanel = ({
  title,
  subtitle,
  subtitleDir,
  subtitleLang,
  dir,
  lang,
  actions,
  children,
}: VerbHeaderPanelProps) => (
  <PanelContainer>
    <PanelTitleRow dir={dir} lang={lang}>
      <PanelTitleGroup>
        <PanelTitle>{title}</PanelTitle>
        {subtitle && (
          <PanelSubtitle dir={subtitleDir} lang={subtitleLang}>
            {subtitle}
          </PanelSubtitle>
        )}
      </PanelTitleGroup>
      {actions}
    </PanelTitleRow>
    <PanelBody>{children}</PanelBody>
  </PanelContainer>
)

const PanelTitleRow = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 0;
`

const PanelTitleGroup = styled('div')`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  gap: 0.1rem;
`

const PanelTitle = styled('h2')`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
  min-width: 0;
`

const PanelSubtitle = styled('p')`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 400;
  color: #64748b;
  text-align: right;
`

const PanelBody = styled('div')`
  display: contents;
`
