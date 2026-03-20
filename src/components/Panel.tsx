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
      <PanelBody hidden={collapsed}>{children}</PanelBody>
    </PanelContainer>
  )
}

export const PanelContainer = styled('section')`
  position: relative;
  background: #ffffff;
  border-radius: 1.5rem;
  padding: 1rem 1.25rem;
  box-shadow: 0 20px 55px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

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
  font-size: 1.4rem;
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

const PanelBody = styled('div')<{ hidden: boolean }>`
  display: ${({ hidden }) => (hidden ? 'none' : 'contents')};
`
