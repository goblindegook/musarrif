import { styled } from 'goober'
import type { ComponentChildren } from 'preact'

interface ArabicDisplayProps {
  children: ComponentChildren
}

export function ArabicDisplay({ children }: ArabicDisplayProps) {
  return (
    <Container dir="rtl" lang="ar">
      <DisplayText>{children}</DisplayText>
    </Container>
  )
}

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: var(--color-bg-surface-secondary);
  border-radius: 1rem;
  border: 1px solid var(--color-border);
`

const DisplayText = styled('span')`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-text-primary);
  text-align: center;
  word-break: break-word;
`
