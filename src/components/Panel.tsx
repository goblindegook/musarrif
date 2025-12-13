import { styled } from 'goober'
import type { ComponentChildren } from 'preact'

interface PanelProps {
  title?: string
  dir?: 'auto' | 'rtl' | 'ltr'
  lang?: string
  actions?: ComponentChildren
  children?: ComponentChildren
}

export const Panel = ({ title, dir, lang, actions, children }: PanelProps) => {
  return (
    <PanelContainer>
      {(title || actions) && (
        <PanelTitleRow dir={dir} lang={lang}>
          {title && <PanelTitle>{title}</PanelTitle>}
          {actions}
        </PanelTitleRow>
      )}
      {children}
    </PanelContainer>
  )
}

export const PanelContainer = styled('section')`
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 720px) {
    padding: 1.5rem 2rem;
  }
`

const PanelTitleRow = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0;
`

const PanelTitle = styled('h2')`
  margin: 0;
  font-weight: 600;
  font-size: 1.55rem;
  flex: 1;
  min-width: 0;
`
