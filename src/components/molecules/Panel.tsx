import { styled } from 'goober'
import type { ComponentChildren } from 'preact'
import { useState } from 'preact/hooks'

interface PanelProps {
  title?: string
  dir?: 'auto' | 'rtl' | 'ltr'
  lang?: string
  actions?: ComponentChildren
  children?: ComponentChildren
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export const Panel = ({ title, dir, lang, actions, children, collapsible, defaultCollapsed }: PanelProps) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed ?? false)

  return (
    <PanelContainer>
      {(title || actions) &&
        (collapsible && title ? (
          <PanelTitleButton
            dir={dir}
            lang={lang}
            type="button"
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((c) => !c)}
          >
            <PanelTitle>{title}</PanelTitle>
            <CollapseArrow collapsed={collapsed}>›</CollapseArrow>
            {actions}
          </PanelTitleButton>
        ) : (
          <PanelTitleRow dir={dir} lang={lang}>
            {title && <PanelTitle>{title}</PanelTitle>}
            {actions}
          </PanelTitleRow>
        ))}
      {collapsible ? (
        <PanelBodyAnimated collapsed={collapsed}>
          <PanelBodyInner>{children}</PanelBodyInner>
        </PanelBodyAnimated>
      ) : (
        <PanelBody>{children}</PanelBody>
      )}
    </PanelContainer>
  )
}

export const PanelContainer = styled('section')`
  position: relative;
  background: #ffffff;
  border-radius: 0.75rem;
  padding: 0.75rem;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 480px) {
    border-radius: 1.25rem;
    padding: 1rem 1.25rem;
  }

  @media print {
    border: none;
    border-radius: 0;
    padding: 0.4rem 0;
    gap: 0.4rem;
    box-shadow: none;
  }
`

const PanelTitleRow = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0;
`

const PanelTitleButton = styled('button')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  width: 100%;
  font: inherit;
  color: inherit;
`

const PanelTitle = styled('h2')`
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
  flex: 1;
  min-width: 0;
`

const CollapseArrow = styled('span')<{ collapsed: boolean }>`
  font-size: 1.2rem;
  line-height: 1;
  transition: transform 0.2s ease;
  transform: ${({ collapsed }) => (collapsed ? 'rotate(90deg)' : 'rotate(-90deg)')};
  display: inline-block;
  user-select: none;
`

const PanelBody = styled('div')`
  display: contents;
`

const PanelBodyAnimated = styled('div')<{ collapsed: boolean }>`
  display: grid;
  grid-template-rows: ${({ collapsed }) => (collapsed ? '0fr' : '1fr')};
  margin-block-start: ${({ collapsed }) => (collapsed ? '-1rem' : '0')};
  transition:
    grid-template-rows 300ms cubic-bezier(0.25, 1, 0.5, 1),
    margin-block-start 300ms cubic-bezier(0.25, 1, 0.5, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const PanelBodyInner = styled('div')`
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
